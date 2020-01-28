'use strict';



function useApi(country) {

    const url = `https://restcountries.eu/rest/v2/name/${country}`;
    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayData(responseJson))
        .catch(err => {
            console.log(err);
        });
}

function displayData(responseJson) {

    console.log(responseJson);
    console.log(responseJson[0].name);

    if (responseJson.length == 0) {
        alert('no results');
    } else {
        let HmtlOutput = '';
        for (let i = 0; i < responseJson.length; i++)
            for (let j = 0; j < responseJson.length; i++) {
                HmtlOutput += `
        <section>
        <p>Country Name:${responseJson[i].name}</p>
        <p>Currency:${responseJson[i].currencies[j].name}</p>
        <img src=${responseJson[i].flag}>
        <p>Alternative Spelling:${responseJson[i].altSpellings[j]}</p>
        </section>
        `;

                $('.js-search-results').html(HmtlOutput);
            }

    }
}


function watchSubmit() {

    $('.js-search-form').submit(e => {
        e.preventDefault();

        let country = $('.js-query').val();
        console.log(country);

        if (country == '') {
            alert('please enter country name');
        } else {
            useApi(country);
        }
    });

}

$(watchSubmit);

