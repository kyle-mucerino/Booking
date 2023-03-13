var genres = [];

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

  yourPlaylists(icon);
}

function yourPlaylists(icon) {
  spotifyAPI();

  //Arrays for the weather icons
  var clearSkyDay = ["01d", "02d", "03d", "04d"];
  var clearSkyNight = ["01n", "02n", "03n", "04n"];
  var rainyDay = ["09d", "10d", "11d"];
  var rainyNight = ["09n", "10n", "11n"];
  var snow = ["13d", "13n"];
  var mist = ["50d", "50n"];

  for (var i = 0; i < 4; i++) {
    if (clearSkyDay[i] === icon || clearSkyNight[i] === icon) {
      console.log("confirm Clear Day or Night");
    }
  }

  for (var i = 0; i < 3; i++) {
    if (rainyNight[i] === icon || rainyDay[i] === icon) {
      // var suggestionLists = genreList[0];
      console.log("confirm rainy night or day");
    }
  }

  for (var i = 0; i < 2; i++) {
    if (snow[i] === icon) {
      // var suggestionLists = genreList[0];
      console.log("confirm snowy");
    } else if (mist[i] === icon) {
      // var suggestionLists = genreList[1];
      // console.log(suggestionLists);
      console.log(genres);
      console.log("Confirm mist day");
    }
  }
}

function spotifyAPI() {
  //Fetch the Spotify API
  const endpoint = "https://accounts.spotify.com/api/token";

  const clientID = "e7fc5b273d9b4aaea1f387e99ef23d1b";
  const clientSecret = "b22ba202fa564908a0a1e50e928b6db2";

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
          genres = data.categories.items;

          //.map((category) => category.name)
          console.log(genres);

          getGenres();

          //loop through to pick a random genre, need to link with weather
          /*   let pickedGenre = "";
          for (let i = 0; i < genres.length; i++) {
            const genre = genres[i].name;
            console.log("Genre #" + (i + 1) + ": " + genre);
          }

          //creating p for genre
          const pickedGenreElement = document.createElement("p");
          pickedGenreElement.innerHTML = "Picked genre: " + pickedGenre;
          document.body.appendChild(pickedGenreElement);
          document.getElementById("spotifyPlaylist").append(pickedGenreElement);
          */
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}

// Display the playlist's icon.
function getGenres() {
  console.log(genres);

  //clear the previous suggested playlists
  document.getElementById("spotifyPlaylist").innerHTML = " ";

  // Display all playlist

  for (var i = 0; i < genres.length; i += 4) {
    // get random number
    var randIndex = Math.floor(Math.random() * genres.length);

    var img = genres[randIndex].icons[0].url;
    var name = genres[randIndex].name;

    // created div with playlist's icon and a favorite button.
    var element = document.createElement("div");
    element.className = "cardMusic";
    element.innerHTML = `
                <h5>${name}</h5>
                <img src="${img}" alt="testing" />
                <button data-index=${i}
                        class="button 
                        playlistFav
                        is-primary 
                        is-light 
                        is-primary 
                        is-hovered 
                        is-rounded " >Favorite</button>`;

    document.getElementById("spotifyPlaylist").append(element);
  }
}

//Store the fav playlists in the localStorage
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("playlistFav")) {
    var index = parseInt(event.target.dataset.index);
    var favorties = JSON.parse(localStorage.getItem("playlistFav")) || [];
    favorties.push(genres[index]);
    localStorage.setItem("playlistFav", JSON.stringify(favorties));
    event.target.classList.remove("is-primary");
    event.target.classList.add("is-info");
    event.target.textContent = "Favorited";
    event.target.disabled = true;
  }
});
