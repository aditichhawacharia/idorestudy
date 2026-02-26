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

// ── Audio Player — FIX: properly sync mute/unmute via postMessage ─────────────
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

  // Send play/pause command via postMessage
  useEffect(() => {
    if (!loaded || !iframeRef.current) return;
    try {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: isPaused ? 'pauseVideo' : 'playVideo', args: [] }),
        '*'
      );
    } catch (e) {}
  }, [isPaused, loaded]);

  // FIX: Send mute/unmute command via postMessage — fires every time isMuted changes
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

  // FIX: After iframe loads, immediately sync the current mute state
  const handleLoad = () => {
    setLoaded(true);
  };

  // FIX: After loaded state changes to true, sync mute state
  useEffect(() => {
    if (!loaded || !iframeRef.current) return;
    // Small delay to ensure YT API is ready after load
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
    <div style={{ position: 'fixed', bottom: '-600px', left: '-600px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none', zIndex: -1 }}>
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

// ── Timer-done alarm via Web Audio API (plays a 3-tone café bell chime) ──
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

        // Pleasant 3-tone café bell chime × 2
        const t = ctx.currentTime;
        playBeep(880,  t,        0.55);
        playBeep(1100, t + 0.35, 0.55);
        playBeep(1320, t + 0.70, 0.90);
        playBeep(880,  t + 1.50, 0.55);
        playBeep(1100, t + 1.85, 0.55);
        playBeep(1320, t + 2.20, 0.90);

        setTimeout(() => { if (onDone) onDone(); ctx.close(); }, 3500);
      } catch (e) {
        // Web Audio not supported — just dismiss
        setTimeout(() => { if (onDone) onDone(); }, 100);
      }
    }
    if (!shouldPlay) {
      hasPlayedRef.current = false;
    }
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

// ── Confetti shower ───────────────────────────────────────────────────────────
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
          position: 'absolute',
          top: '-30px',
          left: p.left,
          fontSize: p.size,
          animationName: 'confettiFall',
          animationDuration: p.duration,
          animationDelay: p.delay,
          animationTimingFunction: 'linear',
          animationFillMode: 'forwards',
          animationIterationCount: 'infinite',
          display: 'inline-block',
        }}>{p.emoji}</span>
      ))}
    </div>
  );
}

