import { useEffect } from "react";

import CameraIcon from "../icons/CameraIcon";
import { useSDK } from "../sdk";
import { useStore } from "../store";

export default function CameraSettings(): JSX.Element {
  const { keepCameraOn, setKeepCameraOn } = useStore();
  const { loading, sdk } = useSDK();

  useEffect(() => {
    if (!loading) {
      void sdk.enableCamera(keepCameraOn);
    }
  }, [loading, sdk, keepCameraOn]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <CameraIcon color="black" />
        <h2 className="font-bold">Camera</h2>
      </div>
      <label htmlFor="keepCameraOn" className="p-4 flex justify-between">
        Keep on when closing the scanner
        <input
          type="checkbox"
          id="keepCameraOn"
          checked={keepCameraOn}
          onChange={(event) => {
            const input = event.target as HTMLInputElement;
            setKeepCameraOn(input.checked);
          }}
        />
      </label>
    </section>
  );
}
