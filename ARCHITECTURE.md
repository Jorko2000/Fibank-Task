# Architecture Notes

## Feature boundaries

`features/auth` owns login validation and session state. `features/people` owns SWAPI access, asynchronous data loading and the data table.

## State management decision

Local state and a small React Context are sufficient for this task. A larger state library would add complexity without solving a real problem.

## Data fetching

The API call is isolated in `peopleApi.ts`, while `usePeople.ts` manages loading, errors, cancellation, retry and pagination state. This keeps the page focused on composition.

## Request cancellation

`AbortController` is used so a previous API request does not continue unnecessarily when the component unmounts or the page URL changes.

## Responsive design

The table preserves semantic `<table>` markup and uses an overflow container on small screens. This keeps all five required columns available instead of silently removing information.

## Accessibility

The implementation includes associated labels, validation messages, semantic table headers/caption, keyboard-focusable table scrolling and an ARIA live-friendly loading region.
