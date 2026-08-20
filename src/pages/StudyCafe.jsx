import { useState, useEffect, useRef, useCallback } from 'react';
import { Coffee, Music, Volume2, VolumeX, Settings, Star, Users, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Heart, Sparkles, Clock, ChevronUp, ChevronDown, Minimize2, Maximize2, CheckSquare, Square, Plus, Trash2, X, ArrowLeft, ExternalLink } from 'lucide-react';
import Seo from '../components/Seo.jsx';


const fontStyle = `
  .hero-title {
    font-family: 'Playfair Display', serif !important;
    font-weight: 900 !important;
    letter-spacing: -0.02em;
  }
  .hero-subtitle {
    font-family: 'Cormorant Garamond', serif !important;
    font-weight: 300 !important;
    font-style: italic !important;
    letter-spacing: 0.01em;
  }
  .nav-brand {
    font-family: 'Playfair Display', serif !important;
    font-weight: 900 !important;
    font-style: italic !important;
  }

  @keyframes slideUpFade {
    0%   { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.95); }
    15%  { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1);    }
    75%  { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1);    }
    100% { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(0.97);}
  }
  .cafe-toast {
    animation: slideUpFade 3.8s ease forwards;
  }

  @keyframes timerNotifIn {
    0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
    60%  { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
    100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
  .timer-notif-in {
    animation: timerNotifIn 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }

  @keyframes confettiFall {
    0%   { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
    75%  { opacity: 1; }
    100% { transform: translateY(420px) rotate(540deg) scale(0.6); opacity: 0; }
  }

  @keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    14% { transform: scale(1.35); }
    28% { transform: scale(1); }
    42% { transform: scale(1.35); }
    70% { transform: scale(1); }
  }
  .heart-beat { animation: heartBeat 1.3s infinite; }

  @keyframes todoSlideIn {
    from { opacity: 0; transform: translateY(16px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .todo-slide-in {
    animation: todoSlideIn 0.25s cubic-bezier(0.34,1.2,0.64,1) forwards;
  }

  @keyframes menuBarSlideIn {
    from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.96); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
  }
  .menu-bar-slide-in {
    animation: menuBarSlideIn 0.3s cubic-bezier(0.34,1.2,0.64,1) forwards;
  }

  @keyframes modalFadeIn {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.92); }
    to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
  .timer-settings-modal {
    animation: modalFadeIn 0.25s cubic-bezier(0.34,1.2,0.64,1) forwards;
  }

  .music-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .music-scroll::-webkit-scrollbar-track {
    background: #FFE5F1;
    border-radius: 99px;
  }
  .music-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(#FF6B9D, #C86DD7);
    border-radius: 99px;
  }

  .study-todo-widget {
    right: 24px;
    bottom: 24px;
  }
  .study-todo-panel {
    width: 340px;
  }
  .study-menu-popover {
    max-width: min(300px, calc(100vw - 16px));
  }
  @media (max-width: 767px) {
    .study-todo-widget {
      right: 8px;
      bottom: 94px;
    }
    .study-todo-panel {
      width: min(340px, calc(100vw - 16px)) !important;
    }
    .study-bottom-controls {
      max-width: calc(100vw - 16px);
      gap: 8px !important;
      padding: 12px !important;
    }
    .study-bottom-controls .study-control-label {
      display: none;
    }
    .study-bottom-controls > button {
      padding: 8px !important;
    }
    .study-control-divider {
      display: none;
    }
    .study-bottom-minimized {
      max-width: calc(100vw - 16px);
    }
    .study-selected-name {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

// ── Timer Settings Storage Key ────────────────────────────────────────────────
const TIMER_SETTINGS_KEY = 'idorestudy_timer_settings_v1';

function loadTimerSettings() {
  try {
    const saved = localStorage.getItem(TIMER_SETTINGS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (
        typeof parsed.studyMinutes === 'number' && parsed.studyMinutes >= 1 && parsed.studyMinutes <= 120 &&
        typeof parsed.breakMinutes === 'number' && parsed.breakMinutes >= 1 && parsed.breakMinutes <= 60
      ) {
        return parsed;
      }
    }
  } catch (e) {}
  return { studyMinutes: 25, breakMinutes: 5 };
}

function saveTimerSettings(settings) {
  try { localStorage.setItem(TIMER_SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {}
}

// ── Timer Settings Modal ──────────────────────────────────────────────────────
function TimerSettingsModal({ visible, onClose, onSave, currentStudy, currentBreak }) {
  const [studyVal, setStudyVal] = useState(currentStudy);
  const [breakVal, setBreakVal] = useState(currentBreak);
  const [studyErr, setStudyErr] = useState('');
  const [breakErr, setBreakErr] = useState('');

  useEffect(() => {
    if (visible) {
      setStudyVal(currentStudy);
      setBreakVal(currentBreak);
      setStudyErr('');
      setBreakErr('');
    }
  }, [visible, currentStudy, currentBreak]);

  useEffect(() => {
    if (!visible) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, onClose]);

  if (!visible) return null;

  const validate = () => {
    let ok = true;
    const s = parseInt(studyVal, 10);
    const b = parseInt(breakVal, 10);
    if (isNaN(s) || s < 1 || s > 120) { setStudyErr('Enter a value between 1–120 min'); ok = false; } else setStudyErr('');
    if (isNaN(b) || b < 1 || b > 60)  { setBreakErr('Enter a value between 1–60 min');  ok = false; } else setBreakErr('');
    return ok ? { studyMinutes: s, breakMinutes: b } : null;
  };

  const handleSave = () => {
    const result = validate();
    if (result) onSave(result);
  };

  const presets = [
    { label: '25 / 5', study: 25, brk: 5 },
    { label: '50 / 10', study: 50, brk: 10 },
    { label: '90 / 20', study: 90, brk: 20 },
    { label: '45 / 15', study: 45, brk: 15 },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99998,
      background: 'rgba(0,0,0,0.45)',
      backdropFilter: 'blur(8px)',
    }} onClick={onClose}>
      <div
        className="timer-settings-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="timer-settings-title"
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          background: 'linear-gradient(135deg, #FFF5F7 0%, #F5F3FF 50%, #FFF0F5 100%)',
          border: '4px solid #FFB6D9',
          borderRadius: '32px',
          padding: 'clamp(22px, 5vw, 36px) clamp(20px, 6vw, 40px)',
          width: 'min(380px, calc(100vw - 24px))',
          maxHeight: 'calc(100vh - 24px)',
          overflowY: 'auto',
          boxShadow: '0 32px 100px rgba(255,107,157,0.45)',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings style={{ width: 18, height: 18, color: 'white' }} />
            </div>
            <div>
              <h2 id="timer-settings-title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '20px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>
                Timer Settings
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '13px', color: '#B8A0CC', fontWeight: 300 }}>
                Saved to your device ✨
              </p>
            </div>
          </div>
          <button type="button" aria-label="Close timer settings" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
            <X style={{ width: 18, height: 18, color: '#C4A8D4' }} />
          </button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '12px', color: '#9B7EDB', letterSpacing: '0.08em', marginBottom: '10px', textTransform: 'uppercase' }}>
            Quick Presets
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {presets.map(p => (
              <button
                type="button"
                key={p.label}
                onClick={() => { setStudyVal(p.study); setBreakVal(p.brk); setStudyErr(''); setBreakErr(''); }}
                style={{
                  padding: '10px 14px',
                  borderRadius: '14px',
                  border: `2px solid ${studyVal === p.study && breakVal === p.brk ? '#FF6B9D' : '#FFD7E5'}`,
                  background: studyVal === p.study && breakVal === p.brk
                    ? 'linear-gradient(135deg, rgba(255,107,157,0.12), rgba(200,109,215,0.12))'
                    : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '15px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {p.label}
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: '#C4A8D4' }}>
                  min
                </span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
          <div>
            <label htmlFor="study-duration" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '13px', color: '#FF6B9D', marginBottom: '8px' }}>
              <span>📚</span> Study Duration (minutes)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button type="button" aria-label="Decrease study duration" onClick={() => setStudyVal(v => Math.max(1, (parseInt(v, 10) || 25) - 1))}
                style={{ width: 36, height: 36, borderRadius: '10px', border: '2px solid #FFD7E5', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', color: '#FF6B9D', flexShrink: 0 }}>−</button>
              <input id="study-duration" type="number" min="1" max="120" value={studyVal} onChange={e => setStudyVal(e.target.value)} aria-invalid={Boolean(studyErr)}
                style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: `2px solid ${studyErr ? '#FF3B6B' : '#FFD7E5'}`, outline: 'none', fontSize: '16px', fontWeight: 900, fontFamily: "'Playfair Display', serif", textAlign: 'center', color: '#444', background: 'white' }} />
              <button type="button" aria-label="Increase study duration" onClick={() => setStudyVal(v => Math.min(120, (parseInt(v, 10) || 25) + 1))}
                style={{ width: 36, height: 36, borderRadius: '10px', border: '2px solid #FFD7E5', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', color: '#FF6B9D', flexShrink: 0 }}>+</button>
            </div>
            {studyErr && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: '#FF3B6B', marginTop: '5px' }}>{studyErr}</p>}
          </div>

          <div>
            <label htmlFor="break-duration" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '13px', color: '#C86DD7', marginBottom: '8px' }}>
              <span>☕</span> Break Duration (minutes)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button type="button" aria-label="Decrease break duration" onClick={() => setBreakVal(v => Math.max(1, (parseInt(v, 10) || 5) - 1))}
                style={{ width: 36, height: 36, borderRadius: '10px', border: '2px solid #FFD7E5', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', color: '#C86DD7', flexShrink: 0 }}>−</button>
              <input id="break-duration" type="number" min="1" max="60" value={breakVal} onChange={e => setBreakVal(e.target.value)} aria-invalid={Boolean(breakErr)}
                style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: `2px solid ${breakErr ? '#FF3B6B' : '#FFD7E5'}`, outline: 'none', fontSize: '16px', fontWeight: 900, fontFamily: "'Playfair Display', serif", textAlign: 'center', color: '#444', background: 'white' }} />
              <button type="button" aria-label="Increase break duration" onClick={() => setBreakVal(v => Math.min(60, (parseInt(v, 10) || 5) + 1))}
                style={{ width: 36, height: 36, borderRadius: '10px', border: '2px solid #FFD7E5', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', color: '#C86DD7', flexShrink: 0 }}>+</button>
            </div>
            {breakErr && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: '#FF3B6B', marginTop: '5px' }}>{breakErr}</p>}
          </div>
        </div>

        <button type="button" onClick={handleSave}
          style={{ width: '100%', padding: '16px', borderRadius: '16px', background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)', border: 'none', color: 'white', fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '16px', cursor: 'pointer', boxShadow: '0 8px 28px rgba(255,107,157,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Heart style={{ width: 16, height: 16, fill: 'white' }} />
          Save My Timer Settings
        </button>
        <p style={{ textAlign: 'center', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: '#C4A8D4', marginTop: '14px' }}>
          Settings are saved to this device automatically 🌸
        </p>
      </div>
    </div>
  );
}

function YTBackground({ videoId, title }) {
  const cleanVideoId = videoId.split('?')[0];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#000' }}>
      <iframe
        width="100%" height="100%"
        src={`https://www.youtube-nocookie.com/embed/${cleanVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${cleanVideoId}&rel=0&modestbranding=1&showinfo=0`}
        title={`${title} study video on YouTube`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '135%', height: '140%', border: 'none', pointerEvents: 'none' }}
      />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }} />
    </div>
  );
}

