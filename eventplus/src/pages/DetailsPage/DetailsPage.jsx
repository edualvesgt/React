import React, { Fragment, useEffect, useState } from 'react';
import "./DetailsPage.css"

import Title from '../../components/Titulo/Titulo';
import MainContent from '../../components/Main/MainContent.jsx'
import Container from '../../components/Container/Container';

import TableDetails from './TableDetails/TableDetails';
import { useParams } from 'react-router-dom';

import api, {eventsResource, eventsTypeResource, institutionResource} from "../../Services/Service"

const DetalhesEvento = () => {

    const {idEvento} = useParams();

    const [evento, setEvento] = useState([]);

    const [tipoEvento, setTipoEvento] = useState([]);

    const [instituicao, setInstituicao] = useState([]);


    async function loadEventInstitution() {
        try {
            const promise = await api.get(`${institutionResource}/${evento.idInstituicao}`)

            setInstituicao(promise.data);
        } catch (error) {
            console.log("Erro na api");
            console.log(error);
        }
    }

    async function loadEventType(){
        try {
            const promise = await api.get(`${eventsTypeResource}/${evento.idTipoEvento}`)

            setTipoEvento(promise.data);

            console.log("Tipo Evento");
            console.log(promise.data);
        } catch (error) {
            console.log("Erro na api");
            console.log(error);
        }
    }

    async function loadEvent(){
        try {
            const promise = await api.get(`${eventsResource}/${idEvento}`);
            setEvento(promise.data);
            console.log("ID EVENTO :");
            console.log(promise.data);

        } catch (error) {
            console.log("Erro na api");
            console.log(error);
        }
    }

    useEffect(()=>{
        loadEvent();
        
        // loadEventType();

        // loadEventInstitution();
    }, []);

    return (
        <>
        <MainContent>
            <section className="detalhes-evento-section">
                    <Container>
                        <div className="detalhes-evento__box">                       
                            <Title titleText={"Nome Evento"}/>
                            <div className='left-items'>
                            <h1 className='item' >Descricao</h1>
                            <p>{evento.descricao}</p>
                            
                            <h1 className='item'>dataEvento</h1>
                            <p>{new Date(evento.dataEvento).toLocaleDateString()}</p>
                            </div>

                            <div className='right-items'>
                            <h1 className='item'>TipoEvento</h1>
                            <p>{tipoEvento.titulo}</p>
                            
                            <h1 className='item'>Instituicao</h1>
                            <p>{instituicao.nomeFantasia}</p>
                            </div>

                        </div>
                    </Container>
            </section>

            {/* Listagem de comentarios */}
            <section className='lista-comentarios-section'>
                    <Container>
                        <Title titleText={"Comentarios"} color="white"/>

                        <TableDetails/>
                    </Container>
            </section>
        </MainContent>
        </>
    );
};

export default DetalhesEvento;