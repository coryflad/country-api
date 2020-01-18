'use strict';

function getDataFromApi(country) {

    // dynamcially generate the URL
    
    const url = `https://restcountries.eu/rest/v2/name/${country}`

    console.log(`Finding country facts for ${country}`);

    fetch(url)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displaySearchData(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
        $('#js-search-results').empty();
        $('#js-error-message').removeClass('hidden');
    });

}

function displaySearchData(responseJson) {

    console.log(responseJson);

    // if there are previous results, remove them
    $('#js-search-results').html('');
    $('#js-error-message').empty();
    console.log('emptied');

    // adds the country facts
    $('#js-search-results').append(
        `<p>Country Name:${responseJson[0].name}</p>
        <p>Population:${responseJson[0].population}</p>
        <p>Region:${responseJson[0].region}</p>
        `);

    // displays the results section
    console.log('country facts displayed');


};

function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();

        const country = $('.js-query').val();
        if (country == '') {
            alert('please enter country name')
        }
        getDataFromApi(country);
    });
}


$(watchSubmit);