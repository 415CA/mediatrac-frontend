import React, { useState, useEffect, Fragment } from 'react';
import { movies, image } from '../../Content/Axios';
import { genre } from '../../Content/Request';

import { axios } from '../../Content/Axios';
import { API_KEY } from '../../Content/Request';
import { Button, Input } from 'semantic-ui-react';

import { Card } from 'semantic-ui-react';
import Movies from '../Movies';
import Film from '../Films';

const Favorites = () => {
  const [feature, setFeature] = useState([]);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false)

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(url);
        setData(result.data.results);
        setLoading(true)
      };
      fetchData();
      console.log(data)
    }, [url]);

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };

  const movieDetails = (movie) => {
    localStorage.setItem('selectedMovie', movie);
  };

  const displayRow = (data, loading) => {
    if (loading) {
      let row = data.map((movie) => {
        return (
          <Card
            key={movie.id}
            image={`${image}${movie.poster_path}`}
            header={movie.title}
            meta={`Rating: ${movie.vote_average}`}
            description={truncate(movie.overview, 75)}
            raised={true}
            href={`/movies/${movie.id}`}
            movie={movie}
            onClick={(movieDetails(movie.id))}
          />
        )
      });
    return row
    setLoading(false)
    }
  }


  return (
    <div>
      <Fragment>
          <Input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button
            type="button"
            onSubmit={() => {
              setUrl(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`
              );
            }}
          >
            Search
          </Button>
      </Fragment>
      <Fragment>
        <Card.Group itemsPerRow={5}>{displayRow(data, loading)}</Card.Group>
      </Fragment>
    </div>
  );
};

export default Favorites;
