function backup(){

let dati = localStorage.getItem("registro")

let blob = new Blob([dati], {type:"application/json"})

let url = URL.createObjectURL(blob)

let a=document.createElement("a")

a.href=url
a.download="backup_timbratore.json"

a.click()

}