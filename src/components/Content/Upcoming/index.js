import React, { useEffect, useState } from 'react';
import { axios, movies, image } from '../../Content/Axios';
import { genre } from '../../Content/Request';
import {

  Image,
  Header,
} from 'semantic-ui-react';

// import { useHistory } from 'react-router-dom';

import Slider from 'react-slick';
import { componentFromStreamWithConfig } from 'recompose';

const Upcoming = () => {
  // const [feature, setFeature] = useState([]);
  const [action, setAction] = useState([]);
  const [adventure, setAdventure] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [documentary, setDocumentary] = useState([]);
  const [drama, setDrama] = useState([]);
  const [family, setFamily] = useState([]);
  const [horror, setHorror] = useState([]);
  const [romance, setRomance] = useState([]);
  const [scienceFiction, setScienceFiction] = useState([]);
  const [thriller, setThriller] = useState([]);
  const [trending, setTrending] = useState([]);
  // const [popular, setPopular] = useState([]);
  // const [discover, setDiscover] = useState([]);
  // const [upcoming, setUpcoming] = useState([]);
  // const [nowPlaying, setNowPlaying] = useState([]);

  // const categories = [
  //   action,
  //   adventure,
  //   animation,
  //   comedy,
  //   documentary,
  //   drama,
  //   family,
  //   horror,
  //   romance,
  //   scienceFiction,
  //   thriller,
  //   trending,
  //   popular,
  //   discover,
  //   upcoming,
  //   nowPlaying,
  // ];

  // useEffect(() => {
  //   const getBanner = () => {
  //     movies.get(genre.family).then((display) => {
  //       setFeature(display.data.results);
  //     });
  //   };
  //   getBanner();
  // }, []);

  useEffect(() => {
    async function details() {
      const detailObject = await axios
        .all([
          movies.get(genre.action),
          movies.get(genre.adventure),
          movies.get(genre.animation),
          movies.get(genre.comedy),
          movies.get(genre.documentary),
          movies.get(genre.drama),
          movies.get(genre.family),
          movies.get(genre.horror),
          movies.get(genre.romance),
          movies.get(genre.scienceFiction),
          movies.get(genre.thriller),
          movies.get(genre.trending),
          // movies.get(genre.popular),
          // movies.get(genre.discover),
          // movies.get(genre.upcoming),
          // movies.get(genre.nowPlaying),
        ])
        .then(
          axios.spread((...responses) => {
            console.log('Responses', responses);
            setAction(responses[0].data.results);
            setAdventure(responses[1].data.results);
            setAnimation(responses[2].data.results);
            setComedy(responses[3].data.results);
            setDocumentary(responses[4].data.results);
            setDrama(responses[5].data.results);
            setFamily(responses[6].data.results);
            setHorror(responses[7].data.results);
            setRomance(responses[8].data.results);
            setScienceFiction(responses[9].data.results);
            setThriller(responses[10].data.results);
            setTrending(responses[11].data.results);
            // setDiscover(responses[13].data.results)
            // setPopular(responses[12].data.results)
            // setUpcoming(responses[14].data.results)
            // setNowPlaying(responses[15].data.results)
          })
        );
      return detailObject;
    }
    details();
  }, []);

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  // const createCard =
  //   feature.map((movie) => {
  //     return (
  //       <>
  //         <Card
  //           key={movie.id}
  //           image={`${image}${movie.poster_path}`}
  //           header={movie.title}
  //           meta={`Rating: ${movie.vote_average}`}
  //           description={truncate(movie.overview, 75)}
  //           raised={true}
  //         />
  //       </>
  //     );
  //   });

  // const sliderPosters = (category) => {
  //   category.map((movie) => {
  //     return (
  //       <Image
  //         key={movie.id}
  //         src={`${image}${movie.poster_path}`}
  //         as="a"
  //         size="small"
  //         href={`/movies/${movie.id}`}
  //       />
  //     );
  //   });
  // };

  // let actionToRender;
  // if (action) {
  //   actionToRender = action.map((movie) => {
  //     return (
  //       <Image
  //         key={movie.id}
  //         src={`${image}${movie.poster_path}`}
  //         as="a"
  //         size="small"
  //         href={`/movies/${movie.id}`}
  //       />
  //     );
  //   });
  // }

  console.log(action)

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
      )
    });
    return allPosters
  };

  // const displayGenres = (film) => {
  //   if ()
  // }

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

  // const displayPosterSlider = (category) => {
  //   return categorySliders(posters(category))
  // }

  console.log('Action', action);
  console.log('Drama', drama);

  return (
    <div>
      <Header as="h3" dividing>
        Action
      </Header>
      {categorySliders(posters(action))}
      <Header as="h3" dividing>
        Adventure
      </Header>
      {categorySliders(posters(adventure))}
      <Header as="h3" dividing>
        Animation
      </Header>
      {categorySliders(posters(animation))}
      <Header as="h3" dividing>
        Comedy
      </Header>
      {categorySliders(posters(comedy))}
      <Header as="h3" dividing>
        Documentary
      </Header>
      {categorySliders(posters(documentary))}
      <Header as="h3" dividing>
        Drama
      </Header>
      {categorySliders(posters(drama))}
      <Header as="h3" dividing>
        Family
      </Header>
      {categorySliders(posters(family))}
      <Header as="h3" dividing>
        Horror
      </Header>
      {categorySliders(posters(horror))}
      <Header as="h3" dividing>
        Romance
      </Header>
      {categorySliders(posters(romance))}
      <Header as="h3" dividing>
        Science Fiction
      </Header>
      {categorySliders(posters(scienceFiction))}
      <Header as="h3" dividing>
        Thriller
      </Header>
      {categorySliders(posters(thriller))}
      <Header as="h3" dividing>
        Trending
      </Header>
      {categorySliders(posters(trending))}
      {/* {categorySliders(posters(popular))}
      {categorySliders(posters(discover))}
      {categorySliders(posters(upcoming))}
      {categorySliders(posters(nowPlaying))} */}
    </div>
  );
};

export default Upcoming;
