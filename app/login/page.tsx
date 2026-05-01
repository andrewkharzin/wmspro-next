// app/login/page.tsx
'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthPages from '@/components/account/AuthPages';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FDFDFF]">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-slate-500 font-medium">Loading secure session...</p>
        </div>
      </div>
    );
  }

  return <AuthPages />;
}