import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const spotifyApiKey = process.env.REACT_APP_SPOTIFY_ID;
const spotifyBearer = process.env.REACT_APP_SPOTIFY_BEARER;
const contentType = 'application/json;charset=utf-8';

const movies = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

movies.defaults.headers.common['Authorization'] = apiKey;
movies.defaults.headers.common['Content-type'] = contentType;

const image = 'https://image.tmdb.org/t/p/original';

const rails = axios.create({
  baseURL: 'http://localhost:3000',
});
// rails.defaults.headers.common['Content-type'] = 'Application/json';

const nytimes = axios.create({
  baseURL: 'https://api.nytimes.com/svc/movies/v2/reviews/search.json',
});

nytimes.defaults.headers.common['Content-type'] = 'Application/json';

const spotify = axios.create({
  baseURL: 'https://api.spotify.com/v1/search?',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Bearer ${spotifyBearer}`,
  },
});

export { movies, image, rails, axios, nytimes, spotify };
