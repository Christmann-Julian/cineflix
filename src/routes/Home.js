import { Component } from 'react';
import HeaderImg from '../components/HeaderImg';
import Searchbar from '../components/Searchbar';
import PosterList from '../components/PosterList';
import LoadButton from '../components/LoadButton';
import Footer from '../components/Footer';
import {connect} from 'react-redux';
import {getMovies} from '../actions/movie';

class HomeComponent extends Component{

  componentDidMount() {
    this.props.getMovies();
  }

  render(){
    return (
      <>
        <HeaderImg title={this.props.mTitle} overview={this.props.mDesc} imgSrc={this.props.image}></HeaderImg>
        <Searchbar onSearchClick={this.props.onSearchClick}></Searchbar>
        <PosterList movies={this.props.movies} localMovies={this.props.localMovies} top_rated={this.props.top_rated} popular={this.props.popular} activeClass={this.props.activeClass} ></PosterList>
        <LoadButton loading={this.props.loading} onButtonClick={this.props.onButtonClick}></LoadButton>
        <Footer></Footer>
      </>
    );
  }
  
}

const mapStateToProps = state => {
  return {
      localMovies: state.movies.movies
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getMovies: () => dispatch(getMovies())
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default Home;