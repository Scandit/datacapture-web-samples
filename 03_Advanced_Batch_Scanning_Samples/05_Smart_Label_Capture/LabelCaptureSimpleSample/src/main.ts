import { Symbology } from "@scandit/web-datacapture-barcode";
import { Camera, DataCaptureContext, DataCaptureView, FrameSourceState } from "@scandit/web-datacapture-core";
import {
  CustomBarcodeBuilder,
  ExpiryDateTextBuilder,
  LabelCapture,
  LabelCaptureBasicOverlay,
  labelCaptureLoader,
  LabelCaptureSettingsBuilder,
  LabelCaptureValidationFlowListener,
  LabelCaptureValidationFlowOverlay,
  LabelDateComponentFormat,
  LabelDateFormat,
  LabelDateResult,
  LabelDefinitionBuilder,
  LabelField,
  LabelFieldType,
  UnitPriceTextBuilder,
  WeightTextBuilder,
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

  const retailItemLabel = await new LabelDefinitionBuilder()
    .addCustomBarcode(
      await new CustomBarcodeBuilder()
        .isOptional(false)
        .setSymbologies([Symbology.EAN13UPCA, Symbology.GS1DatabarExpanded, Symbology.Code128])
        .build("Barcode")
    )
    .addExpiryDateText(
      await new ExpiryDateTextBuilder()
        .isOptional(true)
        .setLabelDateFormat(new LabelDateFormat(LabelDateComponentFormat.MDY))
        .build("Expiry Date")
    )
    .addWeightText(await new WeightTextBuilder().isOptional(true).build("Weight"))
    .addUnitPriceText(await new UnitPriceTextBuilder().isOptional(true).build("Unit Price"))
    .build("Retail Item");

  // Note: You can customize the label definition to adapt it to your use-case.
  // For example, you can use the following label definition for Smart Devices box Scanning:
  /*
  const smartDeviceLabel = await new LabelDefinitionBuilder()
    .addCustomBarcode(
      await new CustomBarcodeBuilder()
        .isOptional(false)
        .setSymbologies([
          Symbology.EAN13UPCA,
          Symbology.Code128,
          Symbology.Code39,
          Symbology.InterleavedTwoOfFive
        ])
        .build("Barcode")
    )
    .addImeiOneBarcode(
      await new ImeiOneBarcodeBuilder()
        .isOptional(false)
        .setSymbology(Symbology.Code128)
        .build("IMEI1")
    )
    .addImeiTwoBarcode(
      await new ImeiTwoBarcodeBuilder()
        .isOptional(true)
        .setSymbology(Symbology.Code128)
        .build("IMEI2")
    )
    .addSerialNumberBarcode(
      await new SerialNumberBarcodeBuilder()
        .isOptional(true)
        .setSymbology(Symbology.Code128)
        .build("Serial Number")
    )
    .build("Smart Device");
  */

  const settings = await new LabelCaptureSettingsBuilder()
    .addLabel(retailItemLabel)
    // .addLabel(smartDeviceLabel) // Uncomment to use smart device label
    .build();

  // Create the label capture mode
  const mode = await LabelCapture.forContext(context, settings);

  // Set up the basic overlay
  await LabelCaptureBasicOverlay.withLabelCaptureForView(mode, view);

  // Set up the validation flow overlay
  const overlay = await LabelCaptureValidationFlowOverlay.withLabelCaptureForView(mode, view);
  overlay.listener = {
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
