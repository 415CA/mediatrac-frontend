import React, { useState, useEffect, Fragment } from 'react';
import { movies, image, rails } from '../../Content/Axios';
import { genre } from '../../Content/Request';
// import { Route } from 'react-router-dom';

import DeleteButton from '.';

import { Card, Header, Image, Button } from 'semantic-ui-react';

const Movies = () => {
  const [feature, setFeature] = useState([]);

  // useEffect(() => {
  //   async function getMovies() {
  //     const request = await movies.get(genre.trending).then((display) => {
  //       setFeature(display.data.results);
  //     });
  //     return request;
  //   }
  //   getMovies();
  // }, []);

  useEffect(() => {
    async function getMovies() {
      const request = await rails.get('/movies').then((display) => {
        // setFeature(display.data.results);
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

const movieDetails = (movie) => {
  localStorage.setItem('selectedMovie', movie);
};

  // const displayRow = feature.map((movie) => {
  //   return (
  //     <Card
  //       key={movie.id}
  //       image={`${image}${movie.poster_path}`}
  //       header={movie.title}
  //       meta={`Rating: ${movie.vote_average}`}
  //       description={truncate(movie.overview, 75)}
  //       raised={true}
  //       href={`/movies/${movie.id}`}
  //       movie={movie}
  //       onClick={movieDetails(movie.id)}
  //     />
  //   );
  // });

  // const deleteRequest = (movie) => {
  //   rails
  //   .delete(`/movies/${movie.id}`)
  //   .then((response) => {
  //     debugger
  //     displayRow(response)});
  // };

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

  const displayRow = (feature) => {
    let featureCards = feature.map((movie) => {
      return (
        <>
          {/* <Card
            key={movie.tmdb_id}
            image={`${image}${movie.poster_path}`}
            header={movie.original_title}
            description={truncate(movie.overview, 75)}
            raised={true}
            href={`/movies/${movie.tmdb_id}`}
            movie={movie}
            // onClick={movieDetails(movie.tmdb_id)}
          /> */}

          <Card key={movie.tmdb_id}>
            <Image src={`${image}${movie.poster_path}`} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{movie.original_title}</Card.Header>
              <Card.Meta>
                <span>{truncate(movie.overview, 75)}</span>
              </Card.Meta>
            </Card.Content>
            <Card.Content extra>
              {/* <Form> */}
                <Button basic color="red" onClick={() => deleteCard(movie)}>
                  Remove
                </Button>
              {/* </Form> */}
              {/* <DeleteButton movie={movie} deleteRequest={deleteRequest()} /> */}
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
