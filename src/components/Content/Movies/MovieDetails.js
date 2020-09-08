import React, { useEffect, useState, Fragment } from 'react';
import { axios, movies, image} from '../../Content/Axios';
import { explore, tmdbGenres } from '../../Content/Request';
import {
  Grid,
  Image,
  Header,
  Container,
  Embed,
  Comment,
  Card,
  Button,
  Icon,
  List,
  Segment,
  Menu,
  Divider,
  Accordion,
} from 'semantic-ui-react';
import Movies from '../Movies';
import { render } from '@testing-library/react';
import { renderComponent } from 'recompose';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

import Slider from 'react-slick';

const MovieDetails = (props) => {
  const tmdbID = props.match.params.id;
  
  const [details, setDetails] = useState({});
  const [videos, setVideos] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [similarMovies, setSimilarMovies] = useState({});
  const [reviews, setReviews] = useState({});
  const [credits, setCredits] = useState({});
  const [socialMedia, setSocialMedia] = useState({});

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
          );
        return detailObject
      }
        details();
    }, []);

    const truncate = (description, n) => {
      return description?.length > n
        ? description.substr(0, n - 1) + '...'
        : description;
    };

    let similarToRender;
    if (similarMovies.results) {
      similarToRender = similarMovies.results.map((movie) => {
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

    
    let videoToRender; 
    if (videos.results) {
      videoToRender = videos.results.slice(0, 10).map((movie) => {
        return (
          <Fragment key={movie.key}>
            <Header as='h5' >{truncate(movie.name, 30)}</Header>
            <Embed
              id={movie.key}
              placeholder={`${image}${details.backdrop_path}`}
              source="youtube"
              size="medium"
              hd={true}
            />
          </Fragment>
        );
      });
    }

    console.log(videos.results);

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
      castToRender = credits.cast.slice(0, 5).map((actor) => {
        return (
          <Card
            key={actor.id}
            image={`${image}${actor.profile_path}`}
            header={actor.name}
            description={ truncate(actor.character, 30) }
            raised={true}
          />
        );
      });
    }

    let crewToRender; 
    if (credits.crew) {
      crewToRender = credits.crew.slice(0, 5).map((crew) => {
        return (
          <div>
            <Card
              key={crew.id + crew.job}
              image={`${image}${crew.profile_path}`}
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
          <List compact borderless horizontal>
            <List.Item name="homepage" href={details.homepage}>
              <Icon name="linkify" circular />
              {/* Homepage */}
            </List.Item>

            <List.Item
              name="facebook"
              href={`http://facebook.com/${socialMedia.facebook_id}`}
            >
              <Icon name="facebook" circular />
              {/* Facebook */}
            </List.Item>

            <List.Item
              name="instagram"
              href={`http://instagram.com/${socialMedia.instagram_id}`}
            >
              <Icon name="instagram" circular />
              {/* Instagram */}
            </List.Item>

            <List.Item
              name="twitter"
              href={`http://twitter.com/${socialMedia.twitter_id}`}
            >
              <Icon name="twitter" circular />
              {/* Twitter */}
            </List.Item>
          </List>
        );
      }
    }

    const detailsToRender = () => {
      if (details) {

        return (
          <List compact borderless horizontal>
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
      afterChange: function (index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      },
    };

    const backgroundHeader = () => {
      return (
        <Container>
          <Header
            as="h1"
            inverted
            style={{
              width: 1024,
              height: 320,
              display: 'inline-block',
              opacity: 0.5,
              backgroundImage: `url(${image}${details.backdrop_path})`,
              backgroundSize: 'cover',
              // fontSize: mobile ? '2em' : '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              // marginTop: mobile ? '1.5em' : '3em',
            }}
          >
            {details.title}
          </Header>
        </Container>
      );
    }

    console.log(reviews.results);

    return (
      <div>
        {backgroundHeader()}
        <Grid celled="internally" stackable columns={2}>
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
              <List borderless>
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

        <Header as="h3" dividing>
          Similar Movies
        </Header>
        <Slider {...sliderSettings}>{similarToRender}</Slider>
        <Header as="h3" dividing>
          Cast
        </Header>
        <Slider {...sliderSettings}>{castToRender}</Slider>
        <Header as="h3" dividing>
          Crew
        </Header>
        <Slider {...sliderSettings}>{crewToRender}</Slider>
        <Header as="h3" dividing>
          Videos
        </Header>
        <Slider {...sliderSettings}>{videoToRender}</Slider>
        <Header as="h3" dividing>
          Comments
        </Header>
        <Slider {...commentSliderSettings}>{reviewToRender}</Slider>
      </div>
    );

};

export default MovieDetails;
