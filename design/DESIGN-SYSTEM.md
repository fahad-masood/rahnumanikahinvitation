# The shared invitation identity

This source is the visual reference. Reuse it unchanged to preserve consistency across separately hosted invitations. Keep each event's content and published assets isolated.

## Palette

Every visible color is a shade of maroon or green. All authoritative values are CSS custom properties in `src/styles/tokens.css`.

| Token | Value | Purpose |
| --- | --- | --- |
| `--paper` | `#edf1e8` | Pale sage stationery |
| `--paper-deep` | `#e2e9dc` | Architectural illustration ground |
| `--maroon` | `#592637` | Names, headings, primary actions, closing |
| `--maroon-soft` | `#80515d` | Floral petals and ornament strokes |
| `--maroon-line` | `#b28f97` | Fine borders and architectural arch |
| `--forest` | `#183e34` | Formal invitation panel, botanical stems |
| `--forest-deep` | `#123027` | Deep green supporting shade |
| `--green-muted` | `#536958` | Supporting text |
| `--sage` | `#b8c8ad` | Leaves and accents on dark surfaces |
| `--sage-light` | `#dce5d5` | Secondary text on dark surfaces |

## Typography and composition

Self-hosted Cormorant Garamond variable normal and italic form the names, editorial headings, quotes, and date numerals. Inter variable is reserved for labels, practical details, and controls. Amiri renders the exact Arabic opening; the included subset is specific to that text.

Use the paired Mughal arch lines, corner florals, thin double stationery borders, central rosette separators, and illustrated architecture. The date is always prominent. Content order is a centered arch hero, dark family invitation, scriptural excerpt, ceremonial date composition, location, maroon closing, and monogram footer. Names and date must be readable immediately on a narrow phone.

Controls are rectangular, at least 50 px high, with a solid maroon primary action and fine-line secondary action. Use restrained opacity/translation entrance motion, immediate content, and the existing reduced-motion override.

## Reuse

Copy `src/styles/`, `src/components/`, `public/fonts/`, and the page composition together. Copy the original editable social-card source and regenerate the card after changing event content. Keep only the current event's assets in the public build. Do not substitute typography, colors, decorative art, icon stroke weights, or spacing in a matching project.

Retest 320, 360, 375, 390, 430, 768, and 1440 px widths after content changes. Check names and date fit the first viewport, all links have visible focus, there is no horizontal overflow, Arabic retains shaping and vowel marks, and the reduced-motion and no-JavaScript experiences work.
