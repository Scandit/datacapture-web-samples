import { test, _electron as electron, ElectronApplication, expect, Locator } from "@playwright/test";

import { findLatestBuild, parseElectronApp } from "electron-playwright-helpers";
import * as path from "node:path";
import { isCI } from "../isCI";

let electronApp: ElectronApplication;
test.beforeAll(async () => {
  const errors: Error[] = [];
  const latestBuild = findLatestBuild(path.join(process.cwd(), "dist"));
  const appInfo = parseElectronApp(latestBuild);
  electronApp = await electron.launch({
    args: [appInfo.main],
    executablePath: appInfo.executable,
    recordVideo: isCI() ? { dir: "e2e-videos/" } : undefined,
  });
  electronApp.on("window", async (page) => {
    const filename = page.url()?.split("/").pop();
    console.log(`Window opened: ${filename}`);

    // capture errors
    page.on("pageerror", (error) => {
      errors.push(error);
      console.error(error);
    });
    // capture console messages
    page.on("console", (msg) => {
      console.log(msg.text());
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
  const isPackaged = await electronApp.evaluate(async ({ app }) => {
    // This runs in Electron's main process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.isPackaged;
  });
  expect(isPackaged).toEqual(true);
  const page = await electronApp.firstWindow();

  await expect(page.getByText("Loading the Scandit SDK...")).toBeVisible();

  await expect(page.getByText("Accessing Camera...")).toBeVisible();

  await expect(page.getByText("Accessing Camera...")).toBeHidden({ timeout: 10000 });

  await expect(page.locator("video")).toBeVisible({ timeout: 10000 });

  expect(await isVideoPlaying(page.locator("video"))).toBe(true);
});
