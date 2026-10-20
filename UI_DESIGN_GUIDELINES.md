# UI Design Guidelines — Job Board & Recruitment Platform

## 1. Product and design goal

This is an existing job-board and recruitment platform with two connected experiences:

- **Candidate experience:** discover opportunities, review job details, submit applications with a CV/resume, and track application progress.
- **Employer experience:** create and publish jobs, review applicants, and update candidate application statuses through the current workflow.

Redesign the presentation so the site feels like a thoughtfully art-directed, established product—not a stock admin template or a generic AI-generated dashboard. The visual quality should convey opportunity, trust, care, and professionalism. The website should feel welcoming to job seekers while giving employers a focused workspace for recruiting.

**This document defines presentation only.** Existing routes, dynamic data, permissions, content semantics, forms, status values, API calls, upload behavior, and business logic must remain intact. Follow `AGENTS.md` for implementation boundaries.

## 2. Creative direction: calm, human, optimistic, and editorial

Aim for a polished, contemporary employment platform with a soft, bright atmosphere and strong editorial structure. It should feel considered and recognizable rather than assembled from familiar SaaS patterns.

Design attributes:

- Calm and reassuring for people navigating an important career decision.
- Optimistic and approachable, without feeling childish or overly playful.
- Professional enough for employers and recruiters to trust.
- Clear, readable, and efficient for repeated daily tasks.
- Distinctive through typography, composition, color restraint, hierarchy, and subtle detail—not through decorative overload.

Use a balanced mix of warm-tinted backgrounds, pale color surfaces, crisp content panels, clear typography, and one recognizable brand accent. White may be used for cards and forms, but do not leave the entire experience as a flat, pure-white canvas. Avoid a dominant black background or an unnecessarily dark dashboard.

Do not copy any existing company's distinctive design. Do not use a default component-library look without meaningful art direction.

## 3. Suggested visual palette

First inspect the repository for an existing brand palette, CSS variables, theme tokens, logos, or color conventions. Respect a coherent existing brand and refine it rather than replacing it arbitrarily. If no established system exists, use this palette as a starting point and adapt it to the app's identity.

- **Warm mist** `#F5F7F2` — primary page background; softer than pure white.
- **Soft sage** `#DCE9DF` — quiet section backgrounds and supporting surfaces.
- **Deep evergreen** `#285B4B` — primary brand/action color, used carefully.
- **Muted teal** `#6FA89A` — secondary emphasis and supportive visual cues.
- **Pale sky** `#E5EFF7` — occasional cool-toned surface for secondary sections.
- **Warm sand** `#F1E6D4` — occasional warmth for highlights or low-emphasis panels.
- **Ink** `#26332F` — primary text; prefer this softened near-black over pure black.
- **Muted slate** `#65736E` — secondary text, metadata, and supporting labels.
- **White** `#FFFFFF` — forms, reading surfaces, and panels where contrast helps.
- **Border** `#DFE7E0` — subtle dividers and control boundaries.
- **Success / warning / error colors** — use accessible semantic tones aligned with the existing status meanings; do not change status logic or rely on color alone.

Treat these values as a coherent starting system, not a requirement to use every color on every page. Keep backgrounds bright, slightly tinted, and easy on the eyes. Use the brand color consistently for key actions. Check text contrast, especially for muted text and colored badges. Do not make every section a different color.

Create reusable CSS variables or tokens only in the existing styling approach when practical. Avoid adding a new styling framework just to apply the palette.

## 4. Typography and text hierarchy

Use a deliberate, human-feeling typographic system. If the project already has suitable fonts, prefer those. Otherwise choose a highly readable sans-serif for body/UI text and, only if it improves the visual identity, a restrained editorial display face for major headings. Do not add external font dependencies without a clear reason and reliable integration.

Establish clear levels for:

- Main page headings.
- Section titles.
- Job titles and candidate-facing role names.
- Salary, location, employment type, and other job metadata.
- Employer and candidate names where permitted and available.
- Form labels, helper text, validation, and status information.
- Primary and secondary actions.

Use generous but controlled line-height, readable body sizes, comfortable line lengths, and consistent font weights. Avoid exaggerated oversized headings on every page, excessive uppercase labels, tiny gray text, and repetitive marketing-style subheadings.

