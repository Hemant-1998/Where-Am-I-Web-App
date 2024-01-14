"use strict";
const countriesContainer = document.querySelector(".countries");
const apiKey = "USE YOUR GEO-CODING API KEY";
const btnCountry = document.querySelector(".btn-country");

const renderCountry = function (countryData) {
  const countryLang = Object.values(countryData.languages);
  const countryCurrency = Object.values(countryData.currencies);
  const html = ` <article class="country">
  <img class="country__img" src="${countryData.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${countryData.name.official}</h3>
    <h4 class="country__region">${countryData.capital[0]}</h4>
    <h4 class="country__region">${countryData.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +countryData.population / 1000000
    ).toFixed(1)} Million</p>
    <p class="country__row"><span>🗣️</span>${countryLang[0]}</p>
    <p class="country__row"><span>💰</span>${countryCurrency[0].name}</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

// promisifying geolocation api of browser.

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (err) => reject(err)
    );
  });
};

const whereAmI = async function (country) {
  // using geolocation Api
  const position = await getPosition();
  const { latitude: lat, longitude: lng } = position.coords;

  // using Geocoding Api
  const resGeocode = await fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${apiKey}`
  );
  const geocodeData = await resGeocode.json();

  console.log(geocodeData);

  // using restCountries Api
  const resCountryResponse = await fetch(
    `https://restcountries.com/v3.1/name/${geocodeData.country}`
  );
  const resCountryData = await resCountryResponse.json();
  // console.log(data[0]);

  renderCountry(resCountryData[0]);
};

btnCountry.addEventListener("click", whereAmI);
