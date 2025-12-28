// 상수 및 목업 데이터 파일 - 테스트용 골프 코스, 사용자, 예약 데이터
// File hằng số và dữ liệu giả - dữ liệu sân golf, người dùng, đặt chỗ để test
// Constants and mock data file - golf courses, user, and booking data for testing

import { Course, Booking, User } from './types';

// 목업 골프 코스 데이터 - 베트남 주요 골프장 정보
// Dữ liệu giả sân golf - thông tin các sân golf chính tại Việt Nam
// Mock golf course data - information about major golf courses in Vietnam
export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    name: 'Twin Doves Golf Club',
    location: 'Binh Duong, Vietnam',
    city: 'Binh Duong',
    holes: 18,
    par: 72,
    yards: 7100,
    type: 'Parkland',
    rating: 4.9,
    reviews: 245,
    price: 3500000,
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=1200',
    isRecommended: true,
    verified: true
  },
  {
    id: '2',
    name: 'Da Nang Golf Resort',
    subName: 'Greg Norman Course',
    location: 'Hoa Hai Ward, Ngu Hanh Son',
    city: 'Da Nang',
    holes: 18,
    par: 72,
    yards: 7160,
    type: 'Dunes',
    rating: 4.8,
    reviews: 124,
    price: 2200000,
    originalPrice: 2400000,
    image: 'https://images.unsplash.com/photo-1592919016381-f0796ee2d00a?auto=format&fit=crop&q=80&w=1200',
    deal: '-15% TODAY',
    verified: true
  },
  {
    id: '3',
    name: 'Tan Son Nhat Golf Course',
    location: '6 Tan Son, Ward 12, Go Vap',
    city: 'Ho Chi Minh City',
    holes: 36,
    par: 144,
    yards: 14200,
    type: 'Urban',
    rating: 4.7,
    reviews: 512,
    price: 2500000,
    image: 'https://images.unsplash.com/photo-1623348646971-793836040801?auto=format&fit=crop&q=80&w=1200',
    verified: true
  },
  {
    id: '4',
    name: 'Hoiana Shores Golf Club',
    location: 'Quang Nam, Vietnam',
    city: 'Da Nang',
    holes: 18,
    par: 72,
    yards: 7004,
    type: 'Links',
    rating: 4.9,
    reviews: 89,
    price: 3500000,
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=1200',
    isRecommended: true
  },
  {
    id: '5',
    name: 'The Bluffs Ho Tram Strip',
    location: 'Ba Ria, Vung Tau',
    city: 'Vung Tau',
    holes: 18,
    par: 71,
    yards: 7000,
    type: 'Links',
    rating: 4.8,
    reviews: 156,
    price: 4100000,
    image: 'https://images.unsplash.com/photo-1610444583731-971759547f4f?auto=format&fit=crop&q=80&w=1200',
    deal: '-10% DEAL'
  }
];

// 목업 사용자 데이터 - 한국인 골퍼 프로필
// Dữ liệu giả người dùng - hồ sơ golfer người Hàn
// Mock user data - Korean golfer profile
export const MOCK_USER: User = {
  name: 'Kim Min-jun',
  tier: 'Gold Tier',
  points: 1450,
  avatar: 'https://picsum.photos/seed/golf/100/100'
};

// 목업 예약 데이터 - 사용자의 과거 및 예정된 예약
// Dữ liệu giả đặt chỗ - các đặt chỗ đã qua và sắp tới của người dùng
// Mock booking data - user's past and upcoming bookings
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    courseId: '1',
    date: 'Oct 24, 2023',
    time: '08:00 AM',
    players: 4,
    status: 'Confirmed',
    price: 3500000,
    referenceCode: 'VN-GLF-2023-XJ'
  },
  {
    id: 'b2',
    courseId: '2',
    date: 'Nov 05, 2023',
    time: '07:30 AM',
    players: 4,
    status: 'Pending',
    price: 2200000,
    referenceCode: 'VN-GLF-2023-AA'
  }
];
