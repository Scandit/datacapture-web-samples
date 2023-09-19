import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import LoadingMessage from "../components/LoadingMessage";
import Show from "../components/Show";
import BackIcon from "../icons/BackIcon";
import { useSDK } from "../sdk";
import { useStore } from "../store";
import ScannerComponent from "./ScannerComponent";

export default function ScannerPage(): JSX.Element {
  const { loading, sdk } = useSDK();
  const { setBarcode } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    sdk.onScan(async (_, session) => {
      if (session.newlyRecognizedBarcodes.length > 0) {
        await sdk.enableScanning(false);
        setBarcode(session.newlyRecognizedBarcodes[0]);
        navigate("/result");
      }
    });
  }, [loading, sdk, setBarcode, navigate]);

  return (
    <main className="w-screen h-[100dvh] flex items-center justify-center flex-col">
      <Show when={loading}>
        <LoadingMessage />
      </Show>
      <Show when={!loading}>
        <nav className="fixed top-0 left-0 py-2 z-10 lg:p-4">
          <Link to="/" className="p-4 flex items-center gap-2 text-white">
            <BackIcon color="white" />
            Back
          </Link>
        </nav>
        <ScannerComponent />
      </Show>
    </main>
  );
}
