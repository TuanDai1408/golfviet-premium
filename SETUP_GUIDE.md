# Hướng dẫn Cài đặt Môi trường / 환경 설정 가이드 / Environment Setup Guide

## ⚠️ Vấn đề hiện tại / 현재 문제 / Current Issue

Node.js đã được cài đặt nhưng terminal chưa nhận diện được `node` và `npm`. Đây là vấn đề PATH environment variable.

## 🔧 Giải pháp / 해결방법 / Solution

### Bước 1: Khởi động lại VS Code hoặc Terminal

**Cách đơn giản nhất:**
1. Đóng hoàn toàn VS Code
2. Mở lại VS Code
3. Mở terminal mới (Ctrl + `)
4. Thử lại: `node --version`

### Bước 2: Kiểm tra Node.js đã cài đúng chưa

Mở **Command Prompt mới** (không phải PowerShell):
1. Nhấn `Win + R`
2. Gõ `cmd` và Enter
3. Gõ lệnh:
   ```bash
   node --version
   npm --version
   ```

Nếu hiển thị số version → Node.js đã cài OK, chỉ cần restart terminal.

### Bước 3: Nếu vẫn không được - Thêm PATH thủ công

**Tìm đường dẫn Node.js:**
Thường ở: `C:\Program Files\nodejs\`

**Thêm vào PATH:**
1. Nhấn `Win + S` → tìm "Environment Variables"
2. Chọn "Edit the system environment variables"
3. Click "Environment Variables"
4. Trong "System variables", tìm `Path` → click "Edit"
5. Click "New" → thêm: `C:\Program Files\nodejs\`
6. Click OK tất cả
7. **Khởi động lại VS Code hoàn toàn**

### Bước 4: Sử dụng Node Version Manager (nvm) - Khuyến nghị

Nếu vẫn gặp vấn đề, cài nvm-windows:
1. Gỡ Node.js hiện tại (Control Panel → Uninstall)
2. Tải nvm-windows: https://github.com/coreybutler/nvm-windows/releases
3. Cài nvm-windows
4. Mở terminal mới:
   ```bash
   nvm install lts
   nvm use lts
   ```

---

## ✅ Sau khi Node.js hoạt động

Khi `node --version` và `npm --version` chạy được:

### 1. Cài đặt dependencies

```bash
cd d:\4.Web_Booking_Golf\SourceCode\golfviet-premium
npm install
```

Lệnh này sẽ:
- Cài tất cả packages cần thiết (React, Vite, TypeScript, etc.)
- Tạo thư mục `node_modules`
- Có thể mất 2-5 phút

### 2. Chạy development server

```bash
npm run dev
```

Kết quả:
```
  VITE v6.2.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 3. Mở trình duyệt

- Tự động mở: http://localhost:5173
- Hoặc Ctrl + Click vào link trong terminal

---

## 🧪 Test Checklist

Sau khi website chạy:

### ✅ Kiểm tra cơ bản
- [ ] Website load không lỗi
- [ ] Logo "GolfViet" hiển thị
- [ ] Hình ảnh load đầy đủ
- [ ] Console không có lỗi (F12)

### ✅ Test Language Switcher
- [ ] Thấy language switcher góc phải header
- [ ] Click vào → hiện dropdown với 3 lựa chọn
- [ ] Chọn 한국어 → text đổi sang tiếng Hàn
- [ ] Chọn English → text đổi sang tiếng Anh
- [ ] Chọn Tiếng Việt → text đổi về tiếng Việt

### ✅ Test Persistence
- [ ] Chọn một ngôn ngữ (ví dụ: Korean)
- [ ] Refresh page (F5)
- [ ] Ngôn ngữ vẫn là Korean (không reset về Vietnamese)

### ✅ Test Navigation
- [ ] Click "Đặt Tee Time" / "Book Tee Time" / "티타임 예약"
- [ ] Vào trang Course List
- [ ] Click vào một sân golf
- [ ] Vào trang Course Detail
- [ ] Text vẫn đúng ngôn ngữ đã chọn

---

## 🐛 Troubleshooting

### Lỗi: "running scripts is disabled on this system" (PowerShell)
**Nguyên nhân**: PowerShell execution policy chặn chạy npm scripts
**Giải pháp**: 
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Sau đó thử lại `npm --version`

### Thiết lập Environment Variables (API Keys)
**Tùy chọn - chỉ cần nếu sử dụng Gemini AI features**:
1. Copy file `.env.example` thành `.env.local`:
   ```bash
   Copy-Item .env.example .env.local
   ```
2. Mở `.env.local` và thay `your_gemini_api_key_here` bằng API key thật
3. Lấy API key từ: https://aistudio.google.com/app/apikey

**Lưu ý**: Website vẫn chạy bình thường mà không cần API key. API key chỉ cần cho AI features.

### Lỗi: "npm: command not found"
**Nguyên nhân**: PATH chưa cập nhật
**Giải pháp**: Restart terminal hoặc thêm PATH thủ công (xem Bước 3)

### Lỗi: "Cannot find module 'react'"
**Nguyên nhân**: Chưa chạy `npm install`
**Giải pháp**: 
```bash
npm install
```

### Lỗi: "Port 5173 is already in use"
**Nguyên nhân**: Đã có process chạy ở port này
**Giải pháp**:
```bash
# Kill process cũ
npx kill-port 5173

# Hoặc dùng port khác
npm run dev -- --port 3000
```

### Website load nhưng không có CSS
**Nguyên nhân**: Tailwind CSS chưa load
**Kiểm tra**: 
- Xem Console có lỗi
- Kiểm tra internet connection (Tailwind từ CDN)

### Language Switcher không hiện
**Nguyên nhân**: Component chưa import đúng
**Kiểm tra**: 
- Console có lỗi về LanguageSwitcher không?
- File LanguageSwitcher.tsx có tồn tại?

---

## 📁 Cấu trúc Project

Sau khi `npm install`, bạn sẽ có:

```
golfviet-premium/
├── node_modules/          # Dependencies (được tạo sau npm install)
├── src/
│   ├── components/
│   │   └── LanguageSwitcher.tsx
│   ├── contexts/
│   │   └── LanguageContext.tsx
│   ├── layouts/
│   │   └── Layout.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   ├── CourseList.tsx
│   │   ├── CourseDetail.tsx
│   │   ├── Checkout.tsx
│   │   └── Confirmation.tsx
│   ├── translations.ts
│   ├── types.ts
│   ├── constants.tsx
│   ├── App.tsx
│   └── index.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── TESTING_GUIDE.md
```

---

## 🚀 Commands Cheat Sheet

```bash
# Cài dependencies
npm install

# Chạy dev server
npm run dev

# Build production (nếu cần)
npm run build

# Preview production build
npm run preview

# Kiểm tra version
node --version
npm --version

# Clear cache (nếu có lỗi lạ)
npm cache clean --force
rm -rf node_modules
npm install
```

---

## 📧 Nếu vẫn gặp vấn đề

Hãy cho tôi biết:
1. Output của `node --version` và `npm --version`
2. Lỗi cụ thể khi chạy `npm install`
3. Screenshot Console nếu website có lỗi
4. Hệ điều hành: Windows 10/11?

---

## ✅ Expected Final Result

Khi mọi thứ hoạt động:

1. **Terminal hiển thị**:
   ```
   VITE v6.2.0  ready in 500 ms
   ➜  Local:   http://localhost:5173/
   ```

2. **Browser tự động mở** hoặc bạn mở http://localhost:5173

3. **Website hiển thị**:
   - Trang chủ với hero image
   - Navigation menu
   - Language switcher (🇻🇳 Tiếng Việt)
   - Popular courses section
   - Footer

4. **Language switching hoạt động**:
   - Click language switcher
   - Chọn ngôn ngữ
   - Toàn bộ UI đổi ngôn ngữ instantly
   - Refresh page → ngôn ngữ vẫn giữ nguyên

5. **Console sạch sẽ** (F12 → Console tab):
   - Không có lỗi màu đỏ
   - Có thể có vài warning (OK)

---

**Good luck! 화이팅! Chúc may mắn! 🍀**
