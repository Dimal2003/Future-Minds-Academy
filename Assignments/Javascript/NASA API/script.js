document.querySelector("button").addEventListener("click", () => {
    let date = document.querySelector("input").value;

    fetch(`https://api.nasa.gov/planetary/apod?api_key=grafNkB7l4dxpZEWMz0PGxMwkPp0bncHOy2bJ4zp&date=${date}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.media_type === 'image') {
                document.querySelector("img").src = data.hdurl;
                document.querySelector("p").textContent = ''; // Clear the text content
            } else if (data.media_type === 'video') {
                document.querySelector("p").textContent = data.url; // Set the text content
                document.querySelector("img").src = '';
            }
            document.querySelector("p").textContent = data.explanation;
        })
        .catch(err => {
            console.log(`Error ${err}`);
        })
});
