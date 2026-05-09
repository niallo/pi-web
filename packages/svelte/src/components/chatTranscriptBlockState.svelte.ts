import { buildToolDetailModel, buildToolInlineModel } from "../utils/toolBlock";
import type { ImageContentBlock, ToolContentBlock } from "../utils/transcript";

// ---------------------------------------------------------------------------
// Tool block expand/collapse state
// ---------------------------------------------------------------------------

export function createChatTranscriptBlockState() {
  let expandedToolBlocks = $state(new Set<string>());
  let expandedThinking = $state(new Set<string>());

  const toolBlockModelCache = new WeakMap<
    ToolContentBlock,
    ReturnType<typeof buildToolInlineModel>
  >();
  const toolBlockDetailCache = new WeakMap<
    ToolContentBlock,
    ReturnType<typeof buildToolDetailModel>
  >();

  function toolBlockKey(messageKey: string, blockIdx: number): string {
    return `${messageKey}-${blockIdx}`;
  }

  function toggleToolBlock(messageKey: string, blockIdx: number) {
    const key = toolBlockKey(messageKey, blockIdx);
    const next = new Set(expandedToolBlocks);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    expandedToolBlocks = next;
  }

  function toggleThinking(messageKey: string, blockIdx: number) {
    const key = toolBlockKey(messageKey, blockIdx);
    const next = new Set(expandedThinking);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    expandedThinking = next;
  }

  function isToolBlockExpanded(messageKey: string, blockIdx: number): boolean {
    return expandedToolBlocks.has(toolBlockKey(messageKey, blockIdx));
  }

  function isThinkingExpanded(messageKey: string, blockIdx: number): boolean {
    return expandedThinking.has(toolBlockKey(messageKey, blockIdx));
  }

  function toolBlockModel(block: ToolContentBlock) {
    const cached = toolBlockModelCache.get(block);
    if (cached) return cached;
    const model = buildToolInlineModel(block);
    toolBlockModelCache.set(block, model);
    return model;
  }

  function toolBlockDetail(block: ToolContentBlock) {
    const cached = toolBlockDetailCache.get(block);
    if (cached) return cached;
    const detail = buildToolDetailModel(block);
    toolBlockDetailCache.set(block, detail);
    return detail;
  }

  return {
    get expandedToolBlocks() {
      return expandedToolBlocks;
    },
    get expandedThinking() {
      return expandedThinking;
    },
    toggleToolBlock,
    toggleThinking,
    isToolBlockExpanded,
    isThinkingExpanded,
    toolBlockModel,
    toolBlockDetail,
  };
}

// ---------------------------------------------------------------------------
// Image lightbox state
// ---------------------------------------------------------------------------

export function createChatTranscriptLightboxState() {
  let lightboxImages = $state<ImageContentBlock[]>([]);
  let lightboxIndex = $state(0);

  function openImageLightbox(
    images: readonly ImageContentBlock[],
    idx: number = 0,
  ) {
    if (images.length === 0) return;
    lightboxImages = [...images];
    lightboxIndex = Math.min(Math.max(idx, 0), images.length - 1);
  }

  function closeImageLightbox() {
    lightboxImages = [];
    lightboxIndex = 0;
  }

  function showPreviousLightboxImage() {
    if (lightboxImages.length <= 1) return;
    lightboxIndex =
      (lightboxIndex + lightboxImages.length - 1) % lightboxImages.length;
  }

  function showNextLightboxImage() {
    if (lightboxImages.length <= 1) return;
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  }

  return {
    get lightboxImages() {
      return lightboxImages;
    },
    get lightboxIndex() {
      return lightboxIndex;
    },
    openImageLightbox,
    closeImageLightbox,
    showPreviousLightboxImage,
    showNextLightboxImage,
  };
}
