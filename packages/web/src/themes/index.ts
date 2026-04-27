import type { ThemeRegistration } from "shiki/core";

export type ThemeMode = "dark" | "light";

export type ThemePreference = {
  mode: ThemeMode;
  darkThemeId: string;
  lightThemeId: string;
};

export type ThemePair = {
  dark: Base46Theme;
  light: Base46Theme;
};

type Base46Palette = Record<string, string>;
type Base16Palette = Record<
  | "base00"
  | "base01"
  | "base02"
  | "base03"
  | "base04"
  | "base05"
  | "base06"
  | "base07"
  | "base08"
  | "base09"
  | "base0A"
  | "base0B"
  | "base0C"
  | "base0D"
  | "base0E"
  | "base0F",
  string
>;

export type Base46Theme = {
  id: string;
  label: string;
  mode: ThemeMode;
  base30: Base46Palette;
  base16: Base16Palette;
};

const PI_DARK_THEME: Base46Theme = {
  id: "pi-base46-dark",
  label: "Pi Dark",
  mode: "dark",
  base30: {
    white: "#e6edf3",
    darker_black: "#010409",
    black: "#0d1117",
    black2: "#161b22",
    one_bg: "#161b22",
    one_bg2: "#21262d",
    one_bg3: "#30363d",
    grey: "#484f58",
    grey_fg: "#8b949e",
    grey_fg2: "#7d8590",
    light_grey: "#8b949e",
    red: "#f85149",
    baby_pink: "#ffa198",
    pink: "#bc8cff",
    green: "#3fb950",
    vibrant_green: "#56d364",
    blue: "#2f81f7",
    nord_blue: "#58a6ff",
    yellow: "#d29922",
    sun: "#e3b341",
    purple: "#a371f7",
    dark_purple: "#8957e5",
    teal: "#39c5cf",
    orange: "#db6d28",
    cyan: "#76e3ea",
    line: "#30363d",
    statusline_bg: "#0f141b",
    lightbg: "#21262d",
    pmenu_bg: "#2f81f7",
    folder_bg: "#58a6ff",
  },
  base16: {
    base00: "#0d1117",
    base01: "#161b22",
    base02: "#21262d",
    base03: "#7d8590",
    base04: "#8b949e",
    base05: "#e6edf3",
    base06: "#f0f6fc",
    base07: "#ffffff",
    base08: "#f85149",
    base09: "#db6d28",
    base0A: "#d29922",
    base0B: "#3fb950",
    base0C: "#39c5cf",
    base0D: "#2f81f7",
    base0E: "#a371f7",
    base0F: "#bc8cff",
  },
};

const PI_LIGHT_THEME: Base46Theme = {
  id: "pi-base46-light",
  label: "Pi Light",
  mode: "light",
  base30: {
    white: "#1f2328",
    darker_black: "#f6f8fa",
    black: "#ffffff",
    black2: "#ffffff",
    one_bg: "#ffffff",
    one_bg2: "#f6f8fa",
    one_bg3: "#ebedf0",
    grey: "#afb8c1",
    grey_fg: "#656d76",
    grey_fg2: "#6e7781",
    light_grey: "#656d76",
    red: "#cf222e",
    baby_pink: "#cf222e",
    pink: "#8250df",
    green: "#1a7f37",
    vibrant_green: "#2da44e",
    blue: "#0969da",
    nord_blue: "#218bff",
    yellow: "#9a6700",
    sun: "#bf8700",
    purple: "#8250df",
    dark_purple: "#6f42c1",
    teal: "#1b7c83",
    orange: "#bc4c00",
    cyan: "#1b7c83",
    line: "#d0d7de",
    statusline_bg: "#f6f8fa",
    lightbg: "#f6f8fa",
    pmenu_bg: "#0969da",
    folder_bg: "#218bff",
  },
  base16: {
    base00: "#ffffff",
    base01: "#f6f8fa",
    base02: "#ebedf0",
    base03: "#6e7781",
    base04: "#656d76",
    base05: "#1f2328",
    base06: "#0b0f14",
    base07: "#000000",
    base08: "#cf222e",
    base09: "#bc4c00",
    base0A: "#9a6700",
    base0B: "#1a7f37",
    base0C: "#1b7c83",
    base0D: "#0969da",
    base0E: "#8250df",
    base0F: "#953800",
  },
};

const FALLBACK_THEME_BY_MODE: Record<ThemeMode, Base46Theme> = {
  dark: PI_DARK_THEME,
  light: PI_LIGHT_THEME,
};

const THEMES = [PI_DARK_THEME, PI_LIGHT_THEME] as const;
const THEMES_BY_ID = new Map<string, Base46Theme>(
  THEMES.map(theme => [theme.id, theme]),
);
const SHIKI_THEME_CACHE = new Map<string, ThemeRegistration>();

const DEFAULT_THEME_PREFERENCE: ThemePreference = {
  mode: "dark",
  darkThemeId: PI_DARK_THEME.id,
  lightThemeId: PI_LIGHT_THEME.id,
};

