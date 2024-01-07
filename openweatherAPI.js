
// Define a function that takes the latitude, longitude, and appid as parameters
function getWeatherForecast(lat, lon, appid) {
    // Construct the URL for the API call using template literals
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}`;
  
    // Use the fetch function to make the API call and return a promise
    return fetch(url)
      .then(response => {
        // Check if the response is ok
        if (response.ok) {
          // Return the response as JSON data
          return response.json();
        } else {
          // Throw an error if the response is not ok
          throw new Error("Something went wrong");
        }
      })
      .then(data => {
        // Use the data to do something, such as logging it to the console
        console.log(data);
      })
      .catch(error => {
        // Handle the error by logging it to the console
        console.error(error);
      });
  }
  
  // Call the function with some sample values
  getWeatherForecast(33.51, 86.81, "bffc79831915b8208d58090c5144ba71");