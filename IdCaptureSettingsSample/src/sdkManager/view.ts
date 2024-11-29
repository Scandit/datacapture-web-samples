import {
  CameraSwitchControl,
  type Anchor,
  type LogoStyle,
  type PointWithUnit,
  TorchSwitchControl,
} from "@scandit/web-datacapture-core";
import { MarginsWithUnit, NumberWithUnit, Brush, Color } from "@scandit/web-datacapture-core";
import type { SDKManager } from "./sdkManager";
import { scanAreaMargins } from "@/settings/view/scan-area/store";
import { pointOfInterest } from "@/settings/view/point-of-interest/store";
import type { IdLayoutLineStyle, IdLayoutStyle } from "@scandit/web-datacapture-id";
import {
  BrushType,
  layoutCapturedBrush,
  layoutLineStyle,
  layoutLocalizedBrush,
  layoutStyle,
  showTextHints,
} from "@/settings/view/overlay/store";
import { logoAnchor, logoOffset, logoStyle } from "@/settings/view/logo/store";
import { cameraSwitchControlEnabled, torchSwitchControlEnabled } from "@/settings/view/controls/store";

export class SDKViewManager {
  private static readonly cameraSwitchControl: CameraSwitchControl = new CameraSwitchControl();

  private static readonly torchSwitchControl: TorchSwitchControl = new TorchSwitchControl();

  private readonly sdkManager: SDKManager;

  public constructor(sdkManager: SDKManager) {
    this.sdkManager = sdkManager;
  }

  private static getBrushFromBrushType(type: BrushType): Brush {
    const transparent = Color.fromRGBA(0, 0, 0, 0);
    const white = Color.fromRGBA(255, 255, 255, 1);
    const green = Color.fromRGBA(0, 255, 0, 1);
    const red = Color.fromRGBA(255, 0, 0, 1);

    let newBrush: Brush;
    switch (type) {
      case BrushType.Red: {
        newBrush = new Brush(transparent, red, 2);
        break;
      }
      case BrushType.Green: {
        newBrush = new Brush(transparent, green, 2);
        break;
      }
      case BrushType.Default: {
        newBrush = new Brush(transparent, white, 2);
        break;
      }
    }
    return newBrush;
  }

  public updateScanArea(
    marginSide: keyof MarginsWithUnit,
    numberWithUnit: Pick<NumberWithUnit, "unit" | "value">
  ): void {
    const margins = {
      left: this.sdkManager.dataCaptureView.scanAreaMargins.left,
      top: this.sdkManager.dataCaptureView.scanAreaMargins.top,
      right: this.sdkManager.dataCaptureView.scanAreaMargins.right,
      bottom: this.sdkManager.dataCaptureView.scanAreaMargins.bottom,
    };
    margins[marginSide] = new NumberWithUnit(numberWithUnit.value, numberWithUnit.unit);
    this.sdkManager.dataCaptureView.scanAreaMargins = new MarginsWithUnit(
      margins.left,
      margins.top,
      margins.right,
      margins.bottom
    );
    scanAreaMargins.set(this.sdkManager.dataCaptureView.scanAreaMargins);
  }

  public updatePointOfInterest(point: PointWithUnit): void {
    this.sdkManager.dataCaptureView.pointOfInterest = point;
    pointOfInterest.set(point);
  }

  public updateOverlayLayoutStyle(style: string): void {
    this.sdkManager.idCaptureOverlay.idLayoutStyle = style as IdLayoutStyle;
    layoutStyle.set(style as IdLayoutStyle);
  }

  public updateOverlayLayoutLineStyle(style: string): void {
    this.sdkManager.idCaptureOverlay.idLayoutLineStyle = style as IdLayoutLineStyle;
    layoutLineStyle.set(style as IdLayoutLineStyle);
  }

  public updateOverlayShowTextHints(show: boolean): void {
    this.sdkManager.idCaptureOverlay.showTextHints = show;
    showTextHints.set(show);
  }

  public async updateCapturedBrush(style: string): Promise<void> {
    const newBrush = SDKViewManager.getBrushFromBrushType(style as BrushType);
    await this.sdkManager.idCaptureOverlay.setCapturedBrush(newBrush);
    layoutCapturedBrush.set(style as BrushType);
  }

  public async updateLocalizedBrush(style: string): Promise<void> {
    const newBrush = SDKViewManager.getBrushFromBrushType(style as BrushType);
    await this.sdkManager.idCaptureOverlay.setLocalizedBrush(newBrush);
    layoutLocalizedBrush.set(style as BrushType);
  }

  public updateLogoStyle(style: string): void {
    this.sdkManager.dataCaptureView.logoStyle = style as LogoStyle;
    logoStyle.set(style as LogoStyle);
  }

  public updateLogoAnchor(anchor: string): void {
    this.sdkManager.dataCaptureView.logoAnchor = anchor as Anchor;
    logoAnchor.set(anchor as Anchor);
  }

  public updateLogoOffset(offset: PointWithUnit): void {
    this.sdkManager.dataCaptureView.logoOffset = offset;
    logoOffset.set(offset);
  }

  public toggleCameraSwitchControl(enabled: boolean): void {
    if (enabled) {
      this.sdkManager.dataCaptureView.addControl(SDKViewManager.cameraSwitchControl);
    } else {
      this.sdkManager.dataCaptureView.removeControl(SDKViewManager.cameraSwitchControl);
    }
    cameraSwitchControlEnabled.set(enabled);
  }

  public toggleTorchSwitchControl(enabled: boolean): void {
    if (enabled) {
      this.sdkManager.dataCaptureView.addControl(SDKViewManager.torchSwitchControl);
    } else {
      this.sdkManager.dataCaptureView.removeControl(SDKViewManager.torchSwitchControl);
    }
    torchSwitchControlEnabled.set(enabled);
  }

  public async allowPictureInPicture(allow: boolean): Promise<void> {
    await this.sdkManager.dataCaptureView.allowPictureInPicture(allow);
  }
}
