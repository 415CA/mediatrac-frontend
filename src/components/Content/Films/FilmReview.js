const Review = (reviews) => {
  let reviewToRender;
  if (reviews.results) {
    reviewToRender = reviews.results.map((review) => {
      return (
        <Comment key={review.id}>
          <Comment.Content>
            <Comment.Author as="a" href={review.url}>
              {review.author}
            </Comment.Author>
            <Comment.Text>{truncate(review.content, 800)}</Comment.Text>
          </Comment.Content>
        </Comment>
      );
    });
  }

  return reviewToRender;
};

export default Review;