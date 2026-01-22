"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer_top_area">
          <div className="footer-logo">
            <img
              src="/assets/images/j-beauty_logo.svg"
              alt="j-beauty"
              className="footer-logo-img"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <Link href="/">TOP</Link>
            <Link href="/company">COMPANY</Link>
            <Link href="/brand">BRAND</Link>
            <Link href="/news">NEWS</Link>
            <Link href="/contact">CONTACT</Link>
          </nav>
        </div>

        <div className="footer_bottom_area">
          <div className="footer-address">
            〒100-6001
            <br />
            東京都千代田区霞が関3-2-5 霞が関ビル5F
            <br />
            TEL: 03-6824-0395
          </div>

          <div className="footer-copy">© {new Date().getFullYear()} J-beauty</div>
        </div>
      </div>
    </footer>
  );
}
