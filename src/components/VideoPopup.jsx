import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Maximize, Minimize } from 'lucide-react';
import popupVideo from '../assets/videos/welcome-popup.mp4';
import { isPopupOpen, markPopupSeen, closePopup } from '../utils/popupGate';

/* ─── Welcome video popup ───
   Shows the welcome video once per browser session on first visit.
   Always muted. Native controls always include a volume button, so the
   player uses its own controls (play/pause, seek, time, fullscreen) without
   one. The context menu is blocked too, since browsers offer "Show controls"
   from it.
*/
const formatTime = (s) => {
  if (!Number.isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const VideoPopup = () => {
  const [open, setOpen] = useState(isPopupOpen);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const seek = (e) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Number(e.target.value);
    setTime(v.currentTime);
  };

  const toggleFullscreen = () => {
    const player = playerRef.current;
    const v = videoRef.current;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (player?.requestFullscreen) {
      player.requestFullscreen();
    } else if (v?.webkitEnterFullscreen) {
      /* iPhone Safari only allows fullscreen on the video element itself */
      v.webkitEnterFullscreen();
    }
  };

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === playerRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const close = () => {
    videoRef.current?.pause();
    setOpen(false);
    closePopup();
  };

  useEffect(() => {
    if (!open) return;
    markPopupSeen();

    const onKey = (e) => {
      /* Esc while fullscreen only exits fullscreen; the browser handles that */
      if (e.key === 'Escape' && !document.fullscreenElement) close();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Metrio welcome video"
        >
          <motion.div
            className="relative w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close video"
            >
              <X size={22} />
            </button>
            <div
              ref={playerRef}
              className={`group relative overflow-hidden bg-black shadow-2xl ${
                fullscreen ? 'flex h-full w-full items-center' : 'rounded-lg'
              }`}
            >
              <video
                ref={videoRef}
                src={popupVideo}
                className={`w-full cursor-pointer ${fullscreen ? 'h-full object-contain' : 'max-h-[80vh]'}`}
                autoPlay
                muted
                playsInline
                disablePictureInPicture
                onClick={togglePlay}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onContextMenu={(e) => e.preventDefault()}
                onVolumeChange={(e) => {
                  e.currentTarget.muted = true;
                }}
              />
              <div
                className={`absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 text-white transition-opacity duration-300 ${
                  playing ? 'opacity-0 group-hover:opacity-100 focus-within:opacity-100' : 'opacity-100'
                }`}
              >
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/20"
                  aria-label={playing ? 'Pause video' : 'Play video'}
                >
                  {playing ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={time}
                  onChange={seek}
                  className="h-1 flex-1 cursor-pointer accent-white"
                  aria-label="Seek video"
                />
                <span className="shrink-0 text-xs tabular-nums">
                  {formatTime(time)} / {formatTime(duration)}
                </span>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/20"
                  aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoPopup;
