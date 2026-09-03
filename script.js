// This script handles the interactive features of the website, including dark mode toggle, feature card interactions, contact form submission, and mobile menu toggle.

// ===============================
// DARK MODE
// ===============================

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});


// ===============================
// INTERACTIVE FEATURE CARDS
// ===============================

const featureCards = document.querySelectorAll(".feature-card");

const previewIcon = document.getElementById("preview-icon");
const previewTitle = document.getElementById("preview-title");
const previewDescription = document.getElementById("preview-description");
const previewExample = document.getElementById("preview-example");


const featureData = {

    lost: {
        icon: "🔍",
        title: "Lost & Found",
        description:
            "Quickly share information about lost or found items with other students.",
        example:
            "📍 Example: Black water bottle found near the library."
    },

    team: {
        icon: "🤝",
        title: "Team Finder",
        description:
            "Find students with the right skills for projects, hackathons, and events.",
        example:
            "💻 Example: Looking for a frontend developer for a college hackathon."
    },

    study: {
        icon: "📚",
        title: "Study Circle",
        description:
            "Connect with students studying the same subjects and preparing for exams.",
        example:
            "📖 Example: Looking for students to study Data Structures together."
    }

};


featureCards.forEach(function (card) {

    card.addEventListener("click", function () {

        // Remove active class from all cards
        featureCards.forEach(function (item) {
            item.classList.remove("active");
        });

        // Add active class to clicked card
        card.classList.add("active");

        // Get feature name from data-feature
        const selectedFeature = card.dataset.feature;

        // Update preview content
        previewIcon.textContent =
            featureData[selectedFeature].icon;

        previewTitle.textContent =
            featureData[selectedFeature].title;

        previewDescription.textContent =
            featureData[selectedFeature].description;

        previewExample.textContent =
            featureData[selectedFeature].example;

    });

});


// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    formMessage.textContent =
        "✅ Thanks! Your message has been received.";

    // Clear form after submission
    contactForm.reset();

});


// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("show-menu");

});


// ===============================
// LOST & FOUND - CAMPUS PULSE
// ===============================

const lostForm = document.getElementById("lost-form");
const lostPosts = document.getElementById("lost-posts");


// Get saved reports from localStorage
let reports = JSON.parse(localStorage.getItem("reports")) || [];


// Function to display reports
function displayReports() {

    // Clear existing reports
    lostPosts.innerHTML = "";

    reports.forEach(function (report, index) {

        const reportCard = document.createElement("div");

        reportCard.classList.add("report-card");

        reportCard.innerHTML = `
            <span class="report-type ${report.type.toLowerCase()}">
        ${report.type}
    </span>

    <h4>🔍 ${report.name}</h4>

    <p>
        📍 <strong>Location:</strong>
        ${report.location}
    </p>

    <p>${report.description}</p>

    <button class="delete-btn" onclick="deleteReport(${index})">
        🗑 Delete
    </button>
`;

        lostPosts.appendChild(reportCard);

    });

}


// Show reports when website loads
displayReports();

function deleteReport(index) {

    // Remove report from array
    reports.splice(index, 1);

    // Update localStorage
    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );

    // Update webpage
    displayReports();
}

// Submit new report
lostForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Create report object
    const newReport = {

        name: document.getElementById("item-name").value,

        type: document.getElementById("item-type").value,

        location: document.getElementById("item-location").value,

        description:
            document.getElementById("item-description").value
    };


    // Add new report to array
    reports.unshift(newReport);


    // Save reports in localStorage
    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );


    // Display updated reports
    displayReports();


    // Reset form
    lostForm.reset();

});

// ===============================
// TEAM FINDER
// ===============================

const teamForm = document.getElementById("team-form");
const teamPosts = document.getElementById("team-posts");


// Get saved team requests
let teamRequests =
    JSON.parse(localStorage.getItem("teamRequests")) || [];


// Display team requests
function displayTeamRequests() {

    teamPosts.innerHTML = "";

    teamRequests.forEach(function (team, index) {

        const teamCard = document.createElement("div");

        teamCard.classList.add("team-card");

        teamCard.innerHTML = `
            <h4>🚀 ${team.project}</h4>

            <p>
                👤 <strong>Posted by:</strong>
                ${team.name}
            </p>

            <p>
                💻 <strong>Skills Needed:</strong>
                ${team.skills}
            </p>

            <p>
                👥 <strong>Members Needed:</strong>
                ${team.members}
            </p>

            <button class="delete-btn" onclick="deleteTeamRequest(${index})">
                🗑 Delete
            </button>
        `;

        teamPosts.appendChild(teamCard);

    });

}

function deleteTeamRequest(index) {

    teamRequests.splice(index, 1);

    localStorage.setItem(
        "teamRequests",
        JSON.stringify(teamRequests)
    );

    displayTeamRequests();
}


// Show saved requests
displayTeamRequests();


// Submit new request
teamForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const newTeamRequest = {

        name: document.getElementById("team-name").value,

        project: document.getElementById("project-name").value,

        skills: document.getElementById("skills-needed").value,

        members: document.getElementById("members-needed").value
    };


    // Add newest request first
    teamRequests.unshift(newTeamRequest);


    // Save to localStorage
    localStorage.setItem(
        "teamRequests",
        JSON.stringify(teamRequests)
    );


    // Update display
    displayTeamRequests();


    // Reset form
    teamForm.reset();

});


// ===============================
// STUDY CIRCLE
// ===============================

const studyForm = document.getElementById("study-form");
const studyPosts = document.getElementById("study-posts");


// Get saved study circles from localStorage
let studyCircles =
    JSON.parse(localStorage.getItem("studyCircles")) || [];


// Function to display study circles
function displayStudyCircles() {

    // Clear previously displayed circles
    studyPosts.innerHTML = "";

    // Loop through all study circles
    studyCircles.forEach(function (study, index) {

        // Create a new card
        const studyCard = document.createElement("div");

        studyCard.classList.add("study-card");

        // Add information to the card
        studyCard.innerHTML = `
            <h4>📚 ${study.subject}</h4>

            <p>
                👤 <strong>Created by:</strong>
                ${study.name}
            </p>

            <p>
                📖 <strong>Topic:</strong>
                ${study.topic}
            </p>

            <p>
                🕒 <strong>Study Time:</strong>
                ${study.time}
            </p>

            <button class="delete-btn" onclick="deleteStudyCircle(${index})">
                🗑 Delete
            </button>
        `;

        // Add the card to the webpage
        studyPosts.appendChild(studyCard);
    });
}

function deleteStudyCircle(index) {

    studyCircles.splice(index, 1);

    localStorage.setItem(
        "studyCircles",
        JSON.stringify(studyCircles)
    );

    displayStudyCircles();
}


// Display saved study circles when page loads
displayStudyCircles();


// When the user submits the form
studyForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Create an object using user input
    const newStudyCircle = {

        name: document.getElementById("study-name").value,

        subject: document.getElementById("study-subject").value,

        topic: document.getElementById("study-topic").value,

        time: document.getElementById("study-time").value
    };


    // Add newest study circle at the beginning
    studyCircles.unshift(newStudyCircle);


    // Save study circles in localStorage
    localStorage.setItem(
        "studyCircles",
        JSON.stringify(studyCircles)
    );


    // Update the displayed cards
    displayStudyCircles();


    // Clear the form
    studyForm.reset();

});