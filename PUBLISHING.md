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

## Demo deployment — GitHub Pages (configured)

The demo is published at
**https://tamaravitvitska-uni.github.io/material-ui-multibrand-design-system/**
from the `gh-pages` branch (GitHub Pages requires a public repo on the free
plan). The router picks up the subpath automatically (`BrowserRouter
basename` from Vite's `BASE_URL` in `apps/demo/src/main.tsx`).

Re-deploy after changes:

```bash
npm run build:tokens
npm run build -w demo -- --base=/material-ui-multibrand-design-system/
cp apps/demo/dist/index.html apps/demo/dist/404.html   # SPA fallback
touch apps/demo/dist/.nojekyll
TMP=$(mktemp -d) && cp -R apps/demo/dist/. "$TMP" && \
  git -C "$TMP" init -q -b gh-pages && git -C "$TMP" add -A && \
  git -C "$TMP" commit -qm "Deploy demo" && \
  git -C "$TMP" push -f https://github.com/tamaravitvitska-uni/material-ui-multibrand-design-system.git gh-pages && \
  rm -rf "$TMP"
```

### Optional: automatic deploys on every push

A ready Actions workflow exists locally at
`.github/workflows/deploy-pages.yml` but pushing workflow files needs the
`workflow` OAuth scope. To enable auto-deploys:

```bash
gh auth refresh -h github.com -s workflow      # one-time, opens browser
gh api -X PUT repos/tamaravitvitska-uni/material-ui-multibrand-design-system/pages -f build_type=workflow
git add .github/workflows/deploy-pages.yml && git commit -m "Add Pages deploy workflow" && git push
```

To deploy elsewhere (Vercel/Netlify), build with the default base
(`npm run build`) and serve `apps/demo/dist`.

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
