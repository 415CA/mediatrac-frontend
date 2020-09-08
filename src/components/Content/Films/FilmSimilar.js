import { useEffect, useState, Fragment } from 'react';
import { image } from '../Axios';
import { Image } from 'semantic-ui-react';

const SimilarFilms = (films) => {
  let showFilms;

  if (films.results) {
    showFilms = films.results.map((movie) => {
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