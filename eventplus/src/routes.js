import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Footer from './components/Footer/Footer';

import EventosPage from './pages/EventosPage/EventosPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import TestePage from './pages/TestePage/TestePage';
import TestePageCopy from './pages/TestePageCopy/TestePage';
import TipoEventos from './pages/TipoEventos/TipoEventos';

const routes = () => {
    return (
        <div>
            <BrowserRouter> 
                <Routes>
                    <Route element={<HomePage />} path="/" exact />
                    <Route element={<LoginPage />} path="/login" />
                    <Route element={<TipoEventos />} path="/tipo-eventos" />
                    <Route element={<EventosPage />} path={"/eventos"} />
                    <Route element={<TestePage />} path={"/testes"} />
                    <Route element={<TestePageCopy />} path={"/testescopy"} />
                </Routes>
                <Footer/>
            </BrowserRouter>
            
        </div>
    );
};

export default routes;