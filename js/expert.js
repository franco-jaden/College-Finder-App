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
fetch("../json/test.json")
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

    searchResults.forEach(function(result) {
        const collegeProfile = document.createElement("div");
        collegeProfile.className = "college-profile";

        const collegePicture = document.createElement("img");
        collegePicture.className = "college-picture";
        collegePicture.src = result.picture;
        collegeProfile.appendChild(collegePicture);

        const collegeDetails = document.createElement("div");
        collegeDetails.className = "college-details";

        const collegeName = document.createElement("h3");
        collegeName.textContent = result.collegeName;
        collegeDetails.appendChild(collegeName);

        const country = document.createElement("p");
        country.textContent = "Country: " + result.country;
        collegeDetails.appendChild(country);

        const course = document.createElement("p");
        course.textContent = "Ranking: " + result.Ranking;
        collegeDetails.appendChild(course);

        const costOfLiving = document.createElement("p");
        costOfLiving.textContent = "Cost of Living: " + result.AvgcostOfLiving;
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
        ieltsToefl.textContent = "IELTS/TOEFL: " + result["ielts/toefl"];
        ieltsToefl.style.visibility = "hidden";
        ieltsToefl.style.position = "absolute";
        collegeDetails.appendChild(ieltsToefl);

        const greGmat = document.createElement("p");
        greGmat.textContent = "GRE/GMAT: " + result["gre/gmat"];
        greGmat.style.visibility = "hidden";
        greGmat.style.position = "absolute";
        collegeDetails.appendChild(greGmat);

        const avgFees = document.createElement("p");
        avgFees.textContent = "Average Fees: " + result.Avgfees;
        avgFees.style.visibility = "hidden";
        avgFees.style.position = "absolute";
        collegeDetails.appendChild(avgFees);

        const viewTeachersBtn = document.createElement("button");
        viewTeachersBtn.textContent = "View Teachers";
        viewTeachersBtn.addEventListener("click", function() {
            viewTeachers(result.collegeName);
        });
        collegeDetails.appendChild(viewTeachersBtn);

        const viewStudentsBtn = document.createElement("button");
        viewStudentsBtn.textContent = "View Former Students";
        viewStudentsBtn.addEventListener("click", function() {
            viewFormerStudents(result.collegeName);
        });
        collegeDetails.appendChild(viewStudentsBtn);

        collegeProfile.appendChild(collegeDetails);
        resultsSection.appendChild(collegeProfile);
    });
}

async function viewTeachers(collegeName) {
    const teachersSection = document.createElement("section");
    teachersSection.innerHTML = "<h2>Teachers at " + collegeName + "</h2>";

    try {
        const response = await fetch("../json/teachers.json");
        const teachersData = await response.json();

        const selectedCollege = teachersData.find(function (college) {
            return college.collegeName === collegeName;
        });

        if (selectedCollege) {
            selectedCollege.teacherProfiles.forEach(function (teacher) {
                const teacherProfile = document.createElement("div");
                teacherProfile.className = "profile";

                const profileImg = document.createElement("img");
                profileImg.className = "profile-img";
                profileImg.src = teacher.profilePhoto;
                teacherProfile.appendChild(profileImg);

                const profileDetails = document.createElement("div");
                profileDetails.innerHTML = "<h3>" + teacher.name + "</h3>" +
                    "<p>Subject: " + teacher.subject + "</p>" +
                    "<p>Email: " + teacher.email + "</p>" +
                    "<p>Experience: " + teacher.experience + "</p>";

                const viewProfileBtn = document.createElement("button");
                viewProfileBtn.textContent = "View Profile";
                viewProfileBtn.addEventListener("click", function () {
                    viewP(teacher, collegeName);
                });
                profileDetails.appendChild(viewProfileBtn);

                const chatBtn = document.createElement("button");
                chatBtn.textContent = "Chat";
                chatBtn.addEventListener("click", function () {
                    chatWith(teacher.name, collegeName, "teach", teacher.profilePhoto);
                });
                profileDetails.appendChild(chatBtn);

                teacherProfile.appendChild(profileDetails);

                teachersSection.appendChild(teacherProfile);
            });
        }
    } catch (error) {
        console.log("Error retrieving teacher data:", error);
    }

    const resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";
    resultsSection.appendChild(teachersSection);

    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.addEventListener("click", function () {
        searchbarsearch();
    });
    resultsSection.appendChild(backButton);
}

