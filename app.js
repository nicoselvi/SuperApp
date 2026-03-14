mostra("dashboard")

function mostra(id){

document.querySelectorAll("section")
.forEach(s => s.style.display="none")

document.getElementById(id).style.display="block"

}

function entrata(){

let data=new Date().toLocaleDateString()
let ora=new Date().toLocaleTimeString()

let registro=JSON.parse(localStorage.getItem("registro"))||{}

registro[data]=registro[data]||{}

registro[data].entrata=ora

salvaGPS(registro,data)

localStorage.setItem("registro",JSON.stringify(registro))

mostraRegistro()

}

function uscita(){

let data=new Date().toLocaleDateString()
let ora=new Date().toLocaleTimeString()

let registro=JSON.parse(localStorage.getItem("registro"))||{}

registro[data]=registro[data]||{}

registro[data].uscita=ora

salvaGPS(registro,data)

localStorage.setItem("registro",JSON.stringify(registro))

mostraRegistro()

}

function salvaGPS(registro,data){

navigator.geolocation.getCurrentPosition(pos=>{

registro[data].gps=pos.coords.latitude+","+pos.coords.longitude

})

}

function mostraRegistro(){

let registro=JSON.parse(localStorage.getItem("registro"))||{}

let html=""

for(let data in registro){

let entrata=registro[data].entrata||"-"
let uscita=registro[data].uscita||"-"

let ore="-"

if(registro[data].entrata && registro[data].uscita){

let e=new Date("1970-01-01 "+entrata)
let u=new Date("1970-01-01 "+uscita)

ore=((u-e)/1000/60/60).toFixed(2)

}

html+=`

<tr>

<td>${data}</td>
<td>${entrata}</td>
<td>${uscita}</td>
<td>${ore}</td>

</tr>

`

}

document.getElementById("tabella").innerHTML=html

}

function backup(){

let dati=localStorage.getItem("registro")

let blob=new Blob([dati],{type:"application/json"})

let url=URL.createObjectURL(blob)

let a=document.createElement("a")

a.href=url
a.download="backup.json"
a.click()

}

function exportExcel(){

let registro=JSON.parse(localStorage.getItem("registro"))||{}

let rows=[]

for(let data in registro){

rows.push({

data:data,
entrata:registro[data].entrata,
uscita:registro[data].uscita

})

}

let ws=XLSX.utils.json_to_sheet(rows)

let wb=XLSX.utils.book_new()

XLSX.utils.book_append_sheet(wb,ws,"Ore")

XLSX.writeFile(wb,"timbrature.xlsx")

}

mostraRegistro()