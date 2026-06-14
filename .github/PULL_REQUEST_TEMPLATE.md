## What does this PR do?

<!-- 1-2 sentences. What changed and why. -->

## Type of change

- [ ] `feat` — new screen, component, or user-facing behaviour
- [ ] `fix` — bug fix
- [ ] `chore` — deps, config, tooling
- [ ] `hotfix` — emergency production fix
- [ ] `docs` — documentation only
- [ ] `refactor` — restructure, no behaviour change

## Screenshots / screen recording

<!-- Required for any visual change. Paste iOS + Android screenshots side by side. -->

| Before | After |
|--------|-------|
|        |       |

## Checklist

- [ ] Tested on iOS simulator
- [ ] Tested on Android emulator
- [ ] Dark mode looks correct
- [ ] No hardcoded colours — semantic tokens only (`text-primary`, not `#2DBE4F`)
- [ ] `cn()` used for all conditional classes
- [ ] No raw `StyleSheet.create()` (except `letterSpacing` / `lineHeight` exceptions)
- [ ] Mock data uses realistic Indian names and `VM-YYYYMMDD-NNN` IDs
- [ ] TypeScript compiles clean (`npx tsc --noEmit`)
- [ ] CLAUDE.md updated if new components or patterns were added

## Related issues / tasks

<!-- Closes #123 -->
