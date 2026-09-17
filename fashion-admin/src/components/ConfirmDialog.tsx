interface ConfirmDialogProps { open: boolean; title: string; description: string; loading?: boolean; onCancel: () => void; onConfirm: () => void }
export function ConfirmDialog({ open, title, description, loading, onCancel, onConfirm }: ConfirmDialogProps) {
  if (!open) return null;
  return <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4"><div role="dialog" aria-modal="true" className="w-full max-w-sm space-y-4 rounded-lg bg-white p-5 shadow-xl"><h2 className="font-semibold">{title}</h2><p className="text-sm text-gray-600">{description}</p><div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className="rounded border px-3 py-2 text-sm">Hủy</button><button type="button" disabled={loading} onClick={onConfirm} className="rounded bg-red-600 px-3 py-2 text-sm text-white disabled:opacity-50">{loading ? "Đang xử lý…" : "Xác nhận"}</button></div></div></div>;
}
