# Moodmeter System Documentation

This document describes the Moodmeter Svelte application, responsible for collecting and surfacing the office mood for the current day. Use it as the single source of truth for architecture, runtime behavior, and operational guidance.

## 1. Product Overview
- **Goal**: let each visitor vote on their current mood with a 1-5 emoji scale and surface the dominant sentiment.
- **Target users**: people in the office who want a quick pulse on the collective mood.
- **Key UX points**: animated background, responsive layout, optimistic feedback after voting, and prominent “mood of the day” headline.

## 2. Technology Stack
- **Framework**: SvelteKit 2 + Vite 7 (ESM only).
- **Language**: TypeScript across components, stores, and services.
- **Styling**: Tailwind-style utility classes (no Tailwind runtime; classes are inlined).

## 3. Architecture & Data Flow
- **Component tree**: `+page.svelte` → `TodaysMood` (read-only headline) + `Moodmeter` (interactive input) + `Loader`.
- **State (`src/stores/store.ts`)**:
	- `todaysMood: Writable<number[]>` holds all recorded values for the current day.
	- `emojis: Writable<Mood[]>` defines the selectable emoji/value pairs.
	- `haveClicked: Writable<boolean>` gates duplicate submissions and drives thank-you state.
	- `isLoading: Writable<boolean)` keeps UI loading guard while local storage initializes.
- **Service (`src/services/moodService.ts`)**:
	- `currentMood(values)` calculates the statistically dominant emoji via frequency counting.
	- `clickHandler(value)` mutates stores, persists to local storage, and throttles re-submissions for 3 seconds.
	- `getLocalStorage()` restores the last persisted votes if they have not expired.
- **Data lifecycle**:
	1. User clicks an emoji → `clickHandler` pushes value into `todaysMood` and sets `haveClicked`.
	2. `TodaysMood` reacts to `$todaysMood` updates and calls `currentMood` to refresh the displayed emoji.
	3. Values are persisted in `localStorage` with an expiry timestamp at 23:59:59 local time.
	4. On mount, `Moodmeter` loads `localStorage` and seeds `todaysMood`, clearing the loader once complete.

## 4. Business Rules & Constraints
- A person is allowed to vote multiple times, but the UI locks for 3 seconds after each submission to discourage spamming.
- Mood history is per-browser and resets daily at local midnight.
- If no votes are recorded, the headline displays the fallback text `"Ingen har avgitt stemme for idag"` with a smaller font.
- The dominant mood is computed purely on count frequency; ties default to the first encountered value in the data array.

## 5. Local Development
1. Install Node.js and a package manager (`npm`, `pnpm`, or `yarn`).
2. Install dependencies: `npm install`.
3. Start the dev server: `npm run dev` for auto-launch in a browser.
4. Visit the printed localhost URL (default `http://localhost:5173`).

### Workspace Layout
```
src/
	components/      # UI building blocks such as Moodmeter and TodaysMood
	routes/          # SvelteKit route entrypoints (currently only +page)
	services/        # Stateless helpers for business logic and persistence
	stores/          # Svelte writable stores for shared state
	types/           # Shared TypeScript contracts
static/            # Public assets (robots.txt)
build/             # Production artefacts after `npm run build`
```

## 6. Deployment Guidance
- Run `npm run build`; the resulting Node handler lives under `build/`.
- Deploy the `build/` output with Node 18+ using the adapter-node server entry (`build/index.js`).
- Ensure the server can persist no data—mood history is client-side only. If multi-user aggregation is required, introduce an API and shared database before deployment.

## 7. Quality & Monitoring
- Static analysis: rely on `npm run check` locally or in CI.
- Manual QA: exercise voting flow across desktop and mobile breakpoints, verifying that duplicate submissions are rate-limited and midnight reset works (mock by adjusting system clock or overriding `expiresAt`).
- Logging/metrics: none today; add browser analytics or server logs if the system evolves beyond client-only persistence.

## 8. Troubleshooting
- **No emojis render**: confirm `emojis` store is populated; check for TypeScript build errors in `stores/store.ts`.
- **Mood never loads**: local storage may contain corrupt JSON—clear `localStorage.todaysMood` via devtools.
- **Build fails with ESM complaints**: verify Node 18+ and that `type` remains `module` in `package.json`.
- **Adapter mismatch**: if deploying to environments without Node, switch to a fitting adapter (`@sveltejs/adapter-static`, Cloudflare, etc.) and re-run `npm run build`.

## 9. Future Enhancements (Backlog)
- Display historical charts for previous days.

