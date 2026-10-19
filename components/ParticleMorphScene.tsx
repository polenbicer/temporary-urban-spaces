'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COLORS = ['#8a62ff', '#e5a82b', '#f4f1e9', '#df6a9d', '#57c9c7'];
const ATLAS_IMAGES = ['03','08','14','18','21','24','29','32','34','38','41','42','45','46','49','50','52','53','55','57','59','60','63','64'];

const ease = (value: number) => 1 - Math.pow(1 - value, 3);
const random = (min: number, max: number) => min + Math.random() * (max - min);

function makeUrban(count: number) {
  const result = new Float32Array(count * 3);
  const blocks = [
    [-2.7, 1.6, 1.8, .8], [-.7, 1.85, 1.25, 1.1], [1.0, 1.55, 2.0, .7],
    [-2.35, .35, 1.3, 1.0], [-.65, .2, .95, 1.3], [.8, .35, 1.4, 1.0], [2.35, .1, .9, 1.55],
    [-2.55, -1.15, 1.7, .75], [-.65, -1.2, 1.45, .95], [1.0, -1.25, 1.8, .8], [2.55, -1.25, .75, .7],
  ];
  for (let i = 0; i < count; i++) {
    const b = blocks[Math.floor(Math.random() * blocks.length)];
    const edge = Math.random() < .74;
    let x = b[0] + random(-b[2] / 2, b[2] / 2);
    let y = b[1] + random(-b[3] / 2, b[3] / 2);
    if (edge) Math.random() < .5 ? x = b[0] + (Math.random() < .5 ? -1 : 1) * b[2] / 2 : y = b[1] + (Math.random() < .5 ? -1 : 1) * b[3] / 2;
    result[i * 3] = x;
    result[i * 3 + 1] = y;
    result[i * 3 + 2] = random(-.75, .75) + Math.sin(x * 1.4) * .22;
  }
  return result;
}

function makeChaos(count: number) {
  const result = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    result[i * 3] = random(-4.8, 4.8);
    result[i * 3 + 1] = random(-3.0, 3.0);
    result[i * 3 + 2] = random(-2.3, 2.3);
  }
  return result;
}

function makeBulb(count: number) {
  const result = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    if (t < .76) {
      const angle = random(0, Math.PI * 2);
      const radius = 1.95 * Math.sqrt(Math.random());
      const squash = .82 + .18 * Math.cos(angle);
      result[i * 3] = Math.cos(angle) * radius * squash;
      result[i * 3 + 1] = 1.0 + Math.sin(angle) * radius;
      result[i * 3 + 2] = random(-.85, .85) * (1 - radius / 2.4);
    } else {
      const row = Math.floor(random(0, 5));
      result[i * 3] = random(-.82, .82);
      result[i * 3 + 1] = -1.05 - row * .28 + random(-.05, .05);
      result[i * 3 + 2] = random(-.38, .38);
    }
  }
  return result;
}

function makeGlobe(count: number) {
  const result = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = Math.PI * (3 - Math.sqrt(5)) * i;
    const r = 2.45 + random(-.12, .12);
    result[i * 3] = Math.cos(theta) * radius * r;
    result[i * 3 + 1] = y * r;
    result[i * 3 + 2] = Math.sin(theta) * radius * r;
  }
  return result;
}

function makeLogo(count: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 400; canvas.height = 240;
  const context = canvas.getContext('2d')!;
  context.fillStyle = '#fff';
  context.font = '900 176px Arial, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('T/U', 200, 126);
  const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const pixels: [number, number][] = [];
  for (let y = 0; y < canvas.height; y += 3) for (let x = 0; x < canvas.width; x += 3) if (data[(y * canvas.width + x) * 4 + 3] > 100) pixels.push([x, y]);
  const result = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const p = pixels[Math.floor(math.random() * pixels.length)];
    result[i * 3] = (p[0] / canvas.width - .5) * 7.2 + random(-.035, .035);
    result[i * 3 + 1] = (.5 - p[1] / canvas.height) * 4.3 + random(-.035, .035);
    result[i * 3 + 2] = random(-.35, .35);
  }
  return result;
}

function makeAtlas() {
  const tileW = 128, tileH = 92, cols = 6, rows = 4;
  const canvas = document.createElement('canvas');
  canvas.width = tileW * cols; canvas.height = tileH * rows;
  const context = canvas.getContext('2d')!;
  context.fillStyle = '#090909'; context.fillRect(0, 0, canvas.width, canvas.height);
  return Promise.all(ATLAS_IMAGES.map((name, index) => new Promise<void>(resolve => {
    const image = new Image();
    image.onload = () => {
      const col = index % cols, row = Math.floor(index / cols);
      const scale = Math.max(tileW / image.width, tileH / image.height);
      const width = image.width * scale, height = image.height * scale;
      context.drawImage(image, col * tileW + (tileW - width) / 2, row * tileH + (tileH - height) / 2, width, height);
      resolve();
    };
    image.onerror = () => resolve();
    image.src = `/atlas/${name}.jpg`;
  }))).then(() => new THREE.CanvasTexture(canvas));
}

