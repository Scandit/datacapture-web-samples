import { idCaptureSettingsStore } from "@/settings/id-capture/store";
import { logoAnchor, logoOffset, logoStyle } from "@/settings/view/logo/store";
import {
  BrushType,
  layoutCapturedBrush,
  layoutLineStyle,
  layoutLocalizedBrush,
  layoutStyle,
  showTextHints,
} from "@/settings/view/overlay/store";
import { pointOfInterest } from "@/settings/view/point-of-interest/store";
import { scanAreaMargins } from "@/settings/view/scan-area/store";
import {
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  configure,
  Camera,
  CameraPosition,
  TorchState,
} from "@scandit/web-datacapture-core";
import type { IdCaptureOverlay } from "@scandit/web-datacapture-id";
import { IdCapture, idCaptureLoader } from "@scandit/web-datacapture-id";
import { availableCameras, cameraSettings, currentCamera, desiredTorchState } from "../settings/camera/store";
import { isSdkConfigured } from "../store";
import { SDKCameraManager } from "./camera";
import { SDKIdCaptureManager } from "./idCapture";
import { SDKViewManager } from "./view";

export class SDKManager {
  public context: DataCaptureContext;

  public dataCaptureView: DataCaptureView;

  public idCaptureOverlay: IdCaptureOverlay;

  public view: SDKViewManager = new SDKViewManager(this);

  public camera: SDKCameraManager = new SDKCameraManager(this);

  public idCapture: SDKIdCaptureManager = new SDKIdCaptureManager(this);

  public async configure(licenseKey: string, htmlElement: HTMLElement): Promise<void> {
    this.dataCaptureView = new DataCaptureView();
    this.dataCaptureView.connectToElement(htmlElement);
    this.dataCaptureView.showProgressBar();

    await configure({
      licenseKey,
      libraryLocation: new URL("library/engine/", globalThis.location.href.replace(/index\.html.*/, "")).toString(),
      moduleLoaders: [idCaptureLoader({ enableVIZDocuments: true })],
    }).catch((error: unknown) => {
      let errorMessage = (error as Error).toString();
      if (error instanceof Error && error.name === "NoLicenseKeyError") {
        errorMessage = `
          NoLicenseKeyError:

          Make sure SCANDIT_LICENSE_KEY is available in your environment, by either:
          - running \`SCANDIT_LICENSE_KEY=<YOUR_LICENSE_KEY> npm run build\`
          - placing your license key in a \`.env\` file at the root of the sample directory
          — or by inserting your license key into \`index.ts\`, replacing the placeholder \`-- ENTER YOUR SCANDIT LICENSE KEY HERE --\` with the key.
        `;
      }
      // eslint-disable-next-line no-console
      console.error(error);
      alert(errorMessage);
    });

    this.dataCaptureView.hideProgressBar();
  }

  public async init(): Promise<void> {
    this.context = await DataCaptureContext.create();
    await this.dataCaptureView.setContext(this.context);

    const cameras = await this.camera.populateCameras();
    // Let the SDK select the best world facing camera
    const camera = Camera.atPosition(CameraPosition.WorldFacing)!;
    const initialCameraSettings = IdCapture.recommendedCameraSettings;
    await camera.applySettings(initialCameraSettings);
    await this.context.setFrameSource(camera);

    await this.idCapture.init();

    await camera.switchToDesiredState(FrameSourceState.On);
    await this.idCapture.setEnabled(true);

    // update stores with initial values
    availableCameras.set(cameras);
    currentCamera.set(camera);
    desiredTorchState.set(TorchState.Off);
    cameraSettings.set(initialCameraSettings);
    idCaptureSettingsStore.set(this.idCapture.idCaptureSettings);
    scanAreaMargins.set(this.dataCaptureView.scanAreaMargins);
    pointOfInterest.set(this.dataCaptureView.pointOfInterest);

    layoutStyle.set(this.idCaptureOverlay.idLayoutStyle);
    layoutLineStyle.set(this.idCaptureOverlay.idLayoutLineStyle);
    layoutCapturedBrush.set(BrushType.Default);
    layoutLocalizedBrush.set(BrushType.Default);
    showTextHints.set(true);

    logoStyle.set(this.dataCaptureView.logoStyle);
    logoAnchor.set(this.dataCaptureView.logoAnchor);
    logoOffset.set(this.dataCaptureView.logoOffset);

    isSdkConfigured.set(true);
  }
}

export const sdkManager = new SDKManager();
