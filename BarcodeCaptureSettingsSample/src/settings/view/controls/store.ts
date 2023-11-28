import { dataCaptureView, isSdkConfigured } from "@/store";
import {
  CameraSwitchControl,
  TorchSwitchControl,
  type Control,
  CameraFOVSwitchControl,
  BrowserHelper,
} from "scandit-web-datacapture-core";
import { get, writable } from "svelte/store";

export const torchSwitchControl = new TorchSwitchControl();
export const cameraSwitchControl = new CameraSwitchControl();
export const cameraFOVSwitchControl = new CameraFOVSwitchControl();

export const enableTorchButton = writable(false);
export const enableCameraButton = writable(false);

export const enableCameraFOVSwitchControl = writable(false);
export const isIOSDeviceWithExtendedCameraAccess = writable(BrowserHelper.isIOSDeviceWithExtendedCameraAccess());

export function enableControl(control: Control, enabled: boolean): void {
  const $dataCaptureView = get(dataCaptureView);
  if (enabled) {
    $dataCaptureView.addControl(control);
  } else {
    $dataCaptureView.removeControl(control);
  }
}

export function setupControlsStore(): void {
  enableTorchButton.subscribe((value) => {
    enableControl(torchSwitchControl, value);
  });

  enableCameraButton.subscribe((value) => {
    enableControl(cameraSwitchControl, value);
  });

  enableCameraFOVSwitchControl.subscribe((value) => {
    enableControl(cameraFOVSwitchControl, value);
  });
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupControlsStore();
  }
});
