import { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './routes/Home';
import Spinner from './components/Spinner';
import MoviePlayer from './routes/MoviePlayer';
import Details from './routes/Details';
import Contact from './routes/Contact';
import NotFound from './routes/NotFound';
import About from './routes/About';
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE } from './config';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component{

  state = {
    loading: true,
    badge: 0,
    image: null,
    mTitle: '',
    mDesc: '',
    activePage: 0,
    totalPages: 0,
    searchText: "",
    activeClass: 1,
    movies: [
      {
        backdrop_path: "/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
        id: 475554,
        overview:
          "Dans les années 1980, à Gotham City, Arthur Fleck, un humoriste de stand-up raté, bascule dans la folie et devient le Joker.",
        poster_path: "/tWjJ3ILjsbTwKgXxEv48QAbYZ19.jpg",
        title: "Joker"
      }
  ]
  }

  // Tentative de connexion à l'API
  async componentDidMount(){
    try{
      // Cherche la requete et affiche le resultat
      const {data: {results, page, total_pages}} = await this.loadMovies();
      // console.log(results);

      // Modifie le state pour ajouter les films envoyés par l'API
      this.setState({
        movies: results,
        loading: false,
        activePage: page,
        totalPages: total_pages,
        image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
        mTitle: results[0].title,
        mDesc: results[0].overview,
        activeClass: 1
      })

    } catch(e){
      console.log('error API connection', e);
    }
  }

  // Requete à l'API moviedb
  searchMovie = () => {
    const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${this.state.searchText}&language=fr`;
    return axios.get(url);
  }

  // Lanche la recherche de film de la bar de recherche
  handleSearch = value => {
    try {

      // Active le chargement et lance la recherche
      this.setState({ loading: true, searchText: value, image: null }, async () => {

        // Cherche la requete
        const { data : { results, page, total_pages }} = await this.searchMovie();
        //console.log('results of request', results);

        // Modifie le state avec les films recherchés
        this.setState({
          movies: results,
          loading: false,
          activePage: page,
          totalPages: total_pages,
          image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
          mTitle: results[0].title,
          mDesc: results[0].overview
        })

      })
      
    } catch(e) {
      console.log('error on search request', e);
    }
  }

  // Lance le chargement de plus de films après avoir cliqué sur voir plus
  loadMore = async () =>{
    try{
      // Active le chargement
      this.setState({loading: true});

      // Cherche la requete et ajoute 1 à la page active
      const {data: {results, page, total_pages}} = await this.loadMovies();
      //console.log(results);

      // Copie les films déjà chargés et ajoute les nouveaux films en modifiant le state
      this.setState({
        movies: [...this.state.movies, ...results],
        loading: false,
        activePage: page,
        totalPages: total_pages,
        // image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
        // mTitle: results[0].title,
        // mDesc: results[0].overview
      });

    } catch(e){
      console.log('error load more', e);
    }
  }

  fetchTop_rated = async () => {
    try {

      // Active le chargement et lance la recherche
      this.setState({ loading: true, image: null }, async () => {

        // Cherche la requete
        const { data : { results, page, total_pages }} = await this.loadTop_rated();
        //console.log('results of request', results);

        // Modifie le state avec les films recherchés
        this.setState({
          movies: results,
          loading: false,
          activePage: page,
          totalPages: total_pages,
          image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
          mTitle: results[0].title,
          mDesc: results[0].overview,
          activeClass: 2
        })

      })
      
    } catch(e) {
      console.log('error on search request', e);
    }
  }

  // Requete à l'API moviedb
  loadTop_rated = () => {
    const page = this.state.activePage + 1;
    const url = `${API_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}&language=fr`;
    return axios.get(url);
  }

  fetchpopular = async () => {
    try {

      // Active le chargement et lance la recherche
      this.setState({ loading: true, image: null }, async () => {

        // Cherche la requete
        const { data : { results, page, total_pages }} = await this.loadMovies();
        //console.log('results of request', results);

        // Modifie le state avec les films recherchés
        this.setState({
          movies: results,
          loading: false,
          activePage: page,
          totalPages: total_pages,
          image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
          mTitle: results[0].title,
          mDesc: results[0].overview,
          activeClass: 1
        })

      })
      
    } catch(e) {
      console.log('error on search request', e);
    }
  }

  // Requete à l'API moviedb
  loadMovies = () => {
    const page = this.state.activePage + 1;
    const url = `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=fr`;
    return axios.get(url);
  }

  fetchNowPlaying = async () => {
    try {

      // Active le chargement et lance la recherche
      this.setState({ loading: true, image: null }, async () => {

        // Cherche la requete
        const { data : { results, page, total_pages }} = await this.loadNowPlaying();
        //console.log('results of request', results);

        // Modifie le state avec les films recherchés
        this.setState({
          movies: results,
          loading: false,
          activePage: page,
          totalPages: total_pages,
          image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
          mTitle: results[0].title,
          mDesc: results[0].overview,
          activeClass: 3
        })

      })
      
    } catch(e) {
      console.log('error on search request', e);
    }
  }

  // Requete à l'API moviedb
  loadNowPlaying = () => {
    const page = this.state.activePage + 1;
    const url = `${API_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}&language=fr&region=fr`;
    return axios.get(url);
  }

  render(){
    return (
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className="App">
            <Header badge={this.state.badge}></Header>
            {!this.state.image ? (
              <Spinner></Spinner>
            ) : (
              <Switch>
                <Route path="/" exact render={() => (
                  <Home {...this.state} onSearchClick={this.handleSearch} onButtonClick={this.loadMore} top_rated={this.fetchTop_rated} popular={this.fetchpopular} activeClass={this.state.activeClass}></Home>
                )} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/about" exact component={About} />
                <Route path="/player" exact component={MoviePlayer} />
                <Route path="/player/:id" exact component={MoviePlayer} />
                <Route path="/:id" exact component={Details} />
                <Route component={NotFound} />
              </Switch>
            )}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
  
}

export default App;
