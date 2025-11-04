import type { ReactElement } from "react";

import Spinner from "./Spinner";

export default function LoadingMessage(): ReactElement {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p>Initializing the scanner...</p>
      <Spinner color="black" />
      <p>(This can also be done in the background)</p>
    </div>
  );
}
