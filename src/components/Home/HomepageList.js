import React from 'react';
import { Image, List } from 'semantic-ui-react';
import { image } from '../Content/Axios';

const HomepageList = (props) => (

    this.props.map((movie) => {
      return (
        <List.Item key={movie.tmdb_id}>
          <Image src={`${image}${movie.poster_path}`} />
          <List.Content>
          <h3>{movie.tmdb_id}</h3>
          <h3>{movie.overview}</h3>
            <List.Header>{movie.original_title}</List.Header>
          </List.Content>
        </List.Item>
      );
    })
  // </List>
  
);

export default HomepageList;