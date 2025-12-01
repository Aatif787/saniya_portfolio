import React, { useEffect, useRef, useState } from 'react';
import Icon from '../AppIcon';

const tracks = [
  'https://cdn.pixabay.com/audio/2022/03/15/audio_1bce25f6d8.mp3',
  'https://cdn.pixabay.com/audio/2021/09/29/audio_c20c8c7b3f.mp3',
  'https://cdn.pixabay.com/audio/2022/01/20/audio_17e1b0bc8e.mp3'
];

const MusicController = () => {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const lastTapRef = useRef(0);

  useEffect(() => {
    const audio = new Audio(tracks[index]);
    audio.loop = true;
    audio.preload = 'auto';
    audio.playsInline = true;
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    const targetVolume = mobile ? 0.14 : 0.18;
    audio.volume = 0; // start silent to satisfy autoplay policies
    audio.muted = true;
    audio.playbackRate = 1.0;
    audioRef.current = audio;
    const tryPlay = () => audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    tryPlay();
    const resumeOnGesture = () => {
      // unmute and raise volume on first interaction
      audio.muted = false;
      audio.volume = targetVolume;
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      // after setting volume once, remove listeners to avoid repeated calls
      window.removeEventListener('click', resumeOnGesture);
      window.removeEventListener('pointerup', resumeOnGesture);
      window.removeEventListener('touchend', resumeOnGesture);
      window.removeEventListener('keydown', resumeOnGesture);
    };
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
    window.addEventListener('pointerup', resumeOnGesture, { passive: true });
    window.addEventListener('keydown', resumeOnGesture, { passive: true });
    window.addEventListener('dblclick', handleDbl, { passive: true });
    window.addEventListener('touchend', handleTouch, { passive: true });
    return () => {
      window.removeEventListener('click', resumeOnGesture);
      window.removeEventListener('pointerup', resumeOnGesture);
      window.removeEventListener('keydown', resumeOnGesture);
      window.removeEventListener('dblclick', handleDbl);
      window.removeEventListener('touchend', handleTouch);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    const srcChanged = tracks[index];
    const audio = audioRef.current;
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
      if (audio.volume === 0) audio.volume = window.matchMedia('(max-width: 640px)').matches ? 0.14 : 0.18;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={togglePlay}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur text-white border border-white/20 hover:bg-black/55 transition"
        aria-label={playing ? 'Stop ambient' : 'Play ambient'}
      >
        <Icon name={playing ? 'MicOff' : 'Mic'} size={18} />
      </button>
    </div>
  );
};

export default MusicController;
