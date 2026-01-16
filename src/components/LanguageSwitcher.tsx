// 언어 전환기 컴포넌트 - 한국어/베트남어/영어 전환
// Component chuyển đổi ngôn ngữ - chuyển giữa tiếng Hàn/Việt/Anh
// Language switcher component - switch between Korean/Vietnamese/English

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../translations';

// 언어 옵션 설정 / Cấu hình tùy chọn ngôn ngữ / Language options configuration
const languageOptions: { code: Language; label: string; flag: string }[] = [
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
];

// 언어 전환기 컴포넌트 / Component chuyển đổi ngôn ngữ / Language switcher component
export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = React.useState(false);

    // 현재 선택된 언어 정보 / Thông tin ngôn ngữ được chọn hiện tại / Current selected language info
    const currentLanguage = languageOptions.find(opt => opt.code === language) || languageOptions[1];

    // 언어 선택 핸들러 / Handler chọn ngôn ngữ / Language selection handler
    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* 언어 선택 버튼 / Nút chọn ngôn ngữ / Language selection button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a3c32] transition-colors"
                aria-label="Select language"
            >
                <span className="text-xl">{currentLanguage.flag}</span>
                <span className="hidden sm:inline text-sm font-medium dark:text-white">{currentLanguage.label}</span>
                <span className="material-symbols-outlined text-sm dark:text-white">expand_more</span>
            </button>

            {/* 드롭다운 메뉴 / Menu thả xuống / Dropdown menu */}
            {isOpen && (
                <>
                    {/* 배경 오버레이 (클릭 시 닫기) / Lớp phủ nền (đóng khi click) / Background overlay (close on click) */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* 언어 옵션 목록 / Danh sách tùy chọn ngôn ngữ / Language options list */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-surface-dark border border-gray-200 dark:border-[#2a3c32] rounded-xl shadow-xl z-50 overflow-hidden">
                        {languageOptions.map((option) => (
                            <button
                                key={option.code}
                                onClick={() => handleLanguageChange(option.code)}
                                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#2a3c32] transition-colors ${language === option.code ? 'bg-primary/10 dark:bg-primary/20' : ''
                                    }`}
                            >
                                <span className="text-2xl">{option.flag}</span>
                                <span className={`text-sm font-medium flex-1 text-left ${language === option.code ? 'text-primary font-bold' : 'text-text-main dark:text-white'
                                    }`}>
                                    {option.label}
                                </span>
                                {language === option.code && (
                                    <span className="material-symbols-outlined text-primary text-sm">check</span>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
