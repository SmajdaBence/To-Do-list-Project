const input = document.querySelector('#todos')
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
