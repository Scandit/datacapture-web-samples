import type { FrameData, FrameSource } from "scandit-web-datacapture-core";
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
} from "scandit-web-datacapture-core";
import type { IdCaptureError, IdCaptureListener, IdCaptureSession, CapturedId } from "scandit-web-datacapture-id";
import {
  DocumentType,
  IdCapture,
  IdCaptureErrorCode,
  IdCaptureOverlay,
  IdCaptureSettings,
  IdDocumentType,
  SupportedSides,
  idCaptureLoader,
  IdCaptureTrigger,
} from "scandit-web-datacapture-id";
import * as UI from "./ui";

const LICENSE_KEY = "-- ENTER YOUR SCANDIT LICENSE KEY HERE --";

let context: DataCaptureContext;
let idCapture: IdCapture;
let view: DataCaptureView;
let blobFrontSide: Blob | null | undefined = null;
let blobBackSide: Blob | null | undefined = null;
let lastCameraFrameSource: FrameSource | null = null;
let singleImageFrameSource: SingleImageUploader | null = null;
let finalCapturedId: CapturedId | null = null;

const idCaptureCameraListener: IdCaptureListener = {
  didCaptureId: onCapturedId,
  didRejectId: onRejectedId,
  didTimedOut: onCapturedTimeout,
  didFailWithError: onIdCaptureFailure,
};
const idCaptureManualUploadListener: IdCaptureListener = {
  didUpdateSession: onManualUploadDidUpdateSession,
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
  settings.captureTrigger = IdCaptureTrigger.ButtonTap;
  settings.supportedDocuments = [IdDocumentType.DLVIZ];
  settings.supportedSides = SupportedSides.FrontAndBack;
  idCapture = await IdCapture.forContext(context, settings);
  idCapture.addListener(idCaptureCameraListener);
  const overlay = await IdCaptureOverlay.withIdCaptureForView(idCapture, view);
  await overlay.setLocalizedBrush(Brush.transparent);
  view.hideProgressBar();

  singleImageFrameSource = SingleImageUploader.default;
  const singleImageFrameSourceSettings = new SingleImageUploaderSettings(null);
  singleImageFrameSourceSettings.onlyCameraCapture = true;
  await singleImageFrameSource.applySettings(singleImageFrameSourceSettings);
}

async function onCapturedId(_idCapture: IdCapture, session: IdCaptureSession, frameData: FrameData): Promise<void> {
  if (session.newlyCapturedId == null) {
    return;
  }
  await idCapture.setEnabled(false);
  const capturedId = session.newlyCapturedId;
  if (capturedId.vizResult?.capturedSides === SupportedSides.FrontAndBack) {
    blobBackSide = await saveImage(frameData);
    if (blobFrontSide && blobBackSide) {
      showImagesForReview();
      finalCapturedId = capturedId;
    }
  } else {
    finalCapturedId = capturedId;
    blobFrontSide = await saveImage(frameData);
    // freeze the camera for a short while to let the user better understand that the front-side has been scanned
    await context.frameSource?.switchToDesiredState(FrameSourceState.Standby);
    await new Promise((resolve) => {
      setTimeout(resolve, 400);
    });
    await context.frameSource?.switchToDesiredState(FrameSourceState.On);
    await idCapture.setEnabled(true);
  }
}

async function saveImage(frameData: FrameData): Promise<Blob | null> {
  const blob = await frameData.toBlob("image/jpeg", 100);
  if (blob == null) {
    await UI.showDialog("Error", "Could not get the image from the captured document. Please start over.", [
      { id: "close", label: "close" },
    ]);
    await startScanner(true);
  }
  return blob;
}

function showImagesForReview(): void {
  const imgFront = new Image();
  imgFront.src = URL.createObjectURL(blobFrontSide!);
  const imagePlaceholders = UI.elements.review.querySelectorAll(".review__image-inner");
  imagePlaceholders[0].innerHTML = "";
  imagePlaceholders[0].append(imgFront);

  const imgBack = new Image();
  imgBack.src = URL.createObjectURL(blobBackSide!);
  imagePlaceholders[1].innerHTML = "";
  imagePlaceholders[1].append(imgBack);

  UI.elements.review.hidden = false;
}

async function onRejectedId(): Promise<void> {
  await idCapture.setEnabled(false);
  await UI.showDialog("Invalid document", "Document type not supported.", [{ id: "ok", label: "OK" }]);
  await startScanner(false);
}

async function onCapturedTimeout(): Promise<void> {
  await idCapture.setEnabled(false);
  await context.frameSource?.switchToDesiredState(FrameSourceState.Standby);
  UI.elements.timeout.hidden = false;
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

async function onManualUploadDidUpdateSession(
  _: IdCapture,
  session: IdCaptureSession,
  frameData: FrameData
): Promise<void> {
  if (blobFrontSide == null) {
    blobFrontSide = await saveImage(frameData);
    void UI.showDialog("Success", "Front side image saved", [{ id: "ok", label: "Proceed with back side" }]);
    void showManualUpload();
    return;
  }

  if (blobBackSide == null) {
    blobBackSide = await saveImage(frameData);
  }
  showImagesForReview();
}

async function showManualUpload(): Promise<void> {
  Localization.getInstance().update({
    "core.singleImageUploader.title": `Take a picture of the ${blobFrontSide ? "BACK" : "FRONT"} side of your ID`,
    "core.singleImageUploader.button": `Take picture`,
  });
  const { settings } = singleImageFrameSource!;
  const newSettings = new SingleImageUploaderSettings(settings);
  await singleImageFrameSource?.applySettings(newSettings);
  await context.frameSource?.switchToDesiredState(FrameSourceState.Off);
  await context.setFrameSource(singleImageFrameSource);
  idCapture.removeListener(idCaptureCameraListener);
  idCapture.addListener(idCaptureManualUploadListener);
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
    void showManualUpload();
  });
  UI.elements.reviewRetryButton.addEventListener("click", async () => {
    void UI.showLoader();
    await startScanner(true);
    UI.elements.review.hidden = true;
    UI.closeLoader();
  });
  UI.elements.reviewOkButton.addEventListener("click", () => {
    // the images are in variables blobFrontSide and blobBackSide
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
    blobFrontSide = null;
    blobBackSide = null;
  }
  idCapture.removeListener(idCaptureManualUploadListener);
  idCapture.addListener(idCaptureCameraListener);
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
  console.error(error);
  alert((error as Error).toString());
});
