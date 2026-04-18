let tasks = []

const input = document.getElementById("input")
const select = document.getElementById("listaSelect")

// Enter kezelés
input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault()
        addTask()
    } 
})

function addTask(){
    if (input.value === ""){
        alert("Ne hagyd üresen a beviteli mezot!")
        return
    } 

    // task mentése + kategória
    tasks.push({
        text: input.value,
        completed: false,
        category: select.value
    })

    input.value = ""
    saveTask()
    render()
}

// mentés localStorage-be
function saveTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

// betöltés localStorage-ből
function loadTask(){
    const saved = localStorage.getItem("tasks")

    if (saved) {
        tasks = JSON.parse(saved)
        render()
    }
}

function render(){
    // minden lista ürítése
    ["suli","bevasarlas","sport","etkezesi_terv","bakancs"].forEach(id => {
        const el = document.getElementById(id)
        if (el) el.innerHTML = ""
    })

    // taskok kirajzolása
    tasks.forEach((task, i) => {

        const li = document.createElement("li")

        const span = document.createElement("span")
        span.textContent = task.text
        //flori volt debug 
        span.classList.toggle("completed", task.completed)

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = task.completed

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked
            saveTask()
        })

        const delBtn = document.createElement("button")
        delBtn.textContent = "X"

        delBtn.addEventListener("click", () => {
            tasks.splice(i, 1)
            saveTask()
            render()
        })

        li.append(checkbox, span, delBtn)

        // ide kerül a kategória logika
        const hely = task.category || "suli"
        const target = document.getElementById(hely)

        if (target) {
            target.appendChild(li)
        } else {
            console.log("Nincs ilyen lista:", hely)
        }
    })
}

//a helyes helyre mentes_ Flori//also gombok mukodese_ Flori
const all_ok = document.getElementById("all-check")
const all_notOk = document.getElementById("all-uncheck")
const all_del = document.getElementById("delete-all")

function checkAll(){
    tasks.forEach(t => t.completed = true)
    saveTask()
    render()
}

function uncheckAll(){
    tasks.forEach(t => t.completed = false)
    saveTask()
    render()
}

function deleteAll(){
    tasks = []
    saveTask()
    render()
}

all_ok.addEventListener("click", checkAll)
all_notOk.addEventListener("click", uncheckAll)
all_del.addEventListener("click", deleteAll)

// induláskor betöltés
loadTask()
