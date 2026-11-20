// ========================================
// CONTACT FORM VALIDATION
// ========================================


// ========================================
// CONTACT FORM VALIDATION
// ========================================

const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Display or clear the validation error for a field
function showError(input, errorId, errorText) {
    const errorElement = document.getElementById(errorId);

    errorElement.textContent = errorText;
    input.classList.toggle("input-error", Boolean(errorText));
    input.setAttribute("aria-invalid", String(Boolean(errorText)));
}

// Validate one field and return whether it is valid
function validateField(input) {
    const value = input.value.trim();
    let error = "";
    let errorId = "";

    if (input === nameInput) {
        errorId = "name-error";

        if (value.length < 2) {
            error = "Please enter at least 2 characters.";
        }
    } else if (input === emailInput) {
        errorId = "email-error";

        if (!emailPattern.test(value)) {
            error = "Please enter a valid email address.";
        }
    } else if (input === messageInput) {
        errorId = "message-error";

        if (value.length === 0) {
            error = "Please enter a message.";
        }
    } else {
        return false;
    }

    showError(input, errorId, error);
    return error === "";
}

const formFields = [nameInput, emailInput, messageInput];

// Validate all fields when the form is submitted
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const results = formFields.map(validateField);
    const isValid = results.every(Boolean);

    if (isValid) {
        message.textContent =
            "Your message is ready! This form is for demonstration only.";

        message.classList.add("success-message");
        message.classList.remove("form-error");

        form.reset();

        // Clear validation states after successful submission
        formFields.forEach(function (input) {
            showError(input, `${input.id}-error`, "");
            input.removeAttribute("aria-invalid");
        });
    } else {
        message.textContent =
            "Please correct the highlighted fields before continuing.";

        message.classList.remove("success-message");
        message.classList.add("form-error");

        // Focus on the first invalid field
        const firstInvalid = form.querySelector(".input-error");

        if (firstInvalid) {
            firstInvalid.focus();
        }
    }
});

// Validate fields as the user types
formFields.forEach(function (input) {
    input.addEventListener("input", function () {
        validateField(input);

        // Clear previous submission feedback
        message.textContent = "";
        message.classList.remove("success-message", "form-error");
    });
});

// DARK / LIGHT MODE


const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}


// Update the theme button icon and accessibility label
function updateThemeButton() {

    if (document.body.classList.contains("light-mode")) {

        themeToggle.textContent = "☾︎";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    } else {

        themeToggle.textContent = "☀︎";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );
    }
}

updateThemeButton();


// Change the theme when the button is clicked
themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("portfolio-theme", "light");
    } else {
        localStorage.setItem("portfolio-theme", "dark");
    }

    updateThemeButton();
});

// PROJECT FILTERING AND SEARCH


const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

const projectSearch = document.getElementById("project-search");
const noProjects = document.getElementById("no-projects");
const clearSearch = document.getElementById("clear-search");
const projectSort = document.getElementById("project-sort");
const projectsGrid = document.querySelector("#projects .projects-grid");

// Restore saved project preferences
const VALID_CATEGORIES = ["all", "development", "design"];
const VALID_SORTS = ["default", "name-asc", "name-desc"];

function getSavedOption(key, validValues, fallback) {
    const saved = localStorage.getItem(key);
    return validValues.includes(saved) ? saved : fallback;
}

let currentFilter = getSavedOption(
    "portfolio-category",
    VALID_CATEGORIES,
    "all"
);

projectSort.value = getSavedOption(
    "portfolio-sort",
    VALID_SORTS,
    "default"
);

// Preserve the original project order
const originalOrder = Array.from(projectCards);


// Sort project cards only when sorting changes
function sortProjects() {
    const sortValue = projectSort.value;
    const sortedCards = Array.from(originalOrder);

    const getTitle = card =>
        card.querySelector("h3").textContent.trim();

    if (sortValue === "name-asc") {
        sortedCards.sort((a, b) =>
            getTitle(a).localeCompare(getTitle(b))
        );
    } else if (sortValue === "name-desc") {
        sortedCards.sort((a, b) =>
            getTitle(b).localeCompare(getTitle(a))
        );
    }

    // Only reorder the DOM if the order actually changed
    const currentOrder = Array.from(projectsGrid.children);

    const orderChanged = sortedCards.some(
        (card, index) => card !== currentOrder[index]
    );

    if (orderChanged) {
        projectsGrid.append(...sortedCards);
    }
}

