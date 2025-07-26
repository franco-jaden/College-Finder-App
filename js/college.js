// Add JavaScript function to scroll to top when the button is clicked
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add JavaScript to show/hide the button based on scroll position
window.addEventListener('scroll', function() {
    var upButton = document.getElementById('up-button');
    if (window.pageYOffset > 0) {
        upButton.classList.add('show');
    } else {
        upButton.classList.remove('show');
    }
});

// Placeholder search results
let searchResults = [];

// Fetch the college data from the JSON file
fetch("../json/clglist.json")
    .then(response => response.json())
    .then(data => {
        searchResults = data;
        startup();
    })
    .catch(error => {
        console.error("Error fetching college data:", error);
    });


function clear() {
    const resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";
}

function startup() {
    const resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";

    searchResults.forEach(function (result) {
        const collegeProfile = document.createElement("div");
        collegeProfile.className = "college-profile";

        // College Picture
        const collegePicture = document.createElement("img");
        collegePicture.className = "college-picture";
        collegePicture.src = result.picture;
        collegeProfile.appendChild(collegePicture);

        // College Details
        const collegeDetails = document.createElement("div");
        collegeDetails.className = "college-details";

        // College Name
        const collegeName = document.createElement("h3");
        collegeName.textContent = result.collegeName;
        collegeDetails.appendChild(collegeName);

        // Country
        const country = document.createElement("p");
        country.textContent = "Country: " + result.country;
        collegeDetails.appendChild(country);

        // Ranking
        const course = document.createElement("p");
        course.textContent = "Ranking: " + result.Ranking;
        collegeDetails.appendChild(course);

        // Cost of Living
        const costOfLiving = document.createElement("p");
        costOfLiving.textContent = "Cost of Living: " + result.MincostOfLiving;
        collegeDetails.appendChild(costOfLiving);

        // College Link
        const campusLife = document.createElement("p");
        const campusLink = document.createElement("a");
        campusLink.href = result.link;
        campusLink.textContent = result.link;
        campusLink.target = "_blank";
        campusLink.style.textDecoration = "underline";
        campusLife.textContent = "College Link: ";
        campusLife.appendChild(campusLink);
        collegeDetails.appendChild(campusLife);

        // Acceptance Rate
        const acceptanceRate = document.createElement("p");
        acceptanceRate.textContent = "Acceptance Rate: " + result["Acceptance rate"];
        acceptanceRate.style.visibility = "hidden";
        acceptanceRate.style.position = "absolute";
        collegeDetails.appendChild(acceptanceRate);

        // IELTS/TOEFL
        const ieltsToefl = document.createElement("p");
        ieltsToefl.textContent = "IELTS/TOEFL: " + result.ielts;
        ieltsToefl.style.visibility = "hidden";
        ieltsToefl.style.position = "absolute";
        collegeDetails.appendChild(ieltsToefl);

        // GRE/GMAT
        const greGmat = document.createElement("p");
        greGmat.textContent = "GRE/GMAT: " + result.gre;
        greGmat.style.visibility = "hidden";
        greGmat.style.position = "absolute";
        collegeDetails.appendChild(greGmat);

        // Average Fees
        const avgFees = document.createElement("p");
        avgFees.textContent = "Average Fees: " + result.Avgfees;
        avgFees.style.visibility = "hidden";
        avgFees.style.position = "absolute";
        collegeDetails.appendChild(avgFees);

        // GPA
        const gpa = document.createElement("p");
        greGmat.textContent = "GPA: " + result.GPA;
        greGmat.style.visibility = "hidden";
        greGmat.style.position = "absolute";
        collegeDetails.appendChild(gpa);

        // Profile Button
        const profileBtn = document.createElement("button");
        profileBtn.textContent = "Profile";
        profileBtn.addEventListener("click", function () {
            // Add your profile functionality here
            // For example, you can call a function like viewProfile(result.collegeName);
            viewProfile(result.collegeName);
        });
        collegeDetails.appendChild(profileBtn);

        collegeProfile.appendChild(collegeDetails);
        resultsSection.appendChild(collegeProfile);
    });
}


