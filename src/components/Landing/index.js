import React, { useState, useEffect } from 'react';
import { movies, image } from '../Content/Axios';
import { genre } from '../Content/Request';

import { Grid, Image } from 'semantic-ui-react';

const Landing = () => {
  const [feature, setFeature] = useState({
    banner: {},
    data: [],
  });

  useEffect(() => {
    const getBanner = () => {
      movies.get(genre.discover).then((discover) => {
        setFeature({
          banner:
            discover.data.results[
              Math.floor(Math.random() * discover.data.results.length - 1)
            ],
          data: discover.data.results,
        });
      });
    };
    getBanner();
  }, []);

  const { banner, data } = feature;
  console.log(banner)

  const displayRow = data.map((movie) => {
    return (
      <Grid.Column width={4} key={movie.id}>
        <Image
          key={movie.id}
          src={`${image}${movie.poster_path}`}
          alt={movie.name}
        />
      </Grid.Column>
    );
  });

  return (
    <Grid centered >
      <Grid.Row>
        {displayRow}
      </Grid.Row>
    </Grid>
  );
};

export default Landing;
