import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw, Search, X } from "lucide-react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import type { Role, UpdateUser, User } from "./types/user.types";
import { userService } from "./services/userService";
import { UserTable } from "./components/UserTable";
import { UserEditDialog } from "./components/UserEditDialog";
import { UserDetailDialog } from "./components/UserDetailDialog";
import UserColumnVisibilityMenu from "./components/UserColumnVisibilityMenu";
import type { UserColumnKey } from "./components/user-columns";

const PAGE_SIZE = 10;
type RoleFilter = "ALL" | Role;
type StatusFilter = "ALL" | "ACTIVE" | "BANNED";
const DEFAULT_USER_COLUMNS: UserColumnKey[] = ["avatar", "id", "email", "phone", "role", "status", "createdAt"];

const roleLabels: Record<Role, string> = { CUSTOMER: "Customer", ADMIN: "Admin", STAFF: "Staff" };

export const UserPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [role, setRole] = useState<RoleFilter>("ALL");
    const [status, setStatus] = useState<StatusFilter>("ALL");
    const [page, setPage] = useState(1);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [viewingUser, setViewingUser] = useState<User | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState<UserColumnKey[]>(DEFAULT_USER_COLUMNS);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await userService.getUsers();
            setUsers(res.data.data);
            setError("");
        } catch {
            setError("Không thể tải danh sách user. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchUsers();
    }, [fetchUsers]);

    const filteredUsers = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return users.filter((user) => {
            const matchesQuery = !normalizedQuery || `${user.name} ${user.email} ${user.phone ?? ""}`.toLowerCase().includes(normalizedQuery);
            const matchesRole = role === "ALL" || user.role === role;
            const matchesStatus = status === "ALL" || user.status === status;
            return matchesQuery && matchesRole && matchesStatus;
        });
    }, [query, role, status, users]);

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const visibleUsers = useMemo(
        () => filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
        [currentPage, filteredUsers],
    );

    const resetFilters = () => {
        setQuery("");
        setRole("ALL");
        setStatus("ALL");
        setPage(1);
    };

    const updateUser = async (data: UpdateUser) => {
        setIsSaving(true);
        try {
            await userService.updateUser(data);
            setEditingUser(null);
            await fetchUsers();
        } catch {
            setError("Không thể cập nhật user. Vui lòng thử lại.");
        } finally {
            setIsSaving(false);
        }
    };

    const deleteUser = async () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        try {
            await userService.deleteUser(deleteTarget.id);
            setDeleteTarget(null);
            await fetchUsers();
        } catch {
            setError("Không thể xóa user. Vui lòng thử lại.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-5">
            {error && <div role="alert" className="flex items-center justify-between gap-3 rounded-lg bg-red-50 p-3 text-sm text-red-700"><span>{error}</span><button type="button" onClick={() => void fetchUsers()} className="shrink-0 font-semibold underline">Thử lại</button></div>}

            <div className="admin-filter flex flex-col gap-3 rounded-xl bg-gray-50 p-3 sm:flex-row sm:flex-wrap">
                <label className="relative min-w-0 flex-1 sm:min-w-64"><Search size={16} className="absolute left-3 top-2.5 text-gray-400" aria-hidden="true" /><span className="sr-only">Tìm user</span><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Tìm theo tên, email hoặc phone..." aria-label="Tìm user theo tên, email hoặc số điện thoại" className="w-full rounded-lg border-0 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200" /></label>
                <select value={role} onChange={(event) => { setRole(event.target.value as RoleFilter); setPage(1); }} aria-label="Lọc theo role" className="rounded-lg border-0 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-gray-200"><option className="text-gray-900" value="ALL">Tất cả role</option>{(Object.keys(roleLabels) as Role[]).map((value) => <option className="text-gray-900" key={value} value={value}>{roleLabels[value]}</option>)}</select>
                <select value={status} onChange={(event) => { setStatus(event.target.value as StatusFilter); setPage(1); }} aria-label="Lọc theo trạng thái" className="rounded-lg border-0 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-gray-200"><option className="text-gray-900" value="ALL">Tất cả trạng thái</option><option className="text-gray-900" value="ACTIVE">Đang hoạt động</option><option className="text-gray-900" value="BANNED">Bị cấm</option></select>
                <button type="button" onClick={resetFilters} disabled={!query && role === "ALL" && status === "ALL"} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border-0 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"><X size={16} aria-hidden="true" />Xóa lọc</button>
                <button type="button" onClick={() => void fetchUsers()} disabled={isLoading} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border-0 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Tải lại danh sách user"><RefreshCw size={16} className={isLoading ? "animate-spin" : ""} aria-hidden="true" />Tải lại</button>
                <UserColumnVisibilityMenu visibleColumns={visibleColumns} onChange={setVisibleColumns} />
            </div>

            <UserTable users={visibleUsers} visibleColumns={visibleColumns} isLoading={isLoading} currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} onView={setViewingUser} onEdit={setEditingUser} onDelete={setDeleteTarget} />

            {editingUser && <UserEditDialog user={editingUser} saving={isSaving} onCancel={() => setEditingUser(null)} onSubmit={(data) => void updateUser(data)} />}
            <ConfirmDialog open={Boolean(deleteTarget)} title="Xác nhận xóa user" description={deleteTarget ? `Tài khoản “${deleteTarget.name}” (${deleteTarget.email}) sẽ bị xóa khỏi hệ thống. Thao tác này không thể hoàn tác.` : ""} loading={isDeleting} onCancel={() => setDeleteTarget(null)} onConfirm={() => void deleteUser()} />
            {viewingUser && <UserDetailDialog user={viewingUser} onClose={() => setViewingUser(null)} />}
        </div>
    );
};

export default UserPage;
