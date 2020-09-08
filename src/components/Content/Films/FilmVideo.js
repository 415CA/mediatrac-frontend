import React, { Fragment } from 'react';
import { image } from '../Axios';
import { Header, Embed,} from 'semantic-ui-react';

const ShowVideos = ({videos, details}) => {
  let videoToRender;

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  if (videos.results) {
    videoToRender = videos.results.slice(0, 10).map((movie) => {
      return (
        <Fragment key={movie.key}>
          <Header as="h5">{truncate(movie.name, 30)}</Header>
          <Embed
            id={movie.key}
            placeholder={`${image}${details.backdrop_path}`}
            source="youtube"
            size="medium"
            hd={true}
          />
        </Fragment>
      );
    });
  }

  return videoToRender

}

export default ShowVideos;
