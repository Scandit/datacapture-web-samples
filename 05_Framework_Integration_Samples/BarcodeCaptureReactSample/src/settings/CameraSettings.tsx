import type { ReactElement } from "react";
import { useCallback } from "react";

import CameraIcon from "../icons/CameraIcon";
import { useStore } from "../store";

export default function CameraSettings(): ReactElement {
  const { keepCameraOn, setKeepCameraOn } = useStore();

  const onChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      setKeepCameraOn(input.checked);
    },
    [setKeepCameraOn]
  );

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <CameraIcon color="black" />
        <h2 className="font-bold">Camera</h2>
      </div>
      <label htmlFor="keepCameraOn" className="p-4 flex justify-between">
        Keep on when closing the scanner
        <input type="checkbox" id="keepCameraOn" checked={keepCameraOn} onChange={onChange} />
      </label>
    </section>
  );
}
