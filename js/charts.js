const ctx = document.getElementById('hoursChart').getContext('2d');
let chart;

function renderChart() {
    const userData = timbrature[currentUser] || [];
    const labels = userData.map(e=>e.date);
    const dataHours = userData.map(e=>{
        const start = e.start ? new Date(e.start) : null;
        const end = e.end ? new Date(e.end) : null;
        if(start && end) return ((end-start)/1000/60/60).toFixed(2);
        return 0;
    });

    if(chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets:[{label:'Ore lavorate', data:dataHours, backgroundColor:'#007bff'}] },
        options: { scales:{ y:{ beginAtZero:true } } }
    });
}

renderChart();