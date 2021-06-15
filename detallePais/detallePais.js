
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
//const caseCovid = urlParams.get('caseCovid');
const caseCovid = 'confirmed';

$(document).ready(function () {
    // const caseCovid = 'confimed';
    $("#titulo").html('Resumen del país ' + nameCountry);
    $("#bandera-div").html()

    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://restcountries.eu/rest/v2/alpha/" + countryCode
    }).done(function (data) {
        //TODO obtener la imagen de la bandera en base a su id
    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });

    obtenerDataPais();
});

function seleccionarCasos() {
    //TODO
}

function obtenerDataPais() {
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/total/dayone/country/" + slug + "/status/" + caseCovid
    }).done(function (data) {
        //TODO
    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
}

function formatDate(date) {
    //TODO
}