function AudioPlayer({ videoId, name, isMuted, isPaused }) {
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const cleanVideoId = useRef('');
  const [srcKey, setSrcKey] = useState(0);
  const newClean = videoId.split('?')[0];
  if (cleanVideoId.current !== newClean) cleanVideoId.current = newClean;

  const prevVideoRef = useRef(newClean);
  useEffect(() => {
    if (newClean !== prevVideoRef.current) {
      prevVideoRef.current = newClean;
      setSrcKey(k => k + 1);
      setLoaded(false);
    }
  }, [newClean]);

  useEffect(() => {
    if (!loaded || !iframeRef.current) return;
    try {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: isPaused ? 'pauseVideo' : 'playVideo', args: [] }), 'https://www.youtube-nocookie.com');
    } catch (e) {}
  }, [isPaused, loaded]);

  useEffect(() => {
    if (!loaded || !iframeRef.current) return;
    try {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: isMuted ? 'mute' : 'unMute', args: [] }), 'https://www.youtube-nocookie.com');
    } catch (e) {}
  }, [isMuted, loaded]);

  useEffect(() => {
    if (!loaded || !iframeRef.current) return;
    const t = setTimeout(() => {
      try {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: isMuted ? 'mute' : 'unMute', args: [] }), 'https://www.youtube-nocookie.com');
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: isPaused ? 'pauseVideo' : 'playVideo', args: [] }), 'https://www.youtube-nocookie.com');
      } catch (e) {}
    }, 1000);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <div style={{ position: 'fixed', bottom: '-600px', left: '-600px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none', zIndex: -1 }}>
      <iframe key={srcKey} ref={iframeRef} width="1" height="1"
        src={`https://www.youtube-nocookie.com/embed/${cleanVideoId.current}?autoplay=1&mute=0&controls=0&loop=1&playlist=${cleanVideoId.current}&rel=0&modestbranding=1&enablejsapi=1`}
        title={`${name} background music on YouTube`} frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setLoaded(true)}
        style={{ width: '1px', height: '1px', border: 'none', pointerEvents: 'none' }}
      />
    </div>
  );
}

function TimerSound({ shouldPlay, onDone }) {
  const hasPlayedRef = useRef(false);
  useEffect(() => {
    if (shouldPlay && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const playBeep = (freq, startTime, duration) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = 'sine'; osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(0.45, startTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
          osc.start(startTime); osc.stop(startTime + duration);
        };
        const t = ctx.currentTime;
        playBeep(880, t, 0.55); playBeep(1100, t + 0.35, 0.55); playBeep(1320, t + 0.70, 0.90);
        playBeep(880, t + 1.50, 0.55); playBeep(1100, t + 1.85, 0.55); playBeep(1320, t + 2.20, 0.90);
        setTimeout(() => { if (onDone) onDone(); ctx.close(); }, 3500);
      } catch (e) { setTimeout(() => { if (onDone) onDone(); }, 100); }
    }
    if (!shouldPlay) hasPlayedRef.current = false;
  }, [shouldPlay, onDone]);
  return null;
}

function CafeToast({ visible, message, emoji, subtext }) {
  if (!visible) return null;
  return (
    <div className="cafe-toast" style={{
      position: 'fixed', bottom: '120px', left: '50%', zIndex: 9999,
      background: 'linear-gradient(135deg, rgba(255,245,247,0.99), rgba(245,243,255,0.99))',
      border: '3px solid #FFB6D9', borderRadius: '24px', padding: '18px 28px',
      boxShadow: '0 20px 60px rgba(255,107,157,0.35)',
      display: 'flex', alignItems: 'center', gap: '14px',
      minWidth: '320px', maxWidth: '440px', backdropFilter: 'blur(20px)',
    }}>
      <span style={{ fontSize: '40px', lineHeight: 1 }}>{emoji}</span>
      <div>
        <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '16px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '2px' }}>{message}</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '13px', color: '#9B7EDB', fontWeight: 400 }}>{subtext}</p>
      </div>
    </div>
  );
}

function Confetti() {
  const emojis = ['🎉', '✨', '💖', '⭐', '🌸', '🎀', '💕', '🌟', '🎊', '💝'];
  const pieces = Array.from({ length: 32 }, (_, i) => ({
    emoji: emojis[i % emojis.length],
    left: `${(i / 32) * 96 + 2}%`,
    delay: `${(i * 0.08).toFixed(2)}s`,
    duration: `${1.6 + (i % 6) * 0.2}s`,
    size: 18 + (i % 5) * 7,
  }));
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {pieces.map((p, i) => (
        <span key={i} style={{ position: 'absolute', top: '-30px', left: p.left, fontSize: p.size, animationName: 'confettiFall', animationDuration: p.duration, animationDelay: p.delay, animationTimingFunction: 'linear', animationFillMode: 'forwards', animationIterationCount: 'infinite', display: 'inline-block' }}>{p.emoji}</span>
      ))}
    </div>
  );
}

