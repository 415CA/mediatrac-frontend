import React, { useEffect, useState } from 'react';
import { axios, movies, image } from '../../Content/Axios';
import { explore } from '../../Content/Request';
// import { Grid, Image, Card, Icon } from 'semantic-ui-react';
import Movies from '../Movies';
import { render } from '@testing-library/react';
import { renderComponent } from 'recompose';


const MovieDetails = (props) => {
  const tmdbID = props.match.params.id;

    const [details, setDetails] = useState({});
    const [videos, setVideos] = useState({});
    const [recommendations, setRecommendations] = useState({});
    const [similarMovies, setSimilarMovies] = useState({});
    const [reviews, setReviews] = useState({});
    const [credits, setCredits] = useState({});
    const [socialMedia, setSocialMedia] = useState({});

    // useEffect(() => {
    //   async function details() {
    //     const detailObject = await axios.all(
    //       [
    //         movies.get(explore(tmdbID).details),
    //         movies.get(explore(tmdbID).videos),
    //         movies.get(explore(tmdbID).recommendations),
    //         movies.get(explore(tmdbID).similarMovies),
    //         movies.get(explore(tmdbID).reviews),
    //         movies.get(explore(tmdbID).credits),
    //         movies.get(explore(tmdbID).socialMedia),
    //       ])
    //       .then((display) => {
    //         setFilm(display);
    //       });
    //     return detailObject
    //   }
    //     details();
    // }, []);
    //   console.log(film);

    useEffect(() => {
      async function details() {
        const detailObject = await axios.all(
          [
            movies.get(explore(tmdbID).details),
            movies.get(explore(tmdbID).videos),
            movies.get(explore(tmdbID).recommendations),
            movies.get(explore(tmdbID).similarMovies),
            movies.get(explore(tmdbID).reviews),
            movies.get(explore(tmdbID).credits),
            movies.get(explore(tmdbID).socialMedia),
          ])
          .then(
            axios.spread((...responses) => {
              setDetails(responses[0].data)
              setVideos(responses[1].data)
              setRecommendations(responses[2].data)
              setSimilarMovies(responses[3].data)
              setReviews(responses[4].data)
              setCredits(responses[5].data)
              setSocialMedia(responses[6].data)
            })
            // (display) => setFilm(display)
          );
        return detailObject
      }
        details();
    }, []);


    return (
      <div>
        <h1>{details.title}</h1>
        <h1>Description</h1>
      </div>
    );

};

export default MovieDetails;
