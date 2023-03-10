var genreList = [{
  clearSkyDay: ['summer', 'pop', 'dace/electronic', 'workout', 'regional mexican']
},
{
  rainnyDay : ['mood', 'netflix', 'idie', 'sleep', 'gaming']
},
{
  snow : ['top lists', 'latin', 'wellness', 'equal', 'chill']
},
{
  mist : ['rock', 'country', 'r&b', 'Christian & Gospel', 'hip-hop']
}]



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

          //loop through to pick a random genre, need to link with weather
          let pickedGenre = "";
          for (let i = 0; i < genres.length; i++) {
            const genre = genres[i];
            console.log("Genre #" + (i + 1) + ": " + genre);

            if (genre === "Rock") {
              pickedGenre = genre;
              console.log("Picked genre: " + pickedGenre);
              break;
            }
          }
          //creating p for genre
          const pickedGenreElement = document.createElement("p");
          pickedGenreElement.innerHTML = "Picked genre: " + pickedGenre;
          document.body.appendChild(pickedGenreElement);
          document.getElementById("#spotifyPlaylist").append(pickedGenreElement);
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
  var currentTime = dayjs().format("h:mm A");
  //Creating div for the weather display
  var weather = document.createElement("div");

  weather.innerHTML = ` 
  <div class="content has-text-centered">
    <h5 class="title is-size4">${city}</h5>
              <div>${todaysDate}</div>
              <div id='time'>${currentTime}</div>
              <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
              <div id="temperature" class="card-text">The temperature : ${temp} °F
              </div>
            </div>
  `;

  document.getElementById("weatherCard").append(weather);

  //Arrays for the weather icons
  var clearSkyDay = ["01d", "02d", "03d", "04d"];
  var rainnyDay = ["09d", "10d", "11d"];
  var snow = ["13d", "13n"];
  var mist = ["50d", "50n"];
  var clearSkyNight = ["01n", "02n", "03n", "04n"];
  var rainnyNight = ["09n", "10n", "11n"];

  for (var i = 0; i < 4; i++) {
    if (clearSkyDay[i] === icon) {
      console.log("Confirm clear day");
    } else if (clearSkyNight[i] === icon) {
      console.log("Confirm Clear Night ");
    } else if (rainnyDay[i] === icon) {
      console.log("Confirm rainny night");
    }
  }
}
