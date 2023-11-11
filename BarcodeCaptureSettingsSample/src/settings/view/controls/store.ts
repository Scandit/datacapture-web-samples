import { dataCaptureView, isSdkConfigured } from "@/store";
import { CameraSwitchControl, TorchSwitchControl, type Control } from "scandit-web-datacapture-core";
import { get, writable } from "svelte/store";

export const torchSwitchControl = new TorchSwitchControl();
export const cameraSwitchControl = new CameraSwitchControl();

export const enableTorchButton = writable(false);
export const enableCameraButton = writable(false);

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
}

isSdkConfigured.subscribe(($isSdkConfigured) => {
  if ($isSdkConfigured) {
    setupControlsStore();
  }
});
