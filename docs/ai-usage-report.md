# AI Usage Report — Assignment 3

**Course:** SWE 363 — Web Engineering  
**Assignment:** 3 — Advanced Functionality  
**Student Name:** Lama Alothman  
**Student ID:** 202366050  
**AI Tool:** ChatGPT (GPT-6)  
**Date:** November 21, 2026

---

## 1. AI Tools Used and Use Cases

ChatGPT (GPT-6) was used throughout Assignment 3 to support planning, implementation, debugging, code review, refactoring, testing, and documentation.

### 1.1 Requirements Analysis and Planning

ChatGPT was used to analyze the assignment requirements and grading rubric, identify reusable features from Assignment 2, and organize the development process into manageable stages.

The project was developed by extending the existing portfolio rather than rebuilding it from scratch.

### 1.2 GitHub API Integration

ChatGPT assisted with:

- Creating the GitHub Repositories section in `index.html`.
- Implementing asynchronous API requests using `fetch()` and `async/await`.
- Dynamically displaying repository names, descriptions, programming languages, and links.
- Filtering forked repositories and sorting repositories by their latest update.
- Implementing loading messages, empty states, error handling, and retry functionality.
- Adding request timeout handling using `AbortController`.

### 1.3 Advanced JavaScript Functionality

ChatGPT assisted with implementing alphabetical project sorting and integrating it with the existing keyword search and category filtering.

The implementation was subsequently refined to preserve the original project order and avoid unnecessary DOM operations.

### 1.4 State Management

ChatGPT provided guidance on implementing persistent user preferences using `localStorage`.

The implementation saves and restores selected project categories, sorting preferences, and light/dark theme settings.

### 1.5 UI/UX and Responsive Design

ChatGPT assisted with styling GitHub repository cards, sorting controls, theme consistency, keyboard focus indicators, and responsive navigation.

The improvements were integrated into the existing CSS structure to preserve the original portfolio design.

### 1.6 Debugging and Refactoring

ChatGPT assisted with identifying and addressing code quality issues, including:

- Duplicated contact form validation logic.
- Incorrect state restoration placement.
- Unnecessary date-based sorting options.
- Repeated DOM reordering.
- Forced layout calculations during filtering animations.
- Unused CSS animation rules.
- Duplicated responsive media queries.
- API timeout and error-handling improvements.

### 1.7 Testing and Documentation

ChatGPT assisted with JavaScript syntax checks, Git verification commands, functional testing procedures, Lighthouse results interpretation, and preparation of project documentation.

---

## 2. Benefits of AI Assistance

AI assistance helped organize the assignment into smaller development tasks and provided explanations of unfamiliar or advanced JavaScript concepts.

The main benefits included:

- Understanding asynchronous API requests and JSON data processing.
- Learning how to combine multiple conditions in project filtering and sorting.
- Implementing persistent application state.
- Identifying duplicated logic and unnecessary DOM operations.
- Improving code readability and maintainability.
- Organizing Git commits around development changes.
- Preparing structured technical documentation.

The step-by-step development approach made it possible to review individual changes before proceeding to the next feature.

---

## 3. Challenges and Limitations

AI-generated suggestions required review and correction during development.

### 3.1 Project Sorting

An initial sorting implementation did not reliably restore the original project order. The implementation was corrected by preserving the original sequence of project cards.

### 3.2 State Management

State restoration code was initially placed inside the wrong event listener, resulting in duplicated variable declarations. The code was reorganized so saved preferences are restored during initialization.

### 3.3 Date-Based Sorting

An earlier suggestion included sorting projects by date. These options were removed because the selected projects did not contain verified date information.

### 3.4 DOM Performance

The initial implementation reordered project cards during every search input event. Sorting and filtering were separated into independent functions to reduce unnecessary DOM updates.

### 3.5 CSS Organization

Some CSS changes introduced duplicated responsive media queries. These rules were consolidated to improve maintainability.

