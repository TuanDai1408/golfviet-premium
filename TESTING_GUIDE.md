# Hướng dẫn Test / 테스트 가이드 / Testing Guide

## Cách test website / 웹사이트 테스트 방법 / How to Test the Website

### Option 1: Manual Browser Testing (Khuyến nghị / 권장 / Recommended)

Vì bạn chưa cài đặt Node.js/npm, bạn có thể test theo 2 cách:

#### Cách 1: Cài đặt Node.js và chạy dev server

1. **Cài đặt Node.js**:
   - Tải tại: https://nodejs.org/
   - Chọn phiên bản LTS (Long Term Support)
   - Cài đặt và khởi động lại terminal

2. **Chạy dự án**:
   ```bash
   cd d:\4.Web_Booking_Golf\SourceCode\golfviet-premium
   npm install
   npm run dev
   ```

3. **Mở trình duyệt**:
   - Truy cập: http://localhost:5173
   - Website sẽ tự động load

#### Cách 2: Sử dụng Live Server hoặc Python HTTP Server

**Với Python (nếu đã cài):**
```bash
cd d:\4.Web_Booking_Golf\SourceCode\golfviet-premium
python -m http.server 8000
```
Sau đó mở: http://localhost:8000

**Với VS Code Live Server:**
1. Cài extension "Live Server" trong VS Code
2. Right-click vào `index.html`
3. Chọn "Open with Live Server"

---

## Checklist Test / 테스트 체크리스트 / Testing Checklist

### ✅ Test 1: Kiểm tra Website Load / 웹사이트 로딩 확인 / Check Website Loads

- [ ] Trang chủ hiển thị đúng
- [ ] Không có lỗi trong Console (F12 → Console tab)
- [ ] Hình ảnh load đầy đủ
- [ ] Font chữ hiển thị đẹp

### ✅ Test 2: Kiểm tra Language Switcher / 언어 전환기 확인 / Check Language Switcher

**Vị trí**: Góc phải header, có cờ quốc gia

1. **Kiểm tra hiển thị**:
   - [ ] Nhìn thấy cờ 🇻🇳 và text "Tiếng Việt" (mặc định)
   - [ ] Click vào sẽ hiện dropdown với 3 lựa chọn
   - [ ] Có cờ: 🇰🇷 한국어, 🇻🇳 Tiếng Việt, 🇬🇧 English

2. **Test chuyển sang tiếng Hàn (Korean)**:
   - [ ] Click vào language switcher
   - [ ] Click "한국어"
   - [ ] Toàn bộ text trên trang đổi sang tiếng Hàn
   - [ ] Logo vẫn là "GolfViet"
   - [ ] Navigation menu: "대시보드", "티타임 예약", "멤버십", "지원"
   - [ ] Hero text: "베트남 골프" và "프리미엄 예약"

3. **Test chuyển sang tiếng Anh (English)**:
   - [ ] Click vào language switcher
   - [ ] Click "English"
   - [ ] Toàn bộ text trên trang đổi sang tiếng Anh
   - [ ] Navigation: "Dashboard", "Book Tee Time", "Membership", "Support"
   - [ ] Hero text: "Vietnam Golf" và "Premium Booking"

4. **Test chuyển lại tiếng Việt (Vietnamese)**:
   - [ ] Click vào language switcher
   - [ ] Click "Tiếng Việt"
   - [ ] Toàn bộ text trở về tiếng Việt
   - [ ] Navigation: "Bảng điều khiển", "Đặt Tee Time", "Thành viên", "Hỗ trợ"

### ✅ Test 3: Kiểm tra Persistence / 지속성 확인 / Check Persistence

- [ ] Chọn một ngôn ngữ (ví dụ: Korean)
- [ ] Refresh trang (F5)
- [ ] Kiểm tra ngôn ngữ vẫn là Korean (không đổi về Vietnamese)
- [ ] LocalStorage lưu đúng: Mở DevTools (F12) → Application → Local Storage → kiểm tra key `golfviet-language`

### ✅ Test 4: Kiểm tra Tất cả các Trang / 모든 페이지 확인 / Check All Pages

Test mỗi trang với cả 3 ngôn ngữ:

#### 4.1 Home Page (/)
- [ ] Hero section text đổi ngôn ngữ
- [ ] "Popular Courses" / "Sân golf phổ biến" / "인기 코스"
- [ ] Trust section (3 features) đổi ngôn ngữ
- [ ] Footer links đổi ngôn ngữ

#### 4.2 Dashboard Page (/dashboard)
- [ ] Click "Dashboard" trong menu
- [ ] Title: "My Bookings" / "Đặt chỗ của tôi" / "내 예약"
- [ ] Stats cards text đổi
- [ ] "Next Tee Time" / "Tee Time tiếp theo" / "다음 티타임"
- [ ] Buttons: "Cancel" / "Hủy" / "취소"

#### 4.3 Course List Page (/courses)
- [ ] Click "Book Tee Time" button
- [ ] Filters sidebar text đổi
- [ ] "Available Courses" / "Sân golf có sẵn" / "이용 가능한 코스"
- [ ] Course cards hiển thị với buttons "Book" / "Đặt" / "예약"

