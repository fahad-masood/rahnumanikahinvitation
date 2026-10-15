Self-hosted invitation fonts
===========================

All fonts are distributed under the SIL Open Font License 1.1. The complete
copyright and license notices are included alongside the font files.

Source: Fontsource packages from https://registry.npmjs.org/, version 5.3.0.
Packages were downloaded with npm pack, preserving npm integrity verification.

cormorant-garamond-latin.woff2
  @fontsource-variable/cormorant-garamond
  files/cormorant-garamond-latin-wght-normal.woff2
  Latin subset; variable weight 300-700; normal; unmodified.

cormorant-garamond-latin-italic.woff2
  @fontsource-variable/cormorant-garamond
  files/cormorant-garamond-latin-wght-italic.woff2
  Latin subset; variable weight 300-700; italic; unmodified.

inter-latin.woff2
  @fontsource-variable/inter
  files/inter-latin-wght-normal.woff2
  Latin subset; variable weight 100-900; normal; unmodified.

amiri-arabic.woff2
  @fontsource/amiri
  files/amiri-arabic-400-normal.woff2
  Static weight 400; normal. Subset using fontTools 4.61.1 to exactly:
  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
  All layout features retained for Arabic shaping and diacritic placement.
  Rebuild command (fontTools and Brotli required):
  pyftsubset amiri-arabic-400-normal.woff2 \
    --text='بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' \
    --layout-features='*' --no-recalc-timestamp --flavor=woff2 \
    --output-file=amiri-arabic.woff2
  Expand the subset if introducing additional Arabic text.

great-vibes-latin.woff2
  @fontsource/great-vibes@5.3.0
  files/great-vibes-latin-400-normal.woff2
  Latin subset; static weight 400; normal; unmodified.
  Source: https://registry.npmjs.org/@fontsource/great-vibes/-/great-vibes-5.3.0.tgz
  Downloaded with npm pack, preserving npm integrity verification.
  Package SHA-1: 69fb0749c7ccc6a11c7364d1a9193aee7ba890f5
  Copyright and SIL Open Font License: LICENSE-Great-Vibes.txt.

Total WOFF2 size: 188,052 bytes (approximately 184 KiB).
