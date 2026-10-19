'use client';

import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { ParticleMorphScene } from '@/components/ParticleMorphScene';
import { SiteHeader } from '@/components/SiteHeader';

const chapters = [
  { morph: 0, index: '01', kicker: 'KENT BİR NESNE DEĞİL', title: <>Boşluk,<br/><em>hareket eder.</em></>, body: 'Gümüşlük’ün yarım kalmış yapıları, kıyı eşikleri ve gündelik rotaları tek bir sabit plana sığmaz. Kent, kullanım değiştikçe yeniden çizilir.', link: '/saha', label: 'Sahaya gir' },
  { morph: 1, index: '02', kicker: 'DAĞINIK BİLGİ / CANLI SAHA', title: <>Her iz,<br/>başka bir <em>olasılık.</em></>, body: 'Yıkım, bekleme, oyun, manzara ve altyapı aynı arazi üzerinde üst üste gelir. Atlas bu parçaları kusursuzlaştırmadan yan yana tutar.', link: '/atlas', label: 'Atlası aç' },
  { morph: 2, index: '03', kicker: 'KÜÇÜK MÜDAHALE / BÜYÜK ETKİ', title: <>Bir kıvılcım,<br/><em>ortak mekan.</em></>, body: 'Bir sandalye, gölge ya da geçici oyun alanı; tanımsız bir yüzeyi karşılaşma mekanına çevirebilir.', link: '/notlar', label: 'Notları oku' },
  { morph: 3, index: '04', kicker: 'KIYIDAN DÜNYAYA', title: <>Yerel olan,<br/><em>gezegenseldir.</em></>, body: 'Kıyıdaki her karar; iklim, turizm, hafıza ve müşterek yaşamla bağlıdır. Gümüşlük küçük bir yer değil, yoğun bir mercektir.', link: '/saha', label: 'Araştırmayı gör' },
  { morph: 4, index: '05', kicker: 'TEMPORARY / URBAN', title: <>Şehir hiçbir<br/>zaman <em>bitmez.</em></>, body: 'Temporary Urban Spaces, tamamlanmamış olanı kusur değil; kolektif bir tasarım alanı olarak okur.', link: '/atlas', label: '64 kareyi keşfet' },
];

export default function Home() {
  return <main className="home">
    <SiteHeader />
    <ParticleMorphScene />
    <div className="canvas-vignette" aria-hidden="true" />
    {chapters.map((chapter, i) => <section className={`morph-section side-${i % 2 ? 'right' : 'left'}`} data-morph={chapter.morph} key={chapter.index}>
      <div className="chapter-copy">
        <div className="chapter-meta"><span>{chapter.index} / 05</span><span>{chapter.kicker}</span></div>
        <h1>{chapter.title}</h1>
        <p>{chapter.body}</p>
        <a href={chapter.link}>{chapter.label}<ArrowUpRight size={16}/></a>
      </div>
      {i === 0 && <div className="scroll-cue"><ArrowDown size={15}/><span>Kaydır / biçim değişsin</span></div>}
    </section>)}
    <footer className="home-footer"><img src="/tu-mark.svg" alt="Temporary Urban Spaces"/><p>Gümüşlük’te geçici mekanlar üzerine yürütülen çalışma.</p><span>© 2026</span></footer>
  </main>;
}
