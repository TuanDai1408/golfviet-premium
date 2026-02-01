import React from 'react';

export const ContactWidget: React.FC = () => {
    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 animate-fade-in-up">
            {/* Zalo */}
            <a
                href="https://zalo.me/0775516056"
                target="_blank"
                rel="noreferrer"
                className="size-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform group relative overflow-hidden ring-1 ring-gray-100"
            >
                <img
                    src="https://page.widget.zalo.me/static/images/2.0/Logo.svg"
                    alt="Zalo Icon"
                    className="w-10 h-10 object-contain"
                    loading="lazy"
                />
                <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Chat Zalo
                </div>
            </a>

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
    );
};
