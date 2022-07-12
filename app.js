const city = document.querySelector('#city');
const state = document.querySelector('#state');
const country = document.querySelector('#country');
const submit = document.querySelector('button');
const img = document.querySelector('img')
const lowDisplay = document.querySelector('.low')
const currentDisplay = document.querySelector('.current')
const highDisplay = document.querySelector('.high')
const type = document.querySelector('.weather-type')


async function getData(city, state, country) {
    let selectedcity = city
    let selectedstate = state
    let selectedcountry = country

    type.innerHTML = 'LOADING'
    const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${selectedcity},${selectedstate},${selectedcountry}&limit=1&appid=bb7b08e02944933f95323a0d2bd6a58f`, {mode: 'cors'})
    const geoData = await geoResponse.json();

    let lat = geoData[0].lat
    let lon = geoData[0].lon

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=bb7b08e02944933f95323a0d2bd6a58f`, {mode: 'cors'})
    const weatherData = await weatherResponse.json();

    let temp = Math.round(weatherData.main.temp)
    currentDisplay.innerHTML = temp
    let high = Math.round(weatherData.main.temp_max);
    highDisplay.innerHTML = high
    let low = Math.round(weatherData.main.temp_min)
    lowDisplay.innerHTML = low
    let sky = weatherData.weather[0].main
    type.innerHTML = sky
    let skyGif = `${sky} skies`
    console.log(skyGif);

    const gifResponse = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=IHyNy7EMUkx7CJVZBc4jFkQaegodGsRp&s=${skyGif}`, {mode: 'cors'})
    const gif = await gifResponse.json();

    img.src = gif.data.images.original.url;
    img.classList.remove('hidden')

    
    console.log(weatherData);
    
}

submit.addEventListener('click', (e) => {
    e.preventDefault()
    cityInput = city.value
    stateInput = state.value;
    countryInput = country.value

    getData(cityInput, stateInput, countryInput)
})





// https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=bb7b08e02944933f95323a0d2bd6a58f

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=bb7b08e02944933f95323a0d2bd6a58f