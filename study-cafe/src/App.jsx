import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Coffee, Music, Volume2, VolumeX, Settings, Crown, Star, Flame, Users, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Heart, Sparkles, Award, Gift, Headphones, Clock, BarChart3, ChevronUp, ChevronDown, Minimize2, Maximize2, CheckSquare, Square, Plus, Trash2, X } from 'lucide-react';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
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

  /* ── Mobile responsive overrides ── */
  @media (max-width: 768px) {
    .buddy-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 12px !important;
    }
    .buddy-card-img {
      height: 140px !important;
    }
    .hero-title-text {
      font-size: 2rem !important;
      line-height: 1.2 !important;
    }
    .hero-subtitle-text {
      font-size: 1.1rem !important;
    }
    .group-filter-wrap {
      gap: 8px !important;
    }
    .group-filter-btn {
      padding: 8px 14px !important;
      font-size: 12px !important;
    }
    .landing-padding {
      padding: 16px !important;
    }
    .search-bar {
      padding: 12px 20px !important;
    }
    .nav-bar {
      margin-bottom: 24px !important;
    }
    .landing-header {
      margin-bottom: 20px !important;
    }
    .filter-section {
      margin-bottom: 20px !important;
    }
    .footer-inner {
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      gap: 12px !important;
    }
    /* Study room mobile */
    .sidebar-desktop {
      display: none !important;
    }
    .timer-widget-mobile {
      top: 80px !important;
      right: 12px !important;
      left: auto !important;
    }
    .bottom-menu-mobile {
      bottom: 12px !important;
      width: calc(100vw - 24px) !important;
      left: 12px !important;
      transform: none !important;
    }
    .todo-widget-mobile {
      bottom: 90px !important;
      right: 12px !important;
    }
    .music-dropdown-mobile {
      width: calc(100vw - 48px) !important;
      min-width: unset !important;
      max-width: unset !important;
    }
    .cafe-dropdown-mobile {
      width: calc(100vw - 48px) !important;
      min-width: unset !important;
    }
    .todo-panel-mobile {
      width: calc(100vw - 48px) !important;
      max-width: 320px !important;
    }
    .timer-notif-mobile {
      padding: 32px 24px !important;
    }
    .timer-notif-title-mobile {
      font-size: 26px !important;
    }
    .timer-notif-subtitle-mobile {
      font-size: 16px !important;
    }
    .studying-with-badge {
      padding: 10px 20px !important;
    }
    .studying-with-name {
      font-size: 18px !important;
    }
    .timer-compact-mobile {
      width: 220px !important;
      padding: 14px !important;
    }
    .timer-full-mobile {
      width: 230px !important;
      padding: 14px !important;
    }
    .timer-circle-mobile {
      width: 120px !important;
      height: 120px !important;
    }
    .bottom-bar-full {
      gap: 8px !important;
      padding: 12px 14px !important;
      border-radius: 20px !important;
      flex-wrap: nowrap !important;
    }
    .bottom-bar-music-label {
      display: none !important;
    }
    .bottom-bar-cafe-label {
      display: none !important;
    }
  }

  @media (max-width: 480px) {
    .buddy-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .hero-title-text {
      font-size: 1.65rem !important;
    }
  }
`;

// ── YouTube Background ────────────────────────────────────────────────────────
function YTBackground({ videoId }) {
  const cleanVideoId = videoId.split('?')[0];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#000' }}>
      <iframe
        width="100%" height="100%"
        src={`https://www.youtube.com/embed/${cleanVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${cleanVideoId}&rel=0&modestbranding=1&showinfo=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{
          position: 'absolute', top: '45%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '135%', height: '140%',
          border: 'none', pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }} />
    </div>
  );
}

// ── Audio Player ──────────────────────────────────────────────────────────────
function AudioPlayer({ videoId, isMuted, isPaused }) {
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const cleanVideoId = useRef('');

  const [srcKey, setSrcKey] = useState(0);
  const newClean = videoId.split('?')[0];
  if (cleanVideoId.current !== newClean) {
    cleanVideoId.current = newClean;
  }

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
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: isPaused ? 'pauseVideo' : 'playVideo', args: [] }),
        '*'
      );
    } catch (e) {}
  }, [isPaused, loaded]);

  useEffect(() => {
    if (!loaded || !iframeRef.current) return;
    const func = isMuted ? 'mute' : 'unMute';
    try {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args: [] }),
        '*'
      );
    } catch (e) {}
  }, [isMuted, loaded]);

  const handleLoad = () => { setLoaded(true); };

  useEffect(() => {
    if (!loaded || !iframeRef.current) return;
    const t = setTimeout(() => {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: isMuted ? 'mute' : 'unMute', args: [] }),
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: isPaused ? 'pauseVideo' : 'playVideo', args: [] }),
          '*'
        );
      } catch (e) {}
    }, 1000);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <div style={{ position: 'fixed', bottom: '0px', left: '0px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
      <iframe
        key={srcKey}
        ref={iframeRef}
        width="1" height="1"
        src={`https://www.youtube.com/embed/${cleanVideoId.current}?autoplay=1&mute=0&controls=0&loop=1&playlist=${cleanVideoId.current}&rel=0&modestbranding=1&enablejsapi=1`}
        title="Background Music Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={handleLoad}
        style={{ width: '1px', height: '1px', border: 'none', pointerEvents: 'none' }}
      />
    </div>
  );
}

// ── Timer-done alarm ──────────────────────────────────────────────────────────
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
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(0.45, startTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
          osc.start(startTime);
          osc.stop(startTime + duration);
        };
        const t = ctx.currentTime;
        playBeep(880,  t,        0.55);
        playBeep(1100, t + 0.35, 0.55);
        playBeep(1320, t + 0.70, 0.90);
        playBeep(880,  t + 1.50, 0.55);
        playBeep(1100, t + 1.85, 0.55);
        playBeep(1320, t + 2.20, 0.90);
        setTimeout(() => { if (onDone) onDone(); ctx.close(); }, 3500);
      } catch (e) {
        setTimeout(() => { if (onDone) onDone(); }, 100);
      }
    }
    if (!shouldPlay) { hasPlayedRef.current = false; }
  }, [shouldPlay, onDone]);

  return null;
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function CafeToast({ visible, message, emoji, subtext }) {
  if (!visible) return null;
  return (
    <div className="cafe-toast" style={{
      position: 'fixed', bottom: '120px', left: '50%',
      zIndex: 9999,
      background: 'linear-gradient(135deg, rgba(255,245,247,0.99), rgba(245,243,255,0.99))',
      border: '3px solid #FFB6D9', borderRadius: '24px',
      padding: '18px 28px',
      boxShadow: '0 20px 60px rgba(255,107,157,0.35)',
      display: 'flex', alignItems: 'center', gap: '14px',
      minWidth: '280px', maxWidth: '90vw', backdropFilter: 'blur(20px)',
    }}>
      <span style={{ fontSize: '40px', lineHeight: 1 }}>{emoji}</span>
      <div>
        <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '16px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '2px' }}>{message}</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '13px', color: '#9B7EDB', fontWeight: 400 }}>{subtext}</p>
      </div>
    </div>
  );
}

// ── Confetti ──────────────────────────────────────────────────────────────────
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
        <span key={i} style={{
          position: 'absolute', top: '-30px', left: p.left, fontSize: p.size,
          animationName: 'confettiFall', animationDuration: p.duration,
          animationDelay: p.delay, animationTimingFunction: 'linear',
          animationFillMode: 'forwards', animationIterationCount: 'infinite',
          display: 'inline-block',
        }}>{p.emoji}</span>
      ))}
    </div>
  );
}

