# Smart Basket — Shopping List Coding Challenge

A shopping list app built for the Cyber Media / Mayden developer coding challenge, allowing a shopper to build a list, track spend against a budget, and persist their basket between visits.

## Tech Stack

- **React 19** + **TypeScript** — chosen for type safety and fast iteration within the time box
- **Vite** — dev server and build tooling
- **Tailwind CSS v4** — utility-first styling
- **Vitest** + **React Testing Library** — unit/component testing

No backend — state is persisted client-side via `localStorage`, which was sufficient for the stories in scope (see below).

## Getting Started

\`\`\`bash
npm install
npm run dev       # starts the dev server (default: http://localhost:5173)
\`\`\`

## Running Tests

\`\`\`bash
npx vitest run
\`\`\`

## Build

\`\`\`bash
npm run build      # type-checks (tsc -b) then builds via Vite
npm run preview    # preview the production build locally
\`\`\`

## Lint

\`\`\`bash
npm run lint
\`\`\`

## Time Box

This submission was built within a ~6 hour time budget, as invited by the challenge brief. Rather than attempt all 10 stories shallowly, I prioritized fully implementing and testing a coherent subset.

## Stories Completed (8 of 10)

| # | Story | Status |
|---|-------|--------|
| 1 | View items on shopping list | ✅ Done |
| 2 | Add items to shopping list (with duplicate prevention) | ✅ Done |
| 3 | Remove items from shopping list | ✅ Done |
| 4 | Mark items as picked up / bought | ✅ Done |
| 5 | Persist list state between page visits | ✅ Done (localStorage) |
| 6 | Reorder items on the list | ✅ Done (up/down controls) |
| 7 | Total up the cost of the shop | ✅ Done |
| 8 | Spending limit with over-budget alert | ✅ Done |
| 9 | Share shopping list via email | ❌ Not attempted |
| 10 | User/password login protection | ❌ Not attempted |

## Why 9 and 10 Were Left Out

Stories 1–8 form a complete, self-contained client-side app and were achievable to a solid, tested standard within the time box.

Stories 9 and 10 are a different order of scope:

- **Story 9 (Email sharing)** requires either a mail-sending backend/API (to avoid exposing SMTP credentials client-side) or, as a lighter-weight approach, a `mailto:` link that pre-fills the list as the email body. Given more time, I'd implement the `mailto:` approach first as a pragmatic MVP, then consider a small serverless function (e.g. AWS Lambda/SES or a service like SendGrid) for a more polished version that doesn't rely on the user's local mail client being configured.
- **Story 10 (Login/auth)** requires user accounts, credential storage/hashing, session handling, and moving persistence from a single shared `localStorage` key to per-user storage — realistically a backend + auth provider (e.g. Supabase, Firebase Auth, or a custom Node/Express + JWT service). Bolting on a rushed auth layer felt like a worse outcome than being explicit about the scope, especially given the brief's emphasis on **secure** code — a half-implemented auth system would be a security liability, not an asset.

I'd rather submit 8 stories that are correct, tested, and secure than 10 where the last two are compromised.

## Testing Notes

Component tests cover:
- Empty state rendering
- Adding an item (name + cost)
- Reordering items via up/down controls

Not yet covered by automated tests (manually verified): remove item, toggle checked state, spending limit alert threshold. These would be the next tests I'd add if continuing.

## Known Limitations

- No drag-and-drop reordering — up/down buttons were chosen over a drag library to keep the dependency footprint small within the time box.
- No server-side persistence — list is scoped to a single browser via `localStorage`.
- No multi-user support (tied to story 10 being out of scope).