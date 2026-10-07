# ICA Administration Control Model & CRUD Architectural Specification

## 1. Overview
The ICA Command Hub (Control Centre) provides unified, centralized, quad-lingual management across all public and sovereign administrative surfaces for the Iraqi-Chinese Agency (ICA) ecosystem.

## 2. Control Scope
Every card, component, section, and navigation item on the public website is governed via the Command Hub.
- **Navigation Entities**: Header Navigation, Footer Columns & Links, Mobile Drawer, Breadcrumb Hierarchy, and Command Hub Sidebar.
- **Home Page Sections**:
  1. Hero Section
  2. Live Broadcast Band
  3. Intelligence Wire Ticker
  4. Quick Stats Strip
  5. World Stories Section
  6. Trending Section
  7. Strategic Initiatives Section
  8. Featured Publications
  9. Data Snapshot
  10. Expert Spotlight
  11. Media Preview
  12. Upcoming Events
  13. Strategic Partners Marquee
  14. Newsletter Intelligence Signup
  15. Download App PWA Promo Card
- **Card Entities**: Eyebrow, Headline, Body, Chips, CTA Label & Href, Image, Alt Text, Display Order, Visibility, Style Variant.
- **Component & Section Entities**: Background Color, Text Color, Border Color, Border Radius, Padding, Margin, Shadow, Alignment, Animation.

## 3. Customization Model
Every manageable entity implements the `CustomizationModel` schema:
```json
{
  "displayOrder": 1,
  "visibility": "visible",
  "scheduleFrom": null,
  "scheduleTo": null,
  "styleOverrides": {
    "backgroundColor": null,
    "textColor": null,
    "borderColor": null,
    "borderRadius": null,
    "padding": null,
    "margin": null,
    "shadow": null
  },
  "variant": "diplomatic-card",
  "customCss": null,
  "localeOverrides": {
    "en": null,
    "ar": null,
    "zh": null,
    "ckb": null
  }
}
```

## 4. Seven-Part Standard CRUD Pattern
Every administrative surface implements:
1. **Header**: Section title, role clearance badge, and "Create Record" action.
2. **Filter & Search Bar**: Multi-query search, status filter, sorting options, and bulk operations.
3. **List View**: Paginated or sorted table with row actions (Edit, Preview, Duplicate, Hide/Show, Delete, Restore).
4. **Create/Edit Form**: 5-tab interface:
   - *Content Tab*: Titles, body, badges, links, media URLs.
   - *Style Tab*: Visual style overrides (background, borders, radius, padding, margins, shadow).
   - *Visibility Tab*: Visible / Hidden / Scheduled date-time picker.
   - *Localization Tab*: 4-language editor (EN, AR, ZH, CKB) with machine-translation draft tools.
   - *Advanced Tab*: Custom CSS, raw JSON parameters, metadata.
5. **Preview Panel**: Live synchronous viewport preview of the rendered component.
6. **History Tab**: Revision ledger with timestamps, actors, diffs, and instant rollback.
7. **Danger Zone**: Soft-delete, restore from archive, and permanent destruction (Superadmin only).
