import React from 'react';
import './HomePage.css';
import Header from '../../components/Header/Header';
import Title from '../../components/Titulo/Titulo';
import Banner from '../../components/Banner/Banner';
import MainContent from '../../components/Main/MainContent'
import VisionSection from '../../components/VisionSection/VisionSection';
const HomePage = () => {
    return (
        <div>
            <Header />
            {/* <Title titleText={"Home Page"} className="margem_acima" /> */}
            <MainContent>
            <Banner />
                <VisionSection />
            </MainContent>

        </div>
    );
};

export default HomePage;