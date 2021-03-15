document.querySelector("#modificarPaciente").addEventListener("click", function () {
    let data = parseInt(getParameterByName("tarjeta"))
    let nuevosDatos = {
        nombre: document.querySelector("input[name='nombre']").value,
        apellidos: document.querySelector("input[name='apellidos']").value,
        tarjeta: data,
        telefono: document.querySelector("input[name='telefono']").value
    }

    let fetchData = {
        method: "PUT",
        body: JSON.stringify(nuevosDatos),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }
    fetch("/pacientes/modificar/datos", fetchData)
        .then(res => res.json())
        .then(location.href = "http://localhost:3000/pacientes.html")
});

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}