import { useEffect, useRef } from "react";

import { useSDK } from "../sdk";
import { useStore } from "../store";

export default function ScannerComponent(): JSX.Element {
  const host = useRef<HTMLDivElement | null>(null);
  const { loading, sdk } = useSDK();
  const { keepCameraOn } = useStore();

  useEffect(() => {
    async function start(): Promise<void> {
      if (!loading && host.current) {
        sdk.connectToElement(host.current);
        await sdk.enableCamera(true);
        await sdk.enableScanning(true);
      }
    }
    async function cleanup(): Promise<void> {
      if (!loading) {
        sdk.detachFromElement();
        await sdk.enableScanning(false);
        if (!keepCameraOn) {
          await sdk.enableCamera(false);
        }
      }
    }
    void start();
    return () => {
      void cleanup();
    };
  });

  return <div ref={host} className="w-full h-full" />;
}
