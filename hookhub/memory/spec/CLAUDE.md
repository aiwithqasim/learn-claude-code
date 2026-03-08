# HookHub - Product & Technical Specification

## 1. Project Overview

HookHub is a web platform for discovering, browsing, and searching Claude Code Hooks. Claude Hooks are user-defined shell commands that execute in response to events within Claude Code (e.g., tool calls, notifications, model responses). HookHub serves as a centralized directory where developers can find hooks that extend their Claude Code workflow.

**Target Users:** Developers using Claude Code who want to enhance their workflow with community-built hooks.

---

## 2. Goals and Non-Goals

### Goals

- Provide a simple, fast interface to browse and search Claude Hooks.
- Categorize hooks so users can discover relevant ones quickly.
- Link users directly to the hook's source repository for installation.
- Ship a working MVP with minimal complexity.

### Non-Goals

- User authentication or accounts (MVP).
- Submitting or uploading hooks through the UI (MVP).
- Running or installing hooks directly from the platform.
- Rating, reviewing, or commenting on hooks.
- A backend API server — data is sourced statically from a GitHub repository.

---

## 3. User Stories

| # | As a... | I want to... | So that... |
|---|---------|-------------|-----------|
| 1 | Developer | browse all available hooks on the main page | I can discover hooks I didn't know existed |
| 2 | Developer | search hooks by keyword | I can quickly find a hook for a specific task |
| 3 | Developer | filter hooks by category | I can narrow results to a relevant domain |
| 4 | Developer | click on a hook to see its full details | I can understand what it does before using it |
| 5 | Developer | click a link to the hook's GitHub repository | I can view the source code and install it |

---

## 4. Core Features

### 4.1 Hook Directory (Main Page)

- Display all hooks in a responsive grid layout.
- Each hook card shows: **name**, **category badge**, and **short description**.
- Cards are clickable and navigate to the hook detail view.

### 4.2 Search

- A search bar at the top of the main page.
- Filters hooks in real-time by matching against name, description, and category.
- Client-side filtering (no backend search API needed for MVP).

### 4.3 Category Browsing

- A set of category filter buttons/chips displayed below the search bar.
- Clicking a category filters the grid to show only hooks in that category.
- An "All" option resets the filter.
- Categories are derived from the hook data (not hardcoded).

### 4.4 Hook Detail View

- Displays the full hook information:
  - Name
  - Category
  - Full description
  - Link to the GitHub repository (opens in a new tab)
- Accessible by clicking a hook card from the main page.
- Can be implemented as a modal/dialog or a separate route.

---

## 5. Data Model

Hooks are stored as a JSON file in the project repository (or fetched from a GitHub-hosted JSON file). No database is required for MVP.

### Hook Schema

```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "description": "string",
  "repositoryUrl": "string"
}
```

### Example

```json
{
  "id": "auto-lint",
  "name": "Auto Lint",
  "category": "Code Quality",
  "description": "Automatically runs your linter after Claude edits a file, catching style issues immediately.",
  "repositoryUrl": "https://github.com/example/auto-lint-hook"
}
```

### Data Source

- **MVP:** A local `hooks.json` file bundled with the frontend.
- **Future:** Fetch from a GitHub repository at build time or on page load via the GitHub API.

---

## 6. UI Structure

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Home / Directory | `/` | Main page with search, category filters, and hook grid |
| Hook Detail | `/hooks/:id` or modal | Full details for a single hook |

### Components

```
App
+-- HeaderBar
|   +-- Logo / Title
|   +-- SearchInput
+-- CategoryFilter
|   +-- CategoryChip (repeated)
+-- HookGrid
|   +-- HookCard (repeated)
|       +-- Hook Name
|       +-- Category Badge
|       +-- Description (truncated)
+-- HookDetailModal (or HookDetailPage)
    +-- Hook Name
    +-- Category Badge
    +-- Full Description
    +-- Repository Link Button
```

### Layout Description

- **HeaderBar:** Fixed top bar with the HookHub title/logo and the search input field.
- **CategoryFilter:** Horizontal row of clickable category chips directly below the header.
- **HookGrid:** Responsive CSS grid (3 columns on desktop, 2 on tablet, 1 on mobile) displaying hook cards.
- **HookCard:** A card component with a subtle border/shadow, showing the hook name (bold), a small category badge, and a 2-line truncated description.
- **HookDetailModal:** A centered modal (or dedicated page) showing the full hook information with a prominent "View on GitHub" button.

---

## 7. Basic System Architecture

```
+---------------------+
|   GitHub Repo       |
|   (hooks.json)      |
+----------+----------+
           |
           | imported / fetched at build time
           v
+---------------------+
|   Vue.js SPA        |
|                     |
|  - Static JSON data |
|  - Client-side      |
|    search & filter  |
|  - Vue Router       |
+----------+----------+
           |
           | deployed as static site
           v
+---------------------+
|   Static Hosting    |
|   (Vercel / Netlify |
|    / GitHub Pages)  |
+---------------------+
```

### Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue.js 3 (Composition API) |
| Routing | Vue Router |
| Styling | Tailwind CSS (or scoped CSS) |
| Build Tool | Vite |
| Data | Static JSON file |
| Hosting | Vercel, Netlify, or GitHub Pages |

### Key Decisions

- **No backend for MVP.** All data is bundled as a static JSON file. This keeps deployment simple and eliminates infrastructure costs.
- **Client-side search.** With a small dataset (< 500 hooks), filtering in the browser is fast and avoids API complexity.
- **Vue.js SPA.** Single-page application with Vue Router for clean navigation between the directory and detail views.

---

## 8. Future Improvements

| Priority | Improvement | Description |
|----------|------------|-------------|
| High | Hook submission form | Allow community members to submit new hooks via a form or GitHub PR workflow |
| High | GitHub API integration | Fetch hook data dynamically from a GitHub repository instead of a static file |
| Medium | Hook installation guide | Show copy-pasteable installation instructions on the detail page |
| Medium | Sort options | Sort hooks by name, date added, or popularity |
| Medium | Pagination | Paginate the grid when the hook count grows large |
| Low | User accounts | Allow users to sign in and save favorite hooks |
| Low | Rating & reviews | Let users rate and review hooks |
| Low | Hook analytics | Track which hooks are most viewed or clicked |
| Low | Dark mode | Support light and dark themes |
