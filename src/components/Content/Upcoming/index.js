import React, { useState, useEffect } from 'react';
import { movies, image } from '../../Content/Axios';
import { genre } from '../../Content/Request';

import { useHistory } from 'react-router-dom';

import { Grid, Image, Card, Icon, Segment} from 'semantic-ui-react';

import MovieList from '.'
import MovieDetails from '.';

const Upcoming = () => {
  const [feature, setFeature] = useState({
    showcase: {},
    films: [],
  });

  useEffect(() => {
    const getBanner = () => {
      movies.get(genre.animation).then((display) => {
        setFeature(display.data.results);
      });
    };
    getBanner();
  }, []);

  useEffect(() => {
    const getBanner = () => {
      movies.get(genre.discover).then((display) => {
        setFeature({
          showcase: display.data.results[
              Math.floor(Math.random() * display.data.results.length - 1)
            ],
          films: display.data.results,
        });
      });
    };
    getBanner();
  }, []);

  const {showcase, films} = feature;

  const truncate = (description, n) => {
    return description?.length > n ? description.substr(0, n - 1) + '...' : description;
  }

  const goToCardDetails = (id) => {
    localStorage.setItem('selectedCard', id);
    this.props.history.push('/movies');
  };

  const displayShowcase = (showcase) => {
    return (
      <Image
        key={showcase.id}
        src={`${image}${feature.showcase.poster_path}`}
        alt={showcase.name}
        size="small"
      />
    );
  };


  return (
    <>
      <Grid columns={3} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <iframe
                width="300"
                height="200"
                src="https://www.youtube-nocookie.com/embed/jV1v2Cy1w30"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>1</Segment>
            <Segment>2</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>1</Segment>
            <Segment>2</Segment>
            <Segment>3</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Upcoming;
