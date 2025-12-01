import React, { useEffect, useRef, useState } from 'react';
import Icon from '../AppIcon';

const tracks = [
  '/assets/audio1.mp3',
  '/assets/audio2.mp3',
  '/assets/audio3.mp3',
  '/assets/audio4.mp3',
  '/assets/audio5.mp3'
];

const MusicController = () => {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showVol] = useState(false);
  const lastTapRef = useRef(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = tracks[index];
    audio.loop = false;
    audio.preload = 'auto';
    audio.playsInline = true;
    audio.crossOrigin = 'anonymous';
    audio.autoplay = true;
    const targetVolume = 0.36;
    audio.volume = 0;
    audio.muted = true;
    audio.playbackRate = 1.0;
    const tryPlay = () => audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    tryPlay();
    const resumeOnGesture = () => {
      audio.muted = false;
      audio.volume = targetVolume;
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      window.removeEventListener('click', resumeOnGesture);
      window.removeEventListener('mousemove', resumeOnGesture);
      window.removeEventListener('wheel', resumeOnGesture);
      window.removeEventListener('pointerup', resumeOnGesture);
      window.removeEventListener('touchstart', resumeOnGesture);
      window.removeEventListener('touchend', resumeOnGesture);
      window.removeEventListener('keydown', resumeOnGesture);
    };
    const onEnded = () => {
      setIndex((prev) => (prev + 1) % tracks.length);
    };
    const onCanPlay = () => {
      // second attempt to start quietly, then fade if policy allows
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };
    const onError = () => {
      // skip to next track if current fails (e.g., missing local file)
      setIndex((prev) => (prev + 1) % tracks.length);
    };
    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('error', onError);
    audio.addEventListener('ended', onEnded);
    const handleDbl = () => {
      const next = (index + 1) % tracks.length;
      setIndex(next);
    };
    const handleTouch = () => {
      const now = Date.now();
      if (now - lastTapRef.current < 300) handleDbl();
      lastTapRef.current = now;
    };
    window.addEventListener('click', resumeOnGesture, { passive: true });
    window.addEventListener('mousemove', resumeOnGesture, { passive: true });
    window.addEventListener('wheel', resumeOnGesture, { passive: true });
    window.addEventListener('touchstart', resumeOnGesture, { passive: true });
    window.addEventListener('pointerup', resumeOnGesture, { passive: true });
    window.addEventListener('keydown', resumeOnGesture, { passive: true });
    window.addEventListener('dblclick', handleDbl, { passive: true });
    window.addEventListener('touchend', handleTouch, { passive: true });
    return () => {
      window.removeEventListener('click', resumeOnGesture);
      window.removeEventListener('mousemove', resumeOnGesture);
      window.removeEventListener('wheel', resumeOnGesture);
      window.removeEventListener('touchstart', resumeOnGesture);
      window.removeEventListener('pointerup', resumeOnGesture);
      window.removeEventListener('keydown', resumeOnGesture);
      window.removeEventListener('dblclick', handleDbl);
      window.removeEventListener('touchend', handleTouch);
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    const srcChanged = tracks[index];
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = srcChanged;
    audio.load();
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [index]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.muted = false;
      if (audio.volume === 0) audio.volume = 0.36;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      <button
        onClick={togglePlay}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur text-white border border-white/20 hover:bg-black/55 transition"
        aria-label={playing ? 'Stop ambient' : 'Play ambient'}
      >
        <Icon name={playing ? 'MicOff' : 'Mic'} size={18} />
      </button>
      <audio ref={audioRef} className="hidden" preload="auto" playsInline crossOrigin="anonymous" autoPlay muted />
    </div>
  );
};

export default MusicController;
