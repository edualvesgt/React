import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import EventosPage from '../pages/EventosPage/EventosPage';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import TipoEventos from '../pages/TipoEventosPage/TipoEventosPage';
import { PrivateRoute } from './PrivateRoutes';

const routes = () => {
    return (
        <div>
            <BrowserRouter>
            <Header/>
                <Routes>
                    <Route path="/" element={<HomePage />} exact />

                    <Route path="/login" element={<LoginPage />} />

                    <Route
                        path="/tipo-eventos"
                        element={<PrivateRoute redirectTo='/'>
                            <TipoEventos />
                        </PrivateRoute>}
                    />

                    <Route
                        path={"/eventos"}
                        element={<PrivateRoute redirectTo='/'>
                            <EventosPage />
                        </PrivateRoute>}
                    />


                </Routes>
                <Footer />
            </BrowserRouter>

        </div>
    );
};

export default routes;