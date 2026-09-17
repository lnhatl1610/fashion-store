import type { ReactNode } from "react";
import { X } from "lucide-react";
import type { User } from "../types/user.types";

interface UserDetailDialogProps {
    user: User;
    onClose: () => void;
}

const roleLabels = { CUSTOMER: "Customer", ADMIN: "Admin", STAFF: "Staff" } as const;
const genderLabels = { MALE: "Nam", FEMALE: "Nữ", OTHER: "Khác" } as const;
const statusLabels = { ACTIVE: "Đang hoạt động", BANNED: "Bị cấm" } as const;

const formatDate = (value?: string | null, dateOnly = false) => {
    if (!value) return "Chưa cập nhật";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Chưa cập nhật";
    return dateOnly ? date.toLocaleDateString("vi-VN") : date.toLocaleString("vi-VN");
};

function DetailItem({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
    return <div className={`min-w-0 ${className}`}><dt className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</dt><dd className="mt-1 break-words text-sm font-medium text-gray-900">{children}</dd></div>;
}

export function UserDetailDialog({ user, onClose }: UserDetailDialogProps) {
    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-950/40 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <div role="dialog" aria-modal="true" aria-labelledby="user-detail-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 id="user-detail-title" className="text-lg font-semibold text-gray-900">Chi tiết user</h2>
                        <p className="mt-1 text-sm text-gray-500">Toàn bộ thông tin hồ sơ và trạng thái tài khoản.</p>
                    </div>
                    <button type="button" onClick={onClose} className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300" aria-label="Đóng chi tiết user"><X size={18} /></button>
                </div>
                <dl className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                    <DetailItem label="Ảnh đại diện" className="sm:col-span-2"><div className="flex items-center gap-3">{user.avatar ? <img src={user.avatar} alt={`Ảnh đại diện của ${user.name}`} className="h-14 w-14 rounded-full object-cover" /> : <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xs text-gray-500">—</span>}<span className="break-all text-sm font-normal text-gray-600">{user.avatar || "Chưa cập nhật"}</span></div></DetailItem>
                    <DetailItem label="ID"><span className="font-mono text-xs">{user.id}</span></DetailItem>
                    <DetailItem label="Họ tên">{user.name}</DetailItem>
                    <DetailItem label="Email">{user.email}</DetailItem>
                    <DetailItem label="Số điện thoại">{user.phone || "Chưa cập nhật"}</DetailItem>
                    <DetailItem label="Role">{roleLabels[user.role]}</DetailItem>
                    <DetailItem label="Ngày sinh">{formatDate(user.dateOfBirth, true)}</DetailItem>
                    <DetailItem label="Giới tính">{user.gender ? genderLabels[user.gender] : "Chưa cập nhật"}</DetailItem>
                    <DetailItem label="Trạng thái">{statusLabels[user.status]}</DetailItem>
                    <DetailItem label="Nhà cung cấp">{user.provider}</DetailItem>
                    <DetailItem label="Ngày xóa">{formatDate(user.deletedAt)}</DetailItem>
                    <DetailItem label="Email xác thực lúc">{formatDate(user.emailVerifiedAt)}</DetailItem>
                    <DetailItem label="Điện thoại xác thực lúc">{formatDate(user.phoneVerifiedAt)}</DetailItem>
                    <DetailItem label="Đăng nhập lần cuối">{formatDate(user.lastLoginAt)}</DetailItem>
                    <DetailItem label="Ngày tạo">{formatDate(user.createdAt)}</DetailItem>
                    <DetailItem label="Cập nhật lần cuối">{formatDate(user.updatedAt)}</DetailItem>
                </dl>
                <div className="mt-6 flex justify-end border-t pt-4"><button type="button" onClick={onClose} className="min-h-10 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">Đóng</button></div>
            </div>
        </div>
    );
}

export default UserDetailDialog;
