import React from 'react';
import Social from './FilmSocial';

const { Segment, List, Divider} = require('semantic-ui-react');
const { default: Details } = require('./FilmDetails');
const { default: Description } = require('./FilmDescription');

const FilmDetailsMod = ({details, socialMedia}) => {
  return (
    <Segment>
      <h1>{details.title}</h1>
      <List borderless>
        <List.Item>
          <Details details={details} />
        </List.Item>
        <List.Item>
          <Social details={details} socialMedia={socialMedia} />
        </List.Item>
        <Divider />
        <List.Item>
          <Description details={details} />
        </List.Item>
      </List>
    </Segment>
  );
};

export default FilmDetailsMod; 