'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Profile {
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setProfile(null);
    setMobileOpen(false);
    router.refresh();
  }

  const navCls = (href: string) =>
    `text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
      pathname === href || pathname.startsWith(href + '/') ? 'text-white' : 'text-zinc-500 hover:text-white'
    }`;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-[15%] min-w-[160px] max-w-[220px] flex-col justify-between px-6 py-8 z-50 bg-[#0a0a0a]">
        {/* Top: brand + nav */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="text-[13px] font-bold tracking-[0.35em] uppercase text-white hover:text-zinc-300 transition-colors">
            EEL
          </Link>
          <nav className="flex flex-col gap-2.5">
            <Link href="/products" className={navCls('/products')}>Works</Link>
            <Link href="/order" className={navCls('/order')}>Order</Link>
          </nav>
        </div>

        {/* Bottom: auth */}
        <div className="flex flex-col gap-3">
          {profile ? (
            <>
              <div className="flex items-center gap-2">
                {profile.avatar_url ? (
                  <Image src={profile.avatar_url} alt="" width={16} height={16} className="rounded-full" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-zinc-700 flex items-center justify-center text-[8px] font-bold text-white">
                    {(profile.full_name ?? profile.email ?? '?')[0].toUpperCase()}
                  </div>
                )}
                <span className="text-[9px] tracking-[0.15em] uppercase text-zinc-500 truncate">
                  {(profile.full_name ?? profile.email ?? '').split(' ')[0]}
                </span>
              </div>
              <Link href="/orders" className="text-[9px] tracking-[0.15em] uppercase text-zinc-600 hover:text-white transition-colors">
                My Orders
              </Link>
              <button
                onClick={handleSignOut}
                className="text-left text-[9px] tracking-[0.15em] uppercase text-zinc-600 hover:text-red-400 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/auth" className="text-[10px] tracking-[0.2em] uppercase text-white hover:text-zinc-300 transition-colors">
              Login
            </Link>
          )}
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0a0a0a]/90 backdrop-blur-xl">
        <Link href="/" className="text-[13px] font-bold tracking-[0.35em] uppercase text-white">
          EEL
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              <Link href="/products" className="text-sm tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition-colors">Works</Link>
              <Link href="/order" className="text-sm tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition-colors">Order</Link>
              <div className="w-8 h-px bg-white/10" />
              {profile ? (
                <>
                  <Link href="/orders" className="text-sm tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition-colors">My Orders</Link>
                  <button onClick={handleSignOut} className="text-sm tracking-[0.3em] uppercase text-zinc-600 hover:text-red-400 transition-colors">Sign Out</button>
                </>
              ) : (
                <Link href="/auth" className="text-sm tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition-colors">Login</Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
