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

// JavaScript code
var feedbackItems = document.querySelectorAll('.feedback-item');
var currentIndex = 0;

function changeFeedback(direction) {
    feedbackItems[currentIndex].classList.remove('active');

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = feedbackItems.length - 1;
    } else if (currentIndex >= feedbackItems.length) {
        currentIndex = 0;
    }

    feedbackItems[currentIndex].classList.add('active');
}

// JavaScript code in your script.js file
document.addEventListener("DOMContentLoaded", function () {
    // Code for profile box functionality
    const profileButton = document.getElementById("profileButton");
    const profileBox = document.getElementById("profileBox");
    const signInButton = document.getElementById("signInButton");
    const registerButton = document.getElementById("registerButton");

    profileButton.addEventListener("click", function (event) {
        event.stopPropagation();
        if (profileBox.style.display === "block") {
            profileBox.style.display = "none";
        } else {
            profileBox.style.display = "block";
        }
    });

    document.addEventListener("click", function (event) {
        const targetElement = event.target;
        if (
            !profileBox.contains(targetElement) &&
            !profileButton.contains(targetElement)
        ) {
            profileBox.style.display = "none";
        }
    });

    signInButton.addEventListener("click", function () {
        // Handle sign-in functionality here
        window.location.href = "login.html";
    });

    registerButton.addEventListener("click", function () {
        // Handle register functionality here
        window.location.href = "register.html";
    });

    // Code for "Ask Anything" button
    const askButton = document.getElementById("askButton");


    window.addEventListener("scroll", () => {
        const scrollPosition =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
        const windowHeight =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight ||
            0;

        if (scrollPosition + windowHeight >= document.documentElement.scrollHeight) {
            askButton.classList.add("show");
        } else {
            askButton.classList.remove("show");
        }
    });

    askButton.addEventListener("click", () => {
        // Add your logic to handle the click event of the "Ask Anything" button
        // For example, you can open a small tab or modal for users to ask questions

    });

    // Code for chat functionality
    const chatContainer = document.getElementById("chat-container");
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");
    const chatSendButton = document.getElementById("chat-send-button");

    document.getElementById("askButton").addEventListener("click", function () {
        if (chatContainer.style.display === "none") {
            chatContainer.style.display = "block";

        }
        else {
            chatContainer.style.display = "none";
        }


    document.getElementById('chat-input').addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
            // Remove the example messages from the chat body
            const chatBody = document.getElementById('chat-body');
            const exampleMessages = chatBody.querySelectorAll('i');
            exampleMessages.forEach((message) => {
                chatBody.removeChild(message);
            });
        }
    });
    });


    document.getElementById('chat-send-button').addEventListener('click', async (e) => {
        e.preventDefault();

        const message = document.getElementById('chat-input').value;
        if (message.trim() !== '') {
            // Disable the send button while processing the message
            document.getElementById('chat-send-button').disabled = true;

            // Simulate a delay of 2 seconds before getting the search results
            setTimeout(async () => {
                const searchResults = await performWebSearch(message);

                // Check if search results are available
                if (searchResults.length > 0) {
                    // Get the top three search result links
                    const topResultLinks = searchResults.slice(0, 2).map((result) => result.link);

                    // Display the search results as links
                    displayMessage('You', message);
                    for (const link of topResultLinks) {
                        displayMessage('Expert', `<a href="${link}" target="_blank">${link}</a>`);
                    }
                } else {
                    displayMessage('You', message);
                    displayMessage('Expert', "I'm sorry, I couldn't find any relevant results for your search.");
                }

                // Clear the input field and enable the send button
                document.getElementById('chat-input').value = '';
                document.getElementById('chat-send-button').disabled = false;
            }, 2000); // Delay in milliseconds (2 seconds in this example)
        }
    });

    function displayMessage(sender, message) {
        const chatBody = document.getElementById('chat-body');
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.innerHTML = `<strong>${sender}: </strong>${message}`;
        chatBody.appendChild(newMessage);
    }

    async function performWebSearch(query) {
        const apiKey = ''; // Replace with your actual API key
        const searchEngineId = ''; // Replace with your actual search engine ID

        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                // Map the search results to an array of objects containing title, link, and description
                return data.items.map((item) => ({
                    title: item.title,
                    link: item.link,
                    description: item.snippet,
                }));
            }
        } catch (error) {
            console.error('Error performing web search:', error);
        }

        return [];
    }




});