function viewProfile(collegeName) {
    // Create a container for displaying the profile
    const profileContainer = document.createElement("div");

    // Fetch the college's profile data from the JSON file
    fetch("../json/clglist.json")
        .then((response) => response.json())
        .then((collegesData) => {
            const selectedCollege = collegesData.find((college) => college.collegeName === collegeName);

            if (selectedCollege) {
                // Create a div to hold the college information
                const collegeInfoDiv = document.createElement("div");
                collegeInfoDiv.style.display = "flex"; // Use flexbox for layout

                // Create an image element for the college's picture
                const collegePicture = document.createElement("img");
                collegePicture.src = selectedCollege.picture;
                collegePicture.alt = selectedCollege.collegeName;

                // Set specific dimensions for the image
                collegePicture.style.width = '700px';
                collegePicture.style.height = '450px';

                // Append the image to the college info div
                collegeInfoDiv.appendChild(collegePicture);

                // Create a div for the college's information (to the right of the image)
                const collegeInfoDetails = document.createElement("div");
                collegeInfoDetails.style.marginLeft = "20px"; // Adjust the margin as needed

                // Populate the college information div
                collegeInfoDetails.innerHTML = `
                    <p>Country: ${selectedCollege.country || "N/A"}</p>
                    <p>Minimum Cost of Living: $${selectedCollege.MincostOfLiving || "N/A"}</p>
                    <p>Email: ${selectedCollege.email || "N/A"}</p>
                    <p>IELTS Score Required: ${selectedCollege.ielts || "N/A"}</p>
                    <p>GRE Score Required: ${selectedCollege.gre || "N/A"}</p>
                    <p>GPA Requirement: ${selectedCollege.GPA || "N/A"}</p>
                    <p>Average Fees: $${selectedCollege.Avgfees || "N/A"}</p>
                    <p>Ranking: ${selectedCollege.Ranking || "N/A"}</p>
                    <p>Acceptance Rate: ${selectedCollege["Acceptance rate"] || "N/A"}</p>
                    <a href="${selectedCollege.link || "#"}" target="_blank">College Website</a>
                `;

                // Append the college information div to the college info div
                collegeInfoDiv.appendChild(collegeInfoDetails);

                // Append the college info div to the profile container
                profileContainer.appendChild(collegeInfoDiv);

                // Create a div for the college name (below the image)
                const collegeNameDiv = document.createElement("div");
                collegeNameDiv.innerHTML = `<h2 style="font-weight: bold">${selectedCollege.collegeName}</h2>`;

                // Append the college name div below the image
                profileContainer.appendChild(collegeNameDiv);

                // Clear the existing content and display the profile
                const resultsSection = document.getElementById("results");
                resultsSection.innerHTML = "";
                resultsSection.appendChild(profileContainer);

                // Add a "Back" button to return to the search results
                const backButton = document.createElement("button");
                backButton.textContent = "Back";
                backButton.addEventListener("click", function () {
                    // Call the function to reload the search results
                    searchbarsearch(); // You need to implement this function to reload the search results
                });
                resultsSection.appendChild(backButton);
            } else {
                // Handle the case where the college data is not found
                profileContainer.innerHTML = "<p>College data not found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error fetching college data:", error);
            // Set overflow property to auto
            profileContainer.style.overflow = "auto";
        });
}


