// Zalo Contact Page Mockup
import React from 'react';
import { Link } from 'react-router-dom';

export const ZaloContact: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#f1f2f5] flex flex-col font-sans">
            {/* Zalo Header */}
            {/* <header className="bg-white h-16 px-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-[#0068ff] font-bold text-3xl tracking-tighter hover:opacity-80 transition-opacity">
                        Zalo
                    </Link>
                </div>

            </header> */}

            {/* Main Content */}
            < main className="flex-1 flex items-center justify-center p-4" >
                <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl flex overflow-hidden">
                    {/* Left Side - Profile Info */}
                    <div className="flex-1 p-8 md:p-12 border-r border-gray-100">
                        {/* Profile Header */}
                        <div className="flex items-start gap-4 mb-6">
                            <div className="relative">
                                <div className="size-20 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                                    <img
                                        src="https://page.widget.zalo.me/static/images/2.0/Logo.svg"
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Verified Badge */}
                                <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white rounded-full p-0.5 border-2 border-white" title="Verified Account">
                                    <span className="material-symbols-outlined text-[14px] block">check</span>
                                </div>
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    GolfViet Premium
                                    <span className="material-symbols-outlined text-yellow-400 text-xl" title="Verified">verified</span>
                                </h1>
                                <p className="text-gray-500 font-medium">Golf Booking & Tours</p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mb-8">
                            <button className="bg-[#0068ff] hover:bg-[#0054cc] text-white rounded-full px-8 py-3 font-bold text-lg w-full flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-200">
                                <span className="material-symbols-outlined">chat_bubble</span>
                                Message
                            </button>
                        </div>

                        {/* Details Section */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Information</h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3 text-gray-600">
                                    <span className="material-symbols-outlined text-gray-400 mt-1">location_on</span>
                                    <span>Da Nang City, Vietnam</span>
                                </div>
                                <div className="flex items-start gap-3 text-gray-600">
                                    <span className="material-symbols-outlined text-gray-400 mt-1">call</span>
                                    <a href="tel:+84909090909" className="text-[#0068ff] hover:underline">0909 090 909</a>
                                </div>
                                <div className="flex items-start gap-3 text-gray-600">
                                    <span className="material-symbols-outlined text-gray-400 mt-1">schedule</span>
                                    <span>Open 24/7</span>
                                </div>
                                <div className="flex items-start gap-3 text-gray-600">
                                    <span className="material-symbols-outlined text-gray-400 mt-1">language</span>
                                    <a href="https://golfviet.com" className="text-[#0068ff] hover:underline">https://golfviet.com</a>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 leading-relaxed border border-blue-100">
                                Premium golf booking service in Vietnam. Fast, reliable, and exclusive rates for members. Support 24/7.
                            </div>
                        </div>
                    </div>

                    {/* Right Side - QR Code (Hidden on small screens) */}
                    <div className="hidden md:flex w-1/3 p-8 bg-gray-50 flex-col items-center justify-center border-l border-gray-100">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://zalo.me/0909090909"
                                alt="QR Code"
                                className="size-48"
                            />
                            <div className="mt-2 flex justify-center">
                                <span className="bg-[#0068ff] text-white text-xs font-bold px-2 py-0.5 rounded">Zalo</span>
                            </div>
                        </div>
                        <p className="text-center text-sm text-gray-500 max-w-[200px]">
                            Open Zalo on your phone and scan the QR code to connect instantly.
                        </p>
                    </div>
                </div>
            </main >

            {/* Footer */}
            < footer className="py-6 text-center text-gray-400 text-sm" >
                & copy; 2024 Zalo Group.All rights reserved.
            </footer >
        </div >
    );
};
