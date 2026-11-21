# Technical Documentation — Assignment 3

**Course:** SWE 363 — Web Engineering  
**Assignment:** 3 — Advanced Functionality  
**Student:** Lama Alothman  
**Student ID:** 202366050

---

## 1. Introduction

This document describes the technical implementation of the Personal Portfolio Website developed for Assignment 3.

The application extends the portfolio created in Assignments 1 and 2 by introducing external API integration, advanced JavaScript logic, persistent user preferences, and improved error handling.

The project uses HTML5, CSS3, and vanilla JavaScript without external frontend frameworks or build tools.

## 2. Application Architecture

The application follows a client-side architecture consisting of three primary layers:

| Layer | Files | Responsibility |
|---|---|---|
| Structure | `index.html` | Semantic page structure, navigation, project cards, forms, and dynamic content containers |
| Presentation | `css/styles.css`, `css/components.css`, `css/responsive.css` | Themes, component styling, layout, and responsive behavior |
| Behavior | `js/script.js` | Form validation, project filtering and sorting, state persistence, and GitHub API integration |

The browser loads the HTML and CSS files, then executes the JavaScript file to initialize the application's interactive functionality.

No backend server or database is required.

### 2.1 Application Initialization

When the page loads, JavaScript performs the following operations:

1. Initializes contact form validation handlers.
2. Restores the saved theme preference.
3. Retrieves saved project category and sorting preferences.
4. Restores the selected filter button and project ordering.
5. Initializes project searching and filtering.
6. Requests public repository data from the GitHub REST API.

These operations allow the portfolio to display both static project information and dynamically retrieved content.

## 3. GitHub API Integration

### 3.1 API Selection

The GitHub REST API was selected because it provides meaningful information directly related to the portfolio owner's software development work.

Unlike static project cards, the GitHub section retrieves current public repository information when the website loads.

### 3.2 API Endpoint

The application sends an HTTP GET request to:

```text
https://api.github.com/users/5cvi9/repos?per_page=100&sort=updated
```

The endpoint returns publicly accessible repository metadata in JSON format.

No authentication token is embedded in the frontend code.

### 3.3 Asynchronous Data Retrieval

The `loadRepos()` function uses `async/await` with the Fetch API.

```javascript
const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    { signal: controller.signal }
);
```

The asynchronous approach allows the browser to continue responding to user interactions while the API request is in progress.

### 3.4 Repository Processing

After receiving a successful response, the application:

1. Converts the response body to JSON.
2. Excludes forked repositories.
3. Sorts repositories by their most recent update timestamp.
4. Selects up to six repositories.
5. Creates and displays repository cards dynamically.

```javascript
const repos = (await res.json())
    .filter(repo => !repo.fork)
    .sort((a, b) =>
        new Date(b.updated_at) - new Date(a.updated_at)
    )
    .slice(0, MAX_REPOS);
```

Each repository card displays its name, description, primary programming language, and a link to GitHub.

Missing descriptions and language values are replaced with readable fallback text.

### 3.5 Dynamic DOM Manipulation

Repository cards are created using `document.createElement()` and inserted into the GitHub repository grid.

Repository names and descriptions are assigned using `textContent` rather than interpreting external data as HTML.

This approach avoids inserting untrusted repository descriptions as executable HTML.

External repository links open in a new tab using `target="_blank"` and `rel="noopener noreferrer"`.

### 3.6 Error Handling and Request Timeout

The application handles unsuccessful API requests using `try/catch`.

A request timeout is implemented using `AbortController`:

```javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10000);
```

The request is aborted if it remains pending beyond the configured timeout.

The application distinguishes between several outcomes:

| Condition | Application Behavior |
|---|---|
| Request in progress | Displays a loading message |
| Successful response | Displays repository cards |
| No eligible repositories | Displays an empty-state message |
| Request timeout | Displays a timeout message and retry button |
| HTTP 403 or 429 | Displays a temporary request-limiting message |
| Other request failures | Displays a general connection/error message |

The HTTP 403 handling is a simplified classification and does not distinguish all possible causes of forbidden responses.

The timeout is cleared in a `finally` block to prevent an unnecessary timer from remaining active after the operation completes.

The Retry button invokes `loadRepos()` again.

## 4. Advanced Project Filtering and Sorting

### 4.1 Overview

