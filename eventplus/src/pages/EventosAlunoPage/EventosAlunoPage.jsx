import React, { useContext, useEffect, useState } from "react";

// Componentes
import MainContent from "../../components/Main/MainContent";
import Title from "../../components/Titulo/Titulo";
import Table from "./TableEva/TableEva";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import Notification from '../../components/Notification/Notification';

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
  const [notifyUser, setNotifyUser] = useState({});


  // Recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  // UseEffect para carregar os eventos baseado no tipo selecionado
  useEffect(() => {
    // Função para carregar os tipos de eventos ao montar a página
    async function loadEventsType() {

      if (tipoEvento === "1") {
        try {
          const returnAllEvents = await api.get(eventsResource);

          const returnEvents = await api.get(`${MyEventsResource}/${userData.userId}`);

          const markedEvents = verifyPresence(returnAllEvents, returnEvents)
          setEventos(markedEvents)

          console.log("Todos eventos");
          console.log(returnAllEvents.data);
          console.log("MEus Eventos");
          console.log(returnEvents.data);
          console.log("eventos marcados");
          console.log(markedEvents.data);

        } catch (error) {
          notifyError("Erro na API ")
        }
      } else if (tipoEvento === "2") {
        try {
          const returnEvents = await api.get(`${MyEventsResource}/${userData.userId}`);
          // Verifique a estrutura dos dados retornados para acessar corretamente os eventos
          const arrEvents = returnEvents.data.map((e) => e.evento);
          setEventos(arrEvents);
        } catch (error) {
          notifyError("Erro na API")
        }
      } else {
        setEventos([]);
      }
    }

    loadEventsType();
  }, [tipoEvento]);



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
    // Retorna todos os eventos Marcado com a presenca do Usuario
    return arrAllEvents;
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

  const notifySuccess = (textNote) => {
    setNotifyUser({
        titleNote: "Sucesso",
        textNote,
        imgIcon: 'success',
        imgAlt: 'Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.',
        showMessage: true
    });
};

const notifyError = (textNote) => {
    setNotifyUser({
        titleNote: "Erro",
        textNote,
        imgIcon: 'danger',
        imgAlt: 'Imagem de ilustração de erro. Homem segurando um balão com símbolo de X.',
        showMessage: true
    });
};

const notifyWarning = (textNote) => {
    setNotifyUser({
        titleNote: "Aviso",
        textNote,
        imgIcon: 'warning',
        imgAlt: 'Imagem de ilustração de aviso. Mulher em frente a um grande ponto de exclamação.',
        showMessage: true
    });
};


  return (
    <>
     {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
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