#### 4.4 Course Detail Page
- [ ] Click vào một course card
- [ ] "About the Course" / "Về sân golf" / "코스 정보"
- [ ] Booking widget text đổi
- [ ] "Book Now" / "Đặt ngay" / "지금 예약"

#### 4.5 Checkout Page
- [ ] Click "Book Now"
- [ ] "Checkout" / "Thanh toán" / "결제"
- [ ] Payment form labels đổi
- [ ] Price breakdown text đổi

#### 4.6 Confirmation Page
- [ ] Complete checkout
- [ ] "Booking Confirmed!" / "Đặt chỗ đã xác nhận!" / "예약 확인!"
- [ ] Buttons text đổi

### ✅ Test 5: Dark Mode Compatibility

- [ ] Bật Dark Mode (nếu hệ thống hỗ trợ)
- [ ] Language switcher vẫn hiển thị tốt
- [ ] Dropdown menu có màu đúng
- [ ] Text vẫn đọc được

### ✅ Test 6: Responsive Design

Test trên các kích thước màn hình:

- [ ] Desktop (> 1024px): Language switcher hiện đầy đủ
- [ ] Tablet (768px - 1024px): Language switcher vẫn hoạt động
- [ ] Mobile (< 768px): Chỉ hiện cờ, không hiện text label

---

## Expected Results / Kết quả mong đợi / 예상 결과

### ✅ Khi chuyển sang tiếng Hàn (Korean):

**Header Navigation:**
- 대시보드 (Dashboard)
- 티타임 예약 (Book Tee Time)
- 멤버십 (Membership)
- 지원 (Support)
- 새 예약 (New Booking)

**Home Page:**
- 실시간 예약 시스템 (Real-time Booking System)
- 베트남 골프 / 프리미엄 예약 (Vietnam Golf / Premium Booking)
- 위치 (Location)
- 날짜 (Date)
- 검색 (Search)

**Footer:**
- 회사 (Company)
- 법률 (Legal)

### ✅ Khi chuyển sang tiếng Việt (Vietnamese):

**Header Navigation:**
- Bảng điều khiển (Dashboard)
- Đặt Tee Time (Book Tee Time)
- Thành viên (Membership)
- Hỗ trợ (Support)
- Đặt chỗ mới (New Booking)

**Home Page:**
- Hệ thống đặt chỗ thời gian thực (Real-time Booking System)
- Vietnam Golf / Đặt chỗ cao cấp (Vietnam Golf / Premium Booking)
- Địa điểm (Location)
- Ngày (Date)
- Tìm kiếm (Search)

**Footer:**
- Công ty (Company)
- Pháp lý (Legal)

---

## Common Issues / Vấn đề thường gặp / 일반적인 문제

### Issue 1: Website không load
**Nguyên nhân**: Chưa cài Node.js hoặc chưa chạy dev server
**Giải pháp**: Cài Node.js theo hướng dẫn ở trên

### Issue 2: Language switcher không hiện
**Nguyên nhân**: LanguageProvider chưa wrap App
**Kiểm tra**: Xem file App.tsx đã có `<LanguageProvider>` chưa

### Issue 3: Text không đổi khi chuyển ngôn ngữ
**Nguyên nhân**: Component chưa dùng `useLanguage()` hook
**Kiểm tra**: Console có lỗi không

### Issue 4: Lỗi "Cannot find module 'react'"
**Nguyên nhân**: Imports from CDN chưa load
**Giải pháp**: Đảm bảo có internet và check Console errors

---

## Browser DevTools Tips

### Kiểm tra LocalStorage:
1. Mở DevTools (F12)
2. Tab "Application"
3. Sidebar → Local Storage → file:// (hoặc localhost)
4. Tìm key: `golfviet-language`
5. Value sẽ là: `"ko"`, `"vi"`, hoặc `"en"`

### Kiểm tra Console:
1. Mở DevTools (F12)
2. Tab "Console"
3. Không có lỗi màu đỏ = OK
4. Nếu có lỗi, screenshot và báo lại

---

## Video Demo (If Testing Works)

Nếu test thành công, bạn có thể:
1. Record màn hình (Win + G trên Windows)
2. Demo việc chuyển đổi giữa 3 ngôn ngữ
3. Chuyển qua vài trang khác nhau
4. Refresh page để kiểm tra persistence

---

## Summary Checklist

- [ ] Node.js đã cài đặt
- [ ] Dev server đang chạy (npm run dev)
- [ ] Website mở được trong browser
- [ ] Language switcher hiển thị trong header
- [ ] Chuyển được giữa Korean, Vietnamese, English
- [ ] Text thay đổi trên toàn bộ trang
- [ ] Language preference được lưu (persist sau refresh)
- [ ] Tất cả 7 pages đều hoạt động với 3 ngôn ngữ
- [ ] Không có lỗi trong Console
- [ ] Dark mode hoạt động tốt

---

**Lưu ý**: Nếu gặp bất kỳ lỗi nào, hãy:
1. Screenshot lỗi
2. Copy text lỗi từ Console
3. Cho tôi biết để fix ngay!
