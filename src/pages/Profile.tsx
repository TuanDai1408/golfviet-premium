import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Bell, Globe, Camera } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Vui lòng đăng nhập để xem hồ sơ.</p>
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
                  src={user.avatar_url || 'https://ui-avatars.com/api/?background=ffffff&color=999&name=?&size=128'}
                  alt={user.full_name || user.email}
                  className="size-24 rounded-2xl object-cover border-4 border-white dark:border-[#161b22] shadow-lg"
                />
                <button className="absolute bottom-1 right-1 p-1.5 bg-white dark:bg-[#30363d] rounded-lg shadow-md border border-gray-100 dark:border-white/10 text-gray-500 hover:text-primary transition-colors">
                  <Camera size={14} />
                </button>
              </div>
            </div>

            <div className="pt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.full_name || user.email.split('@')[0]}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-1">
                  <Mail size={14} />
                  {user.email}
                </p>
              </div>
              <button className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-black text-sm font-bold rounded-xl transition-all shadow-lg shadow-primary/20">
                {t.profile.editProfile}
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold flex items-center gap-2 dark:text-white">
                  <User size={18} className="text-primary" />
                  {t.profile.personalInfo}
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-[#0d1117] rounded-2xl border border-gray-100 dark:border-white/5">
                    <p className="text-xs text-gray-400 mb-1">{t.auth.fullName}</p>
                    <p className="font-medium dark:text-white">{user.full_name || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-[#0d1117] rounded-2xl border border-gray-100 dark:border-white/5">
                    <p className="text-xs text-gray-400 mb-1">Email</p>
                    <p className="font-medium dark:text-white">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Settings/Options */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold flex items-center gap-2 dark:text-white">
                  <Shield size={18} className="text-primary" />
                  Cài đặt tài khoản
                </h2>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl transition-colors text-left group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                        <Globe size={18} />
                      </div>
                      <span className="font-medium dark:text-gray-200">{t.profile.language}</span>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-primary transition-colors material-symbols-outlined">chevron_right</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl transition-colors text-left group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                        <Bell size={18} />
                      </div>
                      <span className="font-medium dark:text-gray-200">{t.profile.notifications}</span>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-primary transition-colors material-symbols-outlined">chevron_right</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl transition-colors text-left group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                        <Shield size={18} />
                      </div>
                      <span className="font-medium dark:text-gray-200">{t.profile.security}</span>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-primary transition-colors material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
