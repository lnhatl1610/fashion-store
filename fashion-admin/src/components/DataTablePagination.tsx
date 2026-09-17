import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function DataTablePagination({ currentPage, totalPages, onPageChange }: DataTablePaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const startPage = Math.max(1, Math.min(currentPage - 2, safeTotalPages - 4));
  const pageNumbers = Array.from({ length: Math.min(5, safeTotalPages) }, (_, index) => startPage + index);
  const buttonClass = "inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border text-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm text-gray-600" aria-label="Phân trang">
      <span>Trang {currentPage} / {safeTotalPages}</span>
      <div className="flex items-center gap-1" role="group" aria-label="Điều hướng trang">
        <button type="button" disabled={currentPage <= 1} onClick={() => onPageChange(1)} className={buttonClass} aria-label="Trang đầu"><ChevronsLeft size={16} /></button>
        <button type="button" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} className={buttonClass} aria-label="Trang trước"><ChevronLeft size={16} /></button>
        {pageNumbers.map((page) => <button type="button" key={page} aria-current={page === currentPage ? "page" : undefined} onClick={() => onPageChange(page)} className={`${buttonClass} ${page === currentPage ? "border-gray-900 bg-gray-900 text-white hover:bg-gray-800" : ""}`}>{page}</button>)}
        <button type="button" disabled={currentPage >= safeTotalPages} onClick={() => onPageChange(currentPage + 1)} className={buttonClass} aria-label="Trang sau"><ChevronRight size={16} /></button>
        <button type="button" disabled={currentPage >= safeTotalPages} onClick={() => onPageChange(safeTotalPages)} className={buttonClass} aria-label="Trang cuối"><ChevronsRight size={16} /></button>
      </div>
    </nav>
  );
}
