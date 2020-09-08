import React from 'react';
import { Container } from 'semantic-ui-react';

const Description = ({details}) => {
  return (
    <Container textAlign="justified">
      Description: {details.overview}
    </Container>
  )
}

export default Description; 