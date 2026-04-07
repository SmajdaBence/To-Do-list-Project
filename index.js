let tasks = []

const input = document.getElementById("input")
    input.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            addTask()
        } 
    })

function addTask(){
    if (input.value ==="") return
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