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

// Componente para gerenciar os Tipos de Eventos
const TipoEventos = () => {
    // Variáveis de estado usando React Hooks
    const [frmEdit, setFrmEdit] = useState(false); // Inicialmente não está no modo de edição
    const [titulo, setTitulo] = useState("");
    const [tipoEventos, setTipoEventos] = useState([]);
    // Este trecho utiliza o hook useEffect para carregar os tipos de eventos quando há mudanças em 'tipoEventos'
    useEffect(() => {
        // Função assíncrona que carrega os tipos de eventos
        async function loadEventsType() {
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
        }

        // Chama a função 'loadEventsType' ao carregar o componente ou quando 'tipoEventos' muda
        loadEventsType();
    }, [tipoEventos]); // O useEffect é acionado quando 'tipoEventos' sofre alterações

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
            alert("Cadastrado com Sucesso")
        } catch (error) {
            alert("Ocorreu um erro ao enviar")
        }
    }

    // Função para lidar com a ação de atualização
    function handleUpdate() {
        alert("Vamos editar")
    }

    // cancela a tela de acao de edicao (volta para o form de cadastro)
    function editActionAbort() {
        alert(`cancelar a tela de edicao de dados`)
    }
    // Mostra o formulario de edicao 
    function showUpdateForm() {
        alert(`vamos mostar o formulario`)
    }
    // apaga o tipo de evento na api
    // Esta função lida com a exclusão de um elemento pelo seu ID
    async function handleDelete(idElemento) {
        try {
            // Envia uma requisição DELETE para a API usando o ID fornecido
            const resposta = await api.delete(`${eventsTypeResource}/${idElemento}`);

            if (!window.confirm("Deseja apagar este Evento")) {
                return;
            }

            // Se a exclusão for bem-sucedida (código de status 204), exibe uma mensagem de sucesso e atualiza o estado
            if (resposta.status === 204) {
                alert("Apagado com Sucesso"); // Mensagem de sucesso
                setTipoEventos([]); // Limpa o estado tipoEventos (presumindo que esta variável de estado seja declarada e usada em outro lugar)
            }
        } catch (erro) {
            // Se ocorrer um erro durante a exclusão, exibe uma mensagem de erro
            alert("Ocorreu um erro ao enviar");
        }
    }


    return (
        <>
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
                                            <p>Tela de Cadastro</p>
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
                                        // Se estiver no modo de edição, renderizar esta mensagem
                                        <p>Tela de edição </p>
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