Do not rewrite dynamic job descriptions or other existing product content just to match the design. Improve its presentation and hierarchy.

## 5. Layout principles: intentional, not templated

- Create a consistent spacing system and align content to a deliberate grid.
- Use sufficient negative space so pages feel calm without wasting space.
- Introduce visual variation through layout, typography, and clear grouping—not through a card around every element.
- Use borders and shadows sparingly and consistently. Prefer subtle boundaries and layered tinted surfaces over heavy shadows.
- Keep corner radii restrained and coherent; not every button, input, card, badge, and panel needs a pill shape.
- Use icons only when they clarify meaning. Use the icon solution already present in the project when possible; do not decorate every heading with an icon.
- Keep dashboard summaries focused on real, existing data. Do not invent metrics, charts, activity feeds, or statistics.
- Preserve existing information architecture, route structure, and functional navigation.

## 6. Public job-discovery pages

The candidate-facing job board should immediately communicate opportunity, clarity, and trust.

### Header and navigation

Create a balanced header using the existing logo/brand and navigation destinations. Make the primary job-search or job-browsing action easy to find where supported. Preserve current sign-in, registration, account, and role-specific navigation behavior. Do not add links to routes that do not exist.

### Candidate landing or job-listing page

If the project has a public landing page, give it a clear introduction and one obvious path into job discovery. Avoid a generic, oversized gradient hero. Consider a softly tinted or layered background, disciplined headline typography, and a useful search area only if the current product supports search.

Present real job listings in a scannable layout. Prioritize role title, employer, location, salary when supplied, employment type when supplied, and other relevant existing fields. Make each listing's clickable area and route clear. Vary composition only when it improves scanning; do not create a wall of identical oversized cards.

If search, filters, or sorting already exist, retain them and style them clearly. Do not add filter controls that have no working behavior. Empty results should use a helpful, calm empty state based on the actual state of the application—never fake listings.

### Job details page

Give the job title clear visual prominence. Organize the existing description, requirements, salary, location, employer details, employment type, and other available information into readable groups. Keep the existing apply action prominent and easy to locate. On narrow screens, keep the main content comfortable to read and make the existing apply flow accessible.

Do not fabricate missing salary details, employer information, job benefits, requirements, or availability. If a field is absent, follow the app's existing empty/missing-data behavior.

## 7. Candidate dashboard and application tracking

Make the candidate dashboard feel supportive and organized rather than clinical. The candidate should be able to recognize their submitted applications and understand their current status quickly.

- Give the page a clear title and organized content hierarchy.
- Present existing applications with useful information such as job title, employer, application date, and current status only when that data exists.
- Make status labels easy to distinguish and readable without relying only on color.
- Use restrained semantic status treatments. Preserve every existing status value and its meaning.
- Create readable empty, loading, error, and success states based on the current implementation.
- Keep the existing CV/resume upload and application submission paths intact.

For the CV/resume upload UI, clearly communicate the existing accepted file types, size constraints, and current upload requirements if they are already defined by the application. Do not invent or alter upload limits. Keep progress and error feedback connected to existing upload behavior.

Do not create a fake progress timeline, promise-based hiring prediction, or invented candidate score.

## 8. Employer dashboard and job management

The employer experience should feel focused, efficient, and professional while sharing the same brand language as the candidate-facing website.

### Dashboard overview

Use a clear page heading, a sensible navigation structure based on existing routes, and the main existing actions, such as creating a job or reviewing applicants. Show counts or summaries only when supplied by real existing data. Avoid meaningless charts, invented performance metrics, decorative KPI cards, and overly dense admin panels.

### Job creation and editing

Present existing fields in a clear sequence. Typical fields may include role title, description, salary, location, employment type, qualifications, and requirements, but the repository's actual fields take precedence.

- Keep form labels visible and associated with their inputs.
- Provide readable spacing and consistent control heights.
- Preserve existing required fields, validation, field names, bindings, and submission behavior.
- Make primary and secondary actions distinct.
- Keep helper text concise and useful where existing requirements support it.
- Retain all existing save, edit, publish, and unpublish behavior.

Do not redesign a form into a nonfunctional mockup. Do not change backend payloads or field names to fit a new visual layout.

### Applicant management

Make applicants easy to review and their statuses easy to understand. Use the current information architecture and actual applicant data. Depending on the existing page, improve table/list spacing, candidate information hierarchy, status labels, and action placement.

