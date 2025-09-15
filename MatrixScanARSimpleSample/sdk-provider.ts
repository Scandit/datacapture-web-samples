import {
  Barcode,
  BarcodeAr,
  BarcodeArAnnotation,
  BarcodeArAnnotationTrigger,
  BarcodeArCircleHighlight,
  BarcodeArCircleHighlightPreset,
  BarcodeArHighlight,
  BarcodeArInfoAnnotation,
  BarcodeArInfoAnnotationAnchor,
  BarcodeArInfoAnnotationBodyComponent,
  BarcodeArInfoAnnotationFooter,
  BarcodeArInfoAnnotationHeader,
  BarcodeArInfoAnnotationWidthPreset,
  BarcodeArPopoverAnnotation,
  BarcodeArPopoverAnnotationButton,
  BarcodeArRectangleHighlight,
  BarcodeArResponsiveAnnotation,
  BarcodeArSettings,
  BarcodeArStatusIconAnnotation,
  BarcodeArView,
  barcodeCaptureLoader,
  Symbology,
} from "@scandit/web-datacapture-barcode";
import {
  Brush,
  Color,
  configure,
  DataCaptureContext,
  ScanditIconBuilder,
  ScanditIconShape,
  ScanditIconType,
} from "@scandit/web-datacapture-core";
import { Presets } from "./Presets.js";

type HighlightForBarcode = {
  highlight: BarcodeArCircleHighlight;
  status: "accepted" | "rejectable" | "rejected";
};

function keyForBarcode(barcode: Barcode): `${Barcode["data"]}|${Barcode["symbology"]}` {
  return `${barcode.data}|${barcode.symbology}` as `${Barcode["data"]}|${Barcode["symbology"]}`;
}

class SDKProvider {
  public context: DataCaptureContext | null = null;

  public barcodeArSettings: BarcodeArSettings = new BarcodeArSettings();
  public barcodeAr: BarcodeAr | null = null;
  public barcodeArView: BarcodeArView | null = null;

  private highlightForBarcode: Map<`${Barcode["data"]}|${Barcode["symbology"]}`, HighlightForBarcode> = new Map();
  private clickHighlightForBarcode: Map<`${Barcode["data"]}|${Barcode["symbology"]}`, boolean> = new Map();
  private barcodeCounter: number = 0;

  public configurePromise: Promise<void> | null = null;

  configure({ licenseKey }: { licenseKey: string }): Promise<void> {
    if (this.configurePromise) {
      return this.configurePromise;
    }

    this.configurePromise = (async () => {
      await configure({
        licenseKey,
        libraryLocation: new URL("library/engine/", document.baseURI).toString(),
        moduleLoaders: [barcodeCaptureLoader()],
      });
      this.context = await DataCaptureContext.create();

      this.barcodeArSettings.enableSymbologies([
        Symbology.EAN13UPCA,
        Symbology.EAN8,
        Symbology.UPCE,
        Symbology.Code39,
        Symbology.Code128,
        Symbology.QR,
        Symbology.DataMatrix,
      ]);

      this.barcodeAr = await BarcodeAr.forContext(this.context, this.barcodeArSettings);
    })();
    return this.configurePromise;
  }

  async mountBarcodeArViewTo(element: HTMLElement, preset: Presets) {
    if (this.configurePromise) {
      await this.configurePromise;
    }
    this.barcodeArView = await BarcodeArView.create(element, this.context!, this.barcodeAr!);
    this.setPreset(preset);
  }

  async unmountBarcodeArView() {
    await this.barcodeArView?.stop();
    this.barcodeArView?.remove();
    this.barcodeArView = null;
    this.highlightForBarcode.clear();
    this.clickHighlightForBarcode.clear();
    this.barcodeCounter = 0;
  }

  private createFarAwayAnnotation(barcode: Barcode): BarcodeArInfoAnnotation {
    const body = BarcodeArInfoAnnotationBodyComponent.create();
    body.text = "Body Text";

    const infoAnnotation = BarcodeArInfoAnnotation.create(barcode);
    infoAnnotation.widthPreset = BarcodeArInfoAnnotationWidthPreset.Small;
    infoAnnotation.body = [body];

    infoAnnotation.anchor = BarcodeArInfoAnnotationAnchor.Bottom;
    return infoAnnotation;
  }

