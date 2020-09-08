import React, { useState, useEffect } from 'react';
import { movies, image } from '../Content/Axios';
import { genre } from '../Content/Request';

import { Grid, Image, Container, Header } from 'semantic-ui-react';

const Landing = () => {
  const [feature, setFeature] = useState({
    banner: {},
    data: [],
  });

  useEffect(() => {
    const getBanner = () => {
      movies.get(genre.family).then((discover) => {
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

    const truncate = (description, n) => {
      return description?.length > n
        ? description.substr(0, n - 1) + '...'
        : description;
    };

  const displayBanner = (banner) => {

    return (
      // <Container>
      //   <Header
      //     as="h1"
      //     inverted
      //     style={{
      //       width: 1024,
      //       height: 700,
      //       display: 'inline-block',
      //       // opacity: 0.5,
      //       backgroundImage: `url(${image}${banner.backdrop_path})`,
      //       backgroundSize: 'cover',
      //       fontSize: '4em',
      //       fontWeight: 'normal',
      //       marginBottom: 0,
      //       marginTop: '3em',
      //     }}
      //   >
      //     Hello World
      //   </Header>
      // </Container>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${image}${banner.backdrop_path})`,
          backgroundPosition: "center center",
        }}
      >
      <div className="banner__contents">
        <h1 className="banner__title">
          {banner?.title || banner?.name || banner?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button">Add to Favorite</button>
          <button className="banner__button">Add to Watched</button>
        </div>

        <h1 className="banner__description">
          {truncate(banner?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>

      // <Container>
      //     <Image src={`${image}${banner.backdrop_path}`} fluid />
      // </Container>
    );
  }

  // const displayRow = data.map((movie) => {
  //   return (
  //     <Grid.Column width={4} key={movie.id}>
  //       <Image
  //         key={movie.id}
  //         src={`${image}${movie.poster_path}`}
  //         alt={movie.name}
  //       />
  //     </Grid.Column>
  //   );
  // });

  return (
    <div>
      {displayBanner(banner)}
      {/* <Grid centered>
        <Grid.Row>{displayRow}</Grid.Row>
      </Grid> */}
    </div>
  );
};

export default Landing;
