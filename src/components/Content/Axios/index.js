import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const contentType = 'application/json;charset=utf-8';

const movies = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

movies.defaults.headers.common['Authorization'] = apiKey;
movies.defaults.headers.common['Content-type'] = contentType;

const image = 'https://image.tmdb.org/t/p/original/';

export { movies, image };
