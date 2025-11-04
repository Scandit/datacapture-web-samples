import type { ReactElement, ReactNode } from "react";

export interface ShowProps {
  when: boolean;
  children: ReactNode;
}

export default function Show({ children, when }: ShowProps): ReactElement | null {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return when ? <>{children}</> : null;
}
