'use client';

import { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

const frames = [
  {
    src: '/field/gumusluk-41.jpg',
    alt: 'Gümüşlük kıyısına bakan tek bir bank',
    title: 'Kıyı eşiği',
    note: 'Bakış ve bekleme',
    shape: 'wide',
  },
  {
    src: '/field/gumusluk-64.jpg',
    alt: 'Terk edilmiş bir yüzme havuzu ve kıyı yapısı',
    title: 'Terk edilmiş yapı',
    note: 'Boşluk ve kalıntı',
    shape: 'portrait',
  },
  {
    src: '/field/gumusluk-38.jpg',
    alt: 'Gümüşlük kırsalındaki eski taş değirmenler',
    title: 'Taş yapılar',
    note: 'Kırsal izler',
    shape: 'portrait',
  },
  {
    src: '/field/gumusluk-50.jpg',
    alt: 'Kayalık kıyıda denize giren insanlar',
    title: 'Gündelik kullanım',
    note: 'Kıyının paylaşımı',
    shape: 'wide',
  },
  {
    src: '/field/gumusluk-52.jpg',
    alt: 'Gümüşlük kıyısındaki antik kalıntılar',
    title: 'Kalıntılar',
    note: 'Katman ve süreklilik',
    shape: 'wide',
  },
  {
    src: '/field/gumusluk-53.jpg',
    alt: 'Gümüşlük kıyısında açık hava masaları',
    title: 'Mevsimsel mekan',
    note: 'Kıyı işletmesi',
    shape: 'portrait',
  },
];

export function HorizontalArchive() {
  const railRef = useRef<HTMLDivElement>(null);

  const move = (direction: number) => {
    railRef.current?.scrollBy({
      left: direction * Math.min(window.innerWidth * 0.72, 900),
      behavior: 'smooth',
    });
  };

  return (
    <section className="horizontal-archive" aria-labelledby="archive-title">
      <header className="archive-heading">
        <div>
          <span>SEÇİLİ SAHA KAYITLARI / 01—06</span>
          <h2 id="archive-title">Görsel arşiv</h2>
        </div>
        <p>
          Görselleri yatay olarak kaydırın. Her kayıt, 64 fotoğraflık atlasın
          bir parçasıdır.
        </p>
        <div className="archive-controls" aria-label="Arşivi kaydır">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Önceki görseller"
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Sonraki görseller"
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        className="archive-rail"
        ref={railRef}
        aria-label="Yatay saha fotoğrafları"
      >
        {frames.map((frame, index) => (
          <a
            className={`archive-frame ${frame.shape}`}
            href="/atlas"
            key={frame.src}
          >
            <figure>
              <img
                src={frame.src}
                alt={frame.alt}
                width="1100"
                height={frame.shape === 'portrait' ? '1460' : '825'}
                loading={index < 2 ? 'eager' : 'lazy'}
              />
              <figcaption>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>
                  {frame.title}
                  <small>{frame.note}</small>
                </span>
                <ArrowUpRight aria-hidden="true" />
              </figcaption>
            </figure>
          </a>
        ))}
        <a className="archive-end" href="/atlas">
          <span>64 KAYIT</span>
          <strong>Tüm atlası incele</strong>
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
