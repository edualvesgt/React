import React from 'react';
import Header from '../../components/Header/Header';
import Title from '../../components/Titulo/Titulo';
import './EventosPage.css';

const EventosPage = () => {
    return (
        <div>
            <Header />
            <Title  titleText={"Eventos Page"} className = "margem_acima"/>
        </div>
    );
};

export default EventosPage;