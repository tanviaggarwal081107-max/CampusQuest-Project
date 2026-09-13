/* =====================================
   GET HTML ELEMENTS
===================================== */

const loginForm =
    document.getElementById("loginForm");


const email =
    document.getElementById("email");


const password =
    document.getElementById("password");


const emailError =
    document.getElementById("emailError");


const passwordError =
    document.getElementById("passwordError");


const loginMessage =
    document.getElementById("loginMessage");


const togglePassword =
    document.getElementById("togglePassword");


const forgotPassword =
    document.getElementById("forgotPassword");


const forgotModal =
    document.getElementById("forgotModal");


const closeModal =
    document.getElementById("closeModal");


const forgotForm =
    document.getElementById("forgotForm");


const forgotEmail =
    document.getElementById("forgotEmail");


const forgotEmailError =
    document.getElementById("forgotEmailError");


const forgotMessage =
    document.getElementById("forgotMessage");



/* =====================================
   EMAIL VALIDATION FUNCTION
===================================== */

function validEmail(emailValue) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(emailValue);

}



/* =====================================
   SHOW / HIDE PASSWORD
===================================== */

togglePassword.addEventListener(
    "click",
    function () {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.textContent = "🙈";

        }

        else {

            password.type = "password";

            togglePassword.textContent = "👁";

        }

    }
);



/* =====================================
   LOGIN VALIDATION
===================================== */

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        let valid = true;


        /* Clear previous messages */

        emailError.textContent = "";

        passwordError.textContent = "";

        loginMessage.textContent = "";



        /* =================================
           EMAIL CHECK
        ================================= */

        if (email.value.trim() === "") {

            emailError.textContent =
                "Email is required.";

            valid = false;

        }

        else if (
            !validEmail(
                email.value.trim()
            )
        ) {

            emailError.textContent =
                "Please enter a valid email address.";

            valid = false;

        }



        /* =================================
           PASSWORD CHECK
        ================================= */

        if (password.value === "") {

            passwordError.textContent =
                "Password is required.";

            valid = false;

        }

        else if (
            password.value.length < 6
        ) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            valid = false;

        }



        /* =================================
           SUCCESS
        ================================= */

        if (valid) {

            loginMessage.textContent =
                "Login details look good! 🎮";

            loginMessage.style.color =
                "#00e0a0";


            /*
                BACKEND WILL BE CONNECTED HERE.

                Later:

                Login Form
                    ↓
                Java Backend
                    ↓
                MySQL
                    ↓
                Verify User
                    ↓
                Dashboard
            */

        }

    }
);



/* =====================================
   FORGOT PASSWORD
===================================== */

forgotPassword.addEventListener(
    "click",
    function () {

        forgotModal.classList.add("show");


        forgotEmail.value = "";


        forgotEmailError.textContent = "";


        forgotMessage.textContent = "";

    }
);



/* =====================================
   CLOSE FORGOT PASSWORD
===================================== */

closeModal.addEventListener(
    "click",
    function () {

        forgotModal.classList.remove("show");

    }
);



/* =====================================
   CLOSE BY CLICKING OUTSIDE
===================================== */

forgotModal.addEventListener(
    "click",
    function (event) {

        if (event.target === forgotModal) {

            forgotModal.classList.remove("show");

        }

    }
);



/* =====================================
   FORGOT PASSWORD VALIDATION
===================================== */

forgotForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        forgotEmailError.textContent = "";

        forgotMessage.textContent = "";



        /* Empty email */

        if (
            forgotEmail.value.trim() === ""
        ) {

            forgotEmailError.textContent =
                "Please enter your email.";

            return;

        }



        /* Invalid email */

        if (
            !validEmail(
                forgotEmail.value.trim()
            )
        ) {

            forgotEmailError.textContent =
                "Please enter a valid email address.";

            return;

        }



        /* Success */

        forgotMessage.textContent =
            "If this email is registered, a reset link will be sent. 📩";


        forgotMessage.style.color =
            "#00e0a0";


        /*
            REAL PASSWORD RESET WILL BE
            CONNECTED TO THE BACKEND LATER.
        */

    }
);