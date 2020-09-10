import React, { useState } from 'react';
import { List, Icon } from 'semantic-ui-react';
import { rails } from '../../Content/Axios';

const DeleteButton = (props) => {
  const [click, setClick] = useState(false);
  const [movie, deleteRequest ] = props


  // const deleteRequest = (movie) => {
  //   rails
  //   .delete(`/movies/${movie.id}`)
  //   .then((response) => displayRow(response));
  // };

  const changeColor = (movie) => {
    return click ? (
      <Icon
        name="add"
        circular
        color="red"
        onClick={() => deleteRequest(movie)}
      />
    ) : (
      null
    );
  };

  return {changeColor(movie)};
};

export default DeleteButton;