export function ParticleMorphScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 700;
    const  count = isMobile ? 1250 : 2350;
    const cardCount = isMobile ? 80 : 150;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.55));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, .1, 40);
    camera.position.z = isMobile ? 8.7 : 7.6;

    const targets = [makeUrban(count), makeChaos(count), makeBulb(count), makeGlobe(count), makeLogo(count)];
    const current = targets[0].slice();
    const start = current.slice();
    const geometry = new THREE.BufferGeometry();
    const position = new THREE.BufferAttribute(current, 3);
    geometry.setAttribute('position', position);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const delays = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color(COLORS[i % COLORS.length]);
      colors.set([color.r, color.g, color.b], i * 3);
      sizes[i] = random(isMobile ? 2.6 : 3.0, isMobile ? 5.6 : 7.0);
      delays[i] = Math.random();
    }
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    const pointMaterial = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.NormalBlending,
      vertexShader: `attribute vec3 aColor; attribute float aSize; varying vec3 vColor; varying float vDepth;
        void main(){ vec4 mv=modelViewMatrix*vec4(position,1.0); gl_Position=projectionMatrix*mv; gl_PointSize=aSize*(7.0/-mv.z); vColor=aColor; vDepth=clamp((-mv.z-3.0)/7.0,0.0,1.0); }`,
      fragmentShader: `varying vec3 vColor; varying float vDepth;
        void main(){ vec2 p=gl_PointCoord*2.0-1.0; p.y*=-1.0; float d=max(abs(p.x)*0.866+p.y*0.5,-p.y); if(d>0.62||d<0.45) discard; float a=mix(0.18,0.70,vepth); gl_FragColor=vec4(vColor,a); }`,
    });
    const points = new THREE.Points(geometry, pointMaterial);
    scene.add(points);

    let cardMesh: THREE.Mesh | null = null;
    let cardOffsets: THREE.InstancedBufferAttribute | null = null;
    let cardRects: THREE.InstancedBufferAttribute | null = null;
    let cardNextRects: THREE.InstancedBufferAttribute | null = null;
    let cardMaterial: THREE.ShaderMaterial | null = null;
    let cardCurrent = new Float32Array(cardCount * 3);
    let photoMix = 1;
    let atlasShift = 0;
    let disposed = false;
    makeAtlas().then(texture => {
      if (disposed) { texture.dispose(); return; }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      const plane = new THREE.PlaneGeometry(1.05, .72).toNonIndexed();
      const instanced = new THREE.InstancedBufferGeometry();
      instanced.setAttribute('position', plane.getAttribute('position'));
      instanced.setAttribute('uv', plane.getAttribute('uv'));
      for (let i = 0; i < cardCount; i++) {
        const pi = (i * 17) % count;
        cardCurrent.set([current[pi * 3], current[pi * 3 + 1], current[pi * 3 + 2] + random(-.35, .35)], i * 3);
      }
      cardOffsets = new THREE.InstancedBufferAttribute(cardCurrent, 3);
      instanced.setAttribute('instanceOffset', cardOffsets);
      const rects = new Float32Array(cardCount * 4);
      const nextRects = new Float32Array(cardCount * 4);
      for (let i = 0; i < cardCount; i++) {
        const tile = i % 24, col = tile % 6, row = Math.floor(tile / 6);
        rects.set([col / 6, 1 - (row + 1) / 4, 1 / 6, 1 / 4], i * 4);
        nextRects.set([col / 6, 1 - (row + 1) / 4, 1 / 6, 1 / 4], i * 4);
      }
      cardRects = new THREE.InstancedBufferAttribute(rects, 4);
      cardNextRects = new THREE.InstancedBufferAttribute(nextRects, 4);
      instanced.setAttribute('uvRect', cardRects);
      instanced.setAttribute('uvRectNext', cardNextRects);
      instanced.instanceCount = cardCount;
      const material = new THREE.ShaderMaterial({
        uniforms: { map: { value: texture }, uPhotoMix: { value: 1 } }, transparent: true, depthWrite: false,
        vertexShader: `attribute vec3 instanceOffset; attribute vec4 uvRect; attribute vec4 uvRectNext; varying vec2 vUv; varying vec2 vUvNext; varying float vDepth;
          void main(){ vec4 mv=modelViewMatrix*vec4(instanceOffset,1.0); mv.xy+=position.xy*.34; gl_Position=projectionMatrix*mv; vUv=uvRect.xy+uv*uvRect.zw; vUvNext=uvRectNext.xy+uv*uvRectNext.zw; vDepth=clamp((-mv.z-2.5)/8.0,0.0,1.0); }`,
        fragmentShader: `uniform sampler2D map; uniform float uPhotoMix; varying vec2 vUv; varying vec2 vUvNext; varying float vDepth;
          void main(){ vec2 q=fract(vUv*vec2(6.0,4.0)); float r=.09; vec2 d=abs(q-.5)-vec2(.5-r); float mask=1.0-smoothstep(r-.02,r+.01,length(max(d,0.0))+min(max(d.x,d.y),0.0)); vec4 currentPhoto=texture2D(map,vUv); vec4 nextPhoto=texture2D(map,vUvNext); vec4 c=mix(currentPhoto,nextPhoto,smoothstep(0.0,1.0,uPhotoMix)); gl_FragColor=vec4(c.rgb,mix(.12,.44,vDepth)*mask); }`,
      });
      cardMaterial = material;
      cardMesh = new THREE.Mesh(instanced, material); scene.add(cardMesh);
      plane.dispose();
    });

    let active = 0;
    let previous = 0;
    let morphStart = performance.now();
    const setTarget = (next: number) => {
      if (next === active) return;
      previous = active; active = next; morphStart = performance.now(); start.set(current);
      if (reducedMotion) { current.set(targets[active]); position.needsUpdate = true; }
    };
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-morph]'));
    const onScroll = () => {
      let next = 0, distance = Infinity;
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const value = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        if (value < distance) { distance = value; next = Number(section.dataset.morph); }
      });
      setTarget(next);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let pointerX = 0, pointerY = 0;
    const onPointer = (event: PointerEvent) => {
      if (reducedMotion) return;
      pointerX = event.clientX / window.innerWidth - .5;
      pointerY = event.clientY / window.innerHeight - .5;
      const column = Math.min(5, Math.max(0, Math.floor((pointerX + .5) * 6)));
      const row = Math.min(3, Math.max(0, Math.floor((pointerY + .5) * 4)));
      const nextShift = row * 6 + column;
      if (nextShift === atlasShift || !cardRects || !cardNextRects) return;
      const rects = cardRects.array as Float32Array;
      const nextRects = cardNextRects.array as Float32Array;
      rects.set(photoMix > .5 ? nextRects : rects);
      for (let i = 0; i < cardCount; i++) {
        const tile = (i + nextShift * 7) % 24;
        const col = tile % 6, atlasRow = Math.floor(tile / 6);
        nextRects.set([col / 6, 1 - (atlasRow + 1) / 4, 1 / 6, 1 / 4], i * 4);
      }
      cardRects.needsUpdate = true;
      cardNextRects.nedsUpdate = true;
      photoMix = 0;
      atlasShift = nextShift;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    const onResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight, false); };
    window.addEventListener('resize', onResize);

    let frame = 0;
    const tick = (time: number) => {
      const elapsed = time - morphStart;
      if (!reducedMotion) {
        for (let i = 0; i < count; i++) {
          const local = Math.max(0, Math.min(1, (elapsed - delays[i] * 680) / 1350));
          const t = ease(local), idx = i * 3;
          current[idx] = THREE.MathUtils.lerp(start[idx], targets[active][idx], t);
          current[idx + 1] = THREE.MathUtils.lerp(start[idx + 1], targets[active][idx + 1], t);
          current[idx + 2] = THREE.MathUtils.lerp(start[idx + 2], targets[active][idx + 2], t);
        }
        position.needsUpdate = true;
        points.rotation.y += .00045;
        camera.position.x += (pointerX * .28 - camera.position.x) * .035;
        camera.position.y += (-pointerY * .20 - camera.position.y) * .035;
        if (cardMesh) {
          cardMesh.position.x += (pointerX * .58 - cardMesh.position.x) * .045;
          cardMesh.position.y += (-pointerY * .38 - cardMesh.position.y) * .045;
        }
        if (cardMaterial) {
          photoMix += (1 - photoMix) * .075;
          cardMaterial.uniforms.uPhotoMix.value = photoMix;
        }
      }
      if (cardOffsets) {
        for (let i = 0; i < cardCount; i++) {
          const p = (i * 17) % count, ci = i * 3, pi = p * 3;
          cardCurrent[ci] += (current[pi] - cardCurrent[ci]) * (reducedMotion ? 1 : .065);
          cardCurrent[ci + 1] += (current[pi + 1] - cardCurrent[ci + 1]) * (reducedMotion ? 1 : .065);
          cardCurrent[ci + 2] += (current[pi + 2] + .12 - cardCurrent[ci + 2]) * (reducedMotion ? 1 : .065);
        }
        cardOffsets.needsUpdate = true;
      }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      disposed = true; cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); window.removeEventListener('pointermove', onPointer);
      geometry.dispose(); pointMaterial.dispose();
      if (cardMesh) { cardMesh.geometry.dispose(); (cardMesh.material as THREE.Material).dispose(); }
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="morph-canvas" aria-hidden="true" />;
}
