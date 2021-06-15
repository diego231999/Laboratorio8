
$(document).ready(function () {
    $.ajax({
        method: "GET",
        datatype: "json",
        crossDomain: true,
        headers: {"ID": "ba75da48-8a51-46f4-b3c4-69da5690949d"},
        url: "https://api.covid19api.com/summary"
    }).done(function (data) {
        console.log(data);
        $("#newConfirmed").val(data.Global.NewConfirmed);
        $("#newDeaths").val(data.Global.NewDeaths);
        $("#newRecovered").val(data.Global.NewRecovered);
        $("#totalConfirmed").val(data.Global.TotalConfirmed);
        $("#totalDeaths").val(data.Global.TotalDeaths);
        $("#totalRecovered").val(data.Global.TotalRecovered);

        var listaPaises= data.Countries;
        var listaPaisesSort=listaPaises.sort(compare);
        var contentHtml="";
        var x = "/detallePais/detallePais.html?name=valor1";
        var y = "&v2=valor2";
        var y = "&p=2";
        $.each(listaPaisesSort, function (i, valor) {
            contentHtml += "<tr>";
            contentHtml += "<td>" + (i + 1) + "</td>";
            contentHtml += "<td>" + valor.Country + "</td>";
            contentHtml += "<td>" + valor.TotalConfirmed + "</td>";
            contentHtml += "<td>" + valor.TotalDeaths + "</td>";
            contentHtml += "<td>" + valor.TotalRecovered+ "</td>";
            contentHtml += "<td>" + valor.NewConfirmed + "</td>";
            contentHtml += "<td>" + valor.NewDeaths + "</td>";
            contentHtml += "<td>" + valor.NewRecovered + "</td>";
            contentHtml+= "<button onclick='obtenerDataPais();'"+"onclick="+"location.href='/detallePais/detallePais.html?name="+valor.Country+"&slug="+valor.Slug+"&countryCode="+valor.CountryCode+"&caseCovid=confirmed'"+">Enviar</button>"

        });
        }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
});

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const paisA = a.TotalConfirmed;
    const paisB = b.TotalConfirmed;
    let comparison = 0;
    if (paisA > paisB) {
        comparison=1;
    }
    if (PaisB > paisA) {
        comparision= -1;
    }
    return comparison;
}

function formatDate(date) {
    // TODO
}