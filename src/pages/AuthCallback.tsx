import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // ... zalo code ...

        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (session) {
          const data = await apiService.handleSocialAuth(session);
          login(data.token, data.user);
          showToast('Đăng nhập thành công!', 'success');
          navigate('/');
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        showToast('Đăng nhập thất bại. Vui lòng thử lại.', 'error');
        navigate('/login');
      }
    };
    handleAuth();
  }, [navigate, login, showToast]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] text-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="mb-4"
      >
        <Loader2 size={48} className="text-green-500" />
      </motion.div>
      <h2 className="text-xl font-medium">Đang xác thực...</h2>
      <p className="text-gray-400 mt-2">Vui lòng chờ trong giây lát</p>
    </div>
  );
};

export default AuthCallback;