The selected projects section supports three interactive operations:

- Keyword searching
- Category filtering
- Alphabetical sorting

These operations can be combined to refine the displayed project list.

### 4.2 Keyword Search

The search input listens for the `input` event and calls `updateProjects()`.

The function normalizes the search keyword using `trim()` and `toLowerCase()`.

It compares the keyword against each project's title and description.

This provides case-insensitive matching.

### 4.3 Category Filtering

Project cards include a `data-category` attribute.

The application compares each project's category against the selected filter:

```javascript
const matchesCategory =
    currentFilter === "all" ||
    card.dataset.category === currentFilter;
```

The available categories are All Projects, Development, and UI/UX Design.

The active filter button is updated visually and through its `aria-pressed` attribute.

### 4.4 Combined Filtering Logic

A project is displayed only when it satisfies both the selected category and the search keyword:

```javascript
const shouldShow = matchesCategory && matchesSearch;
```

The `hidden` property controls card visibility.

If no projects match, the application displays an empty-state message and provides a Clear Search button.

### 4.5 Alphabetical Sorting

The `sortProjects()` function supports:

- Default order
- Name: A to Z
- Name: Z to A

Project titles are compared using `localeCompare()`.

The original order is preserved using an array of the initial project cards:

```javascript
const originalOrder = Array.from(projectCards);
```

Sorting begins with a copy of this array, allowing the default option to restore the original sequence.

### 4.6 DOM Optimization

The project sorting and filtering responsibilities are separated into two functions:

- `sortProjects()` changes the order of project cards.
- `updateProjects()` updates which cards are visible.

The sorting function compares the desired order with the current DOM order before moving elements.

This avoids unnecessary DOM reordering during keyword searches and category changes.

The previous forced-layout animation restart was also removed to reduce unnecessary layout calculations.

## 5. State Management

### 5.1 Storage Approach

The application uses the browser's `localStorage` to preserve selected preferences across page reloads.

This approach was chosen because the application does not require accounts, server-side sessions, or database storage.

### 5.2 Stored Preferences

| Storage Key | Purpose |
|---|---|
| `portfolio-theme` | Stores the selected light or dark theme |
| `portfolio-category` | Stores the selected project category |
| `portfolio-sort` | Stores the selected project sorting option |

### 5.3 Theme Persistence

When the user changes the theme, the application updates the `light-mode` class on the document body and saves the selected value.

On subsequent visits, the saved value is retrieved and applied.

The theme button icon and accessibility label are also updated to reflect the available action.

### 5.4 Category and Sorting Persistence

The application stores category and sorting preferences whenever the user changes them.

On page initialization, saved values are retrieved and checked against predefined valid options.

```javascript
function getSavedOption(key, validValues, fallback) {
    const saved = localStorage.getItem(key);
    return validValues.includes(saved) ? saved : fallback;
}
```

Invalid or missing values are replaced with safe defaults.

After restoring the preferences, the application updates the active filter button and applies the selected sorting and filtering behavior.

### 5.5 Reset Behavior

The Clear Search button clears the keyword and restores the category to All Projects.

It also updates the stored category preference.

The sorting preference remains unchanged because the button resets searching and category filtering rather than all application preferences.

## 6. Contact Form Validation

### 6.1 Validation Requirements

The contact form validates three required fields:

| Field | Validation Rule |
|---|---|
| Name | At least two non-whitespace characters |
| Email | Must match a basic email format |
| Message | Must contain non-whitespace text |

### 6.2 Shared Validation Logic

The `validateField()` function handles individual field validation.

It is reused during real-time input and form submission, reducing duplicated conditions and improving maintainability.

The function returns a Boolean indicating whether the field is valid.

### 6.3 Submission Validation

The form submission handler prevents the browser's default submission behavior.

It evaluates every required field using:

```javascript
const results = formFields.map(validateField);
const isValid = results.every(Boolean);
```

This ensures that all fields are checked before determining whether the form is valid.

### 6.4 User Feedback

Invalid fields receive:

- A field-specific error message
- An error border
- An updated `aria-invalid` attribute

When validation fails, focus moves to the first invalid field.

After successful validation, the form is reset and a confirmation message is displayed.

The form is a demonstration feature and does not transmit messages to a backend service.

## 7. Responsive Design and Accessibility

