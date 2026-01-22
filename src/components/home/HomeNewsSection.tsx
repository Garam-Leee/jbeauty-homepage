"use client";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useMemo, useState } from "react";

export type HomeNewsItem = {
  id: string;
  date: string;
  label: string;
  title: string;
  excerpt?: string;
};

type Props = {
  items?: HomeNewsItem[];
  maxItems?: number;
};

const DEFAULT_ITEMS: HomeNewsItem[] = [
  {
    id: "2026-01-07",
    date: "2026.01.07",
    label: "お知らせ",
    title: "【重要】お客様の大切なお知らせと休業のご案内",
    excerpt:
      "誠に勝手ながら、社내 사정으로 인해 일부 업무를 휴업하게 되었습니다. 자세한 내용은 본문을 확인해 주시기 바랍니다. 이용에 불편을 드려 죄송합니다.",
  },
  {
    id: "2025-05-15",
    date: "2025.05.15",
    label: "お知らせ",
    title: "사이트를 리뉴얼했습니다.",
    excerpt:
      "J-BEAUTY 공식 사이트를 리뉴얼했습니다. 보다 보기 쉽고, 보다 쾌적한 브랜드 경험을 제공하기 위해 노력하겠습니다.",
  },
];

export default function HomeNewsSection({ items, maxItems = 2 }: Props) {
  const data = useMemo(() => (items?.length ? items : DEFAULT_ITEMS), [items]);
  const visible = useMemo(() => data.slice(0, maxItems), [data, maxItems]);
  
  // 첫 번째 항목이 기본으로 열려 있도록 설정
  const [openId, setOpenId] = useState<string | null>(visible[0]?.id ?? null);

  return (
    <Section id="news">
      <Inner>
        <HeaderRow>
          <TitleBlock>
            <Title>NEWS</Title>
            <SubTitle>ニュース</SubTitle>
          </TitleBlock>
          <TopAction href="/news">
            VIEW MORE <span aria-hidden>→</span>
          </TopAction>
        </HeaderRow>

        <List role="list">
          {visible.map((n) => {
            const isOpen = openId === n.id;

            return (
              <Item key={n.id} className={isOpen ? "open" : ""}>
                <ItemButton
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId((cur) => (cur === n.id ? null : n.id))}
                >
                  <LeftColumn>
                    <DateText>{n.date}</DateText>
                    <LabelPill>{n.label}</LabelPill>
                  </LeftColumn>

                  <MainColumn>
                    <Headline>{n.title}</Headline>
                    <ToggleIcon className={isOpen ? "active" : ""}>
                      <span className="h-line"></span>
                      <span className="v-line"></span>
                    </ToggleIcon>
                  </MainColumn>
                </ItemButton>

                <Panel className={isOpen ? "show" : ""}>
                  <PanelInner>
                    <Excerpt>
                      {n.excerpt ?? "내용이 준비 중입니다."}
                    </Excerpt>
                    <ReadMore href={`/news/${n.id}`}>
                      READ MORE <span aria-hidden>→</span>
                    </ReadMore>
                  </PanelInner>
                </Panel>
              </Item>
            );
          })}
        </List>

        <BottomAction href="/news">
          VIEW MORE <span aria-hidden>→</span>
        </BottomAction>
      </Inner>
    </Section>
  );
}

/* =========================
   Emotion Styles
========================= */

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  padding: 140px 5.5%;
  background-color: #fff;
`;

const Inner = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 50px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const TitleBlock = styled.div``;

const Title = styled.h2`
  font-size: 52px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #1a1a1a;
  line-height: 1;
`;

const SubTitle = styled.div`
  margin-top: 14px;
  font-size: 13px;
  color: #999;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const TopAction = styled(Link)`
  font-size: 13px;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;
  border-bottom: 1px solid #1a1a1a;
  padding-bottom: 4px;
  transition: opacity 0.3s;

  &:hover { opacity: 0.5; }

  @media (max-width: 640px) { display: none; }
`;

const List = styled.div`
  border-top: 1px solid #111;
`;

const Item = styled.div`
  border-bottom: 1px solid #eee;
  transition: background-color 0.4s ease;

  &.open {
    background-color: #fafafa;
  }
`;

const ItemButton = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  padding: 24px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: left;

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 0;
  }
`;

const LeftColumn = styled.div`
  flex: 0 0 240px; /* 고정 너비로 수직 정렬 라인 확보 */
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 860px) {
    flex: none;
    margin-bottom: 12px;
  }
`;

const DateText = styled.span`
  font-size: 14px;
  color: #999;
  font-family: "Inter", sans-serif;
`;

const LabelPill = styled.span`
  font-size: 10px;
  font-weight: 600;
  padding: 4px 10px;
  border: 1px solid #ddd;
  color: #666;
  letter-spacing: 0.05em;
`;

const MainColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`;

const Headline = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.6;
  color: #1a1a1a;
  
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const ToggleIcon = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  flex-shrink: 0;

  span {
    position: absolute;
    background: #111;
    transition: all 0.3s ease;
  }
  .h-line { top: 7px; left: 0; width: 100%; height: 1.5px; }
  .v-line { top: 0; left: 7px; width: 1.5px; height: 100%; }

  &.active .v-line {
    transform: rotate(90deg);
    opacity: 0;
  }
`;

const Panel = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &.show {
    max-height: 500px;
  }
`;

const PanelInner = styled.div` 
  padding: 0 40px 48px 270px; 
  animation: ${slideDown} 0.5s ease forwards;

  @media (max-width: 860px) {
    padding: 0 0 32px 0;
  }
`;

const Excerpt = styled.p`
  font-size: 15px;
  line-height: 1.9;
  color: #666;
  margin-bottom: 24px;
  max-width: 720px;
  word-break: keep-all;
`;

const ReadMore = styled(Link)`
  font-size: 12px;
  font-weight: 700;
  color: #111;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  span { transition: transform 0.3s ease; }
  &:hover span { transform: translateX(4px); }
`;

const BottomAction = styled(Link)`
  display: none;
  margin-top: 40px;
  width: 100%;
  justify-content: center;
  padding: 16px;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;

  @media (max-width: 640px) {
    display: flex;
  }
`;