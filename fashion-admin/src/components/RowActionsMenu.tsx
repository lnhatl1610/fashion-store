import { useEffect, useRef, useState } from "react";
import { Settings } from "lucide-react";

interface RowAction { label: string; tone?: "danger"; onSelect: () => void }

export function RowActionsMenu({ actions, label }: { actions: RowAction[]; label: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-flex">
      <button
        type="button"
        aria-label={`Mở tùy chọn cho ${label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        title={`Tùy chọn ${label}`}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        <Settings size={18} aria-hidden="true" />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-11 z-30 min-w-36 rounded-xl border border-gray-200 bg-white p-1.5 text-left shadow-xl">
          {actions.map((action) => (
            <button
              type="button"
              role="menuitem"
              key={action.label}
              onClick={() => { setOpen(false); action.onSelect(); }}
              className={`block min-h-10 w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ${action.tone === "danger" ? "text-red-600 hover:bg-red-50" : "text-gray-700"}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