  private async createCloseUpAnnotation(barcode: Barcode): Promise<BarcodeArInfoAnnotation> {
    const iconBuilder = new ScanditIconBuilder()
      .withBackgroundShape(ScanditIconShape.Circle)
      .withIcon(ScanditIconType.Checkmark)
      .withIconColor(Color.fromRGBA(0, 0, 0, 1))
      .withBackgroundStrokeColor(Color.fromRGBA(0, 0, 0, 1))
      .withBackgroundStrokeWidth(1)
      .withWidth(16)
      .withHeight(16);

    // Header
    const header = BarcodeArInfoAnnotationHeader.create();
    header.icon = await iconBuilder.build();
    header.text = "Header";
    header.backgroundColor = Color.fromRGBA(0, 255, 255, 1);

    // Bodies
    const body1 = BarcodeArInfoAnnotationBodyComponent.create();
    body1.textAlignment = "start";
    body1.text = "This is a text in a large container. It can have multiple lines.";

    const body2 = BarcodeArInfoAnnotationBodyComponent.create();
    body2.leftIcon = await iconBuilder.build();
    body2.textAlignment = "start";
    body2.text = "Point";

    const body3 = BarcodeArInfoAnnotationBodyComponent.create();
    body3.leftIcon = await iconBuilder.build();
    body3.textAlignment = "start";
    body3.text = "Point";

    // Footer
    const footer = BarcodeArInfoAnnotationFooter.create();
    footer.backgroundColor = Color.fromRGBA(18, 22, 25, 1);
    footer.textColor = Color.fromRGBA(255, 255, 255, 1);
    footer.text = "Tap to change color";

    // Info annotation
    const infoAnnotation = BarcodeArInfoAnnotation.create(barcode);
    infoAnnotation.widthPreset = BarcodeArInfoAnnotationWidthPreset.Small;
    infoAnnotation.anchor = BarcodeArInfoAnnotationAnchor.Bottom;
    infoAnnotation.body = [body1, body2, body3];
    infoAnnotation.header = header;
    infoAnnotation.footer = footer;
    infoAnnotation.isEntireAnnotationTappable = true;
    let previousBackgroundColor = infoAnnotation.header.backgroundColor.toJSON();
    infoAnnotation.listener = {
      onInfoAnnotationTapped: (annotation: BarcodeArInfoAnnotation) => {
        if (annotation.header) {
          const nextBackgroundColor =
            previousBackgroundColor === Color.fromRGBA(0, 255, 255, 1).toJSON()
              ? Color.fromRGBA(240, 189, 48, 1)
              : Color.fromRGBA(0, 255, 255, 1);
          annotation.header.backgroundColor = nextBackgroundColor;
          previousBackgroundColor = nextBackgroundColor.toJSON();
        }
      },
    };
    return infoAnnotation;
  }

