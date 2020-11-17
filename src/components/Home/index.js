import React, { Component } from 'react';
import { compose } from 'recompose';
import Movies from '../Content/Movies';
import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', (snapshot) => {
      this.setState({
        users: snapshot.val(),
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Movies />
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
