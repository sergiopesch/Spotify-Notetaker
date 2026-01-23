import React, { useState, useEffect, useRef } from 'react';

// ============ ICONS ============
const PlayIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const PauseIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

const SkipBackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
  </svg>
);

const SkipForwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
  </svg>
);

const BookmarkIcon = ({ filled, className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

const NoteIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const HomeIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const SearchIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "3" : "2"} className="w-6 h-6">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);

const LibraryIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const ExportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const SpotifyLogo = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 24 24" fill="#1DB954" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s4.48 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const HeadphonesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

// ============ UTILITIES ============
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============ KNOWLEDGE TREE DATA WITH SPOTIFY CONTENT ============
const knowledgeDatabase = {
  default: {
    topic: "Circadian Biology & Performance",
    nodes: [
      {
        id: 1,
        name: "Andrew Huberman",
        role: "Professor of Neurobiology",
        institution: "Stanford University",
        level: "source",
        color: "emerald",
        image: "🧠",
        spotifyContent: {
          type: "podcast",
          name: "Huberman Lab",
          url: "https://open.spotify.com/show/79CkJF3UJTHFV8Dse3Ez0P",
          followers: "4.2M"
        }
      },
      {
        id: 2,
        name: "Ben Barres",
        role: "Pioneer in Glial Cell Research",
        institution: "Stanford University",
        level: "mentor",
        color: "blue",
        image: "🔬",
        spotifyContent: null
      },
      {
        id: 3,
        name: "David Hubel",
        role: "Nobel Laureate - Visual System",
        institution: "Harvard Medical School",
        level: "pioneer",
        color: "purple",
        image: "🏆",
        spotifyContent: {
          type: "audiobook",
          name: "Eye, Brain, and Vision",
          url: "https://open.spotify.com",
          followers: null
        }
      }
    ],
    relatedPodcasts: [
      { name: "Tim Ferriss Show", episode: "Dr. Andrew Huberman — Optimizing Sleep" },
      { name: "Lex Fridman Podcast", episode: "#164 – Sleep, Dreams, Creativity" }
    ]
  },
  caffeine: {
    topic: "Sleep Science & Caffeine",
    nodes: [
      {
        id: 1,
        name: "Matthew Walker",
        role: "Professor of Neuroscience",
        institution: "UC Berkeley",
        level: "source",
        color: "emerald",
        image: "😴",
        spotifyContent: {
          type: "podcast",
          name: "The Matt Walker Podcast",
          url: "https://open.spotify.com/show/3OX0beqaXMfJOHzGk8P5fz",
          followers: "890K"
        }
      },
      {
        id: 2,
        name: "J. Allan Hobson",
        role: "Sleep & Dream Researcher",
        institution: "Harvard Medical School",
        level: "mentor",
        color: "blue",
        image: "💭",
        spotifyContent: null
      },
      {
        id: 3,
        name: "Michel Jouvet",
        role: "Discoverer of REM Sleep",
        institution: "University of Lyon",
        level: "pioneer",
        color: "purple",
        image: "⭐",
        spotifyContent: null
      }
    ],
    relatedPodcasts: [
      { name: "Huberman Lab", episode: "Master Your Sleep" },
      { name: "Joe Rogan Experience", episode: "#1109 – Matthew Walker" }
    ]
  }
};

const getKnowledgeTree = (noteText) => {
  const text = noteText?.toLowerCase() || '';
  if (text.includes('caffeine') || text.includes('coffee') || text.includes('sleep')) {
    return knowledgeDatabase.caffeine;
  }
  return knowledgeDatabase.default;
};

