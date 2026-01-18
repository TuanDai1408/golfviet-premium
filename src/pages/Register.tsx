import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Phone, User, Chrome, Facebook, UserPlus, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { apiService } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { user, loading: authLoading, login } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      setSocialLoading('google');
      try {
        const { token, user } = await apiService.googleLogin(codeResponse.code);
        login(token, user);
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.message || 'Google Login Failed');
      } finally {
        setSocialLoading(null);
      }
    },
    onError: () => {
      setError('Google Login Failed');
      setSocialLoading(null);
    }
  });

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    if (provider === 'google') {
      return googleLogin();
    }

    setSocialLoading(provider);
    setError('');

    try {
      if (provider !== 'facebook') {
        await apiService.signInWithSocial(provider);
      }
    } catch (err: any) {
      setError(err.message || `Failed to login with ${provider}`);
      setSocialLoading(null);
    }
  };

  const handleFacebookSuccess = async (response: any) => {
    console.log('Facebook Login Success Response (Register):', response);
    const accessToken = response.accessToken;
    if (!accessToken) {
      console.error('Facebook accessToken is missing (Register)');
      setError('Facebook Login Failed: No access token');
      return;
    }
    setSocialLoading('facebook');
    try {
      const { token, user } = await apiService.facebookLogin(response.accessToken);
      console.log('Backend Facebook Login Success (Register):', user.full_name);
      login(token, user);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Backend Facebook Login Failed (Register):', err);
      setError(err.message || 'Facebook Login Failed');
    } finally {
      setSocialLoading(null);
    }
  };

  // Validate Vietnam phone number (10-11 digits, starts with 0)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^0\d{9,10}$/;
    if (!phone) {
      setPhoneError('');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setPhoneError(t.toasts.invalidPhone);
      return false;
    }
    setPhoneError('');
    return true;
  };

  // Calculate password strength
  const checkPasswordStrength = (password: string) => {
    if (!password) {
      setPasswordStrength(null);
      setPasswordErrors([]);
      return;
    }

    const errors: string[] = [];

    if (password.length < 8) {
      errors.push(t.auth.atLeast8Chars);
    }
    if (!/[A-Z]/.test(password)) {
      errors.push(t.auth.atLeast1Upper);
    }
    if (!/[a-z]/.test(password)) {
      errors.push(t.auth.atLeast1Lower);
    }
    if (!/\d/.test(password)) {
      errors.push(t.auth.atLeast1Number);
    }

    setPasswordErrors(errors);

    // Calculate strength
    if (errors.length === 0) {
      setPasswordStrength('strong');
    } else if (errors.length <= 2) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('weak');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    if (name === 'phone') {
      validatePhone(value);
    }
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate phone number
    if (!validatePhone(formData.phone)) {
      setLoading(false);
      return;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setError(t.auth.passwordMismatch);
      setLoading(false);
      return;
    }

    // Check password strength
    if (passwordErrors.length > 0) {
      setError(t.auth.passwordStrongCheck);
      setLoading(false);
      return;
    }

    try {
      // Register and get token
      const response = await apiService.register(formData);

      // Auto-login with returned token and user data
      if (response.token && response.user) {
        login(response.token, response.user);
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // Fallback: redirect to login if no token returned
        navigate('/login');
      }
    } catch (err: any) {
      setError(err.message || t.common.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100-h-16)] flex items-center justify-center bg-[#0d1117] relative overflow-hidden font-sans py-12 px-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ rotate: -10, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20"
          >
            <UserPlus className="text-white w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">{t.auth.createAccount}</h2>
          <p className="text-gray-400">{t.auth.joinCommunity}</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl mb-6 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 ml-1">{t.auth.fullName}</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 transition-colors w-5 h-5" />
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 ml-1">{t.auth.phone || 'Số điện thoại'}</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 transition-colors w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0xxxxxxxxx"
                  className={`w-full bg-white/5 border ${phoneError ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all`}
                  required
                />
              </div>
              {phoneError && (
                <p className="text-red-400 text-xs ml-1 mt-1">{phoneError}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 ml-1">{t.auth.password}</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 transition-colors w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full bg-white/5 border ${passwordStrength === 'weak' ? 'border-red-500/50' : passwordStrength === 'medium' ? 'border-yellow-500/50' : passwordStrength === 'strong' ? 'border-green-500/50' : 'border-white/10'} rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all`}
                  required
                />
              </div>
              {passwordStrength && (
                <div className="flex items-center gap-2 ml-1 mt-1">
                  <div className="flex gap-1">
                    <div className={`h-1 w-8 rounded-full ${passwordStrength === 'weak' ? 'bg-red-500' : passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                    <div className={`h-1 w-8 rounded-full ${passwordStrength === 'medium' || passwordStrength === 'strong' ? passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <div className={`h-1 w-8 rounded-full ${passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                  </div>
                  <span className={`text-xs ${passwordStrength === 'weak' ? 'text-red-400' : passwordStrength === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                    {passwordStrength === 'weak' ? t.auth.weak : passwordStrength === 'medium' ? t.auth.medium : t.auth.strong}
                  </span>
                </div>
              )}
              {passwordErrors.length > 0 && (
                <div className="ml-1 mt-1">
                  {passwordErrors.map((err, idx) => (
                    <p key={idx} className="text-red-400 text-xs">• {err}</p>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 ml-1">{t.auth.confirmPassword || 'Nhập lại mật khẩu'}</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 transition-colors w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
            </div>


          </div>

          <p className="text-[11px] text-gray-500 text-center px-4">
            {t.auth.agreeTerms}
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all flex items-center justify-center group"
          >
            {loading ? t.common.loading : (
              <>
                {t.auth.register}
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#0d1117] text-gray-500">{t.auth.orContinueWith}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => handleSocialLogin('google')}
            disabled={!!socialLoading}
            className={`flex items-center justify-center bg-white/5 border border-white/10 py-2.5 rounded-xl hover:bg-white/10 transition-all ${socialLoading === 'google' ? 'opacity-50' : ''}`}
          >
            <Chrome className="w-5 h-5 text-red-500" />
            <span className="ml-2 text-sm text-white font-medium">{socialLoading === 'google' ? '...' : 'Google'}</span>
          </motion.button>
          <FacebookLogin
            appId={import.meta.env.VITE_FACEBOOK_APP_ID || ''}
            onSuccess={handleFacebookSuccess}
            onFail={(error) => {
              console.error('FB Login Error:', error);
              setError('Facebook Login Failed');
              setSocialLoading(null);
            }}
            render={({ onClick }) => (
              <motion.button
                whileHover={{ y: -2 }}
                onClick={onClick}
                disabled={!!socialLoading}
                className={`flex items-center justify-center bg-white/5 border border-white/10 py-2.5 rounded-xl hover:bg-white/10 transition-all ${socialLoading === 'facebook' ? 'opacity-50' : ''}`}
              >
                <Facebook className="w-5 h-5 text-blue-500" />
                <span className="ml-2 text-sm text-white font-medium">{socialLoading === 'facebook' ? '...' : 'Facebook'}</span>
              </motion.button>
            )}
          />
        </div>

        <p className="mt-8 text-center text-gray-400 text-sm">
          {t.auth.haveAccount}{' '}
          <Link to="/login" className="text-green-400 font-bold hover:underline">{t.auth.loginNow}</Link>
        </p>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>
    </div>
  );
};

export default Register;
