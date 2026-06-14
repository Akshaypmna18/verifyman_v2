# Dark Mode & Component Configuration Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make dark mode follow the device appearance and fix the mis-configured UI components (IconChip icon colour, VLogo wordmark, native tab bar theming).

**Architecture:** The app styles with NativeWind v4 driven by CSS custom properties in `global.css` (`:root` light / `.dark` dark). The root cause of every colour bug is NativeWind being put in manual (`darkMode: 'class'`) mode while nothing toggles the class — so vars stay light and arbitrary `dark:` variants leak in. We remove manual mode, then fix three component-level config bugs that are independent of dark mode.

**Tech Stack:** React Native 0.83, Expo SDK 55, Expo Router v4, NativeWind v4, lucide-react-native, react-native-svg, TypeScript.

**Testing note:** No unit-test harness exists (no jest/testing-library — only `typescript`). Verification per task is (a) `pnpm exec tsc --noEmit` for type safety and (b) a manual run checkpoint on the iOS simulator in BOTH light and dark device appearance. Toggle simulator appearance: Simulator menu → Features → Toggle Appearance (or `⌘+Shift+A`).

---

## File Structure

| File | Responsibility | Change |
|---|---|---|
| `tailwind.config.js` | NativeWind/Tailwind config | Remove `darkMode: 'class'` so dark follows device (DONE — verify only) |
| `components/ui/icon-chip.tsx` | Rounded icon container | Inject tone-aware colour into child lucide icon |
| `components/ui/v-logo.tsx` | Wordmark SVG | Fix wordmark paths not rendering |
| `components/ui/logo-data.ts` | Raw SVG markup | Possibly inline fills if `<style>` not honoured |
| `app/_layout.tsx` | Root layout + NativeTabs | Theme the native tab bar background (optional) |

---

## Task 1: Verify dark mode now follows device

The fix is already applied — `darkMode: 'class'` was removed from `tailwind.config.js`. This task only confirms it works end-to-end. No code change unless verification fails.

**Files:**
- Verify: `tailwind.config.js` (no `darkMode` key present)

- [ ] **Step 1: Confirm the config no longer has manual dark mode**

Run: `grep -n "darkMode" tailwind.config.js`
Expected: NO output (line removed). If it prints `darkMode: 'class'`, delete that line.

- [ ] **Step 2: Type check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Run the app with cache clear**

Run: `pnpm ios`
(`pnpm` scripts already pass `-c` to clear the Metro/NativeWind cache — required after a tailwind.config change.)

- [ ] **Step 4: Visual checkpoint — light**

Simulator in LIGHT appearance. Open Home + Requests.
Expected: white backgrounds, dark text. Blue chip (Employment) = pale sky blue. Amber chip (Education) = pale amber. RUNNING badge = pale amber (NOT dark brown).

- [ ] **Step 5: Visual checkpoint — dark**

Toggle simulator to DARK appearance (`⌘+Shift+A`). Same screens.
Expected: near-black backgrounds, light text. Cards = dark slate. Chips switch to their dark tones. Screen actually changes vs light. **This is the core bug fixed — confirm it switches.**

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.js
git commit -m "fix(theme): follow device dark mode by removing manual class mode

NativeWind v4 'class' darkMode is manual — nothing toggled the class so
CSS vars stayed light while arbitrary dark: variants leaked in. Removing
it makes light/dark follow the device appearance."
```

---

## Task 2: IconChip — pass tone colour to the child icon

**Bug:** `toneClasses` sets `text-[...]` on the wrapper `View`. The child is a raw `lucide-react-native` icon, which reads its `color` prop (default `currentColor` → black) and does NOT inherit a parent View's text colour in RN. So every chip icon renders black regardless of tone. Fix: map each tone to an explicit light/dark icon colour and inject it into the child via `React.cloneElement` (same pattern `status-badge.tsx` already uses for its icons).

**Files:**
- Modify: `components/ui/icon-chip.tsx`

- [ ] **Step 1: Rewrite icon-chip.tsx to inject tone colour into the icon**

Replace the entire file with:

```tsx
import { cn } from '@/lib/utils';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';

export type IconChipTone = 'brand' | 'amber' | 'slate' | 'blue' | 'red';

type IconChipProps = React.ComponentProps<typeof View> & {
  tone?: IconChipTone;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
};

