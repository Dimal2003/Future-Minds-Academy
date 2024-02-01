function changeBackgroundColor() {
    let root = document.documentElement;

    let currentBgColor = getComputedStyle(root).getPropertyValue('--bg-color').trim();

    if (currentBgColor === 'white') {
        root.style.setProperty('--bg-color', 'black');
        root.style.setProperty('--text-color', 'white');
        localStorage.setItem('theme', 'dark');
    } else {
        root.style.setProperty('--bg-color', 'white');
        root.style.setProperty('--text-color', 'black');
        localStorage.setItem('theme', 'light');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    let savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        changeBackgroundColor(); 
    }
});