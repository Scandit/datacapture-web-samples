import { range } from "@/helpers/range";
import { barcodeCapture, barcodeCaptureSettings } from "@/store";
import { SymbologySettings, Symbology, Checksum, SymbologyDescription } from "@scandit/web-datacapture-barcode";
import { derived, get, readable, writable, type Readable, type Writable } from "svelte/store";

export type SymbologyWithOptionalChecksumSupport =
  | Symbology.Codabar
  | Symbology.Code11
  | Symbology.Code25
  | Symbology.Code39
  | Symbology.IATATwoOfFive
  | Symbology.MatrixTwoOfFive
  | Symbology.MSIPlessey;

// The WebSDK currenly doesn't supply a way to retrieve the list of supported checksums for each symbology.
// The mappings in the workaround below are taken from the SDK documentation.
// See: https://docs.scandit.com/data-capture-sdk/web/barcode-capture/symbology-properties.html
export const symbologyChecksumsMap: Record<SymbologyWithOptionalChecksumSupport, Checksum[]> = {
  [Symbology.MSIPlessey]: [Checksum.Mod10, Checksum.Mod11, Checksum.Mod10AndMod10, Checksum.Mod10AndMod11],
  [Symbology.Code11]: [Checksum.Mod11],
  [Symbology.Code25]: [Checksum.Mod10],
  [Symbology.IATATwoOfFive]: [Checksum.Mod10AndMod10],
  [Symbology.MatrixTwoOfFive]: [Checksum.Mod10],
  [Symbology.Code39]: [Checksum.Mod43],
  [Symbology.Codabar]: [Checksum.Mod16, Checksum.Mod11],
};

export function isSymbologyWithOptionalChecksums(
  symbology: Symbology
): symbology is SymbologyWithOptionalChecksumSupport {
  return Object.keys(symbologyChecksumsMap).includes(symbology);
}

export interface SymbologyStore {
  symbology: Symbology;
  description: Readable<SymbologyDescription>;
  settings: Readable<SymbologySettings>;
  supportedChecksums: Readable<Checksum[]>;
  isEnabled: Writable<boolean>;
  isColorInverted: Writable<boolean>;
  activeSymbolCountMinimum: Writable<number>;
  activeSymbolCountMaximum: Writable<number>;
  enabledExtensions: Writable<Set<string>>;
  enabledChecksums: Writable<Set<Checksum>>;
  isStoreSetup: Readable<boolean>;
  setupSymbologyStore: () => void;
}

