import React, { useState } from 'react';
import Faq from '../components/Faq';
import Footer from '../components/Footer';
import '../css/About.css';

function About () {
  const [faqs, setfaqs] = useState([
    {
      question: 'Pourquoi utiliser ce site pour trouver un film ?',
      answer: "Ce site sert à toutes les personnes qui ont marre de voir toujours les mêmes films à la télé ou qui ont marre de rechercher les meilleurs films sur google. À toutes ces personnes, vous trouverez forcément votre bonheur dans ce site très simple d'utilisation et disposant d'une grande base de données.",
      open: true
    },
    {
      question: 'Stockons-nous des données sur nos utilisateurs ?',
      answer: 'Sur notre site, nous stockons des données uniquement quand vous laissez un avis sur un film. Les données de cet avis sont stockés pour une durée indéterminée mais peuvent être retirées si l\'auteur nous le demande.',
      open: false
    },
    {
      question: 'Les films du site sont-ils régulièrement mis à jour ?',
      answer: 'Oui car ce site utilise, la banque de données de themoviedb mettant à notre disposition une grande variété de sites régulièrement mis à jour afin que chaque utilisateur puisse trouver son bonheur.',
      open: false
    }
  ]);

  const toggleFAQ = index => {
    setfaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open
      } else {
        faq.open = false;
      }

      return faq;
    }))
  }


  return (
    <>
      <div className="faqs">
          <h3>Apprendre à nous connaitre</h3>
          
            <div>
                {faqs.map((faq, i) => (
                <Faq faq={faq} index={i} toggleFAQ={toggleFAQ} />
              ))}
            </div>
          
      </div>
      <Footer></Footer>
    </>
  );
}

export default About;