import React, { useState, useEffect, useRef } from 'react';

// Spotify-style icons as SVG components
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
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

const BookmarkIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

const NoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
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

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const SpotifyLogo = () => (
  <svg viewBox="0 0 24 24" fill="#1DB954" className="w-6 h-6">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function SpotifyNotetaker() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(847); // Start at 14:07
  const [duration] = useState(3720); // 62 minutes
  const [notes, setNotes] = useState([
    { id: 1, timestamp: 245, text: "Great point about morning routines", type: 'note' },
    { id: 2, timestamp: 512, text: "", type: 'bookmark' },
    { id: 3, timestamp: 847, text: "Research study mentioned - look up later", type: 'note' },
  ]);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [showNotesPanel, setShowNotesPanel] = useState(true);
  const [activeTab, setActiveTab] = useState('notes');
  const inputRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, duration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  useEffect(() => {
    if (showNoteInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showNoteInput]);

  const addBookmark = () => {
    const newNote = {
      id: Date.now(),
      timestamp: currentTime,
      text: '',
      type: 'bookmark'
    };
    setNotes(prev => [...prev, newNote].sort((a, b) => a.timestamp - b.timestamp));
  };

  const addNote = () => {
    if (newNoteText.trim()) {
      const newNote = {
        id: Date.now(),
        timestamp: currentTime,
        text: newNoteText.trim(),
        type: 'note'
      };
      setNotes(prev => [...prev, newNote].sort((a, b) => a.timestamp - b.timestamp));
      setNewNoteText('');
      setShowNoteInput(false);
    }
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const jumpToTimestamp = (timestamp) => {
    setCurrentTime(timestamp);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setCurrentTime(Math.floor(percent * duration));
  };

  const progress = (currentTime / duration) * 100;
  const noteMarkers = notes.map(note => ({
    ...note,
    position: (note.timestamp / duration) * 100
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black text-white font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/40">
        <div className="flex items-center gap-3">
          <ChevronDownIcon />
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Playing from Podcast</span>
        </div>
        <div className="flex items-center gap-4">
          <ShareIcon />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pt-4">
        {/* Podcast Cover */}
        <div className="flex justify-center mb-6">
          <div className="w-72 h-72 rounded-lg shadow-2xl overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10 opacity-90">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-white/90 text-lg font-bold tracking-tight text-center">The Huberman Lab</span>
              <span className="text-white/60 text-sm mt-1">Podcast</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"/>
          </div>
        </div>

        {/* Episode Info */}
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-1 leading-tight">How to Optimize Your Morning Routine for Peak Performance</h1>
          <p className="text-zinc-400 text-sm">Andrew Huberman</p>
        </div>

        {/* Progress Bar with Note Markers */}
        <div className="mb-2">
          <div
            className="relative h-3 group cursor-pointer"
            onClick={handleProgressClick}
          >
            {/* Background track */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-zinc-600 rounded-full group-hover:h-1.5 transition-all"/>

            {/* Progress fill */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-1 bg-white rounded-full group-hover:h-1.5 transition-all"
              style={{ width: `${progress}%` }}
            />

            {/* Note/Bookmark markers */}
            {noteMarkers.map(note => (
              <div
                key={note.id}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full cursor-pointer hover:scale-150 transition-transform z-10"
                style={{
                  left: `${note.position}%`,
                  backgroundColor: note.type === 'bookmark' ? '#1DB954' : '#facc15',
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  jumpToTimestamp(note.timestamp);
                }}
                title={note.text || 'Bookmark'}
              />
            ))}

            {/* Playhead */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
            />
          </div>

          {/* Time display */}
          <div className="flex justify-between text-xs text-zinc-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <button className="text-zinc-400 hover:text-white transition-colors">
            <SkipBackIcon />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button className="text-zinc-400 hover:text-white transition-colors">
            <SkipForwardIcon />
          </button>
        </div>

        {/* Note Actions Bar */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={addBookmark}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 transition-colors text-sm font-medium"
          >
            <BookmarkIcon filled={false} />
            <span>Bookmark</span>
          </button>

          <button
            onClick={() => setShowNoteInput(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium"
          >
            <NoteIcon />
            <span>Add Note</span>
          </button>
        </div>

        {/* Note Input Modal */}
        {showNoteInput && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center">
                    <NoteIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Add Note</h3>
                    <span className="text-xs text-zinc-500">at {formatTime(currentTime)}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowNoteInput(false);
                    setNewNoteText('');
                  }}
                  className="text-zinc-400 hover:text-white"
                >
                  <CloseIcon />
                </button>
              </div>

              <textarea
                ref={inputRef}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="What caught your attention?"
                className="w-full h-24 bg-zinc-800 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder:text-zinc-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addNote();
                  }
                }}
              />

              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => {
                    setShowNoteInput(false);
                    setNewNoteText('');
                  }}
                  className="px-4 py-2 rounded-full text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addNote}
                  disabled={!newNoteText.trim()}
                  className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-sm font-medium transition-colors"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notes Panel */}
        <div className="bg-zinc-900/50 rounded-2xl overflow-hidden">
          {/* Panel Header */}
          <div className="flex items-center border-b border-zinc-800">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'notes' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Notes & Bookmarks
              {activeTab === 'notes' && (
                <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-emerald-500 rounded-full"/>
              )}
            </button>
            <button
              onClick={() => setActiveTab('chapters')}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'chapters' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Chapters
              {activeTab === 'chapters' && (
                <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-emerald-500 rounded-full"/>
              )}
            </button>
          </div>

          {/* Panel Content */}
          <div className="max-h-64 overflow-y-auto">
            {activeTab === 'notes' && (
              <>
                {notes.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                      <NoteIcon />
                    </div>
                    <p className="text-zinc-500 text-sm">No notes yet</p>
                    <p className="text-zinc-600 text-xs mt-1">Tap "Add Note" to capture your thoughts</p>
                  </div>
                ) : (
                  <div className="divide-y divide-zinc-800/50">
                    {notes.map(note => (
                      <div
                        key={note.id}
                        className="flex items-start gap-3 p-4 hover:bg-zinc-800/30 transition-colors group cursor-pointer"
                        onClick={() => jumpToTimestamp(note.timestamp)}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          note.type === 'bookmark' ? 'bg-emerald-600/20 text-emerald-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {note.type === 'bookmark' ? <BookmarkIcon filled /> : <NoteIcon />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                              {formatTime(note.timestamp)}
                            </span>
                            <span className="text-xs text-zinc-600">
                              {note.type === 'bookmark' ? 'Bookmark' : 'Note'}
                            </span>
                          </div>
                          {note.text && (
                            <p className="text-sm text-zinc-300 mt-1 leading-relaxed">{note.text}</p>
                          )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-zinc-700 text-zinc-500 hover:text-red-400 transition-all"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'chapters' && (
              <div className="divide-y divide-zinc-800/50">
                {[
                  { time: 0, title: 'Introduction' },
                  { time: 180, title: 'The Science of Circadian Rhythms' },
                  { time: 720, title: 'Morning Light Exposure Protocol' },
                  { time: 1440, title: 'Optimal Caffeine Timing' },
                  { time: 2160, title: 'Cold Exposure Benefits' },
                  { time: 2880, title: 'Exercise Timing & Protocols' },
                  { time: 3420, title: 'Summary & Toolkit' },
                ].map((chapter, i) => (
                  <div
                    key={i}
                    onClick={() => jumpToTimestamp(chapter.time)}
                    className={`flex items-center gap-3 p-4 hover:bg-zinc-800/30 transition-colors cursor-pointer ${
                      currentTime >= chapter.time && (i === 6 || currentTime < [180, 720, 1440, 2160, 2880, 3420, 9999][i])
                        ? 'bg-emerald-500/5' : ''
                    }`}
                  >
                    <span className="text-xs font-mono text-zinc-500 w-12">{formatTime(chapter.time)}</span>
                    <span className="text-sm text-zinc-300">{chapter.title}</span>
                    {currentTime >= chapter.time && (i === 6 || currentTime < [180, 720, 1440, 2160, 2880, 3420, 9999][i]) && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-8"/>
      </div>

      {/* Mini Spotify branding */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-600 text-xs">
        <SpotifyLogo />
        <span>Prototype Demo</span>
      </div>
    </div>
  );
}