### 3.6 Git Commit Organization

Some code changes were included in formatting commits rather than separate feature-specific commits. Git history was reviewed to distinguish the actual changes from their commit descriptions.

These challenges demonstrated the importance of reviewing and testing AI-generated suggestions before accepting them.

---

## 4. Learning Outcomes

### 4.1 External API Integration

I improved my understanding of using the Fetch API, `async/await`, JSON responses, and dynamic DOM manipulation to display external data.

### 4.2 Advanced JavaScript Logic

I learned how to combine keyword searching, category filtering, and alphabetical sorting while maintaining consistent application behavior.

### 4.3 State Management

I gained experience using `localStorage` to save user preferences and restore application state after page reloads.

### 4.4 Error Handling

I learned how to handle HTTP errors, network failures, and request timeouts using `try/catch` and `AbortController`.

### 4.5 Code Quality

I learned how to reduce duplicated validation logic, separate functions by responsibility, and minimize unnecessary DOM operations.

### 4.6 Testing and Version Control

I practiced JavaScript syntax checking, Git commit management, browser-based testing, and Lighthouse performance evaluation.

---

## 5. Responsible Use and Modifications

ChatGPT was used as a development assistant. Its suggestions were reviewed and modified to fit the existing Assignment 2 codebase and Assignment 3 requirements.

### 5.1 Modifications

The following modifications were made during development:

- Corrected the original project sorting behavior.
- Removed date-based sorting options.
- Fixed state restoration placement.
- Centralized contact form validation.
- Separated sorting and filtering responsibilities.
- Removed unused filtering animation code.
- Consolidated responsive CSS rules.
- Improved API error handling and timeout behavior.

### 5.2 Verification

The implementation was checked using:

- `node --check js/script.js` for JavaScript syntax.
- `git diff --check` for whitespace issues.
- Git status and commit history inspection.
- Manual testing using Live Server.
- Chrome DevTools for network and browser debugging.
- Lighthouse for performance and accessibility evaluation.

The Lighthouse results were:

| Category | Score |
|---|---:|
| Performance | 97 |
| Accessibility | 96 |
| Best Practices | 96 |
| SEO | 91 |

### 5.3 AI Attribution

AI-assisted implementation and documentation commits were credited using:

`Assisted-by: ChatGPT (GPT-6)`

The complete AI conversation and intermediate artifacts are submitted separately from the public GitHub repository.

---

## 6. AI Usage Log

### 6.1 AI Conversation

| ID | Tool (Model) | Date | Purpose | Files Affected | What Changed and How It Was Verified |
|---|---|---|---|---|---|
| C01 | ChatGPT (GPT-6) | Nov 20–21, 2026 | Requirements analysis, repository setup, API integration, sorting, state management, styling, debugging, refactoring, testing, and documentation | `index.html`, `js/script.js`, `css/styles.css`, `css/components.css`, `css/responsive.css`, `README.md`, `docs/technical-documentation.md`, `docs/ai-usage-report.md` | Reviewed and adapted implementation suggestions, corrected sorting and state management logic, refactored JavaScript, improved CSS, verified functionality, checked syntax, and evaluated Lighthouse results. |

### 6.2 AI-Generated Artifacts

