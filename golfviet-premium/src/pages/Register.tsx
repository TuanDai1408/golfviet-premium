import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Phone, User, Chrome, Facebook, UserPlus, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';

const Register: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    role: 'customer'
  });
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'zalo') => {
    setSocialLoading(provider);
    setError('');
    try {
      await apiService.signInWithSocial(provider);
    } catch (err: any) {
      setError(err.message || `Failed to login with ${provider}`);
      setSocialLoading(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiService.register(formData);
      navigate('/login');
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
              <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 transition-colors w-5 h-5" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 ml-1">{t.dashboard.players}</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 transition-colors w-5 h-5" />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0xxxxxxxxx"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 ml-1">{t.auth.iam}</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 transition-colors w-5 h-5" />
                <select 
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1f26] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all appearance-none"
                >
                  <option value="customer">{t.auth.player}</option>
                  <option value="owner">{t.auth.owner}</option>
                </select>
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

        <div className="grid grid-cols-3 gap-3">
          <motion.button 
            whileHover={{ y: -2 }} 
            onClick={() => handleSocialLogin('google')}
            disabled={!!socialLoading}
            className={`flex items-center justify-center bg-white/5 border border-white/10 py-2.5 rounded-xl hover:bg-white/10 transition-all ${socialLoading === 'google' ? 'opacity-50' : ''}`}
          >
            <Chrome className="w-5 h-5 text-red-500" />
          </motion.button>
          <motion.button 
            whileHover={{ y: -2 }} 
            onClick={() => handleSocialLogin('facebook')}
            disabled={!!socialLoading}
            className={`flex items-center justify-center bg-white/5 border border-white/10 py-2.5 rounded-xl hover:bg-white/10 transition-all ${socialLoading === 'facebook' ? 'opacity-50' : ''}`}
          >
            <Facebook className="w-5 h-5 text-blue-500" />
          </motion.button>
          <motion.button 
            whileHover={{ y: -2 }} 
            onClick={() => handleSocialLogin('zalo')}
            disabled={!!socialLoading}
            className={`flex items-center justify-center bg-white/5 border border-white/10 py-2.5 rounded-xl hover:bg-white/10 transition-all ${socialLoading === 'zalo' ? 'opacity-50' : ''}`}
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-600 font-bold text-[10px] text-white">Z</div>
          </motion.button>
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
