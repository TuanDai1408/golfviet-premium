// 번역 시스템 - 한국어, 베트남어, 영어 지원
// Hệ thống dịch - hỗ trợ tiếng Hàn, tiếng Việt, tiếng Anh
// Translation System - supports Korean, Vietnamese, English

export type Language = 'ko' | 'vi' | 'en';

// 번역 인터페이스 정의 / Định nghĩa interface dịch / Translation interface definition
export interface Translations {
    // 네비게이션 / Điều hướng / Navigation
    nav: {
        dashboard: string;
        bookTeeTime: string;
        membership: string;
        support: string;
        newBooking: string;
    };

    // 홈페이지 / Trang chủ / Home page
    home: {
        heroTitle1: string;
        heroTitle2: string;
        heroDescription: string;
        realtimeBooking: string;
        location: string;
        date: string;
        search: string;
        popularCourses: string;
        popularCoursesDesc: string;
        viewAll: string;
        startingFrom: string;
        recommended: string;
        trustTitle1: string;
        trustDesc1: string;
        trustTitle2: string;
        trustDesc2: string;
        trustTitle3: string;
        trustDesc3: string;
        allLocations: string;
    };

    // 대시보드 / Bảng điều khiển / Dashboard
    dashboard: {
        title: string;
        description: string;
        upcoming: string;
        pastHistory: string;
        totalGames: string;
        upcomingGames: string;
        points: string;
        membership: string;
        nextTeeTime: string;
        confirmed: string;
        pending: string;
        players: string;
        cancel: string;
        viewTicket: string;
        upcomingReservations: string;
        quickActions: string;
        bookNewTeeTime: string;
        exploreCourses: string;
        viewPastReceipts: string;
        downloadInvoices: string;
        forecast: string;
        sunny: string;
        humidity: string;
        thisMonth: string;
        nextDate: string;
        pointsPending: string;
        toTier: string;
    };

    // 코스 목록 / Danh sách sân golf / Course list
    courseList: {
        mapView: string;
        region: string;
        dateTime: string;
        availableCourses: string;
        showingBestMatches: string;
        sortBy: string;
        slotsAvailable: string;
        holes: string;
        book: string;
        deal: string;
    };

    // 코스 상세 / Chi tiết sân golf / Course detail
    courseDetail: {
        premiumPartner: string;
        verified: string;
        showOnMap: string;
        aboutCourse: string;
        facilities: string;
        bookTeeTime: string;
        instantConfirmation: string;
        selectDate: string;
        availableSlots: string;
        greenFee: string;
        caddieCart: string;
        totalAmount: string;
        bookNow: string;
        courseNotFound: string;
        internationalStandard: string;
        aboutDescription: string;
    };

    // 체크아웃 / Thanh toán / Checkout
    checkout: {
        title: string;
        description: string;
        date: string;
        time: string;
        golfers: string;
        priceBreakdown: string;
        greenFeeMultiple: string;
        caddieCartMultiple: string;
        serviceCharge: string;
        totalAmount: string;
        paymentMethod: string;
        card: string;
        cardNumber: string;
        expiryDate: string;
        cvc: string;
        pay: string;
        secureNote: string;
    };

    // 확인 페이지 / Trang xác nhận / Confirmation
    confirmation: {
        title: string;
        description: string;
        bookingReference: string;
        copyCode: string;
        addToCalendar: string;
        returnToDashboard: string;
    };

    // 푸터 / Chân trang / Footer
    footer: {
        description: string;
        company: string;
        aboutUs: string;
        careers: string;
        press: string;
        legal: string;
        terms: string;
        privacy: string;
        rights: string;
    };

    // 공통 / Chung / Common
    common: {
        vietnam: string;
        loading: string;
        error: string;
        success: string;
        details: string;
        reschedule: string;
        am: string;
        pm: string;
        twilight: string;
    };

    // 도시 / Thành phố / Cities
    cities: {
        hanoi: string;
        daNang: string;
        hoChiMinh: string;
        nhaTrang: string;
        binhDuong: string;
        vungTau: string;
    };

