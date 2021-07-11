import { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import '../css/Poster.css';
import {Link} from 'react-router-dom';
import { addMovie, removeMovie } from '../actions/movie';
import {connect} from 'react-redux';

class PosterComponent extends Component{

  state = {
    hover: false,
    test: true,
    width: window.innerWidth
  }

  componentDidMount = () => {
    if(this.state.width < 800 && this.state.test === true){
      this.setState({hover: true, test: false})
    }
  }

  // Montre l'overlay quand l'utilisateur passe avec sa souris
  showOverlay = () => {
    if(this.state.hover){
      return;
    }
    this.setState({hover: true});
  }

  // Cache l'overlay
  hideOverlay = () => {
    this.setState({hover: false});
  }

  // Enlever de ma liste de films (coeur noir)
  remove = () => {
    this.props.removeM(this.props.id);
  }

  // Ajouter à ma liste de films (coeur rouge)
  add = () => {
    this.props.addM(this.props.movie);
  }

  render(){
    return (
      <div className="poster" onMouseEnter={this.showOverlay} onMouseLeave={this.hideOverlay}>
        <Link to={{pathname: `/${this.props.id}`}}>
          <img src={this.props.imgSrc} alt="poster" className="poster--img" />
        </Link>
        {this.state.hover ? (
            <div className="poster--overlay">
                <h3 className="poster--overlay__text">Liste de favoris</h3>
                {this.props.wished ? (
                    <FontAwesome onClick={this.remove} className="poster--icon" name="heart" size="3x"></FontAwesome>
                ) : (
                    <FontAwesome onClick={this.add} className="poster--icon__not" name="heart-o" size="3x"></FontAwesome>
                )}
            </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addM: movie => dispatch(addMovie(movie)),
    removeM: movieId => dispatch(removeMovie(movieId))
  }
}

const Poster = connect(null, mapDispatchToProps)(PosterComponent);

export default Poster;