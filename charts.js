// charts.js - grafico ore lavorate
let chart;

function renderChart() {
    const ctx = document.getElementById('hoursChart').getContext('2d');

    const data = timbrature[currentUser] || [];
    const labels = data.map(d => d.date);
    const hours = data.map(d => {
        if(d.start && d.end){
            const diff = (new Date(`${d.date}T${d.end}`) - new Date(`${d.date}T${d.start}`)) / (1000*60*60);
            return parseFloat(diff.toFixed(2));
        }
        return 0;
    });

    if(chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Ore lavorate',
                data: hours,
                backgroundColor: 'rgba(0,123,255,0.6)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}