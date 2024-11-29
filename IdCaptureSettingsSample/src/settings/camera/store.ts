import type { TorchState, Camera, CameraSettings } from "@scandit/web-datacapture-core";
import { VideoResolution } from "@scandit/web-datacapture-core";
import { writable } from "svelte/store";

export const availableCameras = writable<Camera[]>([]);
export const currentCamera = writable<Camera>();
export const desiredTorchState = writable<TorchState>();
export const cameraSettings = writable<CameraSettings>();

export const videoResolutionHeightDictionary: ReadonlyMap<VideoResolution, number> = new Map([
  [VideoResolution.Auto, 0],
  [VideoResolution.HD, 720],
  [VideoResolution.FullHD, 1080],
  [VideoResolution.UHD4K, 2160],
]);

export function isResolutionSupported(camera: Camera, resolution: VideoResolution): boolean {
  const cameraResolution = camera.currentResolution ?? {
    height: 0,
    width: 0,
  };
  const requiredValue = videoResolutionHeightDictionary.get(resolution)!;

  return !(cameraResolution.width < requiredValue || cameraResolution.height < requiredValue);
}

export function mapVideoResolutionToLabel(resolution: VideoResolution): string {
  return {
    [VideoResolution.Auto]: "Auto",
    [VideoResolution.HD]: "HD",
    [VideoResolution.FullHD]: "Full HD",
    [VideoResolution.UHD4K]: "UHD 4K",
  }[resolution];
}
