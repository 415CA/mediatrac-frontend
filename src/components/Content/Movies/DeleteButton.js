import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

const DeleteButton = (props) => {
  const [click, setClick] = useState(false);
  const [movie, deleteRequest ] = props

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