async function viewFormerStudents(collegeName) {
    const studentsSection = document.createElement("section");
    studentsSection.innerHTML = "<h2>Former Students of " + collegeName + "</h2>";

    try {
        const response = await fetch("../json/exstudents.json");
        const formerStudentsData = await response.json();

        const selectedCollege = formerStudentsData.find(function (college) {
            return college.collegeName === collegeName;
        });

        if (selectedCollege) {
            selectedCollege.studentProfiles.forEach(function (student) {
                const studentProfile = document.createElement("div");
                studentProfile.className = "profile";

                const profileImg = document.createElement("img");
                profileImg.className = "profile-img";
                profileImg.src = student.profilePhoto;
                studentProfile.appendChild(profileImg);

                const profileDetails = document.createElement("div");
                profileDetails.innerHTML = "<h3>" + student.name + "</h3>" +
                    "<p>Course: " + student.course + "</p>" +
                    "<p>Graduation Year: " + student.graduationYear + "</p>";

                const viewProfileBtn = document.createElement("button");
                viewProfileBtn.textContent = "View Profile";
                viewProfileBtn.addEventListener("click", function () {
                    viewP(student, collegeName);
                });
                profileDetails.appendChild(viewProfileBtn);

                const chatBtn = document.createElement("button");
                chatBtn.textContent = "Chat";
                chatBtn.addEventListener("click", function () {
                    chatWith(student.name, collegeName, "study", student.profilePhoto);
                });
                profileDetails.appendChild(chatBtn);

                studentProfile.appendChild(profileDetails);

                studentsSection.appendChild(studentProfile);
            });
        }
    } catch (error) {
        console.log("Error retrieving former students data:", error);
    }

    const resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";
    resultsSection.appendChild(studentsSection);

    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.addEventListener("click", function () {
        searchbarsearch();
    });
    resultsSection.appendChild(backButton);
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
        const collegeName = result.collegeName.toLowerCase();
        return (
            (country === "Any" || result.country === country) &&
            result.AvgcostOfLiving >= costOfLivingMin &&
            result.AvgcostOfLiving <= costOfLivingMax &&
            parseFloat(result["Acceptance rate"]) >= acceptanceRateMin &&
            parseFloat(result["Acceptance rate"]) <= acceptanceRateMax &&
            parseFloat(result["ielts/toefl"]) >= ieltsToeflMin &&
            parseFloat(result["ielts/toefl"]) <= ieltsToeflMax &&
            parseFloat(result["gre/gmat"]) >= greGmatMin &&
            parseFloat(result["gre/gmat"]) <= greGmatMax &&
            result.Avgfees >= feesMin &&
            result.Avgfees <= feesMax &&
            result.Ranking >= rankingMin &&
            result.Ranking <= rankingMax &&
            collegeName.includes(searchInput)
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
        costOfLiving.textContent = "Cost of Living: " + result.AvgcostOfLiving;
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
        ieltsToefl.textContent = "IELTS/TOEFL: " + result["ielts/toefl"];
        ieltsToefl.style.visibility = "hidden";
        ieltsToefl.style.position = "absolute";
        collegeDetails.appendChild(ieltsToefl);

        const greGmat = document.createElement("p");
        greGmat.textContent = "GRE/GMAT: " + result["gre/gmat"];
        greGmat.style.visibility = "hidden";
        greGmat.style.position = "absolute";
        collegeDetails.appendChild(greGmat);

        const avgFees = document.createElement("p");
        avgFees.textContent = "Average Fees: " + result.Avgfees;
        avgFees.style.visibility = "hidden";
        avgFees.style.position = "absolute";
        collegeDetails.appendChild(avgFees);

        const viewTeachersBtn = document.createElement("button");
        viewTeachersBtn.textContent = "View Teachers";
        viewTeachersBtn.addEventListener("click", function() {
            viewTeachers(result.collegeName);
        });
        collegeDetails.appendChild(viewTeachersBtn);

        const viewStudentsBtn = document.createElement("button");
        viewStudentsBtn.textContent = "View Former Students";
        viewStudentsBtn.addEventListener("click", function() {
            viewFormerStudents(result.collegeName);
        });
        collegeDetails.appendChild(viewStudentsBtn);

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

// Function to view a person's profile
function viewP(person, collegeName) {
    const profileSection = document.createElement("section");
    profileSection.innerHTML = "<h2>Profile</h2>";

    const profileContainer = document.createElement("div");
    profileContainer.className = "profile";

    const profileImg = document.createElement("img");
    profileImg.className = "profile-img";
    profileImg.src = person.profilePhoto;
    profileContainer.appendChild(profileImg);

    const profileDetails = document.createElement("div");
    profileDetails.className = "profile-details";
    profileContainer.appendChild(profileDetails);

    const profileName = document.createElement("h3");
    profileName.textContent = person.name;
    profileDetails.appendChild(profileName);

    if (person.subject) {
        // Teacher layout
        const subject = document.createElement("p");
        subject.textContent = "Subject: " + person.subject;
        profileDetails.appendChild(subject);

        const email = document.createElement("p");
        email.textContent = "Email: " + person.email;
        profileDetails.appendChild(email);

        const experience = document.createElement("p");
        experience.textContent = "Experience: " + person.experience;
        profileDetails.appendChild(experience);
    } else {
        // Student layout
        const course = document.createElement("p");
        course.textContent = "Course: " + person.course;
        profileDetails.appendChild(course);

        const graduationYear = document.createElement("p");
        graduationYear.textContent = "Graduation Year: " + person.graduationYear;
        profileDetails.appendChild(graduationYear);
    }

    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.addEventListener("click", function() {
        if (person.subject) {
            viewTeachers(collegeName);
        } else {
            viewFormerStudents(collegeName);
        }
    });
    profileDetails.appendChild(backButton);

    const chatBtn = document.createElement("button");
    chatBtn.textContent = "Chat";
    chatBtn.addEventListener("click", function () {

        if (person.subject) {
            chatWith(person.name, collegeName, "teach", person.profilePhoto);
        } else {
            chatWith(person.name, collegeName, "study", person.profilePhoto);
        }
    });
    profileDetails.appendChild(chatBtn);

    profileSection.appendChild(profileContainer);

    const resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";
    resultsSection.appendChild(profileSection);

    const ExperienceSection = document.createElement("section");
    ExperienceSection.innerHTML = "<h2>My Experience</h2>";

// Determine the file path based on the person's role (teacher or student)
    const filePath = person.subject ? "../essay/teach.html" : "../essay/stud.html";

// Load the experience text from an HTML file
    fetch(filePath)
        .then(response => response.text())
        .then(htmlText => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(htmlText, 'text/html');

            const essayContent = htmlDocument.querySelector('body').innerHTML;

            // Replace [College Name] with the actual college name
            const modifiedEssayContent = essayContent.replace(/\[College Name\]/g, collegeName);

            // Replace [Name] with the actual student name
            const modifiedEssayContentWithName = modifiedEssayContent.replace(/\[Name\]/g, person.name);

            const paragraphElements = modifiedEssayContentWithName.split('<br>').map(text => {
                const paragraph = document.createElement('p');
                paragraph.innerHTML = text.trim();
                return paragraph;
            });

            paragraphElements.forEach(paragraph => {
                ExperienceSection.appendChild(paragraph);
            });
        })
        .catch(error => {
            console.log('Error loading experience:', error);
        });

    resultsSection.appendChild(ExperienceSection);

}

// Function to initiate a chat with a person
function chatWith(personName, collegeName, role, photo) {
    // Placeholder code for chat initiation
    const chatSection = document.createElement("section");
    chatSection.style.width = "800px"; // or any other value
    chatSection.style.margin = "0 auto"; // center horizontally

    const chatHeader = document.createElement("div");
    chatHeader.className = "chat-header";
    chatHeader.style.display = "flex";
    chatHeader.style.alignItems = "center";

    const profileImg = document.createElement("img");
    profileImg.className = "chat-profile-img"; // Use a different class name
    profileImg.src = photo; // Replace with the function to get the profile photo
    chatHeader.appendChild(profileImg);

    const chatTitle = document.createElement("h2");
    chatTitle.textContent = personName;
    chatTitle.style.margin = "0"; // Reset default margin to ensure proper alignment
    chatHeader.appendChild(chatTitle);

    chatSection.appendChild(chatHeader);

    const chatMessages = document.createElement("div");
    chatMessages.className = "chat-messages";

    const sendMessageForm = document.createElement("form");
    sendMessageForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const messageInput = event.target.querySelector("input[type='text']");
        const message = messageInput.value;
        sendMessage(personName, message);
        messageInput.value = "";
    });

    const messageInput = document.createElement("input");
    messageInput.type = "text";
    messageInput.placeholder = "Type your message here...";
    messageInput.style.marginBottom = "10px"; // Add spacing between input and buttons
    messageInput.style.display = "block"; // Make the input element a block-level element
    messageInput.style.margin = "auto"; // Center the input element horizontally
    messageInput.style.width = "80%"; // Increase the width of the input box
    messageInput.style.padding = "10px"; // Add padding for a more comfortable input area
    messageInput.style.borderRadius = "10px"; // Apply rounded corners to the input box
    sendMessageForm.appendChild(messageInput);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.gap = "10px"; // Increase spacing between buttons
    buttonsContainer.style.width = "300px"; // or any other value
    buttonsContainer.style.margin = "0 auto"; // center horizontally
    buttonsContainer.style.marginTop = "10px";

    const sendButton = document.createElement("button");
    sendButton.textContent = "Send";
    sendButton.style.padding = "10px 20px"; // Increase button size
    buttonsContainer.appendChild(sendButton);


    const attachButton = document.createElement("button");
    attachButton.textContent = "Attach files";
    attachButton.style.padding = "10px 20px"; // Increase button size
    buttonsContainer.appendChild(attachButton);

    attachButton.addEventListener("click", function(event) {
        event.preventDefault();
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".txt, .html, .js, .json, .zip, .rar, .exe, image/*, audio/*, video/*"; // Specify the accepted file types
        fileInput.style.display = "none";

        fileInput.addEventListener("change", function(event) {
            const file = event.target.files[0];
            if (file) {
                sendAttachment(personName, file);
            }
        });

        fileInput.click();
    });


    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.className = "back-button";
    backButton.style.padding = "10px 20px"; // Increase button size
    backButton.addEventListener("click", function(event) {
        event.preventDefault();
        if (role === "teach") {
            viewTeachers(collegeName);
        } else {
            viewFormerStudents(collegeName);
        }
    });
    buttonsContainer.appendChild(backButton);

    sendMessageForm.appendChild(buttonsContainer);

    const resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";
    resultsSection.appendChild(chatSection);
    chatSection.appendChild(chatMessages);
    chatSection.appendChild(sendMessageForm);
}

