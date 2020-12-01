import React from 'react';
import axios from 'axios';
import './App.css';
import ReactPlayer from "react-player"
// import { Card, Col, Container, Row, ProgressBar } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      bigScreen: "What it do boo",
      bigTitle: "456",
      theVid: ''
    }
  }

  componentDidMount() {this.loadMovies();}

  loadMovies() {
    // go grab (aka get) all the data from some url
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=b6fbc7f3f313bd395902af464ef47262&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    axios.get(url)
      .then(response =>
      {
        // then put just the movies (not everything) into the state
        console.log(response.data.results)
        this.setState({movies: response.data.results});
      });
  }

  handleClick = (event) => {
    let titled = event.target.id;
    let summary = event.target.alt;
    this.setState({bigScreen: summary})
    this.setState({bigTitle: titled})
  }

  render() {
    const imP = 'https://image.tmdb.org/t/p/w500';
    // const trailer = 'https://www.youtube.com/watch?v=';
    return (
      <div className="App">
        <img className="bgImage" src='https://www.searchpng.com/wp-content/uploads/2019/01/Theater-Clipart-Png-Image.png' alt=''/>
        <div className='screen'><ReactPlayer className='player' url={this.state.theVid}/><h4>{this.state.bigTitle} <br/><br/> {this.state.bigScreen}</h4></div>
        {this.state.movies.map((movie) =>
          {
            return <div key={movie.title}><img className="imgs" src={imP + movie.poster_path} alt={movie.overview} id={movie.title} onClick={this.handleClick}/><h5 className="tiles"> {movie.title} <br/> ({movie.vote_average}/10)</h5></div>;
          })}
      </div>
    );
  }
}

//   render() {
//     // let movies = [];
//     // for(let i = 0; i < this.state.movies.length; i++)
//     // {
//     //   movies.push(<h2>{this.state.movies[i].title}</h2>)
//     // }
//     const imP = "https://image.tmdb.org/t/p/w500";
//     return (
//       <div className="App">
//         <img className="imag" src='https://st2.depositphotos.com/1000868/7740/v/950/depositphotos_77408874-stock-illustration-movie-hall-with-red-seats.jpg' />
//         <h1>Check out these movies!!!!!!</h1>
//         {this.state.movies.map(movie =>
//           {
//             return <h2><img className="imgs" src={imP + movie.poster_path}/> {movie.title} ({movie.release_date})</h2>;
            
//           })}
//       </div>
//     );
//   }
// }

export default App;