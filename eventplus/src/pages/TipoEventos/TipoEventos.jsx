import React from 'react';
import Header from '../../components/Header/Header';
import Title from '../../components/Titulo/Titulo';
import './TipoEventos.css';

const TipoEventos = () => {
    return (
        <div>
            <Header />
            <Title  titleText={"Tipo Evento Page "} className = "margem_acima"/>
        </div>
    );
};

export default TipoEventos;