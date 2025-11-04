import { CodeListItem } from "./CodeListItem";
import type { CodeItem } from "./types";

interface CodesListProps {
  codes: CodeItem[];
  onClear?: () => void;
}

export function CodesList({ codes, onClear }: CodesListProps) {
  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  const totalItems = codes.reduce((sum, code) => sum + code.quantity, 0);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex justify-between items-center max-h-[56px]">
        <p className="font-bold">{totalItems} items scanned</p>
        <button type="button" onClick={handleClear} className="text-red-600 uppercase">
          Clear list
        </button>
      </div>

      <ul className="divide-y-2 h-[calc(100dvh-56px)] overflow-y-scroll relative">
        {codes.map((code, _index) => (
          <CodeListItem key={code.data} code={code} />
        ))}
      </ul>
    </div>
  );
}
