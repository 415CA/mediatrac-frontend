import React, { useState, useEffect, Fragment } from 'react';
import { Card } from 'semantic-ui-react';

const FilmCard = ({movieArray}) => {

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  const movieDetails = (movie) => {
    localStorage.setItem('selectedMovie', movie);
  };

  const createCard = (movieArray) => {
    movieArray.map((movie) => {
      return (
        <Card
          key={movie.id}
          image={`${image}${movie.poster_path}`}
          header={movie.title}
          meta={`Rating: ${movie.vote_average}`}
          description={truncate(movie.overview, 75)}
          raised={true}
          href={`/movies/${movie.id}`}
          movie={movie}
          onClick={movieDetails(movie.id)}
        />
      );
    });
  };

  return (
    <Fragment>
      <Card.Group itemsPerRow={5}>{createCard(movieArray)}</Card.Group>
      <Route path={`/movies/:id`} component={MovieDetails} />
    </Fragment>
  );

}

export default FilmCard;