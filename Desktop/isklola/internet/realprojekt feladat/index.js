let tasks = []

const input = document.getElementById("input")
    input.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            addTask()
        } 
    })

function addTask(){
    if (input.value ===""){
        alert("Ne hagyd uresen a beviteli mezot!")
        return
    } 
    tasks.push({
        text: input.value,
        completed :false
    })

    input.value = ""
    saveTask()
    render()
}
function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
function loadTask(){
    const saved = localStorage.getItem("tasks")
    if (saved) {
        tasks = JSON.parse(saved)
        render()
    }
}
function render(){
    const taskList = document.getElementById("task-list")
    taskList.innerHTML=""

    tasks.forEach((task,i) =>{
        const li = document.createElement("li")
        const span = document.createElement("span")
        span.textContent = task.text
        //flori volt debug 
        span.classList.toggle("completed", task.completed)

        const delBtn = document.createElement("button")
        delBtn.textContent = "X"

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = task.completed
        checkbox.addEventListener("change",()=>{
            task.completed = checkbox.checked
            saveTask()
            checkbox.classList.toggle("completed")
        })

        delBtn.addEventListener("click",e=>{
            tasks.splice(i,1)
            saveTask()
            render()
        })
        li.append(checkbox,span,delBtn)
        taskList.append(li)
    })
}
loadTask()
//also gombok mukodese_ Flori

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

all_ok.addEventListener("click", checkAll);
all_notOk.addEventListener("click", uncheckAll);
all_del.addEventListener("click", deleteAll);