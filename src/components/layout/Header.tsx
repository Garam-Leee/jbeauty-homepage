"use client";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header({ variant = "sub" }: { variant?: "home" | "sub" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  // home일 때는 배경이 이미지라 로고 화이트 버전 사용
  const logoSrc =
    variant === "home"
      ? "/assets/images/j-beauty_logo_w.svg"
      : "/assets/images/j-beauty_logo.svg";

  return (
    <HeaderWrapper $variant={variant}>
      <HeaderInner $variant={variant}>
        <Logo>
          <Link href="/" aria-label="Go to home">
            <LogoImg
              src={logoSrc}
              alt="j-beauty"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </Link>
        </Logo>

        <Hamburger
          $open={open}
          id="hamburger-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </Hamburger>

        <Nav $open={open} id="nav-menu" aria-label="Primary">
          <MobileMenuLogo className="sp_on">
            <Link href="/" onClick={() => setOpen(false)}>
              <MobileLogoImg
                src="/assets/images/j-beauty_logo.svg"
                alt="j-beauty"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
            </Link>
          </MobileMenuLogo>

          <NavList>
            <NavItem><NavLink href="/" onClick={() => setOpen(false)}>TOP</NavLink></NavItem>
            <NavItem><NavLink href="/company" onClick={() => setOpen(false)}>COMPANY</NavLink></NavItem>
            <NavItem><NavLink href="/brand" onClick={() => setOpen(false)}>BRAND</NavLink></NavItem>
            <NavItem><NavLink href="/news" onClick={() => setOpen(false)}>NEWS</NavLink></NavItem>
            <NavItem>
              <ContactBtn href="/contact" onClick={() => setOpen(false)}>
                CONTACT
              </ContactBtn>
            </NavItem>
          </NavList>
        </Nav>
      </HeaderInner>
    </HeaderWrapper>
  );
}

/* =========================
   Styled Components
========================= */

const HeaderWrapper = styled.header<{ $variant: "home" | "sub" }>`
  width: 100%;
  position: fixed;
  z-index: 100;
  
  ${({ $variant }) => $variant === "home" ? css`
    /* top-header 스타일 */
    display: flex;
    justify-content: space-between;
    align-items: center;
  ` : css`
    /* sub-header 스타일 */
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: 20px 4%;
    
    @media (max-width: 768px) {
      padding: 20px 4% 17px;
    }
  `}
`;

const HeaderInner = styled.div<{ $variant: "home" | "sub" }>`
  ${({ $variant }) => $variant === "sub" && css`
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media (max-width: 768px) {
      gap: 12px;
    }
  `}
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 0.8;
  color: #1a1a1a;
  text-align: left;
  
  span {
    font-size: 12px;
    font-weight: 300;
    color: #666;
  }
`;

const LogoImg = styled.img`
  width: 55%;
  padding-top: 4px;
  
  @media (max-width: 768px) {
    width: 50%;
  }
`;

const MobileLogoImg = styled.img`
  width: 65%;
`;

const Hamburger = styled.button<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
  
  span {
    display: block;
    height: 3px;
    background: #333;
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    gap: 6px;
    width: 30px;
    height: 30px;
    position: relative;
    
    span {
      height: 2px;
      transition: all 0.4s ease;
    }
    
    span:nth-of-type(1) { 
      width: 100%; 
      ${({ $open }) => $open && css`
        transform: rotate(45deg) translate(5px, 5px);
      `}
    }
    
    span:nth-of-type(2) { 
      width: 70%; 
      ${({ $open }) => $open && css`
        opacity: 0;
      `}
    }
    
    span:nth-of-type(3) { 
      width: 40%; 
      ${({ $open }) => $open && css`
        transform: rotate(-45deg) translate(6px, -6px);
        width: 100%;
      `}
    }
  }
`;

const Nav = styled.nav<{ $open: boolean }>`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ $open }) => $open ? "0" : "-100%"};
    width: 100%;
    height: 100vh;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: ${({ $open }) => $open ? "flex-start" : "center"};
    align-items: center;
    gap: 30px;
    transition: right 0.5s ease;
    z-index: 1000;
    padding-top: ${({ $open }) => $open ? "7rem" : "0"};
    text-align: center;
    
    ${({ $open }) => $open && css`
      background-image: url("/assets/images/bg-gradation.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: rgba(255, 255, 255, 0.85);
    `}
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 4.5em;
  list-style: none;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const NavItem = styled.li`
  @media (max-width: 768px) {
    opacity: 0;
    transform: translateY(20px);
    
    ${Nav}[aria-label="Primary"] & {
      animation: fadeUp 0.5s ease forwards;
    }
    
    &:nth-of-type(1) { animation-delay: 0.1s; }
    &:nth-of-type(2) { animation-delay: 0.2s; }
    &:nth-of-type(3) { animation-delay: 0.3s; }
    &:nth-of-type(4) { animation-delay: 0.4s; }
    &:nth-of-type(5) { 
      animation-delay: 0.5s;
      margin-top: 10px;
    }
    
    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 1.15rem;
    color: #333 !important;
    transition: color 0.3s;
    
    &:hover {
      color: #4BB3C4;
    }
  }
`;

const ContactBtn = styled(Link)`
  border: 1px solid #4BB3C4;
  padding: 10px 30px 8px;
  border-radius: 30px;
  transition: all 0.3s;
  color: #4BB3C4;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background-color: #4bb4c4c2;
    color: #fff;
  }
  
  @media (max-width: 768px) {
    padding: 14px 70px 12px;
    color: #4cb3c4 !important;
    border: 1px solid #4cb3c4;
  }
`;

const MobileMenuLogo = styled.div`
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: 6px;
  
  span {
    font-size: 0.8rem;
    font-weight: 300;
    display: block;
    letter-spacing: 1px;
    color: #666;
  }
  
  a {
    font-size: 2.2rem;
    font-weight: bold;
  }
`;
