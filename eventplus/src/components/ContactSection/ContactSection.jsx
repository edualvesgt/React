import React from 'react';
import Title from "../Titulo/Titulo"
import contatoMap from '../../assets/images/contato-map.png'
import './ContactSection.css'
const ContactSection = () => {
    return (
        <section className='contato'>
            <Title titleText={"Contato"} />
            <div className='contato__endereco-box'>

                <img src={contatoMap} alt="Imagem Ilustrativa de um Mapa" className="contato__img-map" />

                <p>R. Niterói, 180 - Centro  <br />
                    São Caetano do Sul - SP

                    <a href="tel:+551142252000" className='contato__telefone'> (11) 4225-2000</a>
                </p>
            </div>
        </section>
    );
};

export default ContactSection;