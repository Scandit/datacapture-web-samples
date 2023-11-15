import type { ReactNode } from "react";

export interface ShowProps {
  when: boolean;
  children: ReactNode;
}

export default function Show({ children, when }: ShowProps): JSX.Element | null {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return when ? <>{children}</> : null;
}
