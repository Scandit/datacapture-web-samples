/* eslint-disable class-methods-use-this */
import type { SDKManager } from "./sdkManager";
import type { TorchState, VideoResolution } from "@scandit/web-datacapture-core";
import { CameraSettings, FrameSourceState, Camera, CameraAccess } from "@scandit/web-datacapture-core";
import { get } from "svelte/store";
import { availableCameras, cameraSettings, currentCamera } from "../settings/camera/store";

export class SDKCameraManager {
  private readonly sdkManager: SDKManager;

  public constructor(sdkManager: SDKManager) {
    this.sdkManager = sdkManager;
  }

  public async populateCameras(): Promise<Camera[]> {
    const cameras = (await CameraAccess.getCameras()).map((deviceCamera) => Camera.fromDeviceCamera(deviceCamera));
    availableCameras.set(cameras);

    return cameras;
  }

  public async updateFrameSource(deviceId: string): Promise<void> {
    const camera = get(availableCameras).find((cam) => cam.deviceId === deviceId);
    if (camera) {
      await this.sdkManager.context.frameSource?.switchToDesiredState(FrameSourceState.Off);
      const newCameraSettings = new CameraSettings(get(cameraSettings));
      await camera.applySettings(newCameraSettings);
      await this.sdkManager.context.setFrameSource(camera);
      await this.sdkManager.context.frameSource?.switchToDesiredState(FrameSourceState.On);
      if (this.sdkManager.context.frameSource != null) {
        currentCamera.set(this.sdkManager.context.frameSource as Camera);
      }
    }
  }

  public async updatePreferredResolution(camera: Camera, resolution: string): Promise<void> {
    const settings = new CameraSettings(get(cameraSettings));
    settings.preferredResolution = resolution as VideoResolution;
    await camera.applySettings(settings);
    cameraSettings.set(settings);
    currentCamera.set(camera);
  }

  public async updateTorchState(newState: TorchState): Promise<void> {
    const camera = get(currentCamera) as Camera | null;
    if (camera != null) {
      await camera.setDesiredTorchState(newState);
      currentCamera.set(camera);
    }
    // we don't update the torch store here, as this function is triggered by a store change
  }

  public async updateZoomFactor(camera: Camera, factor: string): Promise<void> {
    const newFactor = Number(factor);
    const settings = new CameraSettings(get(cameraSettings));
    settings.zoomFactor = newFactor;
    await camera.applySettings(settings);
    cameraSettings.set(settings);
  }
}