function parseHexColor(value: string): [number, number, number] | null {
  const normalized = value.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(normalized)) {
    return normalized.split("").map(channel => Number.parseInt(channel + channel, 16)) as [number, number, number];
  }
  if (/^[0-9a-f]{6}$/i.test(normalized)) {
    return [0, 2, 4].map(index => Number.parseInt(normalized.slice(index, index + 2), 16)) as [number, number, number];
  }
  return null;
}

function toRgba(value: string, alpha: number): string {
  const rgb = parseHexColor(value);
  if (!rgb) {
    return value;
  }
  const [red, green, blue] = rgb;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function themeById(themeId: string | null | undefined): Base46Theme | undefined {
  return themeId ? THEMES_BY_ID.get(themeId) : undefined;
}

export function readStoredThemePreference(
  raw: string | null,
  prefersLight: boolean,
): ThemePreference {
  const fallbackMode: ThemeMode = prefersLight ? "light" : "dark";
  const fallback: ThemePreference = {
    ...DEFAULT_THEME_PREFERENCE,
    mode: fallbackMode,
  };

  if (raw === "dark" || raw === "light") {
    return { ...fallback, mode: raw };
  }

  if (!raw) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ThemePreference>;
    const mode = parsed.mode === "light" || parsed.mode === "dark"
      ? parsed.mode
      : fallback.mode;
    const darkThemeId = themeById(parsed.darkThemeId)?.mode === "dark"
      ? parsed.darkThemeId
      : DEFAULT_THEME_PREFERENCE.darkThemeId;
    const lightThemeId = themeById(parsed.lightThemeId)?.mode === "light"
      ? parsed.lightThemeId
      : DEFAULT_THEME_PREFERENCE.lightThemeId;

    return {
      mode,
      darkThemeId,
      lightThemeId,
    };
  } catch {
    return fallback;
  }
}

export function serializeThemePreference(preference: ThemePreference): string {
  return JSON.stringify(preference);
}

export function toggleThemePreferenceMode(
  preference: ThemePreference,
): ThemePreference {
  return {
    ...preference,
    mode: preference.mode === "dark" ? "light" : "dark",
  };
}

export function resolveThemePair(preference: ThemePreference): ThemePair {
  return {
    dark:
      themeById(preference.darkThemeId) ?? FALLBACK_THEME_BY_MODE.dark,
    light:
      themeById(preference.lightThemeId) ?? FALLBACK_THEME_BY_MODE.light,
  };
}

export function resolveActiveTheme(preference: ThemePreference): Base46Theme {
  const pair = resolveThemePair(preference);
  return preference.mode === "dark" ? pair.dark : pair.light;
}

export function resolveAppThemeVars(
  theme: Base46Theme,
): Record<string, string> {
  const { base16, base30, mode } = theme;
  const shadowSource = mode === "dark" ? base30.darker_black : base16.base00;

  return {
    "--bg": base16.base00,
    "--bg-elevated": base16.base01,
    "--panel": base30.one_bg,
    "--panel-2": base30.one_bg2,
    "--panel-3": base30.one_bg3,
    "--tool-surface": base30.one_bg,
    "--tool-surface-strong": base30.one_bg2,
    "--tool-output-bg": base30.statusline_bg,
    "--tool-output-border": base30.one_bg3,
    "--diff-added-bg": toRgba(base16.base0B, mode === "dark" ? 0.15 : 0.12),
    "--diff-added-text": mode === "dark" ? "#aff5b4" : "#116329",
    "--diff-added-accent": base16.base0B,
    "--diff-removed-bg": toRgba(base16.base08, mode === "dark" ? 0.15 : 0.1),
    "--diff-removed-text": mode === "dark" ? "#ffa198" : "#a40e26",
    "--diff-removed-accent": base16.base08,
    "--diff-header-bg": base30.one_bg3,
    "--diff-hunk-bg": base30.one_bg2,
    "--rail-bg": base30.darker_black,
    "--border": base30.line,
    "--border-strong": base30.grey,
    "--text": base16.base05,
    "--text-muted": base30.grey_fg,
    "--text-subtle": base30.grey_fg2,
    "--accent": base16.base0D,
    "--accent-hover": base30.nord_blue,
    "--success": base16.base0B,
    "--warning": base16.base0A,
    "--danger": base16.base08,
    "--surface-hover": toRgba(base30.grey_fg2, mode === "dark" ? 0.1 : 0.12),
    "--surface-active": toRgba(base16.base0D, mode === "dark" ? 0.15 : 0.14),
    "--surface-selected": toRgba(base30.light_grey, mode === "dark" ? 0.4 : 0.2),
    "--focus-ring": toRgba(base16.base0D, mode === "dark" ? 0.35 : 0.28),
    "--focus-ring-muted": toRgba(base30.grey_fg, mode === "dark" ? 0.22 : 0.18),
    "--selection-bg": toRgba(base16.base0D, mode === "dark" ? 0.22 : 0.16),
    "--button-bg": base30.one_bg2,
    "--button-hover": base30.one_bg3,
    "--shadow-raised": `0 8px 24px ${toRgba(shadowSource, mode === "dark" ? 0.28 : 0.08)}`,
    "--shadow-floating": `0 20px 48px ${toRgba(shadowSource, mode === "dark" ? 0.4 : 0.12)}`,
    "--shadow": `0 24px 60px ${toRgba(shadowSource, mode === "dark" ? 0.36 : 0.08)}`,
    "--overlay": toRgba(shadowSource, mode === "dark" ? 0.78 : 0.22),
    "--backdrop": toRgba(shadowSource, mode === "dark" ? 0.52 : 0.12),
    "--composer-fade": toRgba(base16.base00, 0.96),
    "--error-bg": toRgba(base16.base08, mode === "dark" ? 0.14 : 0.08),
    "--error-border": toRgba(base16.base08, mode === "dark" ? 0.32 : 0.22),
    "--error-text": mode === "dark" ? base30.baby_pink : base16.base08,
  };
}

