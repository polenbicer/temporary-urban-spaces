'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';

const photos = Array.from({length:64},(_,i)=>({id:i+1,src:`/field/gumusluk-${String(i+1).padStart(2,'0')}.jpg`}));

export default function AtlasPage(){
 const [active,setActive]=useState<number|null>(null);
 return <main className="subpage atlas-page"><SiteHeader/>
  <section className="atlas-hero"><span>ATLAS / 64 KARE</span><h1>Görülen.<br/>Bekleyen.<br/><em>Dönüşen.</em></h1><p>Gümüşlük saha gezisinin tamamı. Bir kareyi seçerek büyütün.</p><a href="/"><ArrowLeft size={15}/> Ana sayfaya dön</a></section>
  <section className="photo-grid">{photos.map((photo,i)=><button key={photo.id} onClick={()=>setActive(i)}><img src={photo.src} alt={`Gümüşlük saha fotoğrafı ${photo.id}`} loading="lazy"/><span>{String(photo.id).padStart(2,'0')}</span></button>)}</section>
  {active!==null&&<div className="lightbox" role="dialog" aria-modal="true"><button className="close" onClick={()=>setActive(null)} aria-label="Kapat"><X/></button><img src={photos[active].src} alt={`Gümüşlük saha fotoğrafı ${active+1}`}/><div><span>{String(active+1).padStart(2,'0')} / 64</span><nav><button onClick={()=>setActive((active-1+64)%64)} aria-label="Önceki"><ArrowLeft/></button><button onClick={()=>setActive((active+1)%64)} aria-label="Sonraki"><ArrowRight/></button></nav></div></div>}
 </main>;
}
