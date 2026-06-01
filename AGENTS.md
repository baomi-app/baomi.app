<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Guidelines & Specifications

## Web i18n (网页端双语国际化规范)
All user-facing interfaces, pages, settings, descriptions, tooltips, and console outputs in the baomi.app web project must fully support **Internationalization (i18n)** in both English (`en`) and Simplified Chinese (`zh`).

### Development Requirements:
1. **Bilingual Configs & Content**: Use standard localized configuration files or schema specifications (such as bilingual fields inside `baomi.json` configurations).
2. **Layout & UI**: Ensure all layouts, landing pages, metadata, and buttons support seamless toggling or bilingual representation for both English and Chinese audiences.

## No Hardcoded Paths (禁止硬编码写死路径)
Do **NOT** hardcode absolute file paths anywhere in the codebase. This is especially critical for user-specific directories or server-specific absolute paths.

### Development Requirements:
1. **Dynamic Path Resolution**: Always resolve directories and files dynamically:
   - In JavaScript/TypeScript (Next.js/Node.js), use standard path utilities like `path.join()`, `os.homedir()`, or process context environment variables.
2. **Environment Isolation**: All server-side data fetching, static generation outputs, and local caching must strictly rely on environment-provided variables or dynamic system/sandbox-provided temp directories.

## Strict Release Freeze (未经授权禁止发布新版本)
Do **NOT** publish a new GitHub Release, trigger production deployment pipelines, or bump versions unless the user has **explicitly commanded** you to do so ("我让你发才发" / "Only deploy/release when explicitly told to do so").

### Development Requirements:
1. **Local and Staging Only**: All development, refactoring, and hotfixes must be tested locally. You are forbidden from proactively triggering live production deployments or release tags.
2. **Safe Verification**: Wait for the user's explicit command before triggering any production builds or tags.

## Strict Commit Controls (未经授权禁止擅自提交代码)
Do **NOT** execute Git commits (`git commit`) or stage files (`git add`) under any circumstances unless the user has **explicitly commanded/requested** you to commit the changes first (e.g., "先commit一下代码" / "commit the changes").

### Development Requirements:
1. **No Proactive Committing**: AI coding agents must restrict their operations solely to editing code, compiling, and running local tests. Creating commits proactively is strictly forbidden.
2. **User-Controlled Git History**: Always present the completed file modifications in the chat for the user to review. Committing must be performed *only* upon receiving an explicit request from the user. This ensures the developer maintains absolute ownership and control over their Git tree, staging state, and commit messages.

