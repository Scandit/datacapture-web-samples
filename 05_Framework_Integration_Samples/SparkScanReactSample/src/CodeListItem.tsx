import { PackageIcon } from "./PackageIcon";
import type { CodeItem } from "./types";

interface CodeListItemProps {
  code: CodeItem;
}

export function CodeListItem({ code }: CodeListItemProps) {
  return (
    <li className="flex items-center p-4 bg-white">
      {/* Package Icon */}
      <div className="flex-shrink-0 mr-4">
        <PackageIcon />
      </div>

      {/* Code Info */}
      <div className="flex-1">
        <div className="font-semibold text-lg text-black">{code.data}</div>
        <div className="text-sm text-gray-600">{code.symbology}</div>
      </div>

      {/* Quantity */}
      <div className="text-right">
        <div className="text-lg font-semibold text-black">Qty: {code.quantity}</div>
      </div>
    </li>
  );
}