export function createSymbologyStore(symbology: Symbology): SymbologyStore {
  const isStoreSetup = writable(false);
  const descriptionStore = readable(new SymbologyDescription(symbology));
  const settingsStore = writable(new SymbologySettings());
  const supportedChecksumsStore = writable<Checksum[]>([]);

  const isEnabled = writable(false);
  const isColorInverted = writable(false);
  const activeSymbolCountMinimum = writable(0);
  const activeSymbolCountMaximum = writable(0);
  const enabledExtensions = writable(new Set<string>());
  const enabledChecksums = writable(new Set<Checksum>());

  async function setEnabled(enabled: boolean): Promise<void> {
    const $barcodeCaptureSettings = get(barcodeCaptureSettings);
    const $barcodeCapture = get(barcodeCapture);
    $barcodeCaptureSettings.enableSymbology(symbology, enabled);
    await $barcodeCapture.applySettings($barcodeCaptureSettings);
  }

  async function setColorInvertedEnabled(enabled: boolean): Promise<void> {
    const $barcodeCaptureSettings = get(barcodeCaptureSettings);
    const $barcodeCapture = get(barcodeCapture);
    const settings = get(settingsStore);
    settings.isColorInvertedEnabled = enabled;
    await $barcodeCapture.applySettings($barcodeCaptureSettings);
  }

  async function setActiveSymbolCountRange(minimum: number, maximum: number): Promise<void> {
    const description = get(descriptionStore);
    const settings = get(settingsStore);
    if (description.activeSymbolCountRange.isFixed) {
      return;
    }
    const { step } = description.activeSymbolCountRange;
    settings.activeSymbolCounts = range(minimum, maximum, step).reverse();

    const $barcodeCaptureSettings = get(barcodeCaptureSettings);
    const $barcodeCapture = get(barcodeCapture);
    await $barcodeCapture.applySettings($barcodeCaptureSettings);
  }

  async function setExtensionsEnabled(extensions: Set<string>): Promise<void> {
    const description = get(descriptionStore);
    const settings = get(settingsStore);
    for (const supportedExtension of description.supportedExtensions) {
      const enabled = extensions.has(supportedExtension);
      settings.setExtensionEnabled(supportedExtension, enabled);
    }

    const $barcodeCaptureSettings = get(barcodeCaptureSettings);
    const $barcodeCapture = get(barcodeCapture);
    await $barcodeCapture.applySettings($barcodeCaptureSettings);
  }

  async function setChecksumsEnabled(checksums: Set<Checksum>): Promise<void> {
    const settings = get(settingsStore);
    settings.checksums = checksums;

    const $barcodeCaptureSettings = get(barcodeCaptureSettings);
    const $barcodeCapture = get(barcodeCapture);
    await $barcodeCapture.applySettings($barcodeCaptureSettings);
  }

  function setupSymbologyStore(): void {
    const $barcodeCaptureSettings = get(barcodeCaptureSettings);
    const description = get(descriptionStore);
    const settings = $barcodeCaptureSettings.settingsForSymbology(symbology);
    const supportedChecksums = isSymbologyWithOptionalChecksums(symbology) ? symbologyChecksumsMap[symbology] : [];
    settingsStore.set(settings);
    supportedChecksumsStore.set(supportedChecksums);

    isEnabled.set(settings.isEnabled);

    if (description.isColorInvertible) {
      isColorInverted.set(settings.isColorInvertedEnabled);
    }

    if (!description.activeSymbolCountRange.isFixed) {
      activeSymbolCountMinimum.set(description.defaultSymbolCountRange.minimum);
      activeSymbolCountMaximum.set(description.defaultSymbolCountRange.maximum);
    }

    enabledExtensions.set(new Set(settings.enabledExtensions));
    enabledChecksums.set(settings.checksums);

    isEnabled.subscribe((value) => {
      void setEnabled(value);
    });

    isColorInverted.subscribe((value) => {
      void setColorInvertedEnabled(value);
    });

    activeSymbolCountMinimum.subscribe((value) => {
      const maximum = get(activeSymbolCountMaximum);
      void setActiveSymbolCountRange(value, maximum);
    });

    activeSymbolCountMaximum.subscribe((value) => {
      const minimum = get(activeSymbolCountMinimum);
      void setActiveSymbolCountRange(minimum, value);
    });

    enabledExtensions.subscribe((value) => {
      void setExtensionsEnabled(value);
    });

    enabledChecksums.subscribe((value) => {
      void setChecksumsEnabled(value);
    });

    isStoreSetup.set(true);
  }

  return {
    symbology,
    description: descriptionStore,
    settings: derived(settingsStore, (value) => value),
    supportedChecksums: derived(supportedChecksumsStore, (value) => value),
    isEnabled,
    isColorInverted,
    activeSymbolCountMinimum,
    activeSymbolCountMaximum,
    enabledExtensions,
    enabledChecksums,
    isStoreSetup: derived(isStoreSetup, ($isStoreSetup) => $isStoreSetup),
    setupSymbologyStore,
  };
}

export const symbologies = Object.values(Symbology);

export const symbologyStoreMap = Object.fromEntries(
  symbologies.map((symbology) => [symbology, createSymbologyStore(symbology)])
);

export function useSymbologyStore(symbology: Symbology): SymbologyStore {
  return symbologyStoreMap[symbology];
}

export function enableAllSymbologies(): void {
  for (const symbology of symbologies) {
    const symbologyStore = useSymbologyStore(symbology);
    const isStoreSetup = get(symbologyStore.isStoreSetup);
    if (!isStoreSetup) {
      symbologyStore.setupSymbologyStore();
    }
    symbologyStore.isEnabled.set(true);
  }
}

export function disableAllSymbologies(): void {
  for (const symbology of symbologies) {
    const symbologyStore = useSymbologyStore(symbology);
    const isStoreSetup = get(symbologyStore.isStoreSetup);
    if (!isStoreSetup) {
      symbologyStore.setupSymbologyStore();
    }
    symbologyStore.isEnabled.set(false);
  }
}
