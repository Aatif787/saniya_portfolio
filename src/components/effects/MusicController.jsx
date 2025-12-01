import React, { useEffect, useRef, useState } from 'react';
import Icon from '../AppIcon';

const localTracks = [
  '/assets/audio1.mp3',
  '/assets/audio2.mp3',
  '/assets/audio3.mp3',
  '/assets/audio4.mp3',
  '/assets/audio5.mp3'
];
const remoteTracks = [
  'https://cdn.pixabay.com/audio/2021/08/09/audio_c601c45b13.mp3',
  'https://cdn.pixabay.com/audio/2022/03/02/audio_6b4c1a467f.mp3',
  'https://cdn.pixabay.com/audio/2022/01/20/audio_17e1b0bc8e.mp3',
  'https://cdn.pixabay.com/audio/2022/11/09/audio_0f59f31f65.mp3',
  'https://cdn.pixabay.com/audio/2021/09/29/audio_c20c8c7b3f.mp3'
];
const tracks = [...localTracks, ...remoteTracks];

const MusicController = () => {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showVol, setShowVol] = useState(false);
  const lastTapRef = useRef(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = tracks[index];
    audio.loop = true;
    audio.preload = 'auto';
    audio.playsInline = true;
    audio.crossOrigin = 'anonymous';
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    const targetVolume = mobile ? 0.35 : 0.4;
    audio.volume = 0;
    audio.muted = true;
    audio.playbackRate = 1.0;
    const tryPlay = () => audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    tryPlay();
    const resumeOnGesture = () => {
      audio.muted = false;
      const steps = 20;
      const inc = targetVolume / steps;
      let i = 0;
      const id = setInterval(() => {
        i += 1;
        audio.volume = Math.min(targetVolume, audio.volume + inc);
        if (i >= steps) clearInterval(id);
      }, 60);
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      window.removeEventListener('click', resumeOnGesture);
      window.removeEventListener('mousemove', resumeOnGesture);
      window.removeEventListener('wheel', resumeOnGesture);
      window.removeEventListener('pointerup', resumeOnGesture);
      window.removeEventListener('touchstart', resumeOnGesture);
      window.removeEventListener('touchend', resumeOnGesture);
      window.removeEventListener('keydown', resumeOnGesture);
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
      if (audio.volume === 0) audio.volume = window.matchMedia('(max-width: 640px)').matches ? 0.25 : 0.3;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const setVolume = (v) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio.volume = Math.max(0, Math.min(1, v));
    if (!playing) audio.play().then(() => setPlaying(true)).catch(() => {});
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
      <button
        onClick={() => setShowVol((s) => !s)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur text-white border border-white/20 hover:bg-black/55 transition"
        aria-label="Volume"
      >
        <Icon name={'Volume'} size={18} />
      </button>
      {showVol && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          defaultValue={0.3}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-28 h-2 accent-primary bg-white/20 rounded-full"
        />
      )}
      <audio ref={audioRef} className="hidden" preload="auto" playsInline crossOrigin="anonymous" autoPlay muted loop />
    </div>
  );
};

export default MusicController;
