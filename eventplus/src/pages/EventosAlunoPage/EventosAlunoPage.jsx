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
import api, { commentsResource, eventsResource, MyEventsResource, presenceEventResource } from "../../Services/Service";

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
  const [comentario, setComentario] = useState();
  const [idComentario, setIdComentario] = useState();
  const [novoComentario, setNovoComentario] = useState("");
  const [idEvento, setIdEvento] = useState();

  const [newCommentary, setNewCommentary] = useState();

  // Recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  // UseEffect para carregar os eventos baseado no tipo selecionado
  useEffect(() => {
    
    loadEventsType();
  }, [tipoEvento, userData.userId]);

  // Função para carregar os tipos de eventos ao montar a página
  async function loadEventsType() {

    if (tipoEvento === "1") {
      try {
        const returnAllEvents = await api.get(eventsResource);

        const returnEvents = await api.get(`${MyEventsResource}/${userData.userId}`);

        const markedEvents = verifyPresence(returnAllEvents.data, returnEvents.data)

        setEventos(markedEvents)

      } catch (error) {
        notifyError("Erro na API ")
      }
    } else if (tipoEvento === "2") {
      try {
        const returnEvents = await api.get(`${MyEventsResource}/${userData.userId}`);
        // Verifique a estrutura dos dados retornados para acessar corretamente os eventos
        const arrEvents = []
        returnEvents.data.forEach((e) => {
          arrEvents.push({ ...e.evento, situacao: e.situacao, idPresencaEvento: e.idPresencaEvento })
        });
        setEventos(arrEvents);
      } catch (error) {
        notifyError("Erro na API")
      }
    } else {
      setEventos([]);
    }
  }

  // Função p ra verificar a presença de eventos do usuário em todos os eventos
  const verifyPresence = (arrAllEvents, eventsUser) => {
    // Itera sobre todos os eventos em arrAllEvents
    for (let x = 0; x < arrAllEvents.length; x++) {
      // Itera sobre todos os eventos em eventsUser
      for (let i = 0; i < eventsUser.length; i++) {
        // Verifica se o ID do evento em arrAllEvents é igual ao ID do evento em eventsUser
        if (arrAllEvents[x].idEvento === eventsUser[i].evento.idEvento) {
          // Se os IDs forem iguais, atualiza a situação do evento em arrAllEvents com a situação do evento em eventsUser
          arrAllEvents[x].situacao = eventsUser[i].situacao;
          // Se os IDs forem iguais, atualiza O id do Presenca evento em arrAllEvents com a situação do evento em eventsUser
          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
          break;
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
  async function loadMyCommentary(_idEvento) {

    const request = await api.get(`${commentsResource}/BuscarPorIdUsuario?idAluno=${userData.userId}&idEvento=${idEvento}`)
    setComentario(request.data.descricao)
    setIdComentario(request.data.idComentarioEvento)
    console.log(request.data.idComentarioEvento);


  }

  // Função para exibir ou esconder o modal
  const showHideModal = (idEvento) => {
    setShowModal(!showModal);
    setUserData({ ...userData, idEvento: idEvento })
    setIdEvento(idEvento)
  };

  // Função para remover o comentário
  async function commentaryRemove() {
    try {
        const request = await api.delete(`${commentsResource}/${idComentario}`)
        setComentario("")
        notifySuccess("Comentario Deletado Com Sucesso")
    } catch (error) {
      notifyError("Erro Verificar Conexão ")
    }
  };

  async function postCommentary() {
    try {
      const postEvent = await api.post(commentsResource, {
        "descricao": newCommentary,
        "exibe": true,
        "idUsuario": userData.userId,
        "idEvento": idEvento
      })
      const request = await api.get(`${commentsResource}/BuscarPorIdUsuario?idAluno=${userData.userId}&idEvento=${idEvento}`)
      setComentario(newCommentary)
      setNewCommentary("")
      notifySuccess("Comentario Realizado")


    } catch (error) {
      notifyError("Erro ao Comentar ")
    }
  }

  // Função para conectar evento
  async function handleConnect(eventId, functionConnect, presenceId = null) {

    // Verifica se a ação é para conectar
    if (functionConnect === "connect") {

      try {
        // Faz uma requisição POST para confirmar a presença no evento
        const promise = await api.post(presenceEventResource, {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: eventId
        })

        // Se a requisição for bem-sucedida (status 201), exibe uma mensagem de sucesso
        if (promise.status === 201) {
          notifySuccess("Seja Bem vindo ao Evento, Presença Confirmada")
        }

        // Obtém todos os eventos após a confirmação da presença
        const allEvents = await api.get(eventsResource)
        // Atualiza a lista de eventos na aplicação
        setEventos(allEvents.data)

        loadEventsType()
      } catch (error) {
        // Se houver um erro na requisição, exibe uma mensagem de erro
        notifyError("Erro na API")
      }

      // Encerra a função após a ação de conectar
      return;
    }

    //Bloco de codigo sem ELSE pois foi encerrado com return e inicializado novamente 

    // Se a ação não for conectar, então é para desconectar
    try {
      // Faz uma requisição DELETE para remover a presença do evento
      const unconnected = await api.delete(`${presenceEventResource}/${presenceId}`)

      // Se a remoção for bem-sucedida (status 204), atualiza a lista de eventos na aplicação
      if (unconnected.status === 204) {
        const allEvents = await api.get(eventsResource)
        setEventos(allEvents.data)

      }
      // Exibe uma mensagem de sucesso informando que o cadastro foi desfeito
      notifySuccess("Seu Cadastro foi desfeito com sucesso")

      loadEventsType()
    } catch (error) {
      // Se houver um erro na requisição, exibe uma mensagem de erro
      notifyError("Erro na API")
    }
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
            fnShowModal={showHideModal}
          />
        </Container>
      </MainContent>

      {/* SPINNER - Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {/* Modal para remoção de comentário */}
      {showModal ? (
        <Modal
          userId={userData.userId}
          fnNewCommentary={newCommentary}
          fnGet={loadMyCommentary}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
          commentaryText={comentario}
          fnPost={postCommentary}

          newCommentary={newCommentary}
          setNewCommentary={setNewCommentary}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
