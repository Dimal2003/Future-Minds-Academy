var startTime;
var stopwatchInterval;
var elapsedPausedTime = 0;
var laps = [];
var lapNumber = 1;

function startStopwatch() {
    if (!stopwatchInterval) {
        startTime = new Date().getTime() - elapsedPausedTime;
        stopwatchInterval = setInterval(updateStopwatch, 10);
        document.getElementById('start').style.display = 'none';
        document.getElementById('stop').style.display = 'inline-block';
        document.getElementById('reset').style.display = 'none';
    }
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    elapsedPausedTime = new Date().getTime() - startTime;
    stopwatchInterval = null;
    document.getElementById('start').style.display = 'none';
    document.getElementById('stop').style.display = 'none';
    document.getElementById('reset').style.display = 'inline-block';
}

function lap() {
    const lapTime = calculateElapsedTime();
    const totalTime = new Date().getTime() - startTime;
    laps.push({
        lapNumber: lapNumber,
        splitTime: formatTime(lapTime),
        totalTime: formatTime(totalTime),
    });
    displayLaps();
    lapNumber++;
}

function reset() {
    clearInterval(stopwatchInterval);
    startTime = null;
    laps = [];
    lapNumber = 1;
    document.getElementById('stopwatch').innerText = '00:00.00';
    document.getElementById('start').style.display = 'inline-block';
    document.getElementById('stop').style.display = 'none';
    document.getElementById('reset').style.display = 'none';
    document.querySelector('#laps tbody').innerHTML = '';
}

function updateStopwatch() {
    const elapsedTime = calculateElapsedTime();
    document.getElementById('stopwatch').innerText = formatTime(elapsedTime);
}

function calculateElapsedTime() {
    return new Date().getTime() - startTime;
}

function formatTime(time) {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0') +
        '.' +
        String(milliseconds).padStart(2, '0')
    );
}

function displayLaps() {
    const lapsTableBody = document.querySelector('#laps tbody');
    const lastLap = laps[laps.length - 1];

    const lapRow = document.createElement('tr');
    lapRow.innerHTML = `
        <td>${lastLap.lapNumber}</td>
        <td>${lastLap.splitTime}</td>
        <td>${lastLap.totalTime}</td>
      `;

    lapsTableBody.appendChild(lapRow);
}
