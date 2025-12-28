// 확인 페이지 컴포넌트 - 예약 성공 확인
// Component trang xác nhận - xác nhận đặt chỗ thành công
// Confirmation page component - booking success confirmation

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext'; // 언어 훅 / Hook ngôn ngữ / Language hook

// 확인 페이지 컴포넌트 / Component trang xác nhận / Confirmation page component
export const Confirmation: React.FC = () => {
  const { t } = useLanguage(); // 번역 객체 가져오기 / Lấy đối tượng dịch / Get translation object

  return (
    <div className="max-w-[800px] mx-auto py-20 px-4 text-center">
      {/* 성공 애니메이션 및 메시지 / Hoạt ảnh và thông báo thành công / Success animation and message */}
      <div className="flex flex-col items-center gap-8 animate-fade-in-up">
        {/* 체크 아이콘 / Biểu tượng hoàn thành / Check icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative size-24 bg-gradient-to-br from-primary to-green-400 rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/30">
            <span className="material-symbols-outlined text-6xl">check</span>
          </div>
        </div>

        {/* 제목 및 설명 / Tiêu đề và mô tả / Title and description */}
        <div>
          <h1 className="text-4xl font-black mb-4">{t.confirmation.title}</h1>
          <p className="text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
            {t.confirmation.description}
          </p>
        </div>

        {/* 예약 참조 코드 / Mã tham chiếu đặt chỗ / Booking reference code */}
        <div className="w-full bg-white dark:bg-surface-dark border border-dashed border-primary/40 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t.confirmation.bookingReference}</span>
            <p className="text-3xl font-mono font-black">#VN-GLF-2023-XJ</p>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold hover:underline">
            <span className="material-symbols-outlined text-lg">content_copy</span> {t.confirmation.copyCode}
          </button>
        </div>

        {/* 액션 버튼 / Các nút hành động / Action buttons */}
        <div className="flex flex-col md:flex-row gap-4 w-full pt-4">
          <button className="flex-1 h-14 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 text-sm font-bold flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">calendar_add_on</span> {t.confirmation.addToCalendar}
          </button>
          <Link to="/dashboard" className="flex-[1.5] h-14 rounded-xl bg-primary text-black hover:bg-primary-dark font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            {t.confirmation.returnToDashboard} <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
