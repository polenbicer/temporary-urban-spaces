import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';

const moments = [
  { image: 63, tag: 'KIYI / 01', title: 'Yarım kalan yapı, kullanım çekildiğinde yeniden başlar.' },
  { image: 55, tag: 'EŞİK / 02', title: 'Deniz ile yapı arasındaki çizgi geçici kamusallığın sahnesidir.' },
  { image: 29, tag: 'HAFIZA / 03', title: 'Kalıntı yalnızca geçmişin izi değil, geleceğin ölçüsüdür.' },
  { image: 45, tag: 'GÜNDELİK / 04', title: 'Bir sandalye manzarayı ortak bir odaya çevirmeye yetebilir.' },
];

export default function FieldPage() {
  return <main className="subpage field-page"><SiteHeader />
    <section className="sub-hero"><span>SAHA / GÜMÜŞLÜK</span><h1>Kıyıyı<br/>boşluklarından<br/><em>okumak.</em></h1><p>Yarım kalmış yapılar, gündelik karşılaşmalar ve değişen kıyı çizgisi boyunca dört mekansal durum.</p><a href="/"><ArrowLeft size={15}/> Ana sayfaya dön</a></section>
    <section className="field-sequence">{moments.map((moment, i) => <article key={moment.image}>
      <figure><img src={`/field/gumusluk-${String(moment.image).padStart(2,'0')}.jpg`} alt={moment.title}/><figcaption>{moment.tag}</figcaption></figure>
      <div><span>0{i+1}</span><h2>{moment.title}</h2><p>Tanımlı programın geri çekildiği yerde rota, gölge, manzara ve bekleme yeni bir mekansal düzen kuruyor.</p></div>
    </article>)}</section>
    <a className="page-next" href="/atlas">Sonraki: Atlas <ArrowUpRight/></a>
  </main>;
}
