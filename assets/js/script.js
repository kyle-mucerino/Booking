document.getElementById("searchBtn").addEventListener("click", function () {
  var cityName = document.getElementById("cityName").value;
  // var city_name2 = document.getElementById("to").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=529a4a77591cd797917d95ed3b0a882f`
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "ef5b343e8amsh245f6290f2a4531p1a9e15jsn4eb38a0919dc",
  //     "X-RapidAPI-Host": "flixbus.p.rapidapi.com",
  //   },
  // };

  // fetch("https://flixbus.p.rapidapi.com/v1/cities", options)
  //   .then((response) => response.json())
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err));

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

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "ef5b343e8amsh245f6290f2a4531p1a9e15jsn4eb38a0919dc",
  //     "X-RapidAPI-Host": "flixbus.p.rapidapi.com",
  //   },
  // };

  // var city_name = document.getElementById("from").value;
  // var city_name2 = document.getElementById("to").value;

  // fetch(
  //   `https://flixbus.p.rapidapi.com/v1/search-trips?to_id=${city_name}&from_id=${city_name2}&currency=USD&departure_date=2023-03-26&number_adult=1&search_by=cities`,
  //   options
  // )
  //   .then((response) => response.json())
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err));
});
