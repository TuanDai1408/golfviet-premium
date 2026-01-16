// 코스 목록 페이지 컴포넌트 - 사용 가능한 골프 코스 검색 및 필터
// Component trang danh sách sân - tìm kiếm và lọc các sân golf có sẵn
// Course list page component - search and filter available golf courses

import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MOCK_COURSES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext'; // 언어 훅 / Hook ngôn ngữ / Language hook

// 코스 목록 페이지 컴포넌트 / Component trang danh sách sân / Course list page component
export const CourseList: React.FC = () => {
  const { t } = useLanguage(); // 번역 객체 가져오기 / Lấy đối tượng dịch / Get translation object
  const [searchParams] = useSearchParams();

  // URL 파라미터에서 초기 필터 값 가져오기 / Lấy giá trị filter ban đầu từ URL params / Get initial filter values from URL params
  const cityFromUrl = searchParams.get('city');
  const initialRegions = cityFromUrl ? [cityFromUrl] : ['Hanoi', 'Da Nang', 'Ho Chi Minh City'];

  // 선택된 지역 상태 관리 / Quản lý trạng thái khu vực được chọn / Manage selected regions state
  const [selectedRegions, setSelectedRegions] = useState<string[]>(initialRegions);

  // 지역 필터 토글 핸들러 / Handler bật/tắt bộ lọc khu vực / Region filter toggle handler
  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => {
      if (prev.includes(region)) {
        return prev.filter(r => r !== region);
      } else {
        return [...prev, region];
      }
    });
  };

  // 필터링된 코스 목록 / Danh sách sân đã lọc / Filtered course list
  const filteredCourses = useMemo(() => {
    if (selectedRegions.length === 0) {
      return MOCK_COURSES;
    }
    return MOCK_COURSES.filter(course => selectedRegions.includes(course.city));
  }, [selectedRegions]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
      {/* 필터 사이드바 / Thanh bên bộ lọc / Filter sidebar */}
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
        {/* 지도 보기 버튼 / Nút xem bản đồ / Map view button */}
        <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-gray-800 flex items-center justify-center group cursor-pointer">
          <img src="https://images.unsplash.com/photo-1596708051772-20c22883652c?auto=format&fit=crop&q=80&w=400" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-all" alt="" />
          <button className="relative bg-white text-black px-4 py-2 rounded-full font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">map</span> {t.courseList.mapView}
          </button>
        </div>

        {/* 지역 필터 / Bộ lọc khu vực / Region filter */}
        <div>
          <h3 className="font-bold mb-4">{t.courseList.region}</h3>
          <div className="space-y-3">
            {[
              { label: `${t.cities.hanoi} / North`, value: 'Hanoi' },
              { label: `${t.cities.daNang} / Central`, value: 'Da Nang' },
              { label: `${t.cities.hoChiMinh} / South`, value: 'Ho Chi Minh City' }
            ].map((region) => (
              <label key={region.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-primary focus:ring-primary border-gray-300"
                  checked={selectedRegions.includes(region.value)}
                  onChange={() => toggleRegion(region.value)}
                />
                <span className="text-sm font-medium">{region.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 날짜 및 시간 필터 / Bộ lọc ngày và giờ / Date and time filter */}
        <div>
          <h3 className="font-bold mb-4">{t.courseList.dateTime}</h3>
          <input type="date" className="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm font-medium" defaultValue={searchParams.get('date') || '2023-10-25'} />
          <div className="flex gap-2 mt-3">
            {['AM', 'PM', t.common.twilight].map((time, idx) => (
              <button key={time} className={`flex-1 py-2 text-xs font-bold rounded-lg border ${idx === 1 ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-500'}`}>{time}</button>
            ))}
          </div>
        </div>
      </aside>

      {/* 메인 코스 그리드 / Lưới sân chính / Main course grid */}
      <div className="flex-1">
        {/* 헤더 / Header / Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold">{filteredCourses.length} {t.courseList.availableCourses}</h2>
            <p className="text-sm text-gray-500">{t.courseList.showingBestMatches}</p>
          </div>
          <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm text-sm font-bold">
            {t.courseList.sortBy} <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>

        {/* 코스 카드 그리드 / Lưới thẻ sân / Course card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Link to={`/course/${course.id}`} key={course.id} className="group bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-white/5">
              {/* 코스 이미지 / Hình ảnh sân / Course image */}
              <div className="relative h-48 overflow-hidden">
                <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                {course.deal && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                    {course.deal}
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/30">
                  {t.courseList.slotsAvailable}
                </div>
              </div>

              {/* 코스 정보 / Thông tin sân / Course info */}
              <div className="p-5">
                <h3 className="font-bold text-lg mb-0.5">{course.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{course.subName || course.location}</p>

                {/* 코스 상세 배지 / Badge chi tiết sân / Course detail badges */}
                <div className="flex gap-2 mb-6">
                  <div className="flex items-center gap-1 text-[10px] font-bold bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded uppercase tracking-wide">
                    <span className="material-symbols-outlined text-sm">flag</span> {course.holes} {t.courseList.holes}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded uppercase tracking-wide">
                    <span className="material-symbols-outlined text-sm">landscape</span> {course.type}
                  </div>
                </div>

                {/* 가격 및 예약 버튼 / Giá và nút đặt / Price and book button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-white/5">
                  <div className="flex flex-col">
                    {course.originalPrice && <span className="text-xs text-gray-400 line-through">{(course.originalPrice / 1000).toLocaleString()}k</span>}
                    <span className="text-lg font-black">{(course.price / 1000).toLocaleString()}k <span className="text-sm font-normal text-gray-400">VND</span></span>
                  </div>
                  <button className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary transition-colors">{t.courseList.book}</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
