# HT Lab Home Pixi Enhancement Design

> Status: proposed
> Date: 2026-06-26
> Scope: Home hero and current home entry cards only

## Summary

Use PixiJS as a restrained, optional atmosphere layer on the HT Lab home page. The home page must remain a DOM-first portfolio experience: readable, accessible, responsive, crawlable, and complete without Canvas. Pixi is allowed only as a desktop-only visual enhancement that suggests engineering polish without becoming the main subject.

The design intentionally does not use Pixi `html-source` or HTML-in-Canvas in the MVP. That feature is experimental and belongs behind a later lab flag, not in the home page core path.

## Context

The referenced article discusses PixiJS v8.19.0 and `pixi.js/html-source`, which can connect DOM-like HTML rendering with Pixi's renderer when browser support exists. The idea is interesting for future experiments, but it is not mature enough for the primary portfolio surface.

Current HT Lab is a Next 15 / React 19 site with GSAP, Framer Motion, Tailwind v4, `next-intl`, terminal boot, home hero, four entry cards, and separate Dev / Design / AI / Growth pages. The existing site direction is restrained cinematic tech: terminal, lab, portfolio archive, glass layers, fine grid, low-saturation glow, and smooth scroll.

Multi-agent review found the initial idea too visually busy when it included a control surface, Pixi render console, independent visual themes for each entry card, micro progress bars, DOM texture projection, and hover previews. This design adopts the review outcome and keeps the homepage focused on identity, work, and navigation.

Implementation note: the current site includes a fifth `Baby Zone` home entry. This design must preserve that existing route and apply the same restrained zone tile rules to all current home entry cards. It must not remove `Baby Zone`.

## Goals

- Make the first viewport feel more memorable without turning it into a tech demo.
- Keep HT's identity, capability, portfolio entries, and CTA more important than effects.
- Improve the home entry cards so they feel polished and connected to the brand.
- Use Pixi only where it is easy to disable, degrade, and remove.
- Preserve SEO, accessibility, internationalization, mobile usability, and page performance.

## Non-Goals

- Do not redesign the four subpages in this phase.
- Do not make Pixi or HTML-in-Canvas the home page's core value proposition.
- Do not render text, buttons, links, or navigation inside Canvas.
- Do not use `pixi.js/html-source` in the MVP.
- Do not add DOM texture projection, floating card previews, card shatter effects, or fake progress bars.
- Do not create unrelated visual worlds on the home entry cards.

## Design Direction

The updated home page should read as a refined portfolio lab, not a game HUD or dashboard.

### Hero

The hero keeps a clear left-side story:

- HT Lab identity.
- A direct capability statement.
- Short supporting copy.
- Primary CTA to view work.
- Secondary CTA to learn more or contact.
- Existing stats may remain if they reinforce credibility.

The right-side panel becomes a quieter "ambient lab field" rather than a command console. It can show a compact mission summary or selected signals, but it must not compete with the title and CTAs. Pixi, when available, sits behind or around this panel as subtle low-contrast light, particles, or connection lines.

Avoid using "Control Surface" as the main concept in visible copy. It may inform the styling, but visitors should not need to understand an internal metaphor before they understand the portfolio.

### Entry Cards

The home entry cards become a unified set of "zone tiles":

- Same structure, spacing, radius, border behavior, and motion timing.
- One icon per card.
- One small number or label per card.
- One result-oriented description explaining what the visitor gets by clicking.
- One accent color per card, kept low saturation.
- One hover/focus feedback: edge glow or soft background response.

The zones may still have different personality, but only through restrained tokens:

- Dev Zone: cool blue/green accent.
- Design Zone: rose/orange accent.
- AI Lab: violet/cyan accent.
- Growth Log: amber/teal accent.
- Baby Zone: rose/teal accent.

No card should contain a fake completion percentage, progress bar, or unrelated system status unless it represents real content.

### Pixi Layer

`CanvasLabLayer` is an optional atmosphere component:

- Desktop only.
- Client only.
- Loaded after the DOM page is already useful.
- `aria-hidden="true"`.
- `pointer-events: none`.
- No text, links, buttons, or critical state.
- Limited to abstract light fields, low-density particles, or subtle zone color responses.

The visual should be noticeable as polish but not identifiable as a separate feature. A visitor should remember "the site feels refined" rather than "the site used Pixi."

