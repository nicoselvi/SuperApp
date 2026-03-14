function graficoOre(){

let registro = JSON.parse(localStorage.getItem("registro")) || {}

let giorni=[]
let ore=[]

for(let data in registro){

if(registro[data].entrata && registro[data].uscita){

let e = new Date("1970-01-01 "+registro[data].entrata)
let u = new Date("1970-01-01 "+registro[data].uscita)

let diff=(u-e)/1000/60/60

giorni.push(data)
ore.push(diff)

}

}

new Chart(document.getElementById("grafico"),{

type:"bar",

data:{
labels:giorni,
datasets:[{
label:"Ore lavorate",
data:ore
}]
}

})

}