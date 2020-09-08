import React, { useEffect, useState } from 'react';
import { axios, movies } from '../Axios';
import { explore } from '../Request';
import Slider from 'react-slick';
import Cast from './FilmCast';
import Crew from './FilmCrew';
import FilmDetailsMod from './FilmDetailsMod';
import Social from './FilmSocial';
import Description from './FilmDescription';
import Recommendations from './FilmRecommendations';
import { List, Grid, Header, Segment, Divider } from 'semantic-ui-react';
import Poster from './FilmPoster';
const { default: SimilarFilms } = require("./FilmSimilar")
const { default: ShowVideos } = require("./FilmVideo")
const { default: Review } = require("./FilmReview")

// {
//   details,
//     videos,
//     recommendations,
//     similarMovies,
//     reviews,
//     credits,
//     socialMedia;
// }
  // const {
  //   details,
  //   videos,
  //   recommendations,
  //   similarMovies,
  //   reviews,
  //   credits,
  //   socialMedia,
  // } = FilmData(this.props.match.params.id);


const Film = (props) => {
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
      const detailsObject = await axios
        .all([
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
            setDetails(responses[0].data);
            setVideos(responses[1].data);
            setRecommendations(responses[2].data);
            setSimilarMovies(responses[3].data);
            setReviews(responses[4].data);
            setCredits(responses[5].data);
            setSocialMedia(responses[6].data);
          })
        );
      return detailsObject;
    }
    details();
  }, []);

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

  const reviewSliderSettings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 1,
    swipeToSlide: true,
    adaptiveHeight: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  return (
    <div>
      <Segment>
        <Header details={details} />
        <Grid celled="internally" stackable columns={2}>
          <Grid.Row>
            <Grid.Column width={3}>
              <Poster details={details} />
            </Grid.Column>
            <Grid.Column width={10}>
              <h1>{details.title}</h1>
              <List borderless>
                <List.Item>
                  <FilmDetailsMod details={details} />
                </List.Item>
                <List.Item>
                  <Social details={details} socialMedia={socialMedia} />
                </List.Item>
                <Divider />
                <List.Item>
                  <Description details={details} />
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment>
        <Header as="h3" dividing>
          Similar Movies
        </Header>
        <Slider {...sliderSettings}>
          <SimilarFilms similarMovies={similarMovies} />
        </Slider>
        <Header as="h3" dividing>
          Recommended Movies
        </Header>
        <Slider {...sliderSettings}>
          <Recommendations recommendations={recommendations} />
        </Slider>
        <Header as="h3" dividing>
          Cast
        </Header>
        <Slider {...sliderSettings}>
          <Cast credits={credits} />
        </Slider>
        <Header as="h3" dividing>
          Crew
        </Header>
        <Slider {...sliderSettings}>
          <Crew credits={credits} />
        </Slider>
        <Header as="h3" dividing>
          Videos
        </Header>
        <Slider {...sliderSettings}>
          <ShowVideos videos={videos} details={details} />
        </Slider>
        <Header as="h3" dividing>
          Reviews
        </Header>
        <Slider {...reviewSliderSettings}>
          <Review reviews={reviews} />
        </Slider>
      </Segment>
    </div>
  );
};

export default Film; 