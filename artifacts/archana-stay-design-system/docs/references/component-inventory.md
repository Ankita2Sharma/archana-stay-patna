# Archana Stay component inventory

Source: the existing workspace app at `artifacts/archana-stay`.

This is a source-backed inventory of the app's reusable visual families. The
source is a single React application rather than a separately published
component package, so app-specific page compositions remain in the app. The
families below capture the reusable visual language that should move into this
design system first.

| Family | Reference | Dependencies / blockers | Evidence | Chunk | Status |
| --- | --- | --- | --- | --- | --- |
| Brand mark and wordmark | `components/brand.md` | None; source mark is CSS, no standalone logo asset | `src/App.tsx:87-97`, `src/index.css:107-114` | 1 | implemented |
| Action button | `components/action-button.md` | Token theme only | `src/App.tsx:126-128`, `src/index.css:120-131` | 1 | implemented |
| Search field | `components/search-field.md` | Input/select semantics remain app-owned | `src/App.tsx:162-269`, `src/index.css:153-164` | 1 | implemented |
| Property card | `components/property-card.md` | Property data and routing remain app-owned | `src/App.tsx:294-330`, `src/index.css:170-194` | 1 | implemented |
| Contact card | `components/contact-card.md` | Phone links and enquiry routing remain app-owned | `src/App.tsx:534-553`, `src/index.css:237-248` | 1 | implemented |

The first pass is intentionally limited to the five families above. Full page
compositions such as Home, Listings, PropertyDetail, Contact, and AdminPreview
are product-specific compositions and are not component-library entries.