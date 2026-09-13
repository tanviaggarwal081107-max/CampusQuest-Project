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

const studentYear =
    currentUser.year;


// ================= DISPLAY STUDENT =================

const nameElement =
    document.getElementById("studentName");

const avatarElement =
    document.getElementById("profileCircle");

const branchElement =
    document.getElementById("studentBranch");

const yearElement =
    document.getElementById("studentYear");


nameElement.textContent =
    studentName;


avatarElement.textContent =
    studentName.charAt(0).toUpperCase();


branchElement.textContent =
    studentBranch;


const yearNames = {

    "1": "1st Year",
    "2": "2nd Year",
    "3": "3rd Year",
    "4": "4th Year"

};


yearElement.textContent =
    yearNames[studentYear] || studentYear;


// ================= TODAY =================
// ================= TODAY =================

const today = new Date();

const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const todayName = dayNames[today.getDay()];

const dateElement =
    document.getElementById("todayDate");

dateElement.textContent =
    today.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

const todayDay =
    document.getElementById("todayDay");

todayDay.textContent =
    todayName;


// ================= TODAY'S CLASSES =================

const classes = {

    Monday: [
        ["09:00 AM", "Data Structures", "Room 204 • Prof. Sharma"],
        ["11:00 AM", "Database Management", "Lab 3 • Prof. Singh"],
        ["02:00 PM", "Web Development", "Room 105 • Prof. Kumar"]
    ],

    Tuesday: [
        ["09:00 AM", "Operating Systems", "Room 201"],
        ["11:00 AM", "Java Programming", "Lab 2"],
        ["02:00 PM", "Mathematics", "Room 108"]
    ],

    Wednesday: [
        ["09:00 AM", "Database Management", "Room 203"],
        ["11:00 AM", "Data Structures", "Lab 1"],
        ["02:00 PM", "Web Development", "Room 105"]
    ],

    Thursday: [
        ["09:00 AM", "Java Programming", "Room 202"],
        ["11:00 AM", "Operating Systems", "Lab 4"],
        ["02:00 PM", "Computer Networks", "Room 109"]
    ],

    Friday: [
        ["09:00 AM", "Data Structures", "Room 204"],
        ["11:00 AM", "Computer Networks", "Room 109"],
        ["02:00 PM", "Project Work", "Innovation Lab"]
    ],

    Saturday: [
        ["09:00 AM", "Hackathon / Club", "Innovation Hub"],
        ["11:00 AM", "Skill Development", "Seminar Hall"]
    ],

    Sunday: []

};


// ================= DISPLAY TODAY'S CLASSES =================

const todayClasses =
    document.querySelector(".today-classes");

todayClasses.innerHTML = "";

const todaySchedule =
    classes[todayName] || [];


if (todaySchedule.length === 0) {

    todayClasses.innerHTML =
        `<div class="class-box">
            <div>
                <h3>No Classes Today 🎉</h3>
                <p>Enjoy your day!</p>
            </div>
        </div>`;

}
else {

    todaySchedule.forEach(function (item) {

        todayClasses.innerHTML +=
            `<div class="class-box">

                <span class="class-time">
                    ${item[0]}
                </span>

                <div>
                    <h3>${item[1]}</h3>
                    <p>${item[2]}</p>
                </div>

            </div>`;

    });

}


// ================= NEXT CLASS =================

const nextClass =
    document.getElementById("nextClass");

if (todaySchedule.length > 0) {

    nextClass.textContent =
        todaySchedule[0][1] +
        " • " +
        todaySchedule[0][0];

}
else {

    nextClass.textContent =
        "No classes today";

}

// ================= HIGHLIGHT TODAY =================

const dayCards =
    document.querySelectorAll(".day-card");

dayCards.forEach(function (card) {

    const dayName =
        card.querySelector(".day-header h3").textContent;

    if (dayName === todayName) {

        card.classList.add("today");

    }

});
// ================= CLICKABLE DAY CARDS =================

const allDayCards =
    document.querySelectorAll(".day-card");

allDayCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const selectedDay =
            card.querySelector(".day-header h3").textContent;

        const selectedSchedule =
            classes[selectedDay] || [];

        todayClasses.innerHTML = "";

        if (selectedSchedule.length === 0) {

            todayClasses.innerHTML =
                `<div class="class-box">
                    <div>
                        <h3>No Classes 🎉</h3>
                        <p>No classes scheduled for ${selectedDay}.</p>
                    </div>
                </div>`;

        }
        else {

            selectedSchedule.forEach(function (item) {

                todayClasses.innerHTML +=
                    `<div class="class-box">

                        <span class="class-time">
                            ${item[0]}
                        </span>

                        <div>
                            <h3>${item[1]}</h3>
                            <p>${item[2]}</p>
                        </div>

                    </div>`;

            });

        }

    });

});
// ================= CONSOLE =================

console.log("CampusX Timetable Loaded");

console.log("Student:", studentName);

console.log("Branch:", studentBranch);

console.log("Year:", studentYear);

console.log("Today:", todayName);