    // 코스 타입 / Loại sân / Course types
    courseTypes: {
        parkland: string;
        dunes: string;
        urban: string;
        links: string;
    };

    // 인증 / Xác thực / Auth
    auth: {
        login: string;
        register: string;
        guest: string;
        logout: string;
        welcomeBack: string;
        pleaseLogin: string;
        emailOrPhone: string;
        password: string;
        forgotPassword: string;
        orContinueWith: string;
        noAccount: string;
        registerNow: string;
        haveAccount: string;
        loginNow: string;
        createAccount: string;
        joinCommunity: string;
        fullName: string;
        iam: string;
        player: string;
        owner: string;
        agreeTerms: string;
    };

    // 프로필 / Hồ sơ / Profile
    profile: {
        title: string;
        personalInfo: string;
        viewProfile: string;
        editProfile: string;
        recentActivity: string;
        language: string;
        notifications: string;
        security: string;
    };
}

// 한국어 번역 / Bản dịch tiếng Hàn / Korean translations
export const ko: Translations = {
    nav: {
        dashboard: '대시보드',
        bookTeeTime: '티타임 예약',
        membership: '멤버십',
        support: '지원',
        newBooking: '새 예약',
    },
    home: {
        heroTitle1: '베트남 골프',
        heroTitle2: '프리미엄 예약',
        heroDescription: '세계 수준의 서비스로 최고급 코스를 경험하세요. 빠르고 안정적이며 독점적인 요금.',
        realtimeBooking: '실시간 예약 시스템',
        location: '위치',
        date: '날짜',
        search: '검색',
        popularCourses: '인기 코스',
        popularCoursesDesc: '이번 주 골퍼들이 가장 많이 예약한 코스',
        viewAll: '모두 보기',
        startingFrom: '시작 가격',
        recommended: '추천',
        trustTitle1: '10초 만에 예약',
        trustDesc1: '골프장 시스템과 직접 연결된 실시간 예약 가능 확인.',
        trustTitle2: '다국어 지원',
        trustDesc2: '여러 언어로 연중무휴 고객 서비스 제공.',
        trustTitle3: '최저가 보장',
        trustDesc3: '회원 전용 요금. 숨겨진 예약 수수료 없음.',
        allLocations: '모든 지역',
    },
    dashboard: {
        title: '내 예약',
        description: '예정된 티타임을 관리하고 과거 게임을 확인하세요.',
        upcoming: '예정',
        pastHistory: '과거 기록',
        totalGames: '총 게임',
        upcomingGames: '예정',
        points: '포인트',
        membership: '멤버십',
        nextTeeTime: '다음 티타임',
        confirmed: '확인됨',
        pending: '대기 중',
        players: '플레이어',
        cancel: '취소',
        viewTicket: '티켓 보기',
        upcomingReservations: '예정된 예약',
        quickActions: '빠른 작업',
        bookNewTeeTime: '새 티타임 예약',
        exploreCourses: '베트남 코스 탐색',
        viewPastReceipts: '과거 영수증 보기',
        downloadInvoices: '인보이스 다운로드',
        forecast: '예보',
        sunny: '맑음',
        humidity: '습도',
        thisMonth: '이번 달',
        nextDate: '다음',
        pointsPending: '대기 중',
        toTier: '까지',
    },
    courseList: {
        mapView: '지도 보기',
        region: '지역',
        dateTime: '날짜 및 시간',
        availableCourses: '이용 가능한 코스',
        showingBestMatches: '중부 베트남 최고의 매치 표시',
        sortBy: '정렬 기준: 추천',
        slotsAvailable: '슬롯 이용 가능',
        holes: '홀',
        book: '예약',
        deal: '특가',
    },
    courseDetail: {
        premiumPartner: '프리미엄 파트너',
        verified: '인증됨',
        showOnMap: '지도에 표시',
        aboutCourse: '코스 정보',
        facilities: '시설 및 편의시설',
        bookTeeTime: '티타임 예약',
        instantConfirmation: '즉시 확인',
        selectDate: '날짜 선택',
        availableSlots: '이용 가능한 시간',
        greenFee: '그린피 (18홀)',
        caddieCart: '캐디 및 카트 (공유)',
        totalAmount: '총액',
        bookNow: '지금 예약',
        courseNotFound: '코스를 찾을 수 없습니다.',
        internationalStandard: '국제 표준 코스',
        aboutDescription: '국제 표준으로 설계된 이 코스는 베트남에서 독특한 도전을 제공합니다. 깨끗한 그린, 전략적으로 배치된 벙커, 자연 경관을 통과하는 멋진 레이아웃을 갖추고 있습니다. 이 지역 최고의 골프 코스 중 하나로 자주 선정됩니다.',
    },
    checkout: {
        title: '결제',
        description: 'Twin Doves Golf Club에서 예약을 안전하게 완료하세요',
        date: '날짜',
        time: '시간',
        golfers: '골퍼',
        priceBreakdown: '가격 세부정보',
        greenFeeMultiple: '그린피 (x4)',
        caddieCartMultiple: '캐디 및 카트 (x4)',
        serviceCharge: '서비스 요금',
        totalAmount: '총액',
        paymentMethod: '결제 방법',
        card: '카드',
        cardNumber: '카드 번호',
        expiryDate: '만료일',
        cvc: 'CVC',
        pay: '결제',
        secureNote: 'SSL을 통해 안전하게 처리됩니다. 결제하면 약관에 동의하는 것입니다.',
    },
    confirmation: {
        title: '예약 확인!',
        description: '티타임이 성공적으로 확보되었습니다. 프리미엄 골프 경험을 준비하세요.',
        bookingReference: '예약 참조',
        copyCode: '코드 복사',
        addToCalendar: '캘린더에 추가',
        returnToDashboard: '대시보드로 돌아가기',
    },
    footer: {
        description: '베트남에서 프리미엄 골프 코스를 예약하는 가장 쉬운 방법. 수천 명의 국제 골퍼들이 신뢰합니다.',
        company: '회사',
        aboutUs: '회사 소개',
        careers: '채용',
        press: '언론',
        legal: '법률',
        terms: '서비스 약관',
        privacy: '개인정보 보호정책',
        rights: '© 2023 GolfViet Inc. 모든 권리 보유.',
    },
    common: {
        vietnam: '베트남',
        loading: '로딩 중...',
        error: '오류',
        success: '성공',
        details: '세부정보',
        reschedule: '일정 변경',
        am: '오전',
        pm: '오후',
        twilight: '황혼',
    },
    cities: {
        hanoi: '하노이',
        daNang: '다낭',
        hoChiMinh: '호치민',
        nhaTrang: '나트랑',
        binhDuong: '빈쯔엉',
        vungTau: '붕따우',
    },
    courseTypes: {
        parkland: '파크랜드',
        dunes: '듄스',
        urban: '도심',
        links: '링크스',
    },
    auth: {
        login: '로그인',
        register: '회원가입',
        guest: '로그인 / 회원가입',
        logout: '로그아웃',
        welcomeBack: '환영합니다',
        pleaseLogin: '계속하려면 로그인하세요',
        emailOrPhone: '이메일 또는 전화번호',
        password: '비밀번호',
        forgotPassword: '비밀번호를 잊으셨나요?',
        orContinueWith: '또는 다음으로 계속',
        noAccount: '계정이 없으신가요?',
        registerNow: '지금 가입하기',
        haveAccount: '이미 계정이 있으신가요?',
        loginNow: '지금 로그인하기',
        createAccount: '계정 생성',
        joinCommunity: 'GolfViet 커뮤니티에 참여하세요',
        fullName: '성함',
        iam: '나는',
        player: '골퍼',
        owner: '골프장 소유주',
        agreeTerms: '가입을 클릭하면 서비스 약관 및 개인정보 보호정책에 동의하게 됩니다.',
    },
    profile: {
        title: '내 프로필',
        personalInfo: '개인 정보',
        viewProfile: '프로필 보기',
        editProfile: '프로필 수정',
        recentActivity: '최근 활동',
        language: '언어',
        notifications: '알림',
        security: '보안',
    },
};

