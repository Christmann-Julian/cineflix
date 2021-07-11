import { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getNumber} from '../actions/movie'
import '../css/Header.css';

class HeaderComponent extends Component{

  componentDidMount(){
    this.props.getNumber()
  }

  activeLink(){
    
    if(this.props.badge === 0){
      return '/';
    }else{
      return '/player';
    }

  }

  render(){
    return (
      <div className="header">
        <Link to={{pathname: '/'}}>
          <FontAwesome className="header--movie" name="film" size="5x"></FontAwesome>
        </Link>
        <h3>Cineflix</h3>
        <Link to={{pathname: this.activeLink()}}>
          <FontAwesome className="header--heart" name="heart" size="5x"></FontAwesome>
        </Link>
        
        <div className="header--badge">
            {this.props.badge}
        </div>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    badge: state.movies.number
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNumber: () => dispatch(getNumber())
  }
}

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

// state = {
//   movies: {
//     movies: [],
//     number: 0
//   }
// }

export default Header;