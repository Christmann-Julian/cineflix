import { Component } from 'react';
import Spinner from '../components/Spinner';
import HeaderDetails from '../components/HeaderDetails';
import DetailsList from '../components/DetailsList';
import Footer from '../components/Footer';
import axios from 'axios';
import { API_URL, API_KEY} from '../config';

class Details extends Component{

  state = {
    loading: true,
    actors: [
      {
        name: "Julien Dupont"
      },
      {
        name: "Julien Dupont"
      },
      {
        name: "Julien Dupont"
      },
    ],
    mTitle: "Batman",
    mDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, molestias.",
    imgSrc: "/images/Fast_small.jpg",
    runtime: "2h30",
    revenue: "$156789",
    status: "Released",
    vote: "",
    videoUrl: "",
    genres: ""
  }

  // Fait une requete à l'API pour récupérer les infos sur le film
  async componentDidMount(){
    try {
      const movieId = this.props.match.params.id;
      const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`;
      const videoUrl = await this.getVideoMovie(movieId);
      const {data: {revenue, runtime, title, overview, status, vote_average, poster_path, release_date, production_companies, genres}} = await this.loadingInfo(url);
      
      // Récupérer les compagnies de production
      const companiesName = await this.getCollatedArray(production_companies);

      // Récupérer les genres
      const genresName = await this.getCollatedArray(genres);

      this.setState(
        {
          revenue,
          runtime,
          mTitle: title,
          mDesc: overview,
          status,
          imgSrc: poster_path,
          vote: vote_average,
          release_date: this.formatDateFR(release_date),
          production_companies: companiesName.join(", "),
          genres: genresName.join(", "),
          videoUrl: videoUrl
        }, async () => {
          const url = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=fr`;
          const {data: {cast}} = await this.loadingInfo(url);
          
          this.setState({actors: [...cast], loading: false})
        }
      )
    } catch (e) {
      console.log(e);
    }
  }

  // Met la date au format français
  formatDateFR(date){
    return date.split('-').reverse().join('/');
  }

  // Sélectionne les compagnies de production ou les genres et les regroupe dans un tableau
  getCollatedArray = async elements => {
    let promises = [];
    for (let i = 0; i < elements.length ; i++) {
        const element = elements[i];
        const id = element.name;
        promises.push(id);
    }
    return Promise.all(promises);
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

  // Sélectionne la clé de bande annonce youtube
  getVideoMovie = async (movieId) => {
      const id = movieId;
      const video = await this.videoMovie(id);
      const videoUrl = !video.data.results[0] ? '' : `https://www.youtube.com/watch?v=${video.data.results[0].key}`;
      
      return videoUrl;
  }

  loadingInfo = url => axios.get(url);

  render(){
    const {loading, actors, mTitle, mDesc, imgSrc, runtime, revenue, status, vote, videoUrl, release_date, production_companies, genres} = this.state;
    return (
      <div className="app">
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <>
            <HeaderDetails 
              mTitle={mTitle} 
              mDesc={mDesc} 
              imgSrc={imgSrc} 
              runtime={runtime} 
              revenue={revenue}
              status={status}
              vote={vote}
            />
            <DetailsList 
             actors={actors} 
             videoUrl={videoUrl}
             mTitle={mTitle} 
             mDesc={mDesc} 
             imgSrc={imgSrc} 
             release_date={release_date}
             production_companies={production_companies}
             genres={genres}
            />
            <Footer></Footer>
          </>
        )}
      </div>
    );
  }
  
}

export default Details;