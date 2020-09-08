import React, { useState, useEffect, Fragment } from 'react';
import { axios } from '../../Content/Axios';
import { API_KEY } from '../../Content/Request';
import { Button, Input } from 'semantic-ui-react';

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

  console.log()



  return (
    <Fragment>
      <Input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Button
        type="button"
        onClick={() => {
          setUrl(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`
          )
        }}
      >
        Search
      </Button>
    </Fragment>
  );
};

export default Search; 