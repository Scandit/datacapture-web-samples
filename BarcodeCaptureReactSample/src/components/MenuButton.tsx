import type { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";

import ForwardIcon from "../icons/ForwardIcon";

export interface MenuButtonProps {
  to: string;
  children: ReactNode;
}

export default function MenuButton({ children, to }: MenuButtonProps): ReactElement {
  return (
    <Link to={to} className="w-full p-4 py-8 flex justify-between items-center transition hover:bg-gray-100">
      <div className="flex items-center gap-4">{children}</div>
      <ForwardIcon color="black" />
    </Link>
  );
}