export function resolveShikiTheme(theme: Base46Theme): ThemeRegistration {
  const cached = SHIKI_THEME_CACHE.get(theme.id);
  if (cached) {
    return cached;
  }

  const { base16, base30, label, mode } = theme;
  const shikiTheme: ThemeRegistration = {
    name: theme.id,
    displayName: label,
    type: mode,
    fg: base16.base05,
    bg: base16.base00,
    colors: {
      "editor.background": base16.base00,
      "editor.foreground": base16.base05,
      "editor.selectionBackground": toRgba(
        base16.base0D,
        mode === "dark" ? 0.22 : 0.16,
      ),
      "editor.lineHighlightBackground": toRgba(
        base16.base01,
        mode === "dark" ? 0.96 : 0.8,
      ),
      "editorLineNumber.foreground": base30.grey_fg2,
      "editorLineNumber.activeForeground": base16.base05,
    },
    settings: [
      {
        settings: {
          foreground: base16.base05,
          background: base16.base00,
        },
      },
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: {
          foreground: base16.base03,
          fontStyle: "italic",
        },
      },
      {
        scope: ["string", "markup.inline.raw.string"],
        settings: {
          foreground: base16.base0B,
        },
      },
      {
        scope: ["constant.numeric", "constant.language", "constant.character"],
        settings: {
          foreground: base16.base09,
        },
      },
      {
        scope: ["keyword", "storage", "storage.type"],
        settings: {
          foreground: base16.base0E,
        },
      },
      {
        scope: [
          "entity.name.function",
          "support.function",
          "meta.function-call",
          "variable.function",
        ],
        settings: {
          foreground: base16.base0D,
        },
      },
      {
        scope: ["entity.name.type", "entity.name.class", "support.type"],
        settings: {
          foreground: base16.base0A,
        },
      },
      {
        scope: ["entity.name.tag", "punctuation.definition.tag"],
        settings: {
          foreground: base16.base08,
        },
      },
      {
        scope: ["entity.other.attribute-name"],
        settings: {
          foreground: base16.base0A,
        },
      },
      {
        scope: ["variable", "meta.definition.variable", "support.variable"],
        settings: {
          foreground: base16.base05,
        },
      },
      {
        scope: ["punctuation", "meta.brace", "meta.delimiter"],
        settings: {
          foreground: base16.base04,
        },
      },
      {
        scope: ["markup.bold"],
        settings: {
          foreground: base16.base0A,
          fontStyle: "bold",
        },
      },
      {
        scope: ["markup.italic"],
        settings: {
          foreground: base16.base0E,
          fontStyle: "italic",
        },
      },
      {
        scope: ["markup.deleted"],
        settings: {
          foreground: base16.base08,
        },
      },
      {
        scope: ["markup.inserted"],
        settings: {
          foreground: base16.base0B,
        },
      },
      {
        scope: ["markup.changed"],
        settings: {
          foreground: base16.base0D,
        },
      },
    ],
  };

  SHIKI_THEME_CACHE.set(theme.id, shikiTheme);
  return shikiTheme;
}

export function readThemeModeFromDom(): ThemeMode {
  const shell = document.querySelector<HTMLElement>(".app-shell");
  const mode = shell?.dataset.themeMode;
  return mode === "light" ? "light" : "dark";
}

export function readThemePairFromDom(): ThemePair {
  const shell = document.querySelector<HTMLElement>(".app-shell");
  return {
    dark: themeById(shell?.dataset.darkTheme) ?? FALLBACK_THEME_BY_MODE.dark,
    light:
      themeById(shell?.dataset.lightTheme) ?? FALLBACK_THEME_BY_MODE.light,
  };
}

export function readActiveThemeFromDom(): Base46Theme {
  const shell = document.querySelector<HTMLElement>(".app-shell");
  const mode = shell?.dataset.themeMode === "light" ? "light" : "dark";
  const pair = readThemePairFromDom();
  return themeById(shell?.dataset.theme) ?? (mode === "dark" ? pair.dark : pair.light);
}
