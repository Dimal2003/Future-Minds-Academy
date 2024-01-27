// Set default values before the user presses the "Search" button
document.querySelector("#photo").src = '';
document.querySelector("#description").textContent = '';
document.getElementById("resultContainer").classList.add("container-hidden"); // Hide the container

function searchNASA() {
    let date = document.querySelector("#dateInput").value;

    // Check if a date is provided
    if (!date) {
        alert("Please enter a valid date!");
        return;
    }

    // Set default values before fetching data
    document.querySelector("#photo").src = '';
    document.querySelector("#description").textContent = '';
    document.querySelector("#title").textContent = 'NASA Photo of the day';

    // Show the container
    document.getElementById("resultContainer").classList.remove("container-hidden");
    document.getElementById("initialBlockquote").style.display = "none";

    fetch(`https://api.nasa.gov/planetary/apod?api_key=grafNkB7l4dxpZEWMz0PGxMwkPp0bncHOy2bJ4zp&date=${date}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (data.media_type === 'image') {
                document.querySelector("#photo").src = data.hdurl;
                document.querySelector("#photo").alt = data.title; // Set alt text from API response
            } else if (data.media_type === 'video') {
                document.querySelector("#description").textContent = data.url; // Set the text content
                document.querySelector("#photo").src = '';
                document.querySelector("#photo").alt = "No photo available"; // Set default alt text for video
            } else {
                // No photo, create a blockquote
                const blockquote = document.createElement("blockquote");
                blockquote.textContent = "No photo available for this date.";
                document.querySelector("#description").appendChild(blockquote);
                document.querySelector("#photo").src = ''; // Clear the image
            }

            document.querySelector("#description").textContent = data.explanation;
            document.querySelector("#title").textContent = data.title; // Set title from API response
        })
        .catch(err => {
            console.log(`Error ${err}`);
        });
}

// Listen for Enter key press on the date input
document.querySelector("#dateInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        searchNASA();
    }
});
