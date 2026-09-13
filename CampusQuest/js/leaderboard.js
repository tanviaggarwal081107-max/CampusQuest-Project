/* =====================================================
   CAMPUSQUEST LEADERBOARD JAVASCRIPT
===================================================== */


/* =====================================================
   GET CURRENT USER EMAIL
===================================================== */

const currentUserEmail =
    localStorage.getItem("currentUserEmail");


/* =====================================================
   LOGIN CHECK
===================================================== */

if (!currentUserEmail) {

    window.location.href = "login.html";

}


/* =====================================================
   GET USERS
===================================================== */

const users =
    JSON.parse(
        localStorage.getItem("campusQuestUsers")
    ) || [];


/* =====================================================
   FIND CURRENT USER
===================================================== */

const currentUser =
    users.find(
        function (user) {

            return (
                user.email.toLowerCase() ===
                currentUserEmail.toLowerCase()
            );

        }
    );


/* =====================================================
   USER NOT FOUND
===================================================== */

if (!currentUser) {

    window.location.href = "login.html";

}


/* =====================================================
   GET HTML ELEMENTS
===================================================== */

const podiumSection =
    document.getElementById(
        "podiumSection"
    );


const leaderboardList =
    document.getElementById(
        "leaderboardList"
    );


const currentPlayerAvatar =
    document.getElementById(
        "currentPlayerAvatar"
    );


const currentPlayerName =
    document.getElementById(
        "currentPlayerName"
    );


const currentPlayerXP =
    document.getElementById(
        "currentPlayerXP"
    );


const yourRank =
    document.getElementById(
        "yourRank"
    );


const yourXP =
    document.getElementById(
        "yourXP"
    );


const yourQuests =
    document.getElementById(
        "yourQuests"
    );


/* =====================================================
   BUTTONS
===================================================== */

const backButton =
    document.getElementById(
        "backButton"
    );


const questsButton =
    document.getElementById(
        "questsButton"
    );


const settingsButton =
    document.getElementById(
        "settingsButton"
    );
    backButton.addEventListener("click", function () {
    window.location.href = "dashboard.html";
});

questsButton.addEventListener("click", function () {
    window.location.href = "quests.html";
});

settingsButton.addEventListener("click", function () {
    window.location.href = "settings.html";
});


/* =====================================================
   SORT USERS BY XP
===================================================== */

const leaderboardUsers =
    [...users].sort(
        function (a, b) {

            const xpA =
                Number(a.xp) || 0;

            const xpB =
                Number(b.xp) || 0;

            return xpB - xpA;

        }
    );


/* =====================================================
   CURRENT USER RANK
===================================================== */

const currentUserRank =
    leaderboardUsers.findIndex(
        function (user) {

            return (
                user.email.toLowerCase() ===
                currentUser.email.toLowerCase()
            );

        }
    ) + 1;


/* =====================================================
   DISPLAY PODIUM
===================================================== */

function displayPodium() {


    /* Clear old podium */

    podiumSection.innerHTML = "";


    /*
        ALWAYS CREATE THREE POSITIONS.

        LEFT  = #2
        CENTER = #1
        RIGHT = #3
    */


    const secondUser =
        leaderboardUsers[1] || null;


    const firstUser =
        leaderboardUsers[0] || null;


    const thirdUser =
        leaderboardUsers[2] || null;


    const podiumPositions = [

        {
            rank: 2,

            medal: "🥈",

            className: "second",

            user: secondUser

        },


        {
            rank: 1,

            medal: "🥇",

            className: "first",

            user: firstUser

        },


        {
            rank: 3,

            medal: "🥉",

            className: "third",

            user: thirdUser

        }

    ];


    /* =================================================
       CREATE ALL THREE CARDS
    ================================================= */

    podiumPositions.forEach(
        function (position) {


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "podium-card " +
                position.className;


            /* =================================================
               IF PLAYER EXISTS
            ================================================= */

            if (position.user) {


                const user =
                    position.user;


                const xp =
                    Number(user.xp) || 0;


                let crown = "";


                if (position.rank === 1) {

                    crown = `

                        <div class="crown">
                            👑
                        </div>

                    `;

                }


                card.innerHTML = `

                    ${crown}


                    <div class="rank-number">

                        ${position.medal}

                    </div>


                    <div class="podium-avatar">

                        ${user.avatar || "🎮"}

                    </div>


                    <h2>

                        ${user.name}

                    </h2>


                    <p class="podium-xp">

                        ⚡ ${xp} XP

                    </p>


                    <div class="podium-block">

                        <span>

                            #${position.rank}

                        </span>

                    </div>

                `;

            }


            /* =================================================
               IF PLAYER DOES NOT EXIST
            ================================================= */

            else {


                card.innerHTML = `


                    <div class="rank-number">

                        ${position.medal}

                    </div>


                    <div class="podium-avatar empty-avatar">

                        👤

                    </div>


                    <h2>

                        Waiting...

                    </h2>


                    <p class="podium-xp empty-xp">

                        No player yet

                    </p>


                    <div class="podium-block">

                        <span>

                            #${position.rank}

                        </span>

                    </div>

                `;

            }


            /* Add card */

            podiumSection.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   DISPLAY ALL EXPLORERS
===================================================== */

function displayLeaderboard() {


    leaderboardList.innerHTML = "";


    leaderboardUsers.forEach(
        function (user, index) {


            const rank =
                index + 1;


            const xp =
                Number(user.xp) || 0;


            const quests =
                Number(
                    user.questsCompleted
                ) || 0;


            const isCurrentUser =
                user.email.toLowerCase() ===
                currentUser.email.toLowerCase();


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "player-row";


            if (isCurrentUser) {

                row.classList.add(
                    "current-player"
                );

            }


            row.innerHTML = `

                <div class="rank">

                    #${rank}

                </div>


                <div class="player-avatar">

                    ${user.avatar || "🎮"}

                </div>


                <div class="player-details">

                    <h3>

                        ${user.name}

                        ${
                            isCurrentUser
                                ? " ⭐"
                                : ""
                        }

                    </h3>


                    <p>

                        ${quests}
                        quests completed

                    </p>

                </div>


                <div class="player-stats">

                    <strong>

                        ${xp}

                    </strong>


                    <span>

                        XP

                    </span>

                </div>

            `;


            leaderboardList.appendChild(
                row
            );

        }
    );

}


/* =====================================================
   UPDATE YOUR POSITION
===================================================== */

function updateCurrentPlayer() {


    const xp =
        Number(currentUser.xp) || 0;


    const quests =
        Number(
            currentUser.questsCompleted
        ) || 0;


    currentPlayerAvatar.textContent =
        currentUser.avatar || "🎮";


    currentPlayerName.textContent =
        currentUser.name;


    currentPlayerXP.textContent =
        xp;


    yourRank.textContent =
        "#" + currentUserRank;


    yourXP.textContent =
        xp;


    yourQuests.textContent =
        quests;

}


/* =====================================================
   NAVIGATION
===================================================== */


backButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "profile.html";

    }
);


questsButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "quests.html";

    }
);


settingsButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "settings.html";

    }
);


/* =====================================================
   START LEADERBOARD
===================================================== */

displayPodium();

displayLeaderboard();

updateCurrentPlayer();