import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { apiService } from '../services/api';
import { useToast } from '../contexts/ToastContext';

interface RescheduleModalProps {
    booking: any;
    onClose: () => void;
    onSuccess: () => void;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({ booking, onClose, onSuccess }) => {
    const { t } = useLanguage();
    const { showToast } = useToast();
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
    );
    const [teeTimes, setTeeTimes] = useState<any[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [fetchingTimes, setFetchingTimes] = useState(false);

    useEffect(() => {
        const fetchTeeTimes = async () => {
            if (!booking.golf_course_id || !selectedDate) return;
            setFetchingTimes(true);
            try {
                const data = await apiService.getTeeTimes(booking.golf_course_id, selectedDate);
                // Sort by time
                const sorted = (data || []).sort((a: any, b: any) => a.tee_time.localeCompare(b.tee_time));
                setTeeTimes(sorted);
            } catch (error) {
                console.error('Failed to fetch tee times:', error);
            } finally {
                setFetchingTimes(false);
            }
        };
        fetchTeeTimes();
        setSelectedSlot(null);
    }, [booking.golf_course_id, selectedDate]);

    const handleConfirm = async () => {
        if (!selectedSlot) return;
        setLoading(true);
        try {
            await apiService.rescheduleBooking(booking.id, {
                tee_time_instance_id: selectedSlot.id,
                play_date: selectedDate,
                tee_time: selectedSlot.tee_time
            });
            showToast('success', t.reschedule.success);
            onSuccess();
        } catch (error: any) {
            console.error('Failed to reschedule:', error);
            showToast('error', error.message || t.common.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black">{t.reschedule.title}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Date Picker */}
                    <div>
                        <label className="block text-sm font-bold mb-3">{t.reschedule.selectNewDate}</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                                <span className="material-symbols-outlined text-lg">calendar_month</span>
                            </div>
                            <input
                                type="date"
                                value={selectedDate}
                                min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 rounded-xl py-4 pl-12 pr-4 text-sm font-bold focus:border-primary focus:ring-0 outline-none transition-all cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Tee Time List */}
                    <div>
                        <label className="block text-sm font-bold mb-3">{t.reschedule.selectNewTime}</label>
                        {fetchingTimes ? (
                            <div className="py-8 text-center text-text-secondary">{t.common.loading}</div>
                        ) : teeTimes.length > 0 ? (
                            <div className="grid grid-cols-4 gap-3">
                                {teeTimes.map((slot) => (
                                    <button
                                        key={slot.id}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`py-3 text-xs font-bold rounded-xl border transition-all ${selectedSlot?.id === slot.id
                                            ? 'bg-primary border-primary text-black shadow-lg scale-105'
                                            : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-primary'
                                            }`}
                                    >
                                        {slot.tee_time.slice(0, 5)}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center text-text-secondary bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                Không có lịch trống cho ngày này
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold hover:bg-gray-200 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            disabled={!selectedSlot || loading}
                            onClick={handleConfirm}
                            className="flex-1 py-4 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
                        >
                            {loading ? t.common.loading : t.reschedule.confirmBtn}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RescheduleModal;
