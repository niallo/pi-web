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

function createTheme(theme: Base46Theme): Base46Theme {
  return theme;
}

const PI_DARK_THEME = createTheme({
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
});

const TOKYO_NIGHT_THEME = createTheme({
  id: "tokyo-night",
  label: "Tokyo Night",
  mode: "dark",
  base30: {
    white: "#c0caf5",
    darker_black: "#15161e",
    black: "#1a1b26",
    black2: "#1f2335",
    one_bg: "#1f2335",
    one_bg2: "#24283b",
    one_bg3: "#2f3549",
    grey: "#4f5b7a",
    grey_fg: "#7a88b5",
    grey_fg2: "#6b7394",
    light_grey: "#7a88b5",
    red: "#f7768e",
    baby_pink: "#ff9eaf",
    pink: "#f7a8ff",
    green: "#9ece6a",
    vibrant_green: "#b9f27c",
    blue: "#7aa2f7",
    nord_blue: "#89b4fa",
    yellow: "#e0af68",
    sun: "#ffcc7a",
    purple: "#bb9af7",
    dark_purple: "#9d7cd8",
    teal: "#2ac3de",
    orange: "#ff9e64",
    cyan: "#7dcfff",
    line: "#2f3549",
    statusline_bg: "#16161e",
    lightbg: "#24283b",
    pmenu_bg: "#7aa2f7",
    folder_bg: "#89b4fa",
  },
  base16: {
    base00: "#1a1b26",
    base01: "#1f2335",
    base02: "#24283b",
    base03: "#565f89",
    base04: "#7a88b5",
    base05: "#c0caf5",
    base06: "#d5d6db",
    base07: "#e9e9f4",
    base08: "#f7768e",
    base09: "#ff9e64",
    base0A: "#e0af68",
    base0B: "#9ece6a",
    base0C: "#2ac3de",
    base0D: "#7aa2f7",
    base0E: "#bb9af7",
    base0F: "#c0caf5",
  },
});

const GRUVBOX_DARK_THEME = createTheme({
  id: "gruvbox-dark",
  label: "Gruvbox Dark",
  mode: "dark",
  base30: {
    white: "#ebdbb2",
    darker_black: "#1d2021",
    black: "#282828",
    black2: "#32302f",
    one_bg: "#32302f",
    one_bg2: "#3c3836",
    one_bg3: "#504945",
    grey: "#665c54",
    grey_fg: "#a89984",
    grey_fg2: "#928374",
    light_grey: "#bdae93",
    red: "#fb4934",
    baby_pink: "#ff9070",
    pink: "#d3869b",
    green: "#b8bb26",
    vibrant_green: "#c7d36f",
    blue: "#83a598",
    nord_blue: "#8ec07c",
    yellow: "#fabd2f",
    sun: "#ffd166",
    purple: "#d3869b",
    dark_purple: "#b16286",
    teal: "#8ec07c",
    orange: "#fe8019",
    cyan: "#8ec07c",
    line: "#504945",
    statusline_bg: "#282828",
    lightbg: "#3c3836",
    pmenu_bg: "#83a598",
    folder_bg: "#8ec07c",
  },
  base16: {
    base00: "#282828",
    base01: "#32302f",
    base02: "#3c3836",
    base03: "#665c54",
    base04: "#928374",
    base05: "#ebdbb2",
    base06: "#fbf1c7",
    base07: "#f9f5d7",
    base08: "#fb4934",
    base09: "#fe8019",
    base0A: "#fabd2f",
    base0B: "#b8bb26",
    base0C: "#8ec07c",
    base0D: "#83a598",
    base0E: "#d3869b",
    base0F: "#d65d0e",
  },
});

