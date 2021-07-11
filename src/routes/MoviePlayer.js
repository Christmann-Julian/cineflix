import { Component } from "react";
import VideoPlayer from "../components/VideoPlayer";
import MvPlayerList from "../components/MvPlayerList";
import Spinner from "../components/Spinner";
import { API_KEY, API_URL } from "../config";
import "../css/MoviePlayer.css";
import axios from "axios";
import _ from 'lodash';
import { calcTime } from "../utils/helpers";

let newMovies = [];

class MoviePlayer extends Component{
    state = {
        movies: [],
        selectedMovie: {},
        loading: true
    }

    async componentDidMount(){
        const oldMovies = JSON.parse(localStorage.getItem('movies'));
        const results = await this.getNewMovies(oldMovies);
        const videoKey = await this.getVideoMovies(oldMovies);
        const id = this.props.match.params.id;
        
        newMovies = oldMovies.map((oldMovie, index) => {
            const videoUrl = videoKey === null ? '' : `https://www.youtube.com/watch?v=${videoKey[index]}`;
            return {
                id: oldMovie.id,
                position: index + 1,
                title: oldMovie.title,
                duration: results[index],
                //imageUrl: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${oldMovie.backdrop_path}`,
                videoUrl: videoUrl
            }
        })

        // Condition pour vérifier la présence du slug id
        if(id){
            const selectedMovie = this.getSelectedMovie(newMovies, id);
            this.setState({
                loading: false,
                movies: [...newMovies],
                selectedMovie
            })
        }else{
            const selectedMovie = newMovies[0];
            this.setState({
                loading: false,
                movies: [...newMovies],
                selectedMovie
            })
            this.props.history.push({
                pathname: `/player/${selectedMovie.id}`
            })
        }
    }

    componentDidUpdate(prevProps){
        // Verifie si le slug id est differrent
        if(prevProps.match.params.id !== this.props.match.params.id){
            // Verifie si le nouveau slug id est un nombre
            if(isNaN(this.props.match.params.id) === false){
                const id = this.props.match.params.id;
                const selectedMovie = this.getSelectedMovie(newMovies, id);
                this.setState({selectedMovie});
            }else{
                const Movie = newMovies[0];
                const id = Movie.id;
                const selectedMovie = this.getSelectedMovie(newMovies, id);
                this.setState({selectedMovie});
            }
            
        }
    }

    // Sélectionne un film en fonction de son id
    getSelectedMovie = (movies, movieId) => {
        const selectedMovie = _.find(movies, {id: parseInt(movieId, 10)});
        return selectedMovie;
    }

    // Passe au prochain film à la fin de la bande annonce
    handleEnded = () => {
        const {movies, selectedMovie} = this.state;
        const movieIndex = movies.findIndex(movie => selectedMovie.id === movie.id);
        const nextMovieIndex = movieIndex === movies.length - 1 ? 0 : movieIndex + 1;
        const NewSelectedMovie = movies[nextMovieIndex];
        
        this.props.history.push({
            pathname: `/player/${NewSelectedMovie.id}`
        })
        this.setState({
            selectedMovie: NewSelectedMovie
        })
    }

    // Fait une requete à l'API pour chercher la bande annonce
    videoMovie = movieId => {
        return new Promise((resolve, reject) => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;
            axios.get(url).then(data => {
                const video = data;
                resolve(video);
            }).catch(e => {
                console.log('error video', e);
                reject('error video', e);
            })
            
        })
    }

    // Sélectionne toutes les clés de bandes annonces youtube
    getVideoMovies = async (oldMovies) => {
        let promise = [];
        for (let i = 0; i < oldMovies.length ; i++) {
            const element = oldMovies[i];
            const id = element.id;
            const video = await this.videoMovie(id);
            const videoKey = !video.data.results[0] ? null : video.data.results[0].key;
            promise.push(videoKey);
        }
        return Promise.all(promise);
    }

    // Sélectionne le temps de chaque films
    getTime = movieId => {
        return new Promise((resolve, reject) => {
            const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`;
            axios.get(url).then(data => {
                const duration = data.data.runtime;
                resolve(duration);
            }).catch(e => {
                console.log('error', e);
                reject('error', e);
            })
            
        })
    }

    // Sélectionne les nouveaux films à ajouter
    getNewMovies = async oldMovies => {
        let promises = [];
        for (let i = 0; i < oldMovies.length ; i++) {
            const element = oldMovies[i];
            const id = element.id;
            const time = await this.getTime(id);
            promises.push(calcTime(time));
        }
        return Promise.all(promises);
    }

    render(){
        const {movies, selectedMovie} = this.state

        return(
            <div className="moviePlayer">
                {this.state.loading ? (
                    <Spinner></Spinner>
                ) : (
                    <>
                        <div className="videoPlayer--container">
                            <VideoPlayer videoUrl={selectedMovie.videoUrl} handleEnded={this.handleEnded}></VideoPlayer> 
                        </div>
                        <MvPlayerList movies={movies} selectedMovie={selectedMovie}></MvPlayerList>
                    </>
                )}
                
            </div>
        )
    }
}

export default MoviePlayer;