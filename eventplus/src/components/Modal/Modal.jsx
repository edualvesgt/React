import React, { useContext, useEffect, useState } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";
import { UserContext } from "../../context/AuthContext";

import { Button, Input } from "../FormComponents/FormComponents";
import "./Modal.css";

const Modal = ({
  modalTitle = "Feedback",
  commentaryText = "",
  comentarioDesc,setComentarioDesc = null,
  userId = null,
  showHideModal = false,
  fnDelete = null,
  fnGet = null,
  fnPost = null
}) => {
 useEffect( () => {
    async function loadDados() {
      fnGet(userData.userId, userData.idEvento)
      console.log(userData);
    }
    loadDados();
  }, [comentarioDesc])

const {userData} = useContext(UserContext)
// const [comentarioDesc, setComentarioDesc] = useState("");
  
  return (
    <div className="modal">
      <article className="modal__box">
        
        <h3 className="modal__title">
          {modalTitle}
          <span className="modal__close" onClick={()=> showHideModal(true)}>x</span>
        </h3>

        <div className="comentary">
          <h4 className="comentary__title">Comentário</h4>
          <img
            src={trashDelete}
            className="comentary__icon-delete"
            alt="Ícone de uma lixeira"
            onClick={() => {fnDelete(userId)}}
          />

          <p className="comentary__text">{commentaryText}</p>

          <hr className="comentary__separator" />
        </div>

        <Input
            placeholder="Escreva seu comentário..."
            additionalClass="comentary__entry"
            value={comentarioDesc}
            manipulationFunction={(e) => {
              setComentarioDesc(e.target.value)
            }}
        />

        <Button
          textButton="Comentar"
          additionalClass="comentary__button"
          manipulationFunction={fnPost}
        />
      </article>
    </div>
  );
};

export default Modal;