// ── Big Timer Done Notification ───────────────────────────────────────────────
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
      <div className="timer-notif-in" style={{
        position: 'fixed', top: '50%', left: '50%',
        background: 'linear-gradient(135deg, #FFF5F7 0%, #F5F3FF 50%, #FFF0F5 100%)',
        border: '5px solid #FFB6D9',
        borderRadius: '40px',
        padding: '56px 72px',
        boxShadow: '0 40px 120px rgba(255,107,157,0.55), 0 0 0 1px rgba(255,255,255,0.8)',
        textAlign: 'center',
        maxWidth: '520px', width: '90vw',
        zIndex: 2,
      }}>
        <div style={{ fontSize: '96px', lineHeight: 1, marginBottom: '20px' }}>
          {wasStudying ? '🎉' : '📚'}
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '38px', lineHeight: 1.15,
          background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '14px',
        }}>
          {wasStudying ? 'Study Session Complete 🎊' : "Break's Over 🎊 "}
        </h2>
        <p style={{
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

// ── To-Do List — bottom-right corner ─────────────────────────────────────────
function TodoWidget() {
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

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 8000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '10px',
    }}>
      {/* Expanded panel */}
      {isOpen && !isMinimized && (
        <div className="todo-slide-in" style={{
          background: 'linear-gradient(135deg, rgba(255,245,247,0.99), rgba(245,243,255,0.99))',
          border: '3px solid #FFB6D9', borderRadius: '28px',
          padding: '20px 22px 22px',
          width: '340px',
          boxShadow: '0 24px 80px rgba(255,107,157,0.32)',
          backdropFilter: 'blur(20px)',
        }}>
          {/* Header */}
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

          {/* Progress */}
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

          {/* Items */}
          <div style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
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

          {/* Add input */}
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

      {/* Minimized bar */}
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

      {/* FAB button */}
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
        {/* Badge */}
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

// ── TikTok Icon SVG ───────────────────────────────────────────────────────────
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

// ── Main App ──────────────────────────────────────────────────────────────────
const StudyCafe = () => {
  const [selectedBuddy, setSelectedBuddy] = useState(null);
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
  // ── NEW: bottom menu bar minimized state ──────────────────────────────────
  const [isMenuBarMinimized, setIsMenuBarMinimized] = useState(false);
  const timerRef = useRef(null);

  // ── Analytics: track time spent on page ──────────────────────────────────────
  const sessionStartRef = useRef(Date.now());
  const selectedBuddyRef = useRef(null);

  useEffect(() => {
    selectedBuddyRef.current = selectedBuddy;
  }, [selectedBuddy]);

  useEffect(() => {
    sessionStartRef.current = Date.now();

    const getElapsed = () => Math.floor((Date.now() - sessionStartRef.current) / 1000);
    const getPage = () => selectedBuddyRef.current ? 'study_room' : 'landing';
    const getBuddy = () => selectedBuddyRef.current?.name ?? 'none';

    let heartbeatTimeout;
    const scheduleHeartbeat = () => {
      heartbeatTimeout = setTimeout(() => {
        trackEvent('heartbeat', {
          active_seconds: getElapsed(),
          page: getPage(),
          buddy: getBuddy(),
        });
        scheduleHeartbeat();
      }, 30000);
    };
    scheduleHeartbeat();

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        trackEvent('heartbeat', {
          active_seconds: getElapsed(),
          page: getPage(),
          buddy: getBuddy(),
        });
        clearTimeout(heartbeatTimeout);
        scheduleHeartbeat();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handleUnload = () => {
      trackEvent('session_duration', {
        seconds: getElapsed(),
        page: getPage(),
        buddy: getBuddy(),
      });
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearTimeout(heartbeatTimeout);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('beforeunload', handleUnload);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reclaim focus from YouTube iframes
  useEffect(() => {
    const reclaim = () => { setTimeout(() => { try { window.focus(); } catch (e) {} }, 50); };
    window.addEventListener('blur', reclaim);
    return () => window.removeEventListener('blur', reclaim);
  }, []);

  // Track buddy selection
  useEffect(() => {
    if (!selectedBuddy) return;
    trackEvent('select_buddy', { buddy: selectedBuddy.name, group: selectedBuddy.group });
  }, [selectedBuddy?.id]);

  // Track timer start/stop
  useEffect(() => {
    if (isRunning) {
      trackEvent('timer_start', { type: isStudying ? 'study' : 'break', buddy: selectedBuddy?.name ?? 'none' });
    }
  }, [isRunning]);

  const selectedMusicRef = useRef(null);

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
    { id: 33, name: 'Wonhee',        group: 'ILLIT',       videoId: 'gY5nbjT8ZYU?si=jWYNzxoQb0eYuhmb', isPremium: false, image: 'https://yt3.googleusercontent.com/XKcAXSDCdTjZbK1L-kXT0v61K-tw6xwzPn9aMmPUdbmMW8mMygmkJswoXdlMJU7DNm_oifQ8mw=s900-c-k-c0x00ffffff-no-rj' },
    { id: 34, name: 'Chuu',         group: 'LOONA',       videoId: 'bDQRKF4jTuQ?si=YZe4cd0s_7EZShDc', isPremium: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/20251002_Chuu_%EC%B8%84_03.jpg/250px-20251002_Chuu_%EC%B8%84_03.jpg' },
    { id: 35, name: 'Yuna',         group: 'ITZY',       videoId: 'iLzKAgu_5g4?si=9mjs1w33ymMcjfS_', isPremium: false, image: 'https://pbs.twimg.com/media/E6OrSSsWYAE-Naw.jpg' },
  ];

  const groups = ['All', 'BLACKPINK', 'BTS', 'IVE', 'LE SSERAFIM', 'aespa', 'NewJeans', 'Stray Kids', 'ILLIT', 'Red Velvet', 'LOONA', 'ITZY'];

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

  // ── Timer countdown ───────────────────────────────────────────────────────────
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
              // ── NEW: track study session completion event ──
              trackEvent('timer_complete', {
                type: 'study',
                duration_minutes: 25,
                buddy: selectedBuddy?.name ?? 'none',
                group: selectedBuddy?.group ?? 'none',
                music: selectedMusic?.name ?? 'none',
              });
              fireBrowserNotification('Study Session Complete! 🎉', 'Great job! Time for a café break ☕');
              setTimerDoneNotif({ visible: true, wasStudying: true });
              setTimerMinutes(5); setTimerSeconds(0); setIsStudying(false);
            } else {
              // ── NEW: track break session completion event ──
              trackEvent('timer_complete', {
                type: 'break',
                duration_minutes: 5,
                buddy: selectedBuddy?.name ?? 'none',
                group: selectedBuddy?.group ?? 'none',
                music: selectedMusic?.name ?? 'none',
              });
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

  // Dismiss notif → resume music
  const handleTimerNotifDismiss = () => {
    setTimerDoneNotif({ visible: false, wasStudying: true });
    setIsMusicPaused(false);
  };

  // Timer drag
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

  // ── LANDING PAGE ──────────────────────────────────────────────────────────────
  if (!selectedBuddy) {
    return (
      <>
        <style>{fontStyle}</style>
        <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ background: 'linear-gradient(135deg, #FFF5F7 0%, #FFF9FB 25%, #F5F3FF 50%, #FFF0F5 75%, #FFF5F7 100%)' }}>
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

          <div className="flex-1 max-w-7xl mx-auto px-8 py-6 w-full">
            {/* ── NAVBAR ── */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Coffee className="w-8 h-8 text-pink-500" />
                  <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div>
                  <h1 className="nav-brand text-2xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">IdoréStudy ♡</h1>
                  <p className="text-xs tracking-widest font-bold text-pink-400">STUDY WITH YOUR BIAS</p>
                </div>
              </div>

              <a
                href="https://www.tiktok.com/@idore.collections"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontSize: '14px',
                  boxShadow: '0 4px 20px rgba(255,107,157,0.4)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,107,157,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,107,157,0.4)'; }}
              >
                <TikTokIcon size={18} color="white" />
                @idore.collections
              </a>
            </div>

            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-7 h-7 text-pink-400 animate-pulse" />
                <Star className="w-7 h-7 text-yellow-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
                <Sparkles className="w-7 h-7 text-purple-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
              </div>
              <h2 className="hero-title text-6xl mb-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Who are you studying with today? 💖
              </h2>
              <p className="hero-subtitle text-2xl text-gray-500">Pick your bias, grab a latte, and let's ace this together ☕✨</p>
            </div>
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <input type="text" placeholder="Search your fave idol... 🔍" className="w-full px-6 py-4 rounded-full border-3 focus:outline-none shadow-lg bg-white focus:shadow-xl transition" style={{ borderColor: '#FFD7E5' }} />
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2"><Heart className="w-5 h-5 text-pink-300" /></div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
              {groups.map(group => (
                <button key={group} onClick={() => setSelectedCategory(group)}
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
              <div className="grid grid-cols-4 gap-6">
                {filteredBuddies.map(b => (
                  <div key={b.id} onClick={() => setSelectedBuddy(b)}
                    className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 hover:-translate-y-2 group relative border-2 border-pink-100 hover:border-pink-300">
                    {b.isPremium && (
                      <div className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 shadow-xl" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' }}>
                        <Crown className="w-3.5 h-3.5 text-white" /><span className="text-white">PREMIUM</span>
                      </div>
                    )}
                    <div className="relative">
                      <img src={b.image} alt={b.name} className="w-full h-56 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-pink-400" /><span className="text-white text-xs font-bold">Click to study together!</span></div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-black text-lg text-gray-800 mb-1">{b.name}</h3>
                          <p className="text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">{b.group}</p>
                        </div>
                        <Heart className="w-5 h-5 text-pink-300 group-hover:text-pink-500 group-hover:fill-pink-500 transition" />
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
            padding: '28px 48px',
            marginTop: '48px',
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
                  {['☕','💖','📚','✨','🎵'].map((e, i) => (
                    <span key={i} style={{ fontSize: '14px', opacity: 0.6 }}>{e}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <a
                  href="mailto:idore.collections@gmail.com"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '13px',
                    color: '#C4A8D4',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
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
  return (
    <>
      <style>{fontStyle}</style>
      <div className="min-h-screen flex relative overflow-hidden" style={{ backgroundColor: '#2D2D3D' }}>

        <CafeToast visible={toast.visible} message={toast.message} emoji={toast.emoji} subtext={toast.subtext} />

        <TimerDoneNotif
          visible={timerDoneNotif.visible}
          wasStudying={timerDoneNotif.wasStudying}
          onDismiss={handleTimerNotifDismiss}
        />

        <TimerSound
          shouldPlay={playTimerSound}
          onDone={() => setPlayTimerSound(false)}
        />

        {/* Left Sidebar */}
        <div className={`transition-all duration-300 ${showSidebar ? 'w-80' : 'w-0'} flex-shrink-0 overflow-hidden`}
          style={{ background: 'linear-gradient(180deg, #FFF5F7 0%, #F5F3FF 50%, #FFF0F5 100%)', borderRight: '4px solid #FFB6D9' }}>
          <div className="h-screen overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-gradient-to-b from-pink-50 to-transparent pb-4 z-10">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
                <h2 className="nav-brand text-xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">IdoreStudy</h2>
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <button onClick={() => setShowSidebar(false)} className="p-2 rounded-full hover:bg-pink-100 transition transform hover:scale-110">
                <ChevronLeft className="w-5 h-5 text-pink-500" />
              </button>
            </div>
            <div className="space-y-3 pb-24">
              {studyBuddies.map(buddy => (
                <button key={buddy.id} onClick={() => setSelectedBuddy(buddy)}
                  className={`w-full rounded-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${selectedBuddy.id === buddy.id ? 'shadow-2xl scale-105' : 'shadow-lg'}`}
                  style={{ background: 'white', border: selectedBuddy.id === buddy.id ? '3px solid #FF6B9D' : '2px solid #FFD7E5' }}>
                  <div className="flex items-center gap-3 p-2.5">
                    <div className="relative">
                      <img src={buddy.image} alt={buddy.name} className="w-16 h-16 object-cover rounded-xl" />
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
              <button onClick={() => setSelectedBuddy(null)}
                className="w-full py-4 rounded-2xl font-black text-white shadow-2xl transition transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)' }}>
                <div className="flex items-center justify-center gap-2"><Coffee className="w-5 h-5" />Back to Café<Heart className="w-4 h-4" /></div>
              </button>
            </div>
          </div>
        </div>

        {!showSidebar && (
          <button onClick={() => setShowSidebar(true)}
            className="absolute top-6 left-6 z-50 p-4 rounded-2xl shadow-2xl transition transform hover:scale-110 animate-pulse"
            style={{ background: 'linear-gradient(135deg, #FFD1DC 0%, #E6A8D7 100%)' }}>
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Main Content */}
        <div className="flex-1 relative h-screen overflow-hidden">
          {activeCafeItems.map((itemId, index) => {
            const item = cafeItems.find(i => i.id === itemId);
            const positions = [
              { top: '15%', left: '10%' }, { top: '25%', right: '15%' },
              { bottom: '30%', left: '20%' }, { bottom: '25%', right: '25%' },
              { top: '40%', left: '15%' }, { top: '50%', right: '20%' },
              { bottom: '45%', left: '12%' }, { top: '35%', right: '12%' },
            ];
            return (
              <div key={itemId} className="absolute z-20 text-6xl opacity-40 animate-bounce pointer-events-none"
                style={{ ...positions[index % positions.length], animationDuration: `${3 + index * 0.5}s`, animationDelay: `${index * 0.3}s` }}>
                {item?.emoji}
              </div>
            );
          })}

          <YTBackground key={selectedBuddy.id} videoId={selectedBuddy.videoId} />

          {selectedMusic && selectedMusic.videoId && (
            <AudioPlayer videoId={selectedMusic.videoId} isMuted={isMuted} isPaused={isMusicPaused} />
          )}

          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-200 z-20 p-6">
            <div className="flex items-center justify-between">
              <div className="w-24" />
              <div className="backdrop-blur-xl px-8 py-4 rounded-3xl shadow-2xl border-3"
                style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.95), rgba(200,109,215,0.95))', borderColor: 'rgba(255,255,255,0.3)' }}>
                <div className="flex items-center gap-3 mb-1">
                  <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
                  <p className="text-xs tracking-widest font-bold text-pink-100">STUDYING WITH</p>
                  <Sparkles className="w-4 h-4 text-yellow-200" />
                </div>
                <p className="text-2xl font-black text-white text-center">{selectedBuddy.name}</p>
                <p className="text-xs text-center text-pink-100 font-semibold mt-1">{selectedBuddy.group}</p>
              </div>
              <div className="w-24" />
            </div>
          </div>

          {/* Draggable Timer */}
          <div
            ref={timerRef}
            className="absolute z-30 cursor-move"
            style={{
              top: timerPosition.y === 0 ? '24px' : `${timerPosition.y}px`,
              right: timerPosition.x === 0 ? '24px' : 'auto',
              left: timerPosition.x !== 0 ? `${timerPosition.x}px` : 'auto',
            }}
            onMouseDown={handleMouseDown}
          >
            {isTimerMinimized ? (
              <div className="rounded-2xl shadow-2xl p-4 border-4 border-pink-200 backdrop-blur-md"
                style={{ background: 'linear-gradient(135deg, rgba(255,245,247,0.95), rgba(245,243,255,0.95))' }}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {formatTime(timerMinutes, timerSeconds)}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setIsRunning(r => !r); }}
                    className="p-2 rounded-xl transition-all transform hover:scale-110 bg-pink-100 hover:bg-pink-200">
                    {isRunning ? <Pause className="w-4 h-4 text-pink-600" /> : <Play className="w-4 h-4 text-pink-600" />}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setIsTimerMinimized(false); }}
                    className="p-2 rounded-xl transition-all transform hover:scale-110 bg-purple-100 hover:bg-purple-200">
                    <Maximize2 className="w-4 h-4 text-purple-600" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl shadow-2xl p-5 w-72 border-4 border-pink-200"
                style={{ background: 'linear-gradient(135deg, #FFF5F7 0%, #F5F3FF 100%)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-black text-sm text-gray-800">FOCUS TIME</span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={(e) => { e.stopPropagation(); setIsTimerMinimized(true); }}
                      className="p-1.5 hover:bg-pink-100 rounded-xl transition">
                      <Minimize2 className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-pink-100 rounded-xl transition">
                      <Settings className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 mb-5">
                  <button onClick={(e) => { e.stopPropagation(); setIsStudying(true); setTimerMinutes(25); setTimerSeconds(0); setIsRunning(false); }}
                    className={`flex-1 py-2.5 rounded-2xl font-bold text-xs transition-all transform hover:scale-105 ${isStudying ? 'text-white shadow-xl scale-105' : 'hover:bg-pink-50'}`}
                    style={isStudying ? { background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)' } : { backgroundColor: '#FFE5F1', color: '#9CA3AF' }}>
                    📚 Study
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setIsStudying(false); setTimerMinutes(5); setTimerSeconds(0); setIsRunning(false); }}
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
                        strokeDashoffset={`${2 * Math.PI * 72 * (1 - ((isStudying ? 25 : 5) * 60 - (timerMinutes * 60 + timerSeconds)) / ((isStudying ? 25 : 5) * 60))}`}
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
                      <div className="text-4xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        {formatTime(timerMinutes, timerSeconds)}
                      </div>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Heart className="w-2.5 h-2.5 text-pink-400 animate-pulse" />
                        <Heart className="w-2.5 h-2.5 text-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <Heart className="w-2.5 h-2.5 text-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-2.5">
                  <button onClick={(e) => { e.stopPropagation(); setTimerMinutes(isStudying ? 25 : 5); setTimerSeconds(0); setIsRunning(false); }}
                    className="p-3 rounded-2xl transition-all transform hover:scale-110 bg-pink-100 hover:bg-pink-200">
                    <RotateCcw className="w-4 h-4 text-pink-600" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setIsRunning(r => !r); }}
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

          {/* To-Do Widget — fixed bottom-right */}
          <TodoWidget />

          {/* ── Bottom Menu ── */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">

            {/* Music dropdown — only when bar is not minimized */}
            {!isMenuBarMinimized && showMusicMenu && (
              <div className="mb-4 rounded-3xl shadow-2xl backdrop-blur-xl border-3 p-4"
                style={{ background: 'linear-gradient(135deg, rgba(255,245,247,0.98), rgba(245,243,255,0.98))', borderColor: 'rgba(255,107,157,0.3)', minWidth: '280px', maxWidth: '300px' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Music className="w-4 h-4 text-pink-500" />
                  <h3 className="font-black text-sm text-gray-800">Music Vibes 🎵</h3>
                </div>
                <div className="music-scroll space-y-1.5" style={{ maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
                  {musicOptions.map(music => (
                    <button key={music.id} onClick={() => {
                      setSelectedMusic(music);
                      trackEvent('music_changed', { track: music.name, buddy: selectedBuddy?.name ?? 'none' });
                    }}
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
              </div>
            )}

            {/* Café dropdown — only when bar is not minimized */}
            {!isMenuBarMinimized && showCafeMenu && (
              <div className="mb-4 rounded-3xl shadow-2xl backdrop-blur-xl border-3 p-6"
                style={{ background: 'linear-gradient(135deg, rgba(255,248,230,0.98), rgba(255,243,220,0.98))', borderColor: 'rgba(255,165,0,0.25)', minWidth: '300px' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Coffee className="w-5 h-5 text-orange-500" />
                  <h3 className="font-black text-gray-800">Café Vibes ☕</h3>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {cafeItems.map(item => (
                    <button key={item.id} onClick={() => toggleCafeItem(item.id)}
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

            {/* ── Main bottom bar ── */}
            {isMenuBarMinimized ? (
              /* ── Minimized pill: just shows current track name + expand button ── */
              <div
                className="menu-bar-slide-in flex items-center gap-3 px-5 py-3 rounded-full shadow-2xl backdrop-blur-xl border-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,107,157,0.95), rgba(200,109,215,0.95))',
                  borderColor: 'rgba(255,255,255,0.3)',
                }}
              >
                <Music className="w-4 h-4 text-white opacity-80" />
                <span className="text-white font-bold text-sm opacity-90">{selectedMusic.icon} {selectedMusic.name}</span>
                <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.3)', margin: '0 2px' }} />
                <button
                  onClick={() => setIsMenuBarMinimized(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all transform hover:scale-105 bg-white/20 hover:bg-white/35"
                  title="Expand controls"
                >
                  <ChevronUp className="w-4 h-4 text-white" />
                  <span className="text-white text-xs font-bold">Show</span>
                </button>
              </div>
            ) : (
              /* ── Full expanded bar ── */
              <div
                className="flex items-center gap-4 px-9 py-5 rounded-full shadow-2xl backdrop-blur-xl border-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,107,157,0.95), rgba(200,109,215,0.95))',
                  borderColor: 'rgba(255,255,255,0.3)',
                }}
              >
                {/* Mute toggle */}
                <button onClick={() => setIsMuted(m => !m)} className="p-3 rounded-full transition transform hover:scale-110 bg-white/20 hover:bg-white/30">
                  {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
                </button>

                {/* Play/Pause music */}
                <button
                  onClick={() => setIsMusicPaused(p => !p)}
                  className="p-3 rounded-full transition transform hover:scale-110 bg-white/20 hover:bg-white/30"
                  title={isMusicPaused ? 'Resume music' : 'Pause music'}
                >
                  {isMusicPaused
                    ? <Play className="w-6 h-6 text-white" fill="white" />
                    : <Pause className="w-6 h-6 text-white" fill="white" />
                  }
                </button>

                {/* Music Vibes */}
                <button
                  onClick={() => { setShowMusicMenu(s => !s); setShowCafeMenu(false); }}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full transition transform hover:scale-105 ${showMusicMenu ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}>
                  <Music className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-sm">{selectedMusic.name}</span>
                  <ChevronUp className={`w-4 h-4 text-white transition-transform duration-200 ${showMusicMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Café Vibes */}
                <button
                  onClick={() => { setShowCafeMenu(s => !s); setShowMusicMenu(false); }}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full transition transform hover:scale-105 ${showCafeMenu ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}>
                  <Coffee className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-sm">Café Vibes</span>
                  <ChevronUp className={`w-4 h-4 text-white transition-transform duration-200 ${showCafeMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* ── NEW: Minimize button ── */}
                <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.25)', margin: '0 2px' }} />
                <button
                  onClick={() => { setIsMenuBarMinimized(true); setShowMusicMenu(false); setShowCafeMenu(false); }}
                  className="p-3 rounded-full transition transform hover:scale-110 bg-white/20 hover:bg-white/30"
                  title="Minimize controls"
                >
                  <ChevronDown className="w-5 h-5 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyCafe;