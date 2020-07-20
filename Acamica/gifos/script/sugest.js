'use strict'

//Trends


function getComponentSuggestGift(url, id, height, tittle) {
    return `
         <div class="suggest-gifs">
            <img src = "${url}" class = "suggest-item" height = "${height}" alt="${tittle}">
            <figcaption  id = "${id}" style ="display : block" class="suggest-titles">${tittle}</figcaption>  
            <img class ="close" alt = "close-image" src ="/assets/close.svg">
            <button type="submit" onClick = "alerta('${tittle}')" class="more-button">Ver más…</button>
         </div>       
    `;
}
const apKey = 'lCIxyIpyjzmnIETV0Z1M6WMnWOtsdeH3';
const path_s = `http://api.giphy.com/v1/gifs/trending?api_key=${apKey}&limit=4&offset=30`;

function getSuggestResults() {

    fetch(path_s).then((response) => {
        return response.json()
    }).then((json) => {

        const resultsEl = document.getElementById('suggest-results');
        let resultsHTML = '';

        json.data.forEach(element => {

            const url = element.images.fixed_width.url;
            const height = element.images.fixed_height.height;
            const tittle = element.tittle;

            resultsHTML += getComponentSuggestGift(url, element.id, height, element.title);

        });
        resultsEl.innerHTML = resultsHTML;

    }).catch((error) => {
        console.log(error.message)
    });
}
getSuggestResults();

function alerta(title) {

    const sURL = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${title}`;
    fetch(sURL).then(function (res) {
        return res.json()
    }).then(function (json) {
        //console.log(json.data[0].images.fixed_width.url);

        const gifs = document.getElementById("suggest-search");
        let gifsHTML = "";
        json.data.forEach(function (obj) {
            //console.log(obj.images.fixed_height.url);
            const path = obj.images.fixed_height.url;
            const width = obj.images.fixed_height.width;
            const height = obj.images.fixed_height;

            gifsHTML +=
            
                `<div class = "caja">
                    <img src = "${path}" onmouseover = "setEvenMouse('${obj.id}')" onmouseout ="setOutMouse('${obj.id}')" class = "item-trend" height = "${height}" alt="${obj.tittle}" width = "${width}">
                    <figcaption  id = "${obj.id}" style ="display : none" class="gif-titles">${obj.title}</figcaption>   
                 </div>`;
        })
        gifs.innerHTML = gifsHTML;

    }).catch(function (error) {
        console.log(error.message)
    })
}