function TimerDoneNotif({ visible, wasStudying, onDismiss }) {
  useEffect(() => {
    if (!visible) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, onDismiss]);

  if (!visible) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="timer-complete-title" style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Confetti />
      <div className="timer-notif-in" style={{ position: 'fixed', top: '50%', left: '50%', background: 'linear-gradient(135deg, #FFF5F7 0%, #F5F3FF 50%, #FFF0F5 100%)', border: '5px solid #FFB6D9', borderRadius: '40px', padding: 'clamp(28px, 7vw, 56px) clamp(22px, 8vw, 72px)', boxShadow: '0 40px 120px rgba(255,107,157,0.55)', textAlign: 'center', maxWidth: '520px', width: 'calc(100vw - 24px)', maxHeight: 'calc(100vh - 24px)', overflowY: 'auto', zIndex: 2 }}>
        <div style={{ fontSize: 'clamp(58px, 20vw, 96px)', lineHeight: 1, marginBottom: '20px' }}>{wasStudying ? '🎉' : '📚'}</div>
        <h2 id="timer-complete-title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(28px, 8vw, 38px)', lineHeight: 1.15, background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '14px' }}>
          {wasStudying ? 'Study Session Complete 🎊' : "Break's Over 🎊"}
        </h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '21px', color: '#9B7EDB', fontWeight: 300, marginBottom: '36px', lineHeight: 1.5 }}>
          {wasStudying ? 'Amazing work! ☕ Time for a cute café break~' : "Let's lock in on your goals ✨"}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '36px' }}>
          {['💖','💜','💖','💜','💖'].map((h, i) => <span key={i} className="heart-beat" style={{ fontSize: 28, animationDelay: `${i * 0.18}s` }}>{h}</span>)}
        </div>
        <button type="button" onClick={onDismiss} style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)', color: 'white', border: 'none', borderRadius: '999px', padding: 'clamp(14px, 4vw, 18px) clamp(24px, 10vw, 52px)', fontSize: 'clamp(16px, 5vw, 19px)', fontWeight: 900, fontFamily: "'Playfair Display', serif", cursor: 'pointer', boxShadow: '0 8px 32px rgba(255,107,157,0.45)' }}>
          {wasStudying ? '☕ Start My Break!' : '📚 Start Studying!'}
        </button>
      </div>
    </div>
  );
}

