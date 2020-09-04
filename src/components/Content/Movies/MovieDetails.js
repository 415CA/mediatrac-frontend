import React, { useState, useEffect } from 'react';
import { movies, image } from '../Axios';
import { genre } from '../Request';
import { Grid, Image, Card, Icon } from 'semantic-ui-react';

const MovieDetails = () => (
  <div>
    <h1>MovieDetails</h1>
  </div>
);

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition)
)(MovieDetails);