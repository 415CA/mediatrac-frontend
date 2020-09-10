import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { Container, Menu, Icon} from 'semantic-ui-react';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <Menu stackable secondary>
    {/* <Menu pointing secondary vertical> */}
    <Container>
      <Menu.Item header>
        <NavLink to={ROUTES.LANDING}>
          <Icon name="television" />
          MediaTrac
        </NavLink>
      </Menu.Item>

      <Menu.Item header>
        <NavLink to={ROUTES.HOME}>
          <Icon name="home" />
          Home
        </NavLink>
      </Menu.Item>

      {/* <Menu.Item header>
        <NavLink to={ROUTES.MOVIES}>
          <Icon name="video" />
          Movies
        </NavLink>
      </Menu.Item> */}

      <Menu.Item header>
        <NavLink to={ROUTES.UPCOMING}>
          <Icon name="star" />
          New Releases
        </NavLink>
      </Menu.Item>

      <Menu.Item header>
        <NavLink to={ROUTES.SEARCH}>
          <Icon name="search" />
          Search
        </NavLink>
      </Menu.Item>

      {/* <Menu.Item header>
        <NavLink to={ROUTES.WATCHED}>
          <Icon name="television" />
          Watched
        </NavLink>
      </Menu.Item> */}

      {authUser.roles.includes(ROLES.ADMIN) && (
        <Menu.Item header>
          <NavLink to={ROUTES.ADMIN}>Admin</NavLink>
        </Menu.Item>
      )}

      <Menu.Menu position="right">
        <Menu.Item header>
          <NavLink to={ROUTES.ACCOUNT}>
            <Icon name="address card" />
            Account
          </NavLink>
        </Menu.Item>
        <Menu.Item as="a" name="signOut">
          <SignOutButton />
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

const NavigationNonAuth = () => (
  <Menu stackable secondary>
    <Container>
      <Menu.Item header>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </Menu.Item>

      <Menu.Item header>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </Menu.Item>
    </Container>
  </Menu>
);

export default Navigation;
