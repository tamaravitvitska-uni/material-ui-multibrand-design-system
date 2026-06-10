# Migration notes

## From `tamaravitvitska-uni/material-ui` to this repository

The previous repository is a fork of upstream
[`mui/material-ui`](https://github.com/mui/material-ui) with no custom
commits. It was the right starting point for exploration, but maintaining a
fork of a ~10k-file library means rebasing onto every upstream release
forever, while everything a multi-brand system needs is achievable through
MUI's public theming APIs.

**This repository replaces the fork.** It depends on published
`@mui/material@^9.1` and contains only what is actually ours:

| Concern | Fork approach (before) | This repo (after) |
| --- | --- | --- |
| MUI source | Forked, would drift | npm dependency, upgradable |
| Brand styling | Would require editing component source | Themes + component overrides |
| Tokens | None | Figma exports → normalizer → typed tokens |
| Upgrades | Manual rebases | `npm update @mui/material` |

### What to do with the old fork

Nothing is migrated from it (there was nothing custom). Options:

- Keep it as a reference clone of upstream, or
- Archive/delete it to avoid confusion — recommended once this repo is live.

### Migrating an existing product app onto this system

1. `npm install @multibrand/design-system @mui/material@^9 @emotion/react @emotion/styled`
2. Wrap the app: `<ThemeProvider theme={getBrandTheme('<brand>')}>` + `<CssBaseline/>`.
3. Add the brand's Google Fonts link (`googleFontsUrl(['<brand>'])`).
4. Delete local `createTheme` calls and hardcoded values; replace with theme
   paths and `theme.tokens.*` (see `docs/ai-vibe-coding.md` checklist).
5. If the app used MUI ≤ v6: follow MUI's own v7→v9 migration first (notably:
   system props like `alignItems`/`textAlign` moved into `sx`,
   `ListItemText primaryTypographyProps` → `slotProps.primary`).

### Upgrading MUI later

The library pins `@mui/material ^9`. On a future major: bump the peer range,
run `npm run typecheck` (the augmentation + overrides surface breaking changes
immediately), and re-run the demo's visual pages per brand.