// ── Timer Done Notification ───────────────────────────────────────────────────
function TimerDoneNotif({ visible, wasStudying, onDismiss }) {
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(0,0,0,0.65)',
      backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Confetti />
      <div className="timer-notif-in timer-notif-mobile" style={{
        position: 'fixed', top: '50%', left: '50%',
        background: 'linear-gradient(135deg, #FFF5F7 0%, #F5F3FF 50%, #FFF0F5 100%)',
        border: '5px solid #FFB6D9',
        borderRadius: '40px',
        padding: '56px 72px',
        boxShadow: '0 40px 120px rgba(255,107,157,0.55), 0 0 0 1px rgba(255,255,255,0.8)',
        textAlign: 'center',
        maxWidth: '520px', width: '90vw',
        zIndex: 2,
        boxSizing: 'border-box',
      }}>
        <div style={{ fontSize: '96px', lineHeight: 1, marginBottom: '20px' }}>
          {wasStudying ? '🎉' : '📚'}
        </div>
        <h2 className="timer-notif-title-mobile" style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '38px', lineHeight: 1.15,
          background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '14px',
        }}>
          {wasStudying ? 'Study Session Complete 🎊' : "Break's Over 🎊 "}
        </h2>
        <p className="timer-notif-subtitle-mobile" style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
          fontSize: '21px', color: '#9B7EDB', fontWeight: 300, marginBottom: '36px', lineHeight: 1.5,
        }}>
          {wasStudying
            ? 'Amazing work! ☕ Time for a cute café break~'
            : "Let's lock in on your goals ✨"}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '36px' }}>
          {['💖','💜','💖','💜','💖'].map((h, i) => (
            <span key={i} className="heart-beat" style={{ fontSize: 28, animationDelay: `${i * 0.18}s` }}>{h}</span>
          ))}
        </div>
        <button
          onClick={onDismiss}
          style={{
            background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)',
            color: 'white', border: 'none', borderRadius: '999px',
            padding: '18px 52px', fontSize: '19px', fontWeight: 900,
            fontFamily: "'Playfair Display', serif",
            cursor: 'pointer', boxShadow: '0 8px 32px rgba(255,107,157,0.45)',
            letterSpacing: '0.02em', transition: 'transform 0.15s, box-shadow 0.15s',
            width: '100%', maxWidth: '280px',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.07)'; e.currentTarget.style.boxShadow = '0 14px 42px rgba(255,107,157,0.65)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,107,157,0.45)'; }}
        >
          {wasStudying ? '☕ Start My Break!' : '📚 Start Studying!'}
        </button>
      </div>
    </div>
  );
}

