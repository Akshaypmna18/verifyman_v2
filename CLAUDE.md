# Verifyman Mobile — CLAUDE.md

> **Read this before touching any file.** This doc is the single source of truth for architecture, design tokens, component catalogue, screen specs, and coding conventions. Keep it updated as the project evolves.

---

## What this app is

Verifyman (https://verifyman.in) is a B2B background-verification SaaS for Indian companies. The mobile app is the HR team's companion — submit candidates, track verification requests, review reports, and manage alerts on the go.

**Core services the app surfaces:**
- Identity verification (Aadhaar, PAN, Passport, DL)
- Employment verification
- Education verification
- Address verification
- Criminal background check
- Police clearance certificate

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React Native 0.83 + Expo SDK 55 (New Architecture) |
| Router | Expo Router v4 (file-based, `app/` directory) |
| Styling | NativeWind v4 (Tailwind CSS utility classes on RN) |
| UI components | React Native Reusables (shadcn-style headless) |
| Icons | `lucide-react-native` |
| State | Local `useState` / `useReducer` for now (no global store yet) |
| Package manager | pnpm |

---

## Directory structure

```
verifyman/
├── app/                   # Expo Router screens (each file = a route)
│   ├── _layout.tsx        # Root layout — NativeTabs + ThemeProvider + PortalHost
│   ├── index.tsx          # Home / Dashboard
│   ├── requests.tsx       # Requests list
│   ├── services.tsx       # Verification services catalogue
│   ├── alerts.tsx         # Notifications / alerts feed
│   ├── profile.tsx        # User profile + settings
│   ├── reports.tsx        # Reports viewer (stub — Coming soon)
│   ├── settings.tsx       # App settings (stub — Coming soon)
│   ├── new-request.tsx    # New verification wizard (stub — Coming soon, reads ?service=)
│   └── request/[id].tsx   # Request detail (stub — Coming soon)
├── components/
│   ├── PageHeader.tsx     # Top nav bar (logo + bell + avatar) — also exports BackHeader
│   ├── screen.tsx         # Screen wrapper (safe area + optional scroll)
│   └── ui/
│       ├── alert-row.tsx      # Notification feed row (icon + title + body + time)
│       ├── button.tsx         # CVA button with variants
│       ├── card.tsx           # Card / CardHeader / CardContent / CardFooter
│       ├── empty-state.tsx    # Centered icon + title + description (empty/coming-soon)
│       ├── fab.tsx            # Floating Action Button
│       ├── icon-chip.tsx      # Rounded icon container with tone colours
│       ├── icon.tsx           # (thin wrapper if needed)
│       ├── list-row.tsx       # Settings/menu row (icon-chip + label + value + chevron)
│       ├── request-card.tsx   # Candidate verification card
│       ├── section-header.tsx # Section title + optional action link
│       ├── segmented-control.tsx  # Pill tab switcher
│       ├── service-card.tsx   # Service catalogue grid card
│       ├── stat-card.tsx      # KPI metric tile
│       ├── status-badge.tsx   # running / done / flag / unknown pill
│       ├── sticky-sub-header.tsx  # Card-coloured bar pinned below PageHeader
│       ├── text.tsx           # Text with TextClassContext
│       └── v-logo.tsx         # Verifyman wordmark — real SVG assets, theme-swapped
├── lib/
│   ├── theme.ts           # THEME + NAV_THEME (colour tokens as JS)
│   └── utils.ts           # cn() helper (clsx + twMerge)
├── global.css             # CSS custom properties (light + dark)
└── tailwind.config.js     # Extends NativeWind preset with brand tokens
```

---

## Design tokens

All colours are CSS custom properties consumed via Tailwind utilities. **Always use semantic tokens, never raw hex.**

### Semantic palette (light / dark in `global.css`)

| Token | Light | Dark | Use for |
|---|---|---|---|
| `background` | white | near-black | Screen backgrounds |
| `foreground` | dark navy | near-white | Primary text |
| `card` | white | dark slate | Card surfaces |
| `card-foreground` | dark navy | near-white | Text on cards |
| `primary` | `hsl(143 82% 36%)` (brand green) | same | CTAs, active icons |
| `primary-foreground` | white | white | Text on primary bg |
| `secondary` | very light blue-grey | very dark | Chip backgrounds, outlines |
| `muted` | light blue-grey | very dark | Subtle backgrounds |
| `muted-foreground` | medium grey | lighter grey | Secondary text, placeholders |
| `accent` | very light green | very dark green | Hover / active tints |
| `destructive` | red | brighter red | Errors, flag status |
| `border` | light grey | dark grey | Dividers, card borders |

### Brand extension colours

```js
brand: {
  DEFAULT: 'hsl(143 82% 36%)',   // same as primary — use `text-primary`, `bg-primary`
  hover:   'hsl(143 82% 30%)',
  accent:  'hsl(161 100% 33%)',
}
```

### IconChip tones (maps to `tone` prop)

| tone | Background | Text | Semantic meaning |
|---|---|---|---|
| `brand` | light green | dark green | Identity, general |
| `amber` | light amber | dark amber | Warning, pending, address |
| `slate` | secondary | muted-foreground | Neutral, unknown |
| `blue` | light sky | dark sky | Employment, info |
| `red` | red/10 | destructive | Errors, criminal/flag |

---

## Component catalogue

### `<PageHeader />` — `components/PageHeader.tsx`

Top navigation bar. Always used at the top of every main tab screen.

```tsx
<PageHeader
  userInitials="JP"          // 2-char avatar (default: "A")
  notificationCount={3}      // red dot badge on bell
  onNotificationPress={() => router.push('/alerts')}
  onProfilePress={() => router.push('/profile')}
  center={<SearchBar />}     // optional middle slot
/>
```

Also exports `<BackHeader title="..." onBack={...} right={<Node />} />` for detail screens.

---

### `<Screen />` — `components/screen.tsx`

Safe-area aware content wrapper. Always wrap screen body in this (after PageHeader).

```tsx
<Screen scrollable>          // adds ScrollView
  {/* content */}
<Screen>

<Screen contentClassName="px-0 py-0">   // override padding
```

Default edges: `['bottom', 'left', 'right']` — top is handled by PageHeader's SafeAreaView.

---

### `<StatCard />` — `components/ui/stat-card.tsx`

KPI tile for dashboard.

```tsx
<StatCard
  label="Total"
  value={148}
  caption="This month"
  icon={Users}
  tone="brand"          // IconChip tone
  onPress={() => {}}
/>
```

Use in a 2-column `flex-row flex-wrap gap-3` grid.

---

### `<RequestCard />` — `components/ui/request-card.tsx`

Candidate verification row card.

```tsx
<RequestCard
  name="Arjun Patel"
  rid="VM-20240601"
  service="Identity Verification"
  serviceIcon={ShieldCheck}
  date="2 Jun 2026"
  status="running"          // 'running' | 'done' | 'flag' | 'unknown'
  priority="Normal priority"
  payNow={false}
  onPress={() => router.push(`/request/${id}`)}
  onMorePress={() => {}}
  onPayPress={() => {}}
/>
```

---

### `<StatusBadge />` — `components/ui/status-badge.tsx`

Inline pill. Used inside RequestCard and alert items.

| status | Label | Colour |
|---|---|---|
| `running` | Running | Amber (spinning icon) |
| `done` | Completed | Green |
| `flag` | Discrepancy | Red |
| `unknown` | Unknown | Grey |

---

### `<SegmentedControl />` — `components/ui/segmented-control.tsx`

Pill tab switcher.

```tsx
const [tab, setTab] = useState<'all' | 'running' | 'done' | 'flag'>('all');

<SegmentedControl
  options={[
    { id: 'all', label: 'All' },
    { id: 'running', label: 'Running' },
    { id: 'done', label: 'Done' },
    { id: 'flag', label: 'Flagged' },
  ]}
  value={tab}
  onChange={setTab}
  className="mx-4 mb-3"
/>
```

---

### `<FAB />` — `components/ui/fab.tsx`

Floating action button. Position: `absolute bottom=96 right=18` (above tab bar).

```tsx
<FAB onPress={() => router.push('/new-request')} />
```

---

### `<IconChip />` — `components/ui/icon-chip.tsx`

Rounded icon container. Sizes: `sm` (32px), `md` (38px), `lg` (52px).

```tsx
<IconChip tone="blue" size="lg">
  <Briefcase size={24} strokeWidth={2} />
</IconChip>
```

---

### `<SectionHeader />` — `components/ui/section-header.tsx`

Section title + optional right-aligned action link. Use above any list/grid block.

```tsx
<SectionHeader title="Recent Verifications" action="View all" onAction={() => router.push('/requests')} />
```

---

### `<ListRow />` — `components/ui/list-row.tsx`

Settings / menu row: icon-chip + label + optional trailing value + chevron.

```tsx
<ListRow icon={Bell} label="Notifications" tone="blue" value="Pro" onPress={() => router.push('/settings')} />
```

---

### `<ServiceCard />` — `components/ui/service-card.tsx`

Service catalogue grid card. Use 2-up in a `flex-row gap-3` row.

```tsx
<ServiceCard name="Identity\nVerification" description="Aadhaar, PAN…" icon={ShieldCheck}
  tone="brand" turnaround="< 1 min" onPress={() => router.push('/new-request?service=identity')} />
```

---

### `<AlertRow />` — `components/ui/alert-row.tsx`

Notification feed row. Caller resolves icon/tone (e.g. from a TYPE_CONFIG map) and passes them in.

```tsx
<AlertRow icon={CheckCircle} tone="brand" title="Report ready" body="…" time="9:14 AM" unread onPress={…} />
```

---

### `<EmptyState />` — `components/ui/empty-state.tsx`

Centered icon + title + description. Use for empty lists and "Coming soon" stubs.

```tsx
<EmptyState icon={SearchX} title="Nothing here yet" description="No flagged verifications found." />
```

---

### `<StickySubHeader />` — `components/ui/sticky-sub-header.tsx`

Card-coloured bar pinned directly below `<PageHeader>` (segmented control, title + action). Default padding `px-4 py-3` — override via `className`.

```tsx
<StickySubHeader>
  <SegmentedControl options={TABS} value={tab} onChange={setTab} />
</StickySubHeader>
```

---

### `<VLogo />` — `components/ui/v-logo.tsx`

Verifyman wordmark. Renders the real SVG markup via `SvgCss` (from `react-native-svg/css`, which honours the `<style>`/class fills), auto-swapped by colour scheme via `useColorScheme()`. `size` = height in px; width derived from aspect ratio. Raw SVG strings live in `components/ui/logo-data.ts` (auto-generated from `assets/images/verifyman_*_logo.svg` — regenerate if the source art changes). No metro/transformer config needed.

---

## Screen specifications

### Home — `app/index.tsx`

**Purpose:** Dashboard. First thing HR sees when they open the app.

**Layout:**
1. `<PageHeader notificationCount={N} />`
2. `<Screen scrollable>` with `contentClassName="px-4 py-5 gap-5"`
3. **Greeting block** — "Good morning, [Name]" (h1) + company name (muted subtitle)
4. **Stats grid** — `flex-row flex-wrap gap-3`. Four `<StatCard />`s in 2×2:
   - Total requests / Cleared / In progress / Avg time
5. **Section: Recent Verifications** — `<SectionHeader title="Recent" action="View all" />`
   + 3–4 `<RequestCard />`s with varied statuses
6. **`<FAB />`** for new request

---

### Requests — `app/requests.tsx`

**Purpose:** Full list of all verification requests, filterable.

**Layout:**
1. `<PageHeader />`
2. Sticky `<SegmentedControl options={ALL|RUNNING|DONE|FLAGGED} />` below header
3. `<Screen scrollable contentClassName="px-4 gap-3">`
4. Filtered `<RequestCard />`s (filter by `status`)
5. Empty state if no items match
6. `<FAB />`

---

### Services — `app/services.tsx`

**Purpose:** Service catalogue — HR picks a service to kick off a new check.

**Layout:**
1. `<PageHeader />`
2. `<Screen scrollable>`
3. Hero text block: "Verification Services" + short description
4. 2-column grid of service cards. Each card:
   - `<IconChip tone={...} size="lg" />` with service icon
   - Service name (bold)
   - 1-line description
   - "Request →" ghost/link button

**Services & their icons/tones:**

| Service | Icon | Tone |
|---|---|---|
| Identity | `ShieldCheck` | `brand` |
| Employment | `Briefcase` | `blue` |
| Education | `GraduationCap` | `amber` |
| Address | `MapPin` | `slate` |
| Background | `ClipboardList` | `blue` |
| Police Clearance | `Scale` | `red` |

---

### Alerts — `app/alerts.tsx`

**Purpose:** Notification feed — report ready, discrepancy flagged, payment required, system updates.

**Layout:**
1. `<PageHeader notificationCount={N} />`
2. "Mark all as read" header action (right side)
3. `<Screen scrollable contentClassName="px-4 py-3 gap-0">`
4. Grouped sections: **Today** / **Yesterday** / **Earlier**
5. Each alert row:
   - `<IconChip tone={...} size="sm" />` (left)
   - Title (bold) + body text (muted, 2 lines)
   - Timestamp (muted-foreground, right-aligned)
   - Unread = slightly highlighted background `bg-accent/40`
6. Hairline divider between rows

**Alert types:**

| Type | Tone | Icon |
|---|---|---|
| Report ready | `brand` | `CheckCircle` |
| Discrepancy | `red` | `AlertTriangle` |
| Payment due | `amber` | `CreditCard` |
| Verification started | `blue` | `RefreshCw` |
| System | `slate` | `Info` |

---

### Profile — `app/profile.tsx`

**Purpose:** User identity, company, usage, and settings hub.

**Layout:**
1. `<Screen scrollable contentClassName="px-0 py-0">` (no PageHeader — full-bleed avatar area)
2. **Hero section** — coloured top band (`bg-primary/10`), large avatar circle, name, role, company
3. **Usage card** — "This month" with 3 horizontal stats: Submitted / Cleared / Pending
4. **Settings list sections**, each in a `bg-card border border-border rounded-2xl` block:
   - *Account*: Edit Profile / Change Password / Notifications
   - *Company*: Company Settings / Team Members / Billing
   - *Support*: Help Centre / Privacy Policy / Terms / App version
5. **Logout button** — `variant="outline"` destructive-coloured, full-width

---

## Layout patterns

### Section header with action

```tsx
<View className="flex-row items-center justify-between mb-3">
  <Text className="text-[17px] font-extrabold text-foreground" style={{ letterSpacing: -0.3 }}>
    Recent
  </Text>
  <Pressable onPress={onAction}>
    <Text className="text-[13px] font-bold text-primary">View all</Text>
  </Pressable>
</View>
```

### 2-column grid

```tsx
<View className="flex-row flex-wrap gap-3">
  <View className="flex-1 min-w-[140px]">
    <StatCard ... />
  </View>
  <View className="flex-1 min-w-[140px]">
    <StatCard ... />
  </View>
</View>
```

### Settings row item

```tsx
<Pressable className="flex-row items-center px-4 py-3.5 active:bg-secondary">
  <IconChip tone="slate" size="sm" className="mr-3">
    <SomeIcon size={16} strokeWidth={2} />
  </IconChip>
  <Text className="flex-1 text-[15px] font-semibold text-foreground">{label}</Text>
  <ChevronRight size={16} strokeWidth={2} className="text-muted-foreground" />
</Pressable>
```

---

## Typography conventions

| Usage | Classes |
|---|---|
| Screen title / H1 | `text-[24px] font-extrabold tracking-tight` |
| Section header | `text-[17px] font-extrabold` style `letterSpacing: -0.3` |
| Card title | `text-[16.5px] font-extrabold` style `letterSpacing: -0.2` |
| Body | `text-[14px] font-medium` |
| Caption / label | `text-[12px] font-bold tracking-widest uppercase text-muted-foreground` |
| Muted body | `text-[13px] font-semibold text-muted-foreground` |

---

## Coding conventions

1. **Always use `cn()` from `@/lib/utils`** for conditional classes — never string concatenation.
2. **No inline `StyleSheet.create()`** — use NativeWind classes everywhere. Raw `style` prop only for things Tailwind can't do (e.g. `letterSpacing`, `lineHeight`).
3. **Import order:** React → RN core → Expo → lucide → local components → local utils.
4. **Mock data inline in each screen file** (top of file, `const MOCK_*`) until API is wired.
5. **All new shared components go in `components/ui/`** with named exports (no default exports from ui/).
6. **Screen files use default export** (required by Expo Router).
7. **Use `<Screen scrollable>` for all content screens** — never raw `ScrollView` directly in a screen.
8. **SafeAreaView is handled by `<Screen>` and `<PageHeader>`** — do not add it inside screens.
9. **Dark mode** — all new code must use semantic tokens only. No hardcoded colours.
10. **Pressable feedback** — always add `active:bg-secondary` or `active:opacity-70` to tappable elements.

---

## Mock data conventions

Until the backend is connected, use realistic Indian names, company names, and IDs.

```ts
// Request IDs: VM-YYYYMMDD-NNN
// e.g. VM-20260601-042

// Status distribution in lists: ~50% running, 30% done, 20% flag
// Dates: relative strings like "2 Jun 2026", "31 May 2026"

// Sample names pool:
// Arjun Patel, Priya Sharma, Rahul Verma, Aarya Rao, Vikas Menon,
// Sneha Iyer, Kiran Desai, Ananya Singh, Rohan Gupta, Meera Nair
```

---

## Routes (stubbed — "Coming soon", nav wired, content pending)

These exist as stack routes (not tabs) so navigation resolves end-to-end. Build out the real content next.

| Route | Purpose |
|---|---|
| `app/reports.tsx` | Full report viewer with check-by-check breakdown |
| `app/settings.tsx` | App preferences (theme, notifications, language) |
| `app/new-request.tsx` | Wizard to submit a new candidate (reads `?service=` param) |
| `app/request/[id].tsx` | Detail view for a single verification request |

## Future screens (not yet implemented)

| Route | Purpose |
|---|---|
| `app/(auth)/signin.tsx` | Login / sign-up flow |

---

## Running the project

```bash
pnpm dev          # start Expo dev server (clears cache)
pnpm ios          # iOS simulator
pnpm android      # Android emulator
```

Adding new reusable components:
```bash
npx react-native-reusables/cli@latest add input textarea
```

---

## Git workflow

We use **GitHub Flow** — simple, branch-based, works perfectly for a small mobile team.

### The one rule

> **Never commit directly to `main`.** Every change — no matter how small — goes through a branch and a PR.

`main` is always deployable. It maps to what goes to the App Store / Play Store.

---

### Branch types and naming

```
feat/short-description       # new screen, feature, or component
fix/short-description        # bug fix
chore/short-description      # deps, config, tooling — no user-facing change
hotfix/short-description     # emergency fix that needs to ship immediately
docs/short-description       # documentation only (e.g. CLAUDE.md updates)
```

**Examples:**
```
feat/request-detail-screen
feat/new-request-wizard
fix/status-badge-dark-mode
fix/profile-avatar-overflow
chore/upgrade-expo-55
hotfix/crash-on-android-startup
docs/add-api-integration-notes
```

**Rules:**
- All lowercase, hyphens only — no slashes inside the name, no spaces
- Keep it short but descriptive (3–5 words max after the prefix)
- One concern per branch — don't mix a fix and a new feature

---

### Starting a new branch

Always branch off the latest `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature-name
```

Or use the helper script:

```bash
./scripts/new-branch.sh feat/request-detail-screen
```

---

### Commit messages — Conventional Commits

Format: `type(scope): short description`

| Type | When to use |
|---|---|
| `feat` | New screen, component, or user-facing behaviour |
| `fix` | Bug fix |
| `chore` | Deps, config, build scripts |
| `docs` | CLAUDE.md or other docs only |
| `style` | Formatting/whitespace, no logic change |
| `refactor` | Restructure without behaviour change |
| `hotfix` | Emergency production fix |

**Good examples:**
```
feat(home): add quick-action chips for each service type
fix(request-card): status badge overflows on long names
chore: upgrade expo to 55.1.0
docs: document IconChip tone colour system in CLAUDE.md
refactor(screen): extract SectionHeader into shared component
hotfix(android): fix crash on startup when notifications disabled
```

**Rules:**
- Lowercase, present tense ("add" not "added")
- No period at end
- Keep the subject under 72 characters
- Add a blank line + body paragraph for anything non-obvious

---

### Opening a PR

1. Push your branch: `git push origin feat/your-feature-name`
2. Open a PR on GitHub targeting `main`
3. Fill in the PR template (`.github/PULL_REQUEST_TEMPLATE.md`)
4. Self-review your diff before requesting a review
5. Merge with **Squash and merge** — keeps `main` history linear

**PR title** follows the same Conventional Commits format:
```
feat(services): add 2-column service grid with turnaround times
```

---

### Merge strategy

| Situation | Strategy |
|---|---|
| Regular feature / fix | Squash and merge → linear main history |
| Long-running feature with meaningful sub-commits | Merge commit (discuss first) |
| Hotfix | Squash and merge, tag immediately after |

---

### Releases and version tags

When a build is ready to submit to App Store / Play Store:

```bash
git checkout main
git pull origin main
git tag v1.0.0 -m "Release v1.0.0 — initial launch"
git push origin v1.0.0
```

Versioning follows **semver** (`MAJOR.MINOR.PATCH`):
- `PATCH` — bug fixes only (`v1.0.1`)
- `MINOR` — new features, backward compatible (`v1.1.0`)
- `MAJOR` — breaking changes or major redesigns (`v2.0.0`)

Also bump `version` in `app.json` and the iOS/Android build numbers before tagging.

---

### Hotfix flow

If something is broken on `main` in production:

```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-crash-description
# fix the issue
git commit -m "hotfix: fix crash when notification badge is null"
# open PR → squash merge → tag immediately
git tag v1.0.1 -m "Hotfix v1.0.1"
git push origin v1.0.1
```

---

### GitHub branch protection (set this up on GitHub.com)

Go to **Settings → Branches → Add rule** for `main`:

- ✅ Require a pull request before merging
- ✅ Require approvals: 1 (even if it's just yourself reviewing)
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require status checks to pass before merging (add TypeScript check when CI is set up)
- ✅ Do not allow bypassing the above settings
- ✅ Restrict who can push to matching branches (only you / leads)

---

### Quick reference cheat sheet

```bash
# Start work
git checkout main && git pull origin main
git checkout -b feat/your-feature

# During work
git add -p                          # stage hunks, not whole files
git commit -m "feat(scope): desc"

# Before PR
git fetch origin
git rebase origin/main              # keep branch up to date

# Done — push and open PR
git push origin feat/your-feature
```
