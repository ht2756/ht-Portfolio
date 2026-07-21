# Navigation Spectrum Rail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the heavy bordered scrolled header and generic active pill with a lightweight, zone-specific spectrum rail.

**Architecture:** Keep scroll and route state in `Navigation.tsx`. The component exposes semantic state through dedicated class names, `data-scrolled`, and per-item CSS custom properties; `globals.css` owns the visual rendering so theme and responsive behavior stay centralized.

**Tech Stack:** Next.js 15, React 19, next-intl navigation, Framer Motion, Tailwind CSS 4, CSS custom properties.

---

### Task 1: Add the Navigation Visual Contract

**Files:**
- Modify: `scripts/validate-fullsite.mjs`

- [ ] Add source checks requiring `nav-shell`, `nav-rail`, `nav-active-indicator`, per-item spectrum variables, reduced-motion handling, and mobile `aria-current`.
- [ ] Add a regression check rejecting the old `glass shadow-lg` scrolled state.
- [ ] Run `npm run validate:fullsite` and confirm it fails only for the missing navigation redesign.

### Task 2: Implement the Spectrum Rail

**Files:**
- Modify: `src/components/Navigation.tsx`
- Modify: `src/styles/globals.css`

- [ ] Add spectrum colors to each `navItems` entry and pass them through `--nav-from` and `--nav-to`.
- [ ] Replace the generic scrolled classes with `nav-shell` and `data-scrolled`.
- [ ] Add a theme-aware borderless scrolled surface, diffuse shadow, quiet desktop rail, spectrum active indicator, and keyboard focus styles.
- [ ] Add the same active semantics and spectrum identity to mobile links.
- [ ] Use `useReducedMotion` to disable header entrance and active-indicator spring motion when requested.
- [ ] Run `npm run validate:fullsite`, `npm run lint`, and `npx tsc --noEmit --incremental false --pretty false` and confirm they pass.

### Task 3: Production Browser Verification

**Files:**
- No source changes expected.

- [ ] Stop the existing production server, move the old `.next` directory aside, and run `npm run build`.
- [ ] Start `npm run start -- --port 3000`.
- [ ] At 1440x900, verify the top header has no visible edge line, scroll past 50px, and verify the scrolled surface remains light with the active spectrum visible.
- [ ] Verify active states on Dev Zone, Design Zone, AI Lab, Growth Log, and Baby Zone.
- [ ] At 390x844, verify the header and mobile menu have no horizontal overflow and the active route is distinct.
- [ ] Confirm browser console errors and warnings are empty, then retain the production server for user review.
