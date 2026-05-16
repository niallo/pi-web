<script lang="ts">
  import type { RpcGitDiffFile } from "@pi-web/bridge/types";
  import DiffView from "./DiffView.svelte";

  let {
    files = [] as readonly RpcGitDiffFile[],
    loading = false,
    onRefresh = () => {},
    onViewFile = (_: { path: string; lineNumber: number }) => {},
  }: {
    files?: readonly RpcGitDiffFile[];
    loading?: boolean;
    onRefresh?: () => void;
    onViewFile?: (payload: { path: string; lineNumber: number }) => void;
  } = $props();

  let totalAdditions = $derived(files.reduce((sum, file) => sum + file.additions, 0));
  let totalDeletions = $derived(files.reduce((sum, file) => sum + file.deletions, 0));

  function statusLabel(status: RpcGitDiffFile["status"]): string {
    switch (status) {
      case "added":
        return "Added";
      case "modified":
        return "Modified";
      case "deleted":
        return "Deleted";
      case "renamed":
        return "Renamed";
      case "copied":
        return "Copied";
      case "untracked":
        return "Untracked";
      case "typechange":
        return "Type changed";
      default:
        return "Changed";
    }
  }
</script>

<section class="git-review-panel" aria-label="Review workspace changes">
  <header class="review-header">
    <div class="review-title-block">
      <h2>Review</h2>
      <p>
        {files.length} file{files.length === 1 ? "" : "s"}
        <span class="additions">+{totalAdditions}</span>
        <span class="deletions">-{totalDeletions}</span>
      </p>
    </div>
    <button type="button" class="refresh-btn" disabled={loading} onclick={onRefresh}>
      {loading ? "Refreshing…" : "Refresh"}
    </button>
  </header>

  {#if loading && files.length === 0}
    <div class="review-state">Loading changes…</div>
  {:else if files.length === 0}
    <div class="review-state">No workspace changes to review.</div>
  {:else}
    <div class="review-file-list">
      {#each files as file (file.path)}
        <article class="review-file-card">
          <div class="file-card-header">
            <div class="file-meta">
              <span class="file-status" data-status={file.status}>{statusLabel(file.status)}</span>
              <button
                type="button"
                class="file-path"
                title={`Open ${file.path}`}
                onclick={() => onViewFile({ path: file.path, lineNumber: 1 })}
              >
                {file.path}
              </button>
              {#if file.oldPath}
                <span class="old-path">from {file.oldPath}</span>
              {/if}
            </div>
            <div class="file-stats" aria-label={`${file.additions} additions, ${file.deletions} deletions`}>
              <span class="additions">+{file.additions}</span>
              <span class="deletions">-{file.deletions}</span>
            </div>
          </div>
          {#if file.binary}
            <div class="binary-note">Binary file changed.</div>
          {:else if file.diff}
            <DiffView diff={file.diff} path={file.path} />
          {:else}
            <div class="binary-note">No textual diff available.</div>
          {/if}
        </article>
      {/each}
    </div>
  {/if}
</section>

<style>
  .git-review-panel {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    height: 100%;
    background: var(--rail-bg);
    color: var(--text);
  }

  .review-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .review-title-block {
    min-width: 0;
  }

  .review-title-block h2 {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.2;
  }

  .review-title-block p {
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

  .review-state {
    margin: 14px;
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: color-mix(in srgb, var(--panel) 80%, transparent);
    color: var(--text-muted);
    font-size: 0.76rem;
  }

  .review-file-list {
    flex: 1;
    min-height: 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
    scrollbar-width: none;
  }

  .review-file-list::-webkit-scrollbar {
    display: none;
  }

  .review-file-card {
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--panel);
    overflow: hidden;
  }

  .file-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 12px;
    border-bottom: 1px solid color-mix(in srgb, var(--border) 75%, transparent);
  }

  .file-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .file-status {
    flex-shrink: 0;
    padding: 2px 7px;
    border-radius: 999px;
    border: 1px solid var(--border);
    color: var(--text-subtle);
    font-size: 0.62rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .file-status[data-status="added"],
  .file-status[data-status="untracked"] {
    border-color: color-mix(in srgb, var(--diff-added-accent) 44%, var(--border));
    color: var(--diff-added-accent);
  }

  .file-status[data-status="deleted"] {
    border-color: color-mix(in srgb, var(--diff-removed-accent) 44%, var(--border));
    color: var(--diff-removed-accent);
  }

  .file-path {
    min-width: 0;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--text);
    font: inherit;
    font-family: var(--pi-font-mono);
    font-size: 0.74rem;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  .file-path:hover {
    color: var(--accent-hover);
  }

  .old-path {
    min-width: 0;
    color: var(--text-subtle);
    font-size: 0.68rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-stats {
    display: inline-flex;
    gap: 8px;
    flex-shrink: 0;
    font-family: var(--pi-font-mono);
    font-size: 0.72rem;
    font-weight: 700;
  }

  .additions {
    color: var(--diff-added-accent);
  }

  .deletions {
    color: var(--diff-removed-accent);
  }

  .binary-note {
    padding: 12px;
    color: var(--text-muted);
    font-size: 0.74rem;
  }

  .review-file-card :global(.diff-view-shell) {
    max-height: 520px;
    border: none;
    border-radius: 0;
  }
</style>
