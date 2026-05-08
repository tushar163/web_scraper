# 📰 HackerNews Stories — Frontend

A Next.js frontend application to browse, authenticate, and bookmark stories scraped from Hacker News.

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.jsx          # Login page
│   │   └── register/
│   │       └── page.jsx          # Register page
│   ├── (module)/
│   │   ├── stories/
│   │   │   ├── page.jsx          # All stories listing
│   │   │   └── layout.jsx        # Stories layout
│   │   └── bookmark/
│   │       └── page.jsx          # Bookmarked stories
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js                 # Root layout
│   └── page.js                   # Root redirect → /login
│
├── components/
│   ├── CustomTable.jsx           # Reusable paginated table
│   ├── CustomCell.jsx            # Dynamic cell renderer
│   ├── Header.jsx                # Top navbar with logout dropdown
│   └── Sidebar.jsx               # Side navigation
│
├── context/
│   └── TableContext.jsx          # Generic table state management
│
├── data/
│   └── TableHeader.js            # Column definitions
│
└── services/
    ├── apiService.js             # All API calls (stories, bookmarks)
    └── authService.js            # Login & register API calls
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm or yarn
- Backend server running on `http://localhost:4000`

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

---

## 🔑 Environment Variables

| Variable                   | Description              | Example                     |
|----------------------------|--------------------------|-----------------------------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL     | `http://localhost:4000`     |

---

## 🌐 Pages & Routes

| Route        | Description                              | Protected |
|--------------|------------------------------------------|-----------|
| `/`          | Redirects to `/login`                    | ❌        |
| `/login`     | Login with email & password              | ❌        |
| `/register`  | Register with name, email & password     | ❌        |
| `/stories`   | All stories with bookmark toggle         | ✅        |
| `/bookmark`  | User's saved bookmarks                   | ✅        |

---

## 🔒 Auth Flow

1. User logs in → backend returns a **JWT token**
2. Token is saved in **cookies** via `js-cookie`
3. Every API request sends `Authorization: Bearer <token>` in headers
4. **Next.js proxy** (`proxy.js`) guards all protected routes
5. Unauthenticated users are redirected to `/login?redirect=<original_path>`
6. After login, user is sent back to the originally requested page
7. On logout → cookie is removed → redirect to `/login`

```
Visit /stories (not logged in)
        ↓
proxy.js intercepts
        ↓
Redirect → /login?redirect=/stories
        ↓
User logs in successfully
        ↓
Redirect → /stories  ✅
```

---

## 🧩 Key Components

### `CustomTable.jsx`
Reusable paginated table powered by `TableContext`. Just pass `columns` and it handles everything else — pagination, loading state, empty state.

```jsx
<TableProvider fetchFn={fetchStories} bookmarkFn={toggleBookmark}>
    <CustomTable columns={STORY_COLUMNS} />
</TableProvider>
```

### `CustomCell.jsx`
Renders each table cell dynamically based on `columnKey`:

| Column Key    | Renders                              |
|---------------|--------------------------------------|
| `isBookmarked`| Filled / outline bookmark button     |
| `actions`     | Edit + Delete icon buttons           |
| `expiryDate`  | Formatted date string                |
| default       | Plain text (truncated at 200 chars)  |

### `TableContext.jsx`
Generic Context API for table state — works for **any module** by passing its own `fetchFn`:

```jsx
// Stories page
<TableProvider fetchFn={fetchStories} bookmarkFn={toggleBookmark} />

// Bookmarks page
<TableProvider fetchFn={getBookmarks} bookmarkFn={toggleBookmark} />

// Any future module
<TableProvider fetchFn={fetchUsers} deleteFn={deleteUser} />
```

State managed: `rows`, `page`, `limit`, `total`, `totalPages`, `isLoading`, `loadingId`

Actions exposed: `setPage`, `setLimit`, `handleBookmarkToggle`, `handleDelete`, `reload`

### `Sidebar.jsx`
Fixed left navigation with active route highlighting.

| Link        | Icon                        |
|-------------|-----------------------------|
| Stories     | `gravity-ui:book-open`      |
| Bookmarks   | `gravity-ui:bookmark-fill`  |

### `Header.jsx`
Fixed top bar with a user dropdown containing Profile, Settings, and Logout.

---

## 🔌 API Services

### `authService.js`

```js
login(formData)       // POST /api/auth/login
register(formData)    // POST /api/auth/register
```

### `apiService.js`

```js
fetchStories({ page, limit })   // GET  /api/stories?page=1&limit=10
FetchStoryById(id)              // GET  /api/stories/:id
toggleBookmark(id)              // POST /api/stories/:id/bookmark
getBookmarks()                  // GET  /api/stories/bookmarks/me
```

All requests automatically attach the `Authorization: Bearer <token>` header from cookies.

---

## 📦 Tech Stack

| Package            | Purpose                        |
|--------------------|--------------------------------|
| Next.js 14         | React framework (App Router)   |
| HeroUI             | UI component library           |
| Iconify            | Icon library                   |
| js-cookie          | Cookie management (JWT token)  |
| React Context API  | Global table state management  |

---

## 📝 Folder Conventions

| Folder        | Purpose                                                   |
|---------------|-----------------------------------------------------------|
| `app/`        | Next.js App Router pages and layouts                      |
| `components/` | Reusable UI components                                    |
| `context/`    | React Context providers                                   |
| `services/`   | All API call functions                                    |
| `data/`       | Static config data (table column definitions)             |

---

## ⚠️ Notes

- Auth pages (`/login`, `/register`) are outside the dashboard layout — no sidebar or header shown
- The `(auth)` and `(module)` folders are Next.js **route groups** — they don't affect the URL
- `TableContext` is intentionally generic — pass any `fetchFn` to reuse the same table for any data module
- `confirmPassword` is validated client-side only and is never sent to the API