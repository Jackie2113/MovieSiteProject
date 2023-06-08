const API_KEY = "api_key=9581cf77fb790b09228487b4a88a62ac";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]
const tagsE1 = document.getElementById('tags');
var selectedGenre = []

setGenre();

function setGenre(){
  tagsE1.innerHTML = '';
  genres.forEach(genre =>{
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id=genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', () =>{
      if(selectedGenre.length ==0){
        selectedGenre.push(genre.id);
      }else{
        if(selectedGenre.includes(genre.id)){
          selectedGenre.forEach((id,dix) => {
            if(id == genre.id){
              selectedGenre.splice(idx,1);
            }
          })
        }else{
          selectedGenre.push(genre.id);
        }
      }
      getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
      highlightSelection()
    })
    tagsE1.append(t);
  })
}

function highlightSelection(){
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.classList.remove('highlight')
  })
  clearBtn()
  if(selectedGenre.length!=0){
    selectedGenre.forEach(id => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add('highlight');
    })
  }
}

function clearBtn(){
  let clearBtn = document.getElementById('clear');
  if(clearBtn){
    clearBtn.classList.add('highlight')
  }else{
    let clear = document.createElement('div');
    clear.classList.add('tag','highlight');
    clear.id='clear';
    clear.innerText='Clear x';
    clear.addEventListener('click',() => {
      selectedGenre = [];
      setGenre();
      getMovies(API_URL);
    })
    tagsE1.append(clear);
  }
}

getMovies(API_URL);

function getMovies(url){

    fetch(url).then(res => res.json()).then(data => {
      if(data.results.length!==0)
      {
        showMovies(data.results);
      }
      else{
        main.innerHTML=`<h1>No Results, Try Again</h1>`
      }
        
        // console.log(data);
    })
}

function showMovies(data){
  main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieE1 = document.createElement('div');
        movieE1.classList.add('movie');
        movieE1.innerHTML = `
        <img src="${poster_path? IMG_URL+poster_path: "logo.jpeg" }" alt="${title}">

          <div class="movie-info">
            <h3> ${title} </h3>
            <span class="${getColor(vote_average)}"> ${vote_average} </span>
          </div>

          <div class="overview">
            <h3> Overview </h3>
            ${overview}
          </div>`

          main.appendChild(movieE1);
    })
}

function getColor(vote){
  if(vote>=8){
    return 'green'
  }
  else if(vote>=5){
    return 'orange'
  }
  else{
    return 'red'
  }
}

form.addEventListener('submit',(e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if(searchTerm){
    getMovies(searchURL+'&query='+searchTerm)
  }else{
    getMovies(API_URL);
  }
})