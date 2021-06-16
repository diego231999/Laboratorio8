
// permite obtener datos de la URL 'windom.location-search <- llama a la url'
// se instancia en un objeto urlParams
const urlParams = new URLSearchParams(window.location.search);
//obteniendo un parametro del url
// name = valor.Country
// slug = valor.Slug
// countryCode = valor.CountryCode
// caseCovid = confirmed <- TODO
const nameCountry = urlParams.get('name');
const slug = urlParams.get('slug');
const countryCode = urlParams.get('countryCode');

const oldURL = window.location.href;
const l = "detallePais".length + 1;
const oldPath = oldURL.substring(oldURL.lastIndexOf("detallePais")-l);

$(document).ready(function () {
    // const caseCovid = 'confimed';
    $("#titulo").html('Resumen del país ' + nameCountry);
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://restcountries.eu/rest/v2/alpha/" + countryCode
    }).done(function (data) {
        $("#bandera-div").after(
            "<img class='img-bandera' src= " + data.flag + ">"
        );

        $("#capital").html(data.name);
        $("#population").html(data.population);
        $("#subregion").html(data.subregion);

    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
    obtenerDataPais(urlParams.get('caseCovid'));
});

function seleccionarCasos() {
    var selectedValue = document.getElementById("caseCovid").value;
    obtenerDataPais(selectedValue);
}

// se muestra la tabla de casos
function obtenerDataPais(caseCovid) {

    console.log(caseCovid);
    if(caseCovid === "confirmed"){
        caseCovid == "confirmed";
    }

    // actualizando la ruta de la lectura de gráfica
    const newPath =  "grafico/graficoEvolutivo.html?name="+nameCountry+"&slug="+slug+"&countryCode="+countryCode+"&caseCovid="+caseCovid;
    const newUrl = oldURL.replace(oldPath,newPath);
    $("#redirect-grafico").attr("href",newUrl);
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/total/dayone/country/" + slug + "/status/" + caseCovid
    }).done(function (data) {
        let contentHTML = "";
        let df = "";
        console.log(slug);
        console.log(caseCovid);
        $.each(data, function (i, casoCovid){
            df = formatDate(casoCovid["Date"]);
            contentHTML += "<tr>";
            contentHTML += "<td>"+df+"</td>";
            contentHTML += "<td>"+casoCovid["Cases"]+"</td>";
            contentHTML += "</tr>";
        });
        $("#body-paises").html(contentHTML);
    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
}

function formatDate(date) {
    return date.split("T")[0].replaceAll("-","/");
}