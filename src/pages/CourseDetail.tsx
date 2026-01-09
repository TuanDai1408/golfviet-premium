// 코스 상세 페이지 컴포넌트 - 골프 코스 상세 정보 및 예약
// Component trang chi tiết sân - thông tin chi tiết sân golf và đặt chỗ
// Course detail page component - golf course details and booking

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COURSES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext'; // 언어 훅 / Hook ngôn ngữ / Language hook

// 코스 상세 페이지 컴포넌트 / Component trang chi tiết sân / Course detail page component
export const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage(); // 번역 객체 가져오기 / Lấy đối tượng dịch / Get translation object

  // 코스 데이터 찾기 / Tìm dữ liệu sân / Find coursedata
  const course = MOCK_COURSES.find(c => c.id === id);

  // 날짜 및 시간 슬롯 상태 / Trạng thái ngày và khung giờ / Date and time slot state
  const [selectedDate, setSelectedDate] = useState(24);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // 코스 없음 처리 / Xử lý không tìm thấy sân / Handle course not found
  if (!course) return <div className="p-20 text-center">{t.courseDetail.courseNotFound}</div>;

  // 사용 가능한 시간 슬롯 / Khung giờ có sẵn / Available time slots
  const slots = ['06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 히어로 갤러리 / Thư viện ảnh hero / Hero gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[300px] md:h-[480px] mb-8 rounded-2xl overflow-hidden shadow-lg">
        <div className="md:col-span-2 md:row-span-2 relative">
          <img src={course.image} className="absolute inset-0 w-full h-full object-cover" alt="" />
        </div>
        <div className="hidden md:block relative h-full">
          <img src="/images/twin-doves.png" className="absolute inset-0 w-full h-full object-cover" alt="" />
        </div>
        <div className="hidden md:block relative h-full">
          <img src="/images/da-nang.png" className="absolute inset-0 w-full h-full object-cover" alt="" />
        </div>
        <div className="hidden md:block relative h-full">
          <img src="/images/tan-son-nhat.png" className="absolute inset-0 w-full h-full object-cover" alt="" />
        </div>
        <div className="hidden md:block relative h-full">
          <img src="/images/hoiana.png" className="absolute inset-0 w-full h-full object-cover" alt="" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* 코스 정보 섹션 / Phần thông tin sân / Course info section */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* 코스 헤더 / Header sân / Course header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary/20 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{t.courseDetail.premiumPartner}</span>
              <span className="flex items-center gap-1 text-xs text-gray-400"><span className="material-symbols-outlined text-sm">verified</span> {t.courseDetail.verified}</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">{course.name}</h1>
            <p className="text-xl text-gray-400 mb-4">{course.subName || t.courseDetail.internationalStandard}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <span>{course.location}</span>
              <button className="text-primary font-bold ml-2">{t.courseDetail.showOnMap}</button>
            </div>
          </div>

          {/* 코스 통계 / Thống kê sân / Course statistics */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: t.courseList.holes, value: course.holes, icon: 'golf_course' },
              { label: 'Par', value: course.par, icon: 'flag' },
              { label: 'Yards', value: course.yards, icon: 'straighten' },
              { label: 'Type', value: course.type, icon: 'landscape' }
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-primary mb-1">{stat.icon}</span>
                <span className="text-lg font-bold">{stat.value}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* 코스 소개 / Giới thiệu sân / About the course */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.courseDetail.aboutCourse}</h3>
            <p className="text-gray-500 leading-relaxed">
              {t.courseDetail.aboutDescription}
            </p>
          </div>

          {/* 시설 및 편의시설 / Tiện nghi và dịch vụ / Facilities & Amenities */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.courseDetail.facilities}</h3>
            <div className="flex flex-wrap gap-3">
              {['Clubhouse Restaurant', 'Sauna & Spa', 'Valet Parking', 'Free Wi-Fi', 'Pro Shop', 'Caddie Service'].map(f => (
                <div key={f} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-100 rounded-lg text-sm font-medium shadow-sm">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span> {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 예약 위젯 / Widget đặt chỗ / Booking widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">{t.courseDetail.bookTeeTime}</h3>
              <div className="flex items-center gap-1 text-primary text-[10px] font-bold bg-primary/10 px-2 py-1 rounded uppercase">
                <span className="material-symbols-outlined text-sm">bolt</span> {t.courseDetail.instantConfirmation}
              </div>
            </div>

            {/* 날짜 선택 / Chọn ngày / Date selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold">{t.courseDetail.selectDate}</span>
                <span className="text-xs text-gray-400">October 2023</span>
              </div>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                {[23, 24, 25, 26, 27].map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`flex flex-col items-center min-w-[60px] p-3 rounded-xl border-2 transition-all ${selectedDate === d ? 'border-primary bg-primary text-black' : 'border-gray-50 bg-gray-50 dark:bg-gray-800 text-gray-400'
                      }`}
                  >
                    <span className="text-[10px] font-bold">MON</span>
                    <span className="text-lg font-black">{d}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 시간 슬롯 선택 / Chọn khung giờ / Slot selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold">{t.courseDetail.availableSlots}</span>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                  <span className="size-2 rounded-full bg-primary"></span> {t.common.am.toUpperCase()}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {slots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${selectedSlot === slot ? 'bg-primary border-primary text-black shadow-lg scale-105' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-primary'
                      }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* 가격 요약 / Tóm tắt giá / Price summary */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-8">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>{t.courseDetail.greenFee}</span>
                <span className="font-bold text-text-main dark:text-white">{(course.price / 1000).toLocaleString()}k VND</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mb-4">
                <span>{t.courseDetail.caddieCart}</span>
                <span className="font-bold text-text-main dark:text-white">800k VND</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold">{t.courseDetail.totalAmount}</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-primary">{((course.price + 800000) / 1000).toLocaleString()}k <span className="text-xs font-normal">VND</span></span>
                </div>
              </div>
            </div>

            {/* 예약 버튼 / Nút đặt chỗ / Book button */}
            <button
              disabled={!selectedSlot}
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-black font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {t.courseDetail.bookNow} <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
