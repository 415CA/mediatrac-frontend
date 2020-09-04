import React, { useState, useEffect } from 'react';
import { movies, image } from '../../Content/Axios';
import { genre } from '../../Content/Request';

import { useHistory } from 'react-router-dom';

import { Grid, Image, Card, Icon} from 'semantic-ui-react';

import MovieList from '.'
import MovieDetails from '.';

const Movies = () => {
  const [feature, setFeature] = useState([]);

  useEffect(() => {
    const getBanner = () => {
      movies.get(genre.animation).then((display) => {
        setFeature(display.data.results);
      });
    };
    getBanner();
  }, []);

  const truncate = (description, n) => {
    return description?.length > n ? description.substr(0, n - 1) + '...' : description;
  }

  const goToCardDetails = (id) => {
    localStorage.setItem('selectedCard', id);
    this.props.history.push('/movies');
  };

  

  const displayRow = feature.map((movie) => {
    console.log(movie);
    return (
      <>
        {/* <Image
        key={movie.id}
        src={`${image}${movie.poster_path}`}
        alt={movie.name}
        size="small"
      /> */}

        <Card
          key={movie.id}
          image={`${image}${movie.poster_path}`}
          header={movie.title}
          meta={`Rating: ${movie.vote_average}`}
          description={truncate(movie.overview, 75)}
          textAlign="center"
          raised={true}
        />
      </>
    );
  });

  return (
    <Card.Group itemsPerRow={5}>
      {displayRow}
    </Card.Group>
  )
};

export default Movies;
