import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import '../css/DetailsList.css';
import { useState } from "react";
import Actor from "./Actor";
import VideoPlayer from './VideoPlayer';
import Comment from '../comments/Comment';

const DetailsList = props => {

    const renderActor = () => {
        return props.actors.map((actor, i) => {
            const imgSrc = !actor.profile_path ? 'images/no_image.jpg' : `${IMAGE_BASE_URL}/${POSTER_SIZE}/${actor.profile_path}`;
            return (<Actor key={i} imgSrc={imgSrc} name={actor.name} hover={false} />)
        })
    }

    const handleEnded = () => {
        console.log("end of thrailler")
    }

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const no_image = 'images/no_image.jpg';
    const imgSrc = `${IMAGE_BASE_URL}/${POSTER_SIZE}/${props.imgSrc}`;

    return (
        <>
            <div className="bloc-tabs">
                <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
                  Info
                </button>
                <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
                  Acteurs
                </button>
                <button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
                  Commentaires
                </button>
            </div>
  
            <div className="content-tabs">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <div className="info--container">
                        <div className="info--img">
                            <img src={!imgSrc ? no_image : imgSrc} alt="poster" style={{height: "100%", width: "100%"}} />
                        </div>
                        <div className="info--details">
                            <div className="info--details__title">Titre</div>
                            <p>{props.mTitle}</p>
                            <div className="info--details__title">Date de sortie</div>
                            <p>{props.release_date}</p>
                            <div className="info--details__title">Genres</div>
                            <p>{props.genres}</p>
                            <div className="info--details__title">Productions</div>
                            <p>{props.production_companies}</p>
                        </div>

                        <table className="table-style">
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Date de sortie</th>
                                    <th>Genres</th>
                                    <th>Productions</th>
                                </tr>
                            </thead>     
                            <tbody>
                                <tr>
                                    <td>{props.mTitle}</td>
                                    <td>{props.release_date}</td>
                                    <td>{props.genres}</td>
                                    <td>{props.production_companies}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <h3 className="detailsList--title">Synopsis</h3>
                    <p className="description--text">{props.mDesc}</p>
                    <h3 className="detailsList--title">Bande annonce</h3>
                    <div className="videoPlayer">
                            <VideoPlayer videoUrl={props.videoUrl} handleEnded={handleEnded}></VideoPlayer>
                    </div>
                    {/* <Carrousel></Carrousel> */}
                </div>
                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <div className="detailsList">
                        <div className="detailsList--grid">{renderActor()}</div>
                    </div>
                </div>
                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    <Comment></Comment>
                </div>
            </div>
        </>  
    )
    
}

export default DetailsList;