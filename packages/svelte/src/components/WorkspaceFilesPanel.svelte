<script lang="ts">
  import type { RpcWorkspaceEntry } from "@pi-web/bridge/types";

  let {
    entries = [] as readonly RpcWorkspaceEntry[],
    loading = false,
    onRefresh = () => {},
    onOpenFile = (_: { path: string; lineNumber: number }) => {},
  }: {
    entries?: readonly RpcWorkspaceEntry[];
    loading?: boolean;
    onRefresh?: () => void;
    onOpenFile?: (payload: { path: string; lineNumber: number }) => void;
  } = $props();

  let search = $state("");

  let files = $derived(
    entries
      .filter(entry => entry.kind === "file")
      .slice()
      .sort((left, right) => left.path.localeCompare(right.path)),
  );
  let directories = $derived(
    entries
      .filter(entry => entry.kind === "directory")
      .slice()
      .sort((left, right) => left.path.localeCompare(right.path)),
  );
  let filteredFiles = $derived.by(() => {
    const q = search.trim().toLowerCase();
    if (!q) return files;
    return files.filter(file => file.path.toLowerCase().includes(q));
  });

  function basename(path: string): string {
    const normalized = path.replace(/\\/g, "/");
    return normalized.split("/").filter(Boolean).at(-1) ?? path;
  }

  function dirname(path: string): string {
    const normalized = path.replace(/\\/g, "/");
    const parts = normalized.split("/").filter(Boolean);
    parts.pop();
    return parts.join("/");
  }
</script>

<section class="workspace-files-panel" aria-label="Workspace files">
  <header class="files-header">
    <div class="files-title-block">
      <h2>Files</h2>
      <p>
        {files.length} file{files.length === 1 ? "" : "s"}
        {#if directories.length > 0}
          · {directories.length} director{directories.length === 1 ? "y" : "ies"}
        {/if}
      </p>
    </div>
    <button type="button" class="refresh-btn" disabled={loading} onclick={onRefresh}>
      {loading ? "Indexing…" : "Refresh"}
    </button>
  </header>

  <label class="files-search">
    <span class="sr-only">Search workspace files</span>
    <input bind:value={search} type="search" placeholder="Search files" />
  </label>

  {#if loading && entries.length === 0}
    <div class="files-state">Indexing workspace…</div>
  {:else if files.length === 0}
    <div class="files-state">No files found in this workspace.</div>
  {:else if filteredFiles.length === 0}
    <div class="files-state">No files match “{search}”.</div>
  {:else}
    <ul class="files-list">
      {#each filteredFiles as file (file.path)}
        <li class="file-row">
          <button
            type="button"
            class="file-button"
            title={`Open ${file.path}`}
            onclick={() => onOpenFile({ path: file.path, lineNumber: 1 })}
          >
            <span class="file-name">{basename(file.path)}</span>
            <span class="file-dir">{dirname(file.path)}</span>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  .workspace-files-panel {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    height: 100%;
    background: var(--rail-bg);
    color: var(--text);
  }

  .files-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .files-title-block {
    min-width: 0;
  }

  .files-title-block h2 {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.2;
  }

  .files-title-block p {
    margin: 4px 0 0;
    color: var(--text-muted);
    font-size: 0.72rem;
  }

  .refresh-btn {
    height: 30px;
    padding: 0 10px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--panel);
    color: var(--text-subtle);
    font: inherit;
    font-size: 0.72rem;
    cursor: pointer;
  }

  .refresh-btn:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--text);
  }

  .refresh-btn:disabled {
    opacity: 0.55;
    cursor: wait;
  }

  .files-search {
    display: block;
    padding: 10px 14px;
    border-bottom: 1px solid color-mix(in srgb, var(--border) 75%, transparent);
  }

  .files-search input {
    width: 100%;
    height: 34px;
    box-sizing: border-box;
    padding: 0 11px;
    border: 1px solid var(--border);
    border-radius: 11px;
    background: var(--bg);
    color: var(--text);
    font: inherit;
    font-size: 0.75rem;
    outline: none;
  }

  .files-search input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 18%, transparent);
  }

  .files-list {
    flex: 1;
    min-height: 0;
    overflow: auto;
    list-style: none;
    margin: 0;
    padding: 8px;
    scrollbar-width: none;
  }

  .files-list::-webkit-scrollbar {
    display: none;
  }

  .file-row {
    margin: 0;
    padding: 0;
  }

  .file-button {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    min-width: 0;
    padding: 9px 10px;
    border: none;
    border-radius: 10px;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font: inherit;
    text-align: left;
  }

  .file-button:hover,
  .file-button:focus-visible {
    background: color-mix(in srgb, var(--panel-2) 78%, transparent);
    outline: none;
  }

  .file-name,
  .file-dir {
    display: block;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--pi-font-mono);
  }

  .file-name {
    color: var(--text);
    font-size: 0.76rem;
  }

  .file-dir {
    min-height: 0.8rem;
    color: var(--text-subtle);
    font-size: 0.66rem;
  }

  .files-state {
    margin: 14px;
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: color-mix(in srgb, var(--panel) 80%, transparent);
    color: var(--text-muted);
    font-size: 0.76rem;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
