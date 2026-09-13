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

const playerAvatar =
    document.getElementById("playerAvatar");

const playerName =
    document.getElementById("playerName");

const playerLevel =
    document.getElementById("playerLevel");

const playerXP =
    document.getElementById("playerXP");

const xpProgress =
    document.getElementById("xpProgress");

const questList =
    document.getElementById("questList");

const questMessage =
    document.getElementById("questMessage");

const backButton =
    document.getElementById("backButton");

const profileButton =
    document.getElementById("profileButton");

const settingsButton =
    document.getElementById("settingsButton");



/* =====================================
   QUEST DATA
===================================== */

const quests = [

    {
        id: 1,
        title: "Complete Your Profile",
        description:
            "Make sure your CampusQuest profile is complete.",
        category: "campus",
        emoji: "👤",
        xp: 100
    },

    {
        id: 2,
        title: "Study Session",
        description:
            "Complete a focused study session today.",
        category: "academic",
        emoji: "📚",
        xp: 150
    },

    {
        id: 3,
        title: "Meet a New Classmate",
        description:
            "Introduce yourself to someone new on campus.",
        category: "social",
        emoji: "🤝",
        xp: 100
    },

    {
        id: 4,
        title: "Visit the Library",
        description:
            "Spend some time exploring the campus library.",
        category: "academic",
        emoji: "📖",
        xp: 120
    },

    {
        id: 5,
        title: "Explore Campus",
        description:
            "Visit a new place around your campus.",
        category: "campus",
        emoji: "🏫",
        xp: 100
    },

    {
        id: 6,
        title: "Help a Friend",
        description:
            "Help a classmate with their studies or campus task.",
        category: "social",
        emoji: "💪",
        xp: 150
    }

];


/* =====================================
   COMPLETED QUESTS
===================================== */

let completedQuests =
    JSON.parse(
        localStorage.getItem(
            "completedQuests_" +
            currentUser.email
        )
    ) || [];


/* =====================================
   CALCULATE LEVEL
===================================== */

function calculateLevel(xp) {

    return Math.floor(xp / 500) + 1;

}


/* =====================================
   UPDATE PLAYER
===================================== */

function updatePlayer() {

    const xp =
        currentUser.xp || 0;

    const level =
        calculateLevel(xp);

    playerAvatar.textContent =
        currentUser.avatar || "🎮";

    playerName.textContent =
        currentUser.name;

    playerLevel.textContent =
        "⚡ Level " + level;

    playerXP.textContent =
        xp;


    const xpInsideLevel =
        xp % 500;

    const progress =
        (xpInsideLevel / 500) * 100;

    xpProgress.style.width =
        progress + "%";


}


/* =====================================
   DISPLAY QUESTS
===================================== */

function displayQuests(filter) {

    questList.innerHTML = "";


    quests.forEach(
        function (quest) {

            if (
                filter !== "all" &&
                quest.category !== filter
            ) {

                return;

            }


            const completed =
                completedQuests.includes(
                    quest.id
                );


            const card =
                document.createElement("div");

            card.className =
                "quest-card";


            if (completed) {

                card.classList.add(
                    "completed"
                );

            }


            card.innerHTML = `

                <div class="quest-top">

                    <div class="quest-emoji">
                        ${quest.emoji}
                    </div>

                    <span class="quest-category">
                        ${quest.category}
                    </span>

                </div>


                <h3>
                    ${quest.title}
                </h3>


                <p class="quest-description">
                    ${quest.description}
                </p>


                <div class="quest-bottom">

                    <span class="quest-reward">
                        ⚡ +${quest.xp} XP
                    </span>


                    <button
                        class="complete-button"
                        data-id="${quest.id}"
                        ${completed ? "disabled" : ""}>

                        ${
                            completed
                                ? "✅ Completed"
                                : "Complete Quest"
                        }

                    </button>

                </div>

            `;


            questList.appendChild(card);

        }
    );


    /* ADD BUTTON EVENTS */

    const buttons =
        document.querySelectorAll(
            ".complete-button"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    completeQuest(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        }
    );

}


/* =====================================
   COMPLETE QUEST
===================================== */

function completeQuest(questId) {

    if (
        completedQuests.includes(
            questId
        )
    ) {

        return;

    }


    const quest =
        quests.find(
            function (item) {

                return item.id === questId;

            }
        );


    if (!quest) {

        return;

    }


    /* ADD XP */

    currentUser.xp =
        (currentUser.xp || 0) +
        quest.xp;


    /* ADD QUEST COUNT */

    currentUser.questsCompleted =
        (currentUser.questsCompleted || 0) +
        1;


    /* SAVE USER */

    localStorage.setItem(
        "campusQuestUsers",
        JSON.stringify(users)
    );


    /* SAVE COMPLETED QUEST */

    completedQuests.push(
        questId
    );


    localStorage.setItem(
        "completedQuests_" +
        currentUser.email,
        JSON.stringify(
            completedQuests
        )
    );


    /* UPDATE SCREEN */

    updatePlayer();

    displayQuests(
        "all"
    );


    questMessage.textContent =
        "Quest completed! +" +
        quest.xp +
        " XP 🎉";


    setTimeout(
        function () {

            questMessage.textContent = "";

        },
        2500
    );

}


/* =====================================
   FILTER BUTTONS
===================================== */

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );


filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                displayQuests(
                    button.dataset.filter
                );

            }
        );

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


/* =====================================
   PROFILE BUTTON
===================================== */

profileButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "profile.html";

    }
);


/* =====================================
   SETTINGS BUTTON
===================================== */

settingsButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "settings.html";

    }
);


/* =====================================
   START PAGE
===================================== */

updatePlayer();

displayQuests("all");