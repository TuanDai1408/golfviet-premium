import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { apiService } from '../services/api';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Handle Zalo callback if it's in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const state = urlParams.get('state');
        
        if (state === 'zalo') {
          const code = urlParams.get('code');
          // Handle Zalo code... for now we'll just redirect to dashboard 
          // or error since we need backend Zalo logic
          navigate('/');
          return;
        }

        // Handle Supabase (Google/Facebook)
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (session) {
          // Sync with our backend
          await apiService.handleSocialAuth(session);
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        navigate('/login?error=auth_failed');
      }
    };

    handleAuth();
  }, [navigate]);

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
