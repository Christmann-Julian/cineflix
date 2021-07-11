import { Component } from 'react';
import '../css/Comment.css';

class Comment extends Component{

  render(){
    return (
        <>
            <h3 className="comment--title">Donner votre avis</h3>
            <div className="comment--container">
                <form action="">
                    <div className="comment--group">
                        <input type="text" autoComplete="off" name="username" placeholder="Votre pseudo" />
                    </div>
                    <div className="comment--group">
                        <textarea name="message" placeholder="Ecriver ici votre avis"></textarea>
                    </div>
                    <button className="comment--btn">Envoyer</button>
                </form>
            </div>
            <div className="container-mess">
                <h3 className="comment--title">Avis pour ce film</h3>
                <div className="desactive--comment">En raison de problèmes, les avis sont temporairement désactivés</div>
            </div>
        </>
    );
  }
  
}

export default Comment;