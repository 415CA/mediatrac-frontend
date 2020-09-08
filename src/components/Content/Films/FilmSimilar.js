import React from 'react';
import { image } from '../Axios';
import { Image } from 'semantic-ui-react';

const SimilarFilms = ({ similarMovies }) => {
  let showFilms;

  if (similarMovies.results) {
    showFilms = similarMovies.results.map((movie) => {
      return (
        <Image
          key={movie.id}
          src={`${image}${movie.poster_path}`}
          as="a"
          size="small"
          href={`/movies/${movie.id}`}
        />
      );
    });
  }

  return showFilms;
};

export default SimilarFilms;
