
$(document).ready(function () {
    $.ajax({
        method: "GET",
        datatype: "json",
        crossDomain: true,
        //headers: {"ID": "ba75da48-8a51-46f4-b3c4-69da5690949d"},
        headers: {"ID": "bd26f79a-c71e-46bf-ad80-86af436802fb"},
        url: "https://api.covid19api.com/summary"
    }).done(function (data) {

    /*    const global = {
            "#newConfirmed": data.Global.NewConfirmed,
            "#newDeaths": data.Global.NewDeaths,
            "#newRecovered": data.Global.NewRecovered,
            "#totalConfirmed": data.Global.TotalConfirmed,
            "#totalDeaths": data.Global.TotalDeaths,
            "#totalRecovered": data.Global.TotalRecovered
        };

        for (let key of global){
            $(key).val(global[key]).html(global[key]);
        }
*/
        $("#newConfirmed").val(data.Global.NewConfirmed).html(data.Global.NewConfirmed);
        $("#newDeaths").val(data.Global.NewDeaths).html(data.Global.NewDeaths);
        $("#newRecovered").val(data.Global.NewRecovered).html(data.Global.NewRecovered);
        $("#totalConfirmed").val(data.Global.TotalConfirmed).html(data.Global.TotalConfirmed);
        $("#totalDeaths").val(data.Global.TotalDeaths).html(data.Global.TotalDeaths);
        $("#totalRecovered").val(data.Global.TotalRecovered).html(data.Global.TotalRecovered);

        var date= data.Global.Date;
        var fecha=formatDate(date);
        $("#titulo-resumen-global").html("Resumen global al "+fecha);

        var listaPaises= data.Countries;
        var listaPaisesSort=listaPaises.sort(sortingJson("TotalConfirmed"));
        var contentHtml="";
        var url = window.location.href;

        $.each(listaPaisesSort, function (i, valor) {
            var nextPath = "detallePais/detallePais.html?name="+valor["Country"]+"&slug="+valor["Slug"]+"&countryCode="+valor["CountryCode"]+"&caseCovid=confirmed";
            var newUrl = url.replace("index.html",nextPath);
            contentHtml += "<tr>";
            contentHtml += "<td>" + (i + 1) + "</td>";
            contentHtml += "<td>" + valor.Country + "</td>";
            contentHtml += "<td>" + valor.TotalConfirmed + "</td>";
            contentHtml += "<td>" + valor.TotalDeaths + "</td>";
            contentHtml += "<td>" + valor.TotalRecovered+ "</td>";
            contentHtml += "<td>" + valor.NewConfirmed + "</td>";
            contentHtml += "<td>" + valor.NewDeaths + "</td>";
            contentHtml += "<td>" + valor.NewRecovered + "</td>";
            contentHtml+= "<td><a class='btn btn-primary' href="+ newUrl +">Enviar</a></td>"
            contentHtml += "</tr>";
        })
        $("#body-paises").html(contentHtml);
        }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
});

/*function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    console.log("Entro a la comparador");
    const paisA = a.TotalConfirmed;
    const paisB = b.TotalConfirmed;
    let comparison = 0;

    paisA > paisB ? comparison = 1 : comparison = -1 ;

    if (paisA > paisB) {
        comparison=1;
    }
    if (PaisB > paisA) {
        comparision= -1;
    }

    return comparison;
}*/
function sortingJson(TotalConfirmed){
    return function(a,b){
        if (a[TotalConfirmed] > b[TotalConfirmed]) {
            return 1;
        }
        if (b[TotalConfirmed] > a[TotalConfirmed]) {
            return -1;
        }
        return 0;
    };
}

function formatDate(date) {
    var mat=date.split("T");
    var fecha=mat[0];
    return fecha;
}