/* =====================================
   GET ELEMENTS
===================================== */

const registerForm =
    document.getElementById("registerForm");

const name =
    document.getElementById("name");

const email =
    document.getElementById("email");

const branch =
    document.getElementById("branch");

const year =
    document.getElementById("year");

const password =
    document.getElementById("password");

const confirmPassword =
    document.getElementById("confirmPassword");

const terms =
    document.getElementById("terms");

const registerMessage =
    document.getElementById("registerMessage");

const strengthBar =
    document.getElementById("strengthBar");

const strengthText =
    document.getElementById("strengthText");


/* =====================================
   EMAIL VALIDATION
===================================== */

function validEmail(emailValue) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(emailValue);

}


/* =====================================
   SHOW / HIDE PASSWORD
===================================== */

document
    .getElementById("togglePassword")
    .addEventListener("click", function () {

        if (password.type === "password") {

            password.type = "text";

            this.textContent = "🙈";

        }

        else {

            password.type = "password";

            this.textContent = "👁";

        }

    });


document
    .getElementById("toggleConfirm")
    .addEventListener("click", function () {

        if (confirmPassword.type === "password") {

            confirmPassword.type = "text";

            this.textContent = "🙈";

        }

        else {

            confirmPassword.type = "password";

            this.textContent = "👁";

        }

    });


/* =====================================
   AVATAR SELECTION
===================================== */

const avatars =
    document.querySelectorAll(".avatar");

let selectedAvatar = "";


avatars.forEach(function (avatar) {

    avatar.addEventListener("click", function () {

        avatars.forEach(function (item) {

            item.classList.remove("selected");

        });


        this.classList.add("selected");

        selectedAvatar = this.textContent;

        document.getElementById(
            "avatarError"
        ).textContent = "";

    });

});


/* =====================================
   PASSWORD STRENGTH
===================================== */

password.addEventListener(
    "input",
    function () {

        const value = password.value;

        let strength = 0;


        if (value.length >= 6) {

            strength++;

        }


        if (/[A-Za-z]/.test(value)) {

            strength++;

        }


        if (/[0-9]/.test(value)) {

            strength++;

        }


        if (/[^A-Za-z0-9]/.test(value)) {

            strength++;

        }


        if (strength === 0) {

            strengthBar.style.width = "0%";

            strengthText.textContent =
                "Password strength";

        }

        else if (strength === 1) {

            strengthBar.style.width = "25%";

            strengthText.textContent =
                "Weak password";

        }

        else if (strength === 2) {

            strengthBar.style.width = "50%";

            strengthText.textContent =
                "Okay password";

        }

        else if (strength === 3) {

            strengthBar.style.width = "75%";

            strengthText.textContent =
                "Good password";

        }

        else {

            strengthBar.style.width = "100%";

            strengthText.textContent =
                "QUEST READY! ⚡";

        }

    }
);


/* =====================================
   FORM SUBMIT
===================================== */

registerForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        let valid = true;


        /* CLEAR ERRORS */

        document.getElementById(
            "nameError"
        ).textContent = "";

        document.getElementById(
            "emailError"
        ).textContent = "";

        document.getElementById(
            "branchError"
        ).textContent = "";

        document.getElementById(
            "yearError"
        ).textContent = "";

        document.getElementById(
            "passwordError"
        ).textContent = "";

        document.getElementById(
            "confirmError"
        ).textContent = "";

        document.getElementById(
            "avatarError"
        ).textContent = "";

        document.getElementById(
            "termsError"
        ).textContent = "";

        registerMessage.textContent = "";


        /* NAME */

        if (name.value.trim() === "") {

            document.getElementById(
                "nameError"
            ).textContent =
                "Name is required.";

            valid = false;

        }


        /* EMAIL */

        if (email.value.trim() === "") {

            document.getElementById(
                "emailError"
            ).textContent =
                "Email is required.";

            valid = false;

        }

        else if (
            !validEmail(email.value.trim())
        ) {

            document.getElementById(
                "emailError"
            ).textContent =
                "Enter a valid email.";

            valid = false;

        }


        /* BRANCH */

        if (branch.value === "") {

            document.getElementById(
                "branchError"
            ).textContent =
                "Select your branch.";

            valid = false;

        }


        /* YEAR */

        if (year.value === "") {

            document.getElementById(
                "yearError"
            ).textContent =
                "Select your year.";

            valid = false;

        }


        /* AVATAR */

        if (selectedAvatar === "") {

            document.getElementById(
                "avatarError"
            ).textContent =
                "Choose an avatar.";

            valid = false;

        }


        /* PASSWORD */

        if (password.value === "") {

            document.getElementById(
                "passwordError"
            ).textContent =
                "Password is required.";

            valid = false;

        }

        else if (password.value.length < 6) {

            document.getElementById(
                "passwordError"
            ).textContent =
                "Password must contain at least 6 characters.";

            valid = false;

        }


        /* CONFIRM PASSWORD */

        if (confirmPassword.value === "") {

            document.getElementById(
                "confirmError"
            ).textContent =
                "Please confirm your password.";

            valid = false;

        }

        else if (
            password.value !== confirmPassword.value
        ) {

            document.getElementById(
                "confirmError"
            ).textContent =
                "Passwords do not match.";

            valid = false;

        }


        /* TERMS */

        if (!terms.checked) {

            document.getElementById(
                "termsError"
            ).textContent =
                "You must accept the rules.";

            valid = false;

        }


        /* SUCCESS */

      
        /* SUCCESS */

        if (valid) {

            registerMessage.textContent =
                "Quest account created successfully! 🎮";

            registerMessage.style.color =
                "#00e0a0";


            // Save student information
            const student = {

                name: name.value.trim(),
                email: email.value.trim(),
                branch: branch.value,
                year: year.value,
                avatar: selectedAvatar

            };


            // Get existing users
            const users =
                JSON.parse(
                    localStorage.getItem("campusQuestUsers")
                ) || [];


            // Add new user
            users.push(student);


            // Save users
            localStorage.setItem(
                "campusQuestUsers",
                JSON.stringify(users)
            );


            // Set current logged-in user
            localStorage.setItem(
                "currentUserEmail",
                student.email
            );


            // Go to dashboard
            setTimeout(function () {

                window.location.href =
                    "dashboard.html";

            }, 800);

        }


    }
    
);