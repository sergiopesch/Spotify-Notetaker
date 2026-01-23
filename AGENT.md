# AGENT.md

Guidelines for AI agents working on this codebase.

## Quick Start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Code Style

- Use functional React components with hooks
- Prefer inline SVG for icons (see existing patterns in `App.jsx`)
- Use Tailwind CSS utility classes for styling
- Follow Spotify's design language:
  - Primary accent: `#1DB954` (Spotify green)
  - Backgrounds: zinc-900, zinc-800, black
  - Text: white, zinc-400, zinc-500

## Component Guidelines

### Adding New Features

1. Keep all logic in `src/App.jsx` unless the feature warrants extraction
2. Add new state using `useState` hooks at the top of the component
3. Follow existing patterns for modals and UI elements
4. Use Tailwind responsive prefixes (`sm:`, `md:`) for mobile-first design

### Icon Components

Add new icons as functional components at the top of `App.jsx`:

```jsx
const NewIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    {/* SVG paths */}
  </svg>
);
```

### Notes Data Structure

```javascript
{
  id: number,        // Unique identifier (use Date.now())
  timestamp: number, // Time in seconds
  text: string,      // Note content (empty for bookmarks)
  type: 'note' | 'bookmark'
}
```

## Testing Changes

1. Run `npm run dev` to start the dev server
2. Test on both mobile and desktop viewports
3. Verify playback controls work (play/pause, progress bar)
4. Test adding/deleting notes and bookmarks
5. Check chapter navigation
6. Run `npm run build` to ensure production build succeeds

## Common Tasks

### Modify the podcast metadata
Edit the hardcoded values in the JSX:
- Episode title in the `<h1>` element
- Author name in the `<p>` element below
- Podcast name in the cover art section

### Change chapter markers
Modify the chapters array in the `activeTab === 'chapters'` section.

### Adjust initial notes
Modify the `useState` initial value for `notes`.

### Change timing
- `currentTime`: Initial playback position (in seconds)
- `duration`: Total episode length (in seconds)
