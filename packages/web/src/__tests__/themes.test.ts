import { describe, expect, it } from "vitest";
import {
  readStoredThemePreference,
  resolveActiveTheme,
  resolveAppThemeVars,
  resolveShikiTheme,
  toggleThemePreferenceMode,
} from "../themes";

describe("theme registry", () => {
  it("keeps legacy dark and light cache values working", () => {
    expect(readStoredThemePreference("dark", true)).toMatchObject({
      mode: "dark",
      darkThemeId: "pi-base46-dark",
      lightThemeId: "pi-base46-light",
    });
    expect(readStoredThemePreference("light", false)).toMatchObject({
      mode: "light",
      darkThemeId: "pi-base46-dark",
      lightThemeId: "pi-base46-light",
    });
  });

  it("sanitizes stored theme preferences against the registry", () => {
    const preference = readStoredThemePreference(
      JSON.stringify({
        mode: "light",
        darkThemeId: "pi-base46-light",
        lightThemeId: "missing-theme",
      }),
      false,
    );

    expect(preference).toEqual({
      mode: "light",
      darkThemeId: "pi-base46-dark",
      lightThemeId: "pi-base46-light",
    });
  });

  it("toggles theme mode without discarding theme ids", () => {
    const toggled = toggleThemePreferenceMode({
      mode: "dark",
      darkThemeId: "pi-base46-dark",
      lightThemeId: "pi-base46-light",
    });

    expect(toggled).toEqual({
      mode: "light",
      darkThemeId: "pi-base46-dark",
      lightThemeId: "pi-base46-light",
    });
  });

  it("derives app and shiki themes from the active Base46 theme", () => {
    const theme = resolveActiveTheme({
      mode: "dark",
      darkThemeId: "pi-base46-dark",
      lightThemeId: "pi-base46-light",
    });

    expect(resolveAppThemeVars(theme)).toMatchObject({
      "--bg": "#0d1117",
      "--accent": "#2f81f7",
      "--text": "#e6edf3",
    });
    expect(resolveShikiTheme(theme)).toMatchObject({
      name: "pi-base46-dark",
      type: "dark",
      bg: "#0d1117",
      fg: "#e6edf3",
    });
  });
});
