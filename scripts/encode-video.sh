#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: scripts/encode-video.sh <input> <output> [size=540:960]"
  exit 1
fi

INPUT="$1"
OUTPUT="$2"
SIZE="${3:-540:960}"

ffmpeg -y -i "$INPUT" \
  -an \
  -r 25 \
  -vf "scale=${SIZE}:force_original_aspect_ratio=decrease,pad=${SIZE}:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -profile:v high \
  -preset slow \
  "$OUTPUT"
