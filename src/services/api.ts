import { supabase } from '../lib/supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

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

  async googleLogin(code: string) {
    const data = await this.request('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
    if (data.token) localStorage.setItem('auth_token', data.token);
    return data;
  }

  async handleSocialAuth(session: any) {
    // Sync with backend to get our own JWT token
    const data = await this.request('/auth/social-login', {
      method: 'POST',
      body: JSON.stringify({
        email: session.user.email,
        full_name: session.user.user_metadata.full_name,
        avatar_url: session.user.user_metadata.avatar_url,
        provider: session.user.app_metadata.provider,
        id: session.user.id
      }),
    });
    if (data.token) localStorage.setItem('auth_token', data.token);
    return data;
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

  async getMyBookings() {
    return this.request('/bookings/my');
  }
}

export const apiService = new ApiService();
