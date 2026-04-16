# Akuuva Landing — Claude Instructions

## Design System

Always read `DESIGN.md` before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.

When reviewing or writing CSS:
- Use the CSS variables defined in `:root` — never hardcode hex values that exist in the palette.
- Default page background is `var(--bg)` (#F5F1E8), not white.
- Primary CTA color is always `var(--terra)` (#C96A3D).
- Headings use `text-wrap: balance`.
- All numeric data needs `font-variant-numeric: tabular-nums`.

In QA mode, flag any code that doesn't match DESIGN.md.
