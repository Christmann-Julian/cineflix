import { Component } from "react";
import MvPlayerListItem from "./MvPlayerListItem";
import "../css/MvPlayerList.css";

class MvPlayerList extends Component{

    renderList = props => {
        return props.movies.map((movie, i) => {
            const active = movie.id === props.selectedMovie.id ? true : false;

            return(
                <MvPlayerListItem {...movie} key={movie.id} number={i + 1} active={active}></MvPlayerListItem>
            )
        })
    }

    render(){
        const position = this.props.selectedMovie.position;
        const total = this.props.movies.length;
        return(
            <div className="mvPlayerList">
                <div className="mvPlayerList--header">
                    <h3>{this.props.selectedMovie.title}</h3>
                    <div className="mvPlayerList--badge">{position}/{total}</div>
                </div>
                <div className="mvPlayerList--list">{this.renderList(this.props)}</div>
            </div>
        )
    }
}

export default MvPlayerList;
