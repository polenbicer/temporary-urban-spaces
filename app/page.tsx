import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { HorizontalArchive } from '@/components/HorizontalArchive';
import { HeroImageSequence } from '@/components/HeroImageSequence';
import { SiteHeader } from '@/components/SiteHeader';

const sections = [
  {
    index: '01',
    title: 'Saha',
    text: 'Kıyı, kalıntılar ve gündelik kullanımlar boyunca dört mekansal durum.',
    href: '/saha',
  },
  {
    index: '02',
    title: 'Atlas',
    text: 'Gümüşlük saha gezisinden 64 fotoğraflık görsel kayıt.',
    href: '/atlas',
  },
  {
    index: '03',
    title: 'Notlar',
    text: 'Araştırma notları için ayrılan bölüm.',
    href: '/notlar',
  },
  {
    index: '04',
    title: 'Manifesto',
    text: 'Çalışmanın yaklaşım metni için ayrılan bölüm.',
    href: '/manifesto',
  },
];

export default function Home() {
  return (
    <main className="home minimal-home">
      <SiteHeader />

      <section className="studio-hero">
        <div className="studio-hero-meta">
          <span>GÜMÜŞLÜK / 2026</span>
          <span>GÖRSEL SAHA ARAŞTIRMASI</span>
        </div>
        <HeroImageSequence />
        <h1>Gümüşlük</h1>
        <div className="studio-hero-bottom">
          <p>Gümüşlük’te geçici mekanlar üzerine yürütülen çalışma.</p>
          <p>
            Kıyı, kalıntılar ve gündelik kullanımlar boyunca değişen mekansal
            durumların görsel kaydı.
          </p>
          <a href="#arsiv">
            Arşivi aç <ArrowDownRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <div id="arsiv">
        <HorizontalArchive />
      </div>

      <section className="studio-statement" id="arastirma">
        <span>ARAŞTIRMA / GÜMÜŞLÜK</span>
        <h2>Kıyı, kalıntılar ve gündelik kullanımlar.</h2>
        <p>
          Yarım kalmış yapılar, geçici yerleşimler, boşluklar ve karşılaşmalar
          aynı sahada yan yana gelir. Araştırma, bu durumları fotoğraf ve saha
          notlarıyla bir araya getirir.
        </p>
      </section>

      <nav className="research-index" aria-label="Araştırma bölümleri">
        {sections.map((section) => (
          <a href={section.href} key={section.index}>
            <span>{section.index}</span>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
            <ArrowUpRight aria-hidden="true" />
          </a>
        ))}
      </nav>

      <footer className="home-footer minimal-footer">
        <img src="/tu-mark.svg" alt="Temporary Urban Spaces" />
        <p>Gümüşlük’te geçici mekanlar üzerine yürütülen çalışma.</p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