  private setPreset(preset: Presets) {
    if (!this.barcodeArView) {
      throw new Error("BarcodeARView is not mounted");
    }
    // Reset counter when preset changes
    this.barcodeCounter = 0;
    const self = this;
    switch (preset) {
      case Presets.Highlights:
        {
          this.barcodeArView.annotationProvider = undefined;
          this.barcodeArView.listener = {
            didTapHighlightForBarcode: async (
              _barcodeAr: BarcodeAr,
              barcode: Barcode,
              highlight: BarcodeArHighlight
            ) => {
              const barcodeKey = keyForBarcode(barcode);
              const isClicked = !(self.clickHighlightForBarcode.get(barcodeKey) ?? false);
              highlight.brush = isClicked
                ? new Brush(Color.fromRGBA(0, 0, 255, 0.45), Color.fromRGBA(0, 0, 255, 1), 2)
                : new Brush(Color.fromRGBA(0, 255, 255, 0.45), Color.fromRGBA(0, 255, 255, 1), 2);
              highlight.icon = isClicked
                ? await new ScanditIconBuilder()
                    .withIcon(ScanditIconType.Checkmark)
                    .withIconColor(Color.fromRGBA(255, 255, 255, 1))
                    .build()
                : null;
              self.clickHighlightForBarcode.set(barcodeKey, isClicked);
            },
          };
          this.barcodeArView.highlightProvider = {
            // biome-ignore lint/suspicious/useAwait: <explanation>
            async highlightForBarcode(
              barcode: Barcode,
              callback: (highlight: BarcodeArHighlight) => void
            ): Promise<void> {
              const highlight = BarcodeArRectangleHighlight.create(barcode);
              const barcodeKey = keyForBarcode(barcode);
              self.clickHighlightForBarcode.set(barcodeKey, false);
              callback(highlight);
            },
          };
        }
        break;
      case Presets.InfoAnnotations:
        {
          this.barcodeArView.highlightProvider = {
            // biome-ignore lint/suspicious/useAwait: <explanation>
            async highlightForBarcode(
              barcode: Barcode,
              callback: (highlight: BarcodeArHighlight) => void
            ): Promise<void> {
              const highlight = BarcodeArCircleHighlight.create(barcode, BarcodeArCircleHighlightPreset.Dot);
              callback(highlight);
            },
          };

          BarcodeArResponsiveAnnotation.threshold = 0.5;
          this.barcodeArView.annotationProvider = {
            async annotationForBarcode(
              barcode: Barcode,
              callback: (annotation: BarcodeArAnnotation) => void
            ): Promise<void> {
              const [closeUpAnnotation, farAwayAnnotation] = await Promise.all([
                self.createCloseUpAnnotation(barcode),
                self.createFarAwayAnnotation(barcode),
              ]);
              const barcodeResponsiveAnnotation = BarcodeArResponsiveAnnotation.create(
                barcode,
                closeUpAnnotation,
                farAwayAnnotation
              );
              callback(barcodeResponsiveAnnotation);
            },
          };
        }
        break;
      case Presets.Popovers:
        {
          this.highlightForBarcode.clear();

          this.barcodeArView.highlightProvider = {
            async highlightForBarcode(
              barcode: Barcode,
              callback: (highlight: BarcodeArHighlight) => void
            ): Promise<void> {
              const barcodeKey = keyForBarcode(barcode);
              const highlight = BarcodeArCircleHighlight.create(barcode, BarcodeArCircleHighlightPreset.Icon);

              // Check if we already have a status for this barcode
              const existingHighlight = self.highlightForBarcode.get(barcodeKey);

              if (existingHighlight) {
                // Use existing status and update the highlight reference
                existingHighlight.highlight = highlight;
                self.highlightForBarcode.set(barcodeKey, existingHighlight);

                // Apply the current status styling
                if (existingHighlight.status === "rejectable") {
                  const exclamationMarkIcon = await new ScanditIconBuilder()
                    .withBackgroundShape(ScanditIconShape.Circle)
                    .withIcon(ScanditIconType.ExclamationMark)
                    .withIconColor(Color.fromRGBA(255, 255, 255, 1))
                    .withWidth(32)
                    .withHeight(32)
                    .build();

                  highlight.icon = exclamationMarkIcon;
                  highlight.brush = new Brush(Color.fromRGBA(255, 0, 0, 1), Color.fromRGBA(255, 0, 0, 1), 1);
                  highlight.isPulsing = true;
                } else if (existingHighlight.status === "accepted") {
                  const checkMarkIcon = await new ScanditIconBuilder()
                    .withBackgroundShape(ScanditIconShape.Circle)
                    .withIcon(ScanditIconType.Checkmark)
                    .withIconColor(Color.fromRGBA(255, 255, 255, 1))
                    .withWidth(32)
                    .withHeight(32)
                    .build();

                  highlight.icon = checkMarkIcon;
                  highlight.brush = new Brush(Color.fromRGBA(13, 133, 61, 1), Color.fromRGBA(13, 133, 61, 1), 1);
                  highlight.isPulsing = false;
                } else if (existingHighlight.status === "rejected") {
                  const xMarkIcon = await new ScanditIconBuilder()
                    .withBackgroundShape(ScanditIconShape.Circle)
                    .withIcon(ScanditIconType.XMark)
                    .withIconColor(Color.fromRGBA(255, 255, 255, 1))
                    .withWidth(32)
                    .withHeight(32)
                    .build();

                  highlight.icon = xMarkIcon;
                  highlight.brush = new Brush(Color.fromRGBA(255, 0, 0, 1), Color.fromRGBA(255, 0, 0, 1), 1);
                  highlight.isPulsing = false;
                }
              } else {
                // New barcode - determine if it's rejectable or accepted
                const isEvenOrOdd = self.barcodeCounter % 2 === 0;
                const isRejectable = isEvenOrOdd;
                self.barcodeCounter++;

                if (isRejectable) {
                  const exclamationMarkIcon = await new ScanditIconBuilder()
                    .withBackgroundShape(ScanditIconShape.Circle)
                    .withIcon(ScanditIconType.ExclamationMark)
                    .withIconColor(Color.fromRGBA(255, 255, 255, 1))
                    .withWidth(32)
                    .withHeight(32)
                    .build();

                  highlight.icon = exclamationMarkIcon;
                  highlight.brush = new Brush(Color.fromRGBA(255, 0, 0, 1), Color.fromRGBA(255, 0, 0, 1), 1);
                  highlight.isPulsing = true;
                  self.highlightForBarcode.set(barcodeKey, { highlight, status: "rejectable" });
                } else {
                  const checkMarkIcon = await new ScanditIconBuilder()
                    .withBackgroundShape(ScanditIconShape.Circle)
                    .withIcon(ScanditIconType.Checkmark)
                    .withIconColor(Color.fromRGBA(255, 255, 255, 1))
                    .withWidth(32)
                    .withHeight(32)
                    .build();

                  highlight.icon = checkMarkIcon;
                  highlight.brush = new Brush(Color.fromRGBA(13, 133, 61, 1), Color.fromRGBA(13, 133, 61, 1), 1);
                  highlight.isPulsing = false;
                  self.highlightForBarcode.set(barcodeKey, { highlight, status: "accepted" });
                }
              }

              callback(highlight);
            },
          };
          this.barcodeArView.annotationProvider = {
            async annotationForBarcode(
              barcode: Barcode,
              callback: (annotation: BarcodeArAnnotation) => void
            ): Promise<void> {
              const barcodeKey = keyForBarcode(barcode);
              const highlightForBarcode = self.highlightForBarcode.get(barcodeKey);

              // Only create popover for rejectable barcodes that haven't been decided yet
              if (!highlightForBarcode || highlightForBarcode.status !== "rejectable") {
                return;
              }

              const checkMarkIconBuilder = new ScanditIconBuilder()
                .withBackgroundShape(ScanditIconShape.Circle)
                .withIcon(ScanditIconType.Checkmark)
                .withBackgroundColor(Color.fromRGBA(0, 255, 0));

              const xMarkIconBuilder = new ScanditIconBuilder()
                .withBackgroundShape(ScanditIconShape.Circle)
                .withIcon(ScanditIconType.XMark)
                .withBackgroundColor(Color.fromRGBA(255, 0, 0));

              const [checkMarkBarcodeIcon, xMarkBarcodeIcon] = await Promise.all([
                checkMarkIconBuilder.build(),
                xMarkIconBuilder.build(),
              ]);

              const annotation = BarcodeArPopoverAnnotation.create(barcode);
              annotation.annotationTrigger = BarcodeArAnnotationTrigger.HighlightTap;
              const popoverRejectButton = BarcodeArPopoverAnnotationButton.create(xMarkBarcodeIcon, "Reject");
              const popoverAcceptButton = BarcodeArPopoverAnnotationButton.create(checkMarkBarcodeIcon, "Accept");

              annotation.append(popoverRejectButton, popoverAcceptButton);
              annotation.listener = {
                onPopoverButtonTapped: async (
                  popover: BarcodeArPopoverAnnotation,
                  _button: BarcodeArPopoverAnnotationButton,
                  buttonIndex: number
                ) => {
                  const popoverBarcodeKey = keyForBarcode(popover.barcode);
                  const highlightForBarcode = self.highlightForBarcode.get(popoverBarcodeKey);

                  if (!highlightForBarcode?.highlight || highlightForBarcode.status !== "rejectable") {
                    return;
                  }

                  if (buttonIndex === 0) {
                    // Reject button
                    const currentHighlight = self.highlightForBarcode.get(popoverBarcodeKey);
                    if (currentHighlight?.highlight) {
                      currentHighlight.highlight.brush = new Brush(
                        Color.fromRGBA(255, 0, 0, 1),
                        Color.fromRGBA(255, 0, 0, 1),
                        1
                      );
                      currentHighlight.highlight.icon = await xMarkIconBuilder.build();
                      currentHighlight.highlight.isPulsing = false; // Stop pulsing
                      currentHighlight.status = "rejected";
                      self.highlightForBarcode.set(popoverBarcodeKey, currentHighlight);
                    }

                    // Change popover trigger to prevent it from showing on highlight tap
                    popover.annotationTrigger = BarcodeArAnnotationTrigger.BarcodeScan;
                  } else if (buttonIndex === 1) {
                    // Accept button
                    const currentHighlight = self.highlightForBarcode.get(popoverBarcodeKey);
                    if (currentHighlight?.highlight) {
                      currentHighlight.highlight.brush = new Brush(
                        Color.fromRGBA(13, 133, 61, 1),
                        Color.fromRGBA(13, 133, 61, 1),
                        1
                      );
                      currentHighlight.highlight.icon = await checkMarkIconBuilder.build();
                      currentHighlight.highlight.isPulsing = false; // Stop pulsing
                      currentHighlight.status = "accepted";
                      self.highlightForBarcode.set(popoverBarcodeKey, currentHighlight);
                    }

                    // Change popover trigger to prevent it from showing on tap
                    popover.annotationTrigger = BarcodeArAnnotationTrigger.BarcodeScan;
                  }
                },
              };
              callback(annotation);
            },
          };
        }
        break;
      case Presets.StatusIcons:
        {
          let barcodeIndex = 0;

          this.barcodeArView.highlightProvider = {
            // biome-ignore lint/suspicious/useAwait: <explanation>
            async highlightForBarcode(
              barcode: Barcode,
              callback: (highlight: BarcodeArHighlight) => void
            ): Promise<void> {
              const highlight = BarcodeArRectangleHighlight.create(barcode);
              callback(highlight);
            },
          };

          this.barcodeArView.annotationProvider = {
            async annotationForBarcode(
              barcode: Barcode,
              callback: (annotation: BarcodeArAnnotation) => void
            ): Promise<void> {
              const infoAnnotation = BarcodeArStatusIconAnnotation.create(barcode);

              barcodeIndex += 1;

              // Alternate colors: even indices get yellow, odd indices get red
              const isYellow = barcodeIndex % 2 === 0;

              if (isYellow) {
                infoAnnotation.text = "Close to expiry";
              } else {
                const iconBuilder = new ScanditIconBuilder()
                  .withIcon(ScanditIconType.ExclamationMark)
                  .withBackgroundShape(ScanditIconShape.Circle)
                  .withBackgroundColor(Color.fromRGBA(250, 68, 70, 1))
                  .withIconColor(Color.fromRGBA(255, 255, 255, 1))
                  .withWidth(24)
                  .withHeight(24)
                  .withIconSize(16);
                infoAnnotation.icon = await iconBuilder.build();
                infoAnnotation.text = "Item expired";
              }

              callback(infoAnnotation);
            },
          };
        }
        break;
    }
  }

  async dispose() {
    await this.context?.dispose();
    this.context = null;
    this.barcodeArSettings = new BarcodeArSettings();
    this.barcodeAr = null;
    this.configurePromise = null;
  }
}

export const sdkProvider = new SDKProvider();
