import type { BarcodeCaptureListener } from "@scandit/web-datacapture-barcode";
import {
  BarcodeCapture,
  barcodeCaptureLoader,
  BarcodeCaptureOverlay,
  BarcodeCaptureSettings,
  Symbology,
} from "@scandit/web-datacapture-barcode";
import { CameraSwitchControl } from "@scandit/web-datacapture-core";
import {
  Camera,
  configure,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
} from "@scandit/web-datacapture-core";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

enum SDKStatus {
  Uninitialized = "uninitialized",
  Initializing = "initializing",
  Ready = "ready",
  Error = "error",
}

interface SDKState {
  context?: DataCaptureContext;
  view?: DataCaptureView;
  settings?: BarcodeCaptureSettings;
  barcodeCapture?: BarcodeCapture;
  overlay?: BarcodeCaptureOverlay;
  camera?: Camera;
  cameraSwitchControl?: CameraSwitchControl;
  host?: HTMLElement;
  status: SDKStatus;
  isScanning: boolean;
  isCameraOn: boolean;
}

interface SDKWithLoadingStatus {
  loading: boolean;
  loaded: boolean;
  sdk: SDKController;
}

export const SDKContext = createContext<SDKWithLoadingStatus>({
  loading: false,
  loaded: false,
  sdk: null as unknown as SDKController,
});

class SDKController {
  private state: SDKState = {
    status: SDKStatus.Uninitialized,
    isScanning: false,
    isCameraOn: false,
  };

  public async initialize(): Promise<void> {
    if (this.state.status !== SDKStatus.Uninitialized) return;

    try {
      this.state.status = SDKStatus.Initializing;

      await configure({
        libraryLocation: new URL("library/engine", document.baseURI).toString(),
        licenseKey: "-- ENTER YOUR SCANDIT LICENSE KEY HERE --",
        moduleLoaders: [barcodeCaptureLoader()],
      });

      await this.initializeComponents();
      this.state.status = SDKStatus.Ready;
    } catch (error) {
      this.state.status = SDKStatus.Error;
      throw error;
    }
  }

  public async cleanup(isStrictModeCleanup: boolean = false): Promise<void> {
    if (isStrictModeCleanup) {
      return;
    }

    if (this.state.barcodeCapture) {
      await this.state.barcodeCapture.setEnabled(false);
    }
    if (this.state.context?.frameSource) {
      await this.state.context.frameSource.switchToDesiredState(FrameSourceState.Off);
    }

    await this.state.context?.dispose();
    await this.state.context?.removeAllModes();
    this.state.view?.detachFromElement();
    this.state.host?.remove();

    this.state = {
      status: SDKStatus.Uninitialized,
      isScanning: false,
      isCameraOn: false,
    };
  }

  public async enableScanning(enabled: boolean): Promise<void> {
    if (this.state.status !== SDKStatus.Ready) return;

    if (enabled && !this.state.isScanning) {
      await this.enableCamera(true);
      await this.state.barcodeCapture?.setEnabled(true);
      this.state.isScanning = true;
    } else if (!enabled && this.state.isScanning) {
      await this.state.barcodeCapture?.setEnabled(false);
      this.state.isScanning = false;
    }
  }

  public async enableCamera(enabled: boolean): Promise<void> {
    if (this.state.status !== SDKStatus.Ready || this.state.isCameraOn === enabled) return;

    if (this.state.context?.frameSource) {
      await this.state.context.frameSource.switchToDesiredState(enabled ? FrameSourceState.On : FrameSourceState.Off);
      this.state.isCameraOn = enabled;
    }
  }

  public async enableSymbology(symbology: Symbology, enabled: boolean): Promise<void> {
    if (this.state.status !== SDKStatus.Ready) return;
    this.state.settings?.enableSymbology(symbology, enabled);
    if (this.state.settings) {
      await this.state.barcodeCapture?.applySettings(this.state.settings);
    }
  }

  public connectToElement(element: HTMLElement): void {
    if (!this.state.host || this.state.status !== SDKStatus.Ready) return;
    this.state.host.style.display = "block";
    element.append(this.state.host);
  }

  public detachFromElement(): void {
    if (!this.state.host) return;
    this.state.host.style.display = "none";
    document.body.append(this.state.host);
  }

  public addBarcodeCaptureListener(listener: BarcodeCaptureListener): void {
    this.state.barcodeCapture?.addListener(listener);
  }

  public removeBarcodeCaptureListener(listener: BarcodeCaptureListener): void {
    this.state.barcodeCapture?.removeListener(listener);
  }

  public getStatus(): SDKStatus {
    return this.state.status;
  }

  public getEnabledSymbologies(): Symbology[] | undefined {
    return this.state.settings?.enabledSymbologies;
  }

  private createHostElement(): HTMLElement {
    const element = document.createElement("div");
    element.style.display = "none";
    element.style.width = "100%";
    element.style.height = "100%";
    document.body.append(element);
    return element;
  }

  private async initializeComponents(): Promise<void> {
    this.state.cameraSwitchControl = new CameraSwitchControl();
    this.state.view = new DataCaptureView();
    this.state.host = this.createHostElement();
    this.state.view.connectToElement(this.state.host);
    this.state.view.addControl(this.state.cameraSwitchControl);

    this.state.settings = new BarcodeCaptureSettings();
    this.state.settings.enableSymbologies([
      Symbology.EAN13UPCA,
      Symbology.EAN8,
      Symbology.UPCE,
      Symbology.QR,
      Symbology.DataMatrix,
      Symbology.Code39,
      Symbology.Code128,
      Symbology.InterleavedTwoOfFive,
    ]);

    this.state.context = await DataCaptureContext.create();
    this.state.camera = Camera.default;
    await this.state.camera.applySettings(BarcodeCapture.recommendedCameraSettings);
    await this.state.context.setFrameSource(this.state.camera);

    this.state.barcodeCapture = await BarcodeCapture.forContext(this.state.context, this.state.settings);
    await this.state.view.setContext(this.state.context);

    this.state.overlay = await BarcodeCaptureOverlay.withBarcodeCaptureForView(
      this.state.barcodeCapture,
      this.state.view
    );
  }
}

export const SDKProvider = function SDKProvider({ children }: { children: ReactNode }): ReactElement {
  const [status, setStatus] = useState<SDKStatus>(SDKStatus.Uninitialized);
  const sdkReference = useRef<SDKController>(new SDKController());
  const strictModeReference = useRef(true);

  const sdk = sdkReference.current;

  useEffect((): (() => void) => {
    const initialize = async (): Promise<void> => {
      try {
        await sdk.initialize();
        setStatus(sdk.getStatus());
      } catch (error) {
        console.error("Failed to initialize SDK:", error);
        setStatus(SDKStatus.Error);
      }
    };

    void initialize();

    return (): void => {
      const isStrictModeCleanup = strictModeReference.current;
      strictModeReference.current = false;
      void sdk.cleanup(isStrictModeCleanup);
    };
  }, [sdk]);

  const value = useMemo(
    () => ({
      loading: status === SDKStatus.Initializing,
      loaded: status === SDKStatus.Ready,
      sdk,
    }),
    [status, sdk]
  );

  return <SDKContext.Provider value={value}>{children}</SDKContext.Provider>;
};

export function useSDK(): SDKWithLoadingStatus {
  return useContext(SDKContext);
}
