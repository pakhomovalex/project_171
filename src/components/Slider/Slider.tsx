'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';

import Image from 'next/image';
import { Swiper as SwiperClass } from 'swiper/types';

import '../../styles/SwiperStyles.scss';
import styles from './Slider.module.scss';

type ImageType = {
  id: number;
  image: string;
  order: number;
};

export const Slider = ({ images }: { images: ImageType[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  console.log(images);
  

  return (
    <div className={styles.galleryWrapper}>
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        className={styles.mainSlider}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {images.map(image => (
          <SwiperSlide key={image.id}>
            <Image src={image.image} alt={`Image ${image.id}`} width={1280} height={600} />
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
        {images.map(image => (
          <SwiperSlide key={image.id} className={styles.thumbSlide}>
            <Image src={image.image} alt={`Thumb ${image.id}`} fill className="object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
