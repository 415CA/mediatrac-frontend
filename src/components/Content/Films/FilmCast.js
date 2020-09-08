import React, { Fragment } from 'react';
import { Card } from 'semantic-ui-react';
import { image } from '../Axios';

const Cast = ({credits}) => {
  let castToRender;

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  if (credits.cast) {
    castToRender = credits.cast.slice(0, 5).map((actor) => {
      return (
        <Fragment>
          <Card
            key={actor.id}
            image={`${image}${actor.profile_path}`}
            header={actor.name}
            description={truncate(actor.character, 30)}
            raised={true}
          />
        </Fragment>
      );
    });
  }
  return castToRender; 
}

export default Cast; 