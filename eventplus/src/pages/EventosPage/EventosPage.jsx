import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Title from '../../components/Titulo/Titulo';
import MainContext from '../../components/Main/MainContent';
import './EventosPage.css';
import Container from '../../components/Container/Container';
import ImageIllustrator from '../../components/ImageIllustrator/ImageIllustrator'
import EventPhoto from '../../assets/images/evento.svg'
import { Button, Input } from '../../components/FormComponents/FormComponents';
import TableEv from './TableEv/TableEv';
import api, { eventsResource } from '../../Services/Service';
import Notification from '../../components/Notification/Notification';


const EventosPage = () => {

    const [eventos, setEventos] = useState([]);

    const [notifyUser, setNotifyUser] = useState();

    const [showSpinner, setShowSpinner] = useState(false)

    const [titulo, setTitulo] = useState("");

    useEffect(() => {
        // Função assíncrona que carrega os tipos de eventos
        async function loadEvents() {

            // setShowSpinner(true)
            try {
                // Faz uma requisição GET para a API para obter os tipos de eventos
                const retorno = await api.get(eventsResource);

                // Atualiza o estado 'tipoEventos' com os dados retornados da API
                setEventos(retorno.data);

                // Exibe os dados retornados no console para fins de depuração
                console.log(retorno.data);
            } catch (error) {
                // Se ocorrer um erro ao acessar a API, exibe uma mensagem de erro no console
                console.log("Erro na API");
            }
            // setShowSpinner(false)

        }

        // Chama a função 'loadEvents' ao carregar o componente 
        loadEvents();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (titulo.trim().length < 5) {
            setNotifyUser({
                titleNote: "Titulo deve Possuir mais de 3 Caracteres",
                textNote: `Nao foi possivel Cadastrar o ${titulo}`,
                imgIcon: "danger",
                imgAlt: "Imagem de ilustracai de erro, Warning!",
                showMessage: true
            })
        }
    }

    return (
        <>
        
            <MainContext>
                <Header />
                <Container>
                    <div className='cadastro-evento__box '>

                        <ImageIllustrator imageRender={EventPhoto} />
                        <form className='ftipo-evento'>
                            <Input
                                id={"Nome"}
                                placeholder={"Nome"}
                                name={"nome"}
                                type={"text"}
                                required={"required"}
                            />

                            <Input
                                id={"Descricao"}
                                placeholder={"Descricao"}
                                name={"descricao"}
                                type={"text"}
                                required={"required"}
                            />

                            <Input
                                id={"TipoEvento"}
                                placeholder={"Tipo Evento"}
                                name={"tipo evento"}
                                type={"text"}
                                required={"required"}
                            />

                            <Input
                                id={"Data"}
                                placeholder={"Data"}
                                name={"data"}
                                type={"date"}
                                required={"required"}
                            />

                            <Button
                                textButton={"Cadastrar"}
                                id={"cadastrar"}
                                name={"cadastrar"}
                                type={"submit"}
                            />

                        </form>

                    </div>
                </Container>
                <section className='lista-eventos-section'>
                    <Container>
                        <Title titleText={"Lista Eventos"} color="white" />
                        <TableEv dados={eventos} />
                    </Container>
                </section>
            </MainContext>


        </>
    );
};

export default EventosPage;