import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import { withAuthorization, withEmailVerification } from '../../Session';

import * as ROUTES from '../../../constants/routes';

import { movies } from '../Axios';
import { genre } from '../Request';

// import { Grid, Image } from 'semantic-ui-react';


const MoviePage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    <Switch>
      <Route exact path={ROUTES.MOVIE_DETAILS} component={MovieItem} />
      <Route exact path={ROUTES.ADMIN} component={MovieList} />
    </Switch>
  </div>
);

const MoviePage = () => {
  const [feature, setFeature] = useState({
    banner: {},
    data: [],
  });

    useEffect(() => {
      const getBanner = () => {
        movies.get(genre.discover).then((discover) => {
          setFeature({
            banner:
              discover.data.results[
                Math.floor(Math.random() * discover.data.results.length - 1)
              ],
            data: discover.data.results,
          });
        });
      };
      getBanner();
    }, []);

    return (
      <div>
        <h2>Movies</h2>
        <ul>
          <span>
            {/* <Link to={`${ROUTES.MOVIE_DETAILS}/${id}`}>Details</Link> */}
          </span>
        </ul>
      </div>
    );
  
}

const MovieItem = ({ match }) => (
  <div>
    <h2>Movie ({match.params.id})</h2>
  </div>
);

const condition = (authMovie) => !!authMovie;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition)
)(MoviePage);