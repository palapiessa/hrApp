# Developer Agent Implementation Plan

## Issue #15

# Employee Search Issue Analysis

## Summary
Add employee search functionality that filters the employee list based on first name and surname. The user should be able to enter one or more search terms and see only matching employees.

## Proposed implementation approach
1. **Add search input to the employee list UI**
   - Provide a text input above the employee list.
   - Capture user input and keep it in component state.

2. **Filter employees client-side**
   - When rendering the list, filter employees by matching the search term against:
     - first name
     - surname
   - Use case-insensitive matching.
   - Trim whitespace from the search input before filtering.

3. **Define matching behavior**
   - If a search term matches either first name or surname, include the employee.
   - Consider supporting partial matches so users can search by fragments of names.
   - If multiple terms are entered, decide whether to:
     - match all terms across first/surname fields, or
     - treat the full input as one string.
   - A practical default is to split on spaces and require all terms to match somewhere in the employee name.

4. **Keep filtering logic reusable**
   - Move the filtering logic into a helper function or selector if the list is shared across views.
   - This will make it easier to test independently.

5. **Preserve original list**
   - Ensure filtering does not mutate the source employee data.
   - Clearing the search input should restore the full list.

## Affected files
Likely candidates, depending on project structure:
- `src/components/EmployeeList.*` — add search input and filtered rendering
- `src/components/EmployeeSearch.*` — if search is split into a separate component
- `src/state/*` or `src/store/*` — if filtering is handled via state/selectors
- `src/utils/filterEmployees.*` — shared search/filter helper
- `src/types/*` — if employee model needs clarification or normalization fields
- `src/pages/Employees.*` — if the page owns the list and search UI

## Suggested tests
1. **Filtering by first name**
   - Given a list of employees, entering a first name returns matching employees only.

2. **Filtering by surname**
   - Entering a surname returns matching employees only.

3. **Case-insensitive matching**
   - Search should match regardless of capitalization.

4. **Partial match support**
   - Searching with a substring should return employees whose names contain that substring.

5. **Multiple term behavior**
   - Verify expected behavior when the input contains two words, such as:
     - `"john smith"`
   - Confirm whether both terms must match or whether either term is sufficient.

6. **Empty search**
   - Clearing the search input returns the full employee list.

7. **No results state**
   - Searching for a non-matching term shows an empty state or “no results” message if supported.

## Risks and assumptions
- **Assumption:** Employee records contain separate first name and surname fields.
- **Assumption:** Search is intended to be client-side and based on the currently loaded employee list.
- **Risk:** Ambiguity around multi-word search behavior could lead to inconsistent implementation unless clarified.
- **Risk:** Large employee lists may require debouncing or more efficient filtering if performance becomes an issue.
- **Risk:** Names with accents, hyphens, or extra whitespace may need normalization for better matching.
- **Risk:** If the app already uses server-side filtering or pagination, search may need to be integrated differently.