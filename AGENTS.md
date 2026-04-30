# Workspace Development Rules (AGENTS.md)

This file defines the strict rules for developing within the multi-tenant ABCD Edu Hub platform. Follow these rules to avoid breaking navigation and context.

## 1. Multi-Tenant Routing Architecture
The platform supports two concurrent routing modes. Your code MUST support both:
- **Subdirectory Mode**: `domain.com/app/[tenant]/...`
- **Subdomain Mode**: `[tenant].domain.com/...`

### How to detect routing mode:
Always use `usePathname()` to check the starting segment:
```tsx
const pathname = usePathname();
const isSubdirectoryMode = pathname.startsWith('/app/');
```

### How to generate Workspace Links:
NEVER hardcode `/app/[tenant]` or assume a root path. Use a dynamic base:
```tsx
const workspaceBase = isSubdirectoryMode ? `/app/${tenant}` : '';
const finalLink = `${workspaceBase}/courses`;
```

## 2. Context Separation
- **Global Admin**: Routes starting with `/super-admin`. Data stored in `SiteSettings` with `workspaceId: null`.
- **Workspace Admin**: Routes starting with `.../admin`. Data stored in `SiteSettings` with a specific `workspaceId`.
- **Public Workspace**: Routes for students/guests. Data separate from the main landing page.

## 3. Data Integrity
- **Legal Pages**: Global legal pages (`/legal/[slug]`) and Workspace legal pages (`/app/[tenant]/legal/[slug]`) are separate entities. DO NOT mix them.
- **Help Center**: Workspaces have their own help center at `/help`. Global site uses `/support`.

## 4. UI/UX Standards
- **Workspace Footer**: MUST remain high-contrast (Black background, White text) unless specifically asked to change.
- **Dynamic Menus**: Always fetch navigation items from the `SiteSettings` of the current workspace context.

## 5. Defensive Programming
- **Tenant Detection**: Always provide fallbacks for `tenant` detection from `useParams()`, `usePathname()`, and props.
- **404 Prevention**: Before applying a prefix to a link, verify if it's already absolute or prefixed.

## 6. Prohibited Actions
- DO NOT use `window.location` for navigation; use `next/link` or `useRouter`.
- DO NOT modify the `proxy.ts` (middleware) unless explicitly investigating routing failures.
- DO NOT use global styles that could bleed into the workspace isolation.
