// app.js - versione senza login

let currentUser = 'admin'; // utente di default
let timbrature = JSON.parse(localStorage.getItem('timbrature')) || {};

// Se non ci sono dati per l'utente, inizializza
if(!timbrature[currentUser]) timbrature[currentUser] = [];

// Mostra direttamente dashboard
document.getElementById('login-section').style.display = 'none';
document.getElementById('dashboard').style.display = 'block';
document.getElementById('current-user').textContent = currentUser;

renderCalendar();
renderChart();
updateGPSInfo();

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

// Logout rimane solo per resettare l'utente (opzionale)
document.getElementById('logout-btn').addEventListener('click', () => {
    location.reload(); // ricarica la pagina
});