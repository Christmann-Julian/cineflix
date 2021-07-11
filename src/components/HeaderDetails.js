import { Component } from 'react';
import Container from './Container';
import Stars from './Stars';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import { calcTime, convertMoney } from '../utils/helpers';
import '../css/HeaderDetails.css';

class HeaderDetails extends Component{

  calcVote = () => {
    this.fakeArray1 = [];
    this.fakeArray2 = [];
    const vote = Math.round(this.props.vote/2);
    const reste = 5 - vote;
    for (let i = 0; i < vote; i++) {
      this.fakeArray1.push("1");
    }

    if(reste !== 0){
      for (let i = 0; i < reste; i++) {
        this.fakeArray2.push("1");
      }
    }
  }

  getText(content, limit=600){

    if(content.length <= limit){
      return content;
    }
  
    return content.substr(0, limit).trim() + '...';

  }

  render(){

    this.calcVote();
    const no_image = 'images/no_image.jpg';
    const imgSrc = `${IMAGE_BASE_URL}/${POSTER_SIZE}/${this.props.imgSrc}`;

    return (
      <div className="headerDetails">
          <div className="badge-decoration">{this.props.status}</div>
          <div className="headerDetails--poster">
              <img src={!this.props.imgSrc ? no_image : imgSrc} alt="poster" className="headerDetails--poster__img" />
          </div>
          <div className="headerDetails--container">
              <h3 className="headerDetails--container__title">{this.props.mTitle}</h3>
              <p className="headerDetails--container__desc">{this.getText(this.props.mDesc)}</p>
              <div className="headerDetails--info">
                  <Container iconName="clock" content={calcTime(this.props.runtime)}></Container>
                  <Stars fakeArray1={this.fakeArray1} fakeArray2={this.fakeArray2} ></Stars>
                  <Container iconName="money" content={convertMoney(this.props.revenue)}></Container>
              </div>
          </div>
      </div>
    );
  }
  
}

export default HeaderDetails;