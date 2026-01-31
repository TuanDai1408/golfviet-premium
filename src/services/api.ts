import { supabase } from '../lib/supabase';

const API_URL = import.meta.env.VITE_API_URL || 'https://golfviet-premium-backend-production.up.railway.app/api';

class ApiService {
  constructor() {
    console.log('ApiService initialized with API_URL:', API_URL);
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    console.log('API Request:', `${API_URL}${endpoint}`, options); // Debug log

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") === -1) {
      const text = await response.text();
      console.error('API Error: Expected JSON but got:', text);
      throw new Error(`Unexpected content type: ${contentType}. Body: ${text.substring(0, 100)}...`);
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Something went wrong');
    }

    return response.json();
  }

  // Auth
  async login(credentials: any) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (data.token) localStorage.setItem('auth_token', data.token);
    return data;
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Social Auth
  async signInWithSocial(provider: 'google' | 'facebook' | 'zalo') {
    if (provider === 'zalo') {
      // Zalo requires custom redirect
      const zaloAppId = import.meta.env.VITE_ZALO_APP_ID;
      const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
      window.location.href = `https://oauth.zaloapp.com/v4/permission?app_id=${zaloAppId}&redirect_uri=${redirectUri}&state=zalo`;
      return;
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  }


  async handleSocialAuth(session: any) {
    // Sync with backend to get our own JWT token
    const data = await this.request('/auth/social-login', {
      method: 'POST',
      body: JSON.stringify({
        email: session.user.email,
        full_name: session.user.user_metadata.full_name || session.user.user_metadata.name,
        avatar_url: session.user.user_metadata.avatar_url || session.user.user_metadata.picture,
        provider: session.user.app_metadata.provider,
        id: session.user.id
      }),
    });
    if (data.token) localStorage.setItem('auth_token', data.token);
    return data;
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(userData: { full_name?: string; phone?: string; avatar_url?: string }) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async changePassword(passwords: any) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwords),
    });
  }



  logout() {
    localStorage.removeItem('auth_token');
    supabase.auth.signOut();
  }

  // Courses
  async getCourses() {
    return this.request('/courses');
  }

  async getCourseById(id: string) {
    return this.request(`/courses/${id}`);
  }

  async getTeeTimes(courseId: string, date: string) {
    return this.request(`/courses/${courseId}/tee-times?date=${date}`);
  }

  // Bookings
  async createBooking(bookingData: any) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async lockBooking(bookingData: any) {
    return this.request('/bookings/lock', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async bookPayLater(bookingData: any) {
    return this.request('/bookings/pay-later', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async confirmBooking(bookingId: string) {
    return this.request(`/bookings/${bookingId}/confirm`, {
      method: 'PUT',
    });
  }

  async getMyBookings() {
    return this.request('/bookings/my');
  }

  async getBookingById(id: string) {
    return this.request(`/bookings/${id}`);
  }

  async cancelBooking(id: string) {
    return this.request(`/bookings/${id}/cancel`, {
      method: 'PUT',
    });
  }

  async rescheduleBooking(id: string, data: { tee_time_instance_id: string, play_date: string, tee_time: string }) {
    return this.request(`/bookings/${id}/reschedule`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();
