import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { apiService } from '../services/api';

export const CourseList: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const cityFromUrl = searchParams.get('city');
  const initialRegions = cityFromUrl ? [cityFromUrl] : ['Hanoi', 'Da Nang', 'Ho Chi Minh City'];
  const [selectedRegions, setSelectedRegions] = useState<string[]>(initialRegions);

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => {
      if (prev.includes(region)) {
        return prev.filter(r => r !== region);
      } else {
        return [...prev, region];
      }
    });
  };

  const filteredCourses = useMemo(() => {
    if (selectedRegions.length === 0) {
      return courses;
    }
    // Note: The backend golf_courses table might not have 'city' field yet, 
    // it has 'address'. For now, we'll just return all if filter doesn't match perfectly.
    return courses.filter(course => {
      if (!course.address) return true;
      return selectedRegions.some(region => course.address.includes(region));
    });
  }, [selectedRegions, courses]);

  if (loading) {
    return <div className="p-10 text-center">Loading courses...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
      {/* ... Filter Sidebar omitted for brevity or kept same ... */}
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
        <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-gray-800 flex items-center justify-center group cursor-pointer">
          <img src="https://images.unsplash.com/photo-1596708051772-20c22883652c?auto=format&fit=crop&q=80&w=400" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-all" alt="" />
          <button className="relative bg-white text-black px-4 py-2 rounded-full font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">map</span> {t.courseList.mapView}
          </button>
        </div>

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
      </aside>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold">{filteredCourses.length} {t.courseList.availableCourses}</h2>
            <p className="text-sm text-gray-500">{t.courseList.showingBestMatches}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Link to={`/course/${course.id}`} key={course.id} className="group bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-white/5">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={(course.images && course.images.length > 0) ? course.images[0] : (course.image || 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800')}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={course.name}
                />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/30">
                  {t.courseList.slotsAvailable}
                </div>
              </div>


              <div className="p-5">
                <h3 className="font-bold text-lg mb-0.5">{course.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{course.address}</p>

                <div className="flex gap-2 mb-6">
                  <div className="flex items-center gap-1 text-[10px] font-bold bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded uppercase tracking-wide">
                    <span className="material-symbols-outlined text-sm">flag</span> {course.holes} {t.courseList.holes}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-white/5">
                  <div className="flex flex-col">
                    <span className="text-lg font-black">
                      {(() => {
                        const isWeekend = [0, 6].includes(new Date().getDay());
                        const price = isWeekend
                          ? (course.price_weekend || course.price || 3500000)
                          : (course.price_weekday || course.price || 2500000);
                        return (price / 1000).toLocaleString();
                      })()}k <span className="text-sm font-normal text-gray-400">VND</span>
                    </span>
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

