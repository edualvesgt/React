import React, { useEffect, useState } from 'react';
import './HomePage.css';
import Header from '../../components/Header/Header';
import Title from '../../components/Titulo/Titulo';
import Banner from '../../components/Banner/Banner';
import MainContent from '../../components/Main/MainContent'
import VisionSection from '../../components/VisionSection/VisionSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import Container from '../../components/Container/Container';
import NextEvent from '../../components/NextEvent/NextEvent';
import Notification from '../../components/Notification/Notification';
import OldEvent from '../../components/OldEvent/OldEvent'


import api, { oldEventResource } from '../../Services/Service';
import { nextEventResource } from '../../Services/Service';

const HomePage = () => {

    const [nextEvents, setNextEvents] = useState([]);
    const [oldEvents, setOldEvents] = useState([]);
    const [notifyUser, setNotifyUser] = useState({});


    useEffect(() => {
        async function getNextEvents() {
            try {
                const promise = await api.get(`${nextEventResource}`);
                const dados = await promise.data;

                const promiseOld = await api.get(oldEventResource)
                const dadosOld = await promiseOld.data

                // Caso de erro olhar na API se ela esta em HTTP ou HTTPS
                setNextEvents(dados)//Atualiza o state
                setOldEvents(dadosOld)
            } catch (error) {

                notifyError("Erro Na Conexao ")
            }
        }


        getNextEvents();//roda a funcao
    }, []);

    const notifyError = (textNote) => {
        setNotifyUser({
            titleNote: "Erro",
            textNote,
            imgIcon: 'danger',
            imgAlt: 'Imagem de ilustração de erro. Homem segurando um balão com símbolo de X.',
            showMessage: true
        });
    };
    return (
        <div>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}

            {/* <Title titleText={"Home Page"} className="margem_acima" /> */}
            <MainContent>

                <Banner />

                {/* PROXIMOS EVENTOS */}

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
                                            decription={e.descricao}
                                            eventDate={e.dataEvento}
                                            idEvent={e.idEvento}
                                        />

                                    );
                                })

                            }

                        </div>

                    </Container>
                </section>
                <section className='proximos-eventos'>


                    <Container>
                        <div className='events-box'>
                            <Title titleText={"Eventos Antigos "} />
                            {
                                oldEvents.map((e) => {
                                    return (
                                        <OldEvent
                                            key={e.idEvento}
                                            title={e.nomeEvento}
                                            decription={e.descricao}
                                            eventDate={e.dataEvento}
                                            idEvent={e.idEvento}
                                        />

                                    );
                                })

                            }

                        </div>
                    </Container>
                </section>


                <VisionSection />

                <ContactSection />

            </MainContent>

        </div >
    );
};

export default HomePage;