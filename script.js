const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

getMovies(APIURL);

const main=document.getElementById("main");
const form=document.getElementById("form");
const search=document.getElementById("search");
async function getMovies(url){
    const resp=await fetch(url);
    const respData=await resp.json();
    console.log(respData);
    showMovies(respData.results);
}
function showMovies(movies){
    main.innerHTML="";
    movies.forEach(movie =>{
        const{poster_path,title,vote_average,overview}=movie;
        const moviEl=document.createElement('div');
        moviEl.classList.add('movie');
        moviEl.innerHTML=`
        <img src="${poster_path ? IMGPATH + poster_path : "https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}" alt="${title}"/>
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
           <h3>Overview:</h3>
           ${overview}
        </div>
        `;
        main.appendChild(moviEl);
    });
}
function getClassByRate(vote){
    if(vote >= 8){
        return 'green';
    } else if (vote>=5){
        return 'orange';
    }
    else{
        return 'red';
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm=search.value;

    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);

        search.value="";
    }
    else
    {
        getMovies(APIURL);
        search.value="";
    }
});