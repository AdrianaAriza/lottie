'use strict'

//Change CSS Sheet
function cambiarArchivoCss(archivo) {
    document.getElementById('cssArchivo').href = archivo;
}

const apiKey = 'lCIxyIpyjzmnIETV0Z1M6WMnWOtsdeH3';
const URL = 'http://api.giphy.com/v1/gifs/search?q=';

const searchForm = document.getElementById('search-form');
const searchUser = document.getElementById('search-input');
const resultsEl = document.getElementById('search-results');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const search = searchUser.value
    getSearchResults(search)
});


function getSearchResults(search) {

    fetch(URL + search + '&api_key=' + apiKey)
        .then((response) => {
            return response.json()
        }).then(data => {
            //console.log(data.data[0].images.fixed_width.url);
            let resultsHTML = '';

            data.data.forEach(element => {
                //console.log(element);
                console.log(element.id)
                const url = element.images.fixed_height.url;
                const width = element.images.width;
                const height = element.images.fixed_height.height;
                resultsHTML += getComponentGift(url, element.id, height, element.title, width);
            });

            resultsEl.innerHTML = resultsHTML;

        }).catch(function (error) {
            return error
        });
}
searchUser.addEventListener('keyup', function() {
    document.getElementById("searchSuggestions").style.visibility = "visible";
    const input = searchUser.value;
    if (input == "") {
        document.getElementById("searchSuggestions").style.visibility = "hidden";
    }
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`http://api.giphy.com/v1/gifs/search/tags?api_key=lCIxyIpyjzmnIETV0Z1M6WMnWOtsdeH3&q="${input}"&limit=3`, requestOptions)

        .then((response) => {

            return response.json();
        }).then(function (data) {

            const prueba = document.getElementById("searchSuggestions");
            let prueba1 = "";
            data.data.forEach(function (obj) {
                //console.log(obj.name)
                prueba1 +=
                    `<button class="button-searchSuggestions" onclick = "ensayo('${obj.name}')">${obj.name}</button>`;
            })
            prueba.innerHTML = prueba1;

        }).catch(function (error) {
            console.log(error.message)
        })
})

function ensayo (search) {
    document.getElementById("searchSuggestions").style.visibility = "hidden";
    fetch(URL + search + '&api_key=' + apiKey)
        .then((response) => {
            return response.json()
        }).then(data => {
            console.log(data.data[0].images.fixed_width.url);
            let resultsHTML = '';

            data.data.forEach(element => {
                
                //console.log(element.title)
                const url = element.images.fixed_height.url;
                const width = element.images.width;
                const height = element.images.fixed_height.height;
                resultsHTML += getComponentGift(url, element.id, height, element.title, width);
            });
            pruebnfjknagk();
            resultsEl.innerHTML = resultsHTML;
        }).catch(function (error) {
            return error
        });
}

function pruebnfjknagk() {
    
    const input = searchUser.value;
  
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`http://api.giphy.com/v1/gifs/search/tags?api_key=lCIxyIpyjzmnIETV0Z1M6WMnWOtsdeH3&q="${input}"&limit=3`, requestOptions)

        .then((response) => {

            return response.json();
        }).then(function (data) {

            const xprueba = document.getElementById("masbotones");
            let prueba5 = "";
            data.data.forEach(function (obj) {
                console.log(obj.name)
                prueba5 +=
                    `<button class="otrosbotones" onclick = "ensayo('${obj.name}')">${obj.name}</button>`;
            })
            xprueba.innerHTML = prueba5;

        }).catch(function (error) {
            console.log(error.message)
        })
}