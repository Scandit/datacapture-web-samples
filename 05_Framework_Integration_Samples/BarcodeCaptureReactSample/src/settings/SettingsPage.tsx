import type { ReactElement } from "react";
import { Link } from "react-router-dom";

import BackIcon from "../icons/BackIcon";
import CameraSettings from "./CameraSettings";
import SymbologySettings from "./SymbologySettings";

export default function SettingsPage(): ReactElement {
  return (
    <main className="w-screen h-[100dvh] flex flex-col gap-4 lg:max-w-[800px] lg:mx-auto">
      <nav className="sticky py-4 top-0 bg-white border-b lg:p-4">
        <Link to="/" className="p-4 flex items-center gap-2 z-10">
          <BackIcon color="black" />
          Back
        </Link>
      </nav>
      <div className="w-full p-4 flex flex-col gap-8">
        <h1 className="font-bold text-2xl">Settings</h1>
        <CameraSettings />
        <SymbologySettings />
      </div>
    </main>
  );
}
