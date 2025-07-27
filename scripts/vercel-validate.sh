#!/bin/bash
# Vercel-like validation script for local testing
set -e

# 1. Install dependencies
if [ -f package-lock.json ]; then
  npm ci
elif [ -f yarn.lock ]; then
  yarn install --frozen-lockfile
elif [ -f pnpm-lock.yaml ]; then
  pnpm install --frozen-lockfile
else
  npm install
fi

echo "\n✅ Dependencies installed."

# 2. TypeScript type check (if tsconfig.json exists)
if [ -f tsconfig.json ]; then
  echo "\n🔎 Running TypeScript type check..."
  npx tsc --noEmit
  echo "✅ TypeScript check passed."
fi

# 3. Linting (if lint script exists)
if npm run | grep -q "lint"; then
  echo "\n🔎 Running ESLint..."
  npm run lint
  echo "✅ Lint passed."
fi

# 4. Build
echo "\n🔨 Running Next.js build..."
npm run build

echo "✅ Build succeeded."

# 5. Static export (if using static export)
if grep -q 'next export' package.json; then
  echo "\n📦 Running static export..."
  npm run export
  echo "✅ Static export succeeded."
fi

# 6. (Optional) Run tests if test script exists
if npm run | grep -q "test"; then
  echo "\n🧪 Running tests..."
  npm test
  echo "✅ All tests passed."
fi

echo "\n🎉 All Vercel-like validation checks passed!" 