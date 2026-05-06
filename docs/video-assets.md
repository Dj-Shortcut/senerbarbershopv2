# Video asset guidelines

Use video sparingly in the gallery and decorative sections. Posters should be the first visible asset, and videos should lazy-load only when the section is near the viewport.

## Required export settings

- Container: MP4 (`.mp4`)
- Codec: H.264 (`libx264`)
- Pixel format: `yuv420p`
- Framerate: `24` or `25` fps
- Audio: none (`-an`)
- Streaming optimization: `+faststart`
- Portrait max size: `540x960` (preferred) or `405x720`

## Practical rules

- Keep decorative videos silent. Remove audio tracks before adding files to `public/assets/video`.
- Keep clips short, ideally only long enough to show the haircut or ambience loop.
- Target a file size under a few MB per video.
- Default to `preload="none"` and load/play only the active video.
- Change filename when content changes (for immutable caching).

## Encoding helper

Use `scripts/encode-video.sh` when `ffmpeg` is available:

```bash
scripts/encode-video.sh input.mov public/assets/video/new-clip-v1.mp4
```

Optional size override (example 405x720):

```bash
scripts/encode-video.sh input.mov public/assets/video/new-clip-v1.mp4 405:720
```