### 7.1 Responsive Layout

The application uses CSS Grid and Flexbox for layout.

Responsive styles are separated into `css/responsive.css`.

At narrower viewport widths, project cards and contact content change to a single-column layout.

Navigation spacing and typography are adjusted for mobile screens.

### 7.2 Theme Support

The default theme uses dark navy and teal colors.

A light theme is implemented using the `light-mode` class and CSS custom properties.

This reduces the need to duplicate entire component styles for each theme.

### 7.3 Accessibility Features

The application includes:

- Semantic HTML sections and navigation
- Associated form labels
- Descriptive image alternative text
- Keyboard focus indicators
- Accessible error and status messages
- `aria-pressed` on category filter buttons
- `aria-invalid` on form inputs
- `aria-live` for dynamic feedback

The interface also considers reduced-motion preferences for applicable animations.

## 8. Performance and Code Quality

### 8.1 Performance Improvements

Several implementation choices help reduce unnecessary browser work:

- Project sorting is separated from filtering.
- DOM reordering occurs only when the order changes.
- Visibility updates occur only when required.
- Forced layout calculations used for repeated project animations were removed.
- GitHub repository cards are created dynamically using DOM methods.
- No external frontend framework or build process is required.

### 8.2 Code Quality Improvements

The implementation was refactored to:

- Reuse contact form validation logic
- Separate sorting from filtering
- Remove unused animation styles
- Consolidate duplicate responsive CSS rules
- Improve error handling for API requests
- Maintain readable function names and comments

### 8.3 Lighthouse Results

Chrome Lighthouse was used to evaluate the website in a local development environment.

| Audit Category | Mobile Score |
|---|---:|
| Performance | 97 |
| Accessibility | 96 |
| Best Practices | 96 |
| SEO | 91 |

These results indicate strong performance in the measured environment.

Scores may vary depending on browser conditions, device capabilities, network conditions, and subsequent code changes.

## 9. Testing and Verification

### 9.1 Functional Testing

The following behaviors were included in the development testing workflow:

| Feature | Test Scenario | Expected Result |
|---|---|---|
| Search | Enter a project keyword | Matching projects remain visible |
| Category Filter | Select Development | Only Development projects appear |
| Sorting | Select A–Z or Z–A | Projects appear in the selected order |
| Default Sorting | Restore Default Order | Original project order returns |
| Combined Logic | Apply search, filter, and sorting | All selected conditions are respected |
| Empty State | Search for a nonexistent project | Empty-state message appears |
| State Persistence | Change preferences and refresh | Saved preferences are restored |
| Form Validation | Submit invalid fields | Errors are displayed |
| Form Validation | Submit valid fields | Demonstration confirmation appears |
| GitHub API | Load the portfolio online | Repository cards are displayed |
| Network Failure | Load while offline | Error feedback and Retry button appear |
| Retry | Restore connection and retry | Repository data loads again |

### 9.2 Syntax and Whitespace Checks

JavaScript syntax was checked using:

```bash
node --check js/script.js
```

Git whitespace validation was performed using:

```bash
git diff --check
```

These checks help identify syntax and formatting problems but do not replace functional browser testing.

### 9.3 Browser-Based Testing

Chrome DevTools and Live Server were used during development to inspect the interface, debug JavaScript behavior, and evaluate network requests.

Responsive behavior was reviewed through browser viewport adjustments.

## 10. Design Decisions and Limitations

### 10.1 Vanilla JavaScript

Vanilla JavaScript was retained because the portfolio is a small client-side application and does not require the complexity of a frontend framework.

This also supports direct demonstration of JavaScript concepts required by the assignment.

### 10.2 GitHub API Instead of a Backend

The public GitHub API provides relevant dynamic portfolio data without requiring a custom backend or database.

However, the repository section depends on network availability and GitHub API access.

### 10.3 Local Storage

`localStorage` provides lightweight persistence without authentication or server-side storage.

Preferences are specific to the browser and are not synchronized between devices.

### 10.4 Contact Form

The contact form demonstrates validation and interactive feedback rather than actual message delivery.

A production implementation would require a secure backend or form delivery service.

### 10.5 API Result Limit

The implementation retrieves up to 100 repositories in one API response, excludes forks, and displays at most six results.

It does not implement pagination across additional GitHub API result pages.