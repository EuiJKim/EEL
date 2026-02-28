'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { ShoppingBag, LogOut, ChevronDown } from 'lucide-react';

interface Profile {
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, email')
        .eq('id', user.id)
        .single();

      setProfile(data ?? { full_name: null, avatar_url: null, email: user.email ?? null });
    }
    fetchUser();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setProfile(null);
    setOpen(false);
    router.refresh();
  }

  return (
    <div
      className="fixed top-4 inset-x-4 z-50 flex items-center justify-between max-w-5xl mx-auto px-4 py-2"
      style={{
        background: 'rgba(10,10,10,0.8)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '40px',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Left: Brand */}
      <Link
        href="/"
        className="text-sm font-bold tracking-[0.15em] uppercase text-zinc-300 hover:text-white transition-colors"
      >
        EEL
      </Link>

      {/* Center: Nav links */}
      <nav className="hidden sm:flex items-center gap-1">
        <Link
          href="/products"
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            pathname === '/products' || pathname.startsWith('/products/')
              ? 'text-white bg-white/10'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          제품
        </Link>
        <Link
          href="/#build"
          className="px-4 py-1.5 rounded-full text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          주문하기
        </Link>
      </nav>

      {/* Right: Auth */}
      <AnimatePresence mode="wait">
        {profile ? (
          <motion.div key="user" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 10px 5px 5px',
                borderRadius: '40px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
              }}
            >
              {profile.avatar_url ? (
                <Image src={profile.avatar_url} alt="" width={24} height={24} className="rounded-full object-cover" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-white">
                  {(profile.full_name ?? profile.email ?? '?')[0].toUpperCase()}
                </div>
              )}
              <span className="text-xs text-zinc-300 font-medium max-w-[80px] truncate hidden sm:block">
                {profile.full_name ?? profile.email}
              </span>
              <ChevronDown size={13} className={`text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    minWidth: '180px',
                    maxWidth: 'calc(100vw - 32px)',
                    background: 'linear-gradient(135deg, rgba(30,30,30,0.95) 0%, rgba(20,20,20,0.95) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '6px',
                    backdropFilter: 'blur(24px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  <button
                    onClick={() => { router.push('/orders'); setOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:bg-white/6 transition-colors"
                  >
                    <ShoppingBag size={15} className="text-zinc-500" />
                    내 주문 내역
                  </button>
                  <div className="h-px bg-white/6 my-1" />
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/8 transition-colors"
                  >
                    <LogOut size={15} />
                    로그아웃
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.button
            key="login"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => router.push('/auth')}
            style={{
              padding: '6px 14px',
              borderRadius: '40px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            로그인
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
