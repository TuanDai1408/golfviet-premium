// 체크아웃 페이지 컴포넌트 - 결제 페이지
// Component trang thanh toán - trang thanh toán
// Checkout page component - payment page

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext'; // 언어 훅 / Hook ngôn ngữ / Language hook

// 체크아웃 페이지 컴포넌트 / Component trang thanh toán / Checkout page component
export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage(); // 번역 객체 가져오기 / Lấy đối tượng dịch / Get translation object

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* 페이지 헤더 / Header trang / Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t.checkout.title}</h1>
        <p className="mt-2 text-gray-500">{t.checkout.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* 예약 정보 사이드바 / Thanh bên thông tin đặt chỗ / Booking info sidebar */}
        <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
          {/* 코스 정보 카드 / Thẻ thông tin sân / Course info card */}
          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1200" className="h-48 w-full object-cover" alt="" />
            <div className="p-6">
              <h3 className="text-lg font-bold">Twin Doves Golf Club</h3>
              <p className="text-sm text-gray-500 mb-6">Binh Duong, {t.common.vietnam}</p>

              {/* 예약 세부정보 / Chi tiết đặt chỗ / Booking details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400">calendar_today</span>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{t.checkout.date}</p>
                    <p className="text-sm font-bold">Saturday, Nov 12, 2023</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400">schedule</span>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{t.checkout.time}</p>
                    <p className="text-sm font-bold">07:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400">group</span>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{t.checkout.golfers}</p>
                    <p className="text-sm font-bold">4 {t.dashboard.players}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 가격 분석 / Phân tích giá / Price breakdown */}
          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/5 p-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{t.checkout.priceBreakdown}</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>{t.checkout.greenFeeMultiple}</span>
                <span className="font-bold">2,400,000 VND</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t.checkout.caddieCartMultiple}</span>
                <span className="font-bold">1,200,000 VND</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t.checkout.serviceCharge}</span>
                <span className="font-bold">600,000 VND</span>
              </div>
              <hr className="border-dashed border-gray-100 my-4" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{t.checkout.totalAmount}</span>
                <span className="text-2xl font-black text-primary">4,200,000 VND</span>
              </div>
            </div>
          </div>
        </div>

        {/* 결제 폼 / Form thanh toán / Payment form */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-gray-100 dark:border-white/5 p-8">
            <h2 className="text-xl font-bold mb-6">{t.checkout.paymentMethod}</h2>

            {/* 결제 방법 선택 / Chọn phương thức thanh toán / Payment method selection */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-primary bg-primary/5">
                <span className="material-symbols-outlined text-3xl mb-1">credit_card</span>
                <span className="text-xs font-bold">{t.checkout.card}</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:bg-gray-50">
                <span className="material-symbols-outlined text-3xl mb-1">chat</span>
                <span className="text-xs font-bold">KakaoPay</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:bg-gray-50">
                <span className="material-symbols-outlined text-3xl mb-1">account_balance_wallet</span>
                <span className="text-xs font-bold">Toss</span>
              </button>
            </div>

            {/* 카드 정보 입력 폼 / Form nhập thông tin thẻ / Card information form */}
            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t.checkout.cardNumber}</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <span className="material-symbols-outlined text-lg">credit_card</span>
                  </span>
                  <input type="text" className="w-full h-14 bg-gray-50 border-none rounded-xl pl-12 font-bold tracking-widest" placeholder="0000 0000 0000 0000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t.checkout.expiryDate}</label>
                  <input type="text" className="w-full h-14 bg-gray-50 border-none rounded-xl px-4 font-bold" placeholder="MM / YY" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t.checkout.cvc}</label>
                  <input type="text" className="w-full h-14 bg-gray-50 border-none rounded-xl px-4 font-bold" placeholder="123" />
                </div>
              </div>

              {/* 결제 버튼 / Nút thanh toán / Payment button */}
              <button
                type="button"
                onClick={() => navigate('/confirmation')}
                className="w-full h-14 bg-primary hover:bg-primary-dark text-black font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">lock</span> {t.checkout.pay} 4,200,000 VND
              </button>
              <p className="text-center text-xs text-gray-400">{t.checkout.secureNote}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
