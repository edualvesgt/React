import React from 'react';
import './TipoEventosPage.css';
import Header from '../../components/Header/Header';
import Title from '../../components/Titulo/Titulo';
import MainContent from '../../components/Main/MainContent.jsx'
import Container from '../../components/Container/Container';
import ImageIllustrator from '../../components/ImageIllustrator/ImageIllustrator';

import tipoEventoImage from '../../assets/images/tipo-evento.svg'


const TipoEventos = () => {
    return (
        <>
        <Header/>
            <MainContent>
                <section className="cadastro-evento-section">
                    <Container>
                        <div className="cadastro-evento__box">                       
                            <Title titleText={"Cadastro Tipos de Eventos"}/>

                            <ImageIllustrator 
                            imageRender={tipoEventoImage}
                            />

                            <form className='ftipo-evento'>
                                <p>Formulario sera criado aqui</p>
                            </form>

                        </div>
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default TipoEventos;