// import React, { useState, useEffect } from 'react';
// import { movies, image } from '../../Content/Axios';
// import { genre } from '../../Content/Request';

// import { useHistory } from 'react-router-dom';

// import { Grid, Image, Card, Icon } from 'semantic-ui-react';

// import MovieList from '../Movies';
// import MovieDetails from '../Movies';

// const Search = () => {

//     state = {
//       films: [],
//       searchQuery: '',
//     };

//     handleSearch = (event) => {
//       this.setState({
//         searchQuery: event.target.value,
//       });
//     };

//     addNewFilm = (film) => {
//       this.setState({
//         films: [...this.state.allFilm, film],
//       });
//     };


//     const searchResults = this.state.films.filter(film => {
//       return film.name.toLowerCase().includes(this.state.searchParams.toLowerCase())
//     })

//     return (
//       <Container>
//         <h1>Film Searcher</h1>
//         <br />
//         <Search handleSearch={this.handleSearch} searchParams={this.state.searchParams}/>
//         <br />
//         <FilmCollection film={searchResults}/>
//       </Container>
//     )

// }

// export default Search