// 메인 앱 컴포넌트 - 라우팅 및 레이아웃 설정
// Component App chính - cấu hình routing và layout
// Main App component - routing and layout configuration

import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext'; // 언어 컨텍스트 / Context ngôn ngữ / Language context
import { Layout } from './layouts/Layout';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { CourseList } from './pages/CourseList';
import { CourseDetail } from './pages/CourseDetail';
import { Checkout } from './pages/Checkout';
import { Confirmation } from './pages/Confirmation';
import { ZaloContact } from './pages/ZaloContact';

// 앱 컴포넌트 정의 / Định nghĩa component App / App component definition
const App: React.FC = () => {
  return (
    // 언어 프로바이더로 전체 앱 래핑 / Bao bọc toàn bộ app với Provider ngôn ngữ / Wrap entire app with Language Provider
    <LanguageProvider>
      {/* Hash 라우터 사용 (배포 시 URL 이슈 없음) / Sử dụng Hash Router (không có vấn đề URL khi deploy) / Use Hash Router (no URL issues on deployment) */}
      <HashRouter>
        {/* 공통 레이아웃 (헤더, 푸터 포함) / Layout chung (bao gồm header, footer) / Common layout (includes header, footer) */}
        <Layout>
          {/* 라우트 정의 / Định nghĩa các route / Route definitions */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* 홈페이지 / Trang chủ / Home page */}
            <Route path="/dashboard" element={<Dashboard />} /> {/* 대시보드 / Bảng điều khiển / Dashboard */}
            <Route path="/courses" element={<CourseList />} /> {/* 코스 목록 / Danh sách sân / Course list */}
            <Route path="/course/:id" element={<CourseDetail />} /> {/* 코스 상세 / Chi tiết sân / Course detail */}
            <Route path="/checkout" element={<Checkout />} /> {/* 체크아웃 / Thanh toán / Checkout */}
            <Route path="/confirmation" element={<Confirmation />} /> {/* 확인 페이지 / Trang xác nhận / Confirmation */}
            <Route path="/zalo-contact" element={<ZaloContact />} /> {/* Zalo Contact Page */}
            <Route path="*" element={<Navigate to="/" replace />} /> {/* 잘못된 경로는 홈으로 리디렉션 / Chuyển hướng về trang chủ nếu đường dẫn sai / Redirect to home for invalid paths */}
          </Routes>
        </Layout>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
