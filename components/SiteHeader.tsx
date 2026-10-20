'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a
        className="brand"
        href="/"
        aria-label="Temporary Urban Spaces ana sayfa"
      >
        <img src="/tu-mark.svg" alt="" />
        <span>
          TEMPORARY
          <br />
          URBAN SPACES
        </span>
      </a>
      <nav className={open ? 'nav is-open' : 'nav'} aria-label="Ana menü">
        <a href="/saha">Saha</a>
        <a href="/atlas">Atlas</a>
        <a href="/notlar">Notlar</a>
        <a href="/manifesto">Manifesto</a>
      </nav>
      <span className="edition">GÜMÜŞLÜK / 2026</span>
      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
