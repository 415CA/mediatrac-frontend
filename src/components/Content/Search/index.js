import React, { Fragment, useEffect, useState } from 'react';
import { Button, Card, Input, Segment } from 'semantic-ui-react';
import { axios, image } from '../Axios';
import { API_KEY } from '../Request';

const Search = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(url);
      setData(result.data.results);
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  const movieDetails = (movie) => {
    localStorage.setItem('selectedMovie', movie);
  };

  return (
    <Fragment>
        <Segment padded textAlign="center">
          <h4>Search Movies</h4>
          <Input
            width={6}
            size={'small'}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button
            compact
            icon="search"
            type="button"
            onClick={() => {
              setUrl(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`
              );
            }}
          >
          </Button>
        </Segment>

      {isLoading ? (
        <div></div>
      ) : (

      <Segment basic>
        <Card.Group itemsPerRow={5}>
        {data.map((movie) => {
          return (
            <Card
              key={movie.id}
              image={
                movie.poster_path
                  ? `${image}${movie.poster_path}`
                  : 'https://flixdetective.com/web/images/poster-placeholder.png'
              }
              header={movie.title}
              meta={`Rating: ${movie.vote_average}`}
              description={truncate(movie.overview, 75)}
              raised={true}
              href={`/movies/${movie.id}`}
              movie={movie}
              onClick={movieDetails(movie.id)}
            />
          );
        })};
        </Card.Group>
      </Segment>

      )}

    </Fragment>
  );
}

export default Search