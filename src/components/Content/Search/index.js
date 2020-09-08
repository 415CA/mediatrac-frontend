import React, { useState, useEffect, Fragment } from 'react';
import { movies, image, axios } from '../../Content/Axios';
import { genre, search, API_KEY } from '../../Content/Request';
import { Button, Input } from 'semantic-ui-react';
import { WATCHED } from '../../../constants/routes';
import Watched from '../Watched'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Search = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);

      setData(result.data);
    };

    fetchData();
  }, [url]);

  return (
    <Fragment>
      <Input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Button
        type="button"
        onClick={() =>
          setUrl(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`
          )
        }
      >
        Search
      </Button>
    </Fragment>
  );
};

export default Search; 