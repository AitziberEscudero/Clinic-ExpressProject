document.querySelector("#buscarMedico").addEventListener("input", function () {
    let valueTarjeta = capitalizeFirstLetter(document.querySelector("#buscarMedico").value);
    document.querySelectorAll(".medicoValue").forEach(tarjeta => {  
        let medico = tarjeta.innerHTML.split(" ");        
        tarjeta.parentNode.classList.add("hidden");
        for (let i = 0; i < medico.length; i++) {
            if (medico[i].indexOf(valueTarjeta) === 0) {
                tarjeta.parentNode.classList.remove("hidden");
            }
        }
    })
})

document.querySelector("#buscarEspecialidad").addEventListener("input", function () {
    let valueTarjeta = capitalizeFirstLetter(document.querySelector("#buscarEspecialidad").value);
    document.querySelectorAll(".especialidadValue").forEach(tarjeta => {  //devuelve array
        tarjeta.parentNode.classList.remove("hidden");
        if (tarjeta.innerHTML.indexOf(valueTarjeta) !== 0) {
            tarjeta.parentNode.classList.add("hidden");
        }
    })
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

fetch("/medicos/")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            document.querySelector("#medicos").innerHTML += `<tr><td class="medicoValue">${data[i].medico}</td><td class="especialidadValue">${data[i].especialidad}</td><td>${data[i].consulta}</td></tr>`
        }
    })