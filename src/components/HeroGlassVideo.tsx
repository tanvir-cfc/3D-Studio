import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';

export const HeroGlassVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [showPlaySplash, setShowPlaySplash] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
      // Attempt autoplay
      video.play().catch(() => {
        setIsPlaying(false);
      });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
    setShowPlaySplash(true);
    setTimeout(() => setShowPlaySplash(false), 600);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <div className="relative w-full group">
      {/* Outer Glass Ambient Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#D4FF00]/25 via-emerald-400/20 to-sky-400/25 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Main Glassmorphic Panel (Musemind Clean White Glass Effect) */}
      <div className="relative backdrop-blur-2xl bg-white/80 border border-white/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] p-3 sm:p-4.5 overflow-hidden transition-all duration-300">
        {/* Glass Specular Top Highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

        {/* Glass Header Bar */}
        <div className="flex items-center justify-between pb-3 px-1 border-b border-black/8 text-xs font-mono-tabular">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-[#D4FF00] border border-black/40 shadow-xs" />
            <span className="font-extrabold text-[#0A0A0E] tracking-wider text-[11px] sm:text-xs">
              3D STUDIO REEL · 4K 60FPS CGI & REAL-TIME
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F4F5F7] border border-[#E5E7EB] text-[10px] font-bold text-[#0A0A0E]">
              <Sparkles className="w-3 h-3 text-[#0A0A0E]" />
              OCTANE · UNREAL 5
            </span>
          </div>
        </div>

        {/* Video Viewport Container with Cursor Click */}
        <div
          onClick={togglePlay}
          className="relative aspect-4/3 w-full bg-[#0E0E12] overflow-hidden mt-3 shadow-inner cursor-pointer"
        >
          {/* Real High-Definition 3D CGI Showreel Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
              type="video/mp4"
            />
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              type="video/mp4"
            />
          </video>

          {/* Frosted Glass Watermark & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

          {/* Play/Pause Splash Indicator */}
          {showPlaySplash && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 animate-ping">
                {isPlaying ? <Play className="w-8 h-8 fill-current ml-1" /> : <Pause className="w-8 h-8" />}
              </div>
            </div>
          )}

          {/* Top Floating Glass Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono-tabular font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
            <span>RAY-TRACED 3D ASSETS IN ACTION</span>
          </div>

          {/* Top Right Polycount Tag */}
          <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#D4FF00] text-[#0A0A0E] text-[10px] font-mono-tabular font-bold shadow-sm">
            8K PBR · SUB-D SURFACE
          </div>

          {/* Bottom Floating Frosted Glass Control Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 left-3 right-3 p-2.5 bg-black/60 backdrop-blur-xl border border-white/25 text-white text-xs flex flex-col gap-2"
          >
            {/* Scrub Progress Bar */}
            <div className="w-full bg-white/20 h-1 overflow-hidden">
              <div
                className="bg-[#D4FF00] h-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1 hover:text-[#D4FF00] transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause Showreel' : 'Play Showreel'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1 hover:text-[#D4FF00] transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#D4FF00]" />
                  )}
                </button>

                <span className="text-[10px] font-mono-tabular text-white/80 hidden sm:inline">
                  {isPlaying ? 'PLAYING 60FPS' : 'PAUSED'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono-tabular text-[#D4FF00] font-bold">
                  3D MODELING STUDIO
                </span>
                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="p-1 hover:text-[#D4FF00] transition-colors cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Glass Metric Footer Card */}
        <div className="mt-3 p-3 bg-[#F9FAFB]/90 backdrop-blur-md border border-[#E5E7EB] flex items-center justify-between text-xs font-mono-tabular">
          <div className="space-y-0.5">
            <span className="text-[10px] text-[#6B7280] block font-bold">GEOMETRY ACCURACY</span>
            <div className="flex items-center gap-1.5 font-bold text-[#0A0A0E] text-sm font-display">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>100% Quad Clean Topology</span>
            </div>
          </div>
          <div className="text-right space-y-0.5">
            <span className="text-[10px] text-[#6B7280] block font-bold">PRODUCTION 3D ASSETS</span>
            <span className="text-sm font-display font-extrabold text-[#0A0A0E]">
              12,000+ Shipped
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
