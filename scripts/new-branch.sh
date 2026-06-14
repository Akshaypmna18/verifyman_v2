#!/usr/bin/env bash
# Usage: ./scripts/new-branch.sh feat/screen-name
# Creates a new branch off the latest main.

set -e

BRANCH="${1}"

if [[ -z "$BRANCH" ]]; then
  echo "Usage: ./scripts/new-branch.sh <type/description>"
  echo ""
  echo "Types: feat | fix | chore | hotfix | docs | refactor"
  echo "Example: ./scripts/new-branch.sh feat/request-detail-screen"
  exit 1
fi

# Validate branch name pattern
if [[ ! "$BRANCH" =~ ^(feat|fix|chore|hotfix|docs|refactor|style)/.+ ]]; then
  echo "❌  Branch name must start with a valid type prefix."
  echo "    Valid prefixes: feat/ fix/ chore/ hotfix/ docs/ refactor/ style/"
  echo "    Example: feat/request-detail-screen"
  exit 1
fi

echo "⬇️   Fetching latest main..."
git fetch origin main

echo "🔀  Switching to main..."
git checkout main

echo "⏩  Fast-forwarding to origin/main..."
git merge --ff-only origin/main

echo "🌿  Creating branch: $BRANCH"
git checkout -b "$BRANCH"

echo ""
echo "✅  You're on branch: $(git branch --show-current)"
echo "    Make your changes, then:"
echo "    git add -p"
echo "    git commit -m \"feat(scope): description\""
echo "    git push origin $BRANCH"
