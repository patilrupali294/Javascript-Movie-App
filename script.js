const APIKEY = '55a3947afae3fd59047eaf9b3367bde2';
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=55a3947afae3fd59047eaf9b3367bde2&page=1';
const IMGPATH = "https://image.tmdb.org/t/p/w1280/";
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=55a3947afae3fd59047eaf9b3367bde2&query=';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

//initially get movies
getMovies(APIURL);

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
   // console.log(respData);
     showMovies(respData.results);
     
   }

function showMovies(movies){
    //initially clear main
    
    movies.forEach(movie => {
        const{ poster_path, title, vote_average, overview } = movie;
        const movieE1 = document.createElement("div");
        movieE1.classList.add("movie");
        movieE1.innerHTML = `
        <img  
        src = "${IMGPATH + poster_path}"
        alt = "${title}"/>
        <div class="movie-info">
        <h3>${title}</h3>
        <span class = "${getClassByRate(vote_average)}">${vote_average}</span> 
        </div>  
        <div class = "overview">
        <h4>Overview: </h4>
        ${overview}

        </div>
        
        
        `;

        main.appendChild(movieE1);
        
    });
}
function getClassByRate(vote){
    if(vote >= 8){
        return 'green';
    }
    else if(vote >= 5){
        return 'orange';
    }
    else
    return 'red';
}
form.addEventListener('submit', (e) =>{
    e.preventDefault();
const searchTerm = search.value;
if(searchTerm){
    main.innerHTML=`
    <header>
    <button onclick="goBack()" class = "back">Go Back 
    </button>
    </header>
    `;
    getMovies(SEARCHAPI + searchTerm );
    search.value='';
}


});

function goBack(){

    window.location = './index.html';
}