'use script';

function useApi(searchTerm) {

    console.log('getting country facts');

    const url = `https://restcountries.eu/rest/v2/name/${searchTerm}`;

    // print url to console
    console.log(url);

    fetch(url)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayData(responseJson))
    .catch(err => {
        console.log(err);
    });
}

function displayData(data) {

    // ensure url is functioning as intended
    console.log(data);
    console.log(data[0].name);

    if(data.length == 0) {
        alert ('no country found')
    } else {
        let HtmlOutput = '';

        for (let i = 0; i < data.length; i++) {
            HtmlOutput += '<p>' + 'Name:' + data[i].name + '</p></ br> '
            HtmlOutput += '<p>' + 'Population:' + data[i].population + '<p>'
            HtmlOutput += '<p>' + 'Capital:' + data[i].capital + '<p>'
            HtmlOutput += '<p>' + 'Region:' + data[i].region + '<p>'
            HtmlOutput += '<p>' + 'Currency:' + data[i].currencies[i].name + '<p>'

            $('.js-search-results').html(HtmlOutput);
        }
    }



}

function watchSubmit() {

    $('.js-search-form').submit(event => {

        event.preventDefault();

        let query = $('.js-query').val();
        if (query == '') {
           alert('plesae enter country name'); 
        } else {
            useApi(query);
        }
    });
}

$(watchSubmit);