function sendAttachment(personName, attachment) {
    const chatMessages = document.querySelector(".chat-messages");
    const newMessageContainer = document.createElement("div");
    newMessageContainer.className = "message-container";
    newMessageContainer.style.justifyContent = "flex-end"; // Align the container to the right

    const attachmentElement = document.createElement("div");
    attachmentElement.className = "attachment";

    let attachmentElementContent;

    if (attachment.type.includes("image")) {
        const imageAttachment = document.createElement("img");
        imageAttachment.style.maxWidth = "100%";
        imageAttachment.style.borderRadius = "10px";
        imageAttachment.style.marginLeft = "auto"; // Align to the right
        imageAttachment.style.marginRight = "0";
        attachmentElementContent = imageAttachment;

        // Limit image size to a maximum width and height
        const maxImageWidth = 300;
        const maxImageHeight = 300;

        const image = new Image();
        image.src = URL.createObjectURL(attachment);
        image.onload = function() {
            const width = image.width;
            const height = image.height;
            let newWidth = width;
            let newHeight = height;

            if (width > maxImageWidth) {
                newWidth = maxImageWidth;
                newHeight = (newWidth * height) / width;
            }

            if (newHeight > maxImageHeight) {
                newHeight = maxImageHeight;
                newWidth = (newHeight * width) / height;
            }

            imageAttachment.style.width = newWidth + "px";
            imageAttachment.style.height = newHeight + "px";
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };
    } else if (attachment.type.includes("audio")) {
        const audioAttachment = document.createElement("audio");
        audioAttachment.controls = true;
        audioAttachment.style.marginLeft = "auto"; // Align to the right
        audioAttachment.style.marginRight = "0";
        attachmentElementContent = audioAttachment;
    } else if (attachment.type.includes("video")) {
        const videoAttachment = document.createElement("video");
        videoAttachment.controls = true;
        videoAttachment.style.maxWidth = "100%";
        videoAttachment.style.borderRadius = "10px";
        videoAttachment.style.marginLeft = "auto"; // Align to the right
        videoAttachment.style.marginRight = "0";
        attachmentElementContent = videoAttachment;

        // Limit video size to a maximum width and height
        const maxVideoWidth = 600;
        const maxVideoHeight = 300;

        const video = document.createElement("video");
        video.src = URL.createObjectURL(attachment);
        video.onloadedmetadata = function() {
            const width = video.videoWidth;
            const height = video.videoHeight;
            let newWidth = width;
            let newHeight = height;

            if (width > maxVideoWidth) {
                newWidth = maxVideoWidth;
                newHeight = (newWidth * height) / width;
            }

            if (newHeight > maxVideoHeight) {
                newHeight = maxVideoHeight;
                newWidth = (newHeight * width) / height;
            }

            videoAttachment.style.width = newWidth + "px";
            videoAttachment.style.height = newHeight + "px";
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };
    } else {
        const genericAttachment = document.createElement("a");
        genericAttachment.href = URL.createObjectURL(attachment);
        //genericAttachment.textContent = "Attachment";
        genericAttachment.innerHTML = `Download File (`+ formatFileSize(attachment.size) +`)<br>(${attachment.type.toUpperCase()})`;
        genericAttachment.style.marginLeft = "auto"; // Align to the right
        genericAttachment.style.marginRight = "0";
        attachmentElementContent = genericAttachment;
    }
    /*
    const genericAttachment = document.createElement("p");
      const genericAttachmentlink = document.createElement("a");

      genericAttachmentlink.href = URL.createObjectURL(attachment);
      //genericAttachment.textContent = "Attachment";
      genericAttachmentlink.textContent = `Attachment (`+ formatFileSize(attachment.size) +`)<br>(${attachment.type.toUpperCase()})`;
      genericAttachmentlink.style.marginLeft = "auto"; // Align to the right
      genericAttachmentlink.style.marginRight = "0";
      genericAttachmentlink.style.textDecoration = "underline";

      genericAttachment.textContent = "Download : <br>";
      genericAttachment.appendChild(genericAttachmentlink);
      attachmentElementContent = genericAttachment;
    */

    // Function to format the file size
    function formatFileSize(size) {
        const units = ["B", "KB", "MB", "GB"];
        let index = 0;
        while (size >= 1024 && index < units.length - 1) {
            size /= 1024;
            index++;
        }
        return size.toFixed(1) + units[index];
    }

    attachmentElement.appendChild(attachmentElementContent);
    const newMessageContent = document.createElement("div");
    newMessageContent.className = "message-content";

    const timeSent = document.createElement("div");
    timeSent.className = "time-sent";
    timeSent.textContent = getTimeStamp();

    const newMessage = document.createElement("div");
    newMessage.className = "message message-sent";
    newMessage.appendChild(attachmentElement);
    newMessage.appendChild(timeSent);
    newMessage.style.marginLeft = "auto"; // add this line
    newMessage.style.marginRight = "0"; // add this line
    newMessageContainer.appendChild(newMessage);

    chatMessages.appendChild(newMessageContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Read and display the attachment
    const reader = new FileReader();
    reader.onload = function(event) {
        if (attachmentElementContent instanceof HTMLImageElement) {
            attachmentElementContent.src = event.target.result;
        } else if (attachmentElementContent instanceof HTMLAudioElement || attachmentElementContent instanceof HTMLVideoElement) {
            attachmentElementContent.src = event.target.result;
        }
    };
    reader.readAsDataURL(attachment);

    // Generate an automated response
    setTimeout(function() {
        const automatedResponseContainer = document.createElement("div");
        automatedResponseContainer.className = "message-container";

        const automatedResponseContent = document.createElement("div");
        automatedResponseContent.className = "message-content";
        automatedResponseContent.textContent = personName + " : " + getAutomatedResponse(personName);

        const timeSent = document.createElement("div");
        timeSent.className = "time-sent";
        timeSent.textContent = getTimeStamp();

        const automatedResponse = document.createElement("div");
        automatedResponse.className = "message message-received";
        automatedResponse.appendChild(automatedResponseContent);
        automatedResponse.appendChild(timeSent);

        automatedResponseContainer.appendChild(automatedResponse);

        chatMessages.appendChild(automatedResponseContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}



// Array to store the used responses
let usedResponses = [];
let usedSachinResponses = [];

function sendMessage(personName, message) {
    // Placeholder code to send a message to the person
    const chatMessages = document.querySelector(".chat-messages");
    const newMessageContainer = document.createElement("div");
    newMessageContainer.className = "message-container";

    const newMessageContent = document.createElement("div");
    newMessageContent.className = "message-content";
    newMessageContent.textContent = "You : " + message;

    const timeSent = document.createElement("div");
    timeSent.className = "time-sent";
    timeSent.textContent = getTimeStamp();

    const newMessage = document.createElement("div");
    newMessage.className = "message message-sent";
    newMessage.appendChild(newMessageContent);
    newMessage.appendChild(timeSent);
    newMessage.style.marginLeft = "auto"; // add this line
    newMessage.style.marginRight = "0"; // add this line
    newMessageContainer.appendChild(newMessage);

    chatMessages.appendChild(newMessageContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Generate an automated response
    setTimeout(function() {
        const automatedResponseContainer = document.createElement("div");
        automatedResponseContainer.className = "message-container";

        const automatedResponseContent = document.createElement("div");
        automatedResponseContent.className = "message-content";
        automatedResponseContent.textContent = personName + " : " + getAutomatedResponse(personName);

        const timeSent = document.createElement("div");
        timeSent.className = "time-sent";
        timeSent.textContent = getTimeStamp();

        const automatedResponse = document.createElement("div");
        automatedResponse.className = "message message-received";
        automatedResponse.appendChild(automatedResponseContent);
        automatedResponse.appendChild(timeSent);

        automatedResponseContainer.appendChild(automatedResponse);

        chatMessages.appendChild(automatedResponseContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}
/*
function getTimeStamp() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return formattedHours + ":" + formattedMinutes + " " + ampm;
}
*/
function getTimeStamp() {
    const now = new Date();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = daysOfWeek[now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return day + " " + formattedHours + ":" + formattedMinutes + " " + ampm;
}



// Function to get a random automated response
function getAutomatedResponse(personName) {
    const responses = [
        "I'm sorry, I don't have that information.",
        "That sounds interesting. Tell me more.",
        "I agree with you.",
        "I'm not sure about that.",
        "How can I assist you further?",
        "Have you tried turning it off and on again?",
        "What is your favorite hobby?",
        "Tell me about your day.",
        "I'm glad we're having this conversation.",
        "I'm here to help!",
        "That's a good point.",
        "I'll look into it.",
        "Let me check on that for you.",
        "I appreciate your feedback.",
        "That's worth considering.",
        "I'm afraid I can't answer that at the moment.",
        "I'm always learning, thanks for sharing.",
        "Interesting, tell me more about it.",
        "I'm not quite sure what you mean. Can you please clarify?",
        "I'm sorry if I'm not being helpful. Is there something else I can assist you with?",
        "I'm happy to assist you with any other questions you may have.",
        "That's intriguing. Can you elaborate on that?",
        "I'm not familiar with that. Could you provide more context?",
        "It's great to see your enthusiasm.",
        "I'm here to make your experience better.",
        "Thanks for bringing that to my attention.",
        "I'm constantly learning from interactions like these.",
        "Your feedback is valuable. Thank you.",
        "Let me find the best solution for you.",
        "I'm here to provide the support you need.",
        "Your question has piqued my interest.",
        "I'll do my best to assist you.",
        "I appreciate your patience while I find the answer.",
        "That's a unique perspective.",
        "I'll make a note of that.",
        "I can understand why you feel that way.",
        "Let's find the right solution together.",
        "Your input is valuable to me.",
        "I'm dedicated to providing quality assistance.",
    ];


    const sachin = [
        "Cigarette de",
        "One vs All",
        "Kataar me khada ho jaa",
        "Muje itni kam rating kyu?",
        "Crypto buy karo",
        "VJTI alumni hoo",
        "EMI bharna hai",
        "Daaru kidar hai?",
        "Oye Hasmukh",
        "Jo faculty lenient hai uski lagate ho tumlog",
        "Mera red pen kisne churaya ?",
        "Faculty khana kabh khayenge ?",
        "5 min ke baad aao",
        "khud check karlo",
        "mera red pen kidhar hai",
        "Faculty vs Faculty",
        "tereko bahut jaldi hoti hai",
        "Google chori karna aur chori chupana dono sikhata hai",
        "Abhi lunch break hai. Baad me aao",
        "Attendance likh de sheet pe",
        "Abhi time hogaya. Kal aao"
    ];

    // Check if all responses have been used
    if (usedResponses.length === responses.length) {
        usedResponses = []; // Reset used responses
    }

    // Check if all responses have been used
    if ( usedSachinResponses.length === sachin.length) {
        usedSachinResponses = []; // Reset used responses for "sachin"
    }

    let randomResponse;
    if (personName === "Sachin More") {
        do {
            randomResponse = sachin[Math.floor(Math.random() * sachin.length)];
        } while (usedSachinResponses.includes(randomResponse));
        usedSachinResponses.push(randomResponse); // Add the used response to the "sachin" array
    } else {
        do {
            randomResponse = responses[Math.floor(Math.random() * responses.length)];
        } while (usedResponses.includes(randomResponse));
        usedResponses.push(randomResponse); // Add the used response to the "responses" array
    }

    return randomResponse;
}

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
