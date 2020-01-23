'use strict';

function getDataFromApi(searchTerm) {

    const url = `https://restcountries.eu/rest/v2/name/${searchTerm}`;

    // print url to ensure its functioning as intended
    
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

    // validate the correct data is being returned

    console.log(data[0].name);

    if (data.length == 0) {
        alert('no country found')
    } else {
        let HtmlOutput = '';

        for (let i = 0; i < data.length; i++) {
            HtmlOutput += '<p>' + 'Name:' + data[i].name + '</p></ br> '
            HtmlOutput += '<p>' + 'Population:' + data[i].population + '<p>'
            HtmlOutput += '<p>' + 'Capital:' + data[i].capital + '<p>'
            HtmlOutput += '<p>' + 'Region:' + data[i].region + '<p>'

            $('.js-search-results').html(HtmlOutput);
        }
    }


}

function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();

        let query = $('.js-query').val();

        // print query name to console
        console.log(query);

        getDataFromApi(query);
    });
}

$(watchSubmit);