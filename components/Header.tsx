'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setProfile(null);
    setOpen(false);
    setMobileOpen(false);
    router.refresh();
  }

  const navLink = 'text-[11px] tracking-[0.25em] uppercase text-zinc-500 hover:text-white transition-colors duration-200 min-h-[44px] flex items-center';
  const activeLink = 'text-[11px] tracking-[0.25em] uppercase text-white min-h-[44px] flex items-center';

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 sm:px-8 py-5 sm:py-6 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06]' : ''}`}>
        {/* Left: Brand */}
        <Link href="/" className="text-[11px] font-bold tracking-[0.35em] uppercase text-white hover:text-zinc-300 transition-colors min-h-[44px] flex items-center">
          EEL
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-10">
          <Link
            href="/products"
            className={pathname === '/products' || pathname.startsWith('/products/') ? activeLink : navLink}
          >
            Works
          </Link>
          <Link
            href="/order"
            className={navLink}
          >
            Order
          </Link>
        </nav>

        {/* Right: Auth (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-3">
          {/* Desktop auth */}
          <div className="relative hidden sm:block">
            <AnimatePresence mode="wait">
              {profile ? (
                <motion.div key="user" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <button
                    onClick={() => setOpen((v) => !v)}
                    className="flex items-center gap-2 min-h-[44px] px-2"
                  >
                    {profile.avatar_url ? (
                      <Image src={profile.avatar_url} alt="" width={20} height={20} className="rounded-full object-cover" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] font-bold text-white">
                        {(profile.full_name ?? profile.email ?? '?')[0].toUpperCase()}
                      </div>
                    )}
                    <span className="text-[11px] tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors">
                      {(profile.full_name ?? profile.email ?? '').split(' ')[0]}
                    </span>
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-44 bg-[#111] border border-white/8 py-1"
                        style={{ borderRadius: 2 }}
                      >
                        <button
                          onClick={() => { router.push('/orders'); setOpen(false); }}
                          className="w-full text-left px-4 py-3 text-[11px] tracking-[0.2em] uppercase text-zinc-400 hover:text-white hover:bg-white/4 transition-colors"
                        >
                          My Orders
                        </button>
                        <div className="h-px bg-white/6 mx-4" />
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-3 text-[11px] tracking-[0.2em] uppercase text-zinc-600 hover:text-red-400 hover:bg-white/4 transition-colors"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Link
                    href="/auth"
                    className="text-[11px] tracking-[0.25em] uppercase text-zinc-500 hover:text-white transition-colors min-h-[44px] flex items-center"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="sm:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl sm:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              <Link
                href="/products"
                className="text-sm tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition-colors"
              >
                Works
              </Link>
              <Link
                href="/order"
                className="text-sm tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition-colors"
              >
                Order
              </Link>
              <div className="w-8 h-px bg-white/10" />
              {profile ? (
                <>
                  <Link
                    href="/orders"
                    className="text-sm tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-sm tracking-[0.3em] uppercase text-zinc-600 hover:text-red-400 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="text-sm tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition-colors"
                >
                  Login
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
