#!/usr/bin/env bash
# _lib.sh — shared helpers for the sensai-org summary jobs (daily / weekly).
# Sourced by summaries/bin/daily and summaries/bin/weekly. No side effects on source.

# Repo root = two levels up from this lib (summaries/bin/ -> repo root).
summary_repo_root() { (cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd); }

# extract_md_section <file> <heading>
# Prints the lines under a "## <heading>" section up to the next "## " header.
extract_md_section() {
  local file="$1" heading="$2"
  [ -f "$file" ] || return 0
  awk -v h="## $heading" '
    $0==h { grab=1; next }
    /^## / { if (grab) grab=0 }
    grab { print }
  ' "$file"
}

# git_commits <root> <after> <before>  → markdown bullet list of commits in range
git_commits() {
  git -C "$1" log --after="$2" --before="$3" --pretty='- `%h` %s _(%an, %ad)_' --date=short 2>/dev/null || true
}

# git_files <root> <after> <before> [path-prefix]  → unique changed files in range
git_files() {
  local out
  out="$(git -C "$1" log --after="$2" --before="$3" --name-only --pretty=format: 2>/dev/null | sed '/^$/d' | sort -u || true)"
  [ -n "${4:-}" ] && out="$(printf '%s\n' "$out" | grep -E "^$4" || true)"
  printf '%s\n' "$out"
}

# section <title> <body>  → prints a markdown section, or a "_None._" placeholder.
section() {
  printf '## %s\n\n' "$1"
  if [ -n "$2" ]; then printf '%s\n\n' "$2"; else printf '_None._\n\n'; fi
}
