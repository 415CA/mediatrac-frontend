import { useEffect, useState } from 'react';
import { axios, movies } from '../Axios';
import { explore } from '../Request';
import Film from '.';


const FilmData = (props) => {
  const filmID = props.match.params.id;
  const [details, setDetails] = useState({});
  const [videos, setVideos] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [similarMovies, setSimilarMovies] = useState({});
  const [reviews, setReviews] = useState({});
  const [credits, setCredits] = useState({});
  const [socialMedia, setSocialMedia] = useState({});

  useEffect(() => {
    async function details() {
      const detailsObject = await axios.all(
        [
          movies.get(explore(filmID).details),
          movies.get(explore(filmID).videos),
          movies.get(explore(filmID).recommendations),
          movies.get(explore(filmID).similarMovies),
          movies.get(explore(filmID).reviews),
          movies.get(explore(filmID).credits),
          movies.get(explore(filmID).socialMedia),
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
        );
      return detailsObject
    }
      details();
  }, []);

  // export const data = {
  //   details,
  //   videos,
  //   recommendations,
  //   similarMovies,
  //   reviews,
  //   credits,
  //   socialMedia,
  // };

  return (
    <Film data={data} />
  );

}

export default FilmData; 