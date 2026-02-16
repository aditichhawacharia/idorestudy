import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Coffee, Music, Volume2, VolumeX, Settings, Crown, Star, Flame, Users, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Heart, Sparkles, Award, Gift, Headphones, Clock, BarChart3, ChevronUp } from 'lucide-react';

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
`;

// ── YouTube Background component ──────────────────────────────────────────────
function YTBackground({ videoId }) {
  // Extract just the video ID if it includes query parameters
  const cleanVideoId = videoId.split('?')[0];

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#000' }}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${cleanVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${cleanVideoId}&rel=0&modestbranding=1&showinfo=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '135%',
          height: '140%',
          border: 'none',
          pointerEvents: 'none',
        }}
      />
      {/* Click-blocker so no YT UI is ever accessible */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }} />
    </div>
  );
}

// ── Audio Player component ──────────────────────────────────────────────
function AudioPlayer({ videoId, isMuted }) {
  const [key, setKey] = useState(0);

  // Force reload when videoId or mute state changes
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [videoId, isMuted]);

  // Extract just the video ID if it includes query parameters
  const cleanVideoId = videoId.split('?')[0];

  return (
    <div style={{ position: 'fixed', bottom: '-500px', left: '-500px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none', zIndex: -1 }}>
      <iframe
        key={key}
        width="1"
        height="1"
        src={`https://www.youtube.com/embed/${cleanVideoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${cleanVideoId}&rel=0&modestbranding=1`}
        title="Background Music Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          width: '1px',
          height: '1px',
          border: 'none',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
