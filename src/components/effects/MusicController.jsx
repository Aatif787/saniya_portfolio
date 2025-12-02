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
  const [showMobileTap, setShowMobileTap] = useState(false);
  const lastTapRef = useRef(0);
  const targetVolume = 0.24;
  const playAttemptedRef = useRef(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    // Detect mobile device
    isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                          ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0);

    const audio = audioRef.current;
    if (!audio) return;

    playAttemptedRef.current = false;
    
    // Configure audio with mobile-specific settings
    audio.src = tracks[index];
    audio.volume = targetVolume;
    audio.loop = false;
    audio.preload = 'auto';
    audio.playsInline = true; // Critical for iOS
    audio.setAttribute('playsinline', ''); // iOS Safari requirement
    audio.setAttribute('webkit-playsinline', ''); // Older iOS
    audio.crossOrigin = 'anonymous';
    audio.muted = true;
    const clampVolume = () => {
      if (audio.volume > targetVolume) audio.volume = targetVolume;
    };
    audio.addEventListener('volumechange', clampVolume);

    console.log('📱 Mobile device:', isMobileRef.current);
    console.log('🎵 Initializing autoplay...');

    // Autoplay function
    const forceAutoplay = async () => {
      if (playAttemptedRef.current) return;
      playAttemptedRef.current = true;

      try {
        await audio.play();
        console.log('✅ Playing muted');
        setPlaying(true);
        
        // Unmute after successful play
        setTimeout(() => {
          audio.muted = false;
          console.log('✅ Unmuted');
          setShowMobileTap(false);
        }, 150);

      } catch (err) {
        console.log('❌ Autoplay blocked:', err.message);
        
        // On mobile, show tap prompt
        if (isMobileRef.current) {
          setShowMobileTap(true);
          console.log('📱 Showing mobile tap prompt');
        }
        
        playAttemptedRef.current = false;
      }
    };

    // Try to play
    const tryPlay = () => {
      if (!playAttemptedRef.current) {
        forceAutoplay();
      }
    };

    // Mobile-specific: Start on touch events
    const handleMobileStart = async (e) => {
      console.log('👆 Touch detected, starting playback');
      setShowMobileTap(false);
      
      try {
        audio.muted = false;
        audio.volume = targetVolume;
        await audio.play();
        setPlaying(true);
        console.log('✅ Playing after touch');
      } catch (err) {
        console.error('Play failed:', err);
      }
    };

    // Desktop: Try autoplay immediately
    if (!isMobileRef.current) {
      tryPlay();
      audio.addEventListener('loadedmetadata', tryPlay);
      audio.addEventListener('canplay', tryPlay);
      audio.addEventListener('canplaythrough', tryPlay);
      
      setTimeout(tryPlay, 100);
      setTimeout(tryPlay, 300);
    } else {
      // Mobile: Show prompt and wait for touch
      setShowMobileTap(true);
    }

    // Listen for mobile interactions
    const mobileEvents = ['touchstart', 'touchend', 'click'];
    if (isMobileRef.current) {
      mobileEvents.forEach(event => {
        document.addEventListener(event, handleMobileStart, { once: true, passive: true });
        window.addEventListener(event, handleMobileStart, { once: true, passive: true });
      });
    }

    // Desktop interaction fallback
    const desktopUnmute = () => {
      if (!isMobileRef.current && audio.muted) {
        audio.muted = false;
        console.log('✅ Desktop unmute');
      }
      if (audio.paused) {
        audio.play().then(() => setPlaying(true)).catch(console.error);
      }
    };

    const desktopEvents = ['click', 'keydown', 'mousemove'];
    desktopEvents.forEach(event => {
      document.addEventListener(event, desktopUnmute, { once: true, passive: true });
    });

    // Global double-click and double-tap for skipping track
    const handleGlobalDblClick = () => {
      skipTrack();
    };
    const handleGlobalTouchEnd = () => {
      const now = Date.now();
      if (now - lastTapRef.current < 400) {
        skipTrack();
      }
      lastTapRef.current = now;
    };
    window.addEventListener('dblclick', handleGlobalDblClick);
    document.addEventListener('dblclick', handleGlobalDblClick);
    window.addEventListener('touchend', handleGlobalTouchEnd);
    document.addEventListener('touchend', handleGlobalTouchEnd);

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
      setShowMobileTap(false);
    };
    
    const handlePause = () => {
      setPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Mobile: Pause when app goes to background/minimize
    const handleVisibilityChange = () => {
      if (isMobileRef.current) {
        if (document.hidden) {
          // Page is hidden (minimized/switched tabs)
          if (!audio.paused) {
            audio.pause();
            console.log('📱 Paused - App minimized');
          }
        }
      }
    };

    // Mobile: Pause when page loses focus
    const handleBlur = () => {
      if (isMobileRef.current && !audio.paused) {
        audio.pause();
        console.log('📱 Paused - App lost focus');
      }
    };

    // Add visibility and blur listeners for mobile
    if (isMobileRef.current) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('blur', handleBlur);
      window.addEventListener('pagehide', handleBlur);
    }

    return () => {
      audio.removeEventListener('loadedmetadata', tryPlay);
      audio.removeEventListener('canplay', tryPlay);
      audio.removeEventListener('canplaythrough', tryPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      
      mobileEvents.forEach(event => {
        document.removeEventListener(event, handleMobileStart);
        window.removeEventListener(event, handleMobileStart);
      });
      
      desktopEvents.forEach(event => {
        document.removeEventListener(event, desktopUnmute);
      });

      window.removeEventListener('dblclick', handleGlobalDblClick);
      document.removeEventListener('dblclick', handleGlobalDblClick);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
      document.removeEventListener('touchend', handleGlobalTouchEnd);

      audio.removeEventListener('volumechange', clampVolume);
      
      // Remove mobile-specific listeners
      if (isMobileRef.current) {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleBlur);
        window.removeEventListener('pagehide', handleBlur);
      }
      
      audio.pause();
      audio.src = '';
    };
  }, []);

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
    } else {
      audio.muted = false;
      audio.volume = targetVolume;
      audio.play()
        .then(() => {
          setPlaying(true);
          setShowMobileTap(false);
        })
        .catch((err) => {
          console.error('Play failed:', err);
          setPlaying(false);
        });
    }
  };

  // Skip track
  const skipTrack = () => {
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
    <>
      {/* Mobile tap prompt - pulsing button overlay */}
      {showMobileTap && isMobileRef.current && (
        <div 
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => {
            const audio = audioRef.current;
            if (audio) {
              audio.muted = false;
              audio.volume = targetVolume;
              audio.play()
                .then(() => {
                  setPlaying(true);
                  setShowMobileTap(false);
                })
                .catch(console.error);
            }
          }}
        >
          <div className="text-center">
            <button 
              className="flex items-center justify-center w-20 h-20 rounded-full bg-white text-black shadow-2xl animate-pulse hover:scale-110 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                const audio = audioRef.current;
                if (audio) {
                  audio.muted = false;
                  audio.volume = targetVolume;
                  audio.play()
                    .then(() => {
                      setPlaying(true);
                      setShowMobileTap(false);
                    })
                    .catch(console.error);
                }
              }}
            >
              <Mic size={32} />
            </button>
            <p className="text-white text-sm mt-4 font-medium">Tap to start music</p>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-[110] flex items-center gap-2">
        <button
          onClick={handleButtonClick}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-black/50 backdrop-blur-md text-white border-2 border-white/30 hover:bg-black/70 hover:border-white/50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          aria-label={playing ? 'Pause music' : 'Play music'}
          title="Click: Play/Pause | Double-click: Skip"
        >
          {playing ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      </div>
      
      <audio 
        ref={audioRef} 
        preload="auto" 
        playsInline
        webkit-playsinline="true"
        x-webkit-airplay="allow"
        crossOrigin="anonymous"
      />
    </>
  );
};

export default MusicController;
