# Project Instructions for Codex

## Primary mission: UI/UX redesign only

This repository is an existing, working job-board and recruitment platform. The developer built the project and its application logic already. Your assignment is to improve the user interface and user experience so the product feels intentionally designed, distinctive, warm, calm, trustworthy, and professional.

**The existing application is the source of truth. Preserve its behavior. Change presentation, not functionality.** Read `UI_DESIGN_GUIDELINES.md` before making UI changes and follow it alongside these instructions.

## Non-negotiable preservation rules

Do not rewrite, remove, replace, rename, or refactor working application logic as part of this visual redesign. In particular, do not change:

- Backend code, controllers, services, middleware, server routes, or server-side business logic.
- Database schemas, migrations, models, queries, relationships, or persistence behavior.
- API endpoints, methods, request/response contracts, payload shapes, or integration logic.
- Frontend route paths, route names, route parameters, route guards, redirects, or navigation semantics.
- Authentication, authorization, sessions, roles, permissions, or account flows.
- Employer job creation, editing, saving, publishing, unpublishing, and management behavior.
- Employer applicant-review workflows and application-status update logic.
- Candidate job browsing, CV/resume upload, application submission, and application-tracking behavior.
- Existing status values, transitions, validation rules, file handling, upload configuration, or error handling.
- State management, stores, composables, hooks, services, watchers, computed values, data-fetching functions, or asynchronous operations.
- Existing form submission handlers, event handlers, props, emits, model field names, and backend data mappings.
- Existing dynamic content, authorization-dependent UI behavior, loading states, empty states, and success/failure feedback.

Never replace real data with mock content or static demos. Never invent jobs, applicant counts, salary figures, employer names, testimonials, hiring statistics, or other claims. Never add fake interactions or buttons that do not work.

Do not remove an existing field, action, status, or feature just because it is difficult to fit into the new layout. Find a suitable presentation for it while preserving its behavior.

## Safe implementation approach

1. Inspect the repository before editing. Identify the framework, UI entry points, existing styles, routing, data flow, and boundaries between presentation and business logic.
2. Check Git status and the existing diff if Git is available. Treat pre-existing modifications as the developer's work; do not overwrite, discard, reset, stash, or revert them.
3. Locate the public job-board pages, employer dashboard and job forms, candidate dashboard, application-tracking pages, CV/resume upload UI, and applicant status-management UI.
4. Prefer focused changes to templates, markup, CSS, scoped styles, layout components, and existing presentational components.
5. When editing a component that combines markup and logic, preserve the existing script and functional bindings. Do not replace the whole component for convenience.
6. Preserve bindings and directives, including (as applicable) `v-model`, `v-if`, `v-for`, `@click`, `@submit`, `:class`, props, emits, form names, and route links. You may adjust presentation markup if you retain and verify their semantics and functionality.
7. Do not alter business logic to accommodate a visual effect. If the design cannot be implemented safely without a functional change, keep the current behavior and choose a safer visual solution.
8. Avoid unnecessary dependencies, new frameworks, broad refactors, and unrelated changes.
9. Do not change backend, route-configuration, API-contract, database, or controller files for this UI task.
10. After editing, inspect the diff and check that every change is presentation-focused. Run appropriate existing build, lint, type-check, or test commands when available. Do not claim a check passed unless you ran it and observed the result.

## Core application journeys to preserve

### Employers
- Create, edit, save, and publish job listings using existing functionality.
- Display existing job fields such as title, description, salary, requirements, location, employment type, or other fields only when supported by the current project.
- Review applicants for a job.
- Update an application through the existing supported statuses, which may include Applied, Shortlisted, Interviewed, Hired, and Rejected.
- Preserve current permissions, validation, persistence, notifications, and status-update behavior.

### Candidates
- Browse available jobs using the existing data and filters/search controls if implemented.
- Open an individual job details page through existing navigation.
- Upload a CV/resume using the current file-upload implementation and constraints.
- Submit an application through the existing flow.
- Track application statuses supplied by the real application data.

The exact routes, fields, statuses, and behavior in the repository take precedence over this summary. Do not introduce or assume functionality that is not already implemented.

## Design execution standards

- Follow `UI_DESIGN_GUIDELINES.md` for the visual direction, components, color palette, typography, interaction polish, accessibility, and responsive behavior.
- Make candidate and employer experiences feel like one cohesive brand while optimizing each for its distinct tasks.
- Keep interfaces understandable, calm, readable, and purposeful. Do not sacrifice clarity for decoration.
- Avoid a generic AI-generated/template look: do not default to an all-white canvas, all-black/dark dashboard, giant gradients, repeated rounded cards, excessive glassmorphism, pointless charts, decorative icon grids, or identical dashboard layouts.
- Retain the project's existing information architecture and behavior unless a change is strictly presentational.

## Completion report

When finished, report:

1. Which presentation files were changed and the user-facing improvements made.
2. Which existing workflows were intentionally preserved.
3. The checks actually run and their results.
4. Any visual details that could not be safely implemented.
5. Whether backend, controller, route, API, database, or business-logic files were changed. The expected answer for this task is **no**. If any such file was changed, explain why immediately and identify the exact change; do not conceal it.
