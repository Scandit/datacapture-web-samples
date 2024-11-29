import { barcodeCapture, dataCaptureContext, isSdkConfigured } from "@/store";
import {
  Camera,
  CameraAccess,
  CameraSettings,
  FrameSourceState,
  TorchState,
  FocusGestureStrategy,
  VideoResolution,
  DataCaptureContext,
} from "@scandit/web-datacapture-core";
import type { FrameSource } from "@scandit/web-datacapture-core";
import { get, writable } from "svelte/store";

export const cameraLabel = writable("");
export const isTorchAvailable = writable(false);
export const isTorchEnabled = writable(false);
export const preferredResolution = writable(VideoResolution.Auto);
export const zoomFactor = writable(1);
export const zoomGestureZoomFactor = writable(2);
export const focusGestureStrategy = writable(FocusGestureStrategy.ManualUntilCapture);
export const availableCameras = writable<Camera[]>([]);

export const videoResolutionHeightDictionary: ReadonlyMap<VideoResolution, number> = new Map([
  [VideoResolution.Auto, 0],
  [VideoResolution.HD, 720],
  [VideoResolution.FullHD, 1080],
  [VideoResolution.UHD4K, 2160],
]);

export function isResolutionSupported(resolution: VideoResolution): boolean {
  const $dataCaptureContext = get(dataCaptureContext);
  const resolutionHeightInPixels = videoResolutionHeightDictionary.get(resolution)!;
  const camera = $dataCaptureContext.frameSource as Camera;
  const cameraResolution = camera.currentResolution ?? {
    height: 0,
    width: 0,
  };
  return cameraResolution.height >= resolutionHeightInPixels || cameraResolution.width >= resolutionHeightInPixels;
}

export function mapVideoResolutionToLabel(resolution: VideoResolution): string {
  return {
    [VideoResolution.Auto]: "Auto",
    [VideoResolution.HD]: "HD",
    [VideoResolution.FullHD]: "Full HD",
    [VideoResolution.UHD4K]: "UHD 4K",
  }[resolution];
}

export function getCurrentCameraSettings(): CameraSettings {
  const currentCameraSettings = new CameraSettings();
  currentCameraSettings.focusGestureStrategy = get(focusGestureStrategy);
  currentCameraSettings.preferredResolution = get(preferredResolution);
  currentCameraSettings.zoomFactor = get(zoomFactor);
  currentCameraSettings.zoomGestureZoomFactor = get(zoomGestureZoomFactor);
  return currentCameraSettings;
}

export async function setupCameraStore(): Promise<void> {
  // Get the list of available camera devices.
  const availableDeviceCameras = await CameraAccess.getCameras();
  availableCameras.set(availableDeviceCameras.map((deviceCamera) => Camera.fromDeviceCamera(deviceCamera)));

  const $dataCaptureContext = get(dataCaptureContext);
  const initialCamera = $dataCaptureContext.frameSource as Camera;
  cameraLabel.set(initialCamera.label);
  isTorchAvailable.set(await initialCamera.isTorchAvailable());

  cameraLabel.subscribe(async ($cameraLabel) => {
    const $availableCameras = get(availableCameras);
    const currentCamera = $dataCaptureContext.frameSource as Camera;
    const newCamera = $availableCameras.find((camera) => camera.label === $cameraLabel);
    if ($cameraLabel === currentCamera.label || !newCamera) {
      return;
    }
    const newCameraSettings = new CameraSettings();
    newCameraSettings.focusGestureStrategy = get(focusGestureStrategy);
    newCameraSettings.preferredResolution = get(preferredResolution);
    newCameraSettings.zoomFactor = get(zoomFactor);
    newCameraSettings.zoomGestureZoomFactor = get(zoomGestureZoomFactor);
    await currentCamera.switchToDesiredState(FrameSourceState.Off);
    await newCamera.applySettings(newCameraSettings);
    await newCamera.switchToDesiredState(FrameSourceState.On);

    const $barcodeCapture = get(barcodeCapture);
    await $barcodeCapture.context?.setFrameSource(newCamera);
    isTorchAvailable.set(await newCamera.isTorchAvailable());
  });

  isTorchEnabled.subscribe(async ($isTorchEnabled) => {
    const currentCamera = $dataCaptureContext.frameSource as Camera;
    const desiredTorchState = $isTorchEnabled ? TorchState.On : TorchState.Off;
    await currentCamera.setDesiredTorchState(desiredTorchState);
  });

  preferredResolution.subscribe(async ($preferredResolution) => {
    const currentCamera = $dataCaptureContext.frameSource as Camera;
    const cameraSettings = getCurrentCameraSettings();
    cameraSettings.preferredResolution = $preferredResolution;
    await currentCamera.applySettings(cameraSettings);
  });

  zoomFactor.subscribe(async ($zoomFactor) => {
    const currentCamera = $dataCaptureContext.frameSource as Camera;
    const cameraSettings = getCurrentCameraSettings();
    cameraSettings.zoomFactor = $zoomFactor;
    await currentCamera.applySettings(cameraSettings);
  });

  zoomGestureZoomFactor.subscribe(async ($zoomGestureZoomFactor) => {
    const currentCamera = $dataCaptureContext.frameSource as Camera;
    const cameraSettings = getCurrentCameraSettings();
    cameraSettings.zoomGestureZoomFactor = $zoomGestureZoomFactor;
    await currentCamera.applySettings(cameraSettings);
  });

  focusGestureStrategy.subscribe(async ($focusGestureStrategy) => {
    const currentCamera = $dataCaptureContext.frameSource as Camera;
    const cameraSettings = getCurrentCameraSettings();
    cameraSettings.focusGestureStrategy = $focusGestureStrategy;
    await currentCamera.applySettings(cameraSettings);
  });

  $dataCaptureContext.addListener({
    didChangeFrameSource: (_: DataCaptureContext, frameSource: FrameSource) => {
      cameraLabel.set((frameSource as Camera).label);
    },
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    void setupCameraStore();
  }
});
