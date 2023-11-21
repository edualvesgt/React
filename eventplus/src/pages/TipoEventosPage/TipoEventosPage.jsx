//IMPORTS
import React, { useEffect, useState } from 'react';
import './TipoEventosPage.css';
import Header from '../../components/Header/Header';
import Title from '../../components/Titulo/Titulo';
import MainContent from '../../components/Main/MainContent.jsx'
import Container from '../../components/Container/Container';
import ImageIllustrator from '../../components/ImageIllustrator/ImageIllustrator';
import TableTp from './TableTp/TableTp';
import tipoEventoImage from '../../assets/images/tipo-evento.svg'
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api, { eventsTypeResource } from '../../Services/Service'
import Notification from '../../components/Notification/Notification';
import Spinner from '../../components/Spinner/Spinner'

// Componente para gerenciar os Tipos de Eventos
const TipoEventos = () => {
    // Variáveis de estado usando React Hooks
    const [notifyUser, setNotifyUser] = useState();

    const [frmEdit, setFrmEdit] = useState(false); // Inicialmente não está no modo de edição

    const [titulo, setTitulo] = useState("");

    const [tipoEventos, setTipoEventos] = useState([]);

    const [idEvento, setIdEvento] = useState(null); //Para editar, por conta do evento!

    const [showSpinner , setShowSpinner] = useState (false)


    // Este trecho utiliza o hook useEffect para carregar os tipos de eventos quando há mudanças em 'tipoEventos'
    useEffect(() => {
        // Função assíncrona que carrega os tipos de eventos
        async function loadEventsType() {

            setShowSpinner(true)
            try {
                // Faz uma requisição GET para a API para obter os tipos de eventos
                const retorno = await api.get(eventsTypeResource);

                // Atualiza o estado 'tipoEventos' com os dados retornados da API
                setTipoEventos(retorno.data);

                // Exibe os dados retornados no console para fins de depuração
                console.log(retorno.data);
            } catch (error) {
                // Se ocorrer um erro ao acessar a API, exibe uma mensagem de erro no console
                console.log("Erro na API");
            }
            setShowSpinner(false)

        }

        // Chama a função 'loadEventsType' ao carregar o componente 
        loadEventsType();
    }, []);



    // Função para lidar com o envio do formulário
    async function handleSubmit(e) {
        e.preventDefault();
        // Validação para o comprimento do título
        if (titulo.trim().length < 3) {
            alert("O Título deve ter pelo menos 3 caracteres ")
        }

        try {
            // Envio do título para a API
            const retorno = await api.post(eventsTypeResource, { titulo: titulo })
            setTitulo("");

            setNotifyUser({
                titleNote: "Sucesso",
                textNote: `${titulo}  Cadastrado com sucesso`,
                imgIcon: "Success",
                imgAlt: "Imagem de Ilustracao de sucesso . Moca segurando um balao com simbolo de confirmacao",
                showMessage: true
            });

            const buscaEventos = await api.get(eventsTypeResource);

            setTipoEventos(buscaEventos.data);

        } catch (error) {
            alert("Ocorreu um erro ao enviar")
        }
    }

  

    // Função para lidar com a ação de atualização
    async function handleUpdate(e) {
        e.preventDefault()
        try {
            const promiseRetorno = await api.put( `${eventsTypeResource}/${idEvento}`, {titulo: titulo });

            if (promiseRetorno.status === 204) {
                //Notificar usuario
                setNotifyUser({
                    titleNote: "Sucesso",
                    textNote: `Atualizado com sucesso`,
                    imgIcon: "success",
                    imgAlt: "Imagem de ilustracao de sucesso. moca segurando um balao com simbolo de confirmacao ok",
                    showMessage: true
                });
            }

            //Atualizar dados
            const retorno = await api.get("/TiposEvento");
            setTipoEventos(retorno.data)

            //Chama a funcao para resertar parametros
            editActionAbort();


        } catch (error) {

            setNotifyUser({
                titleNote: "Erro na Aplicacao",
                textNote: `Nao foi possivel atualizar ${error}`,
                imgIcon: "danger",
                imgAlt: "Imagem de ilustracai de erro, Warning!",
                showMessage: true
            });

            console.log(error);
        }
    }

    // cancela a tela de acao de edicao (volta para o form de cadastro)
    function editActionAbort() {
        setFrmEdit(false)
        setTitulo("")
        setIdEvento(null); //Reseta as variaveis
    }

    // Mostra o formulario de edicao 
    async function showUpdateForm(idElement) {
        setFrmEdit(true)

        try {
            const retorno = await api.get(`${eventsTypeResource}/${idElement}`)
            setTitulo(retorno.data.titulo)
            setIdEvento(retorno.data.idTipoEvento)  

        } catch (error) {
            setNotifyUser({
                titleNote: "Sucesso",
                textNote: `Atualizado com sucesso`,
                imgIcon: "success",
                imgAlt: "Imagem de ilustracai de sucessi.moca segurando um balao com simbolo de confirmacao ok",
                showMessage: true
            });
        }
    }
    // apaga o tipo de evento na api
    // Esta função lida com a exclusão de um elemento pelo seu ID
    async function handleDelete(idElemento, titulo) {
        try {
            // Envia uma requisição DELETE para a API usando o ID fornecido
            const resposta = await api.delete(`${eventsTypeResource}/${idElemento}`);

            if (!window.confirm("Deseja apagar este Evento")) {
                return;
            }

            // Se a exclusão for bem-sucedida (código de status 204), exibe uma mensagem de sucesso e atualiza o estado
            if (resposta.status === 204) {



                const buscaEventos = await api.get(eventsTypeResource);

                setTipoEventos(buscaEventos.data);

                setNotifyUser({
                    titleNote: "Sucesso",
                    textNote: `${titulo} Excluido com Sucesso`,
                    imgIcon: "Success",
                    imgAlt: "Imagem de Ilustracao de sucesso . Moca segurando um balao com simbolo de confirmacao",
                    showMessage: true
                });

            }
        } catch (erro) {
            // Se ocorrer um erro durante a exclusão, exibe uma mensagem de erro
            alert("Ocorreu um erro ao enviar");
        }
    }


    return (
        <>

            <Notification  {...notifyUser} setNotifyUser={setNotifyUser} />
            {/* Renderizando o componente Header */}
            <Header />
            <MainContent>
                
                <section className="cadastro-evento-section">
                    <Container>
                        <div className="cadastro-evento__box">
                            {/* Renderizando o componente Title */}
                            <Title titleText={"Cadastro Tipos de Eventos"} />

                            {/* Renderizando o componente ImageIllustrator */}
                            <ImageIllustrator
                                imageRender={tipoEventoImage}
                            />

                            {/* Formulário para adicionar ou atualizar eventos */}
                            <form className='ftipo-evento' onSubmit={frmEdit ? handleUpdate : handleSubmit}>
                                {
                                    // Renderização condicional baseada no estado de frmEdit
                                    !frmEdit ? (
                                        <>
                                            {/* <p>Tela de Cadastro</p> */}

                                            {/* Campo de entrada para o título */}
                                            <Input
                                                id={"Titulo"}
                                                placeholder={"Titulo"}
                                                name={"titulo"}
                                                type={"text"}
                                                required={"required"}
                                                value={titulo}
                                                manipulationFunction={(e) => { setTitulo(e.target.value) }}
                                            />
                                            {/* Botão para enviar o formulário */}
                                            <Button
                                                textButton={"Cadastrar"}
                                                id={"cadastrar"}
                                                name={"cadastrar"}
                                                type={"submit"}

                                            />


                                        </>
                                    ) : (
                                        <>
                                            {/* <p>Tela de Edicao</p> */}

                                            {/* Campo de Edicao para o título */}
                                            <Input
                                                id={"Titulo"}
                                                placeholder={"Titulo"}
                                                name={"titulo"}
                                                type={"text"}
                                                required={"required"}
                                                value={titulo}
                                                manipulationFunction={(e) => { setTitulo(e.target.value) }}
                                            />
                                            <div className="buttons-editbox">

                                                <Button
                                                    textButton={"Atualizar"}
                                                    id={"update"}
                                                    name={"atualizar"}
                                                    type={"submit"}
                                                    manipulationFunction={handleUpdate}
                                                    additionalClass={"buttom-component--middle"}


                                                />

                                                <Button
                                                    textButton={"Cancelar"}
                                                    id={"cancelar"}
                                                    name={"Cancelar"}
                                                    type={"buttom"}
                                                    manipulationFunction={editActionAbort}
                                                    additionalClass={"buttom-component--middle"}

                                                />
                                            </div>

                                        </>

                                    )
                                }
                            </form>
                        </div>
                    </Container>
                </section>
                <section className="lista-eventos-section">
                    <Container>
                        <Title titleText={"Lista Tipo de eventos"} color="white" />

                        <TableTp dados={tipoEventos} fnUpdate={showUpdateForm} fnDelete={handleDelete} />
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default TipoEventos;
