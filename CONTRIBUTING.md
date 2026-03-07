# Contributing

## Prerequisites

- Node.js `>=20`
- pnpm `>=10`

## Local setup

```bash
pnpm install
pnpm dev
```

## Quality checks

Run all quality gates before opening a pull request:

```bash
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
pnpm docs:build
```

## Pull requests

- Keep changes focused and atomic.
- Add tests for bug fixes and new behavior.
- Update docs when API or behavior changes.
- Use conventional commit style where possible (`feat:`, `fix:`, `docs:`, `chore:`).

## Release flow

- Tag releases using `v*` tags (for example: `v1.2.6`).
- CI will generate release notes and publish to npm (requires maintainer secrets).