function TodoWidget() {
  const STORAGE_KEY = 'idorestudy_todos_v2';
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const loadTodos = () => {
    try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) return JSON.parse(saved); } catch (e) {}
    return [{ id: 1, text: 'Review chapter notes 📖', done: false }, { id: 2, text: 'Practice vocab flashcards ✏️', done: false }];
  };
  const [todos, setTodos] = useState(loadTodos);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); } catch (e) {} }, [todos]);
  const addTodo = () => { const t = input.trim(); if (!t) return; setTodos(p => [...p, { id: Date.now(), text: t, done: false }]); setInput(''); inputRef.current?.focus(); };
  const toggleTodo = (id) => setTodos(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTodo = (id) => setTodos(p => p.filter(t => t.id !== id));
  const done = todos.filter(t => t.done).length;
  const total = todos.length;
  return (
    <div className="study-todo-widget" style={{ position: 'fixed', zIndex: 8000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
      {isOpen && !isMinimized && (
        <div className="todo-slide-in study-todo-panel" style={{ background: 'linear-gradient(135deg, rgba(255,245,247,0.99), rgba(245,243,255,0.99))', border: '3px solid #FFB6D9', borderRadius: '28px', padding: '20px 22px 22px', boxShadow: '0 24px 80px rgba(255,107,157,0.32)', backdropFilter: 'blur(20px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '22px' }}>📝</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '17px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Study To-Do List</span>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button type="button" aria-label="Minimize task list" onClick={() => setIsMinimized(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', lineHeight: 0 }}><Minimize2 style={{ width: 16, height: 16, color: '#C86DD7' }} /></button>
              <button type="button" aria-label="Close task list" onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', lineHeight: 0 }}><X style={{ width: 16, height: 16, color: '#C86DD7' }} /></button>
            </div>
          </div>
          {total > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '13px', color: '#9B7EDB' }}>{done === total ? '🎉 All done, superstar!' : `${done} of ${total} completed`}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#FF6B9D' }}>{Math.round((done / total) * 100)}%</span>
              </div>
              <div style={{ height: '7px', background: '#FFE5F1', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(done / total) * 100}%`, background: 'linear-gradient(90deg, #FF6B9D, #C86DD7)', borderRadius: '99px', transition: 'width 0.4s ease' }} />
              </div>
            </div>
          )}
          <div style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {todos.length === 0 && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: '#C4A8D4', fontSize: '14px', textAlign: 'center', padding: '18px 0' }}>No tasks yet~ add one below! 🌸</p>}
            {todos.map(todo => (
              <div key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 11px', background: todo.done ? 'linear-gradient(135deg, #F0EBFF, #FFE5F1)' : 'white', borderRadius: '13px', border: `2px solid ${todo.done ? '#DDB6F5' : '#FFD7E5'}` }}>
                <button type="button" aria-label={`${todo.done ? 'Mark incomplete' : 'Mark complete'}: ${todo.text}`} onClick={() => toggleTodo(todo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, lineHeight: 0 }}>
                  {todo.done ? <CheckSquare style={{ width: 19, height: 19, color: '#C86DD7' }} /> : <Square style={{ width: 19, height: 19, color: '#FFB6D9' }} />}
                </button>
                <span style={{ flex: 1, fontSize: '13px', fontWeight: 600, color: todo.done ? '#B8A0CC' : '#444', textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</span>
                <button type="button" aria-label={`Delete task: ${todo.text}`} onClick={() => deleteTodo(todo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, opacity: 0.38, flexShrink: 0, lineHeight: 0 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.38'}>
                  <Trash2 style={{ width: 13, height: 13, color: '#FF6B9D' }} />
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input ref={inputRef} aria-label="New task" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTodo()} placeholder="Add a task... ✨"
              style={{ flex: 1, padding: '9px 13px', borderRadius: '11px', border: '2px solid #FFD7E5', outline: 'none', fontSize: '13px', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', background: 'white', color: '#444' }}
              onFocus={e => e.target.style.borderColor = '#FF6B9D'} onBlur={e => e.target.style.borderColor = '#FFD7E5'} />
            <button type="button" aria-label="Add task" onClick={addTodo} style={{ background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', border: 'none', borderRadius: '11px', padding: '9px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', boxShadow: '0 4px 12px rgba(255,107,157,0.35)' }}>
              <Plus style={{ width: 17, height: 17, color: 'white' }} />
            </button>
          </div>
        </div>
      )}
      {isOpen && isMinimized && (
        <div className="todo-slide-in" style={{ background: 'linear-gradient(135deg, rgba(255,245,247,0.99), rgba(245,243,255,0.99))', border: '3px solid #FFB6D9', borderRadius: '18px', padding: '10px 16px', boxShadow: '0 12px 40px rgba(255,107,157,0.25)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>📝</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '14px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>To-Do {total > 0 ? `(${done}/${total})` : ''}</span>
          <button type="button" aria-label="Expand task list" onClick={() => setIsMinimized(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', lineHeight: 0 }}><Maximize2 style={{ width: 15, height: 15, color: '#C86DD7' }} /></button>
          <button type="button" aria-label="Close task list" onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', lineHeight: 0 }}><X style={{ width: 15, height: 15, color: '#C86DD7' }} /></button>
        </div>
      )}
      <button type="button" aria-label={isOpen ? 'Close task list' : 'Open task list'} onClick={() => { setIsOpen(o => !o); setIsMinimized(false); }}
        style={{ width: '54px', height: '54px', borderRadius: '50%', background: isOpen ? 'linear-gradient(135deg, #C86DD7, #FF6B9D)' : 'linear-gradient(135deg, #FF6B9D, #C86DD7)', border: '3px solid rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(255,107,157,0.45)', position: 'relative' }}>
        {isOpen ? <X style={{ width: 22, height: 22, color: 'white' }} /> : <CheckSquare style={{ width: 22, height: 22, color: 'white' }} />}
        {!isOpen && total > 0 && done < total && (
          <div style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#FF3B6B', color: 'white', borderRadius: '50%', width: '20px', height: '20px', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>{total - done}</div>
        )}
      </button>
    </div>
  );
}

function TikTokIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  );
}


const GROUP_PALETTES = {
  BLACKPINK: ['#f7a7c5', '#50233c'],
  BTS: ['#a78bfa', '#4c1d95'],
  IVE: ['#fb7185', '#7e22ce'],
  ENHYPEN: ['#64748b', '#312e81'],
  'LE SSERAFIM': ['#fda4af', '#7f1d1d'],
  aespa: ['#818cf8', '#581c87'],
  NewJeans: ['#67e8f9', '#1d4ed8'],
  'Stray Kids': ['#fb7185', '#111827'],
  ILLIT: ['#f9a8d4', '#7c3aed'],
  'Red Velvet': ['#fb7185', '#166534'],
  LOONA: ['#c4b5fd', '#3730a3'],
  ITZY: ['#f472b6', '#7c2d12'],
  TWICE: ['#fdba74', '#be185d'],
  SHINEE: ['#5eead4', '#155e75'],
  'G-IDLE': ['#c084fc', '#4c1d95'],
  NMIXX: ['#38bdf8', '#be123c'],
};

function BuddyPortrait({ buddy, compact = false }) {
  const palette = GROUP_PALETTES[buddy.group] || ['#f9a8d4', '#6d28d9'];
  const cleanName = buddy.name.replace(/\([^)]*\)/g, '').trim();
  const initials = cleanName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const size = compact ? 64 : '100%';
  return (
    <div
      role="img"
      aria-label={`${buddy.name} from ${buddy.group}`}
      style={{
        width: size,
        height: compact ? 64 : 224,
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        display: 'grid',
        placeItems: 'center',
        borderRadius: compact ? 12 : 0,
        background: `radial-gradient(circle at 28% 18%, rgba(255,255,255,.48), transparent 24%), linear-gradient(145deg, ${palette[0]}, ${palette[1]})`,
      }}
    >
      <span aria-hidden="true" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: compact ? 25 : 64, fontWeight: 900, color: 'white', textShadow: '0 4px 20px rgba(0,0,0,.25)' }}>{initials}</span>
      {!compact && <span aria-hidden="true" style={{ position: 'absolute', bottom: 15, left: 18, color: 'rgba(255,255,255,.92)', fontSize: 12, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>{buddy.group}</span>}
      <span aria-hidden="true" style={{ position: 'absolute', top: compact ? 6 : 16, right: compact ? 7 : 18, fontSize: compact ? 13 : 22 }}>✦</span>
    </div>
  );
}

// ── Footer component ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: 'linear-gradient(135deg, rgba(255,107,157,0.08), rgba(200,109,215,0.08))',
      borderTop: '2px solid #FFD7E5',
      padding: '28px 48px',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative' }}>
            <Coffee style={{ width: 22, height: 22, color: '#FF6B9D' }} />
            <Sparkles style={{ width: 12, height: 12, color: '#C86DD7', position: 'absolute', top: '-4px', right: '-4px' }} />
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontStyle: 'italic', fontSize: '18px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            IdoréStudy ♡
          </span>
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '14px', color: '#B8A0CC', fontWeight: 300 }}>
            Study harder, dream bigger, stan forever ✨
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '6px' }}>
            {['☕','💖','📚','✨','🎵'].map((e, i) => <span key={i} style={{ fontSize: '14px', opacity: 0.6 }}>{e}</span>)}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {[
            { label: 'Home', href: '/' },
            { label: 'Resources', href: '/resources' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'Privacy', href: '/privacy' },
            { label: 'Terms', href: '/terms' },
            { label: 'Content policy', href: '/content-policy' },
          ].map(link => (
            <a key={link.label} href={link.href}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#C4A8D4', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#FF6B9D'}
              onMouseLeave={e => e.target.style.color = '#C4A8D4'}
            >{link.label}</a>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', color: '#D4B8E0', fontStyle: 'italic' }}>
          © {new Date().getFullYear()} IdoréStudy · Independent and fan-made · Optional media is streamed from its original third-party platform.
        </p>
      </div>
    </footer>
  );
}

// ── Main StudyCafe component (the actual study app, no routing) ───────────────
const StudyCafe = () => {
  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [timerSettings, setTimerSettings] = useState(loadTimerSettings);
  const [showTimerSettings, setShowTimerSettings] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(timerSettings.studyMinutes);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isStudying, setIsStudying] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicPaused, setIsMusicPaused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSidebar, setShowSidebar] = useState(() => typeof window === 'undefined' || window.innerWidth >= 768);
  const [sessionOutcome, setSessionOutcome] = useState(() => {
    try { return localStorage.getItem('idorestudy_session_outcome_v1') || ''; } catch (error) { return ''; }
  });
  const [showMusicMenu, setShowMusicMenu] = useState(false);
  const [showCafeMenu, setShowCafeMenu] = useState(false);
  const [activeCafeItems, setActiveCafeItems] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: '', emoji: '', subtext: '' });
  const toastTimeoutRef = useRef(null);
  const [timerDoneNotif, setTimerDoneNotif] = useState({ visible: false, wasStudying: true });
  const [playTimerSound, setPlayTimerSound] = useState(false);
  const [timerPosition, setTimerPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isTimerMinimized, setIsTimerMinimized] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [isMenuBarMinimized, setIsMenuBarMinimized] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const timerRef = useRef(null);

  const handleSaveTimerSettings = (newSettings) => {
    saveTimerSettings(newSettings);
    setTimerSettings(newSettings);
    setShowTimerSettings(false);
    if (!isRunning) {
      setTimerMinutes(isStudying ? newSettings.studyMinutes : newSettings.breakMinutes);
      setTimerSeconds(0);
    }
    showToast('Timer updated! 🎉', '⏱️', `Study: ${newSettings.studyMinutes}min · Break: ${newSettings.breakMinutes}min`);
  };

  const cafeItems = [
    { id: 1, name: 'Coffee Steam', emoji: '☕' }, { id: 2, name: 'Latte Art', emoji: '🧋' },
    { id: 3, name: 'Croissant', emoji: '🥐' }, { id: 4, name: 'Cake Slice', emoji: '🍰' },
    { id: 5, name: 'Waffle', emoji: '🧇' }, { id: 6, name: 'Donut', emoji: '🍩' },
    { id: 7, name: 'Matcha', emoji: '🍵' }, { id: 8, name: 'Cookie', emoji: '🍪' },
  ];

  const musicOptions = [
    { id: 0, name: 'No music', icon: '🔇', videoId: '' },
    { id: 1, name: 'Blackpink Lo-fi Mix', icon: '🖤', videoId: 'PjsDDmv25C4?si=v3idYagDZngy3Sb8' },
    { id: 2, name: 'Le Sserafim Rainy Piano Mix', icon: '🌸', videoId: 'I3yNehe_Zwg?si=bSovd5fGI0BDxaCS' },
    { id: 3, name: 'Stray Kids Rainy Lofi', icon: '🌧️', videoId: 'zqdE_gIoykg?si=P1lMBcUpPErB4RW7' },
    { id: 4, name: 'Jennie SOLO Orchestral', icon: '🎻', videoId: 'GWR6yukGEI4?si=E0RBzLSXC05Q7n0V' },
    { id: 5, name: 'BTS Rainy Day Piano Mix', icon: '💜', videoId: 'RdLjg7ZGxuE?si=vjNxrl1k4DQ7ziV6' },
    { id: 6, name: 'IVE Rainy Day Piano Mix', icon: '🌹', videoId: 'LiT2sIN-Pg8?si=Vl8C_GOyept1A8ms' },
    { id: 7, name: 'Aespa Piano Mix', icon: '🌙', videoId: '8TF58QbQTFY?si=6nzyxV_e7jzz9cKL' },
    { id: 8, name: 'Red Velvet Lofi Mix', icon: '🍒', videoId: 'Z6qTC5PY-u4?si=9JxJxBKmZXXG7rgV' },
    { id: 9, name: 'XLOV Instrumentals', icon: '🖤', videoId: 'C8_e_gER1f0?si=sPKx-LIji_JJF62v' },
    { id: 10, name: 'ILLIT Instrumentals', icon: '⭐', videoId: 'BTlZZu-SoAI?si=Q_uQHu9vW3KCJeD6' },
    { id: 11, name: 'Enhypen Moonstruck Orchestral', icon: '🌙', videoId: 'yCq9AHVFNKA?si=lqpt13-Fg-NU9KND' },
  ];

  const [selectedMusic, setSelectedMusic] = useState(musicOptions[0]);

  const studyBuddies = [
    { id: 1, name: 'Rosé', group: 'BLACKPINK', videoId: 'oadMhHMubQ4?si=fdyQ5nAQQgIZ2KC2' },
    { id: 2, name: 'Jennie', group: 'BLACKPINK', videoId: 'Fe8kR3W9VGA?si=lOhkuY6w6hc7vlRl' },
    { id: 3, name: 'Lisa', group: 'BLACKPINK', videoId: 'tX9rWUJUGbk?si=1cwwtiNJNLHZ6BkT' },
    { id: 5, name: 'Jungkook', group: 'BTS', videoId: 'xy_mVVv4Oc0?si=XIcdkXpt9NFM70IL' },
    { id: 6, name: 'V (Taehyung)', group: 'BTS', videoId: 'Xt2wCvkSegU?si=RQO_W8pmXh7KOzb-' },
    { id: 7, name: 'Jimin', group: 'BTS', videoId: 'KxE4i8-nYEs?si=C5vcXDoBao4Ubwmr' },
    { id: 12, name: 'Wonyoung', group: 'IVE', videoId: 'ZZaA0c-PsXc?si=EZJuOje8auDVqNQT' },
    { id: 15, name: 'Chaewon', group: 'LE SSERAFIM', videoId: '3one8kjAAQI?si=Lx74Rk6W62Mk1YWv' },
    { id: 17, name: 'Kazuha', group: 'LE SSERAFIM', videoId: 'KznmfOQrK_E?si=I-mvB2p7JTPKhA8m' },
    { id: 18, name: 'Karina', group: 'aespa', videoId: 'r6OQFloCDZw?si=ajwYkdn7wDS7p1nR' },
    { id: 22, name: 'Minji', group: 'NewJeans', videoId: 'LhIivrX4gKk?si=VX33cAITX0kpqKE_' },
    { id: 24, name: 'Seulgi', group: 'Red Velvet', videoId: 'UZOnLTTiZKY?si=yeswGn2PlAAqNpgf' },
    { id: 27, name: 'Bang Chan', group: 'Stray Kids', videoId: 'ANuQjiEMMcU?si=85lRUokCKtNzHBJm' },
    { id: 28, name: 'Felix', group: 'Stray Kids', videoId: 'EYpwvrJlV-s?si=3BQrSp7AtwvOucAI' },
    { id: 29, name: 'Han', group: 'Stray Kids', videoId: 'TMjrez7sv5o?si=z553RJcHnTC7JXpf' },
    { id: 30, name: 'Hyunjin', group: 'Stray Kids', videoId: 'QFfZlBdAhgs?si=dYxdJAq3oc4V6R4J' },
    { id: 31, name: 'Lee Know', group: 'Stray Kids', videoId: '9CKliRdrawg?si=9G33xVOldR2a3nIa' },
    { id: 32, name: 'Yunah', group: 'ILLIT', videoId: 'Kz5ie0SAPJM?si=VfoZlZkZ1t2Blwoc' },
    { id: 33, name: 'Wonhee', group: 'ILLIT', videoId: 'gY5nbjT8ZYU?si=jWYNzxoQb0eYuhmb' },
    { id: 34, name: 'Moka', group: 'ILLIT', videoId: 'fwMMBtUucng?si=kLOwcp6PNzugbUhe' },
    { id: 35, name: 'Chuu', group: 'LOONA', videoId: 'bDQRKF4jTuQ?si=YZe4cd0s_7EZShDc' },
    { id: 36, name: 'Yuna', group: 'ITZY', videoId: 'iLzKAgu_5g4?si=9mjs1w33ymMcjfS_' },
    { id: 37, name: 'Key', group: 'SHINEE', videoId: 'lMqr_YXI9IM?si=jH8UmTxaTCakVUiP' },
    { id: 38, name: 'Dahyun', group: 'TWICE', videoId: '47ocn-7vw-E?si=Xkf8ccNzCBwcJ1p4' },
    { id: 39, name: 'Yuqi', group: 'G-IDLE', videoId: 'gKIGXBkW56Y?si=vP0xmCSwLFDJD9Fq' },
    { id: 40, name: 'Lily', group: 'NMIXX', videoId: 'HMIUqdzm0bs?si=GXJ55DuQRMVyvgcv' },
    { id: 41, name: 'Rei', group: 'IVE', videoId: 'RgVu5AehEx4?si=TR_DqPhiVnzzxKHl' },
    { id: 42, name: 'Sunghoon', group: 'ENHYPEN', videoId: 'oI7DfIUQYhI?si=uz5L21F_Uey6gW_e' },
    { id: 43, name: 'Heesung', group: 'ENHYPEN', videoId: 'sOPAM4bojbY?si=b1iUOCKquS6APC-F' },

  ];

  const groups = ['All', 'BLACKPINK', 'BTS', 'IVE', 'ENHYPEN', 'LE SSERAFIM', 'aespa', 'NewJeans', 'Stray Kids', 'ILLIT', 'Red Velvet', 'LOONA', 'ITZY', 'TWICE', 'SHINEE', 'G-IDLE', 'NMIXX'];

  const showToast = (message, emoji, subtext) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ visible: true, message, emoji, subtext });
    toastTimeoutRef.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3800);
  };

  const fireBrowserNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') new Notification(title, { body, icon: '☕' });
  };


  const toggleTimer = (event) => {
    event?.stopPropagation();
    if (!isRunning && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
    setIsRunning((running) => !running);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            setIsRunning(false);
            setPlayTimerSound(true);
            setIsMusicPaused(true);
            if (isStudying) {
              fireBrowserNotification('Study Session Complete! 🎉', 'Great job! Time for a café break ☕');
              setTimerDoneNotif({ visible: true, wasStudying: true });
              setTimerMinutes(timerSettings.breakMinutes); setTimerSeconds(0); setIsStudying(false);
            } else {
              fireBrowserNotification("Break Time Over!", "Ready to study again? Let's go! 📚");
              setTimerDoneNotif({ visible: true, wasStudying: false });
              setTimerMinutes(timerSettings.studyMinutes); setTimerSeconds(0); setIsStudying(true);
            }
            return;
          }
          setTimerMinutes(p => p - 1); setTimerSeconds(59);
        } else {
          setTimerSeconds(p => p - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerMinutes, timerSeconds, isStudying, timerSettings]);

  const handleTimerNotifDismiss = () => {
    setTimerDoneNotif({ visible: false, wasStudying: true });
    setIsMusicPaused(false);
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('button')) return;
    setIsDragging(true);
    const rect = timerRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseMove = useCallback((e) => {
    if (isDragging) setTimerPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  }, [isDragging, dragOffset]);
  const handleMouseUp = () => setIsDragging(false);
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp); };
    }
  }, [isDragging, handleMouseMove]);

  const formatTime = (m, s) => `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  const filteredBuddies = selectedCategory === 'All' ? studyBuddies : studyBuddies.filter(b => b.group === selectedCategory);
  const toggleCafeItem = id => setActiveCafeItems(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  // ── LANDING PAGE ──
  if (!selectedBuddy) {
    return (
      <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ background: 'linear-gradient(135deg, #FFF5F7 0%, #FFF9FB 25%, #F5F3FF 50%, #FFF0F5 75%, #FFF5F7 100%)' }}>
        <Seo title="K-pop-Inspired Study Room" description="Choose an optional YouTube study background, set a focus timer, and use a local task list in the free IdoréStudy room." path="/study" />
        <style>{fontStyle}</style>
        <div className="absolute top-20 left-12 text-4xl opacity-40 animate-bounce" style={{ animationDuration: '3s' }}>☕</div>
        <div className="absolute top-40 right-24 text-4xl opacity-30 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>🥐</div>
        <Heart className="absolute top-32 right-40 w-8 h-8 text-pink-300 opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-24 text-4xl opacity-40 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>🧋</div>
        <div className="absolute bottom-20 right-32 text-4xl opacity-30 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>🍰</div>
        <Sparkles className="absolute top-1/4 right-1/4 w-8 h-8 text-purple-300 opacity-40 animate-pulse" style={{ animationDelay: '1.5s' }} />

        <div className="flex-1 max-w-7xl mx-auto px-8 py-6 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Coffee className="w-8 h-8 text-pink-500" />
                <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <div className="nav-brand text-2xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">IdoréStudy ♡</div>
                <p className="text-xs tracking-widest font-bold text-pink-400">STUDY WITH YOUR BIAS</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 16px', borderRadius: '999px', border: '2px solid #FFD7E5', background: 'white', color: '#9B4E78', textDecoration: 'none', fontWeight: 900, fontSize: '14px' }}>
                <ArrowLeft className="w-4 h-4" /> Home
              </a>
              <a href="https://www.tiktok.com/@idore.collections" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '999px', background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)', color: 'white', textDecoration: 'none', fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '14px', boxShadow: '0 4px 20px rgba(255,107,157,0.4)' }}>
                <TikTokIcon size={18} color="white" />
                @idore.collections
              </a>
            </div>
          </div>

          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-7 h-7 text-pink-400 animate-pulse" />
              <Star className="w-7 h-7 text-yellow-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
              <Sparkles className="w-7 h-7 text-purple-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl mb-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Who are you studying with today? 💖
            </h1>
            <p className="hero-subtitle text-lg sm:text-2xl text-gray-500">Pick your bias, grab a latte, and let's ace this together ☕✨</p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
            {groups.map(group => (
              <button type="button" key={group} onClick={() => setSelectedCategory(group)}
                className={`px-6 py-3 rounded-full font-bold transition-all shadow-lg transform hover:scale-110 ${selectedCategory === group ? 'text-white shadow-2xl scale-110' : 'bg-white border-2 border-pink-200 hover:bg-pink-50 text-gray-700'}`}
                style={selectedCategory === group ? { background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)' } : {}}>
                {group === 'All' ? '✨ All' : group}
              </button>
            ))}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-pink-500" />
              <h3 className="text-2xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Choose Your Study Partner</h3>
              <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBuddies.map((buddy) => (
                <button
                  type="button"
                  key={buddy.id}
                  onClick={() => setSelectedBuddy(buddy)}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 hover:-translate-y-2 group relative border-2 border-pink-100 hover:border-pink-300 text-left"
                  aria-label={`Study with ${buddy.name} from ${buddy.group}`}
                >
                  <div className="relative">
                    <BuddyPortrait buddy={buddy} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-pink-300" /><span className="text-white text-xs font-bold">Open this focus room</span></div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-black text-lg text-gray-800 mb-1">{buddy.name}</h3>
                        <p className="text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">{buddy.group}</p>
                      </div>
                      <Heart className="w-5 h-5 text-pink-300 group-hover:text-pink-500 group-hover:fill-pink-500 transition" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>


        <section style={{ width: 'min(980px, calc(100% - 32px))', margin: '48px auto 56px', padding: 'clamp(24px, 5vw, 42px)', borderRadius: 28, border: '2px solid #FFD7E5', background: 'rgba(255,255,255,.9)', position: 'relative', zIndex: 3 }} aria-labelledby="room-how-to">
          <p style={{ color: '#C24178', fontSize: 12, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>How to use the room</p>
          <h2 id="room-how-to" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(28px, 5vw, 42px)', margin: '0 0 16px', color: '#332a38' }}>Let the media set the mood, then make the work the main event.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 18 }}>
            {[
              ['1. Pick one outcome', 'Decide what should be finished before you choose a room.'],
              ['2. Choose once', 'Select a study buddy and music option, then minimize the controls.'],
              ['3. Work the timer', 'Keep one task visible and note distractions instead of following them.'],
              ['4. Leave a next action', 'Before closing, write the first step for your next session.'],
            ].map(([title, text]) => (
              <article key={title} style={{ padding: 18, borderRadius: 18, background: 'linear-gradient(145deg,#FFF5F7,#F5F3FF)' }}>
                <h3 style={{ margin: '0 0 8px', color: '#4a3b51', fontSize: 16 }}>{title}</h3>
                <p style={{ margin: 0, color: '#75697d', lineHeight: 1.65, fontSize: 14 }}>{text}</p>
              </article>
            ))}
          </div>
          <p style={{ margin: '22px 0 0', color: '#75697d', lineHeight: 1.7, fontSize: 14 }}>
            Media is optional, streamed from YouTube, and not owned by IdoréStudy. No display advertisements are placed in the study room. Visit the original YouTube page from inside a room to see the uploader and platform context.
          </p>
        </section>

        <Footer />
      </div>
    );
  }

  // ── STUDY ROOM ──
  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ backgroundColor: '#2D2D3D' }}>
      <Seo title={`Study with ${selectedBuddy.name}`} description={`An ad-free focus room with a timer, local task list, and optional YouTube ambience selected for ${selectedBuddy.name}.`} path="/study" noIndex />
      <style>{fontStyle}</style>
      <CafeToast visible={toast.visible} message={toast.message} emoji={toast.emoji} subtext={toast.subtext} />
      <TimerDoneNotif visible={timerDoneNotif.visible} wasStudying={timerDoneNotif.wasStudying} onDismiss={handleTimerNotifDismiss} />
      <TimerSound shouldPlay={playTimerSound} onDone={() => setPlayTimerSound(false)} />
      <TimerSettingsModal visible={showTimerSettings} onClose={() => setShowTimerSettings(false)} onSave={handleSaveTimerSettings} currentStudy={timerSettings.studyMinutes} currentBreak={timerSettings.breakMinutes} />

      {/* Left Sidebar */}
      <div className={`transition-all duration-300 ${showSidebar ? 'w-72 md:w-80' : 'w-0'} flex-shrink-0 overflow-hidden fixed md:relative inset-y-0 left-0 z-40 md:z-auto`}
        style={{ background: 'linear-gradient(180deg, #FFF5F7 0%, #F5F3FF 50%, #FFF0F5 100%)', borderRight: '4px solid #FFB6D9' }}>
        <div className="h-screen overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6 sticky top-0 bg-gradient-to-b from-pink-50 to-transparent pb-4 z-10">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
              <h2 className="nav-brand text-xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">IdoreStudy</h2>
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <button type="button" aria-label="Hide study buddy list" onClick={() => setShowSidebar(false)} className="p-2 rounded-full hover:bg-pink-100 transition transform hover:scale-110">
              <ChevronLeft className="w-5 h-5 text-pink-500" />
            </button>
          </div>
          <div className="space-y-3 pb-24">
            {studyBuddies.map(buddy => (
              <button type="button" aria-label={`Switch study room to ${buddy.name} from ${buddy.group}`} key={buddy.id} onClick={() => setSelectedBuddy(buddy)}
                className={`w-full rounded-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${selectedBuddy.id === buddy.id ? 'shadow-2xl scale-105' : 'shadow-lg'}`}
                style={{ background: 'white', border: selectedBuddy.id === buddy.id ? '3px solid #FF6B9D' : '2px solid #FFD7E5' }}>
                <div className="flex items-center gap-3 p-2.5">
                  <div className="relative">
                    <BuddyPortrait buddy={buddy} compact />
                    {selectedBuddy.id === buddy.id && (
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-1">
                        <Heart className="w-3 h-3 text-white fill-white" />
                      </div>
                    )}
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-black text-sm text-gray-800">{buddy.name}</p>
                    <p className="text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">{buddy.group}</p>
                  </div>
                  {selectedBuddy.id === buddy.id && <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />}
                </div>
              </button>
            ))}
          </div>
          <div className="sticky bottom-0 bg-gradient-to-t from-pink-50 to-transparent pt-4">
            <button type="button" onClick={() => setSelectedBuddy(null)}
              className="w-full py-4 rounded-2xl font-black text-white shadow-2xl transition transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)' }}>
              <div className="flex items-center justify-center gap-2"><Coffee className="w-5 h-5" />Back to Café<Heart className="w-4 h-4" /></div>
            </button>
          </div>
        </div>
      </div>

      {!showSidebar && (
        <button type="button" aria-label="Show study buddy list" onClick={() => setShowSidebar(true)}
          className="absolute top-6 left-6 z-50 p-4 rounded-2xl shadow-2xl transition transform hover:scale-110 animate-pulse"
          style={{ background: 'linear-gradient(135deg, #FFD1DC 0%, #E6A8D7 100%)' }}>
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      <div className="flex-1 relative h-screen overflow-hidden">
        {activeCafeItems.map((itemId, index) => {
          const item = cafeItems.find(i => i.id === itemId);
          const positions = [{ top: '15%', left: '10%' }, { top: '25%', right: '15%' }, { bottom: '30%', left: '20%' }, { bottom: '25%', right: '25%' }, { top: '40%', left: '15%' }, { top: '50%', right: '20%' }, { bottom: '45%', left: '12%' }, { top: '35%', right: '12%' }];
          return (
            <div key={itemId} className="absolute z-20 text-6xl opacity-40 animate-bounce pointer-events-none"
              style={{ ...positions[index % positions.length], animationDuration: `${3 + index * 0.5}s`, animationDelay: `${index * 0.3}s` }}>
              {item?.emoji}
            </div>
          );
        })}

        <YTBackground key={selectedBuddy.id} videoId={selectedBuddy.videoId} title={`${selectedBuddy.name} of ${selectedBuddy.group}`} />
        {selectedMusic?.videoId && (
          <AudioPlayer videoId={selectedMusic.videoId} name={selectedMusic.name} isMuted={isMuted} isPaused={isMusicPaused} />
        )}

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 p-3 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <a aria-label="Return to IdoréStudy home" href="/" className="inline-flex items-center gap-2 px-3 sm:px-4 py-3 rounded-2xl bg-black/45 text-white font-bold text-sm backdrop-blur-md hover:bg-black/60" style={{ textDecoration: 'none' }}><ArrowLeft className="w-4 h-4" /><span className="hidden sm:inline">Home</span></a>
            <div className="backdrop-blur-xl px-3 sm:px-8 py-2 sm:py-4 rounded-2xl sm:rounded-3xl shadow-2xl border-[3px] max-w-[52vw] sm:max-w-none"
              style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.95), rgba(200,109,215,0.95))', borderColor: 'rgba(255,255,255,0.3)' }}>
              <div className="hidden sm:flex items-center gap-3 mb-1">
                <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
                <p className="text-xs tracking-widest font-bold text-pink-100">STUDYING WITH</p>
                <Sparkles className="w-4 h-4 text-yellow-200" />
              </div>
              <p className="text-base sm:text-2xl font-black text-white text-center truncate">{selectedBuddy.name}</p>
              <p className="hidden sm:block text-xs text-center text-pink-100 font-semibold mt-1">{selectedBuddy.group}</p>
            </div>
            <a aria-label={`Open the original YouTube source for ${selectedBuddy.name}`} href={`https://www.youtube.com/watch?v=${selectedBuddy.videoId.split('?')[0]}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 sm:px-4 py-3 rounded-2xl bg-black/45 text-white font-bold text-sm backdrop-blur-md hover:bg-black/60" style={{ textDecoration: 'none' }}><span className="hidden sm:inline">Video source</span><ExternalLink className="w-4 h-4" /></a>
          </div>
        </div>

        {sessionOutcome && (
          <div className="absolute top-32 left-1/2 -translate-x-1/2 z-20 max-w-lg w-[calc(100%_-_32px)] rounded-2xl px-5 py-3 shadow-2xl backdrop-blur-xl border border-white/30" style={{ background: 'rgba(24,20,32,.72)' }}>
            <div className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-pink-300 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] tracking-widest font-black text-pink-200 mb-1">SESSION OUTCOME</p>
                <p className="text-sm font-bold text-white leading-snug break-words">{sessionOutcome}</p>
              </div>
              <button type="button" aria-label="Clear session outcome" onClick={() => { setSessionOutcome(''); try { localStorage.removeItem('idorestudy_session_outcome_v1'); } catch (error) {} }} className="p-1 rounded-lg hover:bg-white/15">
                <X className="w-4 h-4 text-white/80" />
              </button>
            </div>
          </div>
        )}

        {/* Draggable Timer */}
        <div ref={timerRef} className="absolute z-30 cursor-move"
          style={{ top: timerPosition.y === 0 ? 'clamp(210px, 26vh, 270px)' : `${timerPosition.y}px`, right: timerPosition.x === 0 ? '24px' : 'auto', left: timerPosition.x !== 0 ? `${timerPosition.x}px` : 'auto' }}
          onMouseDown={handleMouseDown}>
          {isTimerMinimized ? (
            <div className="rounded-2xl shadow-2xl p-4 border-4 border-pink-200 backdrop-blur-md"
              style={{ background: 'linear-gradient(135deg, rgba(255,245,247,0.95), rgba(245,243,255,0.95))' }}>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">{formatTime(timerMinutes, timerSeconds)}</div>
                <button type="button" aria-label={isRunning ? 'Pause timer' : 'Start timer'} onClick={toggleTimer} className="p-2 rounded-xl bg-pink-100 hover:bg-pink-200">
                  {isRunning ? <Pause className="w-4 h-4 text-pink-600" /> : <Play className="w-4 h-4 text-pink-600" />}
                </button>
                <button type="button" aria-label="Expand timer" onClick={(e) => { e.stopPropagation(); setIsTimerMinimized(false); }} className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200">
                  <Maximize2 className="w-4 h-4 text-purple-600" />
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl shadow-2xl p-5 w-72 border-4 border-pink-200" style={{ background: 'linear-gradient(135deg, #FFF5F7 0%, #F5F3FF 100%)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-black text-sm text-gray-800">FOCUS TIME</span>
                </div>
                <div className="flex gap-1">
                  <button type="button" aria-label="Minimize timer" onClick={(e) => { e.stopPropagation(); setIsTimerMinimized(true); }} className="p-1.5 hover:bg-pink-100 rounded-xl transition">
                    <Minimize2 className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                  <button type="button" aria-label="Open timer settings" onClick={(e) => { e.stopPropagation(); setShowTimerSettings(true); }} className="p-1.5 hover:bg-pink-100 rounded-xl transition">
                    <Settings className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: '#B8A0CC', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  📚 {timerSettings.studyMinutes}m &nbsp;·&nbsp; ☕ {timerSettings.breakMinutes}m
                  <button type="button" onClick={(e) => { e.stopPropagation(); setShowTimerSettings(true); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '1px 5px', borderRadius: '6px', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: '#FF6B9D', fontWeight: 600 }}>edit</button>
                </span>
              </div>

              <div className="flex gap-2 mb-5">
                <button type="button" onClick={(e) => { e.stopPropagation(); setIsStudying(true); setTimerMinutes(timerSettings.studyMinutes); setTimerSeconds(0); setIsRunning(false); }}
                  className={`flex-1 py-2.5 rounded-2xl font-bold text-xs transition-all transform hover:scale-105 ${isStudying ? 'text-white shadow-xl scale-105' : 'hover:bg-pink-50'}`}
                  style={isStudying ? { background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)' } : { backgroundColor: '#FFE5F1', color: '#9CA3AF' }}>
                  📚 Study
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); setIsStudying(false); setTimerMinutes(timerSettings.breakMinutes); setTimerSeconds(0); setIsRunning(false); }}
                  className={`flex-1 py-2.5 rounded-2xl font-bold text-xs transition-all transform hover:scale-105 ${!isStudying ? 'text-white shadow-xl scale-105' : 'hover:bg-pink-50'}`}
                  style={!isStudying ? { background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)' } : { backgroundColor: '#FFE5F1', color: '#9CA3AF' }}>
                  ☕ Break
                </button>
              </div>

              <div className="flex justify-center mb-5 relative">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 opacity-50 animate-pulse" style={{ animationDuration: '3s' }} />
                  <svg className="w-full h-full transform -rotate-90 relative z-10">
                    <circle cx="80" cy="80" r="72" stroke="#FFD1DC" strokeWidth="8" fill="none" />
                    <circle cx="80" cy="80" r="72" stroke="url(#tg)" strokeWidth="8" fill="none"
                      strokeDasharray={`${2 * Math.PI * 72}`}
                      strokeDashoffset={`${2 * Math.PI * 72 * (1 - ((isStudying ? timerSettings.studyMinutes : timerSettings.breakMinutes) * 60 - (timerMinutes * 60 + timerSeconds)) / ((isStudying ? timerSettings.studyMinutes : timerSettings.breakMinutes) * 60))}`}
                      strokeLinecap="round" className="transition-all duration-300" />
                    <defs>
                      <linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF6B9D" />
                        <stop offset="50%" stopColor="#C86DD7" />
                        <stop offset="100%" stopColor="#9B7EDB" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">{formatTime(timerMinutes, timerSeconds)}</div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Heart className="w-2.5 h-2.5 text-pink-400 animate-pulse" />
                      <Heart className="w-2.5 h-2.5 text-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <Heart className="w-2.5 h-2.5 text-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2.5">
                <button type="button" aria-label="Reset timer" onClick={(e) => { e.stopPropagation(); setTimerMinutes(isStudying ? timerSettings.studyMinutes : timerSettings.breakMinutes); setTimerSeconds(0); setIsRunning(false); }}
                  className="p-3 rounded-2xl bg-pink-100 hover:bg-pink-200 transition-all transform hover:scale-110">
                  <RotateCcw className="w-4 h-4 text-pink-600" />
                </button>
                <button type="button" aria-label={isRunning ? 'Pause timer' : 'Start timer'} onClick={toggleTimer}
                  className="p-5 rounded-2xl shadow-2xl transition-all transform hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)' }}>
                  {isRunning ? <Pause className="w-6 h-6 text-white" fill="white" /> : <Play className="w-6 h-6 text-white" fill="white" />}
                </button>
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs font-bold text-gray-600 flex items-center justify-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />You got this!<Heart className="w-3.5 h-3.5 text-pink-400" />
                </p>
              </div>
            </div>
          )}
        </div>

        <TodoWidget />

        {/* Bottom Menu */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          {!isMenuBarMinimized && showMusicMenu && (
            <div className="study-menu-popover mb-4 rounded-3xl shadow-2xl backdrop-blur-xl border-[3px] p-4"
              style={{ background: 'linear-gradient(135deg, rgba(255,245,247,0.98), rgba(245,243,255,0.98))', borderColor: 'rgba(255,107,157,0.3)', minWidth: '280px', maxWidth: '300px' }}>
              <div className="flex items-center gap-2 mb-3">
                <Music className="w-4 h-4 text-pink-500" />
                <h3 className="font-black text-sm text-gray-800">Music Vibes 🎵</h3>
              </div>
              <div className="music-scroll space-y-1.5" style={{ maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
                {musicOptions.map(music => (
                  <button type="button" key={music.id} onClick={() => { setSelectedMusic(music); setIsMusicPaused(!music.videoId); }}
                    className={`w-full p-2 rounded-xl transition-all transform hover:scale-105 text-left ${selectedMusic.id === music.id ? 'text-white shadow-lg' : 'bg-white hover:bg-pink-50'}`}
                    style={selectedMusic.id === music.id ? { background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)' } : {}}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{music.icon}</span>
                      <span className="font-bold text-xs">{music.name}</span>
                      {selectedMusic.id === music.id && <Heart className="w-3 h-3 ml-auto fill-white" />}
                    </div>
                  </button>
                ))}
              </div>
              {selectedMusic.videoId && (
                <a
                  href={`https://www.youtube.com/watch?v=${selectedMusic.videoId.split('?')[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-pink-600"
                >
                  Open selected music source <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {!isMenuBarMinimized && showCafeMenu && (
            <div className="study-menu-popover mb-4 rounded-3xl shadow-2xl backdrop-blur-xl border-[3px] p-6"
              style={{ background: 'linear-gradient(135deg, rgba(255,248,230,0.98), rgba(255,243,220,0.98))', borderColor: 'rgba(255,165,0,0.25)', minWidth: '300px' }}>
              <div className="flex items-center gap-2 mb-4">
                <Coffee className="w-5 h-5 text-orange-500" />
                <h3 className="font-black text-gray-800">Café Vibes ☕</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {cafeItems.map(item => (
                  <button type="button" aria-pressed={activeCafeItems.includes(item.id)} key={item.id} onClick={() => toggleCafeItem(item.id)}
                    className={`p-3 rounded-2xl transition-all transform hover:scale-105 ${activeCafeItems.includes(item.id) ? 'text-white shadow-lg' : 'bg-white hover:bg-orange-50'}`}
                    style={activeCafeItems.includes(item.id) ? { background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' } : {}}>
                    <div className="text-center">
                      <div className="text-3xl mb-1">{item.emoji}</div>
                      <div className={`text-xs font-bold ${activeCafeItems.includes(item.id) ? 'text-white' : 'text-gray-700'}`}>{item.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isMenuBarMinimized ? (
            <div className="study-bottom-minimized menu-bar-slide-in flex items-center gap-3 px-5 py-3 rounded-full shadow-2xl backdrop-blur-xl border-[3px]"
              style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.95), rgba(200,109,215,0.95))', borderColor: 'rgba(255,255,255,0.3)' }}>
              <Music className="w-4 h-4 text-white opacity-80" />
              <span className="study-selected-name text-white font-bold text-sm opacity-90">{selectedMusic.icon} {selectedMusic.name}</span>
              <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.3)', margin: '0 2px' }} />
              <button type="button" onClick={() => setIsMenuBarMinimized(false)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/35">
                <ChevronUp className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-bold">Show</span>
              </button>
            </div>
          ) : (
            <div className="study-bottom-controls flex items-center gap-4 px-9 py-5 rounded-full shadow-2xl backdrop-blur-xl border-[3px]"
              style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.95), rgba(200,109,215,0.95))', borderColor: 'rgba(255,255,255,0.3)' }}>
              <button
                type="button"
                aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
                disabled={!selectedMusic.videoId}
                onClick={() => setIsMuted(m => !m)}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition transform hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
              </button>
              <button
                type="button"
                aria-label={isMusicPaused ? 'Play background music' : 'Pause background music'}
                disabled={!selectedMusic.videoId}
                onClick={() => setIsMusicPaused(p => !p)}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition transform hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isMusicPaused ? <Play className="w-6 h-6 text-white" fill="white" /> : <Pause className="w-6 h-6 text-white" fill="white" />}
              </button>
              <button type="button" aria-label="Choose background music" aria-expanded={showMusicMenu} onClick={() => { setShowMusicMenu(s => !s); setShowCafeMenu(false); }}
                className={`flex items-center gap-3 px-6 py-3 rounded-full transition transform hover:scale-105 ${showMusicMenu ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}>
                <Music className="w-5 h-5 text-white" />
                <span className="study-control-label text-white font-bold text-sm">{selectedMusic.name}</span>
                <ChevronUp className={`w-4 h-4 text-white transition-transform duration-200 ${showMusicMenu ? 'rotate-180' : ''}`} />
              </button>
              <button type="button" aria-label="Choose café decorations" aria-expanded={showCafeMenu} onClick={() => { setShowCafeMenu(s => !s); setShowMusicMenu(false); }}
                className={`flex items-center gap-3 px-6 py-3 rounded-full transition transform hover:scale-105 ${showCafeMenu ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}>
                <Coffee className="w-5 h-5 text-white" />
                <span className="study-control-label text-white font-bold text-sm">Café Vibes</span>
                <ChevronUp className={`w-4 h-4 text-white transition-transform duration-200 ${showCafeMenu ? 'rotate-180' : ''}`} />
              </button>
              <div className="study-control-divider" style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.25)', margin: '0 2px' }} />
              <button type="button" aria-label="Minimize room controls" onClick={() => { setIsMenuBarMinimized(true); setShowMusicMenu(false); setShowCafeMenu(false); }}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition transform hover:scale-110">
                <ChevronDown className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyCafe;
