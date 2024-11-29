import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { BarcodeCaptureListener } from "@scandit/web-datacapture-barcode";
import {
  BarcodeCapture,
  barcodeCaptureLoader,
  BarcodeCaptureOverlay,
  BarcodeCaptureSettings,
  Symbology,
} from "@scandit/web-datacapture-barcode";
import {
  Camera,
  CameraSwitchControl,
  configure,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
} from "@scandit/web-datacapture-core";

export interface SDK {
  initialize: () => Promise<void>;
  cleanup: () => Promise<void>;
  connectToElement: (element: HTMLElement) => void;
  detachFromElement: () => void;
  enableCamera: (enabled: boolean) => Promise<void>;
  enableScanning: (enabled: boolean) => Promise<void>;
  enableSymbology: (symbology: Symbology, enabled: boolean) => Promise<void>;
  addBarcodeCaptureListener: (callback: BarcodeCaptureListener) => void;
  removeBarcodeCaptureListener: (callback: BarcodeCaptureListener) => void;
  getEnabledSymbologies: () => Symbology[] | undefined;
}

export interface SDKWithLoadingStatus {
  loading: boolean;
  loaded: boolean;
  sdk: SDK;
}

export function createSDKFacade(): SDK {
  let context: DataCaptureContext | undefined;
  let view: DataCaptureView | undefined;
  let settings: BarcodeCaptureSettings | undefined;
  let barcodeCapture: BarcodeCapture | undefined;
  let overlay: BarcodeCaptureOverlay | undefined;
  let host: HTMLElement | undefined;
  let cameraSwitchControl: CameraSwitchControl | undefined;
  let camera: Camera | undefined;

  function createHostElementIfNeeded(): HTMLElement {
    if (!host) {
      // ============================================================================================================
      // NOTE:
      // The following is a workaround to keep the scanner working correctly with React.
      // The DataCaptureView requires the host element to remain the same throughout its lifecycle.
      // Unfortunately, between re-renders, React doesn't keep the same nodes alive, but creates new ones each time.
      // This means that, between re-renders, the DataCaptureView might stop rendering overlays, viewfinders etc...
      // To fix this, we connect the DataCaptureView to a hidden element, then append it to a React component.
      // This allows us to keep the node alive, and the DataCaptureView rendering correctly.
      // When mounting the scanner component, we show the hidden node, then hide it when unmounting the <ScannerComponent />.
      // See also the `connectToElement` and `detachFromElement` facade methods for further context.
      // ============================================================================================================
      host = document.createElement("div");
      host.style.display = "none";
      host.style.width = "100%";
      host.style.height = "100%";
      document.body.append(host);
    }
    return host;
  }

  return {
    async initialize() {
      // Enter your Scandit License key here.
      // Your Scandit License key is available via your Scandit SDK web account.
      // The library location option represents the location of the wasm file, which will be fetched asynchronously.
      try {
        await configure({
          libraryLocation: new URL("library/engine", document.baseURI).toString(),
          licenseKey: "-- ENTER YOUR SCANDIT LICENSE KEY HERE --",
          moduleLoaders: [barcodeCaptureLoader()],
        });
      } catch(error: unknown) {
        const handledError = error as Error;
        let errorMessage = handledError.toString();
        if (handledError.name === "NoLicenseKeyError") {
          errorMessage = `
          NoLicenseKeyError:

          Make sure SCANDIT_LICENSE_KEY is available in your environment, by either:
          - running \`SCANDIT_LICENSE_KEY=<YOUR_LICENSE_KEY> npm run build\`
          - placing your license key in a \`.env\` file at the root of the sample directory
          — or by inserting your license key into \`sdk.tsx\`, replacing the placeholder \`-- ENTER YOUR SCANDIT LICENSE KEY HERE --\` with the key.
        `;
        }
        // eslint-disable-next-line no-console
        console.error(error);
        alert(errorMessage);
      }

      context = await DataCaptureContext.create();
      settings = new BarcodeCaptureSettings();
      settings.enableSymbologies([
        Symbology.EAN13UPCA,
        Symbology.EAN8,
        Symbology.UPCE,
        Symbology.QR,
        Symbology.DataMatrix,
        Symbology.Code39,
        Symbology.Code128,
        Symbology.InterleavedTwoOfFive,
      ]);

      view = await DataCaptureView.forContext(context);
      view.connectToElement(createHostElementIfNeeded());

      cameraSwitchControl = new CameraSwitchControl();
      view.addControl(cameraSwitchControl);

      barcodeCapture = await BarcodeCapture.forContext(context, settings);
      await barcodeCapture.setEnabled(false);

      overlay = await BarcodeCaptureOverlay.withBarcodeCaptureForView(barcodeCapture, view);
      await view.addOverlay(overlay);

      camera = Camera.default;
      await camera.applySettings(BarcodeCapture.recommendedCameraSettings);
      await context.setFrameSource(camera);
    },
    async cleanup() {
      await context?.frameSource?.switchToDesiredState(FrameSourceState.Off);
      await context?.dispose();
      await context?.removeAllModes();
      if (overlay) {
        await overlay.setViewfinder(null);
        await view?.removeOverlay(overlay);
      }
      if (cameraSwitchControl) {
        view?.removeControl(cameraSwitchControl);
        cameraSwitchControl = undefined;
      }
      view?.detachFromElement();
      barcodeCapture = undefined;
      context = undefined;
      view = undefined;
      settings = undefined;
      camera = undefined;
      host?.remove();
      host = undefined;
    },
    connectToElement(element: HTMLElement) {
      host = createHostElementIfNeeded();
      host.style.display = "block";
      element.append(host);
    },
    detachFromElement() {
      if (host) {
        host.style.display = "none";
        document.body.append(host);
      }
    },
    async enableCamera(enabled: boolean) {
      if (context?.frameSource) {
        await context.frameSource.switchToDesiredState(enabled ? FrameSourceState.On : FrameSourceState.Off);
      }
    },
    async enableScanning(enabled: boolean) {
      await barcodeCapture?.setEnabled(enabled);
    },
    async enableSymbology(symbology: Symbology, enabled: boolean) {
      settings!.enableSymbology(symbology, enabled);
      await barcodeCapture?.applySettings(settings!);
    },
    addBarcodeCaptureListener(listener: BarcodeCaptureListener) {
      barcodeCapture?.addListener(listener);
    },
    removeBarcodeCaptureListener(listener: BarcodeCaptureListener) {
      barcodeCapture?.removeListener(listener);
    },
    getEnabledSymbologies() {
      return settings!.enabledSymbologies;
    },
  };
}

export const SDKContext = createContext({
  loaded: false,
  loading: false,
  sdk: null,
} as unknown as SDKWithLoadingStatus);

export interface SDKProviderProps {
  children: ReactNode;
}

export default function SDKProvider({ children }: SDKProviderProps): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const sdk = useMemo(() => createSDKFacade(), []);

  const providerValue = useMemo(() => ({ loading, loaded, sdk }), [loading, loaded, sdk]);

  useEffect(() => {
    async function start(): Promise<void> {
      setLoading(true);
      await sdk.initialize();
      setLoading(false);
      setLoaded(true);
      // enable the camera on mount to speed up the access
      await sdk.enableCamera(true);
    }
    void start();
    return () => {
      void sdk.cleanup();
    };
  }, [sdk]);

  return <SDKContext.Provider value={providerValue}>{children}</SDKContext.Provider>;
}

export function useSDK(): SDKWithLoadingStatus {
  const value = useContext(SDKContext);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (value.sdk === null) {
    throw new Error("Sdk facade is null. Did you forget to wrap the component with SDKProvider?");
  }
  return value;
}
