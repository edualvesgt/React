import React from 'react';
import Header from '../../components/Header/Header';
import Title from '../../components/Titulo/Titulo';
import './LoginPage.css';

const LoginPage = () => {
    return (
        <div>
            <Header/>
            <Title  titleText={"Login"} className = "margem_acima"/>
        </div>
    );
};

export default LoginPage;