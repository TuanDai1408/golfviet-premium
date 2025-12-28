// 타입 정의 파일 - 애플리케이션 전체에서 사용되는 인터페이스 정의
// File định nghĩa kiểu - định nghĩa các interface được sử dụng trong toàn bộ ứng dụng
// Type definition file - interface definitions used throughout the application

// 골프 코스 인터페이스 / Interface sân golf / Golf course interface
export interface Course {
  id: string; // 코스 고유 ID / ID duy nhất của sân / Unique course ID
  name: string; // 코스 이름 / Tên sân / Course name
  subName?: string; // 부제목 (선택사항) / Tên phụ (tùy chọn) / Subtitle (optional)
  location: string; // 상세 위치 / Vị trí chi tiết / Detailed location
  city: string; // 도시 / Thành phố / City
  holes: number; // 홀 수 / Số hố / Number of holes
  par: number; // 파 (기준 타수) / Par (số gậy chuẩn) / Par (standard strokes)
  yards: number; // 거리 (야드) / Khoảng cách (yard) / Distance (yards)
  type: string; // 코스 유형 (예: Parkland, Links) / Loại sân (ví dụ: Parkland, Links) / Course type (e.g. Parkland, Links)
  rating: number; // 평점 / Đánh giá / Rating
  reviews: number; // 리뷰 수 / Số lượt đánh giá / Number of reviews
  price: number; // 가격 (VND) / Giá (VND) / Price (VND)
  originalPrice?: number; // 원래 가격 (할인 표시용) / Giá gốc (để hiển thị giảm giá) / Original price (for showing discount)
  image: string; // 이미지 URL / URL hình ảnh / Image URL
  isRecommended?: boolean; // 추천 코스 여부 / Có phải sân được đề xuất / Whether it's a recommended course
  deal?: string; // 특가 라벨 / Nhãn ưu đãi / Deal label
  verified?: boolean; // 인증 여부 / Đã xác minh / Verified status
}

// 예약 인터페이스 / Interface đặt chỗ / Booking interface
export interface Booking {
  id: string; // 예약 고유 ID / ID duy nhất của đặt chỗ / Unique booking ID
  courseId: string; // 코스 ID (Course 참조) / ID sân (tham chiếu Course) / Course ID (references Course)
  date: string; // 예약 날짜 / Ngày đặt / Booking date
  time: string; // 티타임 시간 / Giờ tee time / Tee time
  players: number; // 플레이어 수 / Số người chơi / Number of players
  status: 'Confirmed' | 'Pending' | 'Past'; // 예약 상태 / Trạng thái đặt chỗ / Booking status
  price: number; // 총 가격 (VND) / Tổng giá (VND) / Total price (VND)
  referenceCode: string; // 예약 참조 코드 / Mã tham chiếu đặt chỗ / Booking reference code
}

// 사용자 인터페이스 / Interface người dùng / User interface
export interface User {
  name: string; // 사용자 이름 / Tên người dùng / User name
  tier: string; // 멤버십 등급 / Cấp độ thành viên / Membership tier
  points: number; // 포인트 / Điểm / Points
  avatar: string; // 프로필 이미지 URL / URL hình đại diện / Avatar image URL
}
