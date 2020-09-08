import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import Search from '../Content/Search'

import { Container, Menu} from 'semantic-ui-react';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <Menu secondary>
    <Container>
      <Menu.Item header>
        <NavLink to={ROUTES.LANDING}>Landing</NavLink>
      </Menu.Item>

      <Menu.Item header>
        <NavLink to={ROUTES.HOME}>Home</NavLink>
      </Menu.Item>

      <Menu.Item header>
        <NavLink to={ROUTES.ACCOUNT}>Account</NavLink>
      </Menu.Item>

      <Menu.Item header>
        <NavLink to={ROUTES.MOVIES}>Movies</NavLink>
      </Menu.Item>

      <Menu.Item header>
        <NavLink to={ROUTES.FAVORITES}>Favorites</NavLink>
      </Menu.Item>

      <Menu.Item header>
        <NavLink to={ROUTES.WATCHED}>Watched</NavLink>
      </Menu.Item>

      <Menu.Item header>
        <NavLink to={ROUTES.UPCOMING}>Upcoming</NavLink>
      </Menu.Item>

      {authUser.roles.includes(ROLES.ADMIN) && (
        <Menu.Item header>
          <NavLink to={ROUTES.ADMIN}>Admin</NavLink>
        </Menu.Item>
      )}

      <Menu.Menu position="right">
        <Menu.Item>
          <Search className="icon" icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Item as="a" name="signOut">
          <SignOutButton />
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

const NavigationNonAuth = () => (
  <Menu>
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
