import React, { useEffect, useRef, useState } from 'react';
import { MicOff, Mic } from 'lucide-react';

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
  const lastTapRef = useRef(0);
  const targetVolume = 0.36;
  const playAttemptedRef = useRef(false);

  // Force autoplay on every mount/refresh
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset state on every mount
    playAttemptedRef.current = false;
    
    // Configure audio
    audio.src = tracks[index];
    audio.volume = targetVolume;
    audio.loop = false;
    audio.preload = 'auto';
    audio.playsInline = true;
    audio.crossOrigin = 'anonymous';
    audio.autoplay = true;
    audio.muted = true; // Start muted to guarantee playback

    console.log('🎵 Initializing autoplay...');

    // Aggressive autoplay function
    const forceAutoplay = async () => {
      if (playAttemptedRef.current) return;
      playAttemptedRef.current = true;

      try {
        // Play muted first (always works)
        await audio.play();
        console.log('✅ Playing muted');
        setPlaying(true);
        
        // Unmute immediately after play starts
        setTimeout(() => {
          audio.muted = false;
          console.log('✅ Unmuted - sound should be audible now');
        }, 100);

      } catch (err) {
        console.log('❌ Autoplay failed:', err.message);
        
        // Fallback: try again on next event loop
        setTimeout(async () => {
          try {
            await audio.play();
            setPlaying(true);
            setTimeout(() => {
              audio.muted = false;
            }, 100);
          } catch (e) {
            console.log('❌ Retry failed, waiting for user interaction');
          }
        }, 100);
      }
    };

    // Try multiple times with different triggers
    const tryPlay = () => {
      if (!playAttemptedRef.current) {
        forceAutoplay();
      }
    };

    // Immediate attempt
    tryPlay();

    // Retry on various ready states
    audio.addEventListener('loadedmetadata', tryPlay);
    audio.addEventListener('loadeddata', tryPlay);
    audio.addEventListener('canplay', tryPlay);
    audio.addEventListener('canplaythrough', tryPlay);

    // Also try after small delays
    const timers = [
      setTimeout(tryPlay, 50),
      setTimeout(tryPlay, 100),
      setTimeout(tryPlay, 200),
      setTimeout(tryPlay, 500)
    ];

    // Emergency unmute on any interaction (backup)
    const emergencyUnmute = () => {
      if (audio.muted) {
        audio.muted = false;
        console.log('✅ Emergency unmute triggered');
      }
      if (audio.paused) {
        audio.load();
        audio.play().then(() => setPlaying(true)).catch(console.error);
      }
    };

    const interactionEvents = ['click', 'pointerdown', 'touchstart', 'touchend', 'keydown', 'mousemove', 'scroll'];
    interactionEvents.forEach(event => {
      document.addEventListener(event, emergencyUnmute, { once: true, passive: true });
    });

    // Track management
    const handleEnded = () => {
      setIndex((prev) => (prev + 1) % tracks.length);
    };

    const handleError = (e) => {
      console.error('Audio error:', e);
      setIndex((prev) => (prev + 1) % tracks.length);
    };

    const handlePlay = () => {
      setPlaying(true);
      console.log('▶️ Audio playing');
    };
    
    const handlePause = () => {
      setPlaying(false);
      console.log('⏸️ Audio paused');
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Cleanup
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      audio.removeEventListener('loadedmetadata', tryPlay);
      audio.removeEventListener('loadeddata', tryPlay);
      audio.removeEventListener('canplay', tryPlay);
      audio.removeEventListener('canplaythrough', tryPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      interactionEvents.forEach(event => {
        document.removeEventListener(event, emergencyUnmute);
      });
      audio.pause();
      audio.src = '';
    };
  }, []); // Empty dependency = runs on every mount/refresh

  // Handle track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || index === 0) return;

    console.log(`🔄 Switching to track ${index + 1}`);
    
    const wasPlaying = playing;
    audio.src = tracks[index];
    audio.load();
    
    if (wasPlaying) {
      const playNext = () => {
        audio.muted = false;
        audio.volume = targetVolume;
        audio.play()
          .then(() => {
            setPlaying(true);
            console.log(`✅ Playing track ${index + 1}`);
          })
          .catch((err) => {
            console.error('Failed to play next track:', err);
            setPlaying(false);
          });
      };
      audio.addEventListener('canplaythrough', playNext, { once: true });
    }
  }, [index, playing]);

  // Toggle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      console.log('⏸️ Paused by user');
    } else {
      audio.muted = false;
      audio.volume = targetVolume;
      audio.play()
        .then(() => {
          setPlaying(true);
          console.log('▶️ Playing by user');
        })
        .catch((err) => {
          console.error('Play failed:', err);
          setPlaying(false);
        });
    }
  };

  // Skip track
  const skipTrack = () => {
    console.log('⏭️ Skipping track');
    setIndex((prev) => (prev + 1) % tracks.length);
  };

  // Button click handler
  const handleButtonClick = (e) => {
    e.stopPropagation();
    const now = Date.now();
    
    if (now - lastTapRef.current < 400) {
      skipTrack();
    } else {
      togglePlay();
    }
    
    lastTapRef.current = now;
  };

  return (
    <div className="fixed bottom-4 right-4 z-[110] flex items-center gap-2">
      <button
        onClick={handleButtonClick}
        onTouchEnd={handleButtonClick}
        onPointerUp={handleButtonClick}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-black/50 backdrop-blur-md text-white border-2 border-white/30 hover:bg-black/70 hover:border-white/50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        aria-label={playing ? 'Pause music' : 'Play music'}
        title="Click: Play/Pause | Double-click: Skip"
      >
        {playing ? <MicOff size={20} /> : <Mic size={20} />}
      </button>
      
      {playing && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md text-white text-xs border border-white/30 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="font-medium">Track {index + 1}/{tracks.length}</span>
        </div>
      )}
      
      <audio 
        ref={audioRef} 
        preload="auto" 
        playsInline 
        crossOrigin="anonymous"
        autoPlay
        muted
      />
    </div>
  );
};

export default MusicController;
