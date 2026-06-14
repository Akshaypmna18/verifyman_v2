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
│   ├── reports.tsx        # Reports viewer (future)
│   └── settings.tsx       # App settings (future)
├── components/
│   ├── PageHeader.tsx     # Top nav bar (logo + bell + avatar) — also exports BackHeader
│   ├── screen.tsx         # Screen wrapper (safe area + optional scroll)
│   └── ui/
│       ├── button.tsx         # CVA button with variants
│       ├── card.tsx           # Card / CardHeader / CardContent / CardFooter
│       ├── fab.tsx            # Floating Action Button
│       ├── icon-chip.tsx      # Rounded icon container with tone colours
│       ├── icon.tsx           # (thin wrapper if needed)
│       ├── request-card.tsx   # Candidate verification card
│       ├── segmented-control.tsx  # Pill tab switcher
│       ├── stat-card.tsx      # KPI metric tile
│       ├── status-badge.tsx   # running / done / flag / unknown pill
│       ├── text.tsx           # Text with TextClassContext
│       └── v-logo.tsx         # Verifyman wordmark SVG
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

## Future screens (not yet implemented)

| Route | Purpose |
|---|---|
| `app/reports.tsx` | Full report viewer with check-by-check breakdown |
| `app/settings.tsx` | App preferences (theme, notifications, language) |
| `app/new-request.tsx` | Wizard to submit a new candidate for verification |
| `app/request/[id].tsx` | Detail view for a single verification request |
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
