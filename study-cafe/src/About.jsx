import React from 'react';
import { Coffee, Heart, Sparkles, Star, Music, Clock, Users, BookOpen } from 'lucide-react';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
`;

const features = [
  {
    icon: <Users style={{ width: 28, height: 28, color: '#FF6B9D' }} />,
    emoji: '🧑‍🤝‍🧑',
    title: 'Study Buddies',
    desc: 'Choose from 40+ K-pop idols across BLACKPINK, BTS, aespa, Stray Kids, IVE, and more. Each buddy brings their unique video background to your session.',
  },
  {
    icon: <Clock style={{ width: 28, height: 28, color: '#C86DD7' }} />,
    emoji: '⏱️',
    title: 'Pomodoro Timer',
    desc: 'Customizable focus timer with configurable study and break intervals. Get notified with a gentle chime when it\'s time to switch — your settings are saved automatically.',
  },
  {
    icon: <Music style={{ width: 28, height: 28, color: '#9B7EDB' }} />,
    emoji: '🎵',
    title: 'Lo-fi Music',
    desc: 'Hand-curated K-pop lo-fi playlists — from Blackpink rain mixes to BTS piano covers — play softly in the background while you work.',
  },
  {
    icon: <BookOpen style={{ width: 28, height: 28, color: '#FF6B9D' }} />,
    emoji: '📝',
    title: 'Study To-Do List',
    desc: 'A lightweight to-do widget lives in the corner of your study room. Add tasks, check them off, and watch your progress bar fill up.',
  },
  {
    icon: <Coffee style={{ width: 28, height: 28, color: '#C86DD7' }} />,
    emoji: '☕',
    title: 'Café Vibes',
    desc: 'Toggle floating café items — lattes, croissants, macha, and more — onto your study screen for that cozy coffee-shop ambiance.',
  },
  {
    icon: <Star style={{ width: 28, height: 28, color: '#9B7EDB' }} />,
    emoji: '🌸',
    title: 'Made with Love',
    desc: 'Built by a K-pop fan, for K-pop fans. Completely free, no account needed. Just pick your bias and start studying.',
  },
];

export default function About() {
  return (
    <>
      <style>{fontStyle}</style>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF5F7 0%, #FFF9FB 25%, #F5F3FF 50%, #FFF0F5 75%, #FFF5F7 100%)',
        paddingBottom: '80px',
      }}>
        {/* Hero */}
        <div style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '72px 32px 48px',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
            <Heart style={{ width: 28, height: 28, color: '#FF6B9D' }} />
            <Sparkles style={{ width: 28, height: 28, color: '#C86DD7' }} />
            <Coffee style={{ width: 28, height: 28, color: '#FF6B9D' }} />
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: 'clamp(36px, 6vw, 58px)',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
          }}>
            About IdoréStudy ♡
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '22px',
            color: '#9B7EDB',
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: '640px',
            margin: '0 auto',
          }}>
            A free study companion for K-pop fans who want to stay focused, inspired, and cozy while chasing their academic goals.
          </p>
        </div>

        {/* What is IdoréStudy */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 32px 56px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,107,157,0.08), rgba(200,109,215,0.08))',
            border: '3px solid #FFD7E5',
            borderRadius: '32px',
            padding: '48px',
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: '28px',
              background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '20px',
            }}>
              What is IdoréStudy?
            </h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '18px',
              color: '#666',
              lineHeight: 1.9,
              marginBottom: '20px',
            }}>
              IdoréStudy is a virtual study café that pairs you with your favorite K-pop idol for a focused, motivating study session. Instead of studying alone in silence, you get a gorgeous video background of your bias, soft lo-fi music curated from K-pop tracks, a Pomodoro-style timer, and a to-do list — all in one cozy space.
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '18px',
              color: '#666',
              lineHeight: 1.9,
            }}>
              It's designed for students, K-pop fans, and anyone who finds it easier to focus when their environment feels personal and beautiful. No account required — just open the site, pick your bias, and start your session.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 32px 56px' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: '32px',
            background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            marginBottom: '36px',
          }}>
            Everything you need to study smarter ✨
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: 'white',
                border: '2px solid #FFD7E5',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 8px 32px rgba(255,107,157,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(255,107,157,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,107,157,0.08)'; }}
              >
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{f.emoji}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontSize: '18px',
                  color: '#444',
                  marginBottom: '10px',
                }}>{f.title}</h3>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '15px',
                  color: '#888',
                  lineHeight: 1.7,
                }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who it's for */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 32px 56px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
            borderRadius: '32px',
            padding: '48px',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: '28px',
              color: 'white',
              marginBottom: '16px',
            }}>
              Who is this for? 💖
            </h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '19px',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.8,
              maxWidth: '560px',
              margin: '0 auto 28px',
            }}>
              Students who love K-pop and want their study environment to reflect that. High schoolers, university students, and lifelong learners who study better with music and a little inspiration from their favorite idols.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              {['📚 Students', '💜 BTS ARMY', '🖤 Blinks', '🌸 Fearnots', '⭐ Dive', '🌙 MY', '🍒 ReVeluv', '✨ Everyone'].map((tag, i) => (
                <span key={i} style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  borderRadius: '999px',
                  padding: '8px 18px',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: '13px',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Legal note */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            background: 'white',
            border: '2px solid #FFD7E5',
            borderRadius: '20px',
            padding: '28px 36px',
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px',
              color: '#999',
              lineHeight: 1.8,
              textAlign: 'center',
            }}>
              All videos displayed on IdoréStudy are embedded from YouTube and other third-party platforms. We do not host, claim ownership of, or redistribute any copyrighted content. All artist names, group names, and related imagery remain the property of their respective owners and labels.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}