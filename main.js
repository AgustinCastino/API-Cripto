const urlListadoMonedas = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"

function iniciar() {
    fetch(urlListadoMonedas)
        .then((resp) => resp.json())
        .then((monedas) => mostrarMonedas(monedas))
}

function mostrarMonedas(monedas) {
    let $monedas = document.querySelector(".monedas")

    monedas.forEach(moneda => {
        let $moneda = document.createElement("li")
        $moneda.className = "moneda"

        let $contenedorNombreMoneda = document.createElement("div")
        $contenedorNombreMoneda.className = "nombreMoneda"

        let $imagenMoneda = document.createElement("img")
        $imagenMoneda.src = moneda.image
        $imagenMoneda.className = "imagenMoneda"

        let $nombreMoneda = document.createElement("h2")
        $nombreMoneda.innerText = moneda.name

        let $simboloMoneda = document.createElement("h3")
        $simboloMoneda.innerText = moneda.symbol.toUpperCase()

        $contenedorNombreMoneda.appendChild($imagenMoneda)
        $contenedorNombreMoneda.appendChild($nombreMoneda)
        $contenedorNombreMoneda.appendChild($simboloMoneda)

        $moneda.appendChild($contenedorNombreMoneda)
        $moneda.onclick = function () {
            obtenerInformacionMoneda(moneda.id)
        }

        $monedas.appendChild($moneda)
    });
}

function obtenerInformacionMoneda(moneda) {
    let urlMonedaABuscar = `https://api.coingecko.com/api/v3/coins/${moneda}`
    fetch(urlMonedaABuscar)
        .then(resp => resp.json())
        .then(resp => mostrarInformacionMoneda(resp))
}

function mostrarInformacionMoneda(moneda) {
    document.querySelector(".informacionMoneda img").src = moneda.image.small
    document.querySelector("#moneda").innerText = moneda.name
    document.querySelector(".variacionPrecio").innerText = moneda.market_data.price_change_percentage_24h + "%"
    document.querySelector(".precio").innerText = moneda.market_data.current_price.usd
    document.querySelector(".precioMaximoDelDia").innerText = moneda.market_data.high_24h.usd
    document.querySelector(".precioMinimoDelDia").innerText = moneda.market_data.low_24h.usd
    document.querySelector(".marketCap").innerText = moneda.market_data.market_cap.usd
    document.querySelector(".cantidadCirculante").innerText = moneda.market_data.circulating_supply

    if (moneda.market_data.max_supply != null) {
        document.querySelector(".cantidadMaxima").innerText = moneda.market_data.max_supply
    } else {
        document.querySelector(".cantidadMaxima").innerText = "∞"
    }

    document.querySelector(".descripcionMoneda").innerHTML = moneda.description.en
}

iniciar()
obtenerInformacionMoneda("bitcoin")