import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  videoSrc?: string;
  posterSrc?: string;
  title?: string;
  autoPlay?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc = '/assets/aistudio/VID-20261025-WA0001_55ede1ff.mp4',
  posterSrc = '/assets/aistudio/image_689fe5d8.png',
  title = 'YouTube Timestamps — Official Walkthrough',
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration || 0);
    const onEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('ended', onEnded);

    if (autoPlay) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('ended', onEnded);
    };
  }, [autoPlay, videoSrc]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = percent * duration;
    setCurrentTime(video.currentTime);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative group rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0f] shadow-[0_16px_50px_rgba(0,0,0,0.85)] aspect-video w-full flex flex-col justify-end select-none"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        playsInline
        muted={isMuted}
        loop
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        onClick={togglePlay}
      />

      {/* Subtle Dark Vignette at bottom for controls visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity" />

      {/* Top Header Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-xs font-semibold text-white shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
          <span className="tracking-tight">{title}</span>
        </div>
      </div>

      {/* Large Center Play Button when paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E50914]/90 hover:bg-[#E50914] text-white flex items-center justify-center shadow-[0_0_35px_rgba(229,9,20,0.7)] transform group-hover:scale-105 active:scale-95 transition-all z-20 focus:outline-none focus:ring-4 focus:ring-[#E50914]/50"
          aria-label="Play promotional video"
        >
          <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-1 fill-white" />
        </button>
      )}

      {/* Bottom Controls Bar */}
      <div className="relative z-20 p-4 sm:p-5 flex flex-col gap-2.5">
        {/* Progress Scrubber */}
        <div
          className="w-full h-1.5 bg-white/25 hover:h-2.5 transition-all rounded-full cursor-pointer relative overflow-hidden"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-[#E50914] rounded-full transition-all duration-100 shadow-[0_0_10px_#E50914]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-lg hover:bg-white/15 transition-colors focus:outline-none"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg hover:bg-white/15 transition-colors focus:outline-none"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-zinc-300" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>

            <span className="font-mono text-zinc-300 text-[11px] tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                }
              }}
              className="p-1.5 rounded-lg hover:bg-white/15 transition-colors text-zinc-300 hover:text-white"
              title="Replay video"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleFullscreen}
              className="p-1.5 rounded-lg hover:bg-white/15 transition-colors text-zinc-300 hover:text-white"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
