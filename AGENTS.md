<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Guidelines & Specifications

## Pop Settings i18n (Internationalization)
All settings UI texts, tooltips, descriptions, and user-facing messages in Pop must fully support **Internationalization (i18n)** in both English and Simplified Chinese.

### Development Requirements:
1. **SwiftUI Localization**: Use standard SwiftUI `Text("...")` views or `Toggle("...", isOn: ...)` labels. SwiftUI automatically treats literal strings as `LocalizedStringKey` and localizes them at runtime.
2. **Swift Programmatic Strings**: For plain Swift `String` variables, always use `String(localized: "...")` to enable local lookup.
3. **Strings Catalog Update**: When introducing any new user-facing text, you **MUST** immediately add the corresponding translations to the [Localizable.xcstrings](file:///Users/arjenzhou/src/github/baomi-app/pop/Sources/Pop/Localizable.xcstrings) catalog for both `"en"` (English) and `"zh-Hans"` (Simplified Chinese) locales. Always verify that both values are fully translated to maintain the bilingual standard of the baomi app family.

## No Hardcoded Paths (禁止硬编码写死路径)
Do **NOT** hardcode absolute file paths anywhere in the codebase. This is especially critical for user-specific directories (e.g., paths starting with `/Users/username/...`).

### Development Requirements:
1. **Dynamic Directory Resolution**: Always resolve directories and files dynamically using native macOS / system APIs:
   - **In Swift (macOS)**: Use `FileManager.default.homeDirectoryForCurrentUser`, `FileManager.default.urls(for:in:)`, or `NSHomeDirectory()` to locate standard user folders (e.g., Desktop, Documents, Application Support) dynamically.
   - **In JavaScript/TypeScript (Next.js/Node.js)**: Use standard library utilities like `path.join()`, `os.homedir()`, or process context environment variables.
2. **Environment & User Isolation**: All caching, databases, temporary file saving, or scratchpad outputs must strictly rely on dynamic user paths or sandbox-provided temporary folders. The codebase must remain completely portable, secure, and executable across different user accounts and machine environments without manual configuration.
