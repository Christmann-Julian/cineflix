import { Component } from 'react';
import '../css/NotFound.css';

class NotFound extends Component{

  render(){
    return (
      <div className="notFound--container">
          <p>Error 404: not found</p>
      </div>
    );
  }
  
}

export default NotFound;