import React, { Fragment, useEffect, useState, useContext } from 'react';
import "./DetailsPage.css"

import Title from '../../components/Titulo/Titulo';
import MainContent from '../../components/Main/MainContent.jsx'
import Container from '../../components/Container/Container';

import TableDetails from './TableDetails/TableDetails';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/AuthContext';

import api, {eventsResource, commentsResource, commentsTrueResource} from "../../Services/Service"

const DetalhesEvento = () => {

    const { userData } = useContext(UserContext);

    const {idEvento} = useParams(); 

    const [evento, setEvento] = useState([]);

    const [ comentarios, setComentarios] = useState([]);

    async function loadEvent(){
        try {
            const promise = await api.get(`${eventsResource}/${idEvento}`);
            console.log("OLha AQQQQ");
            console.log(promise.data);
            setEvento(promise.data);

        } catch (error) {
            console.log("Erro na api");
            console.log(error);
        }
    }

    async function loadAllComentary() {
        try {
            const promise = await api.get(`${commentsResource}`)

            setComentarios(promise.data);
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa777");
            console.log(promise.data);
        } catch (error) {
            console.log("Erro na api");
            console.log(error);
        }
    }

    async function loadTrueComentary() {
        try {
            const promise = await api.get(`${commentsTrueResource}`)

            setComentarios(promise.data);
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(promise.data);
            
        } catch (error) {
            console.log("Erro na api");
            console.log(error);
        }
    }

    function loadComentaryByUser() {
        if (userData.nome && userData.role === "Administrador") {
            loadAllComentary();
        } else if (userData.nome && userData.role === "Aluno") {
            loadTrueComentary();
        } 
    }
    
    


    useEffect(()=>{
        loadEvent();
        
        loadComentaryByUser();
    }, []);

    return (
        <>
        <MainContent>
            <section className="detalhes-evento-section">
                    <Container>

                        <div className="detalhes-evento__box">     
                        <Title titleText={evento.nomeEvento}/>

                            <div className='left-items'>
                            <h1 className='item' >Descricao</h1>
                            <p>{evento.descricao}</p>
                            
                            <h1 className='item'>dataEvento</h1>
                            <p>{new Date(evento.dataEvento).toLocaleDateString()}</p>
                            </div>

                            <div className='right-items'>

                            <h1 className='item'>TipoEvento</h1>
                            <p>{evento.tiposEvento?.titulo}</p>
                            
                            <h1 className='item'>Instituicao</h1>
                            <p>{evento.instituicao?.nomeFantasia}</p> 
                            </div>

                        </div>
                    </Container>
            </section>

            {/* Listagem de comentarios */}
            <section className='lista-comentarios-section'>
                    <Container>
                        <Title titleText={"Comentarios"} color="white"/>

                        <TableDetails
                            dadosComent={comentarios}
                        />
                    </Container>
            </section>
        </MainContent>
        </>
    );
};

export default DetalhesEvento;