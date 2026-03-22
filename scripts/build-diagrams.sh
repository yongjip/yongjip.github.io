#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIAGRAM_DIR="$ROOT_DIR/resources/diagrams"
CONFIG_FILE="$DIAGRAM_DIR/mermaid-config.json"
NPM_CACHE_DIR="${NPM_CONFIG_CACHE:-/tmp/npm-cache}"
MERMAID_HOME_DIR="${HOME:-/tmp}/.mermaid-build-home"

if [[ -z "${PUPPETEER_EXECUTABLE_PATH:-}" ]]; then
  if [[ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]]; then
    export PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  elif [[ -x "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary" ]]; then
    export PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary"
  fi
fi

if [[ -z "${PUPPETEER_EXECUTABLE_PATH:-}" ]]; then
  echo "Chrome executable not found. Set PUPPETEER_EXECUTABLE_PATH before running this script." >&2
  exit 1
fi

export NPM_CONFIG_CACHE="$NPM_CACHE_DIR"
export HOME="$MERMAID_HOME_DIR"

mkdir -p "$NPM_CONFIG_CACHE" "$HOME"

render_diagram() {
  local input_name="$1"
  local output_name="$2"

  npx --yes @mermaid-js/mermaid-cli \
    -i "$DIAGRAM_DIR/$input_name" \
    -o "$DIAGRAM_DIR/$output_name" \
    -c "$CONFIG_FILE" \
    -w 1400 \
    -s 2 \
    -b transparent \
    -q
}

render_diagram "text-to-sql-en.mmd" "text-to-sql-en.png"
render_diagram "text-to-sql-ko.mmd" "text-to-sql-ko.png"
render_diagram "warehouse-en-desktop.mmd" "warehouse-en-desktop.png"
render_diagram "warehouse-en-mobile.mmd" "warehouse-en-mobile.png"
render_diagram "warehouse-ko-desktop.mmd" "warehouse-ko-desktop.png"
render_diagram "warehouse-ko-mobile.mmd" "warehouse-ko-mobile.png"
