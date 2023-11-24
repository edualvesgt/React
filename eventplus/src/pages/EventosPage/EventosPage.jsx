import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Title from '../../components/Titulo/Titulo';
import MainContext from '../../components/Main/MainContent';
import './EventosPage.css';
import Container from '../../components/Container/Container';
import ImageIllustrator from '../../components/ImageIllustrator/ImageIllustrator'
import EventPhoto from '../../assets/images/evento.svg'
import { Button, Input, Select } from '../../components/FormComponents/FormComponents';
import TableEv from './TableEv/TableEv';
import api, { eventsResource, eventsTypeResource } from '../../Services/Service';
import Notification from '../../components/Notification/Notification';
import Titulo from '../../components/Titulo/Titulo';


const EventosPage = () => {

    const [eventos, setEventos] = useState([]);

    const [idEventos, setIdEventos] = useState([]);

    const [listTipoEvento, setListTipoEvento] = useState([]); //uma lista do tipo de evento

    const [frmEdit, setFrmEdit] = useState(false)

    const [notifyUser, setNotifyUser] = useState({});

    const [showSpinner, setShowSpinner] = useState(false)

    const [titulo, setTitulo] = useState("");

    const [dataEvento, setDataEvento] = useState()

    const [nomeEvento, setNomeEvento] = useState()

    const [descricao, setDescricao] = useState()

    const [idTipoEvento, setIdTipoEvento] = useState();

    const Instituicao = "6aa3a247-56ea-412d-9ccc-41fab9b79515"

    const [tipoEvento, setTipoEvento] = useState() // Teste para ver o metodo

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


                const request = await (await api.get(eventsTypeResource)).data

                setListTipoEvento(request);
            } catch (error) {
                // Se ocorrer um erro ao acessar a API, exibe uma mensagem de erro no console
                console.log("Erro na API");
            }
            // setShowSpinner(false)

        }

        // Chama a função 'loadEvents' ao carregar o componente 
        loadEvents();
    }, []);

    async function ApiReload() {
        const searchEvent = await api.get(eventsResource);

        setEventos(searchEvent.data);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (nomeEvento.trim().length < 5) {

            setNotifyUser({
                titleNote: "Titulo deve Possuir mais de 3 Caracteres",
                textNote: `Nao foi possivel Cadastrar o ${nomeEvento}`,
                imgIcon: "danger",
                imgAlt: "Imagem de ilustracai de erro, Warning!",
                showMessage: true
            })
        }
        else try {
            const retorno = await api.post(eventsResource, {

                "dataEvento": dataEvento,
                "nomeEvento": nomeEvento,
                "descricao": descricao,
                "idTipoEvento": idTipoEvento,
                "idInstituicao": Instituicao
            })


            setNotifyUser({
                titleNote: "Sucesso",
                textNote: `${nomeEvento}  Cadastrado com sucesso`,
                imgIcon: "Success",
                imgAlt: "Imagem de Ilustracao de sucesso . Moca segurando um balao com simbolo de confirmacao",
                showMessage: true
            });

            ApiReload();

        } catch (error) {

            setNotifyUser({
                titleNote: "Erro ao Enviar ",
                textNote: `Nao foi possivel atualizar ${error}`,
                imgIcon: "danger",
                imgAlt: "Imagem de ilustracai de erro, Warning!",
                showMessage: true
            });
        }
    }

    async function handleDelete(idElement, nomeEvento) {

        if (window.confirm("Deseja Apagar este Evento")) {

            try {
                const retorno = api.delete(`${eventsResource}/${idElement}`)

                console.log((await retorno).status);

                ApiReload();
                setNotifyUser({
                    titleNote: "Sucesso",
                    textNote: `${nomeEvento} Excluido com Sucesso`,
                    imgIcon: "Success",
                    imgAlt: "Imagem de Ilustracao de sucesso . Moca segurando um balao com simbolo de confirmaco",
                    showMessage: true
                });

            } catch (error) {

                setNotifyUser({
                    titleNote: "Erro ao envir",
                    textNote: `Nao foi possivel atualizar ${error}`,
                    imgIcon: "danger",
                    imgAlt: "Imagem de ilustracai de erro, Warning!",
                    showMessage: true
                });
            }

        }


    }

    async function handleUpdate(e) {

        e.preventDefault();

        try {
            await api.put(`${eventsResource}/${idEventos}`, {
                "dataEvento": dataEvento,
                "nomeEvento": nomeEvento,
                "descricao": descricao,
                "idTipoEvento": idTipoEvento,
                "idInstituicao": Instituicao
            });

            setNotifyUser({
                titleNote: "Sucesso",
                textNote: `Atualizado com sucesso`,
                imgIcon: "success",
                imgAlt: "Imagem de ilustracao de sucesso. moca segurando um balao com simbolo de confirmacao ok",
                showMessage: true
            });
            ApiReload();

            editActionAbort();
        } catch (error) {

        }


    }

    async function showUpdate(idElement) {
        setFrmEdit(true)
        setIdEventos(idElement)

        try {
            const retorno = await api.get(eventsResource + "/" + idElement)
            setNomeEvento(retorno.data.nomeEvento);
            setDataEvento(retorno.data.dataEvento.slice(0, 10));
            setDescricao(retorno.data.descricao);
            setIdTipoEvento(retorno.data.idTipoEvento)
            


        } catch (error) {
            console.log(error);
        }
    }


    function editActionAbort(params) {
        setFrmEdit(false)
        setNomeEvento("")
        setDataEvento("")
        setDescricao("")
       
    }

    return (
        <>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
            <MainContext>
                <Header />
                <Container>
                    <div className='cadastro-evento__box '>

                        <Titulo titleText={"Eventos"} />

                        <ImageIllustrator imageRender={EventPhoto} />
                        <form className='ftipo-evento' onSubmit={frmEdit ? handleUpdate : handleSubmit}>
                            {
                                !frmEdit ? (

                                    // CADASTRAR
                                    <>
                                        <Input
                                            id={"Nome"}
                                            placeholder={"Nome"}
                                            name={"nome"}
                                            type={"text"}
                                            required={"required"}
                                            value={nomeEvento}
                                            manipulationFunction={(e) => { setNomeEvento(e.target.value) }}
                                        />

                                        <Input
                                            id={"Descricao"}
                                            placeholder={"Descricao"}
                                            name={"descricao"}
                                            type={"text"}
                                            required={"required"}
                                            value={descricao}
                                            manipulationFunction={(e) => { setDescricao(e.target.value) }}
                                        />

                                        <Select
                                            id={"TipoEvento"}
                                            name={"tipo evento"}
                                            options={listTipoEvento}
                                            required={"required"}
                                            manipulationFunction={e => {
                                                setIdTipoEvento(e.target.value)
                                            }}

                                        />

                                        <Input
                                            id={"Data"}
                                            placeholder={"Data"}
                                            name={"data"}
                                            type={"date"}
                                            required={"required"}
                                            value={dataEvento}
                                            manipulationFunction={(e) => { setDataEvento(e.target.value) }}
                                        />

                                        <Button
                                            textButton={"Cadastrar"}
                                            id={"cadastrar"}
                                            name={"cadastrar"}
                                            type={"submit"}

                                        />

                                    </>
                                ) : (
                                    //Tela Edicao 
                                    <>
                                        <Input
                                            id={"Nome"}
                                            placeholder={"Nome"}
                                            name={"nome"}
                                            type={"text"}
                                            required={"required"}
                                            value={nomeEvento}
                                            manipulationFunction={(e) => { setNomeEvento(e.target.value) }}
                                        />

                                        <Input
                                            id={"Descricao"}
                                            placeholder={"Descricao"}
                                            name={"descricao"}
                                            type={"text"}
                                            required={"required"}
                                            value={descricao}
                                            manipulationFunction={(e) => { setDescricao(e.target.value) }}
                                        />

                                        <Select
                                            id={"TipoEvento"}
                                            name={"tipo evento"}
                                            options={listTipoEvento}
                                            required={"required"}
                                            manipulationFunction={e => {
                                                setIdTipoEvento(e.target.value)
                                            }}

                                        />

                                        <Input
                                            id={"Data"}
                                            placeholder={"Data"}
                                            name={"data"}
                                            type={"date"}
                                            required={"required"}
                                            value={dataEvento}
                                            manipulationFunction={(e) => { setDataEvento(e.target.value) }}
                                        />
                                        <div className="buttons-editbox">
                                            <Button
                                                textButton={"Editar"}
                                                id={"Editar"}
                                                name={"Editar"}
                                                type={"submit"}
                                               
                                            />

                                            <Button
                                                textButton={"Cancelar"}
                                                id={"cancelar"}
                                                name={"cancelar"}
                                                type={"buttom"}
                                                manipulationFunction={editActionAbort}
                                            />
                                        </div>

                                    </>
                                )
                            }

                        </form>

                    </div>
                </Container>
                <section className='lista-eventos-section'>
                    <Container>
                        <Title titleText={"Lista Eventos"} color="white" />
                        <TableEv dados={eventos} fnDelete={handleDelete} fnUpdate={showUpdate} />
                    </Container>
                </section>
            </MainContext>


        </>
    );
};

export default EventosPage;