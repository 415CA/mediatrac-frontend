import React, { Fragment, useEffect, useState } from 'react';
import { Button, Card, Input, Segment, Form } from 'semantic-ui-react';
import { axios, image } from '../Axios';
import { API_KEY } from '../Request';

const Search = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data.results);
      } catch (error) {
        setIsError(true);
      }
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
        <Form
          onSubmit={(e) => {
            setUrl(
              `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`
            );
            e.preventDefault();
          }}>
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
            type="submit"
          >
          </Button>
        </Form>
        
      {isLoading ? (
        <div>Loading ...</div>
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