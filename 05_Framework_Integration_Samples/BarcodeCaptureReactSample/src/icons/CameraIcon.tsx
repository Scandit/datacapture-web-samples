import type { ReactElement } from "react";

export interface CameraIconProps {
  color: string;
}

export default function CameraIcon({ color }: CameraIconProps): ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <path
        fill={color}
        d="M12 17.5q1.875 0 3.188-1.313T16.5 13q0-1.875-1.313-3.188T12 8.5q-1.875 0-3.188 1.313T7.5 13q0 1.875 1.313 3.188T12 17.5ZM4 21q-.825 0-1.413-.588T2 19V7q0-.825.588-1.413T4 5h3.15L8.4 3.65q.275-.325.663-.488T9.874 3h4.25q.425 0 .813.163t.662.487L16.85 5H20q.825 0 1.413.588T22 7v12q0 .825-.588 1.413T20 21H4Z"
      />
    </svg>
  );
}
