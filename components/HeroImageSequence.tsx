'use client';

import { useEffect, useState } from 'react';

const images = [
  { src: '/field/gumusluk-02.jpg', alt: 'Ufka ve denize açılan boş kıyı yolu' },
  { src: '/field/gumusluk-64.jpg', alt: 'Kıyı yamacına yerleşmiş terk edilmiş uzun yapı' },
  { src: '/field/gumusluk-13.jpg', alt: 'Gümüşlük çarşısındaki örtülü geçit' },
  { src: '/field/gumusluk-14.jpg', alt: 'Tekneler arasında denize uzanan ahşap iskele' },
  { src: '/field/gumusluk-18.jpg', alt: 'Çarşının içinden geçen uzun, örtülü yaya aksı' },
  { src: '/field/gumusluk-26.jpg', alt: 'Taş duvarların arasındaki eski değirmenler' },
  { src: '/field/gumusluk-29.jpg', alt: 'Tepede birbirinden ayrılan taş yapı kalıntıları' },
  { src: '/field/gumusluk-31.jpg', alt: 'Kazı alanının içinden tepeye uzanan çalışma izi' },
  { src: '/field/gumusluk-35.jpg', alt: 'Ağaçların arasında ışık alan eski taş yapı' },
  { src: '/field/gumusluk-41.jpg', alt: 'Sığ kıyı boyunca uzanan kayalık eşik ve tekneler' },
  { src: '/field/gumusluk-44.jpg', alt: 'Kalıntıların arasından marina ve tepelere bakış' },
  { src: '/field/gumusluk-49.jpg', alt: 'Yüksek kıyıdan koy ve teknelere bakış' },
  { src: '/field/gumusluk-50.jpg', alt: 'Kemerli taş yapının içinden deniz manzarası' },
  { src: '/field/gumusluk-54.jpg', alt: 'Terk edilmiş kıyı yapısının uzun kemerli galerisi' },
  { src: '/field/gumusluk-61.jpg', alt: 'Kemerli açıklıkları olan yapının iç mekânı' },
];

export function HeroImageSequence() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <figure className="studio-hero-image" aria-label="Seçili saha fotoğrafları">
      {images.map((image, index) => (
        <img
          className={index === activeIndex ? 'is-active' : ''}
          src={image.src}
          alt={index === activeIndex ? image.alt : ''}
          aria-hidden={index !== activeIndex}
          width="2048"
          height="1536"
          loading={index < 2 ? 'eager' : 'lazy'}
          key={image.src}
        />
      ))}
      <figcaption aria-live="off">
        <span>
          SAHA KAYDI / {String(activeIndex + 1).padStart(2, '0')}—{images.length}
        </span>
        <span>Gümüşlük, 2026</span>
      </figcaption>
    </figure>
  );
}
