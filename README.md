Perfect — this is the last missing layer to make this spec truly senior-grade and AI-proof.

Below is the FINAL, COMPLETE AI AGENT BUILD SPEC, with Prettier, ESLint (strict), absolute imports, and zero ambiguity.

You can hand this to Claude Code and expect clean, review-ready output.

⸻

🧠 AI AGENT – FINAL BUILD SPEC

Airbnb-Style Admin Dashboard (Portfolio Project)

This document defines hard technical constraints.
Violations are considered incorrect output.

⸻

🎯 Project Goal

Build a production-style Airbnb Admin Dashboard using Next.js App Router with:
• real backend (no mock data)
• senior-level architecture
• strict linting & formatting
• testable components
• clean, boring, professional code

This project will be reviewed as portfolio work.

⸻

🧱 Tech Stack (MANDATORY)

Frontend
• Next.js (App Router)
• TypeScript (strict = true)
• shadcn/ui
• Install WITHOUT version tags
• Use official shadcn CLI only
• ❌ NEVER manually edit package.json
• Zustand (client state only when justified)
• TanStack Query OR Axios
• Prefer server fetch
• Prefer Server Actions
• Client queries only when unavoidable

Forms & Validation
• React Hook Form
• Zod
• Zod schemas are the single source of truth
• Backend + frontend must reuse schemas where possible

Backend
• Next.js Route Handlers (app/api)
• REST only
• Prisma ORM
• PostgreSQL

Tooling
• ESLint (strict)
• Prettier
• Absolute imports only (no relative ../../../)

Testing
• Jest or Vitest
• React Testing Library
• Components must be testable

⸻

📁 Folder Structure (STRICT)

src/
├── app/
│ ├── (auth)/
│ ├── (dashboard)/
│ ├── api/
│ ├── layout.tsx
│ └── page.tsx
│
├── features/
├── components/
├── lib/
├── utils/
├── types/
├── tests/
└── styles/

⸻

🔀 ABSOLUTE IMPORTS (MANDATORY)

tsconfig.json

{
"compilerOptions": {
"baseUrl": "src",
"paths": {
"@app/_": ["app/_"],
"@features/_": ["features/_"],
"@components/_": ["components/_"],
"@lib/_": ["lib/_"],
"@utils/_": ["utils/_"],
"@types/_": ["types/_"]
}
}
}

❌ Forbidden

import Button from '../../../components/Button'

✅ Required

import { Button } from '@components/ui/button'

⸻

🎨 Prettier (MANDATORY)

.prettierrc

{
"semi": false,
"singleQuote": true,
"trailingComma": "es5",
"printWidth": 100,
"tabWidth": 2,
"arrowParens": "avoid"
}

Rules
• Prettier controls formatting
• ESLint must not conflict with Prettier
• No manual formatting

⸻

🚨 ESLint (STRICT MODE)

Required ESLint Principles
• No any
• No unused variables
• No implicit returns
• No default exports for shared components
• Explicit dependency arrays
• No console logs (except in dev utils)

.eslintrc.json

{
"extends": [
"next/core-web-vitals",
"eslint:recommended",
"plugin:@typescript-eslint/recommended",
"plugin:react-hooks/recommended",
"prettier"
],
"rules": {
"@typescript-eslint/no-explicit-any": "error",
"@typescript-eslint/no-unused-vars": ["error"],
"@typescript-eslint/explicit-function-return-type": [
"warn",
{ "allowExpressions": true }
],
"react-hooks/exhaustive-deps": "error",
"no-console": ["error", { "allow": ["warn", "error"] }],
"import/no-default-export": "off"
}
}

⸻

🧠 Architectural Rules (NON-NEGOTIABLE)

1️⃣ App Router = Routing Only
• No business logic
• No data transformation
• Pages compose feature components only

export default function Page() {
return <ListingsTable />
}

⸻

2️⃣ Feature Ownership

Each feature owns:
• components
• api calls
• schemas
• types
• utils

❌ No cross-feature imports
❌ No global services/ folder

⸻

3️⃣ State Management
• Server state by default
• Local component state first
• Zustand only when shared client state is unavoidable

⸻

4️⃣ Data Fetching Priority 1. Server fetch 2. Server Actions 3. TanStack Query / Axios (client only)

⸻

5️⃣ Validation
• Zod schemas are reused
• Backend validates every mutation
• Forms use the same schema

⸻

6️⃣ Testability Rules

Components must:
• Receive data via props
• Avoid direct fetch/DB calls
• Have deterministic rendering
• Be testable with RTL

<ListingsTable listings={listings} />

⸻

🗃️ Database Schema (Prisma)

(unchanged — already correct and senior)

⸻

🌐 API Contracts

(unchanged — REST, minimal, predictable)

⸻

🧩 UI Components
• Built on shadcn/ui
• No custom styling hacks
• No magic props
• Accessibility preserved

⸻

🧪 Seed Data
• Prisma seed script
• Small, realistic dataset
• Deterministic data

⸻

📘 README (REQUIRED)

Must explain: 1. Architecture decisions 2. Why shadcn 3. Why strict ESLint 4. Absolute imports rationale 5. Server vs client decisions 6. Trade-offs 7. What would change in real prod

⸻

🚫 ABSOLUTELY FORBIDDEN

❌ Manual package.json edits
❌ Version-pinned shadcn installs
❌ Relative imports
❌ Mock data
❌ Untestable components
❌ Over-engineering

⸻

🏁 Success Definition

If a senior reviewer opens the repo, they should think:

“This codebase feels calm, predictable, and production-ready.”

⸻

Next (optional)

I can:
• Generate the exact Claude Code prompt
• Write the README.md
• Define test cases
• Define commit conventions
• Review the generated code like a hiring manager

Say the word:
👉 “Generate Claude Code prompt”
