# Navigation Spectrum Rail Design

## Goal

Refine the global navigation so its scrolled state feels light and deliberate, while the active section reads as a distinctive part of the HT Lab visual system.

## Visual Direction

Use a restrained "spectrum rail" rather than a solid generic pill. The header remains full width, but the scrolled surface has no hard top or bottom border. It uses a translucent theme-aware fill, backdrop blur, saturation, and one short diffuse shadow. The desktop links sit on a quiet inset rail.

Each section owns a two-color spectrum:

- Dev Zone: cyan to emerald
- Design Zone: pink to violet
- AI Lab: violet to cyan
- Growth Log: amber to teal
- Baby Zone: coral to mint

The active link uses its spectrum as a shared-layout indicator with a subtle inner highlight and outer glow. Inactive links retain neutral text and receive a low-contrast hover surface. The active treatment must remain readable in both themes without depending on color alone: it also changes fill, contrast, and elevation.

## Interaction

- At the page top, the header is transparent and has no edge lines.
- After 50px of scrolling, the header gains the lightweight scrolled surface and slightly tighter vertical spacing.
- The active indicator moves with the existing Framer Motion layout transition.
- Hover movement is removed from navigation links; hover feedback uses color and surface only.
- Reduced-motion users receive no header entrance slide or springing active indicator.
- The mobile menu uses the same section spectrum and exposes `aria-current="page"` for the active link.

## Scope

- Update `src/components/Navigation.tsx` for state classes, spectrum variables, reduced motion, and mobile active state.
- Add dedicated navigation styles to `src/styles/globals.css`.
- Extend `scripts/validate-fullsite.mjs` with source-level visual and accessibility contracts.
- Do not change route structure, labels, page content, or navigation behavior.

## Acceptance Criteria

- No `.glass` class or full border is used for the scrolled header.
- The scrolled header has no top border and no persistent hard bottom line.
- Every desktop and mobile active section has a zone-specific spectrum and `aria-current`.
- Desktop and mobile layouts have no horizontal overflow.
- Header states are verified at page top and after scrolling in a production browser build.
- Lint, TypeScript, full-site validation, and production build pass.
