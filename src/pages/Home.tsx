// 홈 페이지 컴포넌트 - 메인 랜딩 페이지
// Component trang chủ - trang landing chính
// Home page component - main landing page

import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await apiService.getCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses for home page:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity !== 'All') {
      params.append('region', selectedCity);
    }
    if (selectedDate) {
      params.append('date', selectedDate);
    }
    navigate(`/courses?${params.toString()}`);
  };

  const displayedCourses = useMemo(() => {
    let filteredCourses = [...courses];

    // Sort by created_at descending (latest first)
    filteredCourses.sort((a, b) => {
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    });

    if (selectedCity !== 'All') {
      filteredCourses = filteredCourses.filter(course =>
        (course.region && course.region === selectedCity) ||
        (course.address && course.address.includes(selectedCity))
      );
    }

    return filteredCourses.slice(0, 6);
  }, [selectedCity, courses]);


  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="Trang chủ - Đặt sân Golf trực tuyến uy tín"
        description="GolfViet Premium - Hệ thống đặt sân golf trực tuyến hàng đầu Việt Nam. Đặt chỗ nhanh chóng tại Hà Nội, Đà Nẵng, TP.HCM với giá ưu đãi nhất."
        keywords="đặt sân golf, golf việt nam, sân golf hà nội, sân golf hồ chí minh, golf premium"
      />
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
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg text-shadow-lg">
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
          {loading ? (
            // Skeleton Loading
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col animate-pulse">
                <div className="h-64 rounded-2xl bg-gray-200 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="flex justify-between items-center mt-auto">
                  <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                  <div className="size-10 rounded-full bg-gray-200"></div>
                </div>
              </div>
            ))
          ) : (
            displayedCourses.map(course => (
              <Link to={`/course/${course.id}`} key={course.id} className="group flex flex-col">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <img
                    src={(course.images && course.images.length > 0) ? course.images[0] : (course.image || 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800')}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={course.name}
                  />
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
                    <span className="text-xs font-bold">{course.rating || '5.0'}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{course.name}</h3>
                <p className="text-text-secondary text-sm flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-sm">location_on</span> {course.address || course.location}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{t.home.startingFrom}</p>
                    <p className="text-xl font-bold">
                      {(() => {
                        const isWeekend = [0, 6].includes(new Date().getDay());
                        const price = isWeekend
                          ? (course.price_weekend || course.price || 3500000)
                          : (course.price_weekday || course.price || 2500000);
                        return (price / 1000).toLocaleString();
                      })()}k <span className="text-sm font-normal text-gray-400">VND</span>
                    </p>
                  </div>
                  <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))
          )}
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
    </div>
  );
};
