import React from 'react';
import { image } from '../Axios';
import { Image } from 'semantic-ui-react';

const Recommendations = ({ recommendations }) => {
  let showRecommendations;

  if (recommendations.results) {
    showRecommendations = recommendations.results.map((movie) => {
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

  return showRecommendations;
};

export default Recommendations;