| ID | Tool (Model) | Date | Purpose | Files Affected | What Changed and How It Was Verified |
|---|---|---|---|---|---|
| A01 | ChatGPT (GPT-6) | Nov 20, 2026 | GitHub API integration | `index.html`, `js/script.js` | Integrated the repository section, added API fetching, and verified dynamic repository rendering. |
| A02 | ChatGPT (GPT-6) | Nov 20–21, 2026 | Advanced filtering and sorting | `index.html`, `js/script.js` | Removed date-based sorting, corrected default ordering, and tested search and filtering. |
| A03 | ChatGPT (GPT-6) | Nov 21, 2026 | State management | `js/script.js` | Corrected initialization logic and verified persistence after page reloads. |
| A04 | ChatGPT (GPT-6) | Nov 21, 2026 | UI styling and responsive improvements | `css/styles.css`, `css/components.css`, `css/responsive.css` | Adapted the styling to the existing design and consolidated responsive CSS rules. |
| A05 | ChatGPT (GPT-6) | Nov 21, 2026 | Code refactoring | `js/script.js`, `css/components.css` | Centralized validation, optimized DOM updates, and removed unused animation styles. |
| A06 | ChatGPT (GPT-6) | Nov 21, 2026 | API error handling | `js/script.js` | Added timeout handling, improved error messages, and tested network failure recovery. |
| A07 | ChatGPT (GPT-6) | Nov 21, 2026 | Project documentation | `README.md`, `docs/technical-documentation.md` | Prepared documentation describing the implemented features, architecture, and testing. |
| A08 | ChatGPT (GPT-6) | Nov 21, 2026 | AI usage documentation | `docs/ai-usage-report.md` | Prepared the AI usage report, declaration, and development evidence summary. |

---

## 7. Git Commit Evidence

The following table records the 20 commits in the repository history through the completion of the technical documentation.

| Commit Hash | Commit Description |
|---|---|
| `e1cb652` | Initial commit |
| `0a0fd25` | chore: initialize assignment 3 with assignment 2 portfolio |
| `6f87c5a` | feat: add GitHub repositories section layout |
| `ad6d46e` | feat: integrate GitHub repositories API |
| `dd362de` | feat: add advanced project sorting and filtering |
| `d640ed9` | feat: persist project filtering and sorting preferences |
| `8684353` | style: add GitHub cards and sorting controls |
| `ee1915a` | style: improve theme consistency and accessibility |
| `fb3a5e4` | style: refine responsive layout and mobile navigation |
| `c0ce6c6` | style: format components CSS |
| `5105367` | style: format responsive CSS |
| `67b3bee` | style: format main stylesheet |
| `1fd37f8` | style: format JavaScript code |
| `a895c45` | refactor: optimize project filtering and sorting |
| `4699a22` | style: remove unused project filter animation |
| `15dcc78` | feat: improve GitHub API error handling and timeout |
| `bb48e66` | feat: improve GitHub API error handling and timeout |
| `703a265` | style: consolidate mobile media queries and improve navigation |
| `4c89a96` | docs: expand assignment 3 README |
| `f8a6650` | docs: add assignment 3 technical documentation |

### 7.1 Development History

The project began with the existing Assignment 2 portfolio.

The initial feature commits introduced GitHub API integration, advanced project sorting, and persistent user preferences.

Subsequent commits focused on interface styling, responsive design, JavaScript formatting, and code refactoring.

The later commits improved API error handling, consolidated CSS rules, and completed the README and technical documentation.

### 7.2 AI Attribution

AI-assisted commits were credited with `Assisted-by: ChatGPT (GPT-6)`.

The two commits related to GitHub API error handling are recorded separately because both appear in the repository history.

The Git commit history supports the development record but does not replace the complete AI conversation and intermediate artifact evidence.

---

## 8. AI Evidence Submission

The AI Evidence ZIP is submitted separately through Blackboard and is not included in the public GitHub repository.

**Evidence ZIP filename:**

`202366050-lamaAlothman-assignment3-ai-evidence.zip`

The evidence contains two main directories:

### 8.1 Conversations

The `conversations/` directory contains the complete, unedited AI conversation exports used during Assignment 3.

### 8.2 Artifacts

The `artifacts/` directory contains the AI-generated intermediate outputs, including implementation suggestions, refactoring versions, styling changes, and documentation drafts, together with relevant development versions.

The evidence preserves the distinction between initial AI-generated suggestions and the final submitted implementation.

---

## 9. AI Usage Declaration

**Name:** Lama Alothman  
**Student ID:** 202366050  
**Date:** November 21, 2026

I declare that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.