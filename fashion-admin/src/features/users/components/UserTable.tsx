import type { User } from "../types/user.types";
import type { UserColumnKey } from "./user-columns";
import { USER_COLUMN_LABELS, USER_COLUMN_ORDER } from "./user-columns";
import { DataTablePagination } from "@/components/DataTablePagination";
import { RowActionsMenu } from "@/components/RowActionsMenu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface UserTableProps {
    users: User[];
    visibleColumns: UserColumnKey[];
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onView: (user: User) => void;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

const statusLabels: Record<User["status"], string> = { ACTIVE: "Đang hoạt động", BANNED: "Bị cấm" };

export const UserTable = ({ users, visibleColumns, isLoading, currentPage, totalPages, onPageChange, onView, onEdit, onDelete }: UserTableProps) => {
    const isColumnVisible = (column: UserColumnKey) => visibleColumns.includes(column);
    const columnCount = visibleColumns.length + 2;
    const formatDate = (value?: string | null) => {
        if (!value) return "—";
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString("vi-VN");
    };

    return (
        <div className="space-y-3">
            <div className="admin-table-card">
                <Table className="min-w-0 w-full table-fixed text-gray-900">
                <TableHeader>
                    <TableRow className="border-b border-gray-300 bg-gray-50">
                        {isColumnVisible("avatar") && <TableHead className="w-[7%] whitespace-normal break-words px-2 py-2 text-[11px] leading-tight text-gray-600 sm:px-3">{USER_COLUMN_LABELS.avatar}</TableHead>}
                        {isColumnVisible("id") && <TableHead className="whitespace-normal break-words px-2 py-2 text-[11px] leading-tight text-gray-600 sm:px-3">{USER_COLUMN_LABELS.id}</TableHead>}
                        <TableHead className="w-[14%] whitespace-normal break-words px-2 py-2 text-[11px] leading-tight text-gray-600 sm:px-3">Tên user</TableHead>
                        {USER_COLUMN_ORDER.filter((column) => column !== "avatar" && column !== "id").map((column) => isColumnVisible(column) && <TableHead key={column} className="whitespace-normal break-words px-2 py-2 text-[11px] leading-tight text-gray-600 sm:px-3">{USER_COLUMN_LABELS[column]}</TableHead>)}
                        <TableHead className="w-16 whitespace-normal px-2 py-2 text-right text-[11px] leading-tight text-gray-600 sm:px-3">Tùy chọn</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={columnCount} className="py-12 text-center text-sm text-gray-500">Đang tải danh sách user...</TableCell>
                        </TableRow>
                    )}
                    {!isLoading && users.map((user) => (
                        <TableRow key={user.id}>
                            {isColumnVisible("avatar") && <TableCell className="w-[7%] px-2 py-2 sm:px-3">{user.avatar ? <img src={user.avatar} alt={`Ảnh đại diện của ${user.name}`} className="h-8 w-8 rounded-full object-cover" /> : <span className="text-gray-500">—</span>}</TableCell>}
                            {isColumnVisible("id") && <TableCell className="break-all px-2 py-2 font-mono text-[11px] text-gray-600 sm:px-3">{user.id}</TableCell>}
                            <TableCell className="w-[14%] px-2 py-2 text-gray-900 sm:px-3">
                                <div className="min-w-0">
                                    <p className="truncate font-medium text-gray-900">{user.name}</p>
                                </div>
                            </TableCell>
                            {isColumnVisible("email") && <TableCell className="break-words px-2 py-2 sm:px-3">{user.email}</TableCell>}
                            {isColumnVisible("phone") && <TableCell className="break-words px-2 py-2 text-gray-600 sm:px-3">{user.phone || "—"}</TableCell>}
                            {isColumnVisible("role") && <TableCell className="break-words px-2 py-2 capitalize sm:px-3">{user.role.toLowerCase()}</TableCell>}
                            {isColumnVisible("dateOfBirth") && <TableCell className="break-words px-2 py-2 text-[11px] text-gray-600 sm:px-3">{formatDate(user.dateOfBirth)}</TableCell>}
                            {isColumnVisible("deletedAt") && <TableCell className="break-words px-2 py-2 text-[11px] text-gray-600 sm:px-3">{formatDate(user.deletedAt)}</TableCell>}
                            {isColumnVisible("emailVerifiedAt") && <TableCell className="break-words px-2 py-2 text-[11px] text-gray-600 sm:px-3">{formatDate(user.emailVerifiedAt)}</TableCell>}
                            {isColumnVisible("gender") && <TableCell className="break-words px-2 py-2 text-gray-600 sm:px-3">{user.gender || "—"}</TableCell>}
                            {isColumnVisible("lastLoginAt") && <TableCell className="break-words px-2 py-2 text-[11px] text-gray-600 sm:px-3">{formatDate(user.lastLoginAt)}</TableCell>}
                            {isColumnVisible("phoneVerifiedAt") && <TableCell className="break-words px-2 py-2 text-[11px] text-gray-600 sm:px-3">{formatDate(user.phoneVerifiedAt)}</TableCell>}
                            {isColumnVisible("provider") && <TableCell className="break-words px-2 py-2 text-gray-600 sm:px-3">{user.provider || "—"}</TableCell>}
                            {isColumnVisible("status") && <TableCell className="break-words px-2 py-2 sm:px-3"><span className={`inline-flex max-w-full rounded-full px-2.5 py-1 text-[11px] font-medium ${user.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{statusLabels[user.status]}</span></TableCell>}
                            {isColumnVisible("createdAt") && <TableCell className="break-words px-2 py-2 text-[11px] text-gray-600 sm:px-3">{formatDate(user.createdAt)}</TableCell>}
                            {isColumnVisible("updatedAt") && <TableCell className="break-words px-2 py-2 text-[11px] text-gray-600 sm:px-3">{formatDate(user.updatedAt)}</TableCell>}
                            <TableCell className="w-16 px-2 py-2 text-right sm:px-3">
                                <RowActionsMenu
                                    label={user.name}
                                    actions={[
                                        { label: "Xem chi tiết", onSelect: () => onView(user) },
                                        { label: "Sửa", onSelect: () => onEdit(user) },
                                        { label: "Xóa", tone: "danger", onSelect: () => onDelete(user) },
                                    ]}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                    {!isLoading && users.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={columnCount} className="py-12 text-center text-sm text-gray-500">
                                Không tìm thấy user phù hợp.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
            <DataTablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    );
};

export default UserTable;