// Filter projects by category and search keyword
function updateProjects() {
    const searchText = projectSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    originalOrder.forEach(function (card) {
        const title = card.querySelector("h3").textContent;
        const description = card.querySelector("p").textContent;

        const projectText =
            (title + " " + description).toLowerCase();

        const matchesCategory =
            currentFilter === "all" ||
            card.dataset.category === currentFilter;

        const matchesSearch = projectText.includes(searchText);
        const shouldShow = matchesCategory && matchesSearch;

        // Update visibility only when necessary
        if (card.hidden !== !shouldShow) {
            card.hidden = !shouldShow;
        }

        if (shouldShow) {
            visibleCount++;
        }
    });

    noProjects.hidden = visibleCount !== 0;
}


// Handle category filter buttons
filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        // Save selected category
        localStorage.setItem("portfolio-category", currentFilter);

        // Update the active button
        filterButtons.forEach(function (btn) {
            const isActive = btn === button;

            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-pressed", String(isActive));
        });

        updateProjects();
    });
});

// Search projects as the user types
projectSearch.addEventListener("input", updateProjects);
// Update projects when the sorting option changes
projectSort.addEventListener("change", function () {
    localStorage.setItem("portfolio-sort", projectSort.value);
    sortProjects();
    updateProjects();
});

// Reset search and category filter
clearSearch.addEventListener("click", function () {
    projectSearch.value = "";
    currentFilter = "all";

    localStorage.setItem("portfolio-category", "all");

    filterButtons.forEach(function (btn) {
        const isActive = btn.dataset.filter === "all";

        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
    });

    updateProjects();
    projectSearch.focus();
});

// Restore the selected category button
filterButtons.forEach(function (button) {
    const isActive = button.dataset.filter === currentFilter;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
});

// Restore sorting and filtering when the page loads
sortProjects();
updateProjects();

// GITHUB API INTEGRATION

const GITHUB_USERNAME = "5cvi9";
const MAX_REPOS = 6;

const grid = document.getElementById("github-grid");
const status = document.getElementById("github-status");
const retryBtn = document.getElementById("github-retry");

function setStatus(message, { showRetry = false } = {}) {
    status.textContent = message;
    status.hidden = !message;
    retryBtn.hidden = !showRetry;
}

function createCard({ name, description, language, html_url }) {
    const card = document.createElement("article");
    card.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = name;

    const desc = document.createElement("p");
    desc.textContent = description || "No description available.";

    const lang = document.createElement("p");
    lang.className = "project-info";
    lang.textContent = `Language: ${language || "Not specified"}`;

    const link = Object.assign(document.createElement("a"), {
        href: html_url,
        textContent: "View on GitHub",
        target: "_blank",
        rel: "noopener noreferrer",
    });

    card.append(title, desc, lang, link);
    return card;
}


async function loadRepos() {
    setStatus("Loading repositories...");
    grid.replaceChildren();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
        const res = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
            { signal: controller.signal }
        );

        if (res.status === 403 || res.status === 429) {
            throw new Error("RATE_LIMIT");
        }

        if (!res.ok) {
            throw new Error(`HTTP_${res.status}`);
        }

        const repos = (await res.json())
            .filter(repo => !repo.fork)
            .sort((a, b) =>
                new Date(b.updated_at) - new Date(a.updated_at)
            )
            .slice(0, MAX_REPOS);

        if (repos.length === 0) {
            setStatus("No public repositories available yet.");
            return;
        }

        grid.append(...repos.map(createCard));
        setStatus("");

    } catch (error) {
        console.error("Failed to load GitHub repositories:", error);

        if (error.name === "AbortError") {
            setStatus(
                "GitHub is taking too long to respond. Please try again.",
                { showRetry: true }
            );
        } else if (error.message === "RATE_LIMIT") {
            setStatus(
                "GitHub is temporarily limiting requests. Please try again later.",
                { showRetry: true }
            );
        } else {
            setStatus(
                "Unable to load repositories. Check your connection and try again.",
                { showRetry: true }
            );
        }
    } finally {
        clearTimeout(timeoutId);
    }
}

retryBtn.addEventListener("click", loadRepos);
loadRepos();