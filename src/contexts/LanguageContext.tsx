// 언어 컨텍스트 - 전역 언어 상태 관리
// Context ngôn ngữ - quản lý trạng thái ngôn ngữ toàn cục
// Language Context - global language state management

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, translations } from '../translations';

// 컨텍스트 인터페이스 정의 / Định nghĩa interface context / Context interface definition
interface LanguageContextType {
    language: Language; // 현재 언어 / Ngôn ngữ hiện tại / Current language
    setLanguage: (lang: Language) => void; // 언어 변경 함수 / Hàm đổi ngôn ngữ / Change language function
    t: Translations; // 번역 객체 / Đối tượng dịch / Translation object
}

// 컨텍스트 생성 / Tạo context / Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 프로바이더 Props 인터페이스 / Interface Props của Provider / Provider Props interface
interface LanguageProviderProps {
    children: ReactNode;
}

// 언어 프로바이더 컴포넌트 / Component Provider ngôn ngữ / Language Provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    // localStorage에서 저장된 언어 가져오기, 없으면 베트남어 기본값
    // Lấy ngôn ngữ đã lưu từ localStorage, mặc định tiếng Việt nếu không có
    // Get saved language from localStorage, default to Vietnamese if not found
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('golfviet-language');
        return (saved as Language) || 'vi';
    });

    // 언어 변경 시 localStorage에 저장
    // Lưu vào localStorage khi đổi ngôn ngữ
    // Save to localStorage when language changes
    useEffect(() => {
        localStorage.setItem('golfviet-language', language);
        // HTML lang 속성도 업데이트 / Cập nhật thuộc tính lang của HTML / Update HTML lang attribute
        document.documentElement.lang = language;
    }, [language]);

    // 사용자가 선택한 언어의 번역 객체 가져오기
    // Lấy đối tượng dịch của ngôn ngữ người dùng chọn
    // Get translation object for user's selected language
    const t = translations[language];

    // 언어 변경 함수 래퍼
    // Hàm wrapper đổi ngôn ngữ
    // Language change wrapper function
    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// 커스텀 훅 - 컴포넌트에서 언어 컨텍스트 사용
// Hook tùy chỉnh - sử dụng context ngôn ngữ trong component
// Custom hook - use language context in components
export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
