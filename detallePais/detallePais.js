
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
const caseCovid = urlParams.get('caseCovid');
console.log(nameCountry);
console.log(slug);
console.log(countryCode);
console.log(caseCovid);
$(document).ready(function () {
    // const caseCovid = 'confimed';
    $("#titulo").html('Resumen del país ' + nameCountry);
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://restcountries.eu/rest/v2/alpha/" + countryCode
    }).done(function (data) {
        $("#bandera-div").after(
            "<img  src= " + data.flag + ">"
        );

        $("#capital").html(data.name);
        $("#population").html(data.population);
        $("#subregion").html(data.subregion);

    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });

    obtenerDataPais();
});

function seleccionarCasos() {
    //TODO
}

// se muestra la tabla de casos
function obtenerDataPais() {
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/total/dayone/country/" + slug + "/status/" + caseCovid
    }).done(function (data) {
        let contentHTML = "";
        $.each(data, function (i, casoCovid){
            let formatDate = formatDate(casoCovid["Date"]);
           contentHTML += "<tr>";
           contentHTML += "<td>"+formatDate+"</td>";
           contentHTML += "<td>"+casoCovid["Cases"]+"</td>";
           contentHTML += "</tr>";
        });
    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
}

function formatDate(date) {
  /*  DateFormat hourdateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
    hourdateFormat.date;*/
}

/*
* {
    "name": "Argentina",
    "topLevelDomain": [
        ".ar"
    ],
    "alpha2Code": "AR",
    "alpha3Code": "ARG",
    "callingCodes": [
        "54"
    ],
    "capital": "Buenos Aires",
    "altSpellings": [
        "AR",
        "Argentine Republic",
        "República Argentina"
    ],
    "region": "Americas",
    "subregion": "South America",
    "population": 43590400,
    "latlng": [
        -34.0,
        -64.0
    ],
    "demonym": "Argentinean",
    "area": 2780400.0,
    "gini": 44.5,
    "timezones": [
        "UTC-03:00"
    ],
    "borders": [
        "BOL",
        "BRA",
        "CHL",
        "PRY",
        "URY"
    ],
    "nativeName": "Argentina",
    "numericCode": "032",
    "currencies": [
        {
            "code": "ARS",
            "name": "Argentine peso",
            "symbol": "$"
        }
    ],
    "languages": [
        {
            "iso639_1": "es",
            "iso639_2": "spa",
            "name": "Spanish",
            "nativeName": "Español"
        },
        {
            "iso639_1": "gn",
            "iso639_2": "grn",
            "name": "Guaraní",
            "nativeName": "Avañe'ẽ"
        }
    ],
    "translations": {
        "de": "Argentinien",
        "es": "Argentina",
        "fr": "Argentine",
        "ja": "アルゼンチン",
        "it": "Argentina",
        "br": "Argentina",
        "pt": "Argentina",
        "nl": "Argentinië",
        "hr": "Argentina",
        "fa": "آرژانتین"
    },
    "flag": "https://restcountries.eu/data/arg.svg",
    "regionalBlocs": [
        {
            "acronym": "USAN",
            "name": "Union of South American Nations",
            "otherAcronyms": [
                "UNASUR",
                "UNASUL",
                "UZAN"
            ],
            "otherNames": [
                "Unión de Naciones Suramericanas",
                "União de Nações Sul-Americanas",
                "Unie van Zuid-Amerikaanse Naties",
                "South American Union"
            ]
        }
    ],
    "cioc": "ARG"
}
*
* */