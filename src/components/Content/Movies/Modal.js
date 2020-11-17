import React from 'react';
import { Embed, Header, Image, Modal } from 'semantic-ui-react';
import { image } from '../../Content/Axios';


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
      </Modal.Content>
      <Modal.Actions>
        <Image
          size="medium"
          src={`${image}${details.backdrop_path}`}
          onClick={() => setOpen(false)}
        />
      </Modal.Actions>
    </Modal>
  );

}

export default VideoModal; 