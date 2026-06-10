# Publishing

## Repository → GitHub

The repo is git-initialized with a complete history-ready tree. To publish
under your account (`tamaravitvitska-uni`):

```bash
# created automatically if you used the assistant flow; otherwise:
gh repo create tamaravitvitska-uni/material-ui-multibrand-design-system \
  --private --source . --push \
  --description "Multi-brand Material UI design system driven by Figma variables (6 brands)"
```

Make it public when ready:

```bash
gh repo edit tamaravitvitska-uni/material-ui-multibrand-design-system --visibility public
```

Suggested repo settings:

- Default branch: `main`
- Topics: `design-system`, `material-ui`, `mui`, `design-tokens`, `figma`,
  `multibrand`, `react`
- Enable branch protection on `main` once collaborators join.

## Demo deployment (optional)

The demo is a static Vite build:

```bash
npm run build           # outputs apps/demo/dist
```

Deploy `apps/demo/dist` to Vercel/Netlify/GitHub Pages. For GitHub Pages set
Vite `base` in `apps/demo/vite.config.ts` to the repo path and add a SPA
fallback (Pages: copy `index.html` → `404.html`).

## npm package (optional, when you want apps to consume it)

`packages/design-system` is publish-ready (`tsup` build, exports map, files
whitelist, `prepublishOnly` regenerates tokens + dist):

```bash
cd packages/design-system
npm version <patch|minor|major>
npm publish --access public        # or publish to GitHub Packages
```

Until then, consume it as a workspace package or git dependency:

```json
"@multibrand/design-system": "github:tamaravitvitska-uni/material-ui-multibrand-design-system#main&path:packages/design-system"
```

(or use a `file:` path in a monorepo).

## Release flow for token updates

1. Designer re-exports Figma collections → replace
   `packages/design-system/tokens/figma-export/*.json`.
2. `npm run build:tokens && npm run typecheck`.
3. Review the generated diff (it reads like a changelog of design decisions).
4. Commit, PR, merge; bump the package version if published.
