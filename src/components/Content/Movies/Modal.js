import React, { useEffect, useState, Fragment } from 'react';
import { axios, movies, image, nytimes } from '../../Content/Axios';
import { explore, nytreviews } from '../../Content/Request';
import { Modal, Button, Image, Header, Embed } from 'semantic-ui-react';

import WatchedButton from '../Watched';
import Slider from 'react-slick';

const VideoModal = (movie, details) => {
  const [open, setOpen] = React.useState(false);

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Image />}
    >
      <Modal.Header>Upload image</Modal.Header>
      <Modal.Content>
        <Header as="h5">{truncate(movie.name, 30)}</Header>
        <Embed
          id={movie.key}
          placeholder={`${image}${details.backdrop_path}`}
          source="youtube"
          size="medium"
          hd={true}
        />
        <Modal.Description>
          <p>Would you like to upload this image?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Image
          size="medium"
          src={`${image}${details.backdrop_path}`}
          onClick={() => setOpen(false)}
        />
        {/* <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)} positive>
                Ok
              </Button> */}
      </Modal.Actions>
    </Modal>
  );

}

export default VideoModal; 