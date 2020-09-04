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

export { genre };