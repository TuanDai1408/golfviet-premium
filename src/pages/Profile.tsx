import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Bell, Globe, Camera, Phone, Lock, Check, X, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';
import { useToast } from '../contexts/ToastContext';

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    full_name: user?.full_name || '',
    phone: user?.phone || ''
  });

  const [showLanguageModal, setShowLanguageModal] = React.useState(false);
  const [showPasswordModal, setShowPasswordModal] = React.useState(false);
  const [passwordData, setPasswordData] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = React.useState(false);

  const { language, setLanguage } = useLanguage();

  // Sync formData with user object when it's updated (e.g., from fetch)
  React.useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.full_name) {
      showToast(t.toasts.nameRequired, 'error');
      return;
    }

    setLoading(true);
    try {
      await apiService.updateProfile(formData);
      showToast(t.toasts.profileUpdated, 'success');
      updateUser({ ...user, ...formData });
      setIsEditing(false);
    } catch (err: any) {
      showToast(err.message || t.toasts.error, 'error');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setFormData({
      full_name: user?.full_name || '',
      phone: user?.phone || ''
    });
    setIsEditing(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast(t.toasts.passwordMismatch, 'error');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      showToast(t.toasts.passwordTooShort, 'error');
      return;
    }

    setPasswordLoading(true);
    try {
      await apiService.changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      });
      showToast(t.toasts.passwordChanged, 'success');
      setShowPasswordModal(false);
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      showToast(err.message || t.toasts.error, 'error');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">{t.profile.loginToViewProfile}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#f8fafc] dark:bg-[#0d1117]">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#161b22] rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-white/5"
        >
          {/* Header/Cover */}
          <div className="h-32 bg-gradient-to-r from-primary/20 to-primary-dark/20 dark:from-primary/10 dark:to-primary-dark/10" />

          <div className="px-8 pb-8 relative">
            {/* Avatar */}
            <div className="absolute -top-12 left-8">
              <div className="relative">
                <img
                  src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || user.phone || '?')}&background=10b981&color=fff&size=128&bold=true`}
                  alt={user.full_name || user.email || user.phone}
                  className="size-24 rounded-2xl object-cover border-4 border-white dark:border-[#161b22] shadow-xl"
                />
                <button className="absolute bottom-1 right-1 p-2 bg-primary hover:bg-primary-dark rounded-xl shadow-lg border border-white/20 text-black shadow-primary/20 transition-all active:scale-95">
                  <Camera size={16} />
                </button>
              </div>
            </div>

            <div className="pt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3 max-w-md">
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary w-5 h-5 transition-colors" />
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        placeholder={t.auth.fullName}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary/50 transition-all font-semibold text-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {user.full_name || (user.email ? user.email.split('@')[0] : user.phone)}
                  </h1>
                )}
                <div className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-2 font-medium">
                  {user.email && (
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-gray-100 dark:bg-white/5 rounded-md">
                        <Mail size={14} className="text-gray-400" />
                      </div>
                      <span className="text-sm">{user.email}</span>
                    </div>
                  )}
                  {isEditing ? (
                    <div className="relative group ml-0 mt-2 max-w-md w-full">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary w-4 h-4 transition-colors" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t.profile.phoneNumber}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-gray-600 dark:text-gray-300 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                      />
                    </div>
                  ) : !user.email && (
                    <>
                      <div className="p-1 bg-gray-100 dark:bg-white/5 rounded-md">
                        <Phone size={14} className="text-gray-400" />
                      </div>
                      {user.phone}
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={cancelEdit}
                      disabled={loading}
                      className="px-5 py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 text-sm font-bold rounded-2xl transition-all flex items-center gap-2"
                    >
                      <X size={18} />
                      {t.profile.cancel}
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-8 py-3 bg-primary hover:bg-primary-dark text-black text-sm font-bold rounded-2xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] flex items-center gap-2 disabled:opacity-50"
                    >
                      {loading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                      {t.profile.saveChanges}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="px-6 py-3 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 text-sm font-bold rounded-2xl transition-all border border-gray-100 dark:border-white/10 shadow-sm"
                    >
                      {t.nav.dashboard}
                    </button>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-3 bg-primary hover:bg-primary-dark text-black text-sm font-bold rounded-2xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {t.profile.editProfile}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                  <div className="p-2 bg-emerald-500/10 rounded-xl">
                    <User size={20} className="text-emerald-500" />
                  </div>
                  {t.profile.personalInfo}
                </h2>
                <div className="space-y-3">
                  <div className="p-5 bg-gray-50/50 dark:bg-[#0d1117] rounded-2xl border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 transition-colors group">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 group-hover:text-emerald-500 transition-colors">{t.auth.fullName}</p>
                    <p className="font-semibold text-lg dark:text-white">{user.full_name || 'N/A'}</p>
                  </div>
                  <div className="p-5 bg-gray-50/50 dark:bg-[#0d1117] rounded-2xl border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 transition-colors group">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 group-hover:text-emerald-500 transition-colors">Email / Phone</p>
                    <p className="font-semibold text-lg dark:text-white">{user.email || user.phone}</p>
                  </div>
                </div>
              </div>

              {/* Settings/Options */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Shield size={20} className="text-primary" />
                  </div>
                  {t.profile.accountSettings}
                </h2>
                <div className="space-y-2">
                  {[
                    {
                      icon: Globe,
                      label: t.profile.language,
                      color: 'text-blue-500',
                      bg: 'bg-blue-500/10',
                      onClick: () => setShowLanguageModal(true),
                      value: language === 'vi' ? 'Tiếng Việt' : language === 'ko' ? '한국어' : 'English'
                    },
                    {
                      icon: Lock,
                      label: t.profile.changePassword,
                      color: 'text-purple-500',
                      bg: 'bg-purple-500/10',
                      onClick: () => setShowPasswordModal(true)
                    }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.onClick}
                      className="w-full flex items-center justify-between p-4 px-5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl transition-all text-left group border border-transparent hover:border-gray-100 dark:hover:border-white/5"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 ${item.bg} ${item.color} rounded-xl shadow-sm`}>
                          <item.icon size={20} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold dark:text-gray-200">{item.label}</span>
                          {item.value && <span className="text-xs text-gray-400 font-medium">{item.value}</span>}
                        </div>
                      </div>
                      <span className="text-gray-300 dark:text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all material-symbols-outlined">chevron_right</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowLanguageModal(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white dark:bg-[#161b22] w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10"
          >
            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-bold dark:text-white">{t.profile.selectLanguage}</h3>
              <button onClick={() => setShowLanguageModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-3">
              {[
                { id: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
                { id: 'ko', label: '한국어', flag: '🇰🇷' },
                { id: 'en', label: 'English', flag: '🇺🇸' }
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    setLanguage(lang.id as any);
                    setShowLanguageModal(false);
                    showToast(t.toasts.languageChanged, 'info');
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${language === lang.id
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-bold">{lang.label}</span>
                  </div>
                  {language === lang.id && <Check size={20} />}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowPasswordModal(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white dark:bg-[#161b22] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10"
          >
            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-bold dark:text-white">{t.profile.changePassword}</h3>
              <button onClick={() => setShowPasswordModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 ml-1">{t.profile.currentPassword}</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary w-5 h-5 transition-colors" />
                  <input
                    type="password"
                    required
                    value={passwordData.oldPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 ml-1">{t.profile.newPassword}</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary w-5 h-5 transition-colors" />
                  <input
                    type="password"
                    required
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 ml-1">{t.profile.confirmNewPassword}</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary w-5 h-5 transition-colors" />
                  <input
                    type="password"
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-6 py-3.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 text-sm font-bold rounded-2xl transition-all"
                >
                  {t.profile.cancel}
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 px-6 py-3.5 bg-primary hover:bg-primary-dark text-black text-sm font-bold rounded-2xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {passwordLoading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                  {t.profile.update}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;
