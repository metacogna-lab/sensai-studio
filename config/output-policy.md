# Output Policy

Formatting standards and quality gates for all wiki content.

## Formatting rules

1. **Frontmatter required.** Every wiki page must start with valid YAML frontmatter matching `config/wiki-schema.md`.
2. **CommonMark.** Use standard CommonMark markdown. No proprietary extensions.
3. **Language-tagged code blocks.** All fenced code blocks must specify a language.
4. **Internal links.** Use `[[wikilinks]]` for cross-references within the wiki.
5. **Provenance.** Every claim MAY cite its source. Use inline `[source](url)` or a `## Sources` section at the bottom.

## Quality gates

Content reaches `verified` status only when:

- [ ] Frontmatter is valid (title, type, status, created, updated)
- [ ] Type is one of the defined types in wiki-schema.md
- [ ] Body is non-empty
- [ ] All `[[wikilinks]]` point to existing wiki pages (warning, not blocker)
- [ ] No placeholder content (e.g. `TODO`, `lorem ipsum`, empty sections)

## Prohibited in outputs/

- Raw scrapes or unprocessed extracts
- Content with status `draft`
- Files without frontmatter
- Binary files (except those referenced by path)

## Move semantics

Always **move** files between pipeline directories (`raw/` → `processed/` → `outputs/`). Never copy — there should be exactly one canonical location for each wiki page.