// ── To-Do List ────────────────────────────────────────────────────────────────
function TodoWidget({ isMobile }) {
  const STORAGE_KEY = 'idorestudy_todos_v2';
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const loadTodos = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: 1, text: 'Review chapter notes 📖', done: false },
      { id: 2, text: 'Practice vocab flashcards ✏️', done: false },
    ];
  };

  const [todos, setTodos] = useState(loadTodos);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); } catch (e) {}
  }, [todos]);

  const addTodo = () => {
    const t = input.trim(); if (!t) return;
    setTodos(p => [...p, { id: Date.now(), text: t, done: false }]);
    setInput(''); inputRef.current?.focus();
  };
  const toggleTodo = (id) => setTodos(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTodo = (id) => setTodos(p => p.filter(t => t.id !== id));

  const done = todos.filter(t => t.done).length;
  const total = todos.length;

  const panelWidth = isMobile ? 'calc(100vw - 48px)' : '340px';
  const maxPanelWidth = isMobile ? '320px' : '340px';

  return (
    <div className="todo-widget-mobile" style={{
      position: 'fixed',
      bottom: isMobile ? '90px' : '24px',
      right: '24px',
      zIndex: 8000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '10px',
    }}>
      {isOpen && !isMinimized && (
        <div className="todo-slide-in todo-panel-mobile" style={{
          background: 'linear-gradient(135deg, rgba(255,245,247,0.99), rgba(245,243,255,0.99))',
          border: '3px solid #FFB6D9', borderRadius: '28px',
          padding: '20px 22px 22px',
          width: panelWidth,
          maxWidth: maxPanelWidth,
          boxShadow: '0 24px 80px rgba(255,107,157,0.32)',
          backdropFilter: 'blur(20px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '22px' }}>📝</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '17px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Study To-Do List
              </span>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => setIsMinimized(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', lineHeight: 0 }} title="Minimize">
                <Minimize2 style={{ width: 16, height: 16, color: '#C86DD7' }} />
              </button>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', lineHeight: 0 }}>
                <X style={{ width: 16, height: 16, color: '#C86DD7' }} />
              </button>
            </div>
          </div>

          {total > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '13px', color: '#9B7EDB' }}>
                  {done === total ? '🎉 All done, superstar!' : `${done} of ${total} completed`}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#FF6B9D' }}>{Math.round((done / total) * 100)}%</span>
              </div>
              <div style={{ height: '7px', background: '#FFE5F1', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(done / total) * 100}%`, background: 'linear-gradient(90deg, #FF6B9D, #C86DD7)', borderRadius: '99px', transition: 'width 0.4s ease' }} />
              </div>
            </div>
          )}

          <div style={{ maxHeight: '180px', overflowY: 'auto', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {todos.length === 0 && (
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: '#C4A8D4', fontSize: '14px', textAlign: 'center', padding: '18px 0' }}>
                No tasks yet~ add one below! 🌸
              </p>
            )}
            {todos.map(todo => (
              <div key={todo.id} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 11px',
                background: todo.done ? 'linear-gradient(135deg, #F0EBFF, #FFE5F1)' : 'white',
                borderRadius: '13px',
                border: `2px solid ${todo.done ? '#DDB6F5' : '#FFD7E5'}`,
                transition: 'all 0.2s',
              }}>
                <button onClick={() => toggleTodo(todo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, lineHeight: 0 }}>
                  {todo.done
                    ? <CheckSquare style={{ width: 19, height: 19, color: '#C86DD7' }} />
                    : <Square style={{ width: 19, height: 19, color: '#FFB6D9' }} />
                  }
                </button>
                <span style={{ flex: 1, fontSize: '13px', fontWeight: 600, color: todo.done ? '#B8A0CC' : '#444', textDecoration: todo.done ? 'line-through' : 'none', transition: 'all 0.2s' }}>{todo.text}</span>
                <button onClick={() => deleteTodo(todo.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, opacity: 0.38, flexShrink: 0, lineHeight: 0, transition: 'opacity 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0.38'}>
                  <Trash2 style={{ width: 13, height: 13, color: '#FF6B9D' }} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTodo()}
              placeholder="Add a task... ✨"
              style={{
                flex: 1, padding: '9px 13px', borderRadius: '11px',
                border: '2px solid #FFD7E5', outline: 'none', fontSize: '13px',
                fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
                background: 'white', color: '#444', cursor: 'text',
              }}
              onFocus={e => e.target.style.borderColor = '#FF6B9D'}
              onBlur={e => e.target.style.borderColor = '#FFD7E5'}
            />
            <button onClick={addTodo}
              style={{
                background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
                border: 'none', borderRadius: '11px', padding: '9px 13px',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                boxShadow: '0 4px 12px rgba(255,107,157,0.35)', transition: 'transform 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.09)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Plus style={{ width: 17, height: 17, color: 'white' }} />
            </button>
          </div>
        </div>
      )}

      {isOpen && isMinimized && (
        <div className="todo-slide-in" style={{
          background: 'linear-gradient(135deg, rgba(255,245,247,0.99), rgba(245,243,255,0.99))',
          border: '3px solid #FFB6D9', borderRadius: '18px',
          padding: '10px 16px',
          boxShadow: '0 12px 40px rgba(255,107,157,0.25)',
          backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ fontSize: '18px' }}>📝</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '14px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            To-Do {total > 0 ? `(${done}/${total})` : ''}
          </span>
          <button onClick={() => setIsMinimized(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', lineHeight: 0 }} title="Expand">
            <Maximize2 style={{ width: 15, height: 15, color: '#C86DD7' }} />
          </button>
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', lineHeight: 0 }}>
            <X style={{ width: 15, height: 15, color: '#C86DD7' }} />
          </button>
        </div>
      )}

      <button
        onClick={() => { setIsOpen(o => !o); setIsMinimized(false); }}
        style={{
          width: '54px', height: '54px',
          borderRadius: '50%',
          background: isOpen ? 'linear-gradient(135deg, #C86DD7, #FF6B9D)' : 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
          border: '3px solid rgba(255,255,255,0.5)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 28px rgba(255,107,157,0.45)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          position: 'relative',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(255,107,157,0.6)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,107,157,0.45)'; }}
        title="To-Do List"
      >
        {isOpen ? <X style={{ width: 22, height: 22, color: 'white' }} /> : <CheckSquare style={{ width: 22, height: 22, color: 'white' }} />}
        {!isOpen && total > 0 && done < total && (
          <div style={{
            position: 'absolute', top: '-4px', right: '-4px',
            background: '#FF3B6B', color: 'white',
            borderRadius: '50%', width: '20px', height: '20px',
            fontSize: '11px', fontWeight: 900,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid white',
          }}>
            {total - done}
          </div>
        )}
      </button>
    </div>
  );
}

// ── TikTok Icon ───────────────────────────────────────────────────────────────
function TikTokIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  );
}

// ── Analytics helpers ─────────────────────────────────────────────────────────
function trackEvent(name, params = {}) {
  try { window.gtag?.('event', name, params); } catch (e) {}
  try { window.umami?.track(name, params); } catch (e) {}
}

// ── useIsMobile hook — stable, no re-render on resize to avoid killing YT iframe ──
function useIsMobile() {
  // Read once at mount time only — resize doesn't matter for our use case
  // and re-renders caused by resize would remount the YT iframe killing autoplay
  const [isMobile] = useState(() => {
    try { return window.innerWidth <= 768; } catch(e) { return false; }
  });
  return isMobile;
}

// ── Main App ──────────────────────────────────────────────────────────────────
const StudyCafe = () => {
  const isMobile = useIsMobile();

  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [showMobileBanner, setShowMobileBanner] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isStudying, setIsStudying] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicPaused, setIsMusicPaused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSidebar, setShowSidebar] = useState(true);
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
  const [isTimerMinimized, setIsTimerMinimized] = useState(false);
  const [isMenuBarMinimized, setIsMenuBarMinimized] = useState(false);
  // Mobile: drawer for buddy list
  const [showMobileBuddyDrawer, setShowMobileBuddyDrawer] = useState(false);
  const timerRef = useRef(null);

  const sessionStartRef = useRef(Date.now());
  const selectedBuddyRef = useRef(null);

  useEffect(() => { selectedBuddyRef.current = selectedBuddy; }, [selectedBuddy]);

  useEffect(() => {
    sessionStartRef.current = Date.now();
    const getElapsed = () => Math.floor((Date.now() - sessionStartRef.current) / 1000);
    const getPage = () => selectedBuddyRef.current ? 'study_room' : 'landing';
    const getBuddy = () => selectedBuddyRef.current?.name ?? 'none';
    let heartbeatTimeout;
    const scheduleHeartbeat = () => {
      heartbeatTimeout = setTimeout(() => {
        trackEvent('heartbeat', { active_seconds: getElapsed(), page: getPage(), buddy: getBuddy() });
        scheduleHeartbeat();
      }, 30000);
    };
    scheduleHeartbeat();
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        trackEvent('heartbeat', { active_seconds: getElapsed(), page: getPage(), buddy: getBuddy() });
        clearTimeout(heartbeatTimeout);
        scheduleHeartbeat();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    const handleUnload = () => trackEvent('session_duration', { seconds: getElapsed(), page: getPage(), buddy: getBuddy() });
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      clearTimeout(heartbeatTimeout);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  useEffect(() => {
    const reclaim = () => { setTimeout(() => { try { window.focus(); } catch (e) {} }, 50); };
    window.addEventListener('blur', reclaim);
    return () => window.removeEventListener('blur', reclaim);
  }, []);

  useEffect(() => {
    if (!selectedBuddy) return;
    trackEvent('select_buddy', { buddy: selectedBuddy.name, group: selectedBuddy.group });
  }, [selectedBuddy?.id]);

  useEffect(() => {
    if (isRunning) trackEvent('timer_start', { type: isStudying ? 'study' : 'break', buddy: selectedBuddy?.name ?? 'none' });
  }, [isRunning]);

  const cafeItems = [
    { id: 1, name: 'Coffee Steam', emoji: '☕' },
    { id: 2, name: 'Latte Art',    emoji: '🧋' },
    { id: 3, name: 'Croissant',    emoji: '🥐' },
    { id: 4, name: 'Cake Slice',   emoji: '🍰' },
    { id: 5, name: 'Waffle',       emoji: '🧇' },
    { id: 6, name: 'Donut',        emoji: '🍩' },
    { id: 7, name: 'Matcha',       emoji: '🍵' },
    { id: 8, name: 'Cookie',       emoji: '🍪' },
  ];

  const musicOptions = [
    { id: 1, name: 'Blackpink Lo-fi Mix',        icon: '🖤', videoId: 'PjsDDmv25C4?si=v3idYagDZngy3Sb8' },
    { id: 2, name: 'Le Sserafim Rainy Piano Mix', icon: '🌸', videoId: 'I3yNehe_Zwg?si=bSovd5fGI0BDxaCS' },
    { id: 3, name: 'Stray Kids Rainy Lofi',       icon: '🌧️', videoId: 'zqdE_gIoykg?si=P1lMBcUpPErB4RW7' },
    { id: 4, name: 'Jennie SOLO Orchestral',      icon: '🎻', videoId: 'GWR6yukGEI4?si=E0RBzLSXC05Q7n0V' },
    { id: 5, name: 'BTS Rainy Day Piano Mix',     icon: '💜', videoId: 'RdLjg7ZGxuE?si=vjNxrl1k4DQ7ziV6' },
    { id: 6, name: 'IVE Rainy Day Piano Mix',     icon: '🌹', videoId: 'LiT2sIN-Pg8?si=Vl8C_GOyept1A8ms' },
    { id: 7, name: 'Aespa Piano Mix',             icon: '🌙', videoId: '8TF58QbQTFY?si=6nzyxV_e7jzz9cKL' },
    { id: 9, name: 'Red Velvet Lofi Mix',         icon: '🍒', videoId: 'Z6qTC5PY-u4?si=9JxJxBKmZXXG7rgV' },
  ];

  const [selectedMusic, setSelectedMusic] = useState(musicOptions[0]);

  const studyBuddies = [
    { id: 1,  name: 'Rosé',         group: 'BLACKPINK',   videoId: 'oadMhHMubQ4?si=fdyQ5nAQQgIZ2KC2', isPremium: false, image: 'https://media.vogue.co.uk/photos/602503e953a6c957c223e1c2/1:1/w_1079,h_1080,c_limit/65422624_362861021078977_3034176141535337881_n.jpg' },
    { id: 2,  name: 'Jennie',       group: 'BLACKPINK',   videoId: 'Fe8kR3W9VGA?si=lOhkuY6w6hc7vlRl', isPremium: false, image: 'https://cdn-images.dzcdn.net/images/artist/56c65ac9ea451119ddc8c0b02915d103/1900x1900-000000-80-0-0.jpg' },
    { id: 3,  name: 'Lisa',         group: 'BLACKPINK',   videoId: 'tX9rWUJUGbk?si=1cwwtiNJNLHZ6BkT', isPremium: false, image: 'https://cdn.giaoducthoidai.vn/images/b4508baace0d9fe4c8bbd296e259642eeddd55e67f3e3a0e2128ffa2d903782b4e633d640eb7428ab5b72e0feb356db5a8904041fc31274acb4faf5c0a71469e/lisa-3709.jpg' },
    { id: 5,  name: 'Jungkook',     group: 'BTS',         videoId: 'xy_mVVv4Oc0?si=XIcdkXpt9NFM70IL', isPremium: false, image: 'https://media.allure.com/photos/5d51932d40395d0008565c27/1:1/w_1117,h_1117,c_limit/BTS%20Jungkook%20The%20Fact%20Music%20Awards.jpg' },
    { id: 6,  name: 'V (Taehyung)', group: 'BTS',         videoId: 'Xt2wCvkSegU?si=RQO_W8pmXh7KOzb-', isPremium: false, image: 'https://img.wattpad.com/15924e68075c76b1fcd131b7d91bc719d50128ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f356c67706c4c5552394c77436b413d3d2d323936302e313539363230383536306537383138613533393132303132363339332e6a7067?s=fit&w=720&h=720' },
    { id: 7,  name: 'Jimin',        group: 'BTS',         videoId: 'KxE4i8-nYEs?si=C5vcXDoBao4Ubwmr', isPremium: false, image: 'https://i0.wp.com/zaloramalaysiablog.wpcomstaging.com/wp-content/uploads/2025/10/JIMIN-FEATURE.jpeg?resize=736%2C768&ssl=1' },
    { id: 12, name: 'Wonyoung',     group: 'IVE',         videoId: 'ZZaA0c-PsXc?si=EZJuOje8auDVqNQT', isPremium: false, image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Jang_Won-young_of_Ive%2C_April_16%2C_2025.png' },
    { id: 15, name: 'Chaewon',      group: 'LE SSERAFIM', videoId: '3one8kjAAQI?si=Lx74Rk6W62Mk1YWv', isPremium: false, image: 'https://cdn-images.dzcdn.net/images/artist/e6f96dce8a3460c7e8f4e1ae8fe6b6a3/1900x1900-000000-80-0-0.jpg' },
    { id: 17, name: 'Kazuha',       group: 'LE SSERAFIM', videoId: 'KznmfOQrK_E?si=I-mvB2p7JTPKhA8m', isPremium: false, image: 'https://image.koreaboo.com/2025/11/le-sserafim-kazuha-is-selected-as-the-new-model-for-french-v0-3i7ttzuwwxqc1-519x640.jpg' },
    { id: 18, name: 'Karina',       group: 'aespa',       videoId: 'r6OQFloCDZw?si=ajwYkdn7wDS7p1nR', isPremium: false, image: 'https://i.pinimg.com/564x/76/b6/12/76b612ff257c2caadc1090e633646cbe.jpg' },
    { id: 22, name: 'Minji',        group: 'NewJeans',    videoId: 'LhIivrX4gKk?si=VX33cAITX0kpqKE_', isPremium: false, image: 'https://i.redd.it/newjeans-minji-harpers-bazaar-korea-october-2023-issue-v0-0iwgev6ow3pb1.jpg?width=2048&format=pjpg&auto=webp&s=8473457a93c0c0cb7123d6766795089cdcfd957c' },
    { id: 24, name: 'Seulgi',       group: 'Red Velvet',  videoId: 'UZOnLTTiZKY?si=yeswGn2PlAAqNpgf', isPremium: false, image: 'https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/images/methode/2019/02/08/35c9b9ee-2b4c-11e9-8864-9e8ab15a22ca_image_hires_125930.JPG?itok=JnlideOe&v=1549601969' },
    { id: 27, name: 'Bang Chan',    group: 'Stray Kids',  videoId: 'ANuQjiEMMcU?si=85lRUokCKtNzHBJm', isPremium: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/190106_Stray_Kids_%E6%96%B9%E7%87%A6.png/250px-190106_Stray_Kids_%E6%96%B9%E7%87%A6.png' },
    { id: 28, name: 'Felix',        group: 'Stray Kids',  videoId: 'EYpwvrJlV-s?si=3BQrSp7AtwvOucAI', isPremium: false, image: 'https://external-preview.redd.it/stray-kids-felix-becomes-the-new-face-of-gong-cha-v0-Y1dU4kACbSQRpJAnGX4dI9qrjrRZMif9kS9VM06lbSw.jpg?width=640&crop=smart&auto=webp&s=e28a6c99ae4995b2fca6fbdba49386fbebcabc1f' },
    { id: 29, name: 'Hyunjin',      group: 'Stray Kids',  videoId: 'QFfZlBdAhgs?si=dYxdJAq3oc4V6R4J', isPremium: false, image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Hyunjin_of_Stray_Kids%2C_September_24%2C_2025.png' },
    { id: 32, name: 'Yunah',        group: 'ILLIT',       videoId: 'Kz5ie0SAPJM?si=VfoZlZkZ1t2Blwoc', isPremium: false, image: 'https://www.billboard.com/wp-content/uploads/2024/06/ILLIT-Rookie-Spotlight-YUNAH-billboard-1240.jpg?w=800' },
    { id: 33, name: 'Wonhee',       group: 'ILLIT',       videoId: 'gY5nbjT8ZYU?si=jWYNzxoQb0eYuhmb', isPremium: false, image: 'https://yt3.googleusercontent.com/XKcAXSDCdTjZbK1L-kXT0v61K-tw6xwzPn9aMmPUdbmMW8mMygmkJswoXdlMJU7DNm_oifQ8mw=s900-c-k-c0x00ffffff-no-rj' },
    { id: 34, name: 'Chuu',         group: 'LOONA',       videoId: 'bDQRKF4jTuQ?si=YZe4cd0s_7EZShDc', isPremium: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/20251002_Chuu_%EC%B8%84_03.jpg/250px-20251002_Chuu_%EC%B8%84_03.jpg' },
    { id: 35, name: 'Yuna',         group: 'ITZY',        videoId: 'iLzKAgu_5g4?si=9mjs1w33ymMcjfS_', isPremium: false, image: 'https://pbs.twimg.com/media/E6OrSSsWYAE-Naw.jpg' },
    { id: 36, name: 'Key',          group: 'SHINEE',      videoId: 'lMqr_YXI9IM?si=jH8UmTxaTCakVUiP', isPremium: false, image: 'https://nolae.eu/cdn/shop/articles/key-shinee-profil-731664.jpg?v=1723729868&width=1200' },
    { id: 37, name: 'Dahyun',       group: 'TWICE',       videoId: '47ocn-7vw-E?si=Xkf8ccNzCBwcJ1p4', isPremium: false, image: 'https://i.pinimg.com/736x/44/1f/22/441f225db0f809e10a0b9abfda93cca5.jpg' },
  ];

  const groups = ['All', 'BLACKPINK', 'BTS', 'IVE', 'LE SSERAFIM', 'aespa', 'NewJeans', 'Stray Kids', 'ILLIT', 'Red Velvet', 'LOONA', 'ITZY', 'TWICE', 'SHINEE'];

  const showToast = (message, emoji, subtext) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ visible: true, message, emoji, subtext });
    toastTimeoutRef.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3800);
  };

  const fireBrowserNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') new Notification(title, { body, icon: '☕' });
  };

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
  }, []);

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
              trackEvent('timer_complete', { type: 'study', duration_minutes: 25, buddy: selectedBuddy?.name ?? 'none', group: selectedBuddy?.group ?? 'none', music: selectedMusic?.name ?? 'none' });
              fireBrowserNotification('Study Session Complete! 🎉', 'Great job! Time for a café break ☕');
              setTimerDoneNotif({ visible: true, wasStudying: true });
              setTimerMinutes(5); setTimerSeconds(0); setIsStudying(false);
            } else {
              trackEvent('timer_complete', { type: 'break', duration_minutes: 5, buddy: selectedBuddy?.name ?? 'none', group: selectedBuddy?.group ?? 'none', music: selectedMusic?.name ?? 'none' });
              fireBrowserNotification("Break Time Over!", "Ready to study again? Let's go! 📚");
              setTimerDoneNotif({ visible: true, wasStudying: false });
              setTimerMinutes(25); setTimerSeconds(0); setIsStudying(true);
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
  }, [isRunning, timerMinutes, timerSeconds, isStudying]);

  const handleTimerNotifDismiss = () => {
    setTimerDoneNotif({ visible: false, wasStudying: true });
    setIsMusicPaused(false);
  };

  // Drag (desktop only)
  const handleMouseDown = (e) => {
    if (isMobile) return;
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

  // ── LANDING PAGE ──────────────────────────────────────────────────────────────
  if (!selectedBuddy) {
    return (
      <>
        <style>{fontStyle}</style>

        {/* ── Mobile "coming soon" banner ── */}
        {showMobileBanner && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }} onClick={() => setShowMobileBanner(false)}>
            <div onClick={e => e.stopPropagation()} style={{
              background: 'linear-gradient(135deg, #FFF5F7, #F5F3FF)',
              border: '3px solid #FFB6D9', borderRadius: '32px',
              padding: '40px 32px', textAlign: 'center',
              boxShadow: '0 32px 80px rgba(255,107,157,0.4)',
              maxWidth: '340px', width: '100%',
            }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>💻</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '24px',
                background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                marginBottom: '12px', lineHeight: 1.2,
              }}>
                Mobile coming soon! 🌸
              </h2>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
                fontSize: '17px', color: '#9B7EDB', fontWeight: 300,
                lineHeight: 1.6, marginBottom: '28px',
              }}>
                We're working on the mobile experience ✨<br />
                For now, visit on a <strong style={{ fontStyle: 'normal', color: '#FF6B9D' }}>laptop or Mac</strong> for the full café vibe ☕
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '28px' }}>
                {['💖','✨','☕','🎵','💜'].map((e, i) => (
                  <span key={i} style={{ fontSize: '20px' }}>{e}</span>
                ))}
              </div>
              <button
                onClick={() => setShowMobileBanner(false)}
                style={{
                  background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
                  color: 'white', border: 'none', borderRadius: '999px',
                  padding: '14px 36px', fontSize: '16px', fontWeight: 900,
                  fontFamily: "'Playfair Display', serif",
                  cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,107,157,0.4)',
                  width: '100%',
                }}
              >
                Got it! 💕
              </button>
            </div>
          </div>
        )}

        <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ background: 'linear-gradient(135deg, #FFF5F7 0%, #FFF9FB 25%, #F5F3FF 50%, #FFF0F5 75%, #FFF5F7 100%)' }}>
          {/* Decorative elements — hidden on mobile to avoid clutter */}
          {!isMobile && <>
            <div className="absolute top-20 left-12 text-4xl opacity-40 animate-bounce" style={{ animationDuration: '3s' }}>☕</div>
            <div className="absolute top-40 right-24 text-4xl opacity-30 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>🥐</div>
            <Heart className="absolute top-32 right-40 w-8 h-8 text-pink-300 opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-32 left-24 text-4xl opacity-40 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>🧋</div>
            <div className="absolute bottom-20 right-32 text-4xl opacity-30 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>🍰</div>
            <Sparkles className="absolute top-1/4 right-1/4 w-8 h-8 text-purple-300 opacity-40 animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-80 right-40 text-4xl opacity-25 animate-bounce" style={{ animationDelay: '0.7s', animationDuration: '4.1s' }}>💖</div>
            <Star className="absolute top-1/3 left-1/4 w-8 h-8 text-yellow-300 opacity-40 animate-pulse" style={{ animationDelay: '0.8s' }} />
            <div className="absolute bottom-40 right-20 text-4xl opacity-30 animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '3.7s' }}>🎀</div>
            <Heart className="absolute top-60 left-40 w-6 h-6 text-rose-300 opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />
          </>}

          <div className="flex-1 w-full" style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '16px' : '24px 32px' }}>
            {/* ── NAVBAR ── */}
            <div className="nav-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isMobile ? '20px' : '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative' }}>
                  <Coffee style={{ width: isMobile ? 22 : 32, height: isMobile ? 22 : 32, color: '#FF6B9D' }} />
                  <Sparkles style={{ width: isMobile ? 10 : 16, height: isMobile ? 10 : 16, color: '#C86DD7', position: 'absolute', top: '-4px', right: '-4px' }} className="animate-pulse" />
                </div>
                <div>
                  <h1 className="nav-brand" style={{ fontSize: isMobile ? '18px' : '22px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>IdoréStudy ♡</h1>
                  {!isMobile && <p style={{ fontSize: '10px', letterSpacing: '0.15em', fontWeight: 700, color: '#FF9DBD' }}>STUDY WITH YOUR BIAS</p>}
                </div>
              </div>

              <a
                href="https://www.tiktok.com/@idore.collections"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px',
                  padding: isMobile ? '8px 14px' : '10px 20px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)',
                  color: 'white', textDecoration: 'none',
                  fontFamily: "'Playfair Display', serif", fontWeight: 900,
                  fontSize: isMobile ? '12px' : '14px',
                  boxShadow: '0 4px 20px rgba(255,107,157,0.4)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <TikTokIcon size={isMobile ? 14 : 18} color="white" />
                {isMobile ? '@idore' : '@idore.collections'}
              </a>
            </div>

            {/* ── HERO ── */}
            <div style={{ textAlign: 'center', marginBottom: isMobile ? '20px' : '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
                <Heart style={{ width: isMobile ? 20 : 28, height: isMobile ? 20 : 28, color: '#FF6B9D' }} className="animate-pulse" />
                <Star style={{ width: isMobile ? 20 : 28, height: isMobile ? 20 : 28, color: '#FBBF24' }} className="animate-pulse" />
                <Sparkles style={{ width: isMobile ? 20 : 28, height: isMobile ? 20 : 28, color: '#C86DD7' }} className="animate-pulse" />
              </div>
              <h2 className="hero-title hero-title-text" style={{
                fontSize: isMobile ? '1.9rem' : '3.75rem',
                marginBottom: '12px',
                background: 'linear-gradient(135deg, #FF6B9D, #C86DD7, #818CF8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
              }}>
                Who are you studying with today? 💖
              </h2>
              <p className="hero-subtitle hero-subtitle-text" style={{ fontSize: isMobile ? '1rem' : '1.5rem', color: '#9CA3AF' }}>
                Pick your bias, grab a latte, and let's ace this together ☕✨
              </p>
            </div>

            {/* ── SEARCH ── */}
            <div style={{ maxWidth: '560px', margin: '0 auto', marginBottom: isMobile ? '16px' : '28px', padding: '0 4px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search your fave idol... 🔍"
                  className="search-bar"
                  style={{
                    width: '100%', padding: isMobile ? '12px 18px' : '16px 24px',
                    borderRadius: '999px', border: '2px solid #FFD7E5',
                    outline: 'none', boxShadow: '0 4px 20px rgba(255,107,157,0.12)',
                    background: 'white', fontSize: '14px', boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
                <Heart style={{ width: 20, height: 20, color: '#FFB6D9', position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* ── GROUP FILTER ── */}
            <div className="filter-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? '6px' : '10px', marginBottom: isMobile ? '16px' : '40px', flexWrap: 'wrap', padding: '0 4px' }}>
              {groups.map(group => (
                <button
                  key={group}
                  onClick={() => setSelectedCategory(group)}
                  className="group-filter-btn"
                  style={{
                    padding: isMobile ? '7px 12px' : '10px 20px',
                    borderRadius: '999px', fontWeight: 700, fontSize: isMobile ? '11px' : '13px',
                    border: selectedCategory === group ? 'none' : '2px solid #FFE0EC',
                    background: selectedCategory === group
                      ? 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)'
                      : 'white',
                    color: selectedCategory === group ? 'white' : '#555',
                    cursor: 'pointer',
                    boxShadow: selectedCategory === group ? '0 4px 16px rgba(255,107,157,0.4)' : '0 2px 8px rgba(255,107,157,0.1)',
                    transition: 'all 0.2s',
                    transform: selectedCategory === group ? 'scale(1.08)' : 'scale(1)',
                  }}
                >
                  {group === 'All' ? '✨ All' : group}
                </button>
              ))}
            </div>

            {/* ── BUDDY GRID ── */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: isMobile ? '12px' : '20px' }}>
                <Users style={{ width: 20, height: 20, color: '#FF6B9D' }} />
                <h3 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 900, background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Choose Your Study Partner
                </h3>
                <Heart style={{ width: 18, height: 18, color: '#FF9DBD' }} className="animate-pulse" />
              </div>

              <div className="buddy-grid" style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                gap: isMobile ? '12px' : '20px',
              }}>
                {filteredBuddies.map(b => (
                  <div
                    key={b.id}
                    onClick={() => isMobile ? setShowMobileBanner(true) : setSelectedBuddy(b)}
                    style={{
                      background: 'white', borderRadius: isMobile ? '16px' : '24px',
                      overflow: 'hidden', boxShadow: '0 4px 20px rgba(255,107,157,0.15)',
                      border: '2px solid #FFE0EC', cursor: 'pointer',
                      transition: 'all 0.25s', position: 'relative',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(255,107,157,0.3)'; e.currentTarget.style.borderColor = '#FFB6D9'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,107,157,0.15)'; e.currentTarget.style.borderColor = '#FFE0EC'; }}
                  >
                    {b.isPremium && (
                      <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10, padding: '4px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: 900, background: 'linear-gradient(135deg, #FFD700, #FFA500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Crown style={{ width: 10, height: 10, color: 'white' }} /><span style={{ color: 'white' }}>PREMIUM</span>
                      </div>
                    )}
                    <img
                      src={b.image} alt={b.name}
                      className="buddy-card-img"
                      style={{ width: '100%', height: isMobile ? '130px' : '200px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ padding: isMobile ? '10px' : '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <p style={{ fontWeight: 900, fontSize: isMobile ? '13px' : '16px', color: '#333', marginBottom: '2px' }}>{b.name}</p>
                          <p style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: 700, background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{b.group}</p>
                        </div>
                        <Heart style={{ width: isMobile ? 14 : 18, height: isMobile ? 14 : 18, color: '#FFB6D9', flexShrink: 0 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <footer style={{
            width: '100%',
            background: 'linear-gradient(135deg, rgba(255,107,157,0.08), rgba(200,109,215,0.08))',
            borderTop: '2px solid #FFD7E5',
            padding: isMobile ? '20px 20px' : '28px 48px',
            marginTop: '48px',
          }}>
            <div className="footer-inner" style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
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
                  {['☕','💖','📚','✨','🎵'].map((e, i) => (
                    <span key={i} style={{ fontSize: '14px', opacity: 0.6 }}>{e}</span>
                  ))}
                </div>
              </div>
              <div>
                <a
                  href="mailto:idore.collections@gmail.com"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#C4A8D4', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#FF6B9D'}
                  onMouseLeave={e => e.target.style.color = '#C4A8D4'}
                >
                  Contact
                </a>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', color: '#D4B8E0', fontStyle: 'italic' }}>
                © {new Date().getFullYear()} IdoréStudy · Made with 💖 for students everywhere
              </p>
            </div>
          </footer>
        </div>
      </>
    );
  }

  // ── STUDY ROOM ────────────────────────────────────────────────────────────────
  // On mobile: no sidebar. Instead, a top-center badge + a small "change buddy" button.
  // Timer is top-right (fixed position). Bottom bar is horizontal scrollable or compact.

  const timerTopPos = isMobile ? '80px' : (timerPosition.y === 0 ? '24px' : `${timerPosition.y}px`);
  const timerRightPos = isMobile ? '12px' : (timerPosition.x === 0 ? '24px' : 'auto');
  const timerLeftPos = isMobile ? 'auto' : (timerPosition.x !== 0 ? `${timerPosition.x}px` : 'auto');

  return (
    <>
      <style>{fontStyle}</style>
      <div className="min-h-screen flex relative overflow-hidden" style={{ backgroundColor: '#2D2D3D' }}>

        <CafeToast visible={toast.visible} message={toast.message} emoji={toast.emoji} subtext={toast.subtext} />
        <TimerDoneNotif visible={timerDoneNotif.visible} wasStudying={timerDoneNotif.wasStudying} onDismiss={handleTimerNotifDismiss} />
        <TimerSound shouldPlay={playTimerSound} onDone={() => setPlayTimerSound(false)} />

        {/* ── Desktop Sidebar ── */}
        {!isMobile && (
          <div className={`transition-all duration-300 ${showSidebar ? 'w-80' : 'w-0'} flex-shrink-0 overflow-hidden sidebar-desktop`}
            style={{ background: 'linear-gradient(180deg, #FFF5F7 0%, #F5F3FF 50%, #FFF0F5 100%)', borderRight: '4px solid #FFB6D9' }}>
            <div className="h-screen overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6 sticky top-0 bg-gradient-to-b from-pink-50 to-transparent pb-4 z-10">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Heart style={{ width: 24, height: 24, color: '#FF6B9D' }} className="animate-pulse" />
                  <h2 className="nav-brand" style={{ fontSize: '20px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>IdoreStudy</h2>
                  <Sparkles style={{ width: 20, height: 20, color: '#C86DD7' }} />
                </div>
                <button onClick={() => setShowSidebar(false)} className="p-2 rounded-full hover:bg-pink-100 transition transform hover:scale-110">
                  <ChevronLeft style={{ width: 20, height: 20, color: '#FF6B9D' }} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '96px' }}>
                {studyBuddies.map(buddy => (
                  <button key={buddy.id} onClick={() => setSelectedBuddy(buddy)}
                    style={{
                      width: '100%', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
                      background: 'white',
                      border: selectedBuddy.id === buddy.id ? '3px solid #FF6B9D' : '2px solid #FFD7E5',
                      boxShadow: selectedBuddy.id === buddy.id ? '0 8px 24px rgba(255,107,157,0.3)' : '0 2px 12px rgba(255,107,157,0.1)',
                      transform: selectedBuddy.id === buddy.id ? 'scale(1.03)' : 'scale(1)',
                      transition: 'all 0.2s',
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px' }}>
                      <div style={{ position: 'relative' }}>
                        <img src={buddy.image} alt={buddy.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '12px' }} />
                        {selectedBuddy.id === buddy.id && (
                          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', borderRadius: '50%', padding: '4px' }}>
                            <Heart style={{ width: 10, height: 10, color: 'white', fill: 'white' }} />
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: 'left', flex: 1 }}>
                        <p style={{ fontWeight: 900, fontSize: '14px', color: '#333', marginBottom: '2px' }}>{buddy.name}</p>
                        <p style={{ fontSize: '11px', fontWeight: 700, background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{buddy.group}</p>
                      </div>
                      {selectedBuddy.id === buddy.id && <Sparkles style={{ width: 16, height: 16, color: '#FF6B9D' }} className="animate-pulse" />}
                    </div>
                  </button>
                ))}
              </div>
              <div style={{ position: 'sticky', bottom: 0, background: 'linear-gradient(to top, #FFF5F7, transparent)', paddingTop: '16px' }}>
                <button onClick={() => setSelectedBuddy(null)}
                  style={{ width: '100%', padding: '16px', borderRadius: '16px', fontWeight: 900, color: 'white', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,107,157,0.4)', transition: 'transform 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Coffee style={{ width: 20, height: 20 }} />Back to Café<Heart style={{ width: 16, height: 16 }} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {!isMobile && !showSidebar && (
          <button onClick={() => setShowSidebar(true)}
            style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 50, padding: '16px', borderRadius: '16px', background: 'linear-gradient(135deg, #FFD1DC, #E6A8D7)', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,107,157,0.35)', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ChevronRight style={{ width: 24, height: 24, color: 'white' }} />
          </button>
        )}

        {/* Main Content */}
        <div className="flex-1 relative h-screen overflow-hidden" style={{ minHeight: '100vh' }}>

          {activeCafeItems.map((itemId, index) => {
            const item = cafeItems.find(i => i.id === itemId);
            const positions = [
              { top: '15%', left: '10%' }, { top: '25%', right: '15%' },
              { bottom: '30%', left: '20%' }, { bottom: '25%', right: '25%' },
              { top: '40%', left: '15%' }, { top: '50%', right: '20%' },
              { bottom: '45%', left: '12%' }, { top: '35%', right: '12%' },
            ];
            return (
              <div key={itemId} style={{
                position: 'absolute', zIndex: 20, fontSize: isMobile ? '40px' : '60px', opacity: 0.4, pointerEvents: 'none',
                animation: `bounce ${3 + index * 0.5}s infinite`, animationDelay: `${index * 0.3}s`,
                ...positions[index % positions.length],
              }}>
                {item?.emoji}
              </div>
            );
          })}

          <YTBackground key={selectedBuddy.id} videoId={selectedBuddy.videoId} />

          {selectedMusic && selectedMusic.videoId && (
            <AudioPlayer videoId={selectedMusic.videoId} isMuted={isMuted} isPaused={isMusicPaused} />
          )}

          {/* ── Top Bar: Studying With badge ── */}
          {/* DESKTOP: top-left corner (original position). MOBILE: centered between Back/Switch buttons */}
          {!isMobile && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20, padding: '24px', pointerEvents: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <div style={{
                  backdropFilter: 'blur(20px)', padding: '16px 32px',
                  borderRadius: '24px', boxShadow: '0 8px 32px rgba(255,107,157,0.4)',
                  background: 'linear-gradient(135deg, rgba(255,107,157,0.92), rgba(200,109,215,0.92))',
                  border: '2px solid rgba(255,255,255,0.3)',
                  pointerEvents: 'auto',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <Heart style={{ width: 20, height: 20, color: 'white', fill: 'white' }} className="animate-pulse" />
                    <p style={{ fontSize: '12px', letterSpacing: '0.15em', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>STUDYING WITH</p>
                    <Sparkles style={{ width: 16, height: 16, color: '#FFD700' }} />
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '22px', color: 'white', textAlign: 'center' }}>
                    {selectedBuddy.name}
                  </p>
                  <p style={{ fontSize: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginTop: '2px' }}>
                    {selectedBuddy.group}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* MOBILE: centered badge with back/switch buttons */}
          {isMobile && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20, padding: '12px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <button
                  onClick={() => setSelectedBuddy(null)}
                  style={{
                    background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)',
                    border: '2px solid rgba(255,255,255,0.35)', borderRadius: '14px',
                    padding: '8px 12px', color: 'white', fontWeight: 900, fontSize: '12px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  <ChevronLeft style={{ width: 14, height: 14 }} />
                  Café
                </button>

                <div style={{
                  backdropFilter: 'blur(20px)', padding: '10px 18px',
                  borderRadius: '24px', boxShadow: '0 8px 32px rgba(255,107,157,0.4)',
                  background: 'linear-gradient(135deg, rgba(255,107,157,0.92), rgba(200,109,215,0.92))',
                  border: '2px solid rgba(255,255,255,0.3)',
                  flex: 1, textAlign: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '2px' }}>
                    <Heart style={{ width: 12, height: 12, color: 'white', fill: 'white' }} className="animate-pulse" />
                    <p style={{ fontSize: '10px', letterSpacing: '0.15em', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>STUDYING WITH</p>
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '16px', color: 'white' }}>
                    {selectedBuddy.name}
                  </p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginTop: '2px' }}>
                    {selectedBuddy.group}
                  </p>
                </div>

                <button
                  onClick={() => setShowMobileBuddyDrawer(true)}
                  style={{
                    background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)',
                    border: '2px solid rgba(255,255,255,0.35)', borderRadius: '14px',
                    padding: '8px 12px', color: 'white', fontWeight: 900, fontSize: '12px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  <Users style={{ width: 14, height: 14 }} />
                  Switch
                </button>
              </div>
            </div>
          )}

          {/* ── Draggable/Fixed Timer ── */}
          <div
            ref={timerRef}
            style={{
              position: 'absolute', zIndex: 30,
              cursor: isMobile ? 'default' : 'move',
              top: timerTopPos,
              right: timerRightPos,
              left: timerLeftPos,
            }}
            onMouseDown={handleMouseDown}
          >
            {isTimerMinimized ? (
              <div style={{
                borderRadius: '16px', padding: isMobile ? '10px 14px' : '16px',
                border: '3px solid #FFD7E5', backdropFilter: 'blur(16px)',
                background: 'linear-gradient(135deg, rgba(255,245,247,0.95), rgba(245,243,255,0.95))',
                boxShadow: '0 8px 32px rgba(255,107,157,0.25)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: isMobile ? '18px' : '22px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: '#FF6B9D' }}>
                    {formatTime(timerMinutes, timerSeconds)}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setIsRunning(r => !r); }}
                    style={{ background: '#FFE5F1', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer', lineHeight: 0 }}>
                    {isRunning ? <Pause style={{ width: 16, height: 16, color: '#FF6B9D' }} /> : <Play style={{ width: 16, height: 16, color: '#FF6B9D' }} />}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setIsTimerMinimized(false); }}
                    style={{ background: '#F0EBFF', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer', lineHeight: 0 }}>
                    <Maximize2 style={{ width: 16, height: 16, color: '#C86DD7' }} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="timer-full-mobile" style={{
                borderRadius: '24px', padding: '20px', width: isMobile ? '220px' : '288px',
                border: '3px solid #FFD7E5',
                background: 'linear-gradient(135deg, #FFF5F7 0%, #F5F3FF 100%)',
                boxShadow: '0 16px 56px rgba(255,107,157,0.3)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '10px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Clock style={{ width: 16, height: 16, color: 'white' }} />
                    </div>
                    <span style={{ fontWeight: 900, fontSize: '12px', color: '#333', letterSpacing: '0.05em' }}>FOCUS TIME</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={(e) => { e.stopPropagation(); setIsTimerMinimized(true); }}
                      style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', borderRadius: '8px', lineHeight: 0 }}>
                      <Minimize2 style={{ width: 14, height: 14, color: '#666' }} />
                    </button>
                    <button style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', borderRadius: '8px', lineHeight: 0 }}>
                      <Settings style={{ width: 14, height: 14, color: '#666' }} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: isMobile ? '12px' : '20px' }}>
                  <button onClick={(e) => { e.stopPropagation(); setIsStudying(true); setTimerMinutes(25); setTimerSeconds(0); setIsRunning(false); }}
                    style={{ flex: 1, padding: isMobile ? '8px' : '10px', borderRadius: '14px', fontWeight: 700, fontSize: '12px', border: 'none', cursor: 'pointer', background: isStudying ? 'linear-gradient(135deg, #FF6B9D, #C86DD7)' : '#FFE5F1', color: isStudying ? 'white' : '#9CA3AF', boxShadow: isStudying ? '0 4px 16px rgba(255,107,157,0.4)' : 'none', transition: 'all 0.2s' }}>
                    📚 Study
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setIsStudying(false); setTimerMinutes(5); setTimerSeconds(0); setIsRunning(false); }}
                    style={{ flex: 1, padding: isMobile ? '8px' : '10px', borderRadius: '14px', fontWeight: 700, fontSize: '12px', border: 'none', cursor: 'pointer', background: !isStudying ? 'linear-gradient(135deg, #FF6B9D, #C86DD7)' : '#FFE5F1', color: !isStudying ? 'white' : '#9CA3AF', boxShadow: !isStudying ? '0 4px 16px rgba(255,107,157,0.4)' : 'none', transition: 'all 0.2s' }}>
                    ☕ Break
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? '12px' : '20px' }}>
                  <div style={{ position: 'relative', width: isMobile ? '120px' : '160px', height: isMobile ? '120px' : '160px' }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,209,220,0.5), rgba(230,168,215,0.5))', animation: 'pulse 3s infinite' }} />
                    <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)', position: 'relative', zIndex: 1 }}>
                      <circle cx={isMobile ? 60 : 80} cy={isMobile ? 60 : 80} r={isMobile ? 52 : 72} stroke="#FFD1DC" strokeWidth="7" fill="none" />
                      <circle cx={isMobile ? 60 : 80} cy={isMobile ? 60 : 80} r={isMobile ? 52 : 72} stroke="url(#tg)" strokeWidth="7" fill="none"
                        strokeDasharray={`${2 * Math.PI * (isMobile ? 52 : 72)}`}
                        strokeDashoffset={`${2 * Math.PI * (isMobile ? 52 : 72) * (1 - ((isStudying ? 25 : 5) * 60 - (timerMinutes * 60 + timerSeconds)) / ((isStudying ? 25 : 5) * 60))}`}
                        strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.3s' }} />
                      <defs>
                        <linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FF6B9D" />
                          <stop offset="50%" stopColor="#C86DD7" />
                          <stop offset="100%" stopColor="#9B7EDB" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: isMobile ? '28px' : '36px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: '#FF6B9D' }}>
                        {formatTime(timerMinutes, timerSeconds)}
                      </div>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                        {[0,0.2,0.4].map((d, i) => (
                          <Heart key={i} style={{ width: 8, height: 8, color: i % 2 === 0 ? '#FF6B9D' : '#C86DD7', animationDelay: `${d}s` }} className="animate-pulse" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button onClick={(e) => { e.stopPropagation(); setTimerMinutes(isStudying ? 25 : 5); setTimerSeconds(0); setIsRunning(false); }}
                    style={{ background: '#FFE5F1', border: 'none', borderRadius: '12px', padding: isMobile ? '10px' : '12px', cursor: 'pointer', lineHeight: 0 }}>
                    <RotateCcw style={{ width: isMobile ? 16 : 18, height: isMobile ? 16 : 18, color: '#FF6B9D' }} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setIsRunning(r => !r); }}
                    style={{ background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', border: 'none', borderRadius: '12px', padding: isMobile ? '14px 24px' : '18px 32px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,107,157,0.45)', lineHeight: 0, transition: 'transform 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {isRunning ? <Pause style={{ width: isMobile ? 18 : 22, height: isMobile ? 18 : 22, color: 'white', fill: 'white' }} /> : <Play style={{ width: isMobile ? 18 : 22, height: isMobile ? 18 : 22, color: 'white', fill: 'white' }} />}
                  </button>
                </div>

                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Sparkles style={{ width: 12, height: 12, color: '#C86DD7' }} />You got this!<Heart style={{ width: 12, height: 12, color: '#FF6B9D' }} />
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── To-Do Widget ── */}
          <TodoWidget isMobile={isMobile} />

          {/* ── Bottom Menu Bar ── */}
          <div style={{
            position: 'absolute',
            bottom: isMobile ? '12px' : '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            width: isMobile ? 'calc(100vw - 24px)' : 'auto',
            maxWidth: isMobile ? '480px' : 'none',
          }}>
            {/* Music dropdown */}
            {!isMenuBarMinimized && showMusicMenu && (
              <div className="music-dropdown-mobile" style={{
                marginBottom: '12px', borderRadius: '24px', padding: '16px',
                background: 'linear-gradient(135deg, rgba(255,245,247,0.98), rgba(245,243,255,0.98))',
                border: '3px solid rgba(255,107,157,0.3)',
                boxShadow: '0 16px 48px rgba(255,107,157,0.3)',
                backdropFilter: 'blur(20px)',
                minWidth: isMobile ? 'unset' : '280px',
                width: isMobile ? '100%' : undefined,
                boxSizing: 'border-box',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Music style={{ width: 16, height: 16, color: '#FF6B9D' }} />
                  <h3 style={{ fontWeight: 900, fontSize: '14px', color: '#333' }}>Music Vibes 🎵</h3>
                </div>
                <div className="music-scroll" style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '4px' }}>
                  {musicOptions.map(music => (
                    <button key={music.id} onClick={() => {
                      setSelectedMusic(music);
                      trackEvent('music_changed', { track: music.name, buddy: selectedBuddy?.name ?? 'none' });
                    }}
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: '12px',
                        border: 'none', cursor: 'pointer', textAlign: 'left',
                        background: selectedMusic.id === music.id ? 'linear-gradient(135deg, #FF6B9D, #C86DD7)' : 'white',
                        boxShadow: selectedMusic.id === music.id ? '0 4px 16px rgba(255,107,157,0.4)' : 'none',
                        transition: 'all 0.15s',
                      }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '18px' }}>{music.icon}</span>
                        <span style={{ fontWeight: 700, fontSize: '12px', color: selectedMusic.id === music.id ? 'white' : '#333' }}>{music.name}</span>
                        {selectedMusic.id === music.id && <Heart style={{ width: 12, height: 12, color: 'white', fill: 'white', marginLeft: 'auto' }} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Café dropdown */}
            {!isMenuBarMinimized && showCafeMenu && (
              <div className="cafe-dropdown-mobile" style={{
                marginBottom: '12px', borderRadius: '24px', padding: '20px',
                background: 'linear-gradient(135deg, rgba(255,248,230,0.98), rgba(255,243,220,0.98))',
                border: '3px solid rgba(255,165,0,0.25)',
                boxShadow: '0 16px 48px rgba(255,165,0,0.2)',
                backdropFilter: 'blur(20px)',
                width: isMobile ? '100%' : '300px',
                boxSizing: 'border-box',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Coffee style={{ width: 18, height: 18, color: '#F97316' }} />
                  <h3 style={{ fontWeight: 900, color: '#333', fontSize: '15px' }}>Café Vibes ☕</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {cafeItems.map(item => (
                    <button key={item.id} onClick={() => toggleCafeItem(item.id)}
                      style={{
                        padding: '10px 6px', borderRadius: '14px', border: 'none', cursor: 'pointer',
                        background: activeCafeItems.includes(item.id) ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'white',
                        boxShadow: activeCafeItems.includes(item.id) ? '0 4px 12px rgba(255,165,0,0.4)' : 'none',
                        transition: 'all 0.15s',
                      }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', marginBottom: '4px' }}>{item.emoji}</div>
                        <div style={{ fontSize: '9px', fontWeight: 700, color: activeCafeItems.includes(item.id) ? 'white' : '#555' }}>{item.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main bar */}
            {isMenuBarMinimized ? (
              <div
                className="menu-bar-slide-in"
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 20px', borderRadius: '999px',
                  background: 'linear-gradient(135deg, rgba(255,107,157,0.95), rgba(200,109,215,0.95))',
                  border: '2px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 8px 32px rgba(255,107,157,0.4)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <Music style={{ width: 16, height: 16, color: 'white', opacity: 0.8 }} />
                <span style={{ color: 'white', fontWeight: 700, fontSize: '13px', opacity: 0.9, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: isMobile ? '140px' : '200px' }}>
                  {selectedMusic.icon} {selectedMusic.name}
                </span>
                <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.3)' }} />
                <button
                  onClick={() => setIsMenuBarMinimized(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', color: 'white', fontSize: '12px', fontWeight: 700 }}
                >
                  <ChevronUp style={{ width: 16, height: 16 }} />
                  <span>Show</span>
                </button>
              </div>
            ) : (
              <div
                className="bottom-bar-full"
                style={{
                  display: 'flex', alignItems: 'center',
                  gap: isMobile ? '6px' : '16px',
                  padding: isMobile ? '10px 12px' : '20px 36px',
                  borderRadius: isMobile ? '20px' : '999px',
                  background: 'linear-gradient(135deg, rgba(255,107,157,0.95), rgba(200,109,215,0.95))',
                  border: '2px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 12px 48px rgba(255,107,157,0.45)',
                  backdropFilter: 'blur(16px)',
                  width: isMobile ? '100%' : 'auto',
                  boxSizing: 'border-box',
                  justifyContent: isMobile ? 'space-between' : 'flex-start',
                }}
              >
                {/* Mute */}
                <button onClick={() => setIsMuted(m => !m)}
                  style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '999px', padding: isMobile ? '10px' : '12px', cursor: 'pointer', lineHeight: 0, transition: 'background 0.15s', flexShrink: 0 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                  {isMuted
                    ? <VolumeX style={{ width: isMobile ? 18 : 22, height: isMobile ? 18 : 22, color: 'white' }} />
                    : <Volume2 style={{ width: isMobile ? 18 : 22, height: isMobile ? 18 : 22, color: 'white' }} />
                  }
                </button>

                {/* Play/Pause music */}
                <button onClick={() => setIsMusicPaused(p => !p)}
                  style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '999px', padding: isMobile ? '10px' : '12px', cursor: 'pointer', lineHeight: 0, transition: 'background 0.15s', flexShrink: 0 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                  {isMusicPaused
                    ? <Play style={{ width: isMobile ? 18 : 22, height: isMobile ? 18 : 22, color: 'white', fill: 'white' }} />
                    : <Pause style={{ width: isMobile ? 18 : 22, height: isMobile ? 18 : 22, color: 'white', fill: 'white' }} />
                  }
                </button>

                {/* Music selector */}
                <button
                  onClick={() => { setShowMusicMenu(s => !s); setShowCafeMenu(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: isMobile ? '10px 12px' : '12px 20px',
                    borderRadius: '999px', border: 'none', cursor: 'pointer',
                    background: showMusicMenu ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                    transition: 'background 0.15s', flex: isMobile ? 1 : 'none',
                    minWidth: 0,
                  }}
                >
                  <Music style={{ width: isMobile ? 16 : 20, height: isMobile ? 16 : 20, color: 'white', flexShrink: 0 }} />
                  {!isMobile && <span style={{ color: 'white', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap' }}>{selectedMusic.name}</span>}
                  {isMobile && <span style={{ color: 'white', fontWeight: 700, fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedMusic.icon}</span>}
                  <ChevronUp style={{ width: 16, height: 16, color: 'white', transform: showMusicMenu ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                </button>

                {/* Café selector */}
                <button
                  onClick={() => { setShowCafeMenu(s => !s); setShowMusicMenu(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: isMobile ? '10px 12px' : '12px 20px',
                    borderRadius: '999px', border: 'none', cursor: 'pointer',
                    background: showCafeMenu ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                    transition: 'background 0.15s',
                  }}
                >
                  <Coffee style={{ width: isMobile ? 16 : 20, height: isMobile ? 16 : 20, color: 'white', flexShrink: 0 }} />
                  {!isMobile && <span style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>Café Vibes</span>}
                  <ChevronUp style={{ width: 16, height: 16, color: 'white', transform: showCafeMenu ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                </button>

                <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />

                {/* Minimize */}
                <button
                  onClick={() => { setIsMenuBarMinimized(true); setShowMusicMenu(false); setShowCafeMenu(false); }}
                  style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '999px', padding: isMobile ? '10px' : '12px', cursor: 'pointer', lineHeight: 0, transition: 'background 0.15s', flexShrink: 0 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                  <ChevronDown style={{ width: isMobile ? 16 : 20, height: isMobile ? 16 : 20, color: 'white' }} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Mobile Buddy Drawer ── */}
        {isMobile && showMobileBuddyDrawer && (
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowMobileBuddyDrawer(false)}
          >
            <div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(180deg, #FFF5F7, #F5F3FF)',
                borderRadius: '28px 28px 0 0',
                padding: '20px 16px 40px',
                maxHeight: '80vh', overflowY: 'auto',
                border: '3px solid #FFB6D9',
                borderBottom: 'none',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users style={{ width: 20, height: 20, color: '#FF6B9D' }} />
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '18px', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Switch Buddy
                  </span>
                </div>
                <button onClick={() => setShowMobileBuddyDrawer(false)}
                  style={{ background: '#FFE5F1', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer', lineHeight: 0 }}>
                  <X style={{ width: 18, height: 18, color: '#FF6B9D' }} />
                </button>
              </div>

              {/* Group filters */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {groups.map(group => (
                  <button key={group} onClick={() => setSelectedCategory(group)}
                    style={{
                      padding: '6px 12px', borderRadius: '999px', fontWeight: 700, fontSize: '11px', border: 'none', cursor: 'pointer',
                      background: selectedCategory === group ? 'linear-gradient(135deg, #FF6B9D, #C86DD7)' : '#FFE5F1',
                      color: selectedCategory === group ? 'white' : '#666',
                      transition: 'all 0.15s',
                    }}>
                    {group === 'All' ? '✨ All' : group}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {filteredBuddies.map(buddy => (
                  <button key={buddy.id}
                    onClick={() => { setSelectedBuddy(buddy); setShowMobileBuddyDrawer(false); }}
                    style={{
                      borderRadius: '14px', overflow: 'hidden', cursor: 'pointer',
                      background: 'white',
                      border: selectedBuddy.id === buddy.id ? '3px solid #FF6B9D' : '2px solid #FFE0EC',
                      boxShadow: selectedBuddy.id === buddy.id ? '0 4px 16px rgba(255,107,157,0.35)' : '0 2px 8px rgba(255,107,157,0.1)',
                      transition: 'all 0.15s',
                      padding: 0,
                    }}>
                    <img src={buddy.image} alt={buddy.name} style={{ width: '100%', height: '80px', objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '8px 6px' }}>
                      <p style={{ fontWeight: 900, fontSize: '11px', color: '#333', marginBottom: '2px' }}>{buddy.name}</p>
                      <p style={{ fontSize: '9px', fontWeight: 700, background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{buddy.group}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => { setSelectedBuddy(null); setShowMobileBuddyDrawer(false); }}
                style={{ width: '100%', marginTop: '16px', padding: '14px', borderRadius: '16px', fontWeight: 900, color: 'white', background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,107,157,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Coffee style={{ width: 18, height: 18 }} /> Back to Café
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudyCafe;