import type { FrameSource } from "@scandit/web-datacapture-core";
import {
  Brush,
  Camera,
  CameraSwitchControl,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  Localization,
  SingleImageUploader,
  SingleImageUploaderSettings,
  configure,
} from "@scandit/web-datacapture-core";
import type { IdCaptureError, Listener, CapturedId } from "@scandit/web-datacapture-id";
import {
  RejectionReason,
  IdCapture,
  IdCaptureErrorCode,
  IdCaptureOverlay,
  IdCaptureSettings,
  IdCaptureTrigger,
  CapturedSides,
  idCaptureLoader,
  DriverLicense,
  Region,
  IdSide,
  IdImageType,
  FullDocumentScanner,
} from "@scandit/web-datacapture-id";
import * as UI from "./ui";

const LICENSE_KEY = "-- ENTER YOUR SCANDIT LICENSE KEY HERE --";

let context: DataCaptureContext;
let idCapture: IdCapture;
let view: DataCaptureView;
let frontSideData: string | null | undefined = null;
let backSideData: string | null | undefined = null;
let lastCameraFrameSource: FrameSource | null = null;
let singleImageFrameSource: SingleImageUploader | null = null;
let finalCapturedId: CapturedId | null = null;

const idCaptureListener: Listener = {
  didCaptureId: onCapturedId,
  didRejectId: onRejectedId,
  didFailWithError: onIdCaptureFailure,
};

// Load and initialize all the components
async function initScanner(): Promise<void> {
  view = new DataCaptureView();
  view.connectToElement(UI.elements.dataCaptureView);
  view.addControl(new CameraSwitchControl());
  view.showProgressBar();
  await configure({
    licenseKey: LICENSE_KEY,
    libraryLocation: new URL("library/engine/", document.baseURI).toString(),
    moduleLoaders: [idCaptureLoader({ enableVIZDocuments: true })],
  });
  context = await DataCaptureContext.create();
  await view.setContext(context);
  // always save the last camera used, so that we can get it back if necessary
  context.addListener({
    didChangeFrameSource: (_, frameSource) => {
      if (frameSource?.toJSONObject().type === "camera") {
        lastCameraFrameSource = frameSource;
      }
    },
  });

  const camera = Camera.default;
  await camera.applySettings(IdCapture.recommendedCameraSettings);
  await context.setFrameSource(camera);

  const settings = new IdCaptureSettings();
  settings.scannerType = new FullDocumentScanner();
  settings.acceptedDocuments = [
    new DriverLicense(Region.Us),
    new DriverLicense(Region.EuAndSchengen),
    new DriverLicense(Region.Uk),
  ];
  settings.captureTrigger = IdCaptureTrigger.ButtonTap;
  settings.setShouldPassImageTypeToResult(IdImageType.Frame, true);
  idCapture = await IdCapture.forContext(context, settings);
  idCapture.addListener(idCaptureListener);
  const overlay = await IdCaptureOverlay.withIdCaptureForView(idCapture, view);
  await overlay.setLocalizedBrush(Brush.transparent);
  view.hideProgressBar();

  singleImageFrameSource = SingleImageUploader.default;
  const singleImageFrameSourceSettings = new SingleImageUploaderSettings(null);
  singleImageFrameSourceSettings.onlyCameraCapture = true;
  await singleImageFrameSource.applySettings(singleImageFrameSourceSettings);
}

async function onCapturedId(capturedId: CapturedId): Promise<void> {
  await idCapture.setEnabled(false);

  frontSideData = capturedId.images.getFrame(IdSide.Front);
  backSideData = capturedId.images.getFrame(IdSide.Back);

  finalCapturedId = capturedId;
  showImagesForReview();
}

function showImagesForReview(): void {
  const imgFront = new Image();
  imgFront.src = `data:image/png;base64,${frontSideData}`;
  const imagePlaceholders = UI.elements.review.querySelectorAll(".review__image-inner");
  imagePlaceholders[0].innerHTML = "";
  imagePlaceholders[0].append(imgFront);

  const imgBack = new Image();
  imgBack.src = `data:image/png;base64,${backSideData}`;
  imagePlaceholders[1].innerHTML = "";
  imagePlaceholders[1].append(imgBack);

  UI.elements.review.hidden = false;
}

async function onRejectedId(capturedId: CapturedId, reason: RejectionReason): Promise<void> {
  await idCapture.setEnabled(false);
  switch (reason) {
    case RejectionReason.Timeout: {
      await context.frameSource?.switchToDesiredState(FrameSourceState.Standby);
      UI.elements.timeout.hidden = false;
      break;
    }
    case RejectionReason.SingleImageNotRecognized: {
      if (frontSideData == null) {
        frontSideData = capturedId.images.getFrame(IdSide.Front);
        void UI.showDialog("Success", "Front side image saved", [{ id: "ok", label: "Proceed with back side" }]);
        void showManualUpload();
        return;
      }

      if (backSideData == null) {
        // Beware: because we could not scan the front side, the SDK could not store the front image internally
        // because it could not know that both images have to be treated as part of the same document.
        backSideData = capturedId.images.getFrame(IdSide.Back) ?? capturedId.images.getFrame(IdSide.Front);
      }
      showImagesForReview();
      break;
    }
    default: {
      await UI.showDialog("Invalid document", "Document type not supported.", [{ id: "ok", label: "OK" }]);
      await startScanner(false);
      break;
    }
  }
}

async function onIdCaptureFailure(_idCapture: IdCapture, error: IdCaptureError): Promise<void> {
  // If an error occured and the SDK recovered from it, we need to inform the user and reset the process.
  if (error.type === IdCaptureErrorCode.RecoveredAfterFailure) {
    await UI.showDialog(
      "Error occured",
      "Oops, something went wrong. Please start over by scanning the front-side of your document.",
      [{ id: "ok", label: "OK" }]
    );
    await startScanner(true);
  }
}

async function showManualUpload(): Promise<void> {
  Localization.getInstance().update({
    "core.singleImageUploader.title": `Take a picture of the ${frontSideData == null ? "FRONT" : "BACK"} side of your ID`,
    "core.singleImageUploader.button": `Take picture`,
  });
  const { settings } = singleImageFrameSource!;
  const newSettings = new SingleImageUploaderSettings(settings);
  await singleImageFrameSource?.applySettings(newSettings);
  await context.frameSource?.switchToDesiredState(FrameSourceState.Off);
  await context.setFrameSource(singleImageFrameSource);
  await idCapture.setEnabled(true);
  await singleImageFrameSource?.switchToDesiredState(FrameSourceState.On);
}

function initUIElements(): void {
  UI.elements.timeoutTryAgainButton.addEventListener("click", async () => {
    await startScanner();
    UI.elements.timeout.hidden = true;
  });
  UI.elements.timeoutManualUploadButton.addEventListener("click", () => {
    UI.elements.timeout.hidden = true;
    // reset state to start a new capture from the images that will be submitted
    void idCapture.reset();
    void showManualUpload();
  });
  UI.elements.reviewRetryButton.addEventListener("click", async () => {
    void UI.showLoader();
    await startScanner(true);
    UI.elements.review.hidden = true;
    UI.closeLoader();
  });
  UI.elements.reviewOkButton.addEventListener("click", () => {
    // the images are in variables frontSideData and backSideData
    // the captured data is in variable "finalCapturedId"
    alert("Rest of your workflow...");
  });
  // add scroll variables to review images to manage the scroll hint image
  window.addEventListener(
    "scroll",
    () => {
      document.body.style.setProperty("--scroll", `${window.scrollY}`);
    },
    { passive: true }
  );
  const observer = new ResizeObserver(() => {
    const hasScroll = document.documentElement.clientHeight < document.documentElement.scrollHeight;
    document.body.style.setProperty("--has-scroll", hasScroll ? "1" : "0");
    document.body.style.setProperty(
      "--scroll-height",
      (document.documentElement.scrollHeight - document.documentElement.clientHeight).toString()
    );
  });
  observer.observe(UI.elements.reviewImages);
}

async function startScanner(reset: boolean = false): Promise<void> {
  if (reset) {
    await idCapture.reset();
    finalCapturedId = null;
    frontSideData = null;
    backSideData = null;
  }
  await context.setFrameSource(lastCameraFrameSource);
  await context.frameSource!.switchToDesiredState(FrameSourceState.On);
  await idCapture.setEnabled(true);
}

async function start(): Promise<void> {
  await initScanner();
  initUIElements();
  await startScanner();
}

start().catch((error: unknown) => {
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
