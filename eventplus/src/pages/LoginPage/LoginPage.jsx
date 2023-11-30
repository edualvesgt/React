// Imports do React Router e React
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

// Imports de assets
import loginImage from "../../assets/images/login.svg";
import logo from "../../assets/images/logo-pink.svg";

// Imports de componentes
import { Button, Input } from "../../components/FormComponents/FormComponents";
import Header from '../../components/Header/Header';
import ImageIllustrator from '../../components/ImageIllustrator/ImageIllustrator';
import Notification from '../../components/Notification/Notification';

// Imports de serviços/API/Context
import api, { HomeResource, LoginResource } from '../../Services/Service';
import { UserContext, userDecodeToken } from '../../context/AuthContext';

// Estilos CSS
import "./LoginPage.css";

const LoginPage = () => {
  // Declarações de useState organizadas em ordem alfabética
  const navigate = useNavigate();
  const [notifyUser, setNotifyUser] = useState({});
  const [user, setUser] = useState({ email: "teste@teste.com", senha: "" });
  const { userData, setUserData } = useContext(UserContext); // Importa os Dados do usuario
  // Declarações de useState organizadas em ordem alfabética

  useEffect(() => {
    if (userData.nome) {
      navigate(LoginResource)
    }
  }, [userData])


  // Função para lidar com o envio do formulário de login
  async function handleSubmit(e) {
    e.preventDefault();

    if (user.email.length >= 3 && user.senha.length >= 3) {
      try {
        const promise = await api.post(LoginResource, {
          "email": user.email,
          "senha": user.senha
        });

        const userFullToken = userDecodeToken(promise.data.token)

        //Guarda  o token Globalmente 
        setUserData(userFullToken);
        localStorage.setItem("token", JSON.stringify(userFullToken))

        navigate(HomeResource)

        notifySuccess("Seja Bem-Vindo , Login Efetuado Com Sucesso");

      } catch (error) {
        notifyError("erro no Login");
      }
    } else {
      notifyWarning("Senha deve conter mais de 3 caracteres");
    }


  }

  // Função para exibir uma notificação de sucesso
  const notifySuccess = (textNote) => {
    setNotifyUser({
      titleNote: "Sucesso",
      textNote,
      imgIcon: 'success',
      imgAlt: 'Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.',
      showMessage: true
    });
  };

  // Função para exibir uma notificação de erro
  const notifyError = (textNote) => {
    setNotifyUser({
      titleNote: "Erro",
      textNote,
      imgIcon: 'danger',
      imgAlt: 'Imagem de ilustração de erro. Homem segurando um balão com símbolo de X.',
      showMessage: true
    });
  };

  // Função para exibir uma notificação de aviso
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
      <Header />
      <div className="layout-grid-login">
        <div className="login">
          <div className="login__illustration">
            <div className="login__illustration-rotate"></div>
            <ImageIllustrator
              imageRender={loginImage}
              imageName="login"
              altText="Imagem de um homem em frente de uma porta de entrada"
              additionalClass={"login-illustrator "}
            />
          </div>
          <div className="frm-login">
            <img src={logo} className="frm-login__logo" alt="" />
            <form className="frm-login__formbox" onSubmit={handleSubmit}>
              <Input
                additionalClass={"frm-login__entry"}
                type="email"
                id="login"
                name="login"
                required={true}
                value={user.email}
                manipulationFunction={(e) => { setUser({ ...user, email: e.target.value.trim() }) }}
                placeholder="Username"
              />
              <Input
                additionalClass={"frm-login__entry"}
                type="password"
                id="senha"
                name="senha"
                required={true}
                value={user.senha}
                manipulationFunction={(e) => { setUser({ ...user, senha: e.target.value.trim() }) }}
                placeholder="****"
              />
              <Button
                textButton={"Login"}
                id="btn-login"
                name="btn-login"
                type="submit"
                additionalClass={"frm-login__button"}
              // manipulationFunction={() => { }}
              />
              <a href="" className="frm-login__link">
                Esqueceu a senha?
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
