import React, { useEffect } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";

import { Button, Input } from "../FormComponents/FormComponents";
import "./Modal.css";

const Modal = ({
  modalTitle = "Feedback",
  commentaryText = "Não informado.",
  userId = null,
  showHideModal = false,
  fnDelete = null,
  fnGet = null,
  fnNewCommentary = null
}) => {

useEffect( () => {
  async function loadDados() {
    fnGet();
}})
  
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
          className="comentary__entry"
        />

        <Button
          textButton="Comentar"
          additionalClass="comentary__button"
          manipulationFunction={fnNewCommentary}
        />
      </article>
    </div>
  );
};

export default Modal;
