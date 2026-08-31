// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  Anchor,
  Brush,
  Camera,
  Color,
  DataCaptureContext,
  DataCaptureView,
  Feedback,
  FrameSourceState,
  MeasureUnit,
  NumberWithUnit,
  PointWithUnit,
  ScanditIconBuilder,
  ScanditIconShape,
  ScanditIconType,
} from "@scandit/web-datacapture-core";
import {
  CapturedLabel,
  LabelCapture,
  LabelCaptureAdvancedOverlay,
  LabelCaptureBasicOverlay,
  LabelCaptureBasicOverlayListener,
  LabelCaptureFeedback,
  LabelCaptureListener,
  LabelCaptureSession,
  LabelCaptureSettings,
  LabelDefinition,
  LabelField,
  LabelFieldState,
  labelCaptureLoader,
} from "@scandit/web-datacapture-label";
import csvContent from "./barcode_price_database.csv?raw";

const LABEL_DEFINITION_NAME = "PRICE-LABEL";
const SKU_FIELD_NAME = "SKU";
const PRICE_TEXT_FIELD_NAME = "priceText";

// Reference database loaded from barcode_price_database.csv (same format as the iOS sample).
// Lines starting with '#' and blank lines are ignored. Each data line is "barcode,price".
function parsePriceDatabase(csv: string): Record<string, number> {
  const db: Record<string, number> = {};
  for (const rawLine of csv.split("\n")) {
    const line = rawLine.trim();
    if (line.length === 0 || line.startsWith("#")) {
      continue;
    }
    const commaIndex = line.indexOf(",");
    if (commaIndex === -1) {
      continue;
    }
    const barcode = line.slice(0, commaIndex).trim();
    const price = Number.parseFloat(line.slice(commaIndex + 1).trim());
    if (barcode.length > 0 && !Number.isNaN(price)) {
      db[barcode] = price;
    }
  }
  return db;
}

const PRICE_DATABASE = parsePriceDatabase(csvContent);

type ValidationResult = "correct" | "incorrect" | "unknown";

function validate(barcode: string, priceText: string): ValidationResult {
  const expected = PRICE_DATABASE[barcode];
  if (expected == null) {
    return "unknown";
  }
  const captured = Number.parseFloat(priceText);
  if (Number.isNaN(captured)) {
    return "unknown";
  }
  return Math.abs(captured - expected) < 0.005 ? "correct" : "incorrect";
}

const RESULT_CONFIG: Record<ValidationResult, { color: Color; iconType: ScanditIconType }> = {
  correct: { color: Color.fromRGBA(13, 133, 61, 1), iconType: ScanditIconType.Checkmark },
  incorrect: { color: Color.fromRGBA(217, 33, 33, 1), iconType: ScanditIconType.XMark },
  unknown: { color: Color.fromRGBA(240, 189, 48, 1), iconType: ScanditIconType.QuestionMark },
};

// biome-ignore lint/suspicious/useAwait: .build returns a promise
async function makePinElement(result: ValidationResult): Promise<HTMLElement> {
  const { color, iconType } = RESULT_CONFIG[result];
  return new ScanditIconBuilder()
    .withIcon(iconType)
    .withBackgroundShape(ScanditIconShape.Circle)
    .withBackgroundColor(color)
    .withBackgroundStrokeColor(Color.fromHex("#ffffff"))
    .withBackgroundStrokeWidth(2)
    .withIconColor(Color.fromHex("#ffffff"))
    .withWidth(24)
    .withHeight(24)
    .withIconSize(16)
    .build();
}

async function main() {
  const view = new DataCaptureView();
  view.connectToElement(document.getElementById("data-capture-view") as HTMLElement);
  view.showProgressBar();

  // Enter your Scandit License key here.
  // Your Scandit License key is available via your Scandit SDK web account.
  await DataCaptureContext.forLicenseKey("-- ENTER YOUR SCANDIT LICENSE KEY HERE --", {
    libraryLocation: new URL("library/engine", document.baseURI).toString(),
    moduleLoaders: [labelCaptureLoader()],
  });
  await view.setContext(DataCaptureContext.sharedInstance);

  const camera = Camera.pickBestGuess();
  await DataCaptureContext.sharedInstance.setFrameSource(camera);
  await camera.applySettings(LabelCapture.createRecommendedCameraSettings());
  await camera.switchToDesiredState(FrameSourceState.On);
  view.hideProgressBar();

  // Use the priceCapture preset: captures a SKU barcode and a price text field together.
  const priceDefinition = await LabelDefinition.createPriceCaptureDefinition(LABEL_DEFINITION_NAME);
  const settings = await LabelCaptureSettings.fromLabelDefinitions([priceDefinition]);
  const mode = await LabelCapture.forContext(DataCaptureContext.sharedInstance, settings);

  // Disable the automatic capture sound; the status pin is the visual feedback.
  const feedback = LabelCaptureFeedback.default;
  feedback.success = new Feedback(null, null);
  mode.feedback = feedback;

  // Basic overlay: draw a colored border around the price text field only.
  const clearBrush = Brush.transparent;
  const basicOverlay = await LabelCaptureBasicOverlay.withLabelCaptureForView(mode, view);
  await basicOverlay.setDefaultLabelBrush(clearBrush);
  for (const state of [LabelFieldState.Captured, LabelFieldState.Predicted]) {
    await basicOverlay.setDefaultFieldBrush(clearBrush, state);
  }

  const labelCaptureBasicOverlayListener: LabelCaptureBasicOverlayListener = {
    brushForField(_overlay: LabelCaptureBasicOverlay, field: LabelField, label: CapturedLabel) {
      if (field.name !== PRICE_TEXT_FIELD_NAME) {
        return clearBrush;
      }
      const barcode = label.fields.find((f) => f.name === SKU_FIELD_NAME)?.barcode?.data ?? "";
      const priceText = field.text ?? "";
      const result = validate(barcode, priceText);
      const brush = new Brush(Color.fromRGBA(0, 0, 0, 0), RESULT_CONFIG[result].color, 1);
      return brush;
    },
    brushForLabel() {
      return clearBrush;
    },
  };
  await basicOverlay.setListener(labelCaptureBasicOverlayListener);

  // Advanced overlay: float a circular status pin above the price text field.
  const advancedOverlay = await LabelCaptureAdvancedOverlay.withLabelCaptureForView(mode, view);

  const pinOffset = new PointWithUnit(
    new NumberWithUnit(12, MeasureUnit.Pixel),
    new NumberWithUnit(-10, MeasureUnit.Pixel)
  );
  const labelCaptureListener: LabelCaptureListener = {
    async didUpdateSession(_mode: LabelCapture, session: LabelCaptureSession) {
      for (const capturedLabel of session.capturedLabels) {
        const priceField = capturedLabel.fields.find((f) => f.name === PRICE_TEXT_FIELD_NAME);
        if (!priceField) {
          continue;
        }

        const barcode = capturedLabel.fields.find((f) => f.name === SKU_FIELD_NAME)?.barcode?.data ?? "";
        const priceText = priceField.text ?? "";
        const result = validate(barcode, priceText);

        advancedOverlay.setViewForCapturedLabelField(priceField, capturedLabel, await makePinElement(result));
        advancedOverlay.setAnchorForCapturedLabelField(priceField, capturedLabel, Anchor.TopCenter);
        advancedOverlay.setOffsetForCapturedLabelField(priceField, capturedLabel, pinOffset);
      }
    },
  };
  mode.addListener(labelCaptureListener);
}

main().catch(console.error);
