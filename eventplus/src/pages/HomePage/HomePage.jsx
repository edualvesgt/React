import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Title from '../../components/Titulo/Titulo';
import Banner from '../../components/Banner/Banner';
import MainContent from '../../components/Main/MainContent'
import VisionSection from '../../components/VisionSection/VisionSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import NextEvent from '../../components/NextEvent/NextEvent';
import Container from '../../components/Container/Container';
import axios from 'axios';

import './HomePage.css';


const HomePage = () => {

    const [nextEvents, setNextEvents] = useState([]);
    const urlLocal = 'http://localhost:5000/api'

    useEffect(() => {
        async function getNextEvents() {
            try {
                const promise = await axios.get(`${urlLocal}/Evento/ListarProximos`);
                const dados = await promise.data;

                setNextEvents(dados);

            } catch (error) {
                alert("Deu Ruim ")
            }
        }

        getNextEvents();

    }, []);

    return (
        <div>
            <Header />

            <MainContent>
                <Banner />
                <section className='proximos-eventos'>
                    <Container>
                        <Title titleText={"Proximos Eventos"} />
                        <div className='events-box'>
                            {
                                nextEvents.map((e) => {
                                    return (
                                        <NextEvent
                                            key={e.idEvento}
                                            title={e.nomeEvento}
                                            description={e.descricao}
                                            eventDate={e.dataEvento}
                                            idEvento={e.idEvento}
                                        />
                                    )
                                })
                            }

                        </div>
                    </Container>
                </section>
                <VisionSection />
                <ContactSection />

            </MainContent>

        </div>
    );
};

export default HomePage;