"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function sanitizeReturnTo(raw: string | null): string {
  if (!raw) return '/';
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/';
  return raw;
}

function AuthContent() {
  const searchParams = useSearchParams();
  const returnTo = sanitizeReturnTo(searchParams.get('returnTo'));

  async function signInWithGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?returnTo=${encodeURIComponent(returnTo)}`,
      },
    });
  }
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a]">

      {/* Liquid Glass Card */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{ width: "380px" }}
      >
        {/* Glass card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "28px",
            padding: "48px 44px 44px",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset, 0 -1px 0 rgba(0,0,0,0.3) inset",
            width: "100%",
          }}
        >
          {/* Logo / Brand */}
          <div className="flex flex-col items-center mb-10">
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.1) inset",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: "0.5px",
                }}
              >
                EEL
              </span>
            </div>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "rgba(255,255,255,0.95)",
                letterSpacing: "-0.3px",
                marginBottom: "6px",
              }}
            >
              EEL에 오신 것을 환영합니다
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.4)",
                textAlign: "center",
                lineHeight: "1.5",
              }}
            >
              Google 계정으로 계속하세요
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
              marginBottom: "32px",
            }}
          />

          {/* Google Sign In Button */}
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-[14px] border text-[15px] font-medium cursor-pointer transition-all duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.99]"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.1) inset",
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.1px",
            }}
          >
            {/* Google Logo */}
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google로 계속하기
          </button>

          {/* Footer note */}
          <p
            style={{
              marginTop: "24px",
              fontSize: "12px",
              color: "rgba(255,255,255,0.25)",
              textAlign: "center",
              lineHeight: "1.6",
            }}
          >
            계속 진행하면{" "}
            <span style={{ color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
              서비스 약관
            </span>{" "}
            및{" "}
            <span style={{ color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
              개인정보처리방침
            </span>
            에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthContent />
    </Suspense>
  );
}
