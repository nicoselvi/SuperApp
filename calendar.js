function calendario(){

let oggi=new Date()

let mese=oggi.getMonth()
let anno=oggi.getFullYear()

let primo=new Date(anno,mese,1).getDay()

let giorni=new Date(anno,mese+1,0).getDate()

let html="<table>"

let g=1

for(let i=0;i<6;i++){

html+="<tr>"

for(let j=0;j<7;j++){

if(i===0 && j<primo){

html+="<td></td>"

}

else if(g>giorni){

html+="<td></td>"

}

else{

html+="<td>"+g+"</td>"
g++

}

}

html+="</tr>"

}

html+="</table>"

document.getElementById("calendar").innerHTML=html

}

calendario()