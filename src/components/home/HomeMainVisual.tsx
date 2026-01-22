"use client";

import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

const SLIDE_MS = 4500;

type Slide = {
  id: string;
  bg: string;
};

export default function HomeMainVisual() {
  const slides = useMemo<Slide[]>(
    () => [
      { id: "01", bg: "/assets/images/main_v_first.jpg" },
      { id: "02", bg: "/assets/images/main_v_second.jpg" },
      { id: "03", bg: "/assets/images/main_v_third.jpg" },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex ?? swiper.activeIndex ?? 0);
  };

  return (
    <Section id="index">
      <StyledSwiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        autoplay={{ delay: SLIDE_MS, disableOnInteraction: false }}
        onSlideChange={handleSlideChange}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <SlideBG style={{ backgroundImage: `url(${s.bg})` }} />
          </SwiperSlide>
        ))}
      </StyledSwiper>

      <Overlay>
        <TextAreaWrapper>
          <TextArea>
            <p className="intro">
              何注いな日常에、ワンランク特別な
              <br className="sp" />
              空間에서 幸福한 時間을
            </p>
            <p className="intro">過ごせるような商品を提供いたします。</p>

            <h2 className="catch">
              JAZZINESS
              <br className="sp" /> <span>&</span> <br className="sp" />
              BLISSFULNESS
            </h2>
          </TextArea>
        </TextAreaWrapper>
      </Overlay>
    </Section>
  );
}

/* =========================
   Emotion styles
========================= */

const Section = styled.section`
  width: 100%;
  height: 800px;
  min-height: 800px;
  position: relative;
  padding: 12px; /* 배경 테두리 간격 */
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;

  .swiper-wrapper,
  .swiper-slide {
    width: 100%;
    height: 100%;
  }
`;

const SlideBG = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: saturate(0.95);
  transform: scale(1.02);
`;

const Overlay = styled.div`
  position: absolute;
  /* Swiper와 동일한 영역을 덮도록 설정 */
  top: 12px;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 10;
  border-radius: 15px;
  overflow: hidden; /* 그라디언트가 곡선을 넘지 않게 */

  display: flex;
  flex-direction: column;
  justify-content: center; /* 텍스트 중앙 배치 필요시 조절 */
  padding: 0 6%;

  /* 배경 이미지 전체를 덮으면서 왼쪽 텍스트 가독성을 높이는 그라디언트 */
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.15) 50%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const TextAreaWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const TextArea = styled.div`
  max-width: 800px;
  color: #fff;

  .intro {
    font-size: 1.25rem;
    line-height: 1.8;
    letter-spacing: 0.02em;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);

    opacity: 0;
    transform: translateX(-30px);
    animation: slideFadeIn 0.8s ease-out forwards;
  }

  .intro:nth-of-type(1) {
    animation-delay: 0.2s;
  }
  .intro:nth-of-type(2) {
    animation-delay: 0.4s;
    margin-bottom: 24px;
  }

  .catch {
    font-size: 4.5rem;
    line-height: 1.1;
    letter-spacing: 0.05em;
    font-weight: 700;
    text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.4);

    opacity: 0;
    transform: translateX(-30px);
    animation: slideFadeIn 0.8s ease-out forwards;
    animation-delay: 0.7s;
  }

  .catch span {
    font-weight: 300;
  }

  .sp {
    display: none;
  }

  @keyframes slideFadeIn {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    .catch {
      font-size: 2.5rem;
    }
    .intro {
      font-size: 1.1rem;
    }
    .sp {
      display: inline;
    }
  }
`;