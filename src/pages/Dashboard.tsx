// 대시보드 페이지 컴포넌트 - 사용자 예약 및 통계 대시보드
// Component trang bảng điều khiển - bảng điều khiển đặt chỗ và thống k của người dùng
// Dashboard page component - user bookings and statistics dashboard

import React, { useState } from 'react';
import { MOCK_USER, MOCK_BOOKINGS, MOCK_COURSES } from '../constants';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext'; // 언어 훅 / Hook ngôn ngữ / Language hook

// 통계 카드 컴포넌트 / Component thẻ thống kê / Stats card component
const StatsCard: React.FC<{ icon: string, label: string, value: string, sub: string, color: string }> = ({ icon, label, value, sub, color }) => (
  <div className="flex flex-col gap-1 rounded-xl p-5 bg-surface-light dark:bg-surface-dark border border-[#dce5e0] dark:border-[#2a3c32] shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 mb-2">
      <div className={`p-2 rounded-full ${color}`}>
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <p className="text-text-secondary dark:text-gray-400 text-sm font-medium">{label}</p>
    </div>
    <p className="text-text-main dark:text-white text-2xl font-bold">{value}</p>
    <p className="text-primary dark:text-primary text-xs font-medium">{sub}</p>
  </div>
);

// 대시보드 페이지 컴포넌트 / Component trang bảng điều khiển / Dashboard page component
export const Dashboard: React.FC = () => {
  const { t } = useLanguage(); // 번역 객체 가져오기 / Lấy đối tượng dịch / Get translation object
  const [view, setView] = useState<'Upcoming' | 'Past'>('Upcoming');

  // 다음 예약 정보 / Thông tin đặt chỗ tiếp theo / Next booking info
  const nextBooking = MOCK_BOOKINGS[0];
  const nextCourse = MOCK_COURSES.find(c => c.id === nextBooking.courseId);

  return (
    <div className="max-w-[1200px] mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
      {/* 헤더 / Header / Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-text-main dark:text-white">{t.dashboard.title}</h1>
          <p className="text-text-secondary dark:text-gray-400 text-base font-normal mt-2">{t.dashboard.description}</p>
        </div>

        {/* 뷰 전환 버튼 / Nút chuyển đổi chế độ xem / View toggle buttons */}
        <div className="flex h-12 items-center justify-center rounded-xl bg-[#e8edeb] dark:bg-[#25362c] p-1.5 w-full md:w-auto">
          <button
            onClick={() => setView('Upcoming')}
            className={`flex-1 md:flex-none cursor-pointer h-full min-w-[120px] items-center justify-center rounded-lg px-4 text-sm font-bold transition-all ${view === 'Upcoming' ? 'bg-white dark:bg-[#112118] shadow-sm text-text-main dark:text-white' : 'text-text-secondary dark:text-gray-400 hover:text-text-main'
              }`}
          >
            {t.dashboard.upcoming}
          </button>
          <button
            onClick={() => setView('Past')}
            className={`flex-1 md:flex-none cursor-pointer h-full min-w-[120px] items-center justify-center rounded-lg px-4 text-sm font-bold transition-all ${view === 'Past' ? 'bg-white dark:bg-[#112118] shadow-sm text-text-main dark:text-white' : 'text-text-secondary dark:text-gray-400 hover:text-text-main'
              }`}
          >
            {t.dashboard.pastHistory}
          </button>
        </div>
      </div>

      {/* 통계 카드 / Thẻ thống kê / Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon="sports_golf" label={t.dashboard.totalGames} value="24" sub={`+2 ${t.dashboard.thisMonth}`} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30" />
        <StatsCard icon="calendar_month" label={t.dashboard.upcomingGames} value="2" sub={`${t.dashboard.nextDate}: Oct 24`} color="bg-green-100 text-green-600 dark:bg-green-900/30" />
        <StatsCard icon="loyalty" label={t.dashboard.points} value={MOCK_USER.points.toLocaleString()} sub={`+150 ${t.dashboard.pointsPending}`} color="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30" />

        {/* 멤버십 카드 / Thẻ thành viên / Membership card */}
        <div className="flex flex-col gap-1 rounded-xl p-5 bg-gradient-to-br from-[#112118] to-[#1e3a2b] text-white border border-[#2a3c32] shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-300 text-sm font-medium">{t.dashboard.membership}</p>
              <p className="text-xl font-bold mt-1">{MOCK_USER.tier}</p>
            </div>
            <span className="material-symbols-outlined text-yellow-400">verified</span>
          </div>
          <div className="mt-auto pt-2">
            <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <p className="text-xs text-gray-400">70% {t.dashboard.toTier} Platinum</p>
          </div>
        </div>
      </div>

      {/* 메인 그리드 / Lưới chính / Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 예약 목록 / Danh sách đặt chỗ / Bookings list */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">flag</span>
            {t.dashboard.nextTeeTime}
          </h2>

          {/* 다음 티타임 카드 / Thẻ tee time tiếp theo / Next tee time card */}
          {nextCourse && (
            <div className="group relative overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark border border-[#dce5e0] dark:border-[#2a3c32] shadow-lg transition-all hover:shadow-xl">
              <div className="relative h-48 md:h-64 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-text-main shadow-sm">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    {t.dashboard.confirmed}
                  </span>
                </div>
                <div className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${nextCourse.image})` }}></div>
                <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{nextCourse.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm md:text-base font-medium">
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary">calendar_month</span> {nextBooking.date}</span>
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary">schedule</span> {nextBooking.time}</span>
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary">location_on</span> {nextCourse.city}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 md:p-6">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => <img key={i} src={`https://picsum.photos/seed/${i + 10}/100/100`} className="w-10 h-10 border-2 border-white dark:border-gray-800 rounded-full" alt="" />)}
                    <div className="w-10 h-10 border-2 border-white dark:border-gray-800 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs font-bold">+1</div>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold">4 {t.dashboard.players}</p>
                    <p className="text-text-secondary">Flight 2A</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-red-600 dark:text-red-400 font-bold text-sm">{t.dashboard.cancel}</button>
                  <Link to={`/booking/${nextBooking.id}`} className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-[#111814] dark:bg-white text-white dark:text-[#111814] font-bold text-sm text-center">{t.dashboard.viewTicket}</Link>
                </div>
              </div>
            </div>
          )}

          {/* 예정된 예약 목록 / Danh sách đặt chỗ sắp tới / Upcoming reservations list */}
          <h2 className="text-lg font-bold mt-4">{t.dashboard.upcomingReservations}</h2>
          {MOCK_BOOKINGS.slice(1).map((booking) => {
            const course = MOCK_COURSES.find(c => c.id === booking.courseId);
            return (
              <div key={booking.id} className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-[#dce5e0] dark:border-[#2a3c32] hover:border-primary transition-all">
                <img src={course?.image} className="sm:w-32 h-32 sm:h-auto shrink-0 rounded-lg object-cover" alt="" />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{course?.name}</h3>
                      <p className="text-text-secondary text-sm">{course?.city}, {t.common.vietnam}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold uppercase">{booking.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 my-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-primary text-lg">calendar_month</span>
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                      <span>{booking.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100 dark:border-[#2a3c32]">
                    <button className="text-sm font-medium text-text-secondary hover:text-text-main">{t.common.details}</button>
                    <button className="text-sm font-bold text-primary">{t.common.reschedule}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 사이드바 / Thanh bên / Sidebar */}
        <div className="flex flex-col gap-6">
          {/* 빠른 작업 / Thao tác nhanh / Quick actions */}
          <div className="rounded-xl bg-white dark:bg-surface-dark p-6 border border-[#dce5e0] dark:border-[#2a3c32] shadow-sm">
            <h3 className="font-bold text-lg mb-4">{t.dashboard.quickActions}</h3>
            <div className="flex flex-col gap-3">
              <Link to="/courses" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#25362c] group">
                <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </div>
                <div>
                  <p className="font-bold text-sm">{t.dashboard.bookNewTeeTime}</p>
                  <p className="text-xs text-text-secondary">{t.dashboard.exploreCourses}</p>
                </div>
              </Link>
              <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#25362c] group">
                <div className="flex items-center justify-center size-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">history</span>
                </div>
                <div>
                  <p className="font-bold text-sm">{t.dashboard.viewPastReceipts}</p>
                  <p className="text-xs text-text-secondary">{t.dashboard.downloadInvoices}</p>
                </div>
              </button>
            </div>
          </div>

          {/* 날씨 위젯 / Widget thời tiết / Weather widget */}
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md relative p-6">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <span className="material-symbols-outlined text-8xl">wb_sunny</span>
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-blue-100">{t.dashboard.forecast} {nextBooking.date}</p>
              <h3 className="font-bold text-xl mt-1">{nextCourse?.city}</h3>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-5xl font-bold tracking-tighter">28°</span>
                <div className="text-sm text-blue-100">
                  <p>{t.dashboard.sunny}</p>
                  <p>{t.dashboard.humidity}: 65%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
