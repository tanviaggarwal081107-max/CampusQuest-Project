
// Welcome message

let hour = new Date().getHours();

let welcome = document.querySelector(".top-bar h1");

if (hour < 12) {
    welcome.innerHTML = "Good Morning! 👋";
}
else if (hour < 18) {
    welcome.innerHTML = "Good Afternoon! 👋";
}
else {
    welcome.innerHTML = "Good Evening! 👋";
}


// Current date

let today = new Date();

let date = today.toLocaleDateString("en-IN");

document.querySelector(".top-bar p").innerHTML = date;


// Dashboard loaded

console.log("CampusX Dashboard Loaded");

