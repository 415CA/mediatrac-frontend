import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import { List } from 'semantic-ui-react';
import HomepageList from '.'
import { rails } from '../Content/Axios';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      movies: [],
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', (snapshot) => {
      this.setState({
        users: snapshot.val(),
      });
    });

    rails.get('/movies')
    .then(response => {
      console.log(response); 
      this.state.movies = response.data; 
    })
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }


  render() {
    return (
      <div>
        <h1>Home Page</h1>
        {/* <HomepageList movies={this.state.movies} /> */}
      </div>
    );
  }
}

const condition = (authUser) =>!!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