const StudyCafe = () => {
  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isStudying, setIsStudying] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showCafeMenu, setShowCafeMenu] = useState(false);
  const [activeCafeItems, setActiveCafeItems] = useState([]);

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
    { id: 1, name: 'Blackpink Lo-fi Mix', icon: '🎵', videoId: 'PjsDDmv25C4?si=v3idYagDZngy3Sb8' },
    { id: 2, name: 'Le Sserafim Rainy Piano Mix', icon: '🎹', videoId: 'I3yNehe_Zwg?si=bSovd5fGI0BDxaCS' },
    { id: 3, name: 'Jennie SOLO Orchestral',      icon: '🎧', videoId: 'GWR6yukGEI4?si=E0RBzLSXC05Q7n0V' },
    { id: 4, name: 'BTS Rainy Day Piano Mix',      icon: '🌧️', videoId: 'RdLjg7ZGxuE?si=vjNxrl1k4DQ7ziV6' },
    { id: 5, name: 'IVE Rainy Day Piano Mix',  icon: '🦢', videoId: 'YswKhUjxYFw?si=w_FLslrn974zsEoE&t=45' },
    { id: 6, name: 'Ocean Waves',      icon: '🌊', videoId: 'V1bFr2SWP1I' },
  ];

  const [selectedMusic, setSelectedMusic] = useState(musicOptions[0]);

  const studyBuddies = [
    { id: 1,  name: 'Rosé',         group: 'BLACKPINK',   videoId: 'oadMhHMubQ4?si=fdyQ5nAQQgIZ2KC2', isPremium: false, image: 'https://media.vogue.co.uk/photos/602503e953a6c957c223e1c2/1:1/w_1079,h_1080,c_limit/65422624_362861021078977_3034176141535337881_n.jpg' },
    { id: 2,  name: 'Jennie',       group: 'BLACKPINK',   videoId: 'HZWxtzCyfEo?si=-NM11lZj5HljTC4P', isPremium: false, image: 'https://cdn-images.dzcdn.net/images/artist/56c65ac9ea451119ddc8c0b02915d103/1900x1900-000000-80-0-0.jpg' },
    { id: 3,  name: 'Lisa',         group: 'BLACKPINK',   videoId: 'dQw4w9WgXcQ', isPremium: false, image: 'https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2019/07/25/d713ab1c-a846-11e9-862b-600d112f3b14_image_hires_160010.jpg?itok=9g_F7u4R&v=1564041615' },
    { id: 4,  name: 'Jisoo',        group: 'BLACKPINK',   videoId: 'dQw4w9WgXcQ', isPremium: false, image: 'https://media.allure.com/photos/61534b030c90fcc5f648640d/1:1/w_2330,h_2330,c_limit/blackpink%20jisoo%20dior%20ss2021.jpg' },
    { id: 5,  name: 'Jungkook',     group: 'BTS',         videoId: 'xy_mVVv4Oc0?si=XIcdkXpt9NFM70IL', isPremium: false, image: 'https://media.allure.com/photos/5d51932d40395d0008565c27/1:1/w_1117,h_1117,c_limit/BTS%20Jungkook%20The%20Fact%20Music%20Awards.jpg' },
    { id: 6,  name: 'V (Taehyung)', group: 'BTS',         videoId: 'Xt2wCvkSegU?si=RQO_W8pmXh7KOzb-', isPremium: false,  image: 'https://img.wattpad.com/15924e68075c76b1fcd131b7d91bc719d50128ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f356c67706c4c5552394c77436b413d3d2d323936302e313539363230383536306537383138613533393132303132363339332e6a7067?s=fit&w=720&h=720' },
    { id: 7,  name: 'Jimin',        group: 'BTS',         videoId: 'KxE4i8-nYEs?si=C5vcXDoBao4Ubwmr', isPremium: false,  image: 'https://i0.wp.com/zaloramalaysiablog.wpcomstaging.com/wp-content/uploads/2025/10/JIMIN-FEATURE.jpeg?resize=736%2C768&ssl=1' },
    { id: 12, name: 'Wonyoung',     group: 'IVE',         videoId: 'YswKhUjxYFw?si=w_FLslrn974zsEoE&t=45', isPremium: false, image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Jang_Won-young_of_Ive%2C_April_16%2C_2025.png' },
    { id: 15, name: 'Chaewon',      group: 'LE SSERAFIM', videoId: '3one8kjAAQI?si=Lx74Rk6W62Mk1YWv', isPremium: false, image: 'https://cdn-images.dzcdn.net/images/artist/e6f96dce8a3460c7e8f4e1ae8fe6b6a3/1900x1900-000000-80-0-0.jpg' },
    { id: 17, name: 'Kazuha',       group: 'LE SSERAFIM', videoId: 'KznmfOQrK_E?si=I-mvB2p7JTPKhA8m', isPremium: false,  image: 'https://image.koreaboo.com/2025/11/le-sserafim-kazuha-is-selected-as-the-new-model-for-french-v0-3i7ttzuwwxqc1-519x640.jpg' },
    { id: 18, name: 'Karina',       group: 'aespa',       videoId: 'r6OQFloCDZw?si=ajwYkdn7wDS7p1nR', isPremium: false,  image: 'https://i.pinimg.com/564x/76/b6/12/76b612ff257c2caadc1090e633646cbe.jpg' },
    { id: 22, name: 'Minji',        group: 'NewJeans',    videoId: 'dQw4w9WgXcQ', isPremium: false, image: 'https://via.placeholder.com/300x400/B4E7CE/000000?text=MINJI' },
    { id: 24, name: 'Seulgi',     group: 'Red Velvet',    videoId: 'UZOnLTTiZKY?si=yeswGn2PlAAqNpgf', isPremium: false,  image: 'https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/images/methode/2019/02/08/35c9b9ee-2b4c-11e9-8864-9e8ab15a22ca_image_hires_125930.JPG?itok=JnlideOe&v=1549601969' },
    { id: 27, name: 'Bang Chan',    group: 'Stray Kids',  videoId: 'ANuQjiEMMcU?si=85lRUokCKtNzHBJm', isPremium: false,  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/190106_Stray_Kids_%E6%96%B9%E7%87%A6.png/250px-190106_Stray_Kids_%E6%96%B9%E7%87%A6.png' },
    { id: 28, name: 'Felix',        group: 'Stray Kids',  videoId: 'EYpwvrJlV-s?si=3BQrSp7AtwvOucAI', isPremium: false, image: 'https://external-preview.redd.it/stray-kids-felix-becomes-the-new-face-of-gong-cha-v0-Y1dU4kACbSQRpJAnGX4dI9qrjrRZMif9kS9VM06lbSw.jpg?width=640&crop=smart&auto=webp&s=e28a6c99ae4995b2fca6fbdba49386fbebcabc1f' },
    { id: 29, name: 'Hyunjin',      group: 'Stray Kids',  videoId: 'QFfZlBdAhgs?si=dYxdJAq3oc4V6R4J', isPremium: false,  image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Hyunjin_of_Stray_Kids%2C_September_24%2C_2025.png' },
    { id: 32, name: 'Yunah',         group: 'ILLIT',       videoId: 'Kz5ie0SAPJM?si=VfoZlZkZ1t2Blwoc', isPremium: false,  image: 'https://www.billboard.com/wp-content/uploads/2024/06/ILLIT-Rookie-Spotlight-YUNAH-billboard-1240.jpg?w=800' },
  ];

  const groups = ['All', 'BLACKPINK', 'BTS', 'IVE', 'LE SSERAFIM', 'aespa', 'NewJeans', 'Stray Kids', 'ILLIT', 'Red Velvet'];

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            setIsRunning(false);
            if (isStudying) { setTimerMinutes(5); setIsStudying(false); }
            else { setTimerMinutes(25); setIsStudying(true); }
            return;
          }
          setTimerMinutes(p => p - 1);
          setTimerSeconds(59);
        } else {
          setTimerSeconds(p => p - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerMinutes, timerSeconds, isStudying]);

  const formatTime = (m, s) => `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const filteredBuddies = selectedCategory === 'All' ? studyBuddies : studyBuddies.filter(b => b.group === selectedCategory);
  const toggleCafeItem = id => setActiveCafeItems(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  // ── LANDING PAGE ────────────────────────────────────────────────────────────
  if (!selectedBuddy) {
    return (
      <>
        <style>{fontStyle}</style>
        <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF5F7 0%, #FFF9FB 25%, #F5F3FF 50%, #FFF0F5 75%, #FFF5F7 100%)' }}>
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

          <div className="max-w-7xl mx-auto px-8 py-6">
            {/* Header */}
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
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-orange-100 to-pink-100 border-2 border-pink-200 hover:shadow-lg transition transform hover:scale-105">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">128 Day Streak</span>
                  <Crown className="w-4 h-4 text-yellow-500" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 hover:shadow-lg transition transform hover:scale-105">
                  <Award className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Level 24</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border-2 border-pink-200 hover:shadow-lg transition transform hover:scale-105">
                  <BarChart3 className="w-4 h-4 text-pink-500" />
                  <span className="text-sm font-bold text-gray-700">Stats</span>
                </button>
                <button className="px-6 py-2.5 rounded-full font-black transition shadow-xl text-white transform hover:scale-105" style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)' }}>
                  <Crown className="w-4 h-4 inline mr-1" />Get Premium ✨
                </button>
              </div>
            </div>

            {/* Hero */}
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

            {/* Search */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <input type="text" placeholder="Search your fave idol... 🔍" className="w-full px-6 py-4 rounded-full border-3 focus:outline-none shadow-lg bg-white focus:shadow-xl transition" style={{ borderColor: '#FFD7E5' }} />
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2"><Heart className="w-5 h-5 text-pink-300" /></div>
              </div>
            </div>

            {/* Group Tabs */}
            <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
              {groups.map(group => (
                <button key={group} onClick={() => setSelectedCategory(group)}
                  className={`px-6 py-3 rounded-full font-bold transition-all shadow-lg transform hover:scale-110 ${selectedCategory === group ? 'text-white shadow-2xl scale-110' : 'bg-white border-2 border-pink-200 hover:bg-pink-50 text-gray-700'}`}
                  style={selectedCategory === group ? { background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)' } : {}}>
                  {group === 'All' ? '✨ All' : group}
                </button>
              ))}
            </div>

            {/* Buddies Grid */}
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

            {/* Banner */}
            <div className="mt-12 rounded-3xl p-8 shadow-2xl border-4 border-white" style={{ background: 'linear-gradient(135deg, #FFD1DC 0%, #FFC0CB 25%, #DDA0DD 50%, #E6A8D7 75%, #FFB6D9 100%)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/30 backdrop-blur-sm p-4 rounded-full animate-pulse"><Gift className="w-10 h-10 text-white" /></div>
                  <div>
                    <h3 className="text-white font-black text-3xl mb-2 flex items-center gap-2">
                      <Sparkles className="w-6 h-6" />Limited Time: Premium 50% Off!<Heart className="w-6 h-6" />
                    </h3>
                    <p className="text-white/90 text-lg font-semibold">Get exclusive study content + unlock ALL idols for just $4.99/month! 💖</p>
                  </div>
                </div>
                <button className="bg-white px-10 py-5 rounded-full font-black text-xl hover:shadow-2xl transition transform hover:scale-110 whitespace-nowrap" style={{ color: '#FF6B9D' }}>Claim Offer ✨</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── STUDY ROOM ──────────────────────────────────────────────────────────────
  return (
    <>
      <style>{fontStyle}</style>
      <div className="min-h-screen flex relative overflow-hidden" style={{ backgroundColor: '#2D2D3D' }}>

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

          {/* Floating Cafe Items */}
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

          {/* YouTube Background */}
          <YTBackground videoId={selectedBuddy.videoId} />

          {/* Background Music Player */}
          {selectedMusic && selectedMusic.videoId && (
            <AudioPlayer videoId={selectedMusic.videoId} isMuted={isMuted} />
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

          {/* Timer */}
          <div className="absolute top-6 right-6 z-30">
            <div className="rounded-3xl shadow-2xl p-5 w-72 border-4 border-pink-200" style={{ background: 'linear-gradient(135deg, #FFF5F7 0%, #F5F3FF 100%)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-black text-sm text-gray-800">FOCUS TIME</span>
                </div>
                <button className="p-1.5 hover:bg-pink-100 rounded-xl transition"><Settings className="w-3.5 h-3.5 text-gray-600" /></button>
              </div>

              <div className="flex gap-2 mb-5">
                <button onClick={() => { setIsStudying(true); setTimerMinutes(25); setTimerSeconds(0); setIsRunning(false); }}
                  className={`flex-1 py-2.5 rounded-2xl font-bold text-xs transition-all transform hover:scale-105 ${isStudying ? 'text-white shadow-xl scale-105' : 'hover:bg-pink-50'}`}
                  style={isStudying ? { background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)' } : { backgroundColor: '#FFE5F1', color: '#9CA3AF' }}>
                  📚 Study
                </button>
                <button onClick={() => { setIsStudying(false); setTimerMinutes(5); setTimerSeconds(0); setIsRunning(false); }}
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
                <button onClick={() => { setTimerMinutes(isStudying ? 25 : 5); setTimerSeconds(0); setIsRunning(false); }}
                  className="p-3 rounded-2xl transition-all transform hover:scale-110 bg-pink-100 hover:bg-pink-200">
                  <RotateCcw className="w-4 h-4 text-pink-600" />
                </button>
                <button onClick={() => setIsRunning(r => !r)}
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
          </div>

          {/* Bottom Menu */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
            {showCafeMenu && (
              <div className="mb-4 rounded-3xl shadow-2xl backdrop-blur-xl border-3 p-6 max-w-4xl"
                style={{ background: 'linear-gradient(135deg, rgba(255,245,247,0.98), rgba(245,243,255,0.98))', borderColor: 'rgba(255,107,157,0.3)' }}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4"><Music className="w-5 h-5 text-pink-500" /><h3 className="font-black text-gray-800">Music Vibes 🎵</h3></div>
                    <div className="space-y-2">
                      {musicOptions.map(music => (
                        <button key={music.id} onClick={() => setSelectedMusic(music)}
                          className={`w-full p-3 rounded-2xl transition-all transform hover:scale-105 text-left ${selectedMusic.id === music.id ? 'text-white shadow-lg' : 'bg-white hover:bg-pink-50'}`}
                          style={selectedMusic.id === music.id ? { background: 'linear-gradient(135deg, #FF6B9D 0%, #C86DD7 100%)' } : {}}>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{music.icon}</span>
                            <span className="font-bold text-sm">{music.name}</span>
                            {selectedMusic.id === music.id && <Heart className="w-4 h-4 ml-auto fill-white" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4"><Coffee className="w-5 h-5 text-pink-500" /><h3 className="font-black text-gray-800">Cafe Vibes ☕</h3></div>
                    <div className="grid grid-cols-2 gap-2">
                      {cafeItems.map(item => (
                        <button key={item.id} onClick={() => toggleCafeItem(item.id)}
                          className={`p-3 rounded-2xl transition-all transform hover:scale-105 ${activeCafeItems.includes(item.id) ? 'text-white shadow-lg' : 'bg-white hover:bg-pink-50'}`}
                          style={activeCafeItems.includes(item.id) ? { background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' } : {}}>
                          <div className="text-center">
                            <div className="text-3xl mb-1">{item.emoji}</div>
                            <div className={`text-xs font-bold ${activeCafeItems.includes(item.id) ? 'text-white' : 'text-gray-700'}`}>{item.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 px-8 py-5 rounded-full shadow-2xl backdrop-blur-xl border-3"
              style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.95), rgba(200,109,215,0.95))', borderColor: 'rgba(255,255,255,0.3)' }}>
              <button onClick={() => setIsMuted(m => !m)} className="p-3 rounded-full transition transform hover:scale-110 bg-white/20 hover:bg-white/30">
                {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
              </button>
              <button onClick={() => setShowCafeMenu(s => !s)} className="flex items-center gap-3 px-6 py-3 rounded-full transition transform hover:scale-105 bg-white/20 hover:bg-white/30">
                <Coffee className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-sm">{selectedMusic.name}</span>
                <ChevronUp className={`w-4 h-4 text-white transition-transform ${showCafeMenu ? 'rotate-180' : ''}`} />
              </button>
              <button className="p-3 rounded-full transition transform hover:scale-110 bg-white/20 hover:bg-white/30"><Headphones className="w-5 h-5 text-white" /></button>
              <button className="p-3 rounded-full transition transform hover:scale-110 bg-white/20 hover:bg-white/30"><Settings className="w-5 h-5 text-white" /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyCafe;