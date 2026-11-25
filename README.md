# Employee Directory – Angular 4 sample app

A small, realistic **Angular 4.4** application for practising the **Angular Upgrade Skill** (the 11 Markdown checklists and templates) and for taking the screenshots in the *Angular Upgrade Skill – Developer Guide*.

It is written the way many real Angular 4 projects were written in 2017, including a few typical legacy patterns, so that the audit and migration steps have real work to do.

## Tech stack (starting point for the migration)

| Item | Version |
|---|---|
| Angular | 4.4.x |
| Angular CLI | 1.4.10 (`.angular-cli.json`) |
| TypeScript | ~2.3 |
| RxJS | 5.4 (patch operators, `rxjs/add/operator/*`) |
| HTTP | `@angular/http` (legacy) **and** `HttpClient` |
| Lint | TSLint 5 + codelyzer |
| Unit tests | Karma + Jasmine |
| E2E | Protractor |
| Node.js | **8.x** (tested with 8.17.0) |

## Prerequisites

Angular CLI 1.x needs **Node.js 8**. Newer Node versions will fail during `npm install` (node-sass) or `ng build`.

On Windows use [nvm-windows](https://github.com/coreybutler/nvm-windows):

```bash
nvm install 8.17.0
nvm use 8.17.0
node -v   # v8.17.0
npm -v    # 6.x
```

## Run the app

```bash
git clone <this-repo-url>
cd employee-directory-ng4
npm install
npm start            # ng serve -> http://localhost:4200
```

**Login:** any username, password `demo`.

Other commands:

```bash
npm run build        # ng build --prod (AOT)
npm run lint         # ng lint
npm test             # ng test (Chrome)
npx ng test --single-run --browsers ChromeHeadlessCI   # headless, single run
```

Baseline status on Node 8.17.0: `ng build --prod` succeeds, `ng lint` passes, unit tests: 6 passed, 1 skipped.

## Features

- Login (template-driven form) with a route guard
- Dashboard with totals, employees by department and recent joiners
- Employees feature module, **lazy-loaded**: list with search filter, detail page, add/edit (reactive forms), delete
- Data is loaded from `src/assets/data/*.json` – no backend required

## Project structure

```
src/app
├── core/            AuthService, AuthGuard, EmployeeService (Http), DepartmentService (HttpClient)
├── shared/          HeaderComponent, FilterPipe, HighlightDirective
├── login/           LoginComponent
├── dashboard/       DashboardComponent
├── employees/       Lazy-loaded EmployeesModule (list, detail, form)
├── models/          Employee, Department
├── app-routing.module.ts
└── app.module.ts
```

## Practising with the Angular Upgrade Skill

1. Create a branch: `git checkout -b feature/angular-20-upgrade`
2. Create a `docs/` folder and copy the 11 skill `.md` files into it.
3. Open the folder in VS Code → Copilot Chat → **Agent** mode.
4. Follow Steps 3–10 of the Developer Guide: audit → plan → migrate one major version at a time (4→5, 5→6, … 19→20) → review → final report → final checklist.

After you run the audit, compare Copilot's findings with [`PRACTICE-ANSWER-KEY.md`](PRACTICE-ANSWER-KEY.md). (Try not to read it before the audit.)

> This repository is for training only. The API key in `src/environments` is a fake placeholder.
