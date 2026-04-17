const input = document.querySelector('#fasz')
const suli = document.querySelector("#suli")

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // ne reloadoljon a form

    const li = document.createElement("li");
    const span = document.createElement("span");

    span.textContent = input.value;
    li.appendChild(span);

    suli.appendChild(li);

    input.value = ""; // input törlése
  }
});
function toggleMenu() {
    const menu = document.getElementById("sideMenu");

    if (menu.style.left === "0px") {
        menu.style.left = "-250px";
    } else {
        menu.style.left = "0px";
    }
}
