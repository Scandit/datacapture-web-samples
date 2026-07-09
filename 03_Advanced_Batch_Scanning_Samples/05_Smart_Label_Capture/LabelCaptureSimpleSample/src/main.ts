import { Symbology } from "@scandit/web-datacapture-barcode";
import { Camera, DataCaptureContext, DataCaptureView, FrameSourceState } from "@scandit/web-datacapture-core";
import {
  customBarcode,
  expiryDateText,
  LabelCapture,
  LabelCaptureBasicOverlay,
  LabelCaptureValidationFlowListener,
  LabelCaptureValidationFlowOverlay,
  LabelCaptureValidationFlowSettings,
  LabelDateComponentFormat,
  LabelDateFormat,
  LabelDateResult,
  LabelField,
  LabelFieldType,
  // imeiOneBarcode,
  // imeiTwoBarcode,
  label,
  labelCaptureLoader,
  // AdaptiveRecognitionMode,
  labelCaptureSettings,
  // serialNumberBarcode,
  totalPriceText,
} from "@scandit/web-datacapture-label";

const elements = {
  dataCaptureView: document.getElementById("data-capture-view") as HTMLElement,
  dialog: document.querySelector("dialog") as HTMLDialogElement,
};

interface CapturedLabelField {
  name: string;
  value: string;
}

function formatDate(date: LabelDateResult): string {
  return `${date.day} - ${date.month} - ${date.year}`;
}

function extractFieldInfo(field: LabelField): CapturedLabelField {
  let value: string;

  switch (field.type) {
    case LabelFieldType.Text: {
      const date = field.date;
      if (date) {
        value = formatDate(date);
      } else {
        value = field.text ?? "N/A";
      }
      break;
    }
    case LabelFieldType.Barcode: {
      value = field.barcode?.data ?? field.text ?? "N/A";
      break;
    }
    default: {
      value = field.date ? formatDate(field.date) : (field.barcode?.data ?? field.text ?? "N/A");
    }
  }

  return { name: field.name, value };
}

async function main() {
  const view = new DataCaptureView();
  view.connectToElement(elements.dataCaptureView);
  view.showProgressBar();

  // Enter your Scandit License key here.
  // Your Scandit License key is available via your Scandit SDK web account.
  const context = await DataCaptureContext.forLicenseKey("-- ENTER YOUR SCANDIT LICENSE KEY HERE --", {
    libraryLocation: new URL("library/engine", document.baseURI).toString(),
    moduleLoaders: [labelCaptureLoader()],
  });
  await view.setContext(context);

  const camera = Camera.pickBestGuess();

  await context.setFrameSource(camera);
  await camera.applySettings(LabelCapture.createRecommendedCameraSettings());
  await camera.switchToDesiredState(FrameSourceState.On);
  view.hideProgressBar();

  const settings = await labelCaptureSettings()
    .addLabel(
      label("Perishable Product")
        // Uncomment this to enable adaptive recognition mode
        // .adaptiveRecognitionMode(AdaptiveRecognitionMode.Auto)
        .addCustomBarcode(
          customBarcode("Barcode")
            .isOptional(false)
            .setSymbologies([Symbology.EAN13UPCA, Symbology.GS1DatabarExpanded, Symbology.Code128])
        )
        .addExpiryDateText(
          expiryDateText("Expiry Date")
            .isOptional(false)
            .resetAnchorRegexes()
            .setLabelDateFormat(new LabelDateFormat(LabelDateComponentFormat.MDY))
        )
        .addTotalPriceText(totalPriceText("Total Price").isOptional(true))
    )
    // Note: You can customize the label definition to adapt it to your use-case.
    // For example, you can use the following label definition for Smartphone Box Scanning:
    // .addLabel(
    //   label("Smartphone Box")
    //     .addCustomBarcode(
    //       customBarcode("Barcode")
    //         .isOptional(false)
    //         .setSymbologies([Symbology.EAN13UPCA, Symbology.Code128, Symbology.Code39, Symbology.InterleavedTwoOfFive])
    //     )
    //     .addImeiOneBarcode(imeiOneBarcode("IMEI1").isOptional(false).setSymbology(Symbology.Code128))
    //     .addImeiTwoBarcode(imeiTwoBarcode("IMEI2").isOptional(false).setSymbology(Symbology.Code128))
    //     .addSerialNumberBarcode(
    //       serialNumberBarcode("Serial Number").isOptional(false).setSymbology(Symbology.Code128)
    //     )
    // )
    .build();

  // Create the label capture mode
  const mode = await LabelCapture.forContext(context, settings);

  // Set up the basic overlay
  await LabelCaptureBasicOverlay.withLabelCaptureForView(mode, view);

  // Set up the validation flow overlay
  const overlay = await LabelCaptureValidationFlowOverlay.withLabelCaptureForView(mode, view);

  // Configure placeholder texts for input fields
  const validationFlowSettings = await LabelCaptureValidationFlowSettings.create();
  await validationFlowSettings.setPlaceholderTextForLabelDefinition("Expiry Date", "MM.DD.YY");
  await validationFlowSettings.setPlaceholderTextForLabelDefinition("Total Price", "e.g., $13.66");
  await overlay.applySettings(validationFlowSettings);

  overlay.listener = {
    onManualInput: (_field: LabelField, _oldValue: string | null, _newValue: string) => {
      // This function is called when the user manually inputs a value for a field.
    },
    onValidationFlowLabelCaptured: async (fields: LabelField[]) => {
      await mode.setEnabled(false);
      await context.frameSource?.switchToDesiredState(FrameSourceState.Standby);

      let dialogHTML = "<h3 class='text-xl font-bold uppercase text-center mb-4'>Label Captured</h3>";
      for (const field of fields) {
        const capturedField = extractFieldInfo(field);
        dialogHTML += `<p class="w-full truncate text-sm">${capturedField.name}: ${capturedField.value}</p>`;
      }
      dialogHTML += `<button class="w-full p-4 mt-8 bg-black text-white uppercase font-bold rounded-md">Continue Scanning</button>`;
      elements.dialog.innerHTML = dialogHTML;

      elements.dialog.querySelector("button")?.addEventListener(
        "click",
        async function listener() {
          elements.dialog.close();
          await mode.setEnabled(true);
          await context.frameSource?.switchToDesiredState(FrameSourceState.On);
        },
        { once: true }
      );

      elements.dialog.showModal();
    },
  } as LabelCaptureValidationFlowListener;
}

main().catch(console.error);
