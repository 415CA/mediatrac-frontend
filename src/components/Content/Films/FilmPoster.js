import React from 'react';
import { image } from '../Axios';
import { Image } from 'semantic-ui-react';


const Poster = (details) => {
  return (
    <Image src={`${image}${details.poster_path}`} size="medium" bordered />
  );

}

export default Poster; 