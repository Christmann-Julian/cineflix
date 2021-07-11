import { Component } from "react";
import {Link} from 'react-router-dom';
import FontAwesome from "react-fontawesome";
import '../css/Footer.css';

class Footer extends Component{
  
  render(){
    return (
      <footer className="footer-distributed">
          <div className="footer-right">
              <Link to={{pathname: '/about'}}>
                  <FontAwesome className="fas fa-info-circle" name="info" />
              </Link>
              <Link to={{pathname: '/contact'}}>
                  <FontAwesome className="fas fa-envelope" name="mail" />
              </Link>
              <a href="https://github.com/"><FontAwesome className="fa fa-github" name="github" /></a>
          </div>
          
          <div className="footer-left">
            <p className="footer-links">
              <Link className="link-1" to={{pathname: '/'}}>
                  Accueil
              </Link>
              {/* <Link to={{pathname: '/player'}}>
                  Mes favoris
              </Link> */}
              <Link to={{pathname: '/about'}}>
                Qui sommes-nous
              </Link>
              <Link to={{pathname: '/contact'}}>
                  Me contacter
              </Link>
            </p>
            <img className="api-logo" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="themoviedb logo" />
            <p>Christmann Julian &copy; 2021</p>
            <p className="attribution">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
          </div>
      </footer>
    );
  }
    
}
  
  export default Footer;