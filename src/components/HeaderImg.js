import { Component } from 'react';
import '../css/HeaderImg.css'

class HeaderImg extends Component{

  getText(content, limit=600){

    if(content.length <= limit){
      return content;
    }
  
    return content.substr(0, limit).trim() + '...';

  }

  render(){
    return (
      <div className="headerImg"  style={{ background: `url(${this.props.imgSrc}) no-repeat`}}>
        <div className="headerImg--overlay">
            <h3 className="headerImg--overlay__title">{this.props.title}</h3>
            <p className="headerImg--overlay__desc">{this.getText(this.props.overview)}</p>
        </div>
      </div>
    );
  }
  
}

export default HeaderImg;