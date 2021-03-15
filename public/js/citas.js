document.querySelector("#buscarTarjeta").addEventListener("input", function () {
    let valueTarjeta = document.querySelector("#buscarTarjeta").value;
    document.querySelectorAll(".tarjetaValue").forEach(tarjeta => { 
        tarjeta.parentNode.classList.remove("hidden");
        if (tarjeta.innerHTML.indexOf(valueTarjeta) !== 0){
            tarjeta.parentNode.classList.add("hidden");     
        }
    })
})

fetch("/citas")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            document.querySelector("#citas").innerHTML += `<tr><td class="fechaValue">${data[i].fecha}</td>
                <td>${data[i].hora}</td>
                <td>${data[i].especialidad}</td>
                <td class="tarjetaValue">${data[i].tarjeta}</td>
                <td class="celdaBoton"><a href="/citasModificar.html?tarjeta=${data[i].tarjeta}" class="butModificarPaciente">Modificar</a></td><td class="celdaBoton"><a href="/citas/borrar/${data[i].tarjeta}" class="butEliminarPaciente">Eliminar</a></td></tr>`
        }
    })