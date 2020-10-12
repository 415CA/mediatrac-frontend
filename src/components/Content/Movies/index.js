import React, { useState, useEffect, Fragment } from 'react';
import { image, rails } from '../../Content/Axios';

import { Card, Header, Image, Button } from 'semantic-ui-react';
import MovieDetails from './MovieDetails';

import { useHistory } from 'react-router-dom';

const Movies = () => {
  const [feature, setFeature] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const request = await rails.get('/movies').then((display) => {
        setFeature(display.data);
      });
      return request;
    }
    getMovies();
  }, []);

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  const deleteCard = (movie) => {
    rails.delete(`/movies/${movie.id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);

        const posts = feature.filter((item) => item.id !== movie.id);
        setFeature(posts);
        displayRow(feature);
      });
  }

  const history = useHistory();

  const handleOnSubmit = (movie) => {
    history.push(`/movies/${movie.tmdb_id}`);
  };

  const displayRow = (feature) => {
    let featureCards = feature.map((movie) => {
      return (
        <>
          <Card key={movie.tmdb_id} raised>
            <Image
              src={`${image}${movie.poster_path}`}
              wrapped
              ui={false}
              href={`/movies/${movie.tmdb_id}`}
            />
            <Card.Content>
              <Card.Header textAlign="center">{movie.original_title}</Card.Header>
              <Card.Meta>
                <span>{truncate(movie.overview, 75)}</span>
              </Card.Meta>
            </Card.Content>
            <Card.Content extra inline>
              <Button
                icon="trash alternate outline"
                size="tiny"
                color="red"
                onClick={() => deleteCard(movie)}
              />
              {/* Remove
              </Button> */}
              <Button
                size="tiny"
                color="blue"
                onClick={() => handleOnSubmit(movie)}
              >
                Details
              </Button>
            </Card.Content>
          </Card>
        </>
      );
    });
    return featureCards;
  }

  return (
    <Fragment>
      <Header>My Movies</Header>
      <Card.Group itemsPerRow={5}>{displayRow(feature)}</Card.Group>
    </Fragment>
  );
};

export default Movies;
