# AGENTS.md

This file provides guidance to coding agents when working with code in this
repository.

## Monorepo Structure

This is a pnpm workspace monorepo with the following packages:

- `@pi-web/bridge` (`packages/bridge/`) — WebSocket RPC bridge server
- `@pi-web/bin` (`packages/bin/`) — Pi extension entry point
- `@pi-web/web` (`packages/web/`) — Vue 3 web client

## Commands

- `pnpm run check` — type-check with `tsgo`
- `pnpm run build` — build both server and web
- `pnpm run build:server` — build server (bin + bridge) to `dist/`
- `pnpm run build:web` — build Vue client to `web-dist/`
- `pnpm run dev:web` — Vite dev server for the web UI
- `pnpm test` / `pnpm run test:watch` — run Vitest test suite
- `pnpm fmt` / `pnpm run fmt:check` — format/check with `oxfmt`
- `pnpm lint` / `pnpm run lint:fix` — lint/fix with `oxlint`

## Architecture

- `packages/bin/` — Pi extension entry point, registers `/web` command
- `packages/bridge/` — HTTP server, WebSocket RPC bridge, auth, terminal log
  view
- `packages/web/` — Vue 3 client (Vite + vitest)

## Important Tips

- You should read the source code of @mariozechner/pi-coding-agent,
  @mariozechner/pi-ai carefully, especially the wire protocol of pi
- Do not add thin wrapper functions around existing functions unless the wrapper
  adds real value beyond renaming.
- Use git conventional commits specification when commit
- Do not use `nl -ba $file | rg -n $pattern`, use `cat $file | rg -n $pattern`
  instead
- If you apply any edits on vue codes in `@packages/web/src`, run
  `pnpm run build:web`
- Use relative imports between packages (e.g., `../bridge/types.js`), not
  workspace aliases