## Technical Design

### Component Boundaries

Add an isolated client-only component:

- `src/components/CanvasLabLayer.client.tsx`

Integrate it through a dynamic import from a small wrapper or directly in the relevant home component:

- `next/dynamic(..., { ssr: false })`

No `pixi.js` imports are allowed at module top level outside `CanvasLabLayer.client.tsx`, and even inside that component the Pixi import should happen after runtime gating passes.

### Runtime Gating

Pixi loading must be skipped before import when any of these are true:

- Viewport is mobile or narrow.
- Pointer is not fine.
- `prefers-reduced-motion: reduce`.
- Save-Data is enabled.
- Canvas or WebGL support is unavailable.
- The enhancement flag is disabled.

The page must look complete when the layer never loads.

### Feature Flags

Use conservative flags:

- `NEXT_PUBLIC_ENABLE_PIXI_HOME_LAYER` controls the ambient Pixi layer.
- `NEXT_PUBLIC_EXPERIMENT_HTML_SOURCE` is reserved for future lab experiments and remains off for this MVP.

The MVP should not import `pixi.js/html-source` even when Pixi atmosphere is enabled.

### Failure Behavior

All Pixi import, application creation, renderer setup, resize handling, and animation setup must be wrapped so failure only hides the Canvas layer. The failure must not break hydration, layout, routing, links, or page animation.

Cleanup must handle React Strict Mode:

- Destroy the Pixi application.
- Stop tickers.
- Remove resize and visibility listeners.
- Release created graphics/textures.
- Pause rendering when the document is hidden.

### Animation Ownership

Keep animation systems separated:

- React owns entry card hover/focus state.
- CSS / Framer Motion / GSAP owns DOM card motion.
- Pixi consumes only simplified state such as active zone id and accent color.
- Pixi must not read DOM layout every frame.

Fallback and Pixi-enhanced versions should share CSS variables or token values so the visual language does not drift.

## Accessibility

- All meaningful content remains in semantic DOM.
- Entry cards remain actual links with keyboard focus states.
- Hover effects must have focus equivalents.
- Canvas is decorative and hidden from assistive technology.
- Reduced motion disables Pixi and any non-essential pulsing or particle movement.

## Performance Budget

The MVP should keep the Canvas layer small and conservative:

- Do not block first content paint or primary hero content.
- Load Pixi after the first useful paint, preferably during idle time.
- Cap device pixel ratio for the Canvas layer.
- Keep particle count low.
- Avoid large textures.
- Pause when hidden.
- Disable automatically if initialization is slow or unsupported.

## Content Priority

Before visual effects, the homepage must clearly communicate:

- HT's primary role and capability.
- What the visitor can inspect in Dev Zone.
- How Design Zone relates to Mrs. T and the HT Lab collaboration.
- AI Lab as experiments and workflow learning.
- Growth Log as learning record and credibility trail.
- A clear primary path to view work and a secondary path to contact or learn more.

The order of emphasis should be:

1. Identity and credibility.
2. Work and capability entry points.
3. Collaboration and personality.
4. Experimental polish.

## Acceptance Criteria

- Home page is complete with JavaScript disabled for Pixi or with Pixi failing to load.
- No `pixi.js/html-source` import exists in the MVP.
- No visible fake progress bars on home entry cards.
- No DOM texture projection or floating card previews.
- Home entry cards use one unified structure and motion language.
- Mobile does not load Pixi.
- `prefers-reduced-motion` does not load Pixi.
- Canvas is `aria-hidden` and has `pointer-events: none`.
- Keyboard focus on cards is visible and triggers the same class of feedback as hover.
- `/zh` and `/en` still communicate equivalent content.
- `npm run build` passes.
- The final visual check confirms the page feels refined rather than busy.

## Future Experiments

After the home MVP is stable, explore `pixi.js/html-source` only inside AI Lab or a dedicated experiment page. That experiment should be gated behind `NEXT_PUBLIC_EXPERIMENT_HTML_SOURCE=1`, feature-detect browser support, and never replace core DOM content.

Possible later experiments:

- A small AI Lab demo card showing HTML-in-Canvas support status.
- A controlled Pixi scene that mirrors a non-critical DOM panel.
- A browser support explainer for Canvas / WebGL / HTMLSource capabilities.

These are explicitly out of scope for the home page MVP.
