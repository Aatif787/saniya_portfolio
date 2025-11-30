import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const UnderwaterScene = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const fishRef = useRef(null);
  const bubblesRef = useRef(null);
  const waterRef = useRef(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const startTime = useRef(performance.now());

  useEffect(() => {
    const container = containerRef.current;
    const canvasSupported = (() => {
      try { const c = document.createElement('canvas'); return !!(c.getContext && c.getContext('webgl')); } catch { return false; }
    })();
    if (!canvasSupported) {
      document.body.classList.add('underwater-fallback');
      return;
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x064273, 0.035);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0.5, 6);
    cameraRef.current = camera;

    const ambient = new THREE.AmbientLight(0x88aaff, 0.6);
    const dir = new THREE.DirectionalLight(0xaaddff, 0.8);
    dir.position.set(-2, 5, 4);
    scene.add(ambient, dir);

    const waterUniforms = {
      uTime: { value: 0 },
      uColorDeep: { value: new THREE.Color(0x022b43) },
      uColorShallow: { value: new THREE.Color(0x0a7aa6) },
      uCausticsIntensity: { value: 0.35 },
      uLightIntensity: { value: 0.6 },
      uDistortion: { value: 0.035 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };

    const waterMaterial = new THREE.ShaderMaterial({
      uniforms: waterUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime; 
        uniform vec2 uResolution;
        uniform vec3 uColorDeep; 
        uniform vec3 uColorShallow;
        uniform float uCausticsIntensity;
        uniform float uLightIntensity;
        uniform float uDistortion;

        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
        float noise(vec2 p){ vec2 i = floor(p); vec2 f = fract(p); float a = hash(i); float b = hash(i+vec2(1.0,0.0)); float c = hash(i+vec2(0.0,1.0)); float d = hash(i+vec2(1.0,1.0)); vec2 u = f*f*(3.0-2.0*f); return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y; }
        float fbm(vec2 p){ float v=0.0; float a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }

        void main(){
          vec2 uv = vUv;
          vec2 p = uv*vec2(uResolution.x/uResolution.y,1.0);
          float t = uTime*0.12;
          float caustics = fbm(uv*12.0 + vec2(t*0.7, t*0.5));
          float rays = max(0.0, sin(uv.y*16.0 + t*2.0))*0.5 + fbm(vec2(uv.x*2.0, uv.y*10.0 + t*1.5))*0.25;
          float depth = smoothstep(0.0, 1.0, uv.y);
          vec3 base = mix(uColorShallow, uColorDeep, depth);
          base += uCausticsIntensity * vec3(caustics*0.6, caustics*0.8, caustics);
          base += uLightIntensity * vec3(rays*0.35, rays*0.45, rays*0.55);
          float distort = fbm(uv*3.0 + vec2(t))*uDistortion;
          uv += vec2(distort*0.5, distort*0.7);
          vec3 col = base;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      depthWrite: false,
      transparent: true
    });
    const water = new THREE.Mesh(new THREE.PlaneGeometry(20, 12, 1, 1), waterMaterial);
    water.position.set(0, 0, -4);
    scene.add(water);
    waterRef.current = water;

    const bubbleCount = 300;
    const bubbleGeom = new THREE.BufferGeometry();
    const bubblePositions = new Float32Array(bubbleCount * 3);
    const bubbleSizes = new Float32Array(bubbleCount);
    for (let i=0;i<bubbleCount;i++){
      bubblePositions[i*3+0] = (Math.random()-0.5)*10;
      bubblePositions[i*3+1] = -5 - Math.random()*6;
      bubblePositions[i*3+2] = -1 - Math.random()*6;
      bubbleSizes[i] = 2 + Math.random()*8;
    }
    bubbleGeom.setAttribute('position', new THREE.BufferAttribute(bubblePositions, 3));
    bubbleGeom.setAttribute('size', new THREE.BufferAttribute(bubbleSizes, 1));
    const bubbleMat = new THREE.PointsMaterial({ color: 0x99ddee, size: 0.04, transparent: true, opacity: 0.6, depthWrite: false });
    const bubbles = new THREE.Points(bubbleGeom, bubbleMat);
    scene.add(bubbles);
    bubblesRef.current = bubbles;

    const fishCount = 24;
    const fishGeom = new THREE.PlaneGeometry(0.4, 0.2);
    const fishMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
    const fishGroup = new THREE.Group();
    for (let i=0;i<fishCount;i++){
      const fish = new THREE.Mesh(fishGeom, fishMat.clone());
      const hue = new THREE.Color().setHSL(Math.random(), 0.7, 0.6);
      fish.material.color.copy(hue);
      fish.position.set(-6 + Math.random()*12, -2 + Math.random()*4, -2 - Math.random()*4);
      fish.rotation.z = (Math.random()-0.5)*0.3;
      fish.userData.baseSpeed = 0.008 + Math.random()*0.025;
      fish.userData.speed = fish.userData.baseSpeed;
      fish.userData.vy = (Math.random()-0.5)*0.002;
      fish.userData.dir = Math.random()>0.5 ? 1 : -1;
      fish.userData.phase = Math.random()*Math.PI*2;
      fish.userData.curveAmp = 0.015 + Math.random()*0.025;
      fish.userData.turnCooldown = 0;
      fish.userData.burst = 0;
      fish.scale.set(1 + Math.random()*1.5, 1 + Math.random()*1.5, 1);
      fishGroup.add(fish);
    }
    scene.add(fishGroup);
    fishRef.current = fishGroup;

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      waterMaterial.uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener('resize', onResize);

    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      const now = performance.now();
      const t = (now - startTime.current) / 1000;
      waterMaterial.uniforms.uTime.value = t;

      const mx = mouseRef.current.x, my = mouseRef.current.y;
      camera.position.x += (mx*0.6 - camera.position.x)*0.06;
      camera.position.y += (my*0.4 - camera.position.y)*0.06;
      camera.lookAt(0,0,-2);

      const bp = bubbles.geometry.attributes.position.array;
      for(let i=0;i<bubbleCount;i++){
        bp[i*3+1] += 0.01 + (i%5)*0.0006;
        if (bp[i*3+1] > 6){ bp[i*3+1] = -6 - Math.random()*2; bp[i*3+0] = (Math.random()-0.5)*10; }
      }
      bubbles.geometry.attributes.position.needsUpdate = true;

      fishGroup.children.forEach((f) => {
        f.userData.phase += 0.01;
        const speedMod = Math.sin(t*0.8 + f.userData.phase)*0.004;
        if (f.userData.burst > 0) f.userData.burst *= 0.98; else if (Math.random() < 0.001) f.userData.burst = 0.02;
        f.userData.speed = f.userData.baseSpeed + speedMod + f.userData.burst;
        f.position.x += f.userData.speed * f.userData.dir;
        f.position.y += Math.sin(t*0.6 + f.userData.phase)*f.userData.curveAmp + f.userData.vy;
        f.position.z += Math.sin(t*0.3 + f.userData.phase)*0.002;
        if (f.userData.turnCooldown > 0) { f.userData.turnCooldown -= 1; } else if (Math.random() < 0.01) { f.userData.dir *= -1; f.rotation.y = f.userData.dir === 1 ? 0 : Math.PI; f.userData.turnCooldown = 200; }
        if (f.position.x > 7) { f.userData.dir = -1; f.rotation.y = Math.PI; f.userData.turnCooldown = 60; }
        if (f.position.x < -7){ f.userData.dir = 1; f.rotation.y = 0; f.userData.turnCooldown = 60; }
        if (f.position.y > 3) f.userData.vy = -Math.abs(f.userData.vy);
        if (f.position.y < -3) f.userData.vy = Math.abs(f.userData.vy);
        if (f.position.z < -6) f.position.z = -6;
        if (f.position.z > -1) f.position.z = -1;
      });

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0" style={{ zIndex: 0, pointerEvents: 'none' }} />
  );
};

export default UnderwaterScene;
