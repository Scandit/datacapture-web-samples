import type { ReactElement } from "react";

export interface BackIconProps {
  color: string;
}

export default function BackIcon({ color }: BackIconProps): ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <path
        fill={color}
        d="M15.125 21.1L6.7 12.7q-.15-.15-.213-.325T6.425 12q0-.2.062-.375T6.7 11.3l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L9.55 12l7.35 7.35q.35.35.35.863t-.375.887q-.375.375-.875.375t-.875-.375Z"
      />
    </svg>
  );
}
