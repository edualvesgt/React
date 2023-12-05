import React, { useContext, useEffect, useState } from "react";

// Componentes
import MainContent from "../../components/Main/MainContent";
import Title from "../../components/Titulo/Titulo";
import Table from "./TableEva/TableEva";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";

// Serviços
import api, { eventsResource, MyEventsResource } from "../../Services/Service";

// Estilos
import "./EventosAlunoPage.css";

// Contexto
import { UserContext } from "../../context/AuthContext";

const EventosAlunoPage = () => {
  // Estados
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" }
  ]);
  const [tipoEvento, setTipoEvento] = useState(""); // Código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  // UseEffect para carregar os eventos baseado no tipo selecionado
  useEffect(() => {
    loadEventsType();
  }, [tipoEvento]);

  // Função para carregar os tipos de eventos ao montar a página
  async function loadEventsType() {
    if (tipoEvento === "1") {
      try {
        const retorno = await api.get(eventsResource);
        setEventos(retorno.data);
      } catch (error) {
        console.log(error);
      }
    } else if (tipoEvento === "2") {
      try {
        const returnEvents = await api.get(`${MyEventsResource}/${userData.userId}`);
        // Verifique a estrutura dos dados retornados para acessar corretamente os eventos
        const arrEventos = returnEvents.data.map((e) => e.evento);
        setEventos(arrEventos);
      } catch (error) {
        console.log(error);
      }
    } else {
      setEventos([]);
    }
  }

  // Função para verificar a presença de eventos do usuário em todos os eventos
  const verifyPresence = (arrAllEvents, eventsUser) => {
    // Itera sobre todos os eventos em arrAllEvents
    for (let x = 0; x < arrAllEvents.length; x++) {
      // Itera sobre todos os eventos em eventsUser
      for (let i = 0; i < eventsUser.length; i++) {
        // Verifica se o ID do evento em arrAllEvents é igual ao ID do evento em eventsUser
        if (arrAllEvents[x].idEvento === eventsUser[i].idEvento) {
          // Se os IDs forem iguais, atualiza a situação do evento em arrAllEvents com a situação do evento em eventsUser
          arrAllEvents[x].situacao = eventsUser[i].situacao;
        }
      }
    }

  }

  // Função para alternar entre "Meus Eventos" e "Todos os Eventos"
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  // Função para carregar o comentário do usuário
  async function loadMyComentary(idComentary) {
    return "????";
  }

  // Função para exibir ou esconder o modal
  const showHideModal = () => {
    setShowModal(!showModal);
  };

  // Função para remover o comentário
  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  // Função para conectar evento
  function handleConnect() {
    alert("Desenvolver a função conectar evento");
  }

  return (
    <>
      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          {/* Select para escolha entre "Meus Eventos" e "Todos os Eventos" */}
          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos}
            manipulationFunction={(e) => myEvents(e.target.value)}
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          />
          {/* Tabela de eventos */}
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER - Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {/* Modal para remoção de comentário */}
      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
