const fetch = require('node-fetch');

async function getWeather(city, appid) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Error: ${response.status}`);
            return;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

getWeather('Birmingham', 'bffc79831915b8208d58090c5144ba71')
    .then(data => {
        if (data) {
            console.log(data);
        }
    })
    .catch(error => {
        console.error(`Error: ${error}`);
    });
