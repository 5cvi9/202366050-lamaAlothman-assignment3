# Personal Portfolio — Assignment 3

This project is an advanced interactive personal portfolio website developed for Assignment 3 of the Web Engineering course (SWE 363) at KFUPM. It builds on Assignments 1 and 2 by integrating the GitHub REST API, implementing advanced project filtering and sorting, introducing persistent user preferences, and improving application logic, error handling, and performance.

## Features

### Portfolio and Project Showcase
- Home and About Me sections introducing my background and technical interests
- Selected academic projects featuring RouteRepair and KFUPM StudyVerse
- Responsive project cards with descriptions, technologies, and project details
- Navigation between portfolio sections with smooth scrolling

### GitHub API Integration
- Dynamic retrieval of public repositories using the GitHub REST API
- Display of repository names, descriptions, programming languages, and GitHub links
- Automatic sorting by the most recently updated repositories
- Display of up to six non-fork public repositories
- Loading indicators and empty-state feedback
- Error handling for network failures, API errors, and request timeouts
- Retry functionality for failed API requests

### Advanced Project Filtering and Sorting
- Interactive filtering by Development and UI/UX Design categories
- Live keyword search across project titles and descriptions
- Alphabetical sorting in ascending (A–Z) and descending (Z–A) order
- Combined search, category filtering, and sorting
- Restoration of the original project order
- Empty-state feedback with a Clear Search button
- Optimized DOM updates to avoid unnecessary project reordering

### State Management
- Dark/light theme toggle with persistent preferences
- Storage of selected project categories using `localStorage`
- Storage of project sorting preferences
- Automatic restoration of saved preferences after page reloads
- Consistent UI updates when user selections change

### Contact Form Validation
- Real-time validation of name, email, and message fields
- Shared validation logic for live input and form submission
- Field-specific error messages and visual feedback
- Prevention of invalid form submissions
- Automatic focus on the first invalid field
- Confirmation feedback after successful validation
- Demonstration-only form; no messages are transmitted to a server

### User Experience and Performance
- Responsive layouts for desktop, tablet, and mobile devices
- Dark and light themes with consistent styling
- Accessible form labels, status messages, and interactive controls
- Keyboard focus indicators
- Hover effects and lightweight UI transitions
- Reduced unnecessary DOM operations
- Performance and accessibility evaluation using Chrome Lighthouse

## Technologies Used

- **HTML5** — Semantic structure and accessible page elements
- **CSS3** — Responsive layouts, styling, and theme management
- **JavaScript (ES6+)** — DOM manipulation, asynchronous operations, and application logic
- **Fetch API** — HTTP requests to GitHub
- **GitHub REST API** — Dynamic repository information
- **Local Storage** — Persistent user preferences
- **CSS Grid and Flexbox** — Responsive layout implementation
- **Git and GitHub** — Version control and repository management
- **Chrome DevTools and Lighthouse** — Debugging, testing, and performance evaluation

## Project Structure

```text
202366050-lamaAlothman-assignment3/
├── README.md
├── index.html
├── css/
│   ├── styles.css
│   ├── components.css
│   └── responsive.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## Running the Project Locally

1. Clone the repository:

```bash
git clone https://github.com/5cvi9/202366050-lamaAlothman-assignment3.git
```

2. Navigate to the project directory:

```bash
cd 202366050-lamaAlothman-assignment3
```

3. Open the project folder in Visual Studio Code.

4. Launch `index.html` using the Live Server extension or another local HTTP server.

5. Open the local website URL in a browser to explore the portfolio.

No additional dependencies, package installation, build process, or API authentication are required.

An internet connection is necessary to retrieve live GitHub repository data. Other portfolio features operate independently of the GitHub API.

## Testing and Performance

The website was evaluated using Chrome DevTools and Lighthouse.

### Lighthouse Results

| Category | Mobile Score |
|---|---:|
| Performance | 97 |
| Accessibility | 96 |
| Best Practices | 96 |
| SEO | 91 |

The application was also checked for:

- Project searching, filtering, and sorting behavior
- Persistence of user preferences after page reloads
- Contact form validation and error feedback
- Successful GitHub API requests
- Network failure handling and retry functionality
- JavaScript syntax errors using `node --check`
- Responsive layout behavior

Lighthouse scores were measured in a local development environment and may vary across devices and test runs.

## AI Usage

ChatGPT was used to support development planning, JavaScript implementation, API integration, debugging, code review, refactoring, UI improvements, and documentation.

AI-assisted suggestions were reviewed and adapted during development. The development process included functional testing, syntax checks, and iterative code improvements.

Detailed AI usage records, learning outcomes, modifications, and the required declaration are provided in the [AI Usage Report](docs/ai-usage-report.md).

Complete AI conversations and intermediate artifacts are maintained separately as required by the assignment guidelines and are not included in the public repository.

## Technical Documentation

For detailed explanations of the application architecture, GitHub API integration, project filtering and sorting logic, state management, validation, error handling, and testing, see the [Technical Documentation](docs/technical-documentation.md).

## Author

**Lama Alothman**  
Software Engineering — KFUPM  
SWE 363 — Web Engineering