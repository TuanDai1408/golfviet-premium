// 체크아웃 페이지 컴포넌트 - 결제 페이지
// Component trang thanh toán - trang thanh toán
// Checkout page component - payment page

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext'; // 언어 훅 / Hook ngôn ngữ / Language hook
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

// 체크아웃 페이지 컴포넌트 / Component trang thanh toán / Checkout page component
export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage(); // 번역 객체 가져오기 / Lấy đối tượng dịch / Get translation object

  const { booking, course, details } = location.state || {};
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.full_name || user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    additionalRequest: ''
  });

  useEffect(() => {
    if (!booking || !course) {
      navigate('/'); // Redirect home if no booking data
    }
  }, [booking, course, navigate]);

  if (!booking || !course) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      // Simulate confirmation delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Confirm booking in backend
      await apiService.confirmBooking(booking.id);

      navigate('/confirmation', {
        state: {
          bookingId: booking.id,
          courseName: course.name,
          date: details.date,
          time: details.time
        }
      });
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            <img src={course.images?.[0] || course.image} className="h-48 w-full object-cover" alt="" />
            <div className="p-6">
              <h3 className="text-lg font-bold">{course.name}</h3>
              <p className="text-sm text-gray-500 mb-6">{course.address}, {t.common.vietnam}</p>

              {/* 예약 세부정보 / Chi tiết đặt chỗ / Booking details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400">calendar_today</span>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{t.checkout.date}</p>
                    <p className="text-sm font-bold">{new Date(details.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400">schedule</span>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{t.checkout.time}</p>
                    <p className="text-sm font-bold">{details.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400">group</span>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{t.checkout.golfers}</p>
                    <p className="text-sm font-bold">{details.players} {t.dashboard.players}</p>
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
                <span className="font-bold">{(details.price * details.players).toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t.checkout.caddieCartMultiple}</span>
                <span className="font-bold">{(300000 * details.players).toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t.checkout.serviceCharge}</span>
                <span className="font-bold">{(150000 * details.players).toLocaleString()} VND</span>
              </div>
              <hr className="border-dashed border-gray-100 my-4" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{t.checkout.totalAmount}</span>
                <span className="text-2xl font-black text-primary">{booking.total_price.toLocaleString()} VND</span>
              </div>
            </div>
          </div>
        </div>

        {/* 사용자 정보 및 확인 폼 / Form thông tin người dùng và xác nhận / User info and confirmation form */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-gray-100 dark:border-white/5 p-8">
            <h2 className="text-xl font-bold mb-6">{t.checkout.userInfo}</h2>

            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t.checkout.fullName}</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <span className="material-symbols-outlined text-lg">person</span>
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full h-14 bg-gray-50 border-none rounded-xl pl-12 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t.checkout.phone}</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <span className="material-symbols-outlined text-lg">call</span>
                    </span>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full h-14 bg-gray-50 border-none rounded-xl pl-12 font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t.checkout.email}</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <span className="material-symbols-outlined text-lg">mail</span>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-14 bg-gray-50 border-none rounded-xl pl-12 font-bold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t.checkout.additionalRequest}</label>
                <textarea
                  name="additionalRequest"
                  value={formData.additionalRequest}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={t.checkout.additionalRequestPlaceholder}
                  className="w-full bg-gray-50 border-none rounded-xl p-4 font-medium"
                />
              </div>

              {/* xác nhận đặt chỗ 버튼 / Nút xác nhận đặt chỗ / confirm booking button */}
              <button
                type="button"
                onClick={handlePayment}
                disabled={loading}
                className="w-full h-14 bg-primary hover:bg-primary-dark text-black font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined">check_circle</span>
                )}
                {t.checkout.confirmBooking}
              </button>
              <p className="text-center text-xs text-gray-400">{t.checkout.secureNote}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
