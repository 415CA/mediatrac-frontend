import React, { Fragment, useEffect, useState } from 'react';
import Slider from 'react-slick';
import {
  Card, Comment, Container,
  Divider, Embed, Grid,
  Header,
  Icon, Image,
  List,
  Modal
} from 'semantic-ui-react';
import { axios, image, movies, nytimes } from '../../Content/Axios';
import { explore, nytreviews } from '../../Content/Request';
import WatchedButton from '../Watched';


const MovieDetails = (props) => {
  const tmdbID = props.match.params.id;
  
  const [details, setDetails] = useState({});
  const [videos, setVideos] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [similarMovies, setSimilarMovies] = useState({});
  const [reviews, setReviews] = useState({});
  const [credits, setCredits] = useState({});
  const [socialMedia, setSocialMedia] = useState({});
  const [nyTimesReview, setNYTimesReview] = useState({});

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
            nytimes
              .get(nytreviews(responses[0].data.title))
              .then((response) => {
                setNYTimesReview(
                  filterReview(responses[0].data.title, response.data.results)
                );
              });
          })
        );
      return detailObject
    }
      details();
  }, [tmdbID]);

  useEffect(() => {
    async function getNYT() {
      const request = await nytimes
        .get(nytreviews(details.title))
        .then((response) => {
          setNYTimesReview(
            filterReview(details.title, response.data.results)
          );
        });
      return request;
    }
    getNYT();
  }, [details.title]);

  const filterReview = (title, reviews) => {
    return reviews.filter((review) => review.display_title === title)[0];
  }

  const displayNYT = (nyTimesReview) => {
    if (nyTimesReview) {
      return (
        <Fragment key={nyTimesReview.headline}>
          <Header as="h3" dividing>
            NY Times Review
          </Header>
          <Comment key={nyTimesReview.headline}>
            <Comment.Content>
              <Comment.Author>{nyTimesReview.byline}</Comment.Author>
              <Comment.Text>
                <b>{nyTimesReview.headline}</b>
                <br></br>
                {nyTimesReview.summary_short}
              </Comment.Text>
            </Comment.Content>
          </Comment>
        </Fragment>
      );
    }
  }

    const truncate = (description, n) => {
      return description?.length > n
        ? description.substr(0, n - 1) + '...'
        : description;
    };

    const poster = (movie) => `${image}${movie.poster_path}`;

    const selectImage = (picture) => {
      return picture ? picture : 'https://flixdetective.com/web/images/poster-placeholder.png'; 
    }

    let similarToRender;
    if (similarMovies.results) {
      similarToRender = similarMovies.results.map((movie) => {
        return (
          <Image
            key={movie.id}
            src={selectImage(poster(movie))}
            as="a"
            size="small"
            href={`/movies/${movie.id}`}
          />
        );
      });
    }

    let videoToRender; 
    if (videos.results) {
      videoToRender = videos.results.slice(0, 10).map((movie) => {
        return (
          <Fragment key={movie.key}>
            <Header as="h5">{truncate(movie.name, 30)}</Header>
            <Modal
              trigger={
                <Image src={`${image}${details.backdrop_path}`} size="medium" />
              }
              header={truncate(movie.name, 30)}
              content={
                <Embed
                  id={movie.key}
                  placeholder={`${image}${details.backdrop_path}`}
                  source="youtube"
                  size="medium"
                  hd={true}
                  icon="video play"
                />
              }
            />
          </Fragment>
        );
      });
    }

    const recommendationsSlider = (recommendations) => {
      let recommendationsToRender
  
      if (recommendations.results) {
        recommendationsToRender = recommendations.results.map((movie) => {
          return (
            <Image
              key={movie.id}
              src={`${image}${movie.poster_path}`}
              as="a"
              size="small"
              href={`/movies/${movie.id}`}
            />
          );
        });
      }
      return recommendationsToRender;
    };

    let reviewToRender;
    if (reviews.results) {
      reviewToRender = reviews.results.map((review) => {
        return (
          <Comment key={review.id}>
            <Comment.Content>
              <Comment.Author as="a" href={review.url}>
                {review.author}
              </Comment.Author>
              <Comment.Text>{truncate(review.content, 800)}</Comment.Text>
            </Comment.Content>
          </Comment>
        );
      });
    }
    
    let castToRender; 
    if (credits.cast) {
      castToRender = credits.cast.slice(0, 10).map((actor) => {
        return (
          <Card
            key={actor.id}
            image={
              actor.profile_path
                ? `${image}${actor.profile_path}`
                : 'https://flixdetective.com/web/images/poster-placeholder.png'
            }
            header={actor.name}
            description={truncate(actor.character, 30)}
            raised={true}
          />
        );
      });
    }

    let crewToRender; 
    if (credits.crew) {
      crewToRender = credits.crew.slice(0, 10).map((crew) => {
        return (
          <div key={crew.id + crew.job}>
            <Card
              key={crew.id + crew.job}
              image={
                crew.profile_path
                  ? `${image}${crew.profile_path}`
                  : 'https://flixdetective.com/web/images/poster-placeholder.png'
              }
              header={crew.name}
              description={crew.job}
              raised={false}
            />
          </div>
        );
      });
    }

    const socialMediaToRender = () => {
      if (socialMedia) {
        return (
          <List horizontal>
            <List.Item
              name="homepage"
              onClick={() => window.open(details.homepage, '_blank')}
            >
              <Icon name="linkify" circular />
            </List.Item>

            <List.Item
              name="facebook"
              onClick={() =>
                window.open(
                  `http://facebook.com/${socialMedia.facebook_id}`,
                  '_blank'
                )
              }
            >
              <Icon name="facebook" circular />
            </List.Item>

            <List.Item
              name="instagram"
              onClick={() =>
                window.open(
                  `http://instagram.com/${socialMedia.instagram_id}`,
                  '_blank'
                )
              }
            >
              <Icon name="instagram" circular />
            </List.Item>

            <List.Item
              name="twitter"
              onClick={() =>
                window.open(
                  `http://twitter.com/${socialMedia.twitter_id}`,
                  '_blank'
                )
              }
            >
              <Icon name="twitter" circular />
            </List.Item>
            {WatchedButton(details)}
          </List>
        );
      }
    }

    const detailsToRender = () => {
      if (details) {

        return (
          <List horizontal>
            <List.Item>
              <List.Content>
                <List.Header>Release Date</List.Header>
                <Icon name="calendar outline" />
                {details.release_date}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Runtime</List.Header>
                <Icon name="clock outline" />
                {details.runtime} mins
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>User Score</List.Header>
                <Icon name="user outline" />
                {details.vote_average}
              </List.Content>
            </List.Item>
          </List>
        );
      }
    }


    const sliderSettings = {
      className: "center",
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 5,
      swipeToSlide: true,
      dots: true,
            responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ],

      afterChange: function(index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      }
      
    };

    const commentSliderSettings = {
      className: 'center',
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 1,
      swipeToSlide: true,
      adaptiveHeight: true,
      dots: true,

      afterChange: function (index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      },
    };

    const backgroundHeader = () => {
      return (
        <Container fluid>
          <Header
            as="h1"
            inverted
            style={{
              width: 1024,
              height: 420,
              display: 'inline-block',
              backgroundImage: `url(${image}${details.backdrop_path})`,
              backgroundSize: 'cover',
              fontWeight: 'normal',
              marginBottom: 0,
            }}
          >
            {/* {details.title} */}
          </Header>
        </Container>
      );
    }

    return (
      <div>
        {backgroundHeader()}
        <Grid celled="internally" stackable={true} columns={2}>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image
                src={`${image}${details.poster_path}`}
                size="medium"
                bordered
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <h1>{details.title}</h1>
              <List>
                <List.Item>{detailsToRender()}</List.Item>
                <List.Item>{socialMediaToRender()}</List.Item>
                <Divider />
                <List.Item>
                  <Container textAlign="justified">
                    Description: {details.overview}
                  </Container>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {displayNYT(nyTimesReview)}
        <Header as="h3" dividing>
          User Reviews
        </Header>
        <Slider {...commentSliderSettings}>{reviewToRender}</Slider>
        <Header as="h3" dividing>
          Cast
        </Header>
        <Slider {...sliderSettings}>{castToRender}</Slider>
        <Header as="h3" dividing>
          Crew
        </Header>
        <Slider {...sliderSettings}>{crewToRender}</Slider>
        <Header as="h3" dividing>
          Similar Movies
        </Header>
        <Slider {...sliderSettings}>{similarToRender}</Slider>
        <Header as="h3" dividing>
          Recommended Movies
        </Header>
        <Slider {...sliderSettings}>
          {recommendationsSlider(recommendations)}
        </Slider>
        <Header as="h3" dividing>
          Videos
        </Header>
        <Slider {...sliderSettings}>{videoToRender}</Slider>
      </div>
    );

};

export default MovieDetails;
