<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Guidelines & Specifications

## Global i18n (全栈双语国际化规范)
All user-facing interfaces, websites, settings panels, application views, descriptions, tooltips, and console outputs across **all applications and platforms** in the entire baomi family (including Pop, Open YouTube Music, baomi.app index, and subsidiary web apps) must fully support **Internationalization (i18n)** in both English (`en`) and Simplified Chinese (`zh-Hans` / `zh`).

### Development Requirements:
1. **Swift / macOS Client Apps**:
   - **UI Views**: Use standard SwiftUI `Text("...")`, `Toggle("...", isOn: ...)`, or AppKit localization methods. Swift/SwiftUI automatically localizes string literals using standard catalog files.
   - **Programmatic Strings**: Wrap plain `String` variables or logs intended for the user in `String(localized: "...")`.
   - **Catalogs**: Immediately add any new user-facing strings to the respective application's strings catalog (e.g., [Localizable.xcstrings](file:///Users/arjenzhou/src/github/baomi-app/pop/Sources/Pop/Localizable.xcstrings) for Pop) for both `"en"` and `"zh-Hans"` keys, ensuring 100% translation completeness.
2. **Web / Next.js / React Apps**:
   - Use standard localized configuration files or schema specifications (such as bilingual fields inside `baomi.json` configurations).
   - Ensure all layouts, landing pages, metadata, and buttons support seamless toggling or bilingual representation for both English and Chinese audiences.

## No Hardcoded Paths (禁止硬编码写死路径)
Do **NOT** hardcode absolute file paths anywhere in the codebase. This is especially critical for user-specific directories (e.g., paths starting with `/Users/username/...`).

### Development Requirements:
1. **Dynamic Directory Resolution**: Always resolve directories and files dynamically using native macOS / system APIs:
   - **In Swift (macOS)**: Use `FileManager.default.homeDirectoryForCurrentUser`, `FileManager.default.urls(for:in:)`, or `NSHomeDirectory()` to locate standard user folders (e.g., Desktop, Documents, Application Support) dynamically.
   - **In JavaScript/TypeScript (Next.js/Node.js)**: Use standard library utilities like `path.join()`, `os.homedir()`, or process context environment variables.
2. **Environment & User Isolation**: All caching, databases, temporary file saving, or scratchpad outputs must strictly rely on dynamic user paths or sandbox-provided temporary folders. The codebase must remain completely portable, secure, and executable across different user accounts and machine environments without manual configuration.

## Strict Release Freeze (未经授权禁止发布新版本)
Do **NOT** publish a new GitHub Release, bump marketing versions in plist/yml, create release-related Git tags (e.g., `v*`), or trigger CI/CD release build pipelines unless the user has **explicitly commanded** you to publish/release a new version ("我让你发才发" / "Only release when explicitly told to do so").

### Development Requirements:
1. **No Implicit Version Bumping**: All development, refactoring, and hotfixes must be written, built, and tested locally. You are forbidden from proactively increasing the application's version or pushing release tags online.
2. **Safe Staging & Verification**: Restrict your operations to git commits, feature pushes to local/remote topic branches, and local compilation. Always present the candidate fixes for the user to verify first. Wait for the user's explicit release command before bumping versions and pushing tags.
