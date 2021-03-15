document.querySelector("#buscarTarjeta").addEventListener("input", function () {
    let valueTarjeta = document.querySelector("#buscarTarjeta").value;
    document.querySelectorAll(".tarjetaValuePaciente").forEach(tarjeta => { 
        tarjeta.parentNode.classList.remove("hidden");
        if (tarjeta.innerHTML.indexOf(valueTarjeta) !== 0) {
            tarjeta.parentNode.classList.add("hidden");
        }
    })
})

fetch("/pacientes/")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            document.querySelector("#pacientes").innerHTML += `<tr><td>${data[i].nombre} ${data[i].apellidos}</td>
                <td class="tarjetaValuePaciente">${data[i].tarjeta}</td>
                <td>${data[i].telefono}</td>
                <td class="celdaBoton"><a href="/pacientesModificar.html?tarjeta=${data[i].tarjeta}" class="butModificarPaciente">Modificar</a></td>
                <td class="celdaBoton"><a href="/citaNueva.html?tarjeta=${data[i].tarjeta}" class="butCitaPaciente">Cita</a></td>
                <td class="celdaBoton"><a href="/pacientes/borrar/${data[i].tarjeta}" class="butEliminarPaciente">Eliminar</a></td></tr>`
        }
    })
