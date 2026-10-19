import { ArrowLeft } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';

const notes=[
 ['01','Boşluk pasif değildir','Kullanımın çekildiği alanlarda yeni ilişkiler, kestirme rotalar ve beklenmedik kamusal hayat oluşur.'],
 ['02','Zaman bir tasarım malzemesidir','Mevsim, bakım, yıkım ve bekleme; bir mekânın karakterini beton kadar güçlü biçimde kurar.'],
 ['03','Az müdahale, çok olasılık','Geçici ve geri alınabilir hamleler, alanı tek bir geleceğe kilitlemeden denemeye açar.'],
 ['04','Kıyı müşterektir','Manzara yalnızca izlenecek bir yüzey değil; erişim, hafıza ve gündelik yaşamın ortak altyapısıdır.'],
];

export default function NotesPage(){return <main className="subpage notes-page"><SiteHeader/>
 <section className="notes-hero"><span>NOTLAR / GEÇİCİ MEKÂN</span><h1>Kalıcı mimarlık,<br/><em>geçici sorularla</em><br/>başlar.</h1><a href="/"><ArrowLeft size={15}/> Ana sayfaya dön</a></section>
 <section className="note-list">{notes.map(([n,t,c])=><article key={n}><span>{n}</span><h2>{t}</h2><p>{c}</p></article>)}</section>
 <blockquote>“Tamamlanmamış olan, ortak bir gelecek için hâlâ pazarlığa açıktır.”</blockquote>
 </main>}
