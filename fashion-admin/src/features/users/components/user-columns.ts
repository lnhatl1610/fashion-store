export type UserColumnKey = "avatar" | "id" | "email" | "phone" | "role" | "dateOfBirth" | "deletedAt" | "emailVerifiedAt" | "gender" | "lastLoginAt" | "phoneVerifiedAt" | "provider" | "status" | "createdAt" | "updatedAt";

export const USER_COLUMN_LABELS: Record<UserColumnKey, string> = {
    avatar: "Ảnh đại diện",
    id: "ID",
    email: "Email",
    phone: "Điện thoại",
    role: "Vai trò",
    dateOfBirth: "Ngày sinh",
    deletedAt: "Ngày xóa",
    emailVerifiedAt: "Email xác thực lúc",
    gender: "Giới tính",
    lastLoginAt: "Đăng nhập lần cuối",
    phoneVerifiedAt: "Điện thoại xác thực lúc",
    provider: "Nhà cung cấp",
    status: "Trạng thái",
    createdAt: "Ngày tạo",
    updatedAt: "Cập nhật lần cuối",
};

export const USER_COLUMN_ORDER: UserColumnKey[] = [
    "avatar",
    "id",
    "email",
    "phone",
    "role",
    "dateOfBirth",
    "deletedAt",
    "emailVerifiedAt",
    "gender",
    "lastLoginAt",
    "phoneVerifiedAt",
    "provider",
    "status",
    "createdAt",
    "updatedAt",
];
