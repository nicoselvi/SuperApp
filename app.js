// app.js - versione avanzata timbratore
let currentUser = 'admin';
let timbrature = JSON.parse(localStorage.getItem('timbrature')) || {};
if(!timbrature[currentUser]) timbrature[currentUser] = [];

document.getElementById('dashboard').style.display = 'block';
renderCalendar();
renderChart();
updateGPSInfo();

// TIMBRA ENTRATA
document.getElementById('start-btn').addEventListener('click', () => {
    addTimbratura(new Date().toISOString().split('T')[0], 'start');
});

// TIMBRA USCITA
document.getElementById('end-btn').addEventListener('click', () => {
    addTimbratura(new Date().toISOString().split('T')[0], 'end');
});

// Backup automatico
document.getElementById('backup-btn').addEventListener('click', () => {
    localStorage.setItem('timbrature', JSON.stringify(timbrature));
    alert('Dati salvati localmente!');
});

// Export CSV + PDF con grafico incluso
document.getElementById('export-btn').addEventListener('click', async () => {
    const data = timbrature[currentUser] || [];

    // --- CSV come prima ---
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

    // --- PDF con grafico ---
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF('p', 'mm', 'a4');

    // Titolo
    pdf.setFontSize(18);
    pdf.text(`Timbrature utente: ${currentUser}`, 14, 20);

    // Tabella timbrature
    pdf.setFontSize(12);
    let startY = 30;
    pdf.text('Data | Entrata | Uscita | Lat | Lon', 14, startY);
    startY += 7;
    data.forEach(t => {
        pdf.text(`${t.date} | ${t.start || ''} | ${t.end || ''} | ${t.lat || ''} | ${t.lon || ''}`, 14, startY);
        startY += 7;
    });

    // Cattura grafico con html2canvas
    const canvas = await html2canvas(document.getElementById('hoursChart'));
    const imgData = canvas.toDataURL('image/png');
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text('Grafico Ore Lavorate', 14, 20);
    pdf.addImage(imgData, 'PNG', 15, 30, 180, 100);

    pdf.save(`timbrature_${currentUser}.pdf`);
});

// GPS e timbratura
function updateGPSInfo() {
    const info = document.getElementById('gps-info');
    info.textContent = 'GPS non ancora acquisito';
}

function addTimbratura(date, type) {
    if(!timbrature[currentUser]) timbrature[currentUser] = [];
    let entry = timbrature[currentUser].find(t => t.date === date);
    if(!entry){
        entry = {date};
        timbrature[currentUser].push(entry);
    }
    const now = new Date().toLocaleTimeString();
    if(type==='start') entry.start = now;
    if(type==='end') entry.end = now;

    navigator.geolocation.getCurrentPosition(pos=>{
        entry.lat = pos.coords.latitude.toFixed(5);
        entry.lon = pos.coords.longitude.toFixed(5);
        document.getElementById('gps-info').textContent = `Ultima timbratura GPS: ${entry.lat}, ${entry.lon}`;
        renderChart();
    }, err=>{
        alert('GPS non disponibile, la timbratura non sarà completa');
    });

    localStorage.setItem('timbrature', JSON.stringify(timbrature));
    renderCalendar();
}

// Logout semplice
document.getElementById('logout-btn').addEventListener('click', ()=>{
    location.reload();
});