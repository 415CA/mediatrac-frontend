import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import Movies from '../Content/Movies';
import Favorites from '../Content/Favorites';
import Watched from '../Content/Watched';
import Upcoming from '../Content/Upcoming';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import { Container } from 'semantic-ui-react';
import MovieDetails from '../Content/Movies/MovieDetails';

const App = () => (
  <Container >
    <Router>
      <div>
        <Navigation />
        <hr />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          exact
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route exact path={ROUTES.ADMIN} component={AdminPage} />

        <Route exact path={ROUTES.MOVIES} component={Movies} />
        <Route exact path={ROUTES.MOVIE_DETAILS} component={MovieDetails} />
        <Route exact path={ROUTES.FAVORITES} component={Favorites} />
        <Route exact path={ROUTES.WATCHED} component={Watched} />
        <Route exact path={ROUTES.UPCOMING} component={Upcoming} />
      </div>
    </Router>
  </Container>
);

export default withAuthentication(App);
