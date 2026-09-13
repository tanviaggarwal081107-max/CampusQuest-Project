// ================= STUDENT DATA =================

const currentUserEmail =
    localStorage.getItem("currentUserEmail");

const users =
    JSON.parse(
        localStorage.getItem("campusQuestUsers")
    ) || [];

let currentUser = null;

if (currentUserEmail) {

    currentUser = users.find(function (user) {

        return user.email.toLowerCase() ===
               currentUserEmail.toLowerCase();

    });

}


// ================= LOGIN CHECK =================

if (!currentUser) {

    window.location.href = "login.html";

}


// ================= STUDENT INFORMATION =================

const studentName =
    currentUser.name;

const studentBranch =
    currentUser.branch;


// ================= DISPLAY STUDENT =================

document.getElementById("studentName").textContent =
    studentName;

document.getElementById("profileCircle").textContent =
    studentName.charAt(0).toUpperCase();

document.getElementById("studentBranch").textContent =
    studentBranch;


// ================= EVENT FILTER =================

const filterButtons =
    document.querySelectorAll(".filter-button");

const eventCards =
    document.querySelectorAll(".event-card");


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove active from all buttons

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Add active to clicked button

        button.classList.add("active");


        // Get selected category

        const selectedFilter =
            button.getAttribute("data-filter");


        // Show / hide events

        eventCards.forEach(function (card) {

            const category =
                card.getAttribute("data-category");


            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {

                card.style.display = "block";

            }
            else {

                card.style.display = "none";

            }

        });

    });

});


// ================= CONSOLE =================

console.log("CampusX Events Loaded");

console.log("Student:", studentName);

console.log("Branch:", studentBranch);
// ================= EVENT DETAILS =================

const eventDetails = {

    1: {
        type: "💻 HACKATHON",
        title: "Campus Innovation Hackathon",
        description:
            "Build innovative solutions for real-world campus and community problems.",
        date: "18 September",
        time: "10:00 AM",
        venue: "Innovation Hub",
        organizer: "Campus Innovation Cell"
    },

    2: {
        type: "🧠 WORKSHOP",
        title: "AI & Machine Learning Workshop",
        description:
            "Learn the fundamentals of AI and explore practical machine learning applications.",
        date: "20 September",
        time: "11:00 AM",
        venue: "Seminar Hall",
        organizer: "AI & Tech Club"
    },

    3: {
        type: "👨‍💻 CODING",
        title: "CodeSprint Challenge",
        description:
            "Test your programming skills with algorithmic problems and coding challenges.",
        date: "22 September",
        time: "02:00 PM",
        venue: "Computer Lab 3",
        organizer: "Coding Club"
    },

    4: {
        type: "🎓 DEPARTMENT",
        title: "CSS Department Tech Meet",
        description:
            "Connect with CSS students and faculty and explore upcoming technical opportunities, hackathons, events and placement activities.",
        date: "25 September",
        time: "12:00 PM",
        venue: "Block A",
        organizer: "CSS Department"
    }

};


// ================= SHOW EVENT DETAILS =================

function showEventDetails(eventNumber) {

    const event =
        eventDetails[eventNumber];

    document.getElementById("modalType").textContent =
        event.type;

    document.getElementById("modalTitle").textContent =
        event.title;

    document.getElementById("modalDescription").textContent =
        event.description;

    document.getElementById("modalDate").textContent =
        "📅 " + event.date;

    document.getElementById("modalTime").textContent =
        "⏰ " + event.time;

    document.getElementById("modalVenue").textContent =
        "📍 " + event.venue;

    document.getElementById("modalOrganizer").textContent =
        "👤 " + event.organizer;


    document.getElementById("eventModal").style.display =
        "flex";

}


// ================= CLOSE POPUP =================

const closeModal =
    document.getElementById("closeModal");

closeModal.addEventListener("click", function () {

    document.getElementById("eventModal").style.display =
        "none";

});


// ================= CLOSE BY CLICKING OUTSIDE =================

const eventModal =
    document.getElementById("eventModal");

eventModal.addEventListener("click", function (event) {

    if (event.target === eventModal) {

        eventModal.style.display = "none";

    }

});
// ================= EVENT REGISTRATION =================

const registerButton =
    document.querySelector(".register-event-button");

registerButton.addEventListener("click", function () {

    const eventTitle =
        document.getElementById("modalTitle").textContent;

    let registeredEvents =
        JSON.parse(
            localStorage.getItem("registeredEvents")
        ) || [];

    if (!registeredEvents.includes(eventTitle)) {

        registeredEvents.push(eventTitle);

        localStorage.setItem(
            "registeredEvents",
            JSON.stringify(registeredEvents)
        );

        registerButton.textContent =
            "✅ Registered Successfully!";

    }
    else {

        registerButton.textContent =
            "✅ Already Registered";

    }

});