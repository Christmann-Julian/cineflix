import{ init } from 'emailjs-com';
import emailjs from 'emailjs-com';
import React, { useState } from "react";
import Footer from '../components/Footer';
import { MAIL_API_KEY, SERVICE_ID, TEMPLATE_KEY } from '../config';
import '../css/Contact.css';

const Contact = () => {
  init(MAIL_API_KEY);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isEmail = () => {
    let mail = document.getElementById('not-mail');
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(email.match(regex)){
      mail.style.display = 'none';
      return true;
    }else{
      mail.style.display = 'block';
      return false;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(name && isEmail() && message){
      sendFeedback(TEMPLATE_KEY, {
        name,
        phone,
        email,
        message,
      });
    }else{
      failMessage();
    }
    
  };

  const successMessage = () => {
    let formMess = document.querySelector('.form-message');

    formMess.innerHTML = 'Message envoyé !';
    formMess.style.opacity = '1';
    formMess.style.background = '#7CFC00';
    formMess.style.color = '#fff';
    formMess.style.width = '100%';
  }

  const failMessage = () => {
    let formMess = document.querySelector('.form-message');

    formMess.innerHTML = 'Merci de remplir correctement les champs requis';
    formMess.style.opacity = '1';
    formMess.style.background = '#901818';
    formMess.style.color = '#fff';
    formMess.style.width = '100%';

    document.getElementById('name').classList.add('error');
    document.getElementById('email').classList.add('error');
    document.getElementById('message').classList.add('error');

  }

  const sendFeedback = (templateId, variables) => {
    
    // Envoie le message à mon adresse
    emailjs.send(SERVICE_ID, templateId, variables)
      .then((res) => {
        // Envoie réussi et remise à 0 des hooks
        successMessage();
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      })
      .catch(
        (err) =>
          // Envoie échoué et banniere pour l'envoyeur
          document.querySelector('.form-message').innerHTML =
            "Une erreur s'est produite, veuillez réessayer.")
  };

  return (
    <>
      <div id="contact">
        <div className="container--contact">
          <div className="contact--title">
            <h6>Une question ? Un conseil ?</h6>
            <h3>Contactez-nous</h3>
          </div>
          <form>
            <input 
              className="field"
              type="text" 
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="nom *"
              value={name}
              autoComplete="off"/>
            <input 
              className="field"
              type="text" 
              id="phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="téléphone"
              value={phone}/>
            <input 
                className="field-2"
                type="mail" 
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email *"
                value={email}
                autoComplete="off"/>
            <p id="not-mail">Email non valide</p>
            <textarea
              id="message"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="message *"
              value={message}
            />
            <input
              className="button"
              type="button"
              value="Envoyer"
              onClick={handleSubmit}
            />
            <div className="form-message"></div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Contact;