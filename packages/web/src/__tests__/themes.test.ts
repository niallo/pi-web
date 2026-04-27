import { describe, expect, it } from "vitest";
import {
  listThemes,
  readStoredThemePreference,
  resolveActiveTheme,
  resolveAppThemeVars,
  resolveShikiTheme,
  setThemePreferenceMode,
  setThemePreferenceTheme,
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

  it("lists multiple built-in themes for both modes", () => {
    expect(listThemes("dark").length).toBeGreaterThan(1);
    expect(listThemes("light").length).toBeGreaterThan(1);
    expect(listThemes("dark").every(theme => theme.mode === "dark")).toBe(true);
    expect(listThemes("light").every(theme => theme.mode === "light")).toBe(true);
  });

  it("updates the selected mode and assigned theme ids", () => {
    const preference = {
      mode: "dark" as const,
      darkThemeId: "pi-base46-dark",
      lightThemeId: "pi-base46-light",
    };

    expect(setThemePreferenceMode(preference, "light")).toMatchObject({
      mode: "light",
      darkThemeId: "pi-base46-dark",
      lightThemeId: "pi-base46-light",
    });
    expect(setThemePreferenceTheme(preference, "dark", "tokyo-night")).toMatchObject({
      darkThemeId: "tokyo-night",
      lightThemeId: "pi-base46-light",
    });
    expect(
      setThemePreferenceTheme(preference, "light", "tokyo-night"),
    ).toEqual(preference);
  });

  it("derives app and shiki themes from the active Base46 theme", () => {
    const theme = resolveActiveTheme({
      mode: "dark",
      darkThemeId: "tokyo-night",
      lightThemeId: "pi-base46-light",
    });

    expect(resolveAppThemeVars(theme)).toMatchObject({
      "--bg": "#1a1b26",
      "--accent": "#7aa2f7",
      "--text": "#c0caf5",
    });
    expect(resolveShikiTheme(theme)).toMatchObject({
      name: "tokyo-night",
      type: "dark",
      bg: "#1a1b26",
      fg: "#c0caf5",
    });
  });
});
