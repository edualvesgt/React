import React from 'react';

import './NextEvent.css'

// Definição do componente NextEvent
const NextEvent = ({ title, description, eventDate, idEvento }) => {

    // Função para lidar com a ação de conectar
    function conectar(idEvento) {
        alert(`Chamar o recurso para conectar ${idEvento}`)
    }

    return (
        <article className='event-card'>
            <h2 className='event-card__title'>{title}</h2> { /*Título do evento*/}
            <p className="event-card__description">{description}</p> { /* Descrição do evento*/}
            <p className="event-card__description">{eventDate}</p> {/* Data do evento */}

            <a onClick={() => { conectar(idEvento) }} href="" className='event-card__connect-link'>  Conectar  </a> 
            {/*  Link "Conectar" com evento onClick */}
        </article>
    );
};

export default NextEvent; 
