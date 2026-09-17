# Cấu trúc trang Storefront

## Public pages

| URL | Trang | Mô tả |
| --- | --- | --- |
| / | Home | Hero, brand strip, product showcases, style và testimonials |
| /shop | Product listing | Tất cả sản phẩm |
| /shop/:slug | Category listing | Sản phẩm theo category |
| /search | Search listing | Kết quả theo query q |
| /products/:slug | Product detail | Gallery, variant, review, question, add to cart |
| /cart | Cart | Items, quantity, coupon draft, order summary |

## Auth pages

| URL | Trang |
| --- | --- |
| /login | Đăng nhập |
| /register | Đăng ký |
| /forgot-password | Yêu cầu reset password |
| /reset-password | Đặt lại password |

## Protected pages

| URL | Trang |
| --- | --- |
| /checkout | Chọn địa chỉ, vận chuyển, thanh toán |
| /order-confirmation | Xác nhận order sau checkout |
| /account | Account overview |
| /account/profile | Profile |
| /account/profile/password | Đổi password |
| /account/orders | Lịch sử order |
| /account/orders/:id | Chi tiết order |
| /account/wishlist | Wishlist |
| /account/addresses | Địa chỉ |
| /account/reviews | Review của customer |
| /account/coupons | Coupon của customer |
| /account/notifications | Thông báo |

## Layout

- StorefrontLayout: promo bar, site header, mobile navigation, cart drawer, footer.
- AuthLayout: centered card cho login/register/reset.
- AccountLayout: header, account nav, profile summary và nested outlet.

Routes dùng lazy loading cho các màn hình lớn.