// 베트남어 번역 / Bản dịch tiếng Việt / Vietnamese translations
export const vi: Translations = {
    nav: {
        dashboard: 'Bảng điều khiển',
        bookTeeTime: 'Đặt Tee Time',
        membership: 'Thành viên',
        support: 'Hỗ trợ',
        newBooking: 'Đặt chỗ mới',
    },
    home: {
        heroTitle1: 'Vietnam Golf',
        heroTitle2: 'Đặt chỗ cao cấp',
        heroDescription: 'Trải nghiệm các sân golf hàng đầu với dịch vụ tiêu chuẩn thế giới. Nhanh chóng, đáng tin cậy và giá độc quyền.',
        realtimeBooking: 'Hệ thống đặt chỗ thời gian thực',
        location: 'Địa điểm',
        date: 'Ngày',
        search: 'Tìm kiếm',
        popularCourses: 'Sân golf phổ biến',
        popularCoursesDesc: 'Các sân được đặt nhiều nhất bởi golfer tuần này',
        viewAll: 'Xem tất cả',
        startingFrom: 'Bắt đầu từ',
        recommended: 'Đề xuất',
        trustTitle1: 'Đặt trong 10 giây',
        trustDesc1: 'Kiểm tra tình trạng trống thời gian thực được kết nối trực tiếp với hệ thống sân golf.',
        trustTitle2: 'Hỗ trợ đa ngôn ngữ',
        trustDesc2: 'Dịch vụ khách hàng 24/7 có sẵn bằng nhiều ngôn ngữ.',
        trustTitle3: 'Đảm bảo giá tốt nhất',
        trustDesc3: 'Giá độc quyền cho thành viên. Không có phí đặt chỗ ẩn.',
        allLocations: 'Tất cả địa điểm',
    },
    dashboard: {
        title: 'Đặt chỗ của tôi',
        description: 'Quản lý tee time sắp tới và xem các trận đấu đã qua.',
        upcoming: 'Sắp tới',
        pastHistory: 'Lịch sử',
        totalGames: 'Tổng số trận',
        upcomingGames: 'Sắp tới',
        points: 'Điểm',
        membership: 'Thành viên',
        nextTeeTime: 'Tee Time tiếp theo',
        confirmed: 'Đã xác nhận',
        pending: 'Đang chờ',
        players: 'Người chơi',
        cancel: 'Hủy',
        viewTicket: 'Xem vé',
        upcomingReservations: 'Đặt chỗ sắp tới',
        quickActions: 'Thao tác nhanh',
        bookNewTeeTime: 'Đặt Tee Time mới',
        exploreCourses: 'Khám phá sân golf tại Việt Nam',
        viewPastReceipts: 'Xem hóa đơn đã qua',
        downloadInvoices: 'Tải hóa đơn',
        forecast: 'Dự báo cho',
        sunny: 'Nắng',
        humidity: 'Độ ẩm',
        thisMonth: 'tháng này',
        nextDate: 'Tiếp theo',
        pointsPending: 'đang chờ',
        toTier: 'để đạt',
    },
    courseList: {
        mapView: 'Xem bản đồ',
        region: 'Khu vực',
        dateTime: 'Ngày & Giờ',
        availableCourses: 'Sân golf có sẵn',
        showingBestMatches: 'Hiển thị kết quả phù hợp nhất ở Miền Trung',
        sortBy: 'Sắp xếp theo: Đề xuất',
        slotsAvailable: 'Còn chỗ',
        holes: 'Hố',
        book: 'Đặt',
        deal: 'Ưu đãi',
    },
    courseDetail: {
        premiumPartner: 'Đối tác cao cấp',
        verified: 'Đã xác minh',
        showOnMap: 'Hiện trên bản đồ',
        aboutCourse: 'Về sân golf',
        facilities: 'Tiện nghi & Dịch vụ',
        bookTeeTime: 'Đặt Tee Time',
        instantConfirmation: 'Xác nhận ngay lập tức',
        selectDate: 'Chọn ngày',
        availableSlots: 'Giờ có sẵn',
        greenFee: 'Phí sân (18 hố)',
        caddieCart: 'Caddie & Xe (Dùng chung)',
        totalAmount: 'Tổng cộng',
        bookNow: 'Đặt ngay',
        courseNotFound: 'Không tìm thấy sân golf.',
        internationalStandard: 'Sân golf tiêu chuẩn quốc tế',
        aboutDescription: 'Được thiết kế theo tiêu chuẩn quốc tế, sân golf này mang đến thử thách độc đáo tại Việt Nam. Với green nguyên sơ, bunker được đặt chiến lược và bố cục tuyệt đẹp chạy qua cảnh quan tự nhiên. Thường xuyên được xếp hạng trong số các sân golf hàng đầu khu vực.',
    },
    checkout: {
        title: 'Thanh toán',
        description: 'Hoàn tất đặt chỗ an toàn tại Twin Doves Golf Club',
        date: 'Ngày',
        time: 'Giờ',
        golfers: 'Golfer',
        priceBreakdown: 'Chi tiết giá',
        greenFeeMultiple: 'Phí sân (x4)',
        caddieCartMultiple: 'Caddie & Xe (x4)',
        serviceCharge: 'Phí dịch vụ',
        totalAmount: 'Tổng cộng',
        paymentMethod: 'Phương thức thanh toán',
        card: 'Thẻ',
        cardNumber: 'Số thẻ',
        expiryDate: 'Ngày hết hạn',
        cvc: 'CVC',
        pay: 'Thanh toán',
        secureNote: 'Được xử lý an toàn qua SSL. Bằng việc thanh toán, bạn đồng ý với điều khoản.',
    },
    confirmation: {
        title: 'Đặt chỗ đã xác nhận!',
        description: 'Tee time của bạn đã được đảm bảo thành công. Sẵn sàng cho trải nghiệm golf cao cấp.',
        bookingReference: 'Mã đặt chỗ',
        copyCode: 'Sao chép mã',
        addToCalendar: 'Thêm vào lịch',
        returnToDashboard: 'Quay lại bảng điều khiển',
    },
    footer: {
        description: 'Cách dễ nhất để đặt sân golf cao cấp tại Việt Nam. Được hàng nghìn golfer quốc tế tin tưởng.',
        company: 'Công ty',
        aboutUs: 'Về chúng tôi',
        careers: 'Tuyển dụng',
        press: 'Báo chí',
        legal: 'Pháp lý',
        terms: 'Điều khoản dịch vụ',
        privacy: 'Chính sách bảo mật',
        rights: '© 2023 GolfViet Inc. Tất cả quyền được bảo lưu.',
    },
    common: {
        vietnam: 'Việt Nam',
        loading: 'Đang tải...',
        error: 'Lỗi',
        success: 'Thành công',
        details: 'Chi tiết',
        reschedule: 'Đổi lịch',
        am: 'Sáng',
        pm: 'Chiều',
        twilight: 'Hoàng hôn',
    },
    cities: {
        hanoi: 'Hà Nội',
        daNang: 'Đà Nẵng',
        hoChiMinh: 'Hồ Chí Minh',
        nhaTrang: 'Nha Trang',
        binhDuong: 'Bình Dương',
        vungTau: 'Vũng Tàu',
    },
    courseTypes: {
        parkland: 'Công viên',
        dunes: 'Đồi cát',
        urban: 'Đô thị',
        links: 'Ven biển',
    },
    auth: {
        login: 'Đăng nhập',
        register: 'Đăng ký',
        guest: 'Đăng nhập / Đăng kí',
        logout: 'Đăng xuất',
        welcomeBack: 'Chào mừng trở lại',
        pleaseLogin: 'Đăng nhập để tiếp tục',
        emailOrPhone: 'Email hoặc Số điện thoại',
        password: 'Mật khẩu',
        forgotPassword: 'Quên mật khẩu?',
        orContinueWith: 'Hoặc tiếp tục với',
        noAccount: 'Chưa có tài khoản?',
        registerNow: 'Đăng ký ngay',
        haveAccount: 'Đã có tài khoản?',
        loginNow: 'Đăng nhập ngay',
        createAccount: 'Tạo tài khoản',
        joinCommunity: 'Tham gia cộng đồng GolfViet',
        fullName: 'Họ và tên',
        iam: 'Tôi là',
        player: 'Người chơi',
        owner: 'Chủ sân',
        agreeTerms: 'Bằng cách đăng ký, bạn đồng ý với Điều khoản và Chính sách của chúng tôi.',
    },
    profile: {
        title: 'Hồ sơ của tôi',
        personalInfo: 'Thông tin cá nhân',
        viewProfile: 'Xem hồ sơ',
        editProfile: 'Chỉnh sửa hồ sơ',
        recentActivity: 'Hoạt động gần đây',
        language: 'Ngôn ngữ',
        notifications: 'Thông báo',
        security: 'Bảo mật',
    },
};

