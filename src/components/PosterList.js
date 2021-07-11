import { Component } from 'react';
import '../css/PosterList.css';
import Poster from './Poster';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

let wish;

class PosterList extends Component{

  renderPoster = () =>{
      return this.props.movies.map(movie => { 
          const imgSrc = !movie.poster_path ? 'images/no_image.jpg' : `${IMAGE_BASE_URL}/${POSTER_SIZE}/${movie.poster_path}`;
          wish = false;

          if(this.props.localMovies){
            this.props.localMovies.forEach(localMovie => {
              if(movie.id === localMovie.id){
                wish = true
              }
            });
          }

          return (
              <Poster 
              imgSrc={imgSrc} 
              wished={wish} 
              movie={movie}
              id={movie.id}
              />
          )
      })
  }
  
  handleClick(){
    console.log('test')
  }

  render(){
    return (
      <div className="posterList">
        <div className="posterList--container">
          <h3 className={this.props.activeClass === 1 ? "posterList--title posterList--active" : "posterList--title"} onClick={this.props.popular}>Films populaires</h3>
          <h3 className={this.props.activeClass === 2 ? "posterList--title posterList--active" : "posterList--title"} onClick={this.props.top_rated}>Films mieux notes</h3>
          {/* <h3 className={this.props.activeClass === 3 ? "posterList--title posterList--active" : "posterList--title"} onClick={this.props.now_playing}>Films en salle</h3> */}
        </div>
        <div className="posterList--grid">{this.renderPoster()}</div>
      </div>
    );
  }
  
}

export default PosterList;