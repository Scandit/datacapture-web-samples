import type { ReactElement } from "react";

export interface BarcodeIconProps {
  color: string;
}

export default function BarcodeIcon({ color }: BarcodeIconProps): ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <path
        fill={color}
        d="M1 19V5h2v14H1Zm3 0V5h2v14H4Zm3 0V5h1v14H7Zm3 0V5h2v14h-2Zm3 0V5h3v14h-3Zm4 0V5h1v14h-1Zm3 0V5h3v14h-3Z"
      />
    </svg>
  );
}
