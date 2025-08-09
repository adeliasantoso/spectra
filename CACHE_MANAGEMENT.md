# Cache Management & Auto-Refresh Guide

## Problem Solved

Fixed the issue where localhost would show a blank/white page after updates, requiring users to manually hard refresh (Ctrl+F5). Now the app automatically detects updates and refreshes itself.

## Solutions Implemented

### 1. **Automatic Cache Busting**
- **Timestamp-based filenames**: All built assets now include timestamps to force cache invalidation
- **Development cache clearing**: Automatic cache clearing when app is focused in development
- **Service worker auto-update**: Service worker detects new versions and auto-refreshes the page

### 2. **Development Mode Enhancements**
```bash
# Regular dev server
npm run dev

# Fresh start (clears all caches first)
npm run dev:fresh
```

### 3. **Service Worker Improvements**
- **Version-based cache names**: Each deployment gets a unique cache version
- **Aggressive cache cleanup**: Old caches are immediately deleted when new version is detected
- **Development cache bypassing**: HTML files bypass cache completely in localhost
- **Auto-reload on updates**: Page automatically reloads when new service worker is available

### 4. **Browser Cache Headers**
- Added cache-busting meta tags to HTML
- Development server sends no-cache headers
- JavaScript files include cache-busting parameters in development

## How It Works

### Development Mode
1. **Initial Load**: App clears any existing development caches
2. **File Watching**: Auto-refresh hook monitors for file changes every 5 seconds  
3. **Tab Focus**: When you return to the browser tab, caches are cleared automatically
4. **Service Worker**: Bypasses cache for HTML and critical assets
5. **Auto-Reload**: Page refreshes automatically when updates are detected

### Production Mode
1. **Build Time**: Each asset gets a unique filename with timestamp
2. **Service Worker**: Uses version-based cache invalidation
3. **Update Detection**: Service worker checks for updates periodically
4. **Seamless Updates**: Users get fresh content without manual intervention

## Files Modified

### Core Files:
- `vite.config.js` - Added timestamp-based cache busting & no-cache headers
- `src/main.jsx` - Enhanced service worker registration with auto-reload
- `public/sw.js` - Complete rewrite with aggressive cache management
- `index.html` - Added cache-busting meta tags
- `package.json` - Added cache clearing scripts

### New Files:
- `src/utils/cacheVersion.js` - Version management utilities
- `src/hooks/useAutoRefresh.js` - Auto-refresh hook for development
- `public/version.json` - Version tracking file
- `CACHE_MANAGEMENT.md` - This documentation

## Usage Instructions

### For Development:
1. **Standard Development**: `npm run dev` (now includes auto-refresh)
2. **Fresh Start**: `npm run dev:fresh` (clears all caches first)
3. **Manual Cache Clear**: Just refresh the tab - caches clear automatically

### For Users:
- **No action needed**: App updates automatically
- **White screen fix**: Solved - no more manual Ctrl+F5 needed
- **Always fresh content**: Service worker ensures latest version loads

## Testing

### Test Cache Busting:
1. Run `npm run dev`
2. Make changes to any file
3. Switch back to browser tab
4. Page should auto-refresh with changes

### Test Production Build:
1. Run `npm run build`
2. Check `dist/assets/` folder
3. All filenames should include timestamps
4. Deploy and verify updates work seamlessly

## Technical Details

### Cache Strategy:
- **Development**: Aggressive no-cache policy with auto-refresh
- **Production**: Version-based cache invalidation with automatic updates
- **Service Worker**: Network-first for HTML, cache-first for assets
- **Updates**: Automatic detection and page reload

### Performance Impact:
- **Minimal overhead**: Cache checks run efficiently in background
- **Better UX**: No more white screens or manual refreshes
- **Faster development**: Automatic refresh saves time

## Troubleshooting

### If Auto-Refresh Doesn't Work:
1. Check browser console for errors
2. Verify service worker is registered
3. Try `npm run dev:fresh` to clear everything

### If Still Getting White Screens:
1. Hard refresh once: Ctrl+F5 (should be last time needed)
2. Check if service worker is blocked
3. Verify cache headers in Network tab

### For Production Issues:
1. Check service worker console logs
2. Verify `version.json` is accessible
3. Ensure cache names are unique per deployment

## Benefits

✅ **No more white screens** on localhost updates  
✅ **Automatic refresh** when files change  
✅ **Seamless updates** for end users  
✅ **Better development experience** with auto-reload  
✅ **Production cache invalidation** handled automatically  
✅ **Performance optimized** cache strategy  

The cache management system now works automatically in both development and production, ensuring users always see the latest version without manual intervention.