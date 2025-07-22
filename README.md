# Deep Engineering Website

A modern, production-grade web platform for Deep Engineering, built with Next.js 15, React 18, TypeScript, and a custom CMS. This project powers the public site, investor portal, and admin dashboard for managing KPP technology projects in Iraq and the Kurdistan region.

---

## 🚀 Tech Stack

- **Frontend:** Next.js 15 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS, Radix UI, Lucide Icons, Framer Motion
- **Backend/CMS:** Custom Node.js API (Express), SQLite 3 (better-sqlite3)
- **Authentication:** JWT, bcrypt, role-based access control
- **State Management:** React Context
- **Testing:** Jest, React Testing Library
- **DevOps:** Docker, Husky, lint-staged, Prettier, ESLint

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Tonihabeeb/de-website.git
cd de-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

### 5. Set Up the Database

The SQLite database will be initialized automatically on first run. To create a super admin user:

```bash
npx ts-node scripts/create-super-admin.ts
```

---

## 🛠️ Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint
- `npm run format` — Format code with Prettier
- `npm run test` — Run unit tests
- `npm run backup` — Backup the database

---

## 🧑‍💻 Contributing

1. Fork the repo and create your branch from `main`.
2. Install dependencies and set up your `.env.local`.
3. Use `npm run lint` and `npm run format` before committing.
4. All commits are checked with Husky pre-commit hooks (lint-staged).
5. Submit a pull request with a clear description of your changes.

---

## 📁 Project Structure

```
app/                # Next.js app directory (pages, API routes, layouts)
components/         # Reusable React components
backend/            # Custom Node.js/Express API (admin, CMS)
database/           # SQLite DB, migrations, models
public/             # Static assets (images, icons, uploads)
scripts/            # Utility scripts (DB, admin, etc.)
contexts/           # React context providers
utils/              # Utility functions
__tests__/          # Unit and integration tests
```

---

## 🛡️ Security & Best Practices

- All sensitive config is managed via environment variables
- Pre-commit hooks enforce code quality (lint, format)
- Role-based access control for admin/CMS
- Regular dependency updates and security audits

---

## 📄 License

This project is proprietary and confidential. All rights reserved to Deep Engineering.

---

## 📞 Contact

For support or inquiries, contact: [info@deepengineering.co](mailto:info@deepengineering.co)

## Integration Test Workaround for Next.js/Jest/ESM Context and API Mocking

When writing integration tests for components that use context (e.g., AuthContext) and custom API utilities in a Next.js/TypeScript project, you may encounter issues with Jest not picking up mocks due to ESM/CJS interop and path aliasing quirks. To ensure reliable tests:

- Always mock both `@/contexts/AuthContext` and `@/utils/api` at the very top of your test file (before any imports).
- Use async-safe queries like `await screen.findByText(...)` to wait for React state updates.
- If you encounter persistent context errors, try writing a pure JS test (see `__tests__/minimal-doclist.pure.test.js`) as a reference for debugging.

**Example:**

```js
jest.mock('@/contexts/AuthContext', ...);
jest.mock('@/utils/api', ...);
import ...
// ...test code...
```

See `__tests__/minimal-doclist.pure.test.js` for a working pattern.
