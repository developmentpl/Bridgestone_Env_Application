# Game assets

Drop files here and tell Claude — they'll be wired into the game.
Anything in `public/` is served by the website directly, e.g.
`public/assets/logo/logo.png` → shows at `http://localhost:3000/assets/logo/logo.png`

## Folders & naming

| Folder | What goes here | Naming |
|---|---|---|
| `cards/` | Artwork for individual life-cycle cards | `<item-key>-<number>.png` matching the card, e.g. `led-bulb-1.png`, `pcb-3.png` |
| `items/` | One icon/illustration per game item (used on home screen & round header) | `led-bulb.png`, `pcb.png`, `wooden-pallets.png`, `banana-peel.png`, `stretch-wrap.png`, `cotton-rags.png` |
| `backgrounds/` | Background images/patterns | any name |
| `logo/` | Game / company logo | `logo.png` (and `logo-dark.png` if needed) |
| `sounds/` | Sound effects (optional) | `correct.mp3`, `perfect.mp3`, `click.mp3` |

## Card numbering reference

- led-bulb: 1–8 (Raw Material Extraction → Environmental Impact)
- pcb: 1–7 (Silica & Metal Mining → Pyro-Metallurgical Smelting)
- wooden-pallets: 1–7 (Timber Logging → Biomass Fuel or Particleboard)
- banana-peel: 1–7 (Tropical Farming → Factory Landscaping)
- stretch-wrap: 1–7 (Crude Oil Extraction → Plastic Pelletizing)
- cotton-rags: 1–6 (Cotton Farming → Co-Processing Incineration)

PNG with transparent background works best for cards/items/logo. Square images
(e.g. 512×512) are ideal for card artwork.
