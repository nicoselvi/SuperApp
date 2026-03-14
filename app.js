function timbraturaEntrata() {

let ora = new Date().toLocaleString()

let registro = JSON.parse(localStorage.getItem("registro")) || []

registro.push("Entrata: " + ora)

localStorage.setItem("registro", JSON.stringify(registro))

mostraRegistro()

}

function timbraturaUscita() {

let ora = new Date().toLocaleString()

let registro = JSON.parse(localStorage.getItem("registro")) || []

registro.push("Uscita: " + ora)

localStorage.setItem("registro", JSON.stringify(registro))

mostraRegistro()

}

function mostraRegistro(){

let registro = JSON.parse(localStorage.getItem("registro")) || []

let lista = document.getElementById("registro")

lista.innerHTML = ""

registro.forEach(r => {

let li = document.createElement("li")

li.textContent = r

lista.appendChild(li)

})

}

mostraRegistro()