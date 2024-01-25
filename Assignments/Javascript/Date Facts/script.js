document.getElementById('getFactsBtn').addEventListener('click', getFacts);
document.getElementById('dob').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        getFacts();
    }
});

async function getFacts() {
    const dobInput = document.getElementById('dob');
    const dob = dobInput.value;

    if (!dob) {
        alert('Please enter your Date of Birth');
        return;
    }

    const apiEndpoint = 'https://numbersapi.p.rapidapi.com';
    const apiKey = '7282d35071msh6f74caa30762132p19c79ejsnfec45915743c';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
        }
    };

    try {
        const responseArray = await Promise.all([
            fetchData(`${apiEndpoint}/${getMonthDay(dob)}/date?fragment=true&json=true`, options),
            fetchData(`${apiEndpoint}/${getMonthDay(dob, -1)}/date?fragment=true&json=true`, options),
            fetchData(`${apiEndpoint}/${getMonthDay(dob, 1)}/date?fragment=true&json=true`, options)
        ]);

        displayFacts(responseArray);
    } catch (error) {
        console.error(error);
        alert('An error occurred while fetching data.');
    }
}

async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return { text: 'Error fetching data' };
    }
}

function getMonthDay(date, offset = 0) {
    const [year, month, day] = date.split('-');
    const adjustedDate = new Date(year, month - 1, day);
    adjustedDate.setMonth(adjustedDate.getMonth() + offset);
    const adjustedMonth = adjustedDate.getMonth() + 1; // Months are zero-indexed
    const adjustedDay = adjustedDate.getDate();
    return `${adjustedMonth}/${adjustedDay}`;
}

function displayFacts(facts) {
    const factContainer = document.getElementById('factContainer');
    factContainer.innerHTML = '';

    facts.forEach((fact, index) => {
        const factDiv = document.createElement('div');
        factDiv.classList.add('fact');
        const factText = fact.text || 'No information available for this date';
        factDiv.innerHTML = `<p>Fact ${index + 1}: ${factText}</p>`;
        factContainer.appendChild(factDiv);
    });
}
