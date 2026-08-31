import * as path from "node:path";
import { ElectronApplication, _electron as electron, expect, Locator, test } from "@playwright/test";
import { findLatestBuild, parseElectronApp } from "electron-playwright-helpers";
import { isE2E_TESTS } from "../env";

let electronApp: ElectronApplication;
const consoleErrors: string[] = [];

test.beforeAll(async () => {
  const errors: Error[] = [];
  const latestBuild = findLatestBuild(path.join(process.cwd(), "dist"));
  const appInfo = parseElectronApp(latestBuild);
  electronApp = await electron.launch({
    args: [appInfo.main],
    executablePath: appInfo.executable,
    recordVideo: isE2E_TESTS() ? { dir: "e2e-videos/" } : undefined,
  });

  electronApp.on("window", (page) => {
    const filename = page.url()?.split("/").pop();
    console.log(`Window opened: ${filename}`);

    page.on("pageerror", (error) => {
      errors.push(error);
      console.error(error);
    });
    page.on("console", (msg) => {
      const text = msg.text();
      if (msg.type() === "error") {
        consoleErrors.push(text);
      }
      console.log(`[${msg.type()}] ${text}`);
    });

    expect(errors).toHaveLength(0);
  });
});

test.afterAll(async () => {
  await electronApp.close();
});

const isVideoPlaying = (video: Locator): Promise<boolean> => {
  return video.evaluate((e: HTMLVideoElement) => e.currentTime > 0 && !e.paused && !e.ended && e.readyState > 2);
};

test("should load without problem", async () => {
  const isPackaged = await electronApp.evaluate(({ app }) => {
    return app.isPackaged;
  });
  expect(isPackaged).toEqual(true);
  const page = await electronApp.firstWindow();

  await expect(page.getByText("Accessing Camera...")).toBeVisible();

  await expect(page.getByText("Accessing Camera...")).toBeHidden({ timeout: 20000 });

  await expect(page.locator("video")).toBeVisible({ timeout: 10000 });

  expect(await isVideoPlaying(page.locator("video"))).toBe(true);

  const licenseErrors = consoleErrors.filter((log) => log.includes("NoLicenseKeyError"));
  expect(licenseErrors, `License key errors in console:\n${licenseErrors.join("\n")}`).toHaveLength(0);
});