const toneClasses: Record<IconChipTone, string> = {
  brand: 'bg-accent dark:bg-accent',
  amber: 'bg-[hsl(38_92%_96%)] dark:bg-[hsl(38_92%_14%)]',
  slate: 'bg-secondary',
  blue: 'bg-[hsl(199_89%_94%)] dark:bg-[hsl(199_89%_12%)]',
  red: 'bg-destructive/10 dark:bg-destructive/20',
};

// Explicit icon stroke colour per tone — lucide icons need a `color` prop;
// they do not inherit the wrapper View's text colour in React Native.
const iconColor: Record<IconChipTone, { light: string; dark: string }> = {
  brand: { light: 'hsl(143 82% 30%)', dark: 'hsl(143 82% 45%)' },
  amber: { light: 'hsl(38 85% 35%)', dark: 'hsl(43 96% 56%)' },
  slate: { light: 'hsl(215 16% 47%)', dark: 'hsl(215 16% 65%)' },
  blue: { light: 'hsl(199 89% 30%)', dark: 'hsl(199 89% 60%)' },
  red: { light: 'hsl(0 72% 51%)', dark: 'hsl(0 84% 60%)' },
};

const sizeClasses = {
  sm: 'w-8 h-8 rounded-[10px]',
  md: 'w-[38px] h-[38px] rounded-[11px]',
  lg: 'w-[52px] h-[52px] rounded-[15px]',
};

