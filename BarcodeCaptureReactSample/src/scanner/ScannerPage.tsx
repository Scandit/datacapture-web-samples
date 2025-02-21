import type { ReactElement } from "react";
import { Link } from "react-router-dom";

import LoadingMessage from "../components/LoadingMessage";
import Show from "../components/Show";
import BackIcon from "../icons/BackIcon";
import { useSDK } from "../sdk";
import ScannerComponent from "./ScannerComponent";

export default function ScannerPage(): ReactElement {
  const { loaded } = useSDK();

  return (
    <main className="w-screen h-[100dvh] flex items-center justify-center flex-col">
      <Show when={!loaded}>
        <LoadingMessage />
      </Show>
      <Show when={loaded}>
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
