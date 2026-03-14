const currentUser = 'admin';
const logDiv = document.getElementById('log');
const startBtn = document.getElementById('start-btn');
const endBtn = document.getElementById('end-btn');
const backupBtn = document.getElementById('backup-btn');

let timbrature = JSON.parse(localStorage.getItem('timbrature')) || {};
if(!timbrature[currentUser]) timbrature[currentUser] = [];

function updateLog() {
    const userData = timbrature[currentUser];
    if(userData.length === 0) {
        logDiv.innerHTML = "Nessuna timbratura effettuata";
        return;
    }
    let html = "";
    userData.forEach((t,i)=>{
        html += `Giorno ${i+1}: `;
        if(t.start) html += `Entrata: ${t.start} `;
        if(t.end) html += `| Uscita: ${t.end}`;
        html += "<br>";
    });
    logDiv.innerHTML = html;
}

function timbra(type){
    const now = new Date().toLocaleString();
    const today = new Date().toISOString().split('T')[0];
    let entry = timbrature[currentUser].find(e=>e.date===today);
    if(!entry){
        entry = {date: today};
        timbrature[currentUser].push(entry);
    }
    if(type==='start') entry.start = now;
    if(type==='end') entry.end = now;

    localStorage.setItem('timbrature', JSON.stringify(timbrature));
    updateLog();
}

startBtn.addEventListener('click', ()=> timbra('start'));
endBtn.addEventListener('click', ()=> timbra('end'));
backupBtn.addEventListener('click', ()=>{
    localStorage.setItem('timbrature', JSON.stringify(timbrature));
    alert('Dati salvati localmente!');
});

updateLog();