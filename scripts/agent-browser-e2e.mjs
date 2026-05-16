import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { WebSocket } from "ws";

const ROOT = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const TIMEOUT = 30000;

function waitForLine(proc, matcher) {
  return new Promise((resolve, reject) => {
    let out = "";
    const timer = setTimeout(() => reject(new Error(`Timed out waiting for process output. Saw:\n${out}`)), TIMEOUT);
    const onData = chunk => {
      out += chunk.toString();
      const result = matcher(out);
      if (result) {
        clearTimeout(timer);
        resolve(result);
      }
    };
    proc.stdout.on("data", onData);
    proc.stderr.on("data", onData);
    proc.once("exit", (code, signal) => {
      clearTimeout(timer);
      reject(new Error(`Process exited early code=${code} signal=${signal}\n${out}`));
    });
  });
}

async function cdpConnect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.once("open", resolve);
    ws.once("error", reject);
  });
  let id = 0;
  const pending = new Map();
  ws.on("message", raw => {
    const msg = JSON.parse(raw.toString());
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) {
        reject(new Error(JSON.stringify(msg.error)));
      } else {
        resolve(msg.result);
      }
    }
  });
  return {
    send(method, params = {}) {
      const msgId = ++id;
      ws.send(JSON.stringify({ id: msgId, method, params }));
      return new Promise((resolve, reject) => pending.set(msgId, { resolve, reject }));
    },
    close() { ws.close(); },
  };
}

async function evalJs(cdp, expression, awaitPromise = true) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
    timeout: TIMEOUT,
  });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

async function waitFor(cdp, expression, label) {
  const deadline = Date.now() + TIMEOUT;
  while (Date.now() < deadline) {
    const value = await evalJs(cdp, expression).catch(() => false);
    if (value) return value;
    await delay(250);
  }
  throw new Error(`Timed out waiting for ${label}`);
}

async function main() {
  const temp = mkdtempSync(join(tmpdir(), "pi-web-agent-browser-"));
  let bridge, chrome, cdp;
  try {
    bridge = spawn(process.execPath, [join(ROOT, "dist/bridge/standalone/main.js"), "--port", "0"], {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
    });
    const bridgeUrl = await waitForLine(bridge, text => text.match(/Bridge URL: (http:\/\/[^\s]+)/)?.[1]);
    const pageUrl = bridgeUrl.replace("0.0.0.0", "127.0.0.1");

    chrome = spawn(CHROME, [
      "--headless=new",
      "--remote-debugging-port=0",
      `--user-data-dir=${join(temp, "chrome")}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--window-size=1440,1000",
      "about:blank",
    ], { stdio: ["ignore", "pipe", "pipe"] });
    const devtoolsUrl = await waitForLine(chrome, text => text.match(/DevTools listening on (ws:\/\/[^\s]+)/)?.[1]);
    const devtoolsHttp = devtoolsUrl.replace(/^ws:/, "http:").replace(/\/devtools\/browser\/.+$/, "");
    const target = await fetch(`${devtoolsHttp}/json/new?${encodeURIComponent(pageUrl)}`, { method: "PUT" }).then(r => r.json());
    cdp = await cdpConnect(target.webSocketDebuggerUrl);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await waitFor(cdp, "document.readyState === 'complete'", "page load");
    await waitFor(cdp, "document.body && document.body.innerText.length > 0", "rendered app text");

    const browserEvidence = await evalJs(cdp, `
      (async () => {
        const text = document.body.innerText;
        const hasComposer = !!document.querySelector('textarea, [contenteditable="true"], input[placeholder*="message" i], input[placeholder*="prompt" i]');
        const rpc = (type, payload = {}) => new Promise((resolve, reject) => {
          const ws = new WebSocket(location.origin.replace(/^http/, 'ws') + '/ws');
          const id = crypto.randomUUID();
          const timer = setTimeout(() => reject(new Error('RPC timeout for ' + type)), 10000);
          ws.onopen = () => ws.send(JSON.stringify({ type: 'command', payload: { id, type, ...payload } }));
          ws.onmessage = event => {
            const msg = JSON.parse(event.data);
            if (msg.type === 'response' && msg.payload?.id === id) {
              clearTimeout(timer);
              ws.close();
              resolve(msg.payload);
            }
          };
          ws.onerror = () => reject(new Error('WebSocket failed for ' + type));
        });
        const [state, workspaces, sessions, tree, files, branches, diff, commands] = await Promise.all([
          rpc('get_state'),
          rpc('list_workspaces'),
          rpc('list_sessions', { workspacePath: ${JSON.stringify(ROOT)} }),
          rpc('list_tree_entries'),
          rpc('list_workspace_entries'),
          rpc('list_git_branches'),
          rpc('list_git_diff'),
          rpc('get_commands'),
        ]);
        const projectRail = document.querySelector('[data-pi-web-project-rail]');
        const sessionPanel = document.querySelector('[data-pi-web-session-panel]');
        const appShell = document.querySelector('.app-shell');
        const appMain = document.querySelector('.app-main-column');
        const railRect = projectRail?.getBoundingClientRect();
        const sessionPanelRect = sessionPanel?.getBoundingClientRect();
        const mainRect = appMain?.getBoundingClientRect();
        const shellStyle = appShell ? getComputedStyle(appShell) : null;
        return {
          title: document.title,
          textSample: text.slice(0, 500),
          hasComposer,
          visualShellOk:
            !!projectRail &&
            !!sessionPanel &&
            !!railRect &&
            Math.abs(railRect.width - 64) <= 1 &&
            !!sessionPanelRect &&
            sessionPanelRect.width >= 180 &&
            !!mainRect &&
            mainRect.left >= 300 &&
            shellStyle?.fontFamily.toLowerCase().includes('system'),
          visualMetrics: {
            projectRailWidth: railRect?.width ?? null,
            sessionPanelWidth: sessionPanelRect?.width ?? null,
            mainLeft: mainRect?.left ?? null,
            fontFamily: shellStyle?.fontFamily ?? null,
          },
          stateOk: state.success && !!state.data?.sessionId,
          workspacesOk: workspaces.success && workspaces.data.workspaces.some(w => w.path === ${JSON.stringify(ROOT)}),
          sessionsOk: sessions.success && Array.isArray(sessions.data.sessions),
          treeOk: tree.success && Array.isArray(tree.data.entries),
          filesOk: files.success && files.data.entries.some(e => e.path === 'package.json'),
          branchesOk: branches.success && !!branches.data.repoRoot && branches.data.branches.length > 0,
          diffOk: diff.success && Array.isArray(diff.data.files),
          commandsOk: commands.success && Array.isArray(commands.data.commands),
        };
      })()
    `);

    const failed = Object.entries(browserEvidence).filter(([key, value]) => key.endsWith("Ok") && value !== true);
    if (!browserEvidence.hasComposer) failed.push(["hasComposer", false]);
    if (failed.length) {
      throw new Error(`Agent-browser e2e checks failed: ${JSON.stringify({ failed, browserEvidence }, null, 2)}`);
    }
    console.log(JSON.stringify({ ok: true, pageUrl, browserEvidence }, null, 2));
  } finally {
    cdp?.close();
    chrome?.kill();
    bridge?.kill();
    await delay(500);
    rmSync(temp, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
}

await main();
