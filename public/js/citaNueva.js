document.querySelector("#citaNueva").addEventListener("click", function () {
    let data = parseInt(getParameterByName("tarjeta"));

    let nuevaCita = {
        fecha: document.querySelector("input[name='fecha']").value,
        hora: document.querySelector("input[name='hora']").value,
        especialidad: document.querySelector("select[name='especialidad']").value,
        tarjeta: data
    }

    let fetchData = {
        method: "POST",
        body: JSON.stringify(nuevaCita),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }
    
    fetch("/citas/nueva", fetchData)
        .then(res => res.json())
        .then(location.href = "http://localhost:3000/citas.html")
});

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
