const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=63b2ceed06b1409904b998536e6ab1ef&page=1`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=63b2ceed06b1409904b998536e6ab1ef&query="'
const invalidImage =
  'http://www.retrievephotos.com/blog/wp-content/uploads/2017/07/icon-354370_960_720.png'

const main = document.getElementById('main')
const form = document.getElementById('form')
const searchButton = document.querySelector('.btn')
const search = document.getElementById('search')



getMovies(API_URL)

async function getMovies(url) {
  const res = await fetch(url)

  if (!res.ok) {
    const error = document.createElement('div')
    error.classList.add('error')
    main.append(error)
    return
  }

  const data = await res.json()

  console.log(data.results)
  showMovies(data.results ?? error)
}

function showMovies(movies) {
  main.innerHTML = ''

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview, backdrop_path } = movie

    const movieElement = document.createElement('div')
    movieElement.classList.add('movie')

    movieElement.innerHTML = `
        
            <img
                src="${
                  movie.backdrop_path !== null
                    ? IMG_PATH + poster_path
                    : invalidImage
                }"
                alt="${title}"
            />
            <div class="movie-info">
                 <h3>${title}</h3>
                <span class="${getClassByRate(
                  vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                 <h3>Overview</h3>
            ${overview}
             </div>
        `

    // console.log(IMG_PATH + poster_path)

    main.appendChild(movieElement)
  })
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

searchButton.setAttribute('onclick', 'this.blur();')

form.addEventListener('submit', (e, b) => {
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm != '') {
    getMovies(SEARCH_API + searchTerm)

    search.value = ''
    
  } else {
    window.location.reload()
  }
})
