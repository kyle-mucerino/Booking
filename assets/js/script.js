document.getElementById("searchBtn").addEventListener("click", function () {
  // var city_name = document.getElementById("from").value;
  // var city_name2 = document.getElementById("to").value;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ef5b343e8amsh245f6290f2a4531p1a9e15jsn4eb38a0919dc",
      "X-RapidAPI-Host": "flixbus.p.rapidapi.com",
    },
  };

  fetch("https://flixbus.p.rapidapi.com/v1/cities", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

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
