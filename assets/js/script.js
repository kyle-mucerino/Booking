document.getElementById("searchBtn").addEventListener("click", function () {
  var cityName = document.getElementById("cityName").value;

  //Clear the previous search value
  document.getElementById("cityName").value = "";

  // get data from the API Weather
  var APIKey = "a68815855e046aa6fc830d61874f7c39";
  var APIUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${APIKey}`;

  fetch(APIUrl)
    .then(function (res) {
      return res.json();
    })

    .then(function (data) {
      console.log(data);
      var lat = data.city.coord.lat;
      var lon = data.city.coord.lon;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
      )
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          console.log(data);

          // Display the weather and time in the HTML
          displayWeather(data);
        });
    })
    .catch(function (err) {
      console.error(err);
    });


  //Fetch the Spotify API
  const endpoint = "https://accounts.spotify.com/api/token";

  const clientID = "a8d159dd2df64dd88997760953407b51";
  const clientSecret = "4b6c7ca3bb03493bb22fc9026549ca97";

  const authHeader = btoa(`${clientID}:${clientSecret}`);

  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");

  fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.access_token);
      // Use the access token to fetch the list of available genres
      const endpoint = "https://api.spotify.com/v1/browse/categories";

      fetch(endpoint, {
        headers: {
          Authorization: "Bearer " + data.access_token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const genres = data.categories.items.map((category) => category.name);
          console.log(genres);
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
});

function displayWeather(data) {
  //To clear the previous display
  document.getElementById("weatherCard").innerHTML = " ";

  //Declare the variables
  var city = data.name;
  var date = new Date();
  var todaysDate = date.toLocaleDateString();
  var icon = data.weather[0].icon;
  var temp = data.main.temp;

 //Creating div for the weather display
  var weather = document.createElement("div");

  weather.innerHTML = ` 
  <div class="content has-text-centered">
    <h5 class="title is-size4">${city}</h5>
              <div>${todaysDate}</div>
              <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
              <p id="temperature" class="card-text">The temperature : ${temp} °F
              </p>
            </div>
  `;

  document.getElementById("weatherCard").append(weather);
}
