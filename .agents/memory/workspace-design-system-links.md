---
name: Workspace design-system links
description: Local workspace package resolution behavior when an artifact starts consuming the shared design system.
---

When an artifact adds a new local design-system workspace dependency, update the
lockfile and run a full workspace install before trusting TypeScript resolution.

**Why:** A lockfile-only refresh can leave the consumer's node_modules workspace
link stale, producing false “cannot find module” errors for valid package
subpath exports.

**How to apply:** After changing a consumer package manifest, use the normal
workspace install flow once, then run the consumer typecheck. Do not change
valid package export paths to work around a stale link.