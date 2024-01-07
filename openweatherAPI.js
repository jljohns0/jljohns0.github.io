const fetch = require('node-fetch');

async function getWeather(city, appid) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log(data);
        } else {
            console.error(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

getWeather('Birmingham', 'bffc79831915b8208d58090c5144ba71');
