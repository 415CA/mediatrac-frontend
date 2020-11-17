import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import * as ROUTES from '../../constants/routes';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Movies from '../Content/Movies';
import MovieDetails from '../Content/Movies/MovieDetails';
import Search from '../Content/Search/';
import Upcoming from '../Content/Upcoming';
import HomePage from '../Home';
import LandingPage from '../Landing';
import Navigation from '../Navigation';
import PasswordForgetPage from '../PasswordForget';
import { withAuthentication } from '../Session';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';

const App = () => (
  <Container>
    <Router>
      <div>

            <Navigation />

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
            <Route exact path={ROUTES.SEARCH} component={Search} />
            <Route exact path={ROUTES.UPCOMING} component={Upcoming} />

      </div>
    </Router>
  </Container>
);

export default withAuthentication(App);
