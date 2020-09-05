import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
// import Search from '../Content/Search'

import { Container, Menu, Input} from 'semantic-ui-react';


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
        <Link to={ROUTES.LANDING}>Landing</Link>
      </Menu.Item>

      <Menu.Item header>
        <Link to={ROUTES.HOME}>Home</Link>
      </Menu.Item>

      <Menu.Item header>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </Menu.Item>

      <Menu.Item header>
        <Link to={ROUTES.MOVIES}>Movies</Link>
      </Menu.Item>

      <Menu.Item header>
        <Link to={ROUTES.FAVORITES}>Favorites</Link>
      </Menu.Item>

      <Menu.Item header>
        <Link to={ROUTES.WATCHED}>Watched</Link>
      </Menu.Item>

      <Menu.Item header>
        <Link to={ROUTES.UPCOMING}>Upcoming</Link>
      </Menu.Item>

      {authUser.roles.includes(ROLES.ADMIN) && (
        <Menu.Item header>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </Menu.Item>
      )}

      <Menu.Menu position="right">
        <Menu.Item>
          <Input className="icon" icon="search" placeholder="Search..." />
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
