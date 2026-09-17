interface RowAction { label: string; tone?: "danger"; onSelect: () => void }
export function RowActionsMenu({ actions, label }: { actions: RowAction[]; label: string }) {
  return <div className="flex justify-end gap-1">{actions.map((action) => <button type="button" key={action.label} aria-label={`${action.label} ${label}`} onClick={action.onSelect} className={`rounded px-2 py-1 text-xs hover:bg-gray-100 ${action.tone === "danger" ? "text-red-600" : "text-gray-700"}`}>{action.label}</button>)}</div>;
}
