const { default: SimilarFilms } = require("./FilmSimilar")
const { default: ShowVideos } = require("./FilmVideo")
const { default: Review } = require("./FilmReview")

const Film = () => {

  return (
    <div>
      {backgroundHeader()}
      <Grid celled="internally" stackable columns={2}>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image
              src={`${image}${details.poster_path}`}
              size="medium"
              bordered
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <h1>{details.title}</h1>
            <List borderless>
              <List.Item>{detailsToRender()}
                <Details />
              </List.Item>
              <List.Item>{socialMediaToRender()}
                <Social /> 
              </List.Item>
              <Divider />
              <List.Item>
                <Container textAlign="justified">
                  Description: {details.overview}
                </Container>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Header as="h3" dividing>
        Similar Movies
      </Header>
      <Slider {...sliderSettings}>
        <SimilarFilms />
      </Slider>
      <Header as="h3" dividing>
        Cast
      </Header>
      <Slider {...sliderSettings}>{castToRender}</Slider>
      <Header as="h3" dividing>
        Crew
      </Header>
      <Slider {...sliderSettings}>{crewToRender}</Slider>
      <Header as="h3" dividing>
        Videos
      </Header>
      <Slider {...sliderSettings}>{videoToRender}
        <ShowVideos/>
      </Slider>
      <Header as="h3" dividing>
        Comments
      </Header>
      <Slider {...commentSliderSettings}>{reviewToRender}
        <Review/>
      </Slider>
    </div>
  );
}

export default Film; 