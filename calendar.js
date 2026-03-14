// calendar.js - generazione calendario semplice

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const table = document.createElement('table');
    table.classList.add('calendar-table');

    // Header giorni
    const header = document.createElement('tr');
    ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].forEach(d => {
        const th = document.createElement('th');
        th.textContent = d;
        header.appendChild(th);
    });
    table.appendChild(header);

    let tr = document.createElement('tr');
    for(let i=0; i<firstDay; i++) tr.appendChild(document.createElement('td'));

    for(let d=1; d<=lastDate; d++){
        const td = document.createElement('td');
        td.textContent = d;
        const dateStr = `${year}-${(month+1).toString().padStart(2,'0')}-${d.toString().padStart(2,'0')}`;

        const userData = timbrature[currentUser]?.find(t => t.date === dateStr);
        if(userData){
            td.style.background = '#d1ffd1';
        }

        td.addEventListener('click', () => {
            const action = prompt('Scrivi "start" per entrata o "end" per uscita');
            if(action === 'start' || action === 'end'){
                addTimbratura(dateStr, action);
            }
        });

        tr.appendChild(td);
        if((d + firstDay) % 7 === 0){
            table.appendChild(tr);
            tr = document.createElement('tr');
        }
    }
    table.appendChild(tr);
    calendar.appendChild(table);
}