import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { apiService } from '../services/api';
import { useToast } from '../contexts/ToastContext';
import RescheduleModal from '../components/RescheduleModal';

const BookingDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { showToast } = useToast();
    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [showReschedule, setShowReschedule] = useState(false);

    const fetchBooking = useCallback(async () => {
        try {
            if (id) {
                const data = await apiService.getBookingById(id);
                setBooking(data);
            }
        } catch (error) {
            console.error('Failed to fetch booking detail:', error);
            showToast('error', t.common.error);
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    }, [id, navigate, t.common.error, showToast]);

    useEffect(() => {
        fetchBooking();
    }, [fetchBooking]);

    const handleCancelBooking = async () => {
        try {
            if (id) {
                await apiService.cancelBooking(id);
                showToast('success', t.common.success);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Failed to cancel booking:', error);
            showToast('error', t.common.error);
        } finally {
            setShowCancelConfirm(false);
        }
    };

    if (loading) return <div className="p-20 text-center">{t.common.loading}</div>;
    if (!booking) return null;

    const rawCourse = booking.golf_courses;
    const course = Array.isArray(rawCourse) ? rawCourse[0] : rawCourse;

    // Handle both object and array response from join
    const rawTeeTime = booking.tee_time_instances;
    const teeTime = Array.isArray(rawTeeTime) ? rawTeeTime[0] : rawTeeTime;

    const courseImage = (course?.images && course.images.length > 0)
        ? course.images[0]
        : 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop';

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
                <Link to="/dashboard" className="flex items-center text-primary font-bold hover:underline">
                    <span className="material-symbols-outlined mr-2">arrow_back</span>
                    {t.bookingDetail.backToDashboard}
                </Link>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {booking.status}
                </span>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="relative h-64 md:h-80">
                    <img src={courseImage} className="w-full h-full object-cover" alt={course?.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-8">
                        <h1 className="text-3xl md:text-4xl font-black text-white">{course?.name}</h1>
                        <p className="text-white/80 mt-1 flex items-center">
                            <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                            {course?.address}
                        </p>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Ticket Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <span className="material-symbols-outlined mr-2 text-primary">confirmation_number</span>
                                {t.bookingDetail.ticketInfo}
                            </h2>
                            <div className="grid grid-cols-2 gap-6 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                                <div>
                                    <p className="text-xs text-text-secondary uppercase font-bold tracking-wider mb-1">{t.bookingDetail.playDate}</p>
                                    <p className="font-bold">{teeTime?.play_date}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-text-secondary uppercase font-bold tracking-wider mb-1">{t.bookingDetail.teeTime}</p>
                                    <p className="font-bold">{teeTime?.tee_time}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-text-secondary uppercase font-bold tracking-wider mb-1">{t.bookingDetail.players}</p>
                                    <p className="font-bold">{booking.players}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-text-secondary uppercase font-bold tracking-wider mb-1">Status</p>
                                    <p className="font-bold uppercase text-primary">{booking.status}</p>
                                </div>
                            </div>
                        </div>

                        {booking.status !== 'cancelled' && (
                            <div className="flex flex-col gap-3">
                                {teeTime?.play_date > new Date().toISOString().split('T')[0] && (
                                    <button
                                        onClick={() => setShowReschedule(true)}
                                        className="w-full py-4 rounded-xl bg-primary text-text-main font-black hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">event_repeat</span>
                                        {t.common.reschedule}
                                    </button>
                                )}
                                <button
                                    onClick={() => setShowCancelConfirm(true)}
                                    className="w-full py-4 rounded-xl border-2 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 font-black hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">cancel</span>
                                    {t.bookingDetail.cancelBooking}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Price Breakdown */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center">
                            <span className="material-symbols-outlined mr-2 text-primary">receipt_long</span>
                            {t.bookingDetail.feesDetails}
                        </h2>
                        <div className="space-y-4 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <div className="flex justify-between items-center">
                                <span className="text-text-secondary">{t.bookingDetail.greenFee} (x{booking.players})</span>
                                <span className="font-bold">{(booking.total_price * 0.7).toLocaleString()} VND</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-text-secondary">{t.bookingDetail.caddieCart} (x{booking.players})</span>
                                <span className="font-bold">{(booking.total_price * 0.2).toLocaleString()} VND</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-text-secondary">{t.bookingDetail.serviceCharge}</span>
                                <span className="font-bold">{(booking.total_price * 0.1).toLocaleString()} VND</span>
                            </div>
                            <div className="pt-4 border-t border-dashed border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <span className="text-lg font-bold">{t.bookingDetail.totalPrice}</span>
                                <span className="text-2xl font-black text-primary">{booking.total_price.toLocaleString()} VND</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancellation Confirmation Popup */}
            {showCancelConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="size-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-4xl">warning</span>
                        </div>
                        <h3 className="text-2xl font-black text-center mb-2">{t.dashboard.cancelConfirmTitle}</h3>
                        <p className="text-text-secondary text-center mb-8">{t.dashboard.cancelConfirmDesc}</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => setShowCancelConfirm(false)}
                                className="flex-1 px-6 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold hover:bg-gray-200 transition-colors"
                            >
                                {t.dashboard.confirmNo}
                            </button>
                            <button
                                onClick={handleCancelBooking}
                                className="flex-1 px-6 py-3.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                            >
                                {t.dashboard.confirmYes}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reschedule Modal */}
            {showReschedule && (
                <RescheduleModal
                    booking={booking}
                    onClose={() => setShowReschedule(false)}
                    onSuccess={() => {
                        setShowReschedule(false);
                        fetchBooking();
                    }}
                />
            )}
        </div>
    );
};

export default BookingDetail;
