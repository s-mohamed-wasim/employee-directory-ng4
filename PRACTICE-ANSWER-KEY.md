# Practice answer key

Legacy patterns and issues placed in this app on purpose. Use this list to check whether the audit (Step 3 of the Developer Guide) found them. A good audit should find most of them and may find more.

## Dependencies / configuration

| # | Where | Issue | Related checklist |
|---|---|---|---|
| 1 | `package.json` | `"moment": "*"` – wildcard version range (and the package is not even used) | AUDIT §1 |
| 2 | `package.json` | Angular 4, CLI 1.4, TypeScript 2.3, RxJS 5 – end-of-life stack; needs Node 8 | AUDIT §1, MIGRATION-CHECKLIST |
| 3 | `.angular-cli.json` | Legacy CLI config – becomes `angular.json` at Angular 6 | AUDIT §5 |
| 4 | `tslint.json` | TSLint + codelyzer – deprecated, replaced by ESLint (angular-eslint) | AUDIT §5 |
| 5 | `tsconfig.json` | `noImplicitAny: false`, `suppressImplicitAnyIndexErrors: true`, no strict mode | AUDIT §5, §8 |
| 6 | `e2e/`, `protractor.conf.js` | Protractor – deprecated | QUALITY – Tests |

## Security

| # | Where | Issue | Related checklist |
|---|---|---|---|
| 7 | `employee-detail.component.ts` | `bypassSecurityTrustHtml(emp.bio)` on user-editable data, rendered with `[innerHTML]` → XSS risk | SECURITY – DomSanitizer |
| 8 | `employee-form.component.html` | "Bio (HTML allowed)" – user input that ends up in #7 | SECURITY – Dynamic content |
| 9 | `auth.service.ts` | Access token stored in `localStorage` | SECURITY – Auth/session |
| 10 | `auth.service.ts` | `console.log` prints the token | SECURITY – Sensitive data logging |
| 11 | `login.component.ts` | `window.location.href = returnUrl` from query string – open redirect | SECURITY – DOM and navigation |
| 12 | `environments/*.ts` | Hard-coded API key (fake) in front-end code | SECURITY – Auth/session, Production config |
| 13 | `environment.prod.ts` | `enableDebugTools: true` in production | SECURITY – Production config |
| 14 | `src/index.html` | Bootstrap from CDN without SRI (`integrity`) | SECURITY – Production config |

## Suppressions

| # | Where | Issue |
|---|---|---|
| 15 | `employee.service.ts` | `// @ts-ignore` |
| 16 | `employee-detail.component.ts` | `// tslint:disable-next-line` |
| 17 | `app.component.spec.ts` | `NO_ERRORS_SCHEMA` |
| 18 | `filter.pipe.spec.ts` | Skipped test (`xit`) with a FIXME |

## Angular / RxJS quality

| # | Where | Issue | Related checklist |
|---|---|---|---|
| 19 | `dashboard.component.ts` | `setInterval` never cleared (memory leak) | QUALITY – RxJS and lifecycle |
| 20 | `dashboard.component.ts` | Nested subscriptions | QUALITY – RxJS and lifecycle |
| 21 | `employee-detail.component.ts` | Nested subscriptions on `route.params`, no teardown | QUALITY – RxJS and lifecycle |
| 22 | `employee.service.ts` | RxJS 5 patch operators (`rxjs/add/operator/*`) – must become pipeable operators (RxJS 6) | MIGRATION |
| 23 | `employee.service.ts`, `app.module.ts` | `@angular/http` (`Http`, `HttpModule`) – removed in Angular 8 → migrate to `HttpClient` | MIGRATION |
| 24 | `app-routing.module.ts` | String `loadChildren: './employees/employees.module#EmployeesModule'` – must become dynamic `import()` | MIGRATION |
| 25 | `shared/filter.pipe.ts` | Impure pipe (`pure: false`) | QUALITY – Angular design |
| 26 | `shared/highlight.directive.ts` | Direct DOM manipulation via `ElementRef.nativeElement.style` | AUDIT §2, SECURITY – DOM |
| 27 | `employee-list.component.ts` | `confirm()` in component; `visibleEmployees` getter used in template | QUALITY – Angular design |
| 28 | Several files | `console.log` / `console.error`, `TODO` / `FIXME` comments | AUDIT §6 |
