// 레이아웃 컴포넌트 - 네비게이션 바와 푸터를 포함하는 공통 레이아웃
// Component Layout - layout chung bao gồm thanh điều hướng và footer
// Layout Component - common layout including navigation bar and footer

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MOCK_USER } from '../constants';
import { useLanguage } from '../contexts/LanguageContext'; // 언어 훅 / Hook ngôn ngữ / Language hook
import { LanguageSwitcher } from '../components/LanguageSwitcher'; // 언어 전환기 / Bộ chuyển ngôn ngữ / Language switcher

// 레이아웃 Props 인터페이스 / Interface Props của Layout / Layout Props interface
interface LayoutProps {
  children: React.ReactNode;
}

// 네비게이션 바 컴포넌트 / Component thanh điều hướng / Navigation bar component
const Navbar: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage(); // 번역 객체 가져오기 / Lấy đối tượng dịch / Get translation object
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  // 네비게이션 메뉴 항목 / Các mục menu điều hướng / Navigation menu items
  const navItems = [
    { label: t.nav.dashboard, path: '/dashboard' },
    { label: t.nav.bookTeeTime, path: '/courses' },
    { label: t.nav.membership, path: '#' },
    { label: t.nav.support, path: '#' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-[#e5ece9] dark:border-[#2a3c32]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 / Logo / Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="size-8 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">sports_golf</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-text-main dark:text-white">Golf<span className="text-primary">Viet</span></h1>
          </Link>

          {/* 데스크톱 네비게이션 메뉴 / Menu điều hướng desktop / Desktop navigation menu */}
          <nav className="hidden md:flex items-center gap-9">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.path ? 'text-primary' : 'text-text-secondary dark:text-gray-400'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 우측 액션 영역 / Khu vực hành động bên phải / Right action area */}
          <div className="flex items-center gap-4">
            {/* 언어 전환기 / Bộ chuyển đổi ngôn ngữ / Language switcher */}
            <LanguageSwitcher />

            {/* 새 예약 버튼 / Nút đặt chỗ mới / New booking button */}
            <Link to="/courses" className="hidden sm:flex items-center justify-center rounded-full h-10 px-6 bg-primary hover:bg-primary-dark transition-colors text-text-main text-sm font-bold">
              {t.nav.newBooking}
            </Link>

            {/* 사용자 프로필 / Hồ sơ người dùng / User profile */}
            <div className="relative">
              <div 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a3c32] transition-colors"
              >
                <img src={MOCK_USER.avatar} className="size-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm" alt="User" />
                <span className="hidden md:block text-sm font-medium pr-2 dark:text-white">{t.auth.guest}</span>
              </div>

              {/* User Menu Popup */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a261f] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden z-50">
                  <div className="p-2 space-y-1">
                    <Link 
                      to="/login" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-xl transition-colors font-medium"
                    >
                      <span className="material-symbols-outlined text-green-500">login</span>
                      {t.auth.login}
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-xl transition-colors font-medium"
                    >
                      <span className="material-symbols-outlined text-green-500">person_add</span>
                      {t.auth.register}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Close menu when clicking outside (Simple implementation) */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

// 메인 레이아웃 컴포넌트 / Component Layout chính / Main Layout component
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useLanguage(); // 번역 객체 가져오기 / Lấy đối tượng dịch / Get translation object

  return (
    <div className="min-h-screen flex flex-col">
      {/* 네비게이션 바 / Thanh điều hướng / Navigation bar */}
      <Navbar />

      {/* 메인 콘텐츠 영역 / Khu vực nội dung chính / Main content area */}
      <main className="flex-1">
        {children}
      </main>

      {/* 푸터 / Footer / Footer */}
      <footer className="bg-background-dark text-white/60 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 푸터 그리드 / Grid footer / Footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* 회사 정보 / Thông tin công ty / Company info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 text-white">
                <span className="material-symbols-outlined text-primary">sports_golf</span>
                <span className="text-lg font-bold">GolfViet</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                {t.footer.description}
              </p>
            </div>

            {/* 회사 링크 / Liên kết công ty / Company links */}
            <div>
              <h4 className="text-white font-bold mb-4">{t.footer.company}</h4>
              <ul className="space-y-2 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">{t.footer.aboutUs}</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">{t.footer.careers}</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">{t.footer.press}</a></li>
              </ul>
            </div>

            {/* 법률 링크 / Liên kết pháp lý / Legal links */}
            <div>
              <h4 className="text-white font-bold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">{t.footer.terms}</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">{t.footer.privacy}</a></li>
              </ul>
            </div>
          </div>

          {/* 하단 저작권 / Bản quyền dưới cùng / Bottom copyright */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">{t.footer.rights}</p>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-sm">public</span>
              <span className="material-symbols-outlined text-sm">mail</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
