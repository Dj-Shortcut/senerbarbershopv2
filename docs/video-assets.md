# Video asset guidelines

Use video sparingly in the gallery and decorative sections. Posters should be the first visible asset, and videos should lazy-load only when the section is near the viewport.

- Keep decorative videos silent. Remove audio tracks before adding files to `public/assets/video`.
- Use 720p as the maximum resolution for background and gallery videos.
- Keep clips short, ideally only long enough to show the haircut or ambience loop.
- Target a file size under a few MB per video.
- Default to `preload="none"` and load/play only the active video.
