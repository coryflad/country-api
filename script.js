'use strict';

function getDataFromApi(searchTerm, callback) {

    const url = `https://restcountries.eu/rest/v2/name/${searchTerm}`;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displaySearchData(responseJson))
        .catch(err => {
            console.log(err)
        });
}

function displaySearchData(data) {

    console.log(data[0].name);

    if (data.length == 0) {
        alert('no country found')
    } else {
        let HtmlOutput = '';

        for (let i = 0; i < data.length; i++) {
            HtmlOutput += '<p>' + data[i].name + '</p></ br> '
            HtmlOutput += '<p>' + data[i].population + '<p>'
            HtmlOutput += '<p>' + data[i].capital + '<p>'
            HtmlOutput += '<p>' + data[i].region + '<p>'

            $('.js-search-results').html(HtmlOutput);
        }
    }


}

function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        let queryTarget = $(event.currentTarget).find('.js-query');
        let query = queryTarget.val();
        console.log(query);
        queryTarget.val("");
        getDataFromApi(query, displaySearchData);
    });
}

$(watchSubmit);