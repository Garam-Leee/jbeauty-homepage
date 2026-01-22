"use client";

import styled from "@emotion/styled";
import Link from "next/link";

export default function Footer() {
  return (
    <SiteFooter>
      <FooterInner>
        <FooterTopArea>
          <FooterLogo>
            <LogoImg
              src="/assets/images/j-beauty_logo.svg"
              alt="j-beauty"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </FooterLogo>

          <FooterNav aria-label="Footer">
            <FooterLink href="/">TOP</FooterLink>
            <FooterLink href="/company">COMPANY</FooterLink>
            <FooterLink href="/brand">BRAND</FooterLink>
            <FooterLink href="/news">NEWS</FooterLink>
            <FooterLink href="/contact">CONTACT</FooterLink>
          </FooterNav>
        </FooterTopArea>

        <FooterBottomArea>
          <FooterAddress>
            〒100-6001
            <br />
            東京都千代田区霞が関3-2-5 霞が関ビル5F
            <br />
            TEL: 03-6824-0395
          </FooterAddress>

          <FooterCopy>© {new Date().getFullYear()} J-beauty</FooterCopy>
        </FooterBottomArea>
      </FooterInner>
    </SiteFooter>
  );
}

/* =========================
   Styled Components
========================= */

const SiteFooter = styled.footer`
  background: #fcfcfb;
  padding: 80px 5.5% 30px;
  font-size: 14px;
  
  @media (max-width: 600px) {
    padding: 60px 4% 20px;
  }
`;

const FooterInner = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-direction: column;
`;

const FooterTopArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 6%;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterBottomArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 16px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    font-size: 0.85rem;
  }
`;

const FooterLogo = styled.div`
  text-align: left;
  
  span.subtitle {
    font-weight: 100;
    font-size: 12px;
    display: block;
    letter-spacing: 2px;
    
    @media (max-width: 600px) {
      font-size: 9px;
    }
  }
  
  @media (max-width: 600px) {
    font-size: 30px;
    text-align: center;
  }
`;

const LogoImg = styled.img`
  width: 70%;
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 40px;
  flex-direction: row;
  align-items: flex-start;
  font-size: 14px;
  
  @media (max-width: 600px) {
    gap: 24px;
    font-size: 0.8rem;
    padding-top: 30px;
  }
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: color 0.3s;
  
  &:hover {
    color: #4BB3C4;
  }
`;

const FooterAddress = styled.div`
  color: #777;
  
  @media (max-width: 600px) {
    text-align: center;
  }
`;

const FooterCopy = styled.div`
  margin-top: 20px;
  color: #aaa;
  font-size: 0.85rem;
`;
