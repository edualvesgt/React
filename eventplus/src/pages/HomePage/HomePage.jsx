import React from 'react';
import Header from '../../components/Header/Header';
import Title from '../../components/Titulo/Titulo';
import Banner from '../../components/Banner/Banner';
import MainContent from '../../components/Main/MainContent'
import VisionSection from '../../components/VisionSection/VisionSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import NextEvent from '../../components/NextEvent/NextEvent';
import Container from '../../components/Container/Container';
import './HomePage.css';


const HomePage = () => {
    return (
        <div>
            <Header />

            <MainContent>
                <Banner />
                <section className='proximos-eventos'>
                    <Container>
                        <Title titleText={"Proximos Eventos"} />
                        <div className='events-box'>
                            <NextEvent title={"Evento X "} description={"Evento Legal "} eventDate={"20/12"} idEvento={"a"} />
                            <NextEvent />
                            <NextEvent />
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