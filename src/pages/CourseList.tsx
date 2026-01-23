import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { apiService } from '../services/api';

export const CourseList: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // States for filters and sorting
  const cityFromUrl = searchParams.get('city') || searchParams.get('region');
  const initialRegions = cityFromUrl ? [cityFromUrl] : ['Hanoi', 'Da Nang', 'Ho Chi Minh City'];
  const [selectedRegions, setSelectedRegions] = useState<string[]>(initialRegions);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHoles, setSelectedHoles] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(10000000); // 10M default
  const [maxPlayers, setMaxPlayers] = useState<number>(1);
  const [selectedTeeTime, setSelectedTeeTime] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await apiService.getCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => {
      if (prev.includes(region)) {
        return prev.filter(r => r !== region);
      } else {
        return [...prev, region];
      }
    });
  };

  const toggleHoles = (holes: number) => {
    setSelectedHoles(prev => {
      if (prev.includes(holes)) {
        return prev.filter(h => h !== holes);
      } else {
        return [...prev, holes];
      }
    });
  };

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Search filter
    if (searchQuery) {
      result = result.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.address && course.address.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Region filter
    if (selectedRegions.length > 0) {
      result = result.filter(course => {
        return selectedRegions.some(region =>
          (course.region && course.region === region) ||
          (course.address && course.address.includes(region))
        );
      });
    }

    // Holes filter
    if (selectedHoles.length > 0) {
      result = result.filter(course => selectedHoles.includes(course.holes));
    }

    // Price filter
    result = result.filter(course => {
      const isWeekend = [0, 6].includes(new Date().getDay());
      const price = isWeekend
        ? (course.price_weekend || course.price || 3500000)
        : (course.price_weekday || course.price || 2500000);
      return price <= maxPrice;
    });

    // Players filter
    if (maxPlayers > 1) {
      result = result.filter(course => (course.max_players || 4) >= maxPlayers);
    }

    // Sorting
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price_desc':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'holes':
        result.sort((a, b) => b.holes - a.holes);
        break;
      case 'region':
        result.sort((a, b) => (a.region || '').localeCompare(b.region || ''));
        break;
      default:
        // 'recommended' - sort by rating if available
        result.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }

    return result;
  }, [courses, selectedRegions, searchQuery, selectedHoles, maxPrice, sortBy]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center">
        <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">{t.common.loading}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 relative">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowMobileFilter(true)}
        className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-black text-primary px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl font-bold active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined">filter_list</span>
        {t.courseList.region} & {t.home.search}
      </button>

      {/* Sidebar Filters */}
      <aside className={`
        fixed inset-0 z-50 bg-white dark:bg-surface-dark p-6 overflow-y-auto transition-transform duration-300 lg:relative lg:inset-auto lg:z-0 lg:bg-transparent lg:p-0 lg:overflow-visible lg:translate-x-0 lg:w-72 flex-shrink-0 space-y-8
        ${showMobileFilter ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile Close Button */}
        <div className="flex justify-between items-center lg:hidden mb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={() => setShowMobileFilter(false)} className="size-10 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Search */}
        <div>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">search</span>
            {t.home.search}
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder={t.courseList.searchPlaceholder}
              className="w-full h-11 bg-gray-50 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Regions */}
        <div>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">location_on</span>
            {t.courseList.region}
          </h3>
          <div className="space-y-3">
            {[
              { label: t.cities.hanoi, value: 'Hanoi', region: t.courseList.north },
              { label: t.cities.daNang, value: 'Da Nang', region: t.courseList.central },
              { label: t.cities.hoChiMinh, value: 'Ho Chi Minh City', region: t.courseList.south }
            ].map((region) => (
              <label key={region.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="size-5 rounded border-gray-300 text-primary focus:ring-primary/20 cursor-pointer"
                  checked={selectedRegions.includes(region.value)}
                  onChange={() => toggleRegion(region.value)}
                />
                <span className="text-sm font-medium text-gray-600 group-hover:text-black transition-colors">
                  {region.label} <span className="text-[10px] text-gray-400">({region.region})</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Holes */}
        <div>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">flag</span>
            {t.courseList.holesCount}
          </h3>
          <div className="flex flex-wrap gap-2">
            {[9, 18, 36].map((holes) => (
              <button
                key={holes}
                onClick={() => toggleHoles(holes)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedHoles.includes(holes)
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
              >
                {holes}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">payments</span>
              {t.courseList.priceRange}
            </h3>
            <span className="text-xs font-bold text-primary">{(maxPrice / 1000000).toFixed(1)}M</span>
          </div>
          <input
            type="range"
            min="0"
            max="10000000"
            step="500000"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          />
          <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400">
            <span>0</span>
            <span>10M VND</span>
          </div>
        </div>

        {/* Max Players */}
        <div>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">groups</span>
            {t.courseList.playersCount}
          </h3>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setMaxPlayers(num)}
                className={`size-10 rounded-xl text-sm font-bold transition-all ${maxPlayers === num
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Tee Time */}
        <div>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">schedule</span>
            {t.courseList.teeTime}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {['all', 'morning', 'afternoon', 'twilight'].map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTeeTime(time)}
                className={`py-2 rounded-xl text-xs font-bold transition-all capitalize ${selectedTeeTime === time
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
              >
                {time === 'all' ? t.courseList.all : t.common[time as keyof typeof t.common] || time}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            setSelectedRegions([]);
            setSearchQuery('');
            setSelectedHoles([]);
            setMaxPrice(10000000);
            setMaxPlayers(1);
            setSelectedTeeTime('all');
          }}
          className="w-full py-3 rounded-xl border-2 border-gray-100 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">filter_alt_off</span>
          {t.courseList.clearAll}
        </button>

        {/* Mobile View Results Button */}
        <button
          onClick={() => setShowMobileFilter(false)}
          className="lg:hidden w-full py-4 bg-primary text-white rounded-xl font-bold mt-8 shadow-lg"
        >
          View {filteredCourses.length} Results
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header with Sorting */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-white/5">
          <div>
            <h2 className="text-2xl font-black">{filteredCourses.length} {t.courseList.availableCourses}</h2>
            <p className="text-sm text-gray-500">
              {t.courseList.showingBestMatches} {selectedRegions.length > 0 ? selectedRegions.map(v => {
                if (v === 'Hanoi') return t.cities.hanoi;
                if (v === 'Da Nang') return t.cities.daNang;
                if (v === 'Ho Chi Minh City') return t.cities.hoChiMinh;
                return v;
              }).join(', ') : t.common.vietnam}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.courseList.sortBy}:</span>
            <select
              className="bg-gray-50 border-none rounded-xl text-sm font-bold px-4 h-10 focus:ring-0 cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">{t.home.recommended}</option>
              <option value="price_asc">{t.courseList.sortByPrice} (Low-High)</option>
              <option value="price_desc">{t.courseList.sortByPrice} (High-Low)</option>
              <option value="holes">{t.courseList.sortByHoles}</option>
              <option value="region">{t.courseList.sortByRegion}</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Link to={`/course/${course.id}`} key={course.id} className="group bg-white dark:bg-surface-dark rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-white/5 flex flex-col h-full">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={(course.images && course.images.length > 0) ? course.images[0] : (course.image || 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800')}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    alt={course.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <span className="material-symbols-outlined text-yellow-500 text-sm fill-current">star</span>
                      <span className="text-xs font-black">{course.rating || '5.0'}</span>
                    </div>
                  </div>

                  {course.isRecommended && (
                    <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                      {t.home.recommended}
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="font-black text-xl mb-1 group-hover:text-primary transition-colors line-clamp-1">{course.name}</h3>
                    <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                      {course.address}
                    </p>
                  </div>

                  <div className="flex gap-2 mb-8">
                    <div className="flex items-center gap-1.5 text-[10px] font-black bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg uppercase tracking-wider text-gray-500">
                      <span className="material-symbols-outlined text-sm">flag</span>
                      {course.holes} {t.courseList.holes}
                    </div>
                    {course.region && (
                      <div className="flex items-center gap-1.5 text-[10px] font-black bg-primary/10 text-primary px-3 py-1.5 rounded-lg uppercase tracking-wider">
                        <span className="material-symbols-outlined text-sm">explore</span>
                        {course.region}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{t.home.startingFrom}</span>
                      <span className="text-2xl font-black">
                        {(() => {
                          const isWeekend = [0, 6].includes(new Date().getDay());
                          const price = isWeekend
                            ? (course.price_weekend || course.price || 3500000)
                            : (course.price_weekday || course.price || 2500000);
                          return (price / 1000).toLocaleString();
                        })()}k <span className="text-sm font-medium text-gray-400">VND</span>
                      </span>
                    </div>
                    <button className="bg-black text-primary px-6 py-3 rounded-2xl text-sm font-black hover:bg-primary hover:text-white transition-all transform active:scale-95 shadow-lg group-hover:shadow-primary/20">
                      {t.courseList.book.toUpperCase()}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-surface-dark rounded-3xl p-20 flex flex-col items-center justify-center text-center border border-dashed border-gray-200">
            <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-gray-300">search_off</span>
            </div>
            <h3 className="text-xl font-bold mb-2">No courses found</h3>
            <p className="text-gray-500 max-w-sm">Try adjusting your filters or search terms to find what you're looking for.</p>
            <button
              onClick={() => {
                setSelectedRegions([]);
                setSearchQuery('');
                setSelectedHoles([]);
                setMaxPrice(10000000);
                setMaxPlayers(1);
              }}
              className="mt-8 text-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

