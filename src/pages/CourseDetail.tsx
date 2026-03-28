import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import SEO from '../components/SEO';

export const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null); // Changed to object to hold instance ID
  const [teeTimes, setTeeTimes] = useState<any[]>([]);
  const [numPlayers, setNumPlayers] = useState<number | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      try {
        const data = await apiService.getCourseById(id);
        setCourse(data);
      } catch (error) {
        console.error('Failed to fetch course details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
    fetchCourse();
  }, [id]);

  useEffect(() => {
    const fetchTeeTimes = async () => {
      if (!id || !selectedDate) return;
      try {
        // In a real app, we would fetch from API. 
        // For now, generating some dummy slots based on the date if API returns empty
        // or if we haven't implemented tee_time_instances seeding fully.
        const data = await apiService.getTeeTimes(id, selectedDate);
        if (data && data.length > 0) {
          setTeeTimes(data);
        } else {
          // Fallback/Demo: generate slots
          const slots = ['06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45'];
          setTeeTimes(slots.map((time, i) => ({
            id: `demo-${i}`, // Temporary ID
            tee_time: time,
            // max_players: 4, 
            // booked_players: 0,
            // ...
          })));
        }
      } catch (error) {
        console.error('Failed to fetch tee times:', error);
      }
    }
    fetchTeeTimes();
    setSelectedSlot(null); // Reset selection on date change
  }, [id, selectedDate]);

  if (loading) return <div className="p-20 text-center">Loading course...</div>;
  if (!course) return <div className="p-20 text-center">{t.courseDetail.courseNotFound}</div>;

  const availableTeeTimes = (course.tee_times && course.tee_times.length > 0) ? course.tee_times : ['06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45'];
  const courseImages = course.images && course.images.length > 0 ? course.images : [course.image || 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800'];

  // Construct JSON-LD schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GolfCourse",
    "name": course.name,
    "description": course.description || t.courseDetail.aboutDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": course.address || course.location,
      "addressLocality": course.region || "",
      "addressCountry": "VN"
    },
    "image": courseImages,
    "priceRange": "VND",
    "telephone": "+84",
    "url": window.location.href
  };

  // Current day pricing - updates based on selectedDate
  const isWeekend = [0, 6].includes(new Date(selectedDate).getDay());
  const currentPrice = isWeekend
    ? (course.price_weekend || course.price || 3500000)
    : (course.price_weekday || course.price || 2500000);

  const handleBookNow = async () => {
    if (!user) {
      // Redirect to login if not logged in
      navigate('/login', { state: { from: `/course/${id}` } });
      return;
    }

    if (!selectedSlot) return;

    try {
      // Lock the booking
      // For demo slots (id starts with 'demo-'), we might need to mock the lock or just pass through
      // In a real scenario, we'd send the tee_time_instance_id

      let bookingData = {
        golf_course_id: course.id,
        tee_time_instance_id: selectedSlot.id.toString().startsWith('demo') ? null : selectedSlot.id,
        players: numPlayers || 4,
        total_price: (currentPrice * (numPlayers || 4)) + 1200000 + 600000, // Approx calculation matching checkout
        play_date: selectedDate,
        tee_time: selectedSlot.tee_time
      };

      // Call API
      const lockedBooking = await apiService.lockBooking(bookingData);

      navigate('/checkout', {
        state: {
          booking: lockedBooking,
          course: course,
          details: {
            date: selectedDate,
            time: selectedSlot.tee_time,
            price: currentPrice,
            players: numPlayers
          }
        }
      });

    } catch (error: any) {
      setBookingError(error.message || 'Failed to lock booking. Please try again.');
      console.error(error);
    }
  };

  return (
    <>
      <SEO 
        title={`${course.name} - Đặt sân Golf trực tuyến`}
        description={`Đặt chỗ tại ${course.name}. ${course.description ? course.description.slice(0, 150) + '...' : t.courseDetail.aboutDescription}`}
        keywords={`${course.name}, đặt sân golf ${course.region}, golf ${course.location}`}
        image={courseImages[0]}
      />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[300px] md:h-[480px] mb-8 rounded-2xl overflow-hidden shadow-lg">
          <div className="md:col-span-2 md:row-span-2 relative">
            <img src={courseImages[0]} className="absolute inset-0 w-full h-full object-cover" alt="" />
          </div>
          {courseImages.slice(1, 5).map((imgUrl: string, index: number) => (
            <div key={index} className="hidden md:block relative h-full">
              <img src={imgUrl} className="absolute inset-0 w-full h-full object-cover" alt="" />
            </div>
          ))}
          {/* Placeholder if less than 5 images */}
          {Array.from({ length: Math.max(0, 4 - (courseImages.length - 1)) }).map((_, index) => (
            <div key={`placeholder-${index}`} className="hidden md:block relative h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-gray-300">image</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary/20 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{t.courseDetail.premiumPartner}</span>
                <span className="flex items-center gap-1 text-xs text-gray-400"><span className="material-symbols-outlined text-sm">verified</span> {t.courseDetail.verified}</span>
              </div>
              <h1 className="text-4xl font-bold mb-2">{course.name}</h1>
              <p className="text-xl text-gray-400 mb-4">{t.courseDetail.internationalStandard}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <span>{course.address || course.location}</span>
                <button className="text-primary font-bold ml-2">{t.courseDetail.showOnMap}</button>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {[
                { label: t.courseList.holes, value: course.holes || 18, icon: 'golf_course' },
                { label: 'Par', value: course.par || 72, icon: 'flag' },
                { label: t.courseDetail.maxPlayers, value: `${course.max_players || 4} ${course.max_players === 1 ? t.courseDetail.player : t.courseDetail.players}`, icon: 'group' },
                { label: 'Yards', value: course.yards || '--', icon: 'straighten' },
                { label: 'Type', value: course.type || 'Championship', icon: 'landscape' }
              ].map(stat => (
                <div key={stat.label} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 rounded-xl shadow-sm">
                  <span className="material-symbols-outlined text-primary mb-1">{stat.icon}</span>
                  <span className="text-sm font-bold text-center">{stat.value}</span>
                  <span className="text-[8px] text-gray-400 uppercase tracking-widest mt-1 text-center">{stat.label}</span>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">{t.courseDetail.aboutCourse}</h3>
              <p className="text-gray-500 leading-relaxed whitespace-pre-line">
                {course.description || t.courseDetail.aboutDescription}
              </p>
            </div>

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

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold">{t.courseDetail.bookTeeTime}</h3>
                <div className="flex items-center gap-1 text-primary text-[10px] font-bold bg-primary/10 px-2 py-1 rounded uppercase">
                  <span className="material-symbols-outlined text-sm">bolt</span> {t.courseDetail.instantConfirmation}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold">{t.courseDetail.selectDate}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-primary">
                    <span className="material-symbols-outlined text-lg">calendar_month</span>
                  </div>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 rounded-xl py-3 pl-12 pr-4 text-sm font-bold focus:border-primary focus:ring-0 outline-none transition-all cursor-pointer"
                  />
                </div>
                <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar pb-2">
                  {[0, 1, 2, 3, 4].map(offset => {
                    const date = new Date();
                    date.setDate(date.getDate() + offset);
                    const dStr = date.toISOString().split('T')[0];
                    const dayNum = date.getDate();
                    const monthName = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                    return (
                      <button
                        key={dStr}
                        onClick={() => setSelectedDate(dStr)}
                        className={`flex flex-col items-center min-w-[60px] p-3 rounded-xl border-2 transition-all ${selectedDate === dStr ? 'border-primary bg-primary text-black' : 'border-gray-50 bg-gray-50 dark:bg-gray-800 text-gray-400'
                          }`}
                      >
                        <span className="text-[10px] font-bold">{monthName}</span>
                        <span className="text-lg font-black">{dayNum}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold">Số lượng người chơi</span>
                  <span className="text-xs text-gray-400">Tối đa: {course.max_players || 4}</span>
                </div>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4].filter(n => n <= (course.max_players || 4)).map(n => (
                    <button
                      key={n}
                      onClick={() => setNumPlayers(n)}
                      className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${numPlayers === n ? 'border-primary bg-primary text-black' : 'border-gray-50 bg-gray-50 dark:bg-gray-800 text-gray-400'}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold">{t.courseDetail.teeTimes}</span>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                    <span className="size-2 rounded-full bg-primary"></span> {t.common.am.toUpperCase()}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
                  {teeTimes.map(slot => (
                    <button
                      key={slot.id || slot.tee_time}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${selectedSlot?.tee_time === slot.tee_time ? 'bg-primary border-primary text-black shadow-lg scale-105' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-primary'
                        }`}
                    >
                      {slot.tee_time.slice(0, 5)}
                    </button>
                  ))}
                </div>
              </div>


              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-8">
                <div className="space-y-2 mb-4">
                  <div className={`flex justify-between text-xs p-2 rounded-lg transition-all ${!isWeekend ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-gray-400'}`}>
                    <span>{t.courseDetail.weekdayPrice}</span>
                    <span className={`${!isWeekend ? 'text-primary' : 'text-text-main dark:text-white'}`}>
                      {(course.price_weekday / 1000 || 2500).toLocaleString()}k VND
                    </span>
                  </div>
                  <div className={`flex justify-between text-xs p-2 rounded-lg transition-all ${isWeekend ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-gray-400'}`}>
                    <span>{t.courseDetail.weekendPrice}</span>
                    <span className={`${isWeekend ? 'text-primary' : 'text-text-main dark:text-white'}`}>
                      {(course.price_weekend / 1000 || 3500).toLocaleString()}k VND
                    </span>
                  </div>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold">{t.courseDetail.totalAmount}</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-primary">{(((currentPrice * (numPlayers || 0)) / 1000)).toLocaleString()}k <span className="text-xs font-normal">VND</span></span>
                  </div>
                </div>
              </div>

              <button
                disabled={!selectedSlot || !numPlayers || !selectedDate}
                onClick={handleBookNow}
                className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:grayscale text-black font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {(!selectedDate || !numPlayers || !selectedSlot)
                  ? t.courseDetail.pleaseSelectInfo
                  : t.courseDetail.bookNow} <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Popup */}
      {
        bookingError && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="size-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">error</span>
              </div>
              <h3 className="text-2xl font-black text-center mb-2">Lỗi Đặt Chỗ</h3>
              <p className="text-text-secondary text-center mb-8">{bookingError}</p>
              <button
                onClick={() => setBookingError(null)}
                className="w-full px-6 py-3.5 rounded-xl bg-[#111814] dark:bg-white text-white dark:text-black font-bold hover:opacity-90 transition-colors shadow-lg"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        )
      }
    </>
  );
};

