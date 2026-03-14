// app.js - gestione login, dashboard, timbrature e GPS

let currentUser = null;
let users = [];
let timbrature = JSON.parse(localStorage.getItem('timbrature')) || {};

async function loadUsers() {
    const response = await fetch('data/users.json');
    users = await response.json();
}

function showDashboard() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('current-user').textContent = currentUser;
    renderCalendar();
    renderChart();
    updateGPSInfo();
}

document.getElementById('login-form').addEventListener('submit', async e => {
    e.preventDefault();
    await loadUsers();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if(user){
        currentUser = username;
        if(!timbrature[currentUser]) timbrature[currentUser] = [];
        showDashboard();
    } else {
        document.getElementById('login-error').textContent = 'Credenziali non valide';
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    currentUser = null;
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
});

// Backup automatico
document.getElementById('backup-btn').addEventListener('click', () => {
    localStorage.setItem('timbrature', JSON.stringify(timbrature));
    alert('Dati salvati localmente!');
});

// Export PDF/Excel semplice
document.getElementById('export-btn').addEventListener('click', () => {
    const data = timbrature[currentUser] || [];
    let csv = 'Data,Entrata,Uscita,Lat,Lon\n';
    data.forEach(t => {
        csv += `${t.date},${t.start || ''},${t.end || ''},${t.lat || ''},${t.lon || ''}\n`;
    });
    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timbrature.csv';
    a.click();
    URL.revokeObjectURL(url);
});

// GPS timbratura
function updateGPSInfo() {
    const info = document.getElementById('gps-info');
    info.textContent = 'Non ancora timbrato';
}

function addTimbratura(date, type) {
    if(!timbrature[currentUser]) timbrature[currentUser] = [];
    let entry = timbrature[currentUser].find(t => t.date === date);
    if(!entry){
        entry = {date};
        timbrature[currentUser].push(entry);
    }
    if(type === 'start') entry.start = new Date().toLocaleTimeString();
    if(type === 'end') entry.end = new Date().toLocaleTimeString();

    // GPS
    navigator.geolocation.getCurrentPosition(pos => {
        entry.lat = pos.coords.latitude.toFixed(5);
        entry.lon = pos.coords.longitude.toFixed(5);
        document.getElementById('gps-info').textContent = `Ultima timbratura GPS: ${entry.lat}, ${entry.lon}`;
        renderChart();
    }, err => {
        console.warn('GPS non disponibile');
    });

    localStorage.setItem('timbrature', JSON.stringify(timbrature));
    renderCalendar();
}