// Font IDs match SA-MP TextDrawFont() values (0–4)
// Files live in src/resources/fonts/
//   diploma.ttf         → GTASANormal (font 0 Normal, font 1 Italic)
//   BankGothicMediumBT.ttf → GTASAClear (font 2 Clear Uppercase)
//   Pricedown_Bl.otf    → GTASABold   (font 3 Bold/Title)

export const FONTS = [
  { id: 0, name: 'TEXT_DRAW_FONT_0',          family: 'GTASANormal' },
  { id: 1, name: 'TEXT_DRAW_FONT_1',   family: 'GTASANormal2'},
  { id: 2, name: 'TEXT_DRAW_FONT_2', family: 'GTASAClear' },
  { id: 3, name: 'TEXT_DRAW_FONT_3',     family: 'GTASABold' },
  { id: 4, name: 'TEXT_DRAW_FONT_SPRITE_DRAW',  family: 'monospace' },
  { id: 5, name: 'TEXT_DRAW_FONT_MODEL_PREVIEW ',  family: 'monospace' },
]

export const FONT_NAMES = FONTS.map(f => f.name)


