# BuildSpace design system

## Brand concept
Architectural blueprint meets modern luxury. The product should feel premium and trustworthy, with a deep ink base, warm paper surfaces, and a brass accent that resembles a craft tool or finished metal detail.

## Core tokens

### Color
- `ink-900`: #0b1220
- `ink-800`: #101827
- `paper-50`: #f5f1ea
- `metal-brass`: #d3a15f
- `muted-slate`: #b0becb
- `grid-line`: rgba(148, 163, 184, 0.22)
- `success`: #78c4a0
- `warning`: #f9b15d
- `danger`: #e76f6a

### Typography
- Headings: `Fraunces`, `Georgia`, serif
- UI: `Inter`, `Segoe UI`, sans-serif
- Hindi: `Noto Sans Devanagari`, `Nirmala UI`, sans-serif
- Figures: `SFMono-Regular`, `Consolas`, monospace

### Spacing
- `space-1`: 0.5rem
- `space-2`: 1rem
- `space-3`: 1.5rem
- `space-4`: 2rem
- `space-5`: 3rem

### Radius
- small: 12px
- medium: 18px
- large: 24px
- xl: 32px

### Shadow
- `soft`: 0 24px 60px rgba(15, 23, 42, 0.2)
- `lift`: 0 18px 32px rgba(11, 18, 32, 0.13)

### Motion
- duration: 180ms / 240ms / 320ms
- easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- respect `prefers-reduced-motion` and avoid large autoplay animation loops

## UI principles
- Calm, high-contrast cards on deep navy.
- Light surfaces used sparingly to signal emphasis and report sections.
- Blueprint grid texture layered in the background of premium cards.
- 3D depth via layered shadows, hover lift and subtle parallax.
- Accessible color contrast and focus ring treatments for keyboard users.

## Implementation notes
- Use Tailwind theme extension values for the above colors and shadows.
- Keep the dark and light theme variants visually aligned with the same tokens.
- Use glassmorphism only on accent surfaces where contrast remains accessible.
