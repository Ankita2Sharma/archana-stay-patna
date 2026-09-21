/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#f9f6f1",
      "foreground": "#19263e",
      "border": "#e4ddd3",
      "card": "#fdfdfc",
      "cardForeground": "#19263e",
      "popover": "#fdfdfc",
      "popoverForeground": "#19263e",
      "primary": "#152f60",
      "primaryForeground": "#fdfdfc",
      "secondary": "#f2ede3",
      "secondaryForeground": "#19263e",
      "muted": "#eeeae3",
      "mutedForeground": "#617089",
      "accent": "#d7a028",
      "accentForeground": "#11254b",
      "destructive": "#ba332c",
      "destructiveForeground": "#fdfdfc",
      "input": "#e4ddd3",
      "ring": "#d7a028",
      "chart1": "#152f60",
      "chart2": "#d7a028",
      "chart3": "#617089",
      "chart4": "#ba332c",
      "chart5": "#2f7d78",
      "sidebar": "#f2ede3",
      "sidebarForeground": "#19263e",
      "sidebarBorder": "#e4ddd3",
      "sidebarPrimary": "#152f60",
      "sidebarPrimaryForeground": "#fdfdfc",
      "sidebarAccent": "#eeeae3",
      "sidebarAccentForeground": "#11254b",
      "sidebarRing": "#d7a028"
    },
    "dark": {
      "background": "#0f1624",
      "foreground": "#f8f3e8",
      "border": "#2f3b51",
      "card": "#151f32",
      "cardForeground": "#f8f3e8",
      "popover": "#151f32",
      "popoverForeground": "#f8f3e8",
      "primary": "#ddad46",
      "primaryForeground": "#0f1624",
      "secondary": "#253146",
      "secondaryForeground": "#f8f3e8",
      "muted": "#253146",
      "mutedForeground": "#c2baad",
      "accent": "#ddad46",
      "accentForeground": "#0f1624",
      "destructive": "#cf554d",
      "destructiveForeground": "#f8f3e8",
      "input": "#2f3b51",
      "ring": "#ddad46",
      "chart1": "#ddad46",
      "chart2": "#6eb3ad",
      "chart3": "#c2baad",
      "chart4": "#cf554d",
      "chart5": "#6e91c8",
      "sidebar": "#151f32",
      "sidebarForeground": "#f8f3e8",
      "sidebarBorder": "#2f3b51",
      "sidebarPrimary": "#ddad46",
      "sidebarPrimaryForeground": "#0f1624",
      "sidebarAccent": "#253146",
      "sidebarAccentForeground": "#f8f3e8",
      "sidebarRing": "#ddad46"
    }
  },
  "fontFamily": {
    "sans": [
      "DM Sans",
      "sans-serif"
    ],
    "serif": [
      "Fraunces",
      "serif"
    ],
    "mono": [
      "DM Sans",
      "sans-serif"
    ]
  },
  "radius": "1rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
