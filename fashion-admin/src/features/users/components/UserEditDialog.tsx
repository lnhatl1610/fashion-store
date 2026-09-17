import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import type { Gender, Role, UpdateUser, User, UserStatus } from "../types/user.types";

interface UserEditDialogProps {
    user: User;
    saving: boolean;
    onCancel: () => void;
    onSubmit: (data: UpdateUser) => void;
}

const inputClass = "mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200";
const selectClass = `${inputClass} bg-white`;

export function UserEditDialog({ user, saving, onCancel, onSubmit }: UserEditDialogProps) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone ?? "");
    const [avatar, setAvatar] = useState(user.avatar ?? "");
    const [role, setRole] = useState<Role>(user.role);
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth?.slice(0, 10) ?? "");
    const [gender, setGender] = useState<Gender | "">(user.gender ?? "");
    const [status, setStatus] = useState<UserStatus>(user.status);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
            id: user.id,
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || undefined,
            avatar: avatar.trim() || null,
            role,
            dateOfBirth: dateOfBirth || null,
            gender: gender || null,
            status,
        });
    };

    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-950/40 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
            <form onSubmit={submit} role="dialog" aria-modal="true" aria-labelledby="edit-user-title" className="max-h-[90vh] w-full max-w-2xl space-y-5 overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 id="edit-user-title" className="text-lg font-semibold text-gray-900">Sửa thông tin user</h2>
                        <p className="mt-1 text-sm text-gray-500">Cập nhật hồ sơ và quyền tài khoản của {user.name}.</p>
                    </div>
                    <button type="button" onClick={onCancel} className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300" aria-label="Đóng form sửa user"><X size={18} /></button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-sm font-medium text-gray-700">Họ tên<input required minLength={2} value={name} onChange={(event) => setName(event.target.value)} className={inputClass} /></label>
                    <label className="text-sm font-medium text-gray-700">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} /></label>
                    <label className="text-sm font-medium text-gray-700">Số điện thoại<input value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass} /></label>
                    <label className="text-sm font-medium text-gray-700">Avatar URL<input type="url" value={avatar} onChange={(event) => setAvatar(event.target.value)} placeholder="https://..." className={inputClass} /></label>
                    <label className="text-sm font-medium text-gray-700">Role<select value={role} onChange={(event) => setRole(event.target.value as Role)} className={selectClass}><option value="CUSTOMER">Customer</option><option value="STAFF">Staff</option><option value="ADMIN">Admin</option></select></label>
                    <label className="text-sm font-medium text-gray-700">Ngày sinh<input type="date" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} className={inputClass} /></label>
                    <label className="text-sm font-medium text-gray-700">Giới tính<select value={gender} onChange={(event) => setGender(event.target.value as Gender | "")} className={selectClass}><option value="">Chưa cập nhật</option><option value="MALE">Nam</option><option value="FEMALE">Nữ</option><option value="OTHER">Khác</option></select></label>
                    <label className="text-sm font-medium text-gray-700">Trạng thái tài khoản<select value={status} onChange={(event) => setStatus(event.target.value as UserStatus)} className={selectClass}><option value="ACTIVE">Đang hoạt động</option><option value="BANNED">Bị cấm</option></select></label>
                </div>
                <div className="flex justify-end gap-2 border-t pt-4">
                    <button type="button" onClick={onCancel} className="min-h-10 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Hủy</button>
                    <button type="submit" disabled={saving} className="min-h-10 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">{saving ? "Đang lưu..." : "Lưu thay đổi"}</button>
                </div>
            </form>
        </div>
    );
}
