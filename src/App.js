import React from 'react';
import axios from 'axios';
import './App.css';
import ReactPlayer from 'react-player';
import HmmHmHmm from './images/mordocoffee.png';
import Popcorn from './images/popcorn.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      bigScreen: "Theaters",
      bigTitle: "What it do boo",
      theVid: '',
      movieStuff: [],
      trailers: [],
      play: ''
    }
  }

  componentDidMount() {this.loadMovies();}

  loadMovies() {    // go grab (aka get) all the data from some url
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=b6fbc7f3f313bd395902af464ef47262&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    axios.get(url)
      .then(response => {   // then put just the movies (not everything) into the state
        console.log(response.data.results) //comment out after studying array in log
        this.setState({movies: response.data.results, trailers: ['qHFssXdRGQM', '7Y6-w5Psupw','','xisfaGi_6Ow']});
        console.log(this.state.trailers)
      });
  }

  handleClick = (event) => {
    let title = event.target.id;
    let summary = event.target.alt;
    let playID = event.target.name;
    console.log(playID)
    this.setState({bigScreen: summary, bigTitle: title, theVid: '', play: playID})
  }

  bootClick = () => {
    const trailer = 'https://www.youtube.com/watch?v=';
    let vidLink = this.state.play;  //need to find out where 'data-id' is located in API<<<<<<
    // let vidLink = '7Y6-w5Psupw';
    console.log(this.state.play)
    this.setState({theVid: (trailer + vidLink), bigScreen: '', bigTitle: ''})
  }

  render() {    //need to put rating and loop genre<<<<<
    const imPath = 'https://image.tmdb.org/t/p/w500';
    return (
      <div className="App">
        <img className="bgImage" src='https://www.searchpng.com/wp-content/uploads/2019/01/Theater-Clipart-Png-Image.png' alt=''/>
        <button className='bootn' onClick={this.bootClick}>Play Trailer</button>
        <div className='screen'><ReactPlayer className='player' url={this.state.theVid}/><h4>{this.state.bigTitle} <br/><br/> {this.state.bigScreen}</h4><img style={{width: '13em'}} src={HmmHmHmm} alt=''/></div>
        {this.state.movies.map((movie, x) => {
            return <div key={movie.title}><img className="imgs" src={imPath + movie.poster_path} alt={movie.overview} id={movie.title} onClick={this.handleClick} name={this.state.trailers[x]}/><h5 className="tiles"> {movie.title} <br/> ({movie.vote_average}/10)</h5></div>;
          })
        }
        <img className="zoom" src={Popcorn} alt=''/>
      </div>
    );
  }
}

export default App;