export function IconChip({ tone = 'brand', size = 'md', className, children, ...props }: IconChipProps) {
  const { colorScheme } = useColorScheme();
  const color = iconColor[tone][colorScheme ?? 'light'];

  // Inject the tone colour into the child icon unless the caller already set one.
  const tinted = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const props = child.props as { color?: string };
    if (props.color != null) return child;
    return React.cloneElement(child as React.ReactElement<{ color?: string }>, { color });
  });

  return (
    <View
      className={cn(
        'items-center justify-center flex-none',
        toneClasses[tone],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {tinted}
    </View>
  );
}
```

- [ ] **Step 2: Type check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Visual checkpoint**

Run the app (already running from Task 1, or `pnpm ios`). Open Home.
Expected, LIGHT mode: Total icon = dark green, Cleared = dark green, Running stat = dark amber, Avg time = dark blue. Quick Request row: Identity green, Employment blue, Education amber, Address slate — each ICON now coloured to match its chip, not black.
Toggle DARK: icons switch to the brighter dark-tone colours, still visible on dark chip backgrounds.

- [ ] **Step 4: Commit**

```bash
git add components/ui/icon-chip.tsx
git commit -m "fix(icon-chip): tint child icon by tone

lucide icons take a color prop and do not inherit the wrapper View's
text colour in RN, so every chip icon rendered black. Inject a
tone-aware (light/dark) colour into the child via cloneElement."
```

---

## Task 3: VLogo — render the wordmark, not just the green mark

**Bug:** In the header only the green check polygon (`.st0`) shows; the "verifyman" wordmark paths (`.st1`, fill `#3f423f`) are missing. `SvgCss` renders the polygon, so the SVG loads — but the wordmark text either isn't drawn or is clipped. Most likely cause: `SvgCss` is honouring the `<style>` block for the polygon but the long wordmark `<path>` elements render outside the supplied `width`/`height` box (the `<g>` is not being scaled), OR the `.st1` fill is dropped. Diagnose first, then apply the matching fix.

**Files:**
- Modify (only if needed): `components/ui/v-logo.tsx`
- Modify (only if needed): `components/ui/logo-data.ts`

- [ ] **Step 1: Diagnose — render the logo larger and check what's missing**

Temporarily bump the header logo size to make the defect obvious. In `components/PageHeader.tsx` change `<VLogo size={20} />` to `<VLogo size={40} />`, reload, screenshot the header.

Decide which case you are in:
- **Case A — wordmark drawn but wrong colour/invisible** (you can see faint/clipped text): `<style>` fills not applied → go to Step 2A.
- **Case B — only the green mark, no text glyph shapes at all**: paths not parsed/scaled → go to Step 2B.

Revert the `size={40}` change to `size={20}` before committing.

- [ ] **Step 2A: Fix — inline the fills so they don't depend on `<style>`**

In `components/ui/logo-data.ts`, remove the `<defs><style>…</style></defs>` block and replace each `class="st0"` with `fill="#3ab54a"` and each `class="st1"` with `fill="#3f423f"` in `LOGO_DEFAULT_XML`. Do the same for `LOGO_DARK_XML` using that file's own colour values (keep `.st0` green; swap `.st1` to the dark-theme wordmark colour already defined there). Example transform for the default polygon line:

```
<!-- before -->
<polygon class="st0" points="0 86.56 24 62.95 ... "/>
<!-- after -->
<polygon fill="#3ab54a" points="0 86.56 24 62.95 ... "/>
```

Apply to every `class="st0"`/`class="st1"` occurrence. Leave the `viewBox`, `<g>`, `points`, and `d` data untouched.

- [ ] **Step 2B: Fix — ensure the full viewBox scales into the box**

If glyphs are missing entirely, the `<svg>` is not being fit to `width`/`height`. In `components/ui/v-logo.tsx`, pass `preserveAspectRatio="xMidYMid meet"` to `SvgCss` and confirm `viewBox="0 0 637.25 174.14"` is present in the XML (it is). Replace the `SvgCss` line in `v-logo.tsx` with:

```tsx
<SvgCss
  xml={xml}
  width={Math.round(size * ASPECT)}
  height={size}
  preserveAspectRatio="xMidYMid meet"
/>
```

- [ ] **Step 3: Type check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Visual checkpoint — light and dark**

Reload. Header should show the full "✓ verifyman" wordmark.
LIGHT: green mark + dark-grey wordmark, readable on the white header.
DARK: toggle appearance — wordmark uses the dark-theme colour from `LOGO_DARK_XML` and is readable on the dark `bg-card` header.

- [ ] **Step 5: Commit**

```bash
git add components/ui/v-logo.tsx components/ui/logo-data.ts components/PageHeader.tsx
git commit -m "fix(v-logo): render the verifyman wordmark in the header

Only the green mark was showing; the wordmark paths were not drawn by
SvgCss. <apply the message matching the case you fixed: inline fills /
preserveAspectRatio>."
```

---

## Task 4 (optional): Theme the native tab bar

**Bug:** `NativeTabs` is the native iOS `UITabBar`; only `tintColor` is set, so its background uses the system blur material and looks dark/inconsistent over scrolled content. This is native styling, not NativeWind — set its background explicitly from the theme so it matches the app surface. Do this only if Task 1 didn't already make it acceptable.

**Files:**
- Modify: `app/_layout.tsx:16-23`

- [ ] **Step 1: Set the tab bar background colour from the theme**

In `app/_layout.tsx`, the `card` colour already exists per scheme. Add it next to `primaryColor` and pass `backgroundColor` to `NativeTabs`:

```tsx
const primaryColor = THEME[colorScheme ?? 'light'].primary;
const tabBarColor = THEME[colorScheme ?? 'light'].card;
```

```tsx
<NativeTabs tintColor={primaryColor} backgroundColor={tabBarColor}>
```

If the installed `expo-router` `NativeTabs` build does not accept `backgroundColor`, tsc will flag it — in that case revert this task; the native default is acceptable and not worth a fragile workaround.

- [ ] **Step 2: Type check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors. If `backgroundColor` is rejected, revert this file and skip the task.

- [ ] **Step 3: Visual checkpoint**

Reload. Tab bar background should match the card surface and stay consistent between Home and Requests, in both light and dark.

- [ ] **Step 4: Commit**

```bash
git add app/_layout.tsx
git commit -m "fix(layout): theme native tab bar background to match surface"
```

---

## Self-Review

- **Spec coverage:** Bug 1 dark mode → Task 1. Bug 2 IconChip icon colour → Task 2. Bug 3 logo wordmark → Task 3. Bug 4 native tab bar → Task 4. All four findings covered.
- **Placeholders:** Task 3 is intentionally diagnostic-gated (the runtime failure mode can't be known without running), but both branches (2A/2B) contain complete, concrete code. No "TODO"/"handle edge cases" left.
- **Type consistency:** `IconChipTone` union unchanged; `toneClasses`, `iconColor`, `sizeClasses` keyed by the same union. `THEME[...].card`/`.primary` exist in `lib/theme.ts`. `ASPECT` and `LOGO_*_XML` names unchanged in Task 3.
