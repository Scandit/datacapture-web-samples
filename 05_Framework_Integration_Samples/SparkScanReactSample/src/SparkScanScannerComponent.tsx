import {
  type Barcode,
  barcodeCaptureLoader,
  SparkScan,
  SparkScanBarcodeErrorFeedback,
  SparkScanBarcodeSuccessFeedback,
  type SparkScanScanningMode,
  type SparkScanSession,
  SparkScanSettings,
  SparkScanView,
  type SparkScanViewState,
  type SparkScanViewUiListener,
  Symbology,
  SymbologyDescription,
} from "@scandit/web-datacapture-barcode";
import { DataCaptureContext } from "@scandit/web-datacapture-core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CodesList } from "./CodesList.js";
import type { CodeItem } from "./types.js";

SparkScanView.register();

const isValidBarcode = (barcode: Barcode) => {
  return barcode.data !== "5901234123457";
};

export function SparkScanScannerComponent() {
  const [dataCaptureContext, setDataCaptureContext] = useState<DataCaptureContext | null>(null);
  const [sparkScan, setSparkScan] = useState<SparkScan | null>(null);
  const [codes, setCodes] = useState<CodeItem[]>([]);

  const addOrUpdateCode = useCallback((newData: string, newSymbology: string) => {
    setCodes((prev) => {
      const existing = prev.find((code) => code.data === newData && code.symbology === newSymbology);

      if (existing) {
        return prev.map((code) => (code === existing ? { ...code, quantity: code.quantity + 1 } : code));
      }

      return [...prev, { data: newData, symbology: newSymbology, quantity: 1 }];
    });
  }, []);

  const clearCodes = () => setCodes([]);

  const uiViewListener: SparkScanViewUiListener = useMemo(
    () => ({
      didChangeScanningMode(_scanningMode: SparkScanScanningMode) {
        // Runs when the scanning mode changes
      },
      didChangeViewState(_state: SparkScanViewState) {
        // Runs when the view state changes
      },
      didTapBarcodeFindButton(_view: SparkScanView) {
        // Runs when the barcode find button is tapped
      },
      didTapLabelCaptureButton(_view: SparkScanView) {
        // Runs when the label capture button is tapped
      },
    }),
    []
  );

  const sparkScanListener = useMemo(
    () => ({
      didScan(_mode: SparkScan, session: SparkScanSession) {
        const barcode = session.newlyRecognizedBarcode;

        if (!barcode || !isValidBarcode(barcode)) {
          return;
        }

        const symbology = new SymbologyDescription(barcode.symbology).readableName;
        addOrUpdateCode(barcode.data || "", symbology);
      },
    }),
    [addOrUpdateCode]
  );

  const feedbackDelegate = useMemo(() => {
    return {
      getFeedbackForBarcode: (barcode: Barcode) => {
        if (isValidBarcode(barcode)) {
          return new SparkScanBarcodeSuccessFeedback();
        }
        return new SparkScanBarcodeErrorFeedback("Barcode rejected.", 60_000);
      },
    };
  }, []);

  // Initialize SDK and create SparkScan mode
  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      try {
        // Enter your Scandit License key here.
        // Your Scandit License key is available via your Scandit SDK web account.
        const context = await DataCaptureContext.forLicenseKey("-- ENTER YOUR SCANDIT LICENSE KEY HERE --", {
          libraryLocation: new URL("library/engine/", document.baseURI).toString(),
          moduleLoaders: [barcodeCaptureLoader()],
        });

        const settings = new SparkScanSettings();
        settings.enableSymbologies([Symbology.EAN13UPCA, Symbology.Code128]);

        const mode = SparkScan.forSettings(settings);
        mode.addListener(sparkScanListener);

        if (isMounted) {
          setDataCaptureContext(context);
          setSparkScan(mode);
        }
      } catch (error) {
        console.error("SparkScan initialization failed:", error);
      }
    }

    initialize();

    return () => {
      isMounted = false;
    };
  }, [sparkScanListener]);

  return (
    <>
      {dataCaptureContext && sparkScan ? (
        <spark-scan-view
          dataCaptureContext={dataCaptureContext}
          sparkScan={sparkScan}
          feedbackDelegate={feedbackDelegate}
          ref={(view: SparkScanView | null) => {
            if (view) {
              view.setListener(uiViewListener);
            }
          }}
        />
      ) : null}
      <CodesList codes={codes} onClear={clearCodes} />
    </>
  );
}