const ROSE_PINE_MOON_THEME = createTheme({
  id: "rose-pine-moon",
  label: "Rose Pine Moon",
  mode: "dark",
  base30: {
    white: "#e0def4",
    darker_black: "#1f1d2e",
    black: "#232136",
    black2: "#2a273f",
    one_bg: "#2a273f",
    one_bg2: "#393552",
    one_bg3: "#44415a",
    grey: "#59546d",
    grey_fg: "#908caa",
    grey_fg2: "#6e6a86",
    light_grey: "#908caa",
    red: "#eb6f92",
    baby_pink: "#f6a8ba",
    pink: "#ea9a97",
    green: "#3e8fb0",
    vibrant_green: "#9ccfd8",
    blue: "#9ccfd8",
    nord_blue: "#c4a7e7",
    yellow: "#f6c177",
    sun: "#ffd79a",
    purple: "#c4a7e7",
    dark_purple: "#907aa9",
    teal: "#3e8fb0",
    orange: "#ea9a97",
    cyan: "#9ccfd8",
    line: "#44415a",
    statusline_bg: "#232136",
    lightbg: "#393552",
    pmenu_bg: "#c4a7e7",
    folder_bg: "#9ccfd8",
  },
  base16: {
    base00: "#232136",
    base01: "#2a273f",
    base02: "#393552",
    base03: "#6e6a86",
    base04: "#908caa",
    base05: "#e0def4",
    base06: "#e0def4",
    base07: "#e0def4",
    base08: "#eb6f92",
    base09: "#ea9a97",
    base0A: "#f6c177",
    base0B: "#3e8fb0",
    base0C: "#9ccfd8",
    base0D: "#c4a7e7",
    base0E: "#c4a7e7",
    base0F: "#b4637a",
  },
});

const EVERFOREST_DARK_THEME = createTheme({
  id: "everforest-dark",
  label: "Everforest Dark",
  mode: "dark",
  base30: {
    white: "#d3c6aa",
    darker_black: "#232a2e",
    black: "#2d353b",
    black2: "#343f44",
    one_bg: "#343f44",
    one_bg2: "#3d484d",
    one_bg3: "#4a555b",
    grey: "#56635f",
    grey_fg: "#9da9a0",
    grey_fg2: "#859289",
    light_grey: "#9da9a0",
    red: "#e67e80",
    baby_pink: "#f29ea0",
    pink: "#d699b6",
    green: "#a7c080",
    vibrant_green: "#b8d99a",
    blue: "#7fbbb3",
    nord_blue: "#83c092",
    yellow: "#dbbc7f",
    sun: "#f3cd91",
    purple: "#d699b6",
    dark_purple: "#a77b9e",
    teal: "#7fbbb3",
    orange: "#e69875",
    cyan: "#83c092",
    line: "#4a555b",
    statusline_bg: "#2d353b",
    lightbg: "#3d484d",
    pmenu_bg: "#7fbbb3",
    folder_bg: "#83c092",
  },
  base16: {
    base00: "#2d353b",
    base01: "#343f44",
    base02: "#3d484d",
    base03: "#56635f",
    base04: "#859289",
    base05: "#d3c6aa",
    base06: "#e4dcc9",
    base07: "#fdf6e3",
    base08: "#e67e80",
    base09: "#e69875",
    base0A: "#dbbc7f",
    base0B: "#a7c080",
    base0C: "#83c092",
    base0D: "#7fbbb3",
    base0E: "#d699b6",
    base0F: "#d699b6",
  },
});

const PI_LIGHT_THEME = createTheme({
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
});

const TOKYO_DAY_THEME = createTheme({
  id: "tokyo-day",
  label: "Tokyo Day",
  mode: "light",
  base30: {
    white: "#3760bf",
    darker_black: "#d5d6db",
    black: "#e1e2e7",
    black2: "#e9e9ec",
    one_bg: "#e9e9ec",
    one_bg2: "#d5d6db",
    one_bg3: "#c6c8d1",
    grey: "#a1a6c5",
    grey_fg: "#6172b0",
    grey_fg2: "#848cb5",
    light_grey: "#6172b0",
    red: "#f52a65",
    baby_pink: "#ff5a8c",
    pink: "#9854f1",
    green: "#587539",
    vibrant_green: "#6f8f4f",
    blue: "#2e7de9",
    nord_blue: "#188092",
    yellow: "#8c6c3e",
    sun: "#b07d28",
    purple: "#9854f1",
    dark_purple: "#7847bd",
    teal: "#188092",
    orange: "#b15c00",
    cyan: "#007197",
    line: "#c6c8d1",
    statusline_bg: "#d5d6db",
    lightbg: "#d5d6db",
    pmenu_bg: "#2e7de9",
    folder_bg: "#188092",
  },
  base16: {
    base00: "#e1e2e7",
    base01: "#e9e9ec",
    base02: "#d5d6db",
    base03: "#a1a6c5",
    base04: "#848cb5",
    base05: "#3760bf",
    base06: "#2e7de9",
    base07: "#1a1b26",
    base08: "#f52a65",
    base09: "#b15c00",
    base0A: "#8c6c3e",
    base0B: "#587539",
    base0C: "#007197",
    base0D: "#2e7de9",
    base0E: "#9854f1",
    base0F: "#5a4a78",
  },
});

