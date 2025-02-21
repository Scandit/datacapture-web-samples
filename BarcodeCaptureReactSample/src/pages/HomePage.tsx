import type { ReactElement } from "react";
import { useEffect } from "react";

import LoadingMessage from "../components/LoadingMessage";
import MenuButton from "../components/MenuButton";
import Show from "../components/Show";
import InfoIcon from "../icons/InfoIcon";
import ScannerIcon from "../icons/ScannerIcon";
import SettingsIcon from "../icons/SettingsIcon";
import { useSDK } from "../sdk";

export default function HomePage(): ReactElement {
  const { loading, sdk } = useSDK();

  useEffect(() => {
    if (!loading) {
      void sdk.enableScanning(false);
    }
  }, [loading, sdk]);

  return (
    <main className="w-screen h-[100dvh] p-4 flex flex-col gap-4 lg:max-w-[800px] lg:mx-auto">
      <Show when={loading}>
        <LoadingMessage />
      </Show>
      <Show when={!loading}>
        <h1 className="font-bold text-2xl">Home</h1>
        <div className="p-4 bg-gray-100 rounded">
          <p className="leading-8">
            <InfoIcon color="black" /> This sample demonstrates how to initialize and keep the barcode scanner running
            in the background, despite re-renderings happening in a React application.
          </p>
        </div>
        <MenuButton to="/scanner">
          <ScannerIcon color="black" />
          Scan now
        </MenuButton>
        <MenuButton to="/settings">
          <SettingsIcon color="black" />
          Settings
        </MenuButton>
      </Show>
    </main>
  );
}
