import React, { useState, useEffect } from 'react';
import { movies, image, axios } from '../Content/Axios';
import { genre } from '../Content/Request';

import { Image, Header, Container, Button, Icon } from 'semantic-ui-react';
import Slider from 'react-slick';


const Landing = () => {
  const [feature, setFeature] = useState({
    banner: {},
    data: [],
  });

  const [popular, setPopular] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    async function details() {
      const detailObject = await axios
        .all([
          movies.get(genre.popular),
          movies.get(genre.discover),
          movies.get(genre.upcoming),
          movies.get(genre.nowPlaying),
        ])
        .then(
          axios.spread((...responses) => {
            console.log('Responses', responses);
            setPopular(responses[0].data.results)
            setDiscover(responses[1].data.results)
            setUpcoming(responses[2].data.results)
            setNowPlaying(responses[3].data.results)
          })
        );
      return detailObject;
    }
    details();
  }, []);


  useEffect(() => {
    const getBanner = () => {
      movies.get(genre.trending).then((discover) => {
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
  console.log("Banner", banner);

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
          backgroundSize: 'cover',
          backgroundImage: `url(${image}${banner.backdrop_path})`,
          backgroundPosition: 'center center',
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
    );
  };

  const posters = (films) => {
    const allPosters = films.map((film) => {
      return (
        <Image
          key={film.id}
          src={`${image}${film.poster_path}`}
          as="a"
          size="small"
          href={`/movies/${film.id}`}
        />
      );
    });
    return allPosters;
  };

  const sliderSettings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  const categorySliders = (posters) => {
    return (
      <Slider key={posters.id} {...sliderSettings}>
        {posters}
      </Slider>
    );
  };

  return (
    <div>

      {displayBanner(banner)}

      <Header as="h3" dividing>
        Popular
      </Header>
      {categorySliders(posters(popular))}
      <Header as="h3" dividing>
        Now Playing
      </Header>
      {categorySliders(posters(nowPlaying))}
      <Header as="h3" dividing>
        Discover
      </Header>
      {categorySliders(posters(discover))}
      <Header as="h3" dividing>
        Upcoming
      </Header>
      {categorySliders(posters(upcoming))}
    </div>
  );
};

export default Landing;
