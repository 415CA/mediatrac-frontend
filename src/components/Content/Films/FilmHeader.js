const backgroundHeader = () => {
  return (
    <Container>
      <Header
        as="h1"
        inverted
        style={{
          width: 1024,
          height: 320,
          display: 'inline-block',
          opacity: 0.5,
          backgroundImage: `url(${image}${details.backdrop_path})`,
          backgroundSize: 'cover',
          // fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          // marginTop: mobile ? '1.5em' : '3em',
        }}
      >
        {details.title}
      </Header>
    </Container>
  );
};
