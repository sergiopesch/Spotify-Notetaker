import { useState } from 'react'
import './App.css'

// Sample data for demo
const sampleTracks = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55' },
  { id: 2, title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: '8:02' },
  { id: 3, title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: '6:30' },
  { id: 4, title: 'Comfortably Numb', artist: 'Pink Floyd', album: 'The Wall', duration: '6:24' },
  { id: 5, title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', album: 'Appetite for Destruction', duration: '5:56' },
]

function App() {
  const [notes, setNotes] = useState({})
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [currentNote, setCurrentNote] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTracks = sampleTracks.filter(track =>
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSaveNote = () => {
    if (selectedTrack && currentNote.trim()) {
      setNotes(prev => ({
        ...prev,
        [selectedTrack.id]: [...(prev[selectedTrack.id] || []), {
          text: currentNote,
          timestamp: new Date().toLocaleString()
        }]
      }))
      setCurrentNote('')
    }
  }

  const handleDeleteNote = (trackId, noteIndex) => {
    setNotes(prev => ({
      ...prev,
      [trackId]: prev[trackId].filter((_, i) => i !== noteIndex)
    }))
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <svg viewBox="0 0 24 24" className="spotify-icon">
            <path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <h1>Spotify Notetaker</h1>
        </div>
        <p className="tagline">Take notes on your favorite tracks</p>
      </header>

      <main className="main-content">
        <section className="tracks-section">
          <div className="search-bar">
            <svg viewBox="0 0 24 24" className="search-icon">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search tracks or artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="tracks-list">
            <h2>Your Library</h2>
            {filteredTracks.map(track => (
              <div
                key={track.id}
                className={`track-item ${selectedTrack?.id === track.id ? 'selected' : ''}`}
                onClick={() => setSelectedTrack(track)}
              >
                <div className="track-art">
                  <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                <div className="track-info">
                  <span className="track-title">{track.title}</span>
                  <span className="track-artist">{track.artist}</span>
                </div>
                <span className="track-duration">{track.duration}</span>
                {notes[track.id]?.length > 0 && (
                  <span className="note-badge">{notes[track.id].length}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="notes-section">
          {selectedTrack ? (
            <>
              <div className="selected-track-header">
                <div className="selected-track-art">
                  <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                <div className="selected-track-info">
                  <h2>{selectedTrack.title}</h2>
                  <p>{selectedTrack.artist} • {selectedTrack.album}</p>
                </div>
              </div>

              <div className="note-input-area">
                <textarea
                  placeholder="Write your thoughts about this track..."
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  rows={4}
                />
                <button onClick={handleSaveNote} disabled={!currentNote.trim()}>
                  <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                  Save Note
                </button>
              </div>

              <div className="notes-list">
                <h3>Your Notes ({notes[selectedTrack.id]?.length || 0})</h3>
                {notes[selectedTrack.id]?.length > 0 ? (
                  notes[selectedTrack.id].map((note, index) => (
                    <div key={index} className="note-card">
                      <p className="note-text">{note.text}</p>
                      <div className="note-footer">
                        <span className="note-timestamp">{note.timestamp}</span>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteNote(selectedTrack.id, index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-notes">No notes yet. Start writing!</p>
                )}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <svg viewBox="0 0 24 24" className="no-selection-icon">
                <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
              <h2>Select a track</h2>
              <p>Choose a track from your library to start taking notes</p>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Spotify Notetaker Demo • Built with React + Vite</p>
      </footer>
    </div>
  )
}

export default App