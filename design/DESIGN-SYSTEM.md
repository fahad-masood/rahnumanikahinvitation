# The shared invitation identity

This source is the visual reference. Reuse it unchanged to preserve consistency across separately hosted invitations. Keep each event's content and published assets isolated.

## Palette

Every visible color is a shade of maroon or green. All authoritative values are CSS custom properties in `src/styles/tokens.css`.

| Token | Value | Purpose |
| --- | --- | --- |
| `--paper` | `#edf1e8` | Pale sage stationery |
| `--paper-deep` | `#e2e9dc` | Architectural illustration ground |
| `--maroon` | `#4f181d` | Reference-matched burgundy names, headings, primary actions, velvet invitation and closing panels |
| `--maroon-soft` | `#80515d` | Floral petals and ornament strokes |
| `--maroon-line` | `#b28f97` | Fine borders and architectural arch |
| `--forest` | `#183e34` | Botanical stems and supporting green accents |
| `--forest-deep` | `#123027` | Deep green supporting shade |
| `--green-muted` | `#536958` | Supporting text |
| `--sage` | `#b8c8ad` | Leaves and accents on dark surfaces |
| `--sage-light` | `#dce5d5` | Secondary text on dark surfaces |

## Typography and composition

Self-hosted Great Vibes forms the couple's and parents' names. Cormorant Garamond variable normal and italic form the editorial headings, quotes, and date numerals. Inter variable is reserved for labels, practical details, and controls. Amiri renders the exact Arabic opening; the included subset is specific to that text.

Use the paired Mughal arch lines, one upper-left L-shaped floral arrangement, thin double stationery borders, central rosette separators, and illustrated architecture. Burgundy panels use the lightweight local velvet image, recreated from the supplied visual reference, with `background-size: cover` and no tiling. The couple illustration follows the reference's rear-view pose and flowing bridal train. The date is always prominent. Content order is a centered arch hero, dark family invitation, scriptural excerpt, ceremonial date composition, location, maroon closing, and monogram footer. Names and date must fit the first invitation viewport on a narrow phone after the entrance opens.

A Mughal double-door entrance precedes this composition. The opening tap starts the music and swings the doors aside to reveal the invitation. Carved jali linework, sage borders, and the burgundy velvet reuse the same identity. Keyboard activation and reduced-motion preferences are supported; native disclosure provides access without JavaScript.

Controls are rectangular, at least 50 px high, with a solid maroon primary action and fine-line secondary action. Use restrained opacity/translation entrance motion, immediate content, and the existing reduced-motion override.

## Reuse

Copy `src/styles/`, `src/components/`, `public/fonts/`, and the page composition together. Copy the original editable social-card source and regenerate the card after changing event content. Keep only the current event's assets in the public build. Do not substitute typography, colors, decorative art, icon stroke weights, or spacing in a matching project.

Retest 320, 360, 375, 390, 430, 768, and 1440 px widths after content changes. Check names and date fit the first viewport, all links have visible focus, there is no horizontal overflow, Arabic retains shaping and vowel marks, and the reduced-motion and no-JavaScript experiences work.
