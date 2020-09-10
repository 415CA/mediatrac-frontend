import React, { useState, useEffect, Fragment } from 'react';
import { axios, movies, image } from '../../Content/Axios';
import { genre, explore } from '../../Content/Request';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MovieDetails from '.';

import { Card } from 'semantic-ui-react';

const Movies = () => {
  const [feature, setFeature] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const request = await movies.get(genre.trending).then((display) => {
        setFeature(display.data.results);
      });
      return request;
    }
    getMovies();
  }, []);

  movies.get(explore(337401).details).then((res) => console.log('Mulan', res));

  const req = [
    movies.get(explore(337401).details),
    movies.get(explore(337401).videos),
    movies.get(explore(337401).recommendations),
    movies.get(explore(337401).similarMovies),
    movies.get(explore(337401).reviews),
    movies.get(explore(337401).credits),
    movies.get(explore(337401).socialMedia),
  ];

  const convertDetails = () => {
    axios
      .all([req])
      .then(
        axios.spread((...responses) => {
          console.log('Details', responses);
        })
      )
      .catch((errors) => {
        console.log('Error', errors);
      });
  };

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  const displayRow = feature.map((movie) => {
    return (
      <Fragment key={movie.id}>
        <Card
          key={movie.id}
          image={`${image}${movie.poster_path}`}
          header={movie.title}
          meta={`Rating: ${movie.vote_average}`}
          description={truncate(movie.overview, 75)}
          raised={true}
          href={`/movie/${movie.id}`}
          movie={movie}
        />
        <Route path={`/movie/:id`} render={MovieDetails} />
      </Fragment>
    );
  });

  return <Card.Group itemsPerRow={5}>{displayRow}</Card.Group>;
};

export default test;
