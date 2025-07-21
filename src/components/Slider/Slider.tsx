'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';

import Image from 'next/image';
import { Swiper as SwiperClass } from 'swiper/types';

import '@/styles/SwiperStyles.scss';
import styles from './Slider.module.scss';


export const Slider = ({ images }: { images: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className={styles.galleryWrapper}>
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        className={styles.mainSlider}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image src={image} alt={`Image ${index}`} width={1280} height={600}/>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={24}
        slidesPerView={images.length}
        watchSlidesProgress
        className={`${styles.thumbSlider} ${styles[`thumbSlider--${images.length}`]}`}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className={styles.thumbSlide}>
            <Image src={src} alt={`Thumb ${index}`} fill className="object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