// 영어 번역 / Bản dịch tiếng Anh / English translations
export const en: Translations = {
    nav: {
        dashboard: 'Dashboard',
        bookTeeTime: 'Book Tee Time',
        membership: 'Membership',
        support: 'Support',
        newBooking: 'New Booking',
    },
    home: {
        heroTitle1: 'Vietnam Golf',
        heroTitle2: 'Premium Booking',
        heroDescription: 'Experience top-tier courses with world-standard service. Fast, reliable, and exclusive rates.',
        realtimeBooking: 'Real-time Booking System',
        location: 'Location',
        date: 'Date',
        search: 'Search',
        popularCourses: 'Popular Courses',
        popularCoursesDesc: 'Most booked courses by golfers this week',
        viewAll: 'View All',
        startingFrom: 'Starting From',
        recommended: 'Recommended',
        trustTitle1: 'Book in 10 Seconds',
        trustDesc1: 'Real-time availability directly connected to the golf course systems.',
        trustTitle2: 'Multilingual Support',
        trustDesc2: '24/7 customer service available in multiple languages.',
        trustTitle3: 'Best Price Guarantee',
        trustDesc3: 'Exclusive rates for members. No hidden booking fees.',
        allLocations: 'All Locations',
    },
    dashboard: {
        title: 'My Bookings',
        description: 'Manage your upcoming tee times and view past games.',
        upcoming: 'Upcoming',
        pastHistory: 'Past History',
        totalGames: 'Total Games',
        upcomingGames: 'Upcoming',
        points: 'Points',
        membership: 'Membership',
        nextTeeTime: 'Next Tee Time',
        confirmed: 'Confirmed',
        pending: 'Pending',
        players: 'Players',
        cancel: 'Cancel',
        viewTicket: 'View Ticket',
        upcomingReservations: 'Upcoming Reservations',
        quickActions: 'Quick Actions',
        bookNewTeeTime: 'Book New Tee Time',
        exploreCourses: 'Explore courses in Vietnam',
        viewPastReceipts: 'View Past Receipts',
        downloadInvoices: 'Download invoices',
        forecast: 'Forecast for',
        sunny: 'Sunny',
        humidity: 'Humidity',
        thisMonth: 'this month',
        nextDate: 'Next',
        pointsPending: 'pending',
        toTier: 'to',
    },
    courseList: {
        mapView: 'Map View',
        region: 'Region',
        dateTime: 'Date & Time',
        availableCourses: 'Available Courses',
        showingBestMatches: 'Showing best matches in Central Vietnam',
        sortBy: 'Sort by: Recommended',
        slotsAvailable: 'Slots Available',
        holes: 'Holes',
        book: 'Book',
        deal: 'Deal',
    },
    courseDetail: {
        premiumPartner: 'Premium Partner',
        verified: 'Verified',
        showOnMap: 'Show on Map',
        aboutCourse: 'About the Course',
        facilities: 'Facilities & Amenities',
        bookTeeTime: 'Book Tee Time',
        instantConfirmation: 'Instant Confirmation',
        selectDate: 'Select Date',
        availableSlots: 'Available Slots',
        greenFee: 'Green Fee (18 Holes)',
        caddieCart: 'Caddie & Cart (Shared)',
        totalAmount: 'Total Amount',
        bookNow: 'Book Now',
        courseNotFound: 'Course not found.',
        internationalStandard: 'International Standard Course',
        aboutDescription: 'Designed to international standards, this course offers a unique challenge in Vietnam. Featuring pristine greens, strategically placed bunkers, and a stunning layout that flows through natural landscapes. It is frequently ranked among the top golf courses in the region.',
    },
    checkout: {
        title: 'Checkout',
        description: 'Securely finalize your reservation at Twin Doves Golf Club',
        date: 'Date',
        time: 'Time',
        golfers: 'Golfers',
        priceBreakdown: 'Price Breakdown',
        greenFeeMultiple: 'Green Fee (x4)',
        caddieCartMultiple: 'Caddie & Cart (x4)',
        serviceCharge: 'Service Charge',
        totalAmount: 'Total Amount',
        paymentMethod: 'Payment Method',
        card: 'Card',
        cardNumber: 'Card Number',
        expiryDate: 'Expiry Date',
        cvc: 'CVC',
        pay: 'Pay',
        secureNote: 'Securely processed via SSL. By paying you agree to terms.',
    },
    confirmation: {
        title: 'Booking Confirmed!',
        description: 'Your tee time is successfully secured. Get ready for a premium golfing experience.',
        bookingReference: 'Booking Reference',
        copyCode: 'Copy Code',
        addToCalendar: 'Add to Calendar',
        returnToDashboard: 'Return to Dashboard',
    },
    footer: {
        description: 'The easiest way to book premium golf courses in Vietnam. Trusted by thousands of international golfers.',
        company: 'Company',
        aboutUs: 'About Us',
        careers: 'Careers',
        press: 'Press',
        legal: 'Legal',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        rights: '© 2023 GolfViet Inc. All rights reserved.',
    },
    common: {
        vietnam: 'Vietnam',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        details: 'Details',
        reschedule: 'Reschedule',
        am: 'AM',
        pm: 'PM',
        twilight: 'Twilight',
    },
    cities: {
        hanoi: 'Hanoi',
        daNang: 'Da Nang',
        hoChiMinh: 'Ho Chi Minh City',
        nhaTrang: 'Nha Trang',
        binhDuong: 'Binh Duong',
        vungTau: 'Vung Tau',
    },
    courseTypes: {
        parkland: 'Parkland',
        dunes: 'Dunes',
        urban: 'Urban',
        links: 'Links',
    },
    auth: {
        login: 'Login',
        register: 'Register',
        guest: 'Login / Register',
        logout: 'Logout',
        welcomeBack: 'Welcome Back',
        pleaseLogin: 'Login to continue',
        emailOrPhone: 'Email or Phone',
        password: 'Password',
        forgotPassword: 'Forgot password?',
        orContinueWith: 'Or continue with',
        noAccount: "Don't have an account?",
        registerNow: 'Register now',
        haveAccount: 'Already have an account?',
        loginNow: 'Login now',
        createAccount: 'Create Account',
        joinCommunity: 'Join the GolfViet community',
        fullName: 'Full Name',
        iam: 'I am a',
        player: 'Player',
        owner: 'Course Owner',
        agreeTerms: 'By signing up, you agree to our Terms and Privacy Policy.',
    },
    profile: {
        title: 'My Profile',
        personalInfo: 'Personal Information',
        viewProfile: 'View Profile',
        editProfile: 'Edit Profile',
        recentActivity: 'Recent Activity',
        language: 'Language',
        notifications: 'Notifications',
        security: 'Security',
    },
};

// 모든 번역 객체를 포함하는 맵 / Map chứa tất cả các đối tượng dịch / Map containing all translation objects
export const translations: Record<Language, Translations> = {
    ko,
    vi,
    en,
};
