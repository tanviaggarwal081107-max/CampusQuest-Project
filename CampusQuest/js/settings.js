/* =====================================
   GET CURRENT USER
===================================== */

const currentUserEmail =
    localStorage.getItem("currentUserEmail");


/* =====================================
   CHECK LOGIN
===================================== */

if (!currentUserEmail) {

    window.location.href = "login.html";

}


/* =====================================
   GET USERS
===================================== */

const users =
    JSON.parse(
        localStorage.getItem("campusQuestUsers")
    ) || [];


/* =====================================
   FIND CURRENT USER
===================================== */

const currentUser = users.find(
    function (user) {

        return user.email.toLowerCase() ===
               currentUserEmail.toLowerCase();

    }
);


/* =====================================
   CHECK USER
===================================== */

if (!currentUser) {

    window.location.href = "login.html";

}


/* =====================================
   GET HTML ELEMENTS
===================================== */

const settingsName =
    document.getElementById("settingsName");

const settingsEmail =
    document.getElementById("settingsEmail");

const settingsBranch =
    document.getElementById("settingsBranch");

const settingsYear =
    document.getElementById("settingsYear");

const themeToggle =
    document.getElementById("themeToggle");

const notificationToggle =
    document.getElementById("notificationToggle");

const achievementToggle =
    document.getElementById("achievementToggle");

const soundToggle =
    document.getElementById("soundToggle");

const saveButton =
    document.getElementById("saveButton");

const settingsMessage =
    document.getElementById("settingsMessage");

const resetButton =
    document.getElementById("resetButton");

const logoutButton =
    document.getElementById("logoutButton");

const backButton =
    document.getElementById("backButton");


/* =====================================
   YEAR NAMES
===================================== */

const yearNames = {

    "1": "1st Year",

    "2": "2nd Year",

    "3": "3rd Year",

    "4": "4th Year"

};


/* =====================================
   DISPLAY ACCOUNT INFORMATION
===================================== */

settingsName.textContent =
    currentUser.name;

settingsEmail.textContent =
    currentUser.email;

settingsBranch.textContent =
    currentUser.branch;

settingsYear.textContent =
    yearNames[currentUser.year] ||
    currentUser.year;


/* =====================================
   GET SAVED SETTINGS
===================================== */

const savedSettings =
    JSON.parse(
        localStorage.getItem(
            "campusQuestSettings"
        )
    ) || {};


/* =====================================
   LOAD SETTINGS
===================================== */

themeToggle.checked =
    savedSettings.theme === "light";

notificationToggle.checked =
    savedSettings.notifications !== false;

achievementToggle.checked =
    savedSettings.achievements !== false;

soundToggle.checked =
    savedSettings.sound !== false;


/* =====================================
   APPLY THEME
===================================== */

if (themeToggle.checked) {

    document.body.classList.add(
        "light-mode"
    );

}


/* =====================================
   THEME TOGGLE
===================================== */

themeToggle.addEventListener(
    "change",
    function () {

        if (themeToggle.checked) {

            document.body.classList.add(
                "light-mode"
            );

        }
        else {

            document.body.classList.remove(
                "light-mode"
            );

        }

    }
);


/* =====================================
   SAVE SETTINGS
===================================== */

saveButton.addEventListener(
    "click",
    function () {

        const settings = {

            theme:
                themeToggle.checked
                    ? "light"
                    : "dark",

            notifications:
                notificationToggle.checked,

            achievements:
                achievementToggle.checked,

            sound:
                soundToggle.checked

        };


        localStorage.setItem(
            "campusQuestSettings",
            JSON.stringify(settings)
        );


        settingsMessage.textContent =
            "Settings saved successfully! ✅";


        setTimeout(
            function () {

                settingsMessage.textContent = "";

            },
            2500
        );

    }
);


/* =====================================
   RESET GAME PROGRESS
===================================== */

resetButton.addEventListener(
    "click",
    function () {

        const confirmReset =
            confirm(
                "Are you sure you want to reset your XP, quests and streak?"
            );


        if (!confirmReset) {

            return;

        }


        currentUser.xp = 0;

        currentUser.questsCompleted = 0;

        currentUser.streak = 0;


        localStorage.setItem(
            "campusQuestUsers",
            JSON.stringify(users)
        );


        settingsMessage.textContent =
            "Game progress has been reset. 🔄";


        settingsMessage.style.color =
            "#ff6b87";

    }
);


/* =====================================
   LOGOUT
===================================== */

logoutButton.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "currentUserEmail"
        );


        window.location.href =
            "login.html";

    }
);


/* =====================================
   BACK TO PROFILE
===================================== */

backButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "profile.html";

    }
);