function searchbarsearch() {
    const resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";

    // Get the values from the search criteria
    const country = document.getElementById("country").value || "Any";
    const costOfLivingMin = parseFloat(document.getElementById("cost-of-living-min").value) || 0;
    const costOfLivingMax = parseFloat(document.getElementById("cost-of-living-max").value) || Infinity;
    const acceptanceRateMin = parseFloat(document.getElementById("acceptance-rate-min").value) || 0;
    const acceptanceRateMax = parseFloat(document.getElementById("acceptance-rate-max").value) || 100;
    const ieltsToeflMin = parseFloat(document.getElementById("ielts-toefl-min").value) || 0;
    const ieltsToeflMax = parseFloat(document.getElementById("ielts-toefl-max").value) || Infinity;
    const greGmatMin = parseFloat(document.getElementById("gre-gmat-min").value) || 0;
    const greGmatMax = parseFloat(document.getElementById("gre-gmat-max").value) || Infinity;
    const feesMin = parseFloat(document.getElementById("fees-min").value) || 0;
    const feesMax = parseFloat(document.getElementById("fees-max").value) || Infinity;
    const rankingMin = parseInt(document.getElementById("ranking-min").value) || 0;
    const rankingMax = parseInt(document.getElementById("ranking-max").value) || Infinity;

    const searchInput = document.getElementById("search-input").value.toLowerCase().trim();

    // Filter the search results based on the criteria
    const filteredResults = searchResults.filter(function(result) {
        return (
            (country === "Any" || result.country === country) &&
            result.MincostOfLiving >= costOfLivingMin &&
            result.MincostOfLiving <= costOfLivingMax &&
            parseFloat(result["Acceptance rate"]) >= acceptanceRateMin &&
            parseFloat(result["Acceptance rate"]) <= acceptanceRateMax &&
            parseFloat(result.ielts) >= ieltsToeflMin &&
            parseFloat(result.ielts) <= ieltsToeflMax &&
            parseFloat(result.gre) >= greGmatMin &&
            parseFloat(result.gre) <= greGmatMax &&
            result.Avgfees >= feesMin &&
            result.Avgfees <= feesMax &&
            result.Ranking >= rankingMin &&
            result.Ranking <= rankingMax &&
            result.collegeName.toLowerCase().includes(searchInput)
        );
    });



    filteredResults.forEach(function(result) {
        const collegeProfile = document.createElement("div");
        collegeProfile.className = "college-profile";

        const collegePicture = document.createElement("img");
        collegePicture.className = "college-picture";
        collegePicture.src = result.picture;
        collegeProfile.appendChild(collegePicture);

        const collegeDetails = document.createElement("div");
        collegeDetails.className = "college-details";

        const collegeName = document.createElement("h3");
        collegeName.innerHTML = highlightMatchingText(result.collegeName, searchInput);
        collegeDetails.appendChild(collegeName);

        const country = document.createElement("p");
        country.textContent = "Country: " + result.country;
        collegeDetails.appendChild(country);

        const course = document.createElement("p");
        course.textContent = "Ranking: " + result.Ranking;
        collegeDetails.appendChild(course);

        const costOfLiving = document.createElement("p");
        costOfLiving.textContent = "Cost of Living: " + result.MincostOfLiving;
        collegeDetails.appendChild(costOfLiving);

        const campusLife = document.createElement("p");
        const campusLink = document.createElement("a");
        campusLink.href = result.link;
        campusLink.textContent = result.link;
        campusLink.target = "_blank";
        campusLink.style.textDecoration = "underline";
        campusLife.textContent = "College Link: ";
        campusLife.appendChild(campusLink);
        collegeDetails.appendChild(campusLife);

        const acceptanceRate = document.createElement("p");
        acceptanceRate.textContent = "Acceptance Rate: " + result["Acceptance rate"];
        acceptanceRate.style.visibility = "hidden";
        acceptanceRate.style.position = "absolute";
        collegeDetails.appendChild(acceptanceRate);

        const ieltsToefl = document.createElement("p");
        ieltsToefl.textContent = "IELTS/TOEFL: " + result.ielts;
        ieltsToefl.style.visibility = "hidden";
        ieltsToefl.style.position = "absolute";
        collegeDetails.appendChild(ieltsToefl);

        const greGmat = document.createElement("p");
        greGmat.textContent = "GRE/GMAT: " + result.gre;
        greGmat.style.visibility = "hidden";
        greGmat.style.position = "absolute";
        collegeDetails.appendChild(greGmat);

        const avgFees = document.createElement("p");
        avgFees.textContent = "Average Fees: " + result.Avgfees;
        avgFees.style.visibility = "hidden";
        avgFees.style.position = "absolute";
        collegeDetails.appendChild(avgFees);

        // GPA
        const gpa = document.createElement("p");
        greGmat.textContent = "GPA: " + result.GPA;
        greGmat.style.visibility = "hidden";
        greGmat.style.position = "absolute";
        collegeDetails.appendChild(gpa);

        const profileBtn = document.createElement("button");
        profileBtn.textContent = "Profile";
        profileBtn.addEventListener("click", function() {
            viewProfile(result.collegeName);
        });
        collegeDetails.appendChild(profileBtn);

        collegeProfile.appendChild(collegeDetails);
        resultsSection.appendChild(collegeProfile);

        performSort();
    });

// Function to highlight matching characters in a string
    function highlightMatchingText(text, searchTerm) {
        if (searchTerm && searchTerm.length > 0) {
            const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, "gi");
            return text.replace(regex, "<span class='highlight'>$1</span>");
        }
        return text;
    }
}

