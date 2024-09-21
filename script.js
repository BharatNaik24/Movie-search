const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieBox = document.querySelector("#movie-box");
const loading = document.querySelector("#loading");

const getMovies = async (url) => {
  try {
    loading.style.display = "block"; // Show loading
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
    movieBox.innerHTML =
      "<p>Failed to load movies. Please try again later.</p>";
  } finally {
    loading.style.display = "none";
  }
};

getMovies(APIURL);

const showMovies = (data) => {
  movieBox.innerHTML = "";
  if (data.results.length === 0) {
    movieBox.innerHTML = "<p>No results found.</p>";
    return;
  }
  data.results.forEach((result) => {
    const imagePath =
      result.poster_path === null
        ? "img/image-missing.png"
        : IMGPATH + result.poster_path;

    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `<img src="${imagePath}" alt="${result.original_title}" />
            <div class="overlay">
                <div class="title"> 
                    <h2> ${result.original_title}  </h2>
                    <span> ${result.vote_average} <span>
                </div>
                <h3>Overview:</h3>
                <p> 
                    ${result.overview}
                </p>
            </div>`;
    movieBox.appendChild(box);
  });
};

document.querySelector("#search").addEventListener("keyup", function (event) {
  if (event.target.value !== "") {
    getMovies(SEARCHAPI + event.target.value);
  } else {
    getMovies(APIURL);
  }
});
