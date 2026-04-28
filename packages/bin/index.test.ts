import { describe, expect, it } from "vitest";

import { parseWebCommandOptions } from "./index";

describe("parseWebCommandOptions", () => {
  it("keeps interactive mode by default when UI is available", () => {
    expect(parseWebCommandOptions("", {}, true)).toEqual({
      headless: false,
      readyFile: undefined,
      shutdownFile: undefined,
    });
  });

  it("switches to headless mode automatically when no UI is available", () => {
    expect(parseWebCommandOptions("", {}, false)).toEqual({
      headless: true,
      readyFile: undefined,
      shutdownFile: undefined,
    });
  });

  it("accepts explicit headless mode and CI control files from the environment", () => {
    expect(
      parseWebCommandOptions(
        "--headless",
        {
          PI_WEB_READY_FILE: "/tmp/pi-web-ready.json",
          PI_WEB_SHUTDOWN_FILE: "/tmp/pi-web-shutdown.flag",
        },
        true,
      ),
    ).toEqual({
      headless: true,
      readyFile: "/tmp/pi-web-ready.json",
      shutdownFile: "/tmp/pi-web-shutdown.flag",
    });
  });

  it("treats truthy headless env values as enabled", () => {
    expect(parseWebCommandOptions("", { PI_WEB_HEADLESS: "yes" }, true)).toEqual({
      headless: true,
      readyFile: undefined,
      shutdownFile: undefined,
    });
  });
});