// ============ SHARE DEMO CTA ============
function ShareDemoCTA({ onShare }) {
  return (
    <div className="bg-gradient-to-br from-zinc-800/90 to-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-700 mt-4 sm:mt-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-500/30">
          <HeartIcon />
        </div>
        <div className="flex-1">
          <p className="font-bold text-base sm:text-lg text-white mb-1">Enjoying this demo?</p>
          <p className="text-xs sm:text-sm text-zinc-400 mb-3">Share it with your friends! It's all about having fun and spreading cool ideas.</p>
          <button 
            onClick={onShare}
            className="w-full py-3 sm:py-3.5 bg-black hover:bg-zinc-900 rounded-xl font-semibold text-sm sm:text-base text-white transition-all flex items-center justify-center gap-2 border border-zinc-600 hover:border-zinc-500 active:scale-[0.98]"
          >
            <TwitterIcon />
            Share on X
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ INTRO SCREEN ============
function IntroScreen({ onStart }) {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 600),
      setTimeout(() => setStep(3), 1000),
      setTimeout(() => setStep(4), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-6 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay:'1s'}} />
      </div>
      
      <div className="relative max-w-sm w-full text-center">
        <div className={`mb-8 transition-all duration-700 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="relative inline-block">
            <SpotifyLogo className="w-20 h-20 mx-auto" />
            <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-full" />
          </div>
        </div>
        
        <div className={`transition-all duration-700 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Podcast Notes
          </h1>
          <p className="text-zinc-400 text-lg">Capture insights while you listen</p>
        </div>
        
        <div className={`mt-10 space-y-3 transition-all duration-700 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: '🔖', text: 'Timestamp bookmarks' },
            { icon: '📝', text: 'Rich notes' },
            { icon: '🧠', text: 'Knowledge trees' },
            { icon: '📤', text: 'Export anywhere' }
          ].map((item, i) => (
            <div 
              key={i}
              className="glass-card px-4 py-3 rounded-xl flex items-center gap-3"
              style={{ 
                transitionDelay: `${600 + i * 100}ms`,
                opacity: step >= 3 ? 1 : 0,
                transform: step >= 3 ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.5s ease-out'
              }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-zinc-300">{item.text}</span>
            </div>
          ))}
        </div>
        
        <div className={`mt-10 transition-all duration-700 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={onStart}
            className="w-full py-5 bg-[#1DB954]/90 backdrop-blur-xl hover:bg-[#1DB954] rounded-full font-bold text-white text-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-500/40 border border-emerald-400/30"
          >
            Start Demo →
          </button>
          <p className="text-zinc-500 text-sm mt-4">Interactive prototype by <a href="https://twitter.com/sergiopesch" target="_blank" rel="noopener noreferrer" className="text-[#1DB954] hover:underline">@sergiopesch</a></p>
        </div>
      </div>
    </div>
  );
}

// ============ KNOWLEDGE TREE MODAL ============
function KnowledgeTreeModal({ note, onClose }) {
  const [visible, setVisible] = useState(false);
  const [activeNodes, setActiveNodes] = useState([]);
  const tree = getKnowledgeTree(note.text);
  
  useEffect(() => {
    setVisible(true);
    tree.nodes.forEach((node, i) => {
      setTimeout(() => {
        setActiveNodes(prev => [...prev, node.id]);
      }, 300 + i * 250);
    });
  }, []);
  
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };
  
  const getLevelLabel = (level) => ({ source: 'Source', mentor: 'Mentor', pioneer: 'Pioneer' }[level]);
  const getLevelGradient = (color) => ({
    emerald: 'from-emerald-400 to-emerald-600',
    blue: 'from-blue-400 to-blue-600',
    purple: 'from-purple-400 to-purple-600'
  }[color] || 'from-emerald-400 to-emerald-600');

  return (
    <div 
      className={`fixed inset-0 z-50 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/20 rounded-full blur-3xl animate-float-reverse" />
      </div>
      
      <div 
        className={`relative h-full overflow-y-auto p-3 sm:p-4 transition-all duration-500 ${visible ? 'translate-y-0' : 'translate-y-8'}`}
        onClick={e => e.stopPropagation()}
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-zinc-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-purple-500/30 animate-pulse-subtle">
                🧠
              </div>
              <div>
                <h2 className="font-bold text-base sm:text-lg text-white">Knowledge Tree</h2>
                <p className="text-xs text-zinc-400">{tree.topic}</p>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 sm:p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-all"
            >
              <CloseIcon />
            </button>
          </div>
          
          {/* Note reference */}
          <div className="bg-zinc-800/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 border border-zinc-700">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="text-xs font-mono px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-[#1DB954]/20 text-[#1DB954]">
                {formatTime(note.timestamp)}
              </span>
              <span className="text-xs text-zinc-500">Your note</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-200">{note.text}</p>
          </div>
          
          {/* Knowledge Tree */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <h3 className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wider">Intellectual Lineage</h3>
            
            {tree.nodes.map((node, index) => {
              const isActive = activeNodes.includes(node.id);
              const indent = index * 12;
              
              return (
                <div
                  key={node.id}
                  className={`transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                  style={{ marginLeft: `${indent}px`, transitionDelay: `${index * 150}ms` }}
                >
                  {index > 0 && (
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2 ml-3 sm:ml-4">
                      <div className={`w-4 sm:w-6 h-px bg-gradient-to-r ${getLevelGradient(node.color)}`} />
                      <span className="text-xs text-zinc-600">learned from</span>
                    </div>
                  )}
                  
                  <div className="bg-zinc-800/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-zinc-700 hover:border-zinc-600 transition-all duration-300">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${getLevelGradient(node.color)} flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0`}>
                        {node.image}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <h4 className="font-bold text-sm sm:text-base text-white">{node.name}</h4>
                          <span className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-gradient-to-r ${getLevelGradient(node.color)} text-white font-medium`}>
                            {getLevelLabel(node.level)}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">{node.role}</p>
                        <p className="text-xs text-zinc-500">{node.institution}</p>
                        
                        {node.spotifyContent && (
                          <div 
                            className="mt-2 sm:mt-3 bg-zinc-900/80 rounded-lg sm:rounded-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 hover:bg-zinc-900 transition-all cursor-pointer border border-zinc-700"
                            onClick={() => window.open(node.spotifyContent.url, '_blank')}
                          >
                            <SpotifyLogo className="w-6 h-6 sm:w-8 sm:h-8" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-zinc-500">Listen on Spotify</p>
                              <p className="text-xs sm:text-sm font-medium text-white truncate">{node.spotifyContent.name}</p>
                              {node.spotifyContent.followers && (
                                <p className="text-xs text-[#1DB954]">{node.spotifyContent.followers} followers</p>
                              )}
                            </div>
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1DB954] flex items-center justify-center">
                              <PlayIcon size={14} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Related Podcasts */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
              <HeadphonesIcon /> Related on Spotify
            </h3>
            <div className="space-y-2">
              {tree.relatedPodcasts.map((podcast, i) => (
                <div 
                  key={i}
                  className={`bg-zinc-800/80 rounded-lg sm:rounded-xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 hover:bg-zinc-700/80 transition-all cursor-pointer duration-500 border border-zinc-700 ${activeNodes.length >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: `${800 + i * 100}ms` }}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center flex-shrink-0">
                    <HeadphonesIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-500">{podcast.name}</p>
                    <p className="text-xs sm:text-sm font-medium text-white truncate">{podcast.episode}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 sm:gap-3 pb-6 sm:pb-8">
            <button className="flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#1DB954] hover:bg-[#1ed760] font-bold text-sm sm:text-base text-white transition-all active:scale-[0.98]">
              Find More Episodes
            </button>
            <button onClick={handleClose} className="py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-zinc-800 hover:bg-zinc-700 font-medium text-sm sm:text-base transition-all border border-zinc-700">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ EXPORT MODAL ============
function ExportModal({ notes, onClose }) {
  const [copied, setCopied] = useState(false);
  const [activeFormat, setActiveFormat] = useState('card');
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);
  
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };
  
  const generateExport = () => {
    if (activeFormat === 'thread') {
      let thread = `🧵 My notes from Huberman Lab\n\n"How to Optimize Your Morning Routine"\n\n`;
      notes.filter(n => n.text).forEach((note, i) => {
        const tree = getKnowledgeTree(note.text);
        thread += `${i + 1}/ [${formatTime(note.timestamp)}]\n${note.text}\n\n`;
        thread += `🧠 Source: ${tree.nodes[0].name}\n`;
        if (tree.nodes[0].spotifyContent) thread += `🎧 ${tree.nodes[0].spotifyContent.name}\n`;
        thread += `\n`;
      });
      thread += `Listen on @Spotify 🎧\n#Podcast #Learning`;
      return thread;
    }
    
    if (activeFormat === 'markdown') {
      let md = `# How to Optimize Your Morning Routine\n**The Huberman Lab**\n\n---\n\n`;
      notes.forEach(note => {
        const tree = getKnowledgeTree(note.text);
        if (note.text) {
          md += `## [${formatTime(note.timestamp)}] ${note.text}\n\n**Knowledge Tree:**\n`;
          tree.nodes.forEach(node => {
            md += `- ${node.name} (${node.role})`;
            if (node.spotifyContent) md += ` — [${node.spotifyContent.name}](${node.spotifyContent.url})`;
            md += `\n`;
          });
          md += `\n`;
        } else {
          md += `- **[${formatTime(note.timestamp)}]** 🔖 Bookmark\n\n`;
        }
      });
      return md;
    }
    
    let card = `🎙️ The Huberman Lab\n📌 How to Optimize Your Morning Routine\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    notes.forEach(note => {
      const icon = note.type === 'bookmark' ? '🔖' : '📝';
      const tree = getKnowledgeTree(note.text);
      card += `${icon} ${formatTime(note.timestamp)}\n${note.text || 'Bookmark'}\n`;
      if (note.text) {
        card += `\n🧠 Knowledge Tree:\n`;
        tree.nodes.forEach((node, i) => {
          const prefix = i === 0 ? '   ┌' : i === tree.nodes.length - 1 ? '   └' : '   ├';
          card += `${prefix} ${node.name}${node.spotifyContent ? ' 🎧' : ''}\n`;
        });
      }
      card += `\n`;
    });
    card += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🎧 Listen on Spotify\n#Podcast #Huberman #Learning`;
    return card;
  };
  
  const handleCopy = async () => {
    const text = generateExport();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareTwitter = () => {
    const text = encodeURIComponent(generateExport().slice(0, 270) + '...');
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'width=550,height=450');
  };
  
  const shareLinkedIn = () => {
    const text = encodeURIComponent(generateExport());
    window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${text}`, '_blank');
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={handleClose} />
      
      <div className={`relative w-full sm:max-w-lg bg-zinc-900 sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl border border-zinc-700 transition-all duration-500 ${visible ? 'translate-y-0 scale-100' : 'translate-y-full sm:translate-y-8 sm:scale-95'}`} style={{ maxHeight: 'calc(100dvh - 2rem)' }}>
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-700 bg-zinc-900 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-lg sm:text-xl shadow-lg">📤</div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-white">Export Notes</h2>
              <p className="text-xs text-zinc-400">{notes.length} items with knowledge trees</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-zinc-700 transition-colors"><CloseIcon /></button>
        </div>
        
        {/* Format tabs */}
        <div className="p-3 sm:p-4 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex gap-2">
            {[{ id: 'card', label: '📋', full: 'Card' }, { id: 'thread', label: '🧵', full: 'Thread' }, { id: 'markdown', label: '📄', full: 'MD' }].map(format => (
              <button
                key={format.id}
                onClick={() => setActiveFormat(format.id)}
                className={`flex-1 py-2.5 sm:py-3 rounded-xl font-medium text-sm transition-all duration-300 ${activeFormat === format.id ? 'bg-[#1DB954] text-white shadow-lg shadow-emerald-500/30' : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'}`}
              >
                <span className="sm:hidden">{format.label}</span>
                <span className="hidden sm:inline">{format.label} {format.full}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Preview - Scrollable */}
        <div className="overflow-y-auto p-3 sm:p-4" style={{ maxHeight: 'calc(100dvh - 20rem)', minHeight: '120px' }}>
          <div className="bg-zinc-800/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-zinc-700">
            <pre className="text-xs sm:text-sm text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed">{generateExport()}</pre>
          </div>
        </div>
        
        {/* Actions - Fixed at bottom */}
        <div className="p-3 sm:p-4 border-t border-zinc-700 bg-zinc-900 space-y-2 sm:space-y-3 sticky bottom-0" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <button onClick={handleCopy} className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${copied ? 'bg-[#1DB954] text-white' : 'bg-white text-black hover:bg-zinc-200'}`}>
            {copied ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy to Clipboard</>}
          </button>
          <div className="flex gap-2">
            <button onClick={shareTwitter} className="flex-1 py-2.5 sm:py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm"><TwitterIcon /> <span className="hidden xs:inline">Share on</span> X</button>
            <button onClick={shareLinkedIn} className="flex-1 py-2.5 sm:py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm"><LinkedInIcon /> <span className="hidden xs:inline">LinkedIn</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ NOTE INPUT MODAL ============
function NoteInputModal({ timestamp, onSave, onClose }) {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);
  
  useEffect(() => {
    setVisible(true);
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);
  
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };
  
  const handleSave = () => {
    if (text.trim()) {
      onSave(text.trim());
      handleClose();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />
      
      <div className={`relative w-full sm:max-w-lg bg-zinc-900 rounded-t-3xl sm:rounded-3xl p-4 sm:p-5 border border-zinc-700 transition-all duration-500 ${visible ? 'translate-y-0 scale-100' : 'translate-y-full sm:translate-y-0 sm:scale-95'}`} style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg sm:text-xl shadow-lg shadow-yellow-500/30">📝</div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">Add Note</h3>
              <span className="text-xs sm:text-sm text-zinc-400">at {formatTime(timestamp)}</span>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-zinc-700 transition-colors"><CloseIcon /></button>
        </div>
        
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What caught your attention?"
          className="w-full h-28 sm:h-32 bg-zinc-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-sm sm:text-base text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#1DB954]/50 placeholder:text-zinc-500 border border-zinc-700"
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); }}}
        />
        
        <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
          <button onClick={handleClose} className="flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-zinc-800 hover:bg-zinc-700 font-semibold text-sm sm:text-base transition-all border border-zinc-700">Cancel</button>
          <button onClick={handleSave} disabled={!text.trim()} className="flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#1DB954] hover:bg-[#1ed760] disabled:opacity-50 disabled:hover:bg-[#1DB954] font-bold text-sm sm:text-base text-white transition-all">Save Note</button>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN APP ============
export default function SpotifyNotetakerDemo() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(240);
  const [duration] = useState(3720);
  const [showExport, setShowExport] = useState(false);
  const [showKnowledgeTree, setShowKnowledgeTree] = useState(null);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintMessage, setHintMessage] = useState('');
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [interactionCount, setInteractionCount] = useState(0);
  
  const [notes, setNotes] = useState([
    { id: 1, timestamp: 245, text: "Morning light exposure within 30 min of waking is crucial", type: 'note' },
  ]);
  
  // Track interactions
  const trackInteraction = () => {
    setLastInteraction(Date.now());
    setInteractionCount(prev => prev + 1);
    setShowHint(false);
  };
  
  // Share demo on X
  const shareOnX = () => {
    const text = encodeURIComponent(`🎧 Check out this cool interactive demo for podcast note-taking in Spotify!\n\nBookmarks, notes, knowledge trees & export — all in one place.\n\nTry it out 👇`);
    const url = encodeURIComponent('https://spotify-notetaker.vercel.app');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&via=sergiopesch`, '_blank', 'width=550,height=450');
  };
  
  // Hint system - show help if user seems lost
  useEffect(() => {
    if (showIntro || showExport || showKnowledgeTree || showNoteInput) return;
    
    const checkIdle = setInterval(() => {
      const idleTime = Date.now() - lastInteraction;
      
      // Show hint after 8 seconds of inactivity
      if (idleTime > 8000 && !showHint) {
        if (currentScreen === 'home' && interactionCount < 3) {
          setHintMessage('👆 Tap the green card to open the player');
          setShowHint(true);
        } else if (currentScreen === 'player' && notes.length < 2) {
          setHintMessage('💡 Try adding a note or bookmark!');
          setShowHint(true);
        } else if (currentScreen === 'player' && notes.length >= 2 && interactionCount < 8) {
          setHintMessage('📤 Tap the export icon to share your notes');
          setShowHint(true);
        }
      }
    }, 2000);
    
    return () => clearInterval(checkIdle);
  }, [showIntro, showHint, lastInteraction, currentScreen, notes.length, interactionCount, showExport, showKnowledgeTree, showNoteInput]);
  
  // Progress time when playing
  useEffect(() => {
    if (isPlaying && !showNoteInput && !showExport && !showKnowledgeTree) {
      const interval = setInterval(() => setCurrentTime(prev => Math.min(prev + 1, duration)), 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration, showNoteInput, showExport, showKnowledgeTree]);
  
  const handleSaveNote = (text) => {
    setNotes(prev => [...prev, { id: Date.now(), timestamp: currentTime, text, type: 'note' }]);
    setShowNoteInput(false);
    trackInteraction();
  };
  
  const handleAddBookmark = () => {
    setNotes(prev => [...prev, { id: Date.now(), timestamp: currentTime, text: '', type: 'bookmark' }]);
    trackInteraction();
  };
  
  const progress = (currentTime / duration) * 100;

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {showIntro && <IntroScreen onStart={() => setShowIntro(false)} />}
      
      {/* Home Screen */}
      {!showIntro && currentScreen === 'home' && (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pt-6 pb-32 px-4 sm:px-6 animate-fade-in" onClick={trackInteraction}>
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Good evening</h1>
          
          {/* Now Playing Card - High visibility */}
          <div 
            className="bg-zinc-800/90 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 cursor-pointer transition-all duration-300 hover:bg-zinc-700/90 border border-zinc-700 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-[0.98]"
            onClick={() => { trackInteraction(); setCurrentScreen('player'); }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex-shrink-0 shadow-lg shadow-emerald-500/40 flex items-center justify-center text-xl sm:text-2xl">🧠</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-emerald-400 font-semibold mb-0.5 sm:mb-1">NOW PLAYING</p>
                <p className="font-bold text-white text-sm sm:text-base truncate">How to Optimize Your Morning Routine</p>
                <p className="text-xs sm:text-sm text-zinc-300">The Huberman Lab</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 sm:gap-2">
                {notes.length > 0 && (
                  <div className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-yellow-500/30 border border-yellow-500/50">
                    <NoteIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400" />
                    <span className="text-xs text-yellow-300 font-bold">{notes.length}</span>
                  </div>
                )}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1DB954] flex items-center justify-center shadow-lg shadow-emerald-500/40">
                  <PlayIcon size={20} />
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 h-1.5 bg-zinc-600 rounded-full overflow-hidden">
              <div className="h-full bg-[#1DB954] transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-zinc-400 mt-2 text-center">Tap to open player</p>
          </div>
          
          {/* Feature Card - High visibility */}
          <div className="bg-gradient-to-br from-emerald-900/80 to-zinc-900 rounded-2xl p-4 sm:p-5 border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-emerald-500/30 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl">✨</span>
              </div>
              <div>
                <p className="font-bold text-base sm:text-lg text-emerald-300">NEW: Podcast Notes</p>
                <p className="text-xs sm:text-sm text-zinc-300">Bookmark moments & capture insights</p>
              </div>
            </div>
          </div>
          
          {/* Quick tips */}
          <div className="mt-4 sm:mt-6 space-y-2">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Features</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: '🔖', label: 'Bookmarks' },
                { icon: '📝', label: 'Notes' },
                { icon: '🧠', label: 'Knowledge Tree' },
                { icon: '📤', label: 'Export' }
              ].map((item, i) => (
                <div key={i} className="bg-zinc-800/70 rounded-xl p-2.5 sm:p-3 flex items-center gap-2 border border-zinc-700/50">
                  <span className="text-sm sm:text-base">{item.icon}</span>
                  <span className="text-xs sm:text-sm text-zinc-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Share CTA */}
          <ShareDemoCTA onShare={shareOnX} />
          
          {/* Creator credit */}
          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-600">
              Made with 💚 by <a href="https://twitter.com/sergiopesch" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#1DB954] transition-colors">@sergiopesch</a>
            </p>
          </div>
        </div>
      )}
      
      {/* Player Screen */}
      {!showIntro && currentScreen === 'player' && (
        <div className="min-h-screen animate-fade-in" onClick={trackInteraction}>
          <div className="h-screen overflow-y-auto pb-8" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
            <div className="px-4 sm:px-6 pt-3 sm:pt-4 max-w-lg mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between py-2 sm:py-3">
                <button onClick={() => { trackInteraction(); setCurrentScreen('home'); }} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"><ChevronDownIcon /></button>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Now Playing</span>
                <button 
                  onClick={() => { trackInteraction(); setShowExport(true); }}
                  className="p-2 -mr-2 rounded-full transition-all duration-300 hover:bg-white/10"
                >
                  <ExportIcon />
                </button>
              </div>
              
              {/* Album Art */}
              <div className="flex justify-center my-4 sm:my-6">
                <div className="relative">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 shadow-2xl shadow-emerald-500/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-2 sm:mb-3">
                        <span className="text-4xl sm:text-5xl">🧠</span>
                      </div>
                      <p className="text-white font-bold text-base sm:text-lg">The Huberman Lab</p>
                      <p className="text-white/60 text-xs sm:text-sm">Podcast</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-emerald-500/20 blur-3xl -z-10" />
                </div>
              </div>
              
              {/* Title */}
              <div className="text-center mb-4 sm:mb-6 px-2">
                <h1 className="text-lg sm:text-xl font-bold mb-1">How to Optimize Your Morning Routine</h1>
                <p className="text-zinc-400 text-sm">Andrew Huberman</p>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4 sm:mb-6 px-2">
                <div className="relative h-2 bg-zinc-800 rounded-full">
                  <div className="absolute inset-y-0 left-0 bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
                  {notes.map(note => (
                    <div
                      key={note.id}
                      className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full cursor-pointer transition-all hover:scale-150 ${note.type === 'bookmark' ? 'bg-emerald-400' : 'bg-yellow-400'}`}
                      style={{ left: `${(note.timestamp / duration) * 100}%`, transform: 'translate(-50%, -50%)' }}
                      onClick={() => { trackInteraction(); setCurrentTime(note.timestamp); }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-zinc-500 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>-{formatTime(duration - currentTime)}</span>
                </div>
              </div>
              
              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6 sm:mb-8">
                <button className="text-zinc-400 hover:text-white transition-colors p-2"><SkipBackIcon /></button>
                <button onClick={() => { trackInteraction(); setIsPlaying(!isPlaying); }} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center text-black shadow-2xl hover:scale-105 active:scale-95 transition-transform">
                  {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
                </button>
                <button className="text-zinc-400 hover:text-white transition-colors p-2"><SkipForwardIcon /></button>
              </div>
              
              {/* Note Actions */}
              <div className="bg-zinc-900/80 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 border border-zinc-800">
                <p className="text-xs text-zinc-500 text-center mb-2 sm:mb-3">Capture your thoughts</p>
                <div className="flex gap-2 sm:gap-3">
                  <button 
                    onClick={handleAddBookmark}
                    className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-4 rounded-xl transition-all duration-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-emerald-500/50 active:scale-95"
                  >
                    <BookmarkIcon filled={false} className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-sm sm:text-base">Bookmark</span>
                  </button>
                  <button 
                    onClick={() => { trackInteraction(); setShowNoteInput(true); }}
                    className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-4 rounded-xl transition-all duration-300 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold shadow-lg shadow-emerald-500/30 active:scale-95"
                  >
                    <NoteIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Add Note</span>
                  </button>
                </div>
              </div>
              
              {/* Notes List */}
              <div className="bg-zinc-900/80 rounded-2xl overflow-hidden border border-zinc-800">
                <div className="p-3 sm:p-4 border-b border-zinc-700">
                  <h3 className="font-bold text-white text-sm sm:text-base">Your Notes <span className="text-[#1DB954]">({notes.length})</span></h3>
                </div>
                
                <div className="max-h-64 sm:max-h-80 overflow-y-auto">
                  {notes.length === 0 ? (
                    <div className="p-6 sm:p-8 text-center">
                      <NoteIcon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-zinc-600 mb-2" />
                      <p className="text-zinc-400 font-medium text-sm sm:text-base">No notes yet</p>
                      <p className="text-zinc-600 text-xs sm:text-sm mt-1">Tap "Add Note" to get started</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-zinc-800">
                      {notes.map((note) => (
                        <div key={note.id} className="p-3 sm:p-4 hover:bg-zinc-800/50 transition-all animate-fade-in">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div 
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 cursor-pointer transition-transform hover:scale-110 ${note.type === 'bookmark' ? 'bg-emerald-500/30 text-emerald-400' : 'bg-yellow-500/30 text-yellow-400'}`}
                              onClick={() => { trackInteraction(); setCurrentTime(note.timestamp); }}
                            >
                              {note.type === 'bookmark' ? <BookmarkIcon filled className="w-4 h-4 sm:w-5 sm:h-5" /> : <NoteIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-mono px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-[#1DB954]/20 text-[#1DB954] cursor-pointer hover:bg-[#1DB954]/30 transition-colors" onClick={() => { trackInteraction(); setCurrentTime(note.timestamp); }}>
                                {formatTime(note.timestamp)}
                              </span>
                              <p className="text-xs sm:text-sm text-zinc-200 mt-1.5 sm:mt-2">{note.text || <span className="text-zinc-500 italic">Bookmark</span>}</p>
                              
                              {note.text && (
                                <button onClick={() => { trackInteraction(); setShowKnowledgeTree(note); }} className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 text-xs text-purple-400 hover:text-purple-300 transition-colors group">
                                  <span className="group-hover:animate-bounce">🧠</span>
                                  <span>View knowledge tree →</span>
                                </button>
                              )}
                            </div>
                            <button onClick={() => { trackInteraction(); setNotes(prev => prev.filter(n => n.id !== note.id)); }} className="p-1.5 sm:p-2 rounded-lg hover:bg-zinc-700 text-zinc-500 hover:text-red-400 transition-colors">
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Share CTA in player */}
              <ShareDemoCTA onShare={shareOnX} />
              
              {/* Creator credit */}
              <div className="mt-6 mb-8 text-center">
                <p className="text-xs text-zinc-600">
                  Made with 💚 by <a href="https://twitter.com/sergiopesch" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#1DB954] transition-colors">@sergiopesch</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Bottom Nav */}
      {!showIntro && currentScreen === 'home' && (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800 px-4 sm:px-6 py-3 sm:py-4" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <div className="flex justify-around max-w-md mx-auto">
            {[{ icon: HomeIcon, label: 'Home', active: true }, { icon: SearchIcon, label: 'Search', active: false }, { icon: LibraryIcon, label: 'Library', active: false }].map((item, i) => (
              <button key={i} className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-colors ${item.active ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                <item.icon active={item.active} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Hint Toast - Discreet help for lost users */}
      {showHint && !showExport && !showKnowledgeTree && !showNoteInput && (
        <div 
          className="fixed bottom-20 sm:bottom-24 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto z-30 animate-slide-up"
          onClick={() => setShowHint(false)}
        >
          <div className="bg-zinc-800/95 backdrop-blur-lg rounded-2xl px-4 py-3 shadow-xl border border-zinc-700 flex items-center gap-3 max-w-sm mx-auto sm:mx-0 cursor-pointer hover:bg-zinc-700/95 transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#1DB954]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm">💡</span>
            </div>
            <p className="text-sm text-zinc-200 flex-1">{hintMessage}</p>
            <button className="text-zinc-500 hover:text-white text-xs">✕</button>
          </div>
        </div>
      )}
      
      {showNoteInput && <NoteInputModal timestamp={currentTime} onSave={handleSaveNote} onClose={() => setShowNoteInput(false)} />}
      {showExport && <ExportModal notes={notes} onClose={() => setShowExport(false)} />}
      {showKnowledgeTree && <KnowledgeTreeModal note={showKnowledgeTree} onClose={() => setShowKnowledgeTree(null)} />}
      
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass-card-strong {
          background: rgba(20, 20, 20, 0.9);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-subtle { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } }
        @keyframes float { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-30px) translateX(20px); } }
        @keyframes float-reverse { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(30px) translateX(-20px); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
        .animate-pulse-subtle { animation: pulse-subtle 1.5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 6s ease-in-out infinite; }
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
    </div>
  );
}
