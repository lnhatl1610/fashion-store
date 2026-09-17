interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function DataTablePagination({ currentPage, totalPages, onPageChange }: DataTablePaginationProps) {
  return <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-gray-600"><span>Trang {currentPage} / {totalPages}</span><div className="flex gap-2"><button type="button" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} className="rounded border px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40">Trước</button><button type="button" disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)} className="rounded border px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40">Sau</button></div></div>;
}
