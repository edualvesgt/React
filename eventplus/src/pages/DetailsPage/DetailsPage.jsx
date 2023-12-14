import React from 'react';
import Container from '../../components/Container/Container';
import Titulo from '../../components/Titulo/Titulo';
import MainContent from '../../components/Main/MainContent';
import TableDetails from './TableDetails/TableDetails';
import './DetailsPage.css'

const DetailsPage = () => {
    return (
        <>
            <MainContent>
                <section className="detalhes-evento-section">
                    <Container>
                        <Titulo titleText={"Nome do Evento"} />
                        <p>Descricao</p>
                        <p>Tipo do evento </p>
                        <p>Data</p>
                        <p>Intituicao</p>

                    </Container>
                </section>

                <section className='lista-cometario-section'>
                    <Container>
                    <Titulo titleText={"Cometarios"}/>
                    <TableDetails/>
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default DetailsPage;