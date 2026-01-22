"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header({ variant = "sub" }: { variant?: "home" | "sub" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  const headerClass =
    variant === "home"
      ? "top-header front-only-header"
      : "sub-header";

  // home일 때는 배경이 이미지라 로고 화이트 버전 사용(파일 없으면 일반 로고로)
  const logoSrc =
    variant === "home"
      ? "/assets/images/j-beauty_logo_w.svg"
      : "/assets/images/j-beauty_logo.svg";

  return (
    <header className={headerClass}>
      <div className={variant === "home" ? "" : "sub-header-inner"}>
        <div className="logo">
          <Link href="/" aria-label="Go to home">
            <img
              src={logoSrc}
              alt="j-beauty"
              className="header-logo-img"
              onError={(e) => {
                // fallback: 로고 파일 없으면 텍스트
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </Link>
        </div>

        <button
          className={`hamburger ${open ? "open" : ""}`}
          id="hamburger-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`sub-nav ${open ? "open" : ""}`} id="nav-menu" aria-label="Primary">
          {/* 모바일 메뉴 로고(네 CSS에 맞춤) */}
          <div className="mobile-menu-logo sp_on">
            <Link href="/" onClick={() => setOpen(false)}>
              <img
                src="/assets/images/j-beauty_logo.svg"
                alt="j-beauty"
                className="header-logo-img-hamburder"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
            </Link>
          </div>

          <ul>
            <li><Link href="/" onClick={() => setOpen(false)}>TOP</Link></li>
            <li><Link href="/company" onClick={() => setOpen(false)}>COMPANY</Link></li>
            <li><Link href="/brand" onClick={() => setOpen(false)}>BRAND</Link></li>
            <li><Link href="/news" onClick={() => setOpen(false)}>NEWS</Link></li>
            <li>
              <Link className="contact-btn" href="/contact" onClick={() => setOpen(false)}>
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