Preserve the current available transitions and submission handlers, including statuses such as Applied, Shortlisted, Interviewed, Hired, and Rejected where implemented. Do not rename statuses, invent transitions, alter permissions, or bypass existing confirmation and validation behavior.

Ensure status controls remain usable on smaller screens. If a table already exists, use a responsive presentation that retains all actions and data rather than simply hiding columns that matter.

## 9. Shared components and design consistency

Create or refine shared styling for components that already exist across the application, such as:

- Primary, secondary, and text buttons.
- Text inputs, text areas, selects, and file-upload controls.
- Job listing cards or rows.
- Status badges and application-state indicators.
- Page headings and section headers.
- Navigation, tabs, and pagination where already present.
- Empty states, helper text, validation messages, and notices.

Use shared components or design tokens only where they naturally fit the existing architecture. Do not force a large refactor or change component contracts for consistency. Keep candidate and employer areas visually related but allow their layouts to differ according to task needs.

## 10. Interaction states and visual polish

Polish the appearance of existing interactions:

- Hover and focus-visible states.
- Pressed and disabled buttons.
- Input focus, validation errors, and helper text.
- Existing loading indicators and asynchronous operation feedback.
- Empty states, existing success messages, and errors.
- Existing application-status labels and controls.
- CV/resume upload progress and outcomes where already implemented.

Use subtle, quick transitions only when they improve feedback. Respect `prefers-reduced-motion`. Essential information and actions must not depend on hover. Do not simulate a successful save, application, upload, or status update for visual effect.

## 11. Responsive design and accessibility

Design for desktop, tablet, and mobile intentionally—not just by shrinking desktop elements.

- Prevent unintended horizontal overflow.
- Maintain comfortable text size, line length, and spacing.
- Adjust navigation and job-list layouts for narrow screens.
- Keep critical actions and status information visible and operable.
- Preserve all functionality when adapting tables or multi-column layouts.
- Use semantic HTML and proper heading order.
- Associate labels with fields and expose accessible names for icon-only controls.
- Maintain visible keyboard focus and keyboard operation.
- Provide useful alternative text for meaningful images.
- Meet accessible color contrast expectations.
- Do not communicate application statuses through color alone.
- Respect reduced-motion preferences.

## 12. Avoid the generic AI-template look

Do not default to these overused patterns unless the existing brand clearly requires them and there is a specific design reason:

- A pure-white background across every page with no tonal variation.
- An entirely black/dark dashboard or an oversized dark hero.
- Large purple/blue gradients used as a substitute for visual identity.
- Glassmorphism or blurred translucent panels without a product need.
- The same set of rounded cards repeated across every section.
- A generic centered hero with oversized heading and unrelated floating UI cards.
- Unnecessary charts, fake KPIs, activity feeds, testimonials, or fabricated social proof.
- Random decorative icons, emoji-as-icons, excessive pills, and overdone shadows.
- Busy animations or novelty effects that slow ordinary work.
- Placeholder text or fake job listings replacing the project's real dynamic content.

Instead, make the design recognizable through an intentional palette, typography, pacing, layout, and practical attention to how job seekers and employers use the product.

## 13. Recommended workflow

1. Inspect the current implementation, its design conventions, assets, routes, UI pages, and reusable components.
2. Check existing project changes before editing and preserve any work in progress.
3. Identify presentation files for public discovery, job details, candidate dashboard, candidate application tracking, employer dashboard, job forms, applicant management, and CV upload.
4. Plan a cohesive visual language and apply it in the least invasive way.
5. Implement visual changes in existing templates/components and style files. Keep data and logic intact.
6. Review responsive states and accessibility.
7. Inspect the final diff for accidental functional changes.
8. Run existing checks/builds where possible and report results honestly.

## 14. Definition of success

The redesigned platform should be:

- Visually distinctive, calm, bright, inviting, and professional.
- Easy to read and navigate for both candidates and employers.
- Consistent across the public job board and both dashboard experiences.
- Designed around real job information and existing user tasks.
- Free from unnecessary template-like decoration and fabricated UI data.
- Responsive and accessible.
- Built on the existing project architecture without breaking behavior.

Most importantly, the product's original functionality must remain unchanged. Improve how the existing application looks and feels; do not rebuild how it works.
