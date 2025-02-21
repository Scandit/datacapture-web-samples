import type { ReactElement } from "react";

export interface ScannerIconProps {
  color: string;
}

export default function ScannerIcon({ color }: ScannerIconProps): ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <path
        fill={color}
        d="M0 2a2 2 0 0 1 2-2h4v2H2v4H0V2m24 20a2 2 0 0 1-2 2h-4v-2h4v-4h2v4M2 24a2 2 0 0 1-2-2v-4h2v4h4v2H2M22 0a2 2 0 0 1 2 2v4h-2V2h-4V0h4Z"
      />
    </svg>
  );
}
