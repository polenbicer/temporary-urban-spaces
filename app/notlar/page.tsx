import { ArrowLeft } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';

export default function NotesPage(){return <main className="subpage notes-page"><SiteHeader/>
 <section className="notes-hero"><span>NOTLAR / YAKINDA</span><h1>Araştırma notlarını<br/><em>buraya ekleyebiliriz.</em></h1><a href="/"><ArrowLeft size={15}/> Ana sayfaya dön</a></section>
 </main>}
