const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});

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

        featureCards.forEach(function (item) {
            item.classList.remove("active");
        });

        card.classList.add("active");

        const selectedFeature = card.dataset.feature;

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

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    formMessage.textContent =
        "✅ Thanks! Your message has been received.";

    contactForm.reset();
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show-menu");
});

const lostForm = document.getElementById("lost-form");
const lostPosts = document.getElementById("lost-posts");

let reports = JSON.parse(localStorage.getItem("reports")) || [];

function displayReports() {

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

displayReports();

function deleteReport(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this report?"
    );

    if (confirmDelete) {

        reports.splice(index, 1);

        localStorage.setItem(
            "reports",
            JSON.stringify(reports)
        );

        displayReports();
    }
}

lostForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const newReport = {

        name: document.getElementById("item-name").value,

        type: document.getElementById("item-type").value,

        location: document.getElementById("item-location").value,

        description:
            document.getElementById("item-description").value
    };

    reports.unshift(newReport);

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );

    displayReports();

    lostForm.reset();
});

const teamForm = document.getElementById("team-form");
const teamPosts = document.getElementById("team-posts");

let teamRequests =
    JSON.parse(localStorage.getItem("teamRequests")) || [];

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

    const confirmDelete = confirm(
        "Are you sure you want to delete this team request?"
    );

    if (confirmDelete) {

        teamRequests.splice(index, 1);

        localStorage.setItem(
            "teamRequests",
            JSON.stringify(teamRequests)
        );

        displayTeamRequests();
    }
}

displayTeamRequests();

teamForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const newTeamRequest = {

        name: document.getElementById("team-name").value,

        project: document.getElementById("project-name").value,

        skills: document.getElementById("skills-needed").value,

        members: document.getElementById("members-needed").value
    };

    teamRequests.unshift(newTeamRequest);

    localStorage.setItem(
        "teamRequests",
        JSON.stringify(teamRequests)
    );

    displayTeamRequests();

    teamForm.reset();
});

const studyForm = document.getElementById("study-form");
const studyPosts = document.getElementById("study-posts");

let studyCircles =
    JSON.parse(localStorage.getItem("studyCircles")) || [];

function displayStudyCircles() {

    studyPosts.innerHTML = "";

    studyCircles.forEach(function (study, index) {

        const studyCard = document.createElement("div");

        studyCard.classList.add("study-card");

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

        studyPosts.appendChild(studyCard);
    });
}

function deleteStudyCircle(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this study circle?"
    );

    if (confirmDelete) {

        studyCircles.splice(index, 1);

        localStorage.setItem(
            "studyCircles",
            JSON.stringify(studyCircles)
        );

        displayStudyCircles();
    }
}

displayStudyCircles();

studyForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const newStudyCircle = {

        name: document.getElementById("study-name").value,

        subject: document.getElementById("study-subject").value,

        topic: document.getElementById("study-topic").value,

        time: document.getElementById("study-time").value
    };

    studyCircles.unshift(newStudyCircle);

    localStorage.setItem(
        "studyCircles",
        JSON.stringify(studyCircles)
    );

    displayStudyCircles();

    studyForm.reset();
});

