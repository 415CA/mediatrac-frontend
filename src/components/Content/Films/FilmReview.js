import React from 'react';
import { Comment } from 'semantic-ui-react';

const Review = (reviews) => {
  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

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