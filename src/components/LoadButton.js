import { Component } from 'react';
import '../css/LoadButton.css';
import Spinner from './Spinner';

class LoadButton extends Component{

  render(){
    return (
        <>
            {this.props.loading ? (
              <Spinner></Spinner>
            ) : (
              <div className="loadButton" onClick={this.props.onButtonClick}>
                  <h3 className="loadButton--text">Voir Plus</h3>
              </div>
            )}
        </>
    );
  }
  
}

export default LoadButton;