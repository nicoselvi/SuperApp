const calendarDiv = document.getElementById('calendar');

function renderCalendar(){
    const userData = timbrature[currentUser] || [];
    let html = "";
    userData.forEach(e=>{
        html += `<div>${e.date}: ${e.start || '-'} / ${e.end || '-'}</div>`;
    });
    calendarDiv.innerHTML = html || "Nessuna timbratura da mostrare";
}

renderCalendar();