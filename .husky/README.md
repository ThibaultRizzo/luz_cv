# Git Hooks Setup

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality before commits and pushes.

## 🎣 Available Hooks

### Pre-Commit Hook (Fast)
**Runs automatically before every commit**

Checks:
- ✅ TypeScript type checking (`tsc --noEmit`)
- ✅ ESLint linting

**Time:** ~5-10 seconds

This is fast enough to run on every commit without slowing you down.

### Pre-Push Hook (Full Build)
**Runs automatically before every push**

Checks:
- ✅ Full production build (`bun run build`)

**Time:** ~15-30 seconds

This catches any build issues before pushing to remote, preventing broken builds in CI/CD.

## 🚀 Usage

The hooks run automatically! Just commit and push as usual:

```bash
# The pre-commit hook will run automatically
git commit -m "feat: add new feature"

# The pre-push hook will run automatically
git push
```

## ⚙️ Configuration

### Skip Hooks (Not Recommended)

If you absolutely need to skip the hooks (not recommended):

```bash
# Skip pre-commit
git commit --no-verify -m "emergency fix"

# Skip pre-push  
git push --no-verify
```

### Disable a Hook

To disable a hook, simply delete or rename it:

```bash
# Disable pre-commit
mv .husky/pre-commit .husky/pre-commit.disabled

# Disable pre-push
mv .husky/pre-push .husky/pre-push.disabled
```

### Customize Hooks

Edit the hook files directly:

- **`.husky/pre-commit`** - Runs before commits
- **`.husky/pre-push`** - Runs before pushes

### Change Pre-Commit to Full Build

If you want the pre-commit hook to run a full build instead of just type-checking:

```bash
# Edit .husky/pre-commit and replace the content with:
echo "🏗️  Building the application..."
bun run build || {
  echo "❌ Build failed. Please fix build errors before committing."
  exit 1
}
```

## 📝 Scripts

The hooks use these npm scripts from `package.json`:

- `bun run type-check` - TypeScript type checking only
- `bun run lint` - ESLint linting
- `bun run build` - Full production build

You can run these manually anytime:

```bash
# Quick type check
bun run type-check

# Lint your code
bun run lint

# Full build
bun run build
```

## 🔧 Troubleshooting

### Hooks Not Running

If hooks aren't running, try:

```bash
# Reinstall hooks
bun run prepare

# Or manually
bunx husky install
```

### Hook Fails But Code is Fine

1. Make sure your code actually passes the checks:
   ```bash
   bun run type-check
   bun run lint
   bun run build
   ```

2. If checks pass manually but fail in the hook, try:
   ```bash
   # Clear cache
   rm -rf .next node_modules
   bun install
   ```

### Slow Hooks

If hooks are too slow:

1. **Pre-commit**: Already optimized (type-check + lint only)
2. **Pre-push**: This is supposed to be thorough (full build)

If you want faster pre-push:
```bash
# Edit .husky/pre-push to only type-check instead of full build
echo "📝 Type checking..."
bun run type-check
```

## 🎯 Best Practices

1. **Don't skip hooks** - They catch bugs early
2. **Run checks locally** before committing if you made big changes
3. **Fix issues immediately** - Don't let them pile up
4. **Keep hooks fast** - Pre-commit should be < 30 seconds

## 📊 What Gets Checked

### Pre-Commit (Type-Check + Lint)
- ✅ TypeScript syntax errors
- ✅ Type mismatches
- ✅ Unused variables
- ✅ Missing imports
- ✅ Code style violations
- ✅ Best practice violations

### Pre-Push (Full Build)
- ✅ Everything from pre-commit
- ✅ Production build compilation
- ✅ Next.js optimizations
- ✅ Bundle analysis
- ✅ All components compile correctly

## 🔄 CI/CD

These same checks run in your CI/CD pipeline, so catching them locally saves time and prevents failed deployments!

---

**Note**: Hooks are automatically installed when you run `bun install` (via the `prepare` script).


