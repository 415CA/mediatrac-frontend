const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const genre = {
  action: `/discover/movie?api_key=${API_KEY}&with_genres=28&append_to_response=videos,images&include_image_language=en`,
  adventure: `/discover/movie?api_key=${API_KEY}&with_genres=12&append_to_response=videos,images&include_image_language=en`,
  animation: `/discover/movie?api_key=${API_KEY}&with_genres=35&append_to_response=videos,images&include_image_language=en`,
  comedy: `/discover/movie?api_key=${API_KEY}&with_genres=80&append_to_response=videos,images&include_image_language=en`,
  documentary: `/discover/movie?api_key=${API_KEY}&with_genres=99&append_to_response=videos,images&include_image_language=en`,
  drama: `/discover/movie?api_key=${API_KEY}&with_genres=18&append_to_response=videos,images&include_image_language=en`,
  family: `/discover/movie?api_key=${API_KEY}&with_genres=10751&append_to_response=videos,images&include_image_language=en`,
  horror: `/discover/movie?api_key=${API_KEY}&with_genres=27&append_to_response=videos,images&include_image_language=en`,
  romance: `/discover/movie?api_key=${API_KEY}&with_genres=10749&append_to_response=videos,images&include_image_language=en`,
  scienceFiction: `/discover/movie?api_key=${API_KEY}&with_genres=878&append_to_response=videos,images&include_image_language=en`,
  thriller: `/discover/movie?api_key=${API_KEY}&with_genres=53&append_to_response=videos,images&include_image_language=en`,

  trending: `/trending/movie/week?api_key=${API_KEY}&append_to_response=videos,images&include_image_language=en`,
  popular: `/discover/movie/week?api_key=${API_KEY}sort_by=popularity.desc&append_to_response=videos,images&include_image_language=en`,
  discover: `/discover/movie?api_key=${API_KEY}&append_to_response=videos,images&include_image_language=en`,
  upcoming: `/discover/movie/upcoming?api_key=${API_KEY}&language=en-US&append_to_response=videos,images&include_image_language=en`,
  nowPlaying: `/discover/movie/now_playing?api_key=${API_KEY}&language=en-US&append_to_response=videos,images&include_image_language=en`,
};

const search = (query, pageNum) => {
  return `/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${pageNum}&include_adult=false`
}

const details = (tmdbID) => {
  return `/movie/${tmdbID}?api_key=${API_KEY}&language=en-US&append_to_response=%26append_to_response%3Dvideos%2Cimages`
}

const videos = (tmdbID) => {
  return `/movie/${tmdbID}/videos?api_key=${API_KEY}&language=en-US`
}

const recommendations = (tmdbID, pageNum) => {
  return `/movie/${tmdbID}/recommendations?api_key=${API_KEY}&language=en-US&page=${pageNum}`
}

const similarMovies = (tmdbID, pageNum) => {
  return `/movie/${tmdbID}/similar?api_key=${API_KEY}&language=en-US&page=${pageNum}`
}

const reviews = (tmdbID, pageNum) => {
  return `/movie/${tmdbID}/reviews?api_key=${API_KEY}&language=en-US&page=${pageNum}`
}

const credits = (tmdbID) => {
  return `/movie/${tmdbID}/credits?api_key=${API_KEY}`
}

const socialMedia = (tmdbID) => {
  return `/movie/${tmdbID}/external_ids?api_key=${API_KEY}`
}

const explore = (tmdbID, pageNum = 1) => {
  return {
    details: details(tmdbID),
    videos: videos(tmdbID),
    recommendations: recommendations(tmdbID, pageNum),
    similarMovies: similarMovies(tmdbID, pageNum),
    reviews: reviews(tmdbID, pageNum),
    credits: credits(tmdbID),
    socialMedia: socialMedia(tmdbID),

  }
}


  const tmdbGenres = {
    '28': "Action",
    '12': "Adventure",
    '16': "Animation",
    '35': "Comedy",
    '80': "Crime",
    '99': "Documentary",
    '18': "Drama",
    '10751': "Family",
    '14': "Fantasy",
    '36': "History",
    '27': "Horror",
    '10402': "Music",
    '9648': "Mystery",
    '10749': "Romance",
    '878': "Science Fiction",
    '10770': "TV Movie",
    '53': "Thriller",
    '10752': "War",
    '37': "Western",
  }

export { genre, search, explore, tmdbGenres };
