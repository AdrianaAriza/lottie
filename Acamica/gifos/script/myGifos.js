"use strict";

let mygif = localStorage.getItem("vector_id");
const path =
    "http://api.giphy.com/v1/gifs?ids=" +
    mygif +
    "&api_key=89o92Eb4EKKYqo9z1wEcVQ8wsfb5gL1Z";

function getSuggestResults() {
    fetch(path)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            const resultsEl = document.getElementById("trend-results");
            let resultsHTML = "";
            json.data.forEach((element) => {
                const url = element.images.fixed_width.url;
                const height = element.images.fixed_height.height;
                const width = element.images.fixed_width.width;
                const tittle = element.tittle;

                resultsHTML += `<img src = "${url}" class = "item" width = "${width}" height = "${height}" alt="${tittle}">`;
            });
            resultsEl.innerHTML = resultsHTML;
        })
        .catch((error) => {
            console.log(error.message);
        });
}
getSuggestResults();