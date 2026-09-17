import { useEffect, useRef, useState } from "react";
import { Columns3 } from "lucide-react";
import type { UserColumnKey } from "./user-columns";
import { USER_COLUMN_LABELS, USER_COLUMN_ORDER } from "./user-columns";

interface UserColumnVisibilityMenuProps {
    visibleColumns: UserColumnKey[];
    onChange: (columns: UserColumnKey[]) => void;
}

export function UserColumnVisibilityMenu({ visibleColumns, onChange }: UserColumnVisibilityMenuProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event: PointerEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
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

    const toggleColumn = (column: UserColumnKey) => {
        const nextColumns = visibleColumns.includes(column)
            ? visibleColumns.filter((item) => item !== column)
            : [...visibleColumns, column];
        onChange(nextColumns);
    };

    return (
        <div ref={menuRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-haspopup="dialog"
                aria-expanded={open}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border-0 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
                <Columns3 size={16} aria-hidden="true" />
                Cột hiển thị
            </button>
            {open && (
                <div
                    role="dialog"
                    aria-label="Chọn cột hiển thị"
                    className="absolute right-0 top-12 z-30 w-72 rounded-xl border border-gray-200 bg-white p-3 shadow-xl"
                >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Chọn cột</p>
                    <div className="max-h-80 space-y-1 overflow-y-auto">
                        {USER_COLUMN_ORDER.map((column) => (
                            <label
                                key={column}
                                className="flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <input
                                    type="checkbox"
                                    checked={visibleColumns.includes(column)}
                                    onChange={() => toggleColumn(column)}
                                    className="h-4 w-4 rounded border-gray-300 accent-gray-900"
                                />
                                {USER_COLUMN_LABELS[column]}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserColumnVisibilityMenu;
