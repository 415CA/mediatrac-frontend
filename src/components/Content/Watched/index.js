import React, { useState } from 'react';
import { List, Icon } from 'semantic-ui-react';
import { rails } from '../../Content/Axios';

const WatchedButton = (details) => {
  const [click, setClick] = useState(false);
  const [id, setId ] = useState(0)

  const deleteRequest = () => {
    rails.delete(`/movies/${id}`)
    .then((response) => console.log('Delete',response))
    setClick(false);
  }

  const postRequest = (details) => {
    rails
      .post('/movies', {
        tmdb_id: details.id,
        original_title: details.original_title,
        overview: details.overview,
        poster_path: details.poster_path,
      },)
      .then(response => {setId(response.data.id)});
      setClick(true);
  }

  const changeColor = (details) => {
    return click ? (
      <Icon
        name="thumbs down"
        circular
        color="red"
        onClick={() => deleteRequest(details)}
      />
    ) : (
      <Icon
        name="thumbs up"
        circular
        color="green"
        onClick={() => postRequest(details)}
      />
    );
  }

  return <List.Item name="add">{changeColor(details)}</List.Item>;
}


export default WatchedButton;
