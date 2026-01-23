# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Spotify Notetaker is a React-based prototype demo that simulates a podcast note-taking feature for Spotify. It allows users to add timestamped bookmarks and notes while listening to podcasts.

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── App.jsx       # Main application component with all UI logic
├── App.css       # Additional CSS styles
├── main.jsx      # React entry point
└── index.css     # Tailwind CSS imports and base styles

public/
├── favicon.svg   # Site favicon
├── og-image.svg  # Open Graph image for social sharing
└── vite.svg      # Vite logo

index.html        # HTML entry point with meta tags
```

## Architecture

This is a single-component React application (`SpotifyNotetaker` in `App.jsx`). The component manages:

- **Playback state**: `isPlaying`, `currentTime`, `duration`
- **Notes state**: Array of note objects with `id`, `timestamp`, `text`, and `type` (note/bookmark)
- **UI state**: `showNoteInput`, `activeTab`, modal visibility

### Key Features

1. **Progress Bar**: Clickable timeline with visual markers for notes/bookmarks
2. **Notes & Bookmarks**: Users can add timestamped notes or quick bookmarks
3. **Chapters**: Predefined chapter markers for navigation
4. **Timestamp Navigation**: Click any marker or timestamp to jump to that point

### SVG Icons

All icons are inline SVG components defined at the top of `App.jsx` for easy customization and no external dependencies.

## Development Notes

- The app uses Tailwind CSS classes extensively; refer to `tailwind.config.js` for custom configuration
- Colors follow Spotify's design language (emerald/green accent: `#1DB954`, zinc grays)
- The component is designed for mobile-first but works on desktop
- State is local only (no persistence) - this is a demo/prototype
