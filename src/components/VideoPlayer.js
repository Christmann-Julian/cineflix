import { Component } from "react";
import ReactPlayer from "react-player";

class VideoPlayer extends Component{

    render(){
        return(
            <ReactPlayer 
                url={this.props.videoUrl}
                controls
                playing={false}
                width="100%"
                height="100%"
                style={{position: "absolute", top: "0", left: "0"}}
                onEnded={this.props.handleEnded}
            />
        )
    }
}

export default VideoPlayer;