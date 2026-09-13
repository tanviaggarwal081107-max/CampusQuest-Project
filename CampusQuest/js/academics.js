/* =====================================
   GET CURRENT USER
===================================== */

const currentUserEmail =
    localStorage.getItem("currentUserEmail");


const users =
    JSON.parse(
        localStorage.getItem("campusQuestUsers")
    ) || [];


/* =====================================
   FIND CURRENT USER
===================================== */

let currentUser = null;


if (currentUserEmail) {

    currentUser = users.find(
        function (user) {

            return user.email.toLowerCase() ===
                   currentUserEmail.toLowerCase();

        }
    );

}


/* =====================================
   CHECK USER
===================================== */

if (!currentUser) {

    window.location.href =
        "login.html";

}


/* =====================================
   STUDENT DETAILS
===================================== */

const studentName =
    currentUser.name;


const studentBranch =
    currentUser.branch;


const studentYear =
    currentUser.year;


/* =====================================
   YEAR NAME
===================================== */

const yearNames = {

    "1": "1st Year",
    "2": "2nd Year",
    "3": "3rd Year",
    "4": "4th Year"

};


/* =====================================
   DISPLAY STUDENT NAME
===================================== */

const student =
    document.querySelector(".student span");


student.textContent =
    studentName;


/* =====================================
   DISPLAY AVATAR
===================================== */

const avatar =
    document.querySelector(".avatar");


avatar.textContent =
    studentName
        .charAt(0)
        .toUpperCase();


/* =====================================
   DISPLAY BRANCH + YEAR
===================================== */

const topText =
    document.querySelector(".top p");


topText.textContent =
    studentBranch +
    " • " +
    (yearNames[studentYear] ||
     studentYear);


/* =====================================
   DISPLAY BRANCH BADGE
===================================== */

const branchBadge =
    document.querySelector(".branch-badge");


if (branchBadge) {

    branchBadge.textContent =
        studentBranch;

}


/* =====================================
   CURRENT DAY
===================================== */

const today =
    new Date();


const day =
    today.toLocaleDateString(
        "en-IN",
        {
            weekday: "long"
        }
    );


console.log(
    "Today:",
    day
);


/* =====================================
   PAGE LOADED
===================================== */

console.log(
    "CampusX Academics Loaded"
);


console.log(
    "Student:",
    studentName
);


console.log(
    "Branch:",
    studentBranch
);


console.log(
    "Year:",
    studentYear
);