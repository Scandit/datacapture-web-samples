import type { ReactElement } from "react";
import { StrictMode } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ResultPage from "./scanner/ResultPage";
import ScannerPage from "./scanner/ScannerPage";
import { SDKProvider } from "./sdk";
import SettingsPage from "./settings/SettingsPage";
import { StoreProvider } from "./store";

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/scanner",
    element: <ScannerPage />,
  },
  {
    path: "/result",
    element: <ResultPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

export default function App(): ReactElement {
  return (
    <StrictMode>
      <SDKProvider>
        <StoreProvider>
          <RouterProvider router={router} />
        </StoreProvider>
      </SDKProvider>
    </StrictMode>
  );
}
