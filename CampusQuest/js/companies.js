// ================= COMPANY SEARCH & FILTER =================

let search = document.getElementById("companySearch");
let branch = document.getElementById("branchFilter");
let type = document.getElementById("typeFilter");

let companies = document.querySelectorAll(".company-card");


function filterCompanies() {

    let searchValue = search.value.toLowerCase();
    let branchValue = branch.value.toLowerCase();
    let typeValue = type.value.toLowerCase();


    companies.forEach(function(company) {

        let companyName = company.getAttribute("data-company");
        let companyBranch = company.getAttribute("data-branch");
        let companyType = company.getAttribute("data-type");


        let searchMatch =
            companyName.includes(searchValue);


        let branchMatch =
            branchValue === "all" ||
            companyBranch.includes(branchValue);


        let typeMatch =
            typeValue === "all" ||
            companyType.includes(typeValue);


        if (searchMatch && branchMatch && typeMatch) {

            company.style.display = "flex";

        } else {

            company.style.display = "none";

        }

    });

}


// Search company
search.addEventListener("input", filterCompanies);


// Filter branch
branch.addEventListener("change", filterCompanies);


// Filter opportunity type
type.addEventListener("change", filterCompanies);