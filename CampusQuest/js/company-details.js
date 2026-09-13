// ================= COMPANY DETAILS =================

// Get the company name from the URL
let params = new URLSearchParams(window.location.search);
let company = params.get("company");


// Company data
let companyData = {

    technova: {
        name: "TechNova Solutions",
        icon: "💻",
        date: "18 September 2026",
        type: "Placement Drive",
        branch: "CSE, IT, AI & DS",
        venue: "Main Auditorium",
        status: "🟢 Registration Open"
    },

    codesphere: {
        name: "CodeSphere Technologies",
        icon: "🚀",
        date: "24 September 2026",
        type: "Internship + Placement",
        branch: "CSE, IT & ECE",
        venue: "Seminar Hall",
        status: "🟢 Registration Open"
    },

    innovateai: {
        name: "InnovateAI",
        icon: "🤖",
        date: "30 September 2026",
        type: "Internship Drive",
        branch: "AI, DS & CSE",
        venue: "Block A",
        status: "🟢 Registration Open"
    },

    webcore: {
        name: "WebCore Labs",
        icon: "🌐",
        date: "5 October 2026",
        type: "Placement Drive",
        branch: "CSE, IT & ECE",
        venue: "Placement Cell",
        status: "🟢 Registration Open"
    }

};


// Check whether company exists
if (company && companyData[company]) {

    let data = companyData[company];


    // Update page
    document.getElementById("companyTitle").innerHTML =
        data.icon + " " + data.name;

    document.getElementById("companyName").innerHTML =
        data.name;

    document.getElementById("companyIcon").innerHTML =
        data.icon;

    document.getElementById("companyStatus").innerHTML =
        data.status;

    document.getElementById("companyDate").innerHTML =
        data.date;

    document.getElementById("companyType").innerHTML =
        data.type;

    document.getElementById("companyBranch").innerHTML =
        data.branch;

    document.getElementById("companyVenue").innerHTML =
        data.venue;


    document.getElementById("companyEligibility").innerHTML =
        "• Open to eligible students from " + data.branch + "<br>" +
        "• Students should meet the academic requirements<br>" +
        "• Carry your college ID card during the drive";


    document.getElementById("registrationText").innerHTML =
        "Register before the campus deadline to participate in this opportunity.";

}