// Escape special characters in a string
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const sortBySelect = document.getElementById("sort-by-select");
const sortOrderSelect = document.getElementById("sort-order-select");
const sortBtn = document.getElementById("sort-btn");

sortBySelect.addEventListener("change", function() {
    const selectedValue = sortBySelect.value;
    if (selectedValue === "Any") {
        sortOrderSelect.disabled = true;
        sortBtn.disabled = true;
        sortBtn.classList.add("disabled"); // Add disabled class to style the button as greyed out
    } else {
        sortOrderSelect.disabled = false;
        sortBtn.disabled = false;
        sortBtn.classList.remove("disabled"); // Remove disabled class to restore the default button style
    }
});

window.addEventListener("load", function() {
    if (sortBySelect.value === "Any") {
        sortOrderSelect.disabled = true;
        sortBtn.disabled = true;
        sortBtn.classList.add("disabled"); // Add disabled class on page load if "Any" is selected by default
    }
});

sortBtn.addEventListener("click", function() {
    const sortOrder = document.getElementById("sort-order-select").value;
    if (sortOrder !== "Any") {
        performSort();
    }
});

// Perform the sort operation
function performSort() {
    const sortBy = document.getElementById("sort-by-select").value;
    const sortOrder = document.getElementById("sort-order-select").value;

    if (sortOrder === "Any") {
        return; // Exit the function without sorting
    }

    const resultsSection = document.getElementById("results");
    const collegeProfiles = Array.from(resultsSection.getElementsByClassName("college-profile"));

    collegeProfiles.sort(function(a, b) {
        const collegeA = a.getElementsByClassName("college-details")[0];
        const collegeB = b.getElementsByClassName("college-details")[0];

        const valueA = getValueToSortBy(collegeA, sortBy);
        const valueB = getValueToSortBy(collegeB, sortBy);

        if (sortOrder === "asc") {
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
        } else {
            if (valueA > valueB) return -1;
            if (valueA < valueB) return 1;
        }

        return 0;
    });

    // Rearrange the sorted college profiles in the results section
    collegeProfiles.forEach(function(collegeProfile) {
        resultsSection.appendChild(collegeProfile);
    });
}

// Get the value to sort by based on the selected field
function getValueToSortBy(college, field) {
    switch (field) {
        case "name":
            return college.querySelector("h3").textContent.toLowerCase();
        case "country":
            return college.querySelector("p:nth-child(2)").textContent.toLowerCase();
        case "cost-of-living":
            return parseFloat(college.querySelector("p:nth-child(4)").textContent.split(":")[1].trim());
        case "fees":
            return parseFloat(college.querySelector("p:nth-child(9)").textContent.split(":")[1].trim());
        case "ranking":
            return parseInt(college.querySelector("p:nth-child(3)").textContent.split(":")[1].trim());
        case "ielts-toefl":
            return parseFloat(college.querySelector("p:nth-child(7)").textContent.split(":")[1].trim());
        case "gre-gmat":
            return parseFloat(college.querySelector("p:nth-child(8)").textContent.split(":")[1].trim());
        case "acceptance-rate":
            return parseFloat(college.querySelector("p:nth-child(6)").textContent.split(":")[1].trim());
        default:
            return 0;
    }
}

// Event listener for the search button
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", searchbarsearch);

// Event listener for form submission
const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page refresh on form submission
    performFilteredSearch();
});


document.addEventListener('DOMContentLoaded', function() {
    var findCollegesBtn = document.getElementById('find-colleges-btn');
    findCollegesBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission if needed

        // Call the displaySearchResults function to show the results
        searchbarsearch();
    });

    var startupBtn = document.getElementById('startup-btn');
    startupBtn.addEventListener('click', function(event) {
        // Call the startup function
        startup();
    });
});

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchbarsearch();
    }
});
// Set the width of the search input
searchInput.style.width = '400px'; // Adjust the width as desired