const GRUVBOX_LIGHT_THEME = createTheme({
  id: "gruvbox-light",
  label: "Gruvbox Light",
  mode: "light",
  base30: {
    white: "#3c3836",
    darker_black: "#f2e5bc",
    black: "#fbf1c7",
    black2: "#f2e5bc",
    one_bg: "#f2e5bc",
    one_bg2: "#ebdbb2",
    one_bg3: "#d5c4a1",
    grey: "#bdae93",
    grey_fg: "#7c6f64",
    grey_fg2: "#928374",
    light_grey: "#7c6f64",
    red: "#cc241d",
    baby_pink: "#9d0006",
    pink: "#8f3f71",
    green: "#98971a",
    vibrant_green: "#79740e",
    blue: "#458588",
    nord_blue: "#689d6a",
    yellow: "#b57614",
    sun: "#d79921",
    purple: "#8f3f71",
    dark_purple: "#6c3160",
    teal: "#689d6a",
    orange: "#d65d0e",
    cyan: "#427b58",
    line: "#d5c4a1",
    statusline_bg: "#ebdbb2",
    lightbg: "#ebdbb2",
    pmenu_bg: "#458588",
    folder_bg: "#689d6a",
  },
  base16: {
    base00: "#fbf1c7",
    base01: "#f2e5bc",
    base02: "#ebdbb2",
    base03: "#bdae93",
    base04: "#928374",
    base05: "#3c3836",
    base06: "#282828",
    base07: "#1d2021",
    base08: "#cc241d",
    base09: "#d65d0e",
    base0A: "#b57614",
    base0B: "#98971a",
    base0C: "#689d6a",
    base0D: "#458588",
    base0E: "#8f3f71",
    base0F: "#af3a03",
  },
});

const ROSE_PINE_DAWN_THEME = createTheme({
  id: "rose-pine-dawn",
  label: "Rose Pine Dawn",
  mode: "light",
  base30: {
    white: "#575279",
    darker_black: "#f2e9e1",
    black: "#faf4ed",
    black2: "#fffaf3",
    one_bg: "#fffaf3",
    one_bg2: "#f2e9e1",
    one_bg3: "#e6d9cf",
    grey: "#cecacd",
    grey_fg: "#797593",
    grey_fg2: "#9893a5",
    light_grey: "#797593",
    red: "#b4637a",
    baby_pink: "#b4637a",
    pink: "#d7827e",
    green: "#286983",
    vibrant_green: "#56949f",
    blue: "#56949f",
    nord_blue: "#907aa9",
    yellow: "#ea9d34",
    sun: "#d7827e",
    purple: "#907aa9",
    dark_purple: "#6e5d88",
    teal: "#286983",
    orange: "#d7827e",
    cyan: "#56949f",
    line: "#e6d9cf",
    statusline_bg: "#f2e9e1",
    lightbg: "#f2e9e1",
    pmenu_bg: "#907aa9",
    folder_bg: "#56949f",
  },
  base16: {
    base00: "#faf4ed",
    base01: "#fffaf3",
    base02: "#f2e9e1",
    base03: "#9893a5",
    base04: "#797593",
    base05: "#575279",
    base06: "#575279",
    base07: "#575279",
    base08: "#b4637a",
    base09: "#d7827e",
    base0A: "#ea9d34",
    base0B: "#286983",
    base0C: "#56949f",
    base0D: "#907aa9",
    base0E: "#907aa9",
    base0F: "#cecacd",
  },
});

const EVERFOREST_LIGHT_THEME = createTheme({
  id: "everforest-light",
  label: "Everforest Light",
  mode: "light",
  base30: {
    white: "#5c6a72",
    darker_black: "#f8f0dc",
    black: "#fdf6e3",
    black2: "#f6efdd",
    one_bg: "#f6efdd",
    one_bg2: "#efe7d4",
    one_bg3: "#e6ddc6",
    grey: "#d3c6aa",
    grey_fg: "#7a8478",
    grey_fg2: "#859289",
    light_grey: "#7a8478",
    red: "#f85552",
    baby_pink: "#e66868",
    pink: "#df69ba",
    green: "#8da101",
    vibrant_green: "#a7c957",
    blue: "#3a94c5",
    nord_blue: "#35a77c",
    yellow: "#dfa000",
    sun: "#e69875",
    purple: "#df69ba",
    dark_purple: "#b16286",
    teal: "#35a77c",
    orange: "#f57d26",
    cyan: "#35a77c",
    line: "#e6ddc6",
    statusline_bg: "#efe7d4",
    lightbg: "#efe7d4",
    pmenu_bg: "#3a94c5",
    folder_bg: "#35a77c",
  },
  base16: {
    base00: "#fdf6e3",
    base01: "#f6efdd",
    base02: "#efe7d4",
    base03: "#a6b0a0",
    base04: "#859289",
    base05: "#5c6a72",
    base06: "#4f5b58",
    base07: "#3a4440",
    base08: "#f85552",
    base09: "#f57d26",
    base0A: "#dfa000",
    base0B: "#8da101",
    base0C: "#35a77c",
    base0D: "#3a94c5",
    base0E: "#df69ba",
    base0F: "#e66868",
  },
});

export const BUILT_IN_THEMES = [
  PI_DARK_THEME,
  TOKYO_NIGHT_THEME,
  GRUVBOX_DARK_THEME,
  ROSE_PINE_MOON_THEME,
  EVERFOREST_DARK_THEME,
  PI_LIGHT_THEME,
  TOKYO_DAY_THEME,
  GRUVBOX_LIGHT_THEME,
  ROSE_PINE_DAWN_THEME,
  EVERFOREST_LIGHT_THEME,
] as const;

const FALLBACK_THEME_BY_MODE: Record<ThemeMode, Base46Theme> = {
  dark: PI_DARK_THEME,
  light: PI_LIGHT_THEME,
};

const THEMES_BY_ID = new Map<string, Base46Theme>(
  BUILT_IN_THEMES.map(theme => [theme.id, theme]),
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
    return normalized.split("").map(channel =>
      Number.parseInt(channel + channel, 16),
    ) as [number, number, number];
  }
  if (/^[0-9a-f]{6}$/i.test(normalized)) {
    return [0, 2, 4].map(index =>
      Number.parseInt(normalized.slice(index, index + 2), 16),
    ) as [number, number, number];
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

export function listThemes(mode?: ThemeMode): Base46Theme[] {
  const themes = mode
    ? BUILT_IN_THEMES.filter(theme => theme.mode === mode)
    : [...BUILT_IN_THEMES];
  return [...themes].sort((a, b) => a.label.localeCompare(b.label));
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

export function setThemePreferenceMode(
  preference: ThemePreference,
  mode: ThemeMode,
): ThemePreference {
  return {
    ...preference,
    mode,
  };
}

export function toggleThemePreferenceMode(
  preference: ThemePreference,
): ThemePreference {
  return setThemePreferenceMode(
    preference,
    preference.mode === "dark" ? "light" : "dark",
  );
}

export function setThemePreferenceTheme(
  preference: ThemePreference,
  mode: ThemeMode,
  themeId: string,
): ThemePreference {
  const theme = themeById(themeId);
  if (!theme || theme.mode !== mode) {
    return preference;
  }

  return mode === "dark"
    ? { ...preference, darkThemeId: theme.id }
    : { ...preference, lightThemeId: theme.id };
}

export function resolveThemePair(preference: ThemePreference): ThemePair {
  return {
    dark: themeById(preference.darkThemeId) ?? FALLBACK_THEME_BY_MODE.dark,
    light: themeById(preference.lightThemeId) ?? FALLBACK_THEME_BY_MODE.light,
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
    "--surface-selected": toRgba(
      base30.light_grey,
      mode === "dark" ? 0.4 : 0.2,
    ),
    "--focus-ring": toRgba(base16.base0D, mode === "dark" ? 0.35 : 0.28),
    "--focus-ring-muted": toRgba(
      base30.grey_fg,
      mode === "dark" ? 0.22 : 0.18,
    ),
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
    light: themeById(shell?.dataset.lightTheme) ?? FALLBACK_THEME_BY_MODE.light,
  };
}

export function readActiveThemeFromDom(): Base46Theme {
  const shell = document.querySelector<HTMLElement>(".app-shell");
  const mode = shell?.dataset.themeMode === "light" ? "light" : "dark";
  const pair = readThemePairFromDom();
  return themeById(shell?.dataset.theme) ?? (mode === "dark" ? pair.dark : pair.light);
}
