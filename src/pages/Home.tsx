// 홈 페이지 컴포넌트 - 메인 랜딩 페이지
// Component trang chủ - trang landing chính
// Home page component - main landing page

import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_COURSES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext'; // 언어 훅 / Hook ngôn ngữ / Language hook

// 홈 페이지 컴포넌트 / Component trang chủ / Home page component
export const Home: React.FC = () => {
  const { t } = useLanguage(); // 번역 객체 가져오기 / Lấy đối tượng dịch / Get translation object
  const navigate = useNavigate();

  // 선택된 지역 상태 / Trạng thái khu vực được chọn / Selected location state
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedDate, setSelectedDate] = useState<string>('2023-10-25');

  // 검색 핸들러 / Handler tìm kiếm / Search handler
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity !== 'All') {
      params.append('city', selectedCity);
    }
    if (selectedDate) {
      params.append('date', selectedDate);
    }
    navigate(`/courses${params.toString() ? '?' + params.toString() : ''}`);
  };

  // 필터링된 코스 목록 (상위 6개) / Danh sách sân đã lọc (top 6) / Filtered course list (top 6)
  const displayedCourses = useMemo(() => {
    let filteredCourses = MOCK_COURSES;

    if (selectedCity !== 'All') {
      filteredCourses = MOCK_COURSES.filter(course => course.city === selectedCity);
    }

    return filteredCourses.slice(0, 6);
  }, [selectedCity]);

  return (
    <div className="flex flex-col w-full">
      {/* 히어로 섹션 / Phần hero / Hero section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Golf Course"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <div className="animate-fade-in-up">
            {/* 실시간 예약 배지 / Badge đặt chỗ thời gian thực / Real-time booking badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white mb-4">
              <span className="size-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wide">{t.home.realtimeBooking}</span>
            </div>

            {/* 메인 타이틀 / Tiêu đề chính / Main title */}
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
              {t.home.heroTitle1}<br />
              <span className="text-primary">{t.home.heroTitle2}</span>
            </h1>

            {/* 설명 텍스트 / Văn bản mô tả / Description text */}
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 drop-shadow-md">
              {t.home.heroDescription}
            </p>

            {/* 검색 폼 / Form tìm kiếm / Search form */}
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 flex flex-col md:flex-row gap-4 items-end">
              {/* 위치 선택 / Chọn địa điểm / Location selection */}
              <div className="flex-1 w-full text-left">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.home.location}</label>
                <div className="relative flex items-center h-14 bg-gray-50 rounded-xl px-4 border border-transparent focus-within:border-primary">
                  <span className="material-symbols-outlined text-gray-400 mr-2">location_on</span>
                  <select
                    className="bg-transparent border-none focus:ring-0 w-full font-bold text-lg"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="All">{t.home.allLocations}</option>
                    <option value="Hanoi">{t.cities.hanoi}</option>
                    <option value="Da Nang">{t.cities.daNang}</option>
                    <option value="Ho Chi Minh City">{t.cities.hoChiMinh}</option>
                  </select>
                </div>
              </div>

              {/* 날짜 선택 / Chọn ngày / Date selection */}
              <div className="flex-1 w-full text-left">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.home.date}</label>
                <div className="relative flex items-center h-14 bg-gray-50 rounded-xl px-4 border border-transparent focus-within:border-primary">
                  <span className="material-symbols-outlined text-gray-400 mr-2">calendar_month</span>
                  <input
                    type="date"
                    className="bg-transparent border-none focus:ring-0 w-full font-bold text-lg"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>

              {/* 검색 버튼 / Nút tìm kiếm / Search button */}
              <button
                onClick={handleSearch}
                className="w-full md:w-auto h-14 bg-black text-primary px-8 rounded-xl flex items-center justify-center gap-2 font-bold text-lg hover:bg-gray-900 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined">search</span>
                {t.home.search}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 인기 코스 섹션 / Phần sân phổ biến / Popular courses section */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {t.home.popularCourses} <span className="material-symbols-outlined text-red-500">local_fire_department</span>
            </h2>
            <p className="text-gray-500 mt-2">
              {selectedCity === 'All'
                ? t.home.popularCoursesDesc
                : `${t.home.popularCoursesDesc} - ${selectedCity === 'Hanoi' ? t.cities.hanoi : selectedCity === 'Da Nang' ? t.cities.daNang : t.cities.hoChiMinh}`
              }
            </p>
          </div>
          <Link to="/courses" className="text-primary font-bold hover:underline flex items-center gap-1">
            {t.home.viewAll} <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* 코스 그리드 / Lưới sân / Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCourses.map(course => (
            <Link to={`/course/${course.id}`} key={course.id} className="group flex flex-col">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={course.name} />
                {course.isRecommended && (
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                    <span className="text-xs font-bold text-primary">{t.home.recommended.toUpperCase()}</span>
                  </div>
                )}
                {course.deal && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                    {course.deal}
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
                  <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                  <span className="text-xs font-bold">{course.rating}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{course.name}</h3>
              <p className="text-text-secondary text-sm flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">location_on</span> {course.location}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{t.home.startingFrom}</p>
                  <p className="text-xl font-bold">{(course.price / 1000).toLocaleString()}k <span className="text-sm font-normal text-gray-400">VND</span></p>
                </div>
                <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 신뢰/기능 섹션 / Phần tính năng/tin cậy / Trust/Features section */}
      <section className="bg-gray-100 dark:bg-surface-dark py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="size-16 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-lg">
              <span className="material-symbols-outlined text-4xl">bolt</span>
            </div>
            <h3 className="text-xl font-bold">{t.home.trustTitle1}</h3>
            <p className="text-gray-500 text-sm">{t.home.trustDesc1}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="size-16 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-lg">
              <span className="material-symbols-outlined text-4xl">translate</span>
            </div>
            <h3 className="text-xl font-bold">{t.home.trustTitle2}</h3>
            <p className="text-gray-500 text-sm">{t.home.trustDesc2}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="size-16 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-lg">
              <span className="material-symbols-outlined text-4xl">verified_user</span>
            </div>
            <h3 className="text-xl font-bold">{t.home.trustTitle3}</h3>
            <p className="text-gray-500 text-sm">{t.home.trustDesc3}</p>
          </div>
        </div>
      </section>

      {/* Contact Widget */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 animate-fade-in-up">
        {/* Zalo */}
        <Link
          to="/zalo-contact"
          className="size-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform group relative overflow-hidden ring-1 ring-gray-100"
        >
          {/* Zalo Icon từ link trực tiếp */}
          <img
            src="https://page.widget.zalo.me/static/images/2.0/Logo.svg"
            alt="Zalo Icon"
            className="w-10 h-10 object-contain"
          />

          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat Zalo
          </div>
        </Link>


        {/* KakaoTalk */}
        <a
          href="http://qr.kakao.com/talk/3J9sgdynZQ7vgHeZRYuUPysxqxU-"
          target="_blank"
          rel="noreferrer"
          className="size-14 rounded-full bg-[#FEE500] text-[#3c1e1e] shadow-lg flex flex-col items-center justify-center hover:scale-110 transition-transform group relative"
        >
          <span className="font-black text-[10px] absolute bottom-3">Kakao</span>
          <span className="material-symbols-outlined text-xl mb-1">forum</span>
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            KakaoTalk
          </div>
        </a>

        {/* Phone */}
        <a
          href="tel:+84931368921"
          className="size-14 rounded-full bg-green-500 text-white shadow-lg flex flex-col items-center justify-center hover:scale-110 transition-transform group relative"
        >
          <span className="font-black text-[10px] absolute bottom-3">Call</span>
          <span className="material-symbols-outlined text-xl mb-1">call</span>
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Hotline
          </div>
        </a>
      </div>

    </div>
  );
};
