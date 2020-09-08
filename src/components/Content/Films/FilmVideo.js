import { useEffect, useState, Fragment } from 'react';
import { axios, movies, image } from '../Axios';
import { explore, tmdbGenres } from '../Request';
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

const ShowVideos = (videos) => {
  let videoToRender;

  if (videos.results) {
    videoToRender = videos.results.slice(0, 10).map((movie) => {
      return (
        <Fragment key={movie.key}>
          <Header as="h5">{truncate(movie.name, 30)}</Header>
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

  return videoToRender

}

export default ShowVideos;
