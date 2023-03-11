var genres = JSON.parse(localStorage.getItem("playlistFav")) || [];

function renderGenres() {
  document.getElementById("spotifyPlaylist").innerHTML = " ";
  
  for (var i = 0; i < genres.length; i++) {
    var img = genres[i].icons[0].url;
    var name = genres[i].name;
    // created div with playlist's icon and a favorite button.
    var element = document.createElement("div");
    element.innerHTML = `
                <h5>${name}</h5>
                <img src="${img}" alt="testing" />
                <button data-index=${i}
                        class="button 
                        removePlaylist
                        is-danger 
                        is-light 
                        is-primary 
                        is-hovered 
                        is-rounded " >Remove</button>`;

    document.getElementById("spotifyPlaylist").append(element);
  }
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains('removePlaylist')) {
    var index = event.target.dataset.index 
    genres.splice(index,1)
    localStorage.setItem("playlistFav", JSON.stringify(genres));
    renderGenres();
  }
})
renderGenres();