import React from 'react';
// import { match } from 'sinon';

const MovieShow = ({ match, movies }) => {
  return (
    <div>
      <h3>{movies[match.params.movieID].title}</h3>
    </div>
  );
};

export default MovieShow;
