import React from 'react';
import { List, Icon } from 'semantic-ui-react';

const Details = ({details}) => {

  if (details) {
    return (
      <List compact borderless horizontal>
        <List.Item>
          <List.Content>
            <List.Header>Release Date</List.Header>
            <Icon name="calendar outline" />
            {details.release_date}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Runtime</List.Header>
            <Icon name="clock outline" />
            {details.runtime} mins
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>User Score</List.Header>
            <Icon name="user outline" />
            {details.vote_average}
          </List.Content>
        </List.Item>
      </List>
    );
  }
};

export default Details; 
