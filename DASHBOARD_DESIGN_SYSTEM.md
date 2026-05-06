# Dashboard Design System (Unified Style Guide)

This document defines the visual and structural rules for building all dashboard types within the ABCD Edu Hub platform.

## 1. Global Standards (All Dashboards)

- **Card Radius**: 
    - Standard Cards: `rounded-3xl` (24px)
    - Large Layout Containers: `rounded-[2.5rem]` (40px)
    - Small Inputs/Badges: `rounded-xl` (12px)
- **Borders**: Standardize on `border-2 border-slate-100/50` for premium cards or `border-border/40` for standard layouts.
- **Theming**: All dashboards MUST use dynamic primary/accent colors from the workspace's `siteSettings`.
- **Transitions**: Use `transition-all duration-300` for all interactive state changes.

---

## 2. Workspace Admin Dashboard
*Used by institute owners and administrators.*

### Page Structure & Spacing
- **Main Container**: `p-4 lg:p-10 max-w-7xl mx-auto space-y-10`
- **Section Spacing**: `space-y-10` between major functional blocks.
- **Card Padding**: Standard `p-8` for content cards.

### Page Header Standard
Always use the `AdminPageHeader` component.
- **Title**: `text-3xl font-bold tracking-tight text-slate-900 dark:text-white`
- **Description**: `text-sm font-medium text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed`
- **Margin Bottom**: `mb-10` (Enforced by component)

### Buttons & Actions
- **Primary Actions**: `Button` with `rounded-xl font-bold h-11 shadow-lg shadow-primary/20`
- **Secondary Actions**: `Button` with `variant="outline" rounded-xl font-bold h-11 border-2`
- **Icon Buttons**: `size="icon" h-9 w-9 rounded-xl`

### Tables & Data Display
- **Container**: Wrap `Table` in a `Card` with `rounded-3xl` and `p-0`.
- **Row Hover**: Use `hover:bg-slate-50/50 dark:hover:bg-white/5`.
- **Badges**: Use `rounded-xl px-3 py-1 text-[10px] font-bold uppercase tracking-wider`.
- **Avatars**: `h-9 w-9 rounded-xl bg-primary/10 text-primary font-bold`.

### Forms & Inputs
- **Input Style**: `rounded-xl border-2 border-slate-100 focus:border-primary transition-all`
- **Select Style**: Matching radius and border with the main inputs.
- **Dialogs**: `rounded-[2rem]` for the `DialogContent`.

---

## 3. Student Dashboard
*Used by learners.*

- **Layout**:
    - Header Height: `h-20` (Taller for a more premium feel)
    - Header Style: `bg-background/50 backdrop-blur-md border-b`
    - Navigation: `StudentSidebar` (Desktop) + `MobileBottomNav` (Mobile).
- **Aesthetics**:
    - High-visual impact.
    - Background: `bg-slate-50/50` (Light mode) for card contrast.
- **Component Patterns**:
    - Stats Cards: Large icons, bold numbers, colored low-opacity backgrounds.
    - Empty States: Large centered icons with dashed borders.

---

## 4. Implementation Workflow

1.  **Routing Check**:
    - Server: `getServerTenantLink(path, tenant)`
    - Client: `getTenantLink(path, tenant, pathname)`
2.  **Mode Detection**:
    - Use `getRoutingConfig(pathname, hostname)` to detect Subdomain vs Subdirectory mode.
3.  **Active State**:
    - Use `isActivePath(pathname, href)` for sidebar/nav highlighting.
4.  **Case Sensitivity**:
    - ALWAYS `.toLowerCase()` the `tenant` parameter before querying the database to prevent 404s.

---

## 5. Standard Component Snippets

### Admin Page Container
```tsx
<div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-10">
  <AdminPageHeader 
    title="Module Name" 
    description="Brief instruction about this module."
  >
    <Button>Primary Action</Button>
  </AdminPageHeader>
  
  <div className="grid gap-6">
    {/* Page Content */}
  </div>
</div>
```

### Premium Metric Card
```tsx
<div className="p-8 bg-white dark:bg-slate-900 border-2 border-slate-100/50 dark:border-slate-800/50 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
  <div className="p-3 w-fit rounded-2xl bg-primary/10 mb-4">
    <Icon className="w-6 h-6 text-primary" />
  </div>
  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
  <p className="text-4xl font-black mt-1 leading-none">{value}</p>
</div>
```
