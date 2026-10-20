import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
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
    text: 'Araştırma notları için ayrılan bölül.',
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

      <section className="minimal-hero">
        <div className="hero-index">GÜMÜŞLÜK / 2026</div>
        <h1>
          Geçici mekanlar,
          <br />
          kalıcı izler.
        </h1>
        <div className="hero-intro">
          <p>Gümüşlük’te geçici mekanlar üzerine yürütülen çalışma.</p>
          <a href="#arastirma">
            Araştırmayı incele <ArrowDownRight size={17} />
          </a>
        </div>
      </section>

      <figure className="lead-image">
        <img
          src="/field/gumusluk-41.jpg"
          width="2048"
          height="1536"
          alt="Gümüşlük kıyısına bakan tek bir bank"
          fetchPriority="high"
        />
        <figcaption>
          <span>01</span>
          <span>Kıyı eşiği, Gümüşlük</span>
          <span>2026</span>
        </figcaption>
      </figure>

      <section className="minimal-statement" id="arastirma">
        <div className="section-label">ARAŞTIRMA ALANI</div>
        <div>
          <h2>Kıyı, kullanım değiştikçe dönüşür.</h2>
          <p>
            Yarım kalmış yapılar, gündelik rotalar, boşluklar ve karşılaşmalar
            aynı sahada yan yana gelir. Bu çalışma Gümüşlük’ü tamamlanmış bir
            yer olarak değil, sürekli yeniden kurulan bir çevre olarak kaydeder.
          </p>
        </div>
      </section>

      <section className="image-pair" aria-label="Saha fotoğrafları">
        <figure>
          <img
            src="/field/gumusluk-38.jpg"
            width="2048"
            height="1536"
            alt="Gümüşlük kırsalındaki eski taş yapılar"
            loading="lazy"
          />
          <figcaption>Taş yapılar / iç kesim</figcaption>
        </figure>
        <figure>
          <img
            src="/field/gumusluk-50.jpg"
            width="2048"
            height="1536"
            alt="Kayalık kıyıda denize giren insanlar"
            loading="lazy"
          />
          <figcaption>Gündelik kullanım / kıyı</figcaption>
        </figure>
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
