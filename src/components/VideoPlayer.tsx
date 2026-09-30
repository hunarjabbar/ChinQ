import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Subtitles,
  PictureInPicture,
  Settings
} from 'lucide-react';

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  subtitles?: string[];
  autoPlay?: boolean;
  className?: string;
}

export function VideoPlayer({
  src,
  poster,
  title,
  subtitles = ['English', 'Arabic', 'Chinese', 'Kurdish'],
  autoPlay = false,
  className = ''
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [selectedSubtitle, setSelectedSubtitle] = useState(subtitles[0] || 'English');
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const controlsTimeoutRef = useRef<any>(null);

  const hideControlsTimer = useCallback(() => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
        setShowSpeedMenu(false);
        setShowSubMenu(false);
      }
    }, 3000);
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const seekRelative = useCallback((delta: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(Math.max(videoRef.current.currentTime + delta, 0), duration || 1000);
  }, [duration]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  const togglePictureInPicture = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (e) {
      console.warn('PiP error', e);
    }
  };

  // Keyboard navigation & shortcuts (Space, Arrow keys, F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if focus is in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekRelative(-5);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekRelative(5);
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, seekRelative, toggleFullscreen]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.volume = volume || 0.8;
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleRateSelect = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) videoRef.current.playbackRate = rate;
    setShowSpeedMenu(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={hideControlsTimer}
      onClick={hideControlsTimer}
      className={`relative group bg-black text-white rounded-2xl overflow-hidden aspect-video shadow-2xl select-none flex items-center justify-center ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Title Watermark */}
      {title && (
        <div
          className={`absolute top-4 inset-inline-start-4 transition-opacity duration-300 z-20 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-800)] animate-soft-vibrate"></span>
            <span>{title}</span>
          </div>
        </div>
      )}

      {/* Subtitles Overlay */}
      {showSubtitles && isPlaying && (
        <div className="absolute bottom-16 inset-inline-0 flex justify-center px-4 pointer-events-none z-10">
          <div className="bg-black/85 text-white text-xs sm:text-sm font-medium px-4 py-1.5 rounded-md backdrop-blur-sm border border-white/10 shadow-lg text-center max-w-xl">
            [{selectedSubtitle}] Sovereign diplomatic audio stream synchronized.
          </div>
        </div>
      )}

      {/* Big Center Play Button when paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute z-20 w-16 h-16 rounded-full bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white flex items-center justify-center shadow-2xl transform hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Play Video"
        >
          <Play size={28} className="translate-x-0.5 fill-current" />
        </button>
      )}

      {/* Controls Bar */}
      <div
        className={`absolute bottom-0 inset-inline-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 transition-opacity duration-300 z-30 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Timeline Slider */}
        <div className="relative mb-3 flex items-center group/scrubber cursor-pointer">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeekChange}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[var(--color-brand-800)] focus:outline-none"
          />
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between text-xs text-white/90">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-1.5 hover:text-[var(--color-brand-800)] transition-colors cursor-pointer"
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-current" />}
            </button>

            <button
              onClick={() => seekRelative(-5)}
              className="p-1.5 hover:text-white transition-colors cursor-pointer hidden sm:block"
              title="Rewind 5s (Left Arrow)"
            >
              <RotateCcw size={16} />
            </button>

            <button
              onClick={() => seekRelative(5)}
              className="p-1.5 hover:text-white transition-colors cursor-pointer hidden sm:block"
              title="Forward 5s (Right Arrow)"
            >
              <RotateCw size={16} />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1.5 group/vol">
              <button onClick={toggleMute} className="p-1.5 hover:text-[var(--color-brand-800)] transition-colors cursor-pointer">
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[var(--color-brand-800)]"
              />
            </div>

            {/* Time Indicator */}
            <div className="text-[11px] font-mono text-neutral-300 ms-2">
              <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Subtitles Button & Menu */}
            <div className="relative">
              <button
                onClick={() => setShowSubMenu(!showSubMenu)}
                className={`p-1.5 transition-colors cursor-pointer rounded ${
                  showSubtitles ? 'text-[var(--color-brand-800)]' : 'text-neutral-400 hover:text-white'
                }`}
                title="Subtitles"
              >
                <Subtitles size={17} />
              </button>
              {showSubMenu && (
                <div className="absolute bottom-9 inset-inline-end-0 bg-neutral-900 border border-neutral-700 rounded-xl p-2 w-36 shadow-2xl z-40 text-xs space-y-1">
                  <div className="font-bold text-[10px] uppercase text-neutral-400 px-2 py-1">Subtitles</div>
                  <button
                    onClick={() => { setShowSubtitles(!showSubtitles); setShowSubMenu(false); }}
                    className="w-full text-left px-2 py-1 rounded hover:bg-neutral-800 text-[11px] flex justify-between"
                  >
                    <span>Toggle CC</span>
                    <span className="font-bold text-[var(--color-brand-800)]">{showSubtitles ? 'ON' : 'OFF'}</span>
                  </button>
                  {subtitles.map(sub => (
                    <button
                      key={sub}
                      onClick={() => { setSelectedSubtitle(sub); setShowSubtitles(true); setShowSubMenu(false); }}
                      className={`w-full text-left px-2 py-1 rounded text-[11px] ${
                        selectedSubtitle === sub ? 'bg-[var(--color-brand-800)] text-white font-bold' : 'hover:bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Speed Rate Menu */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="p-1.5 hover:text-[var(--color-brand-800)] transition-colors cursor-pointer text-[11px] font-bold"
                title="Speed"
              >
                {playbackRate}x
              </button>
              {showSpeedMenu && (
                <div className="absolute bottom-9 inset-inline-end-0 bg-neutral-900 border border-neutral-700 rounded-xl p-1.5 w-20 shadow-2xl z-40 text-xs space-y-1">
                  {[0.75, 1, 1.25, 1.5, 2].map(rate => (
                    <button
                      key={rate}
                      onClick={() => handleRateSelect(rate)}
                      className={`w-full text-center py-1 rounded text-[11px] ${
                        playbackRate === rate ? 'bg-[var(--color-brand-800)] text-white font-bold' : 'hover:bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Picture-in-Picture */}
            <button
              onClick={togglePictureInPicture}
              className="p-1.5 hover:text-[var(--color-brand-800)] transition-colors cursor-pointer hidden sm:block"
              title="Picture in Picture"
            >
              <PictureInPicture size={16} />
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 hover:text-[var(--color-brand-800)] transition-colors cursor-pointer"
              title="Fullscreen (F)"
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
