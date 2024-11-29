import { Symbology, SymbologyDescription } from "@scandit/web-datacapture-barcode";

import BarcodeIcon from "../icons/BarcodeIcon";
import { useSDK } from "../sdk";
import { useStore } from "../store";

export default function SymbologySettings(): JSX.Element {
  const { symbologies, setSymbologies } = useStore();
  const { loading, sdk } = useSDK();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <BarcodeIcon color="black" />
        <h2 className="font-bold">Symbologies</h2>
      </div>
      {Object.values(Symbology).map((symbology) => (
        <label key={symbology} htmlFor={symbology} className="p-4 flex justify-between transition hover:bg-gray-100">
          {new SymbologyDescription(symbology).readableName}
          <input
            type="checkbox"
            id={symbology}
            disabled={loading}
            checked={symbologies[symbology] === true}
            onChange={async (event) => {
              const input = event.target as HTMLInputElement;
              setSymbologies({ ...symbologies, [symbology]: input.checked });
              await sdk.enableSymbology(symbology, input.checked);
            }}
          />
        </label>
      ))}
    </section>
  );
}
