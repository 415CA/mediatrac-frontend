import React, { useState, useEffect } from 'react';
import { axios, movies, image } from '../../Content/Axios';
import { genre, explore } from '../../Content/Request';

// import { useHistory } from 'react-router-dom';

import { Card } from 'semantic-ui-react';

// import MovieList from '.'
// import MovieDetails from '.';

const Movies = () => {
  const [feature, setFeature] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const request = await movies.get(genre.trending)
        .then((display) => {setFeature(display.data.results)});
      return request;
    }
    getMovies();
  }, []);

  movies.get(explore(337401).details).then(res => console.log('Mulan', res))

  // useEffect(() => {
  //   const getBanner = () => {
  //     movies.get(genre.animation).then((display) => {
  //       setFeature(display.data.results);
  //     });
  //   };
  //   getBanner();
  // }, []);

  const req = [
    movies.get(explore(337401).details),
    movies.get(explore(337401).videos),
    movies.get(explore(337401).recommendations),
    movies.get(explore(337401).similarMovies),
    movies.get(explore(337401).reviews),
    movies.get(explore(337401).credits),
    movies.get(explore(337401).socialMedia)
  ]

  axios.all([req]).then(axios.spread((...responses) => {
    console.log('Details', responses[0][0])
    console.log('Videos', responses)
    console.log(responses[2])
    console.log(responses[3])
    console.log(responses[4])
    console.log(responses[5])
    console.log(responses[6])
    console.log(responses[7])
  })).catch(errors => {
    console.log('Error', errors)
  })

  const truncate = (description, n) => {
    return description?.length > n ? description.substr(0, n - 1) + '...' : description;
  }  

  const displayRow = feature.map((movie) => {
    return (
        <Card
          key={movie.id}
          image={`${image}${movie.poster_path}`}
          header={movie.title}
          meta={`Rating: ${movie.vote_average}`}
          description={truncate(movie.overview, 75)}
          raised={true}
          // onClick={console.log(movie.id)}
          // render={}
        />
    );
  });

  return (
    <Card.Group itemsPerRow={5}>
      {displayRow}
    </Card.Group>
  )
};

export default Movies;
