import React, { useContext } from 'react';
import { MdClose } from 'react-icons/md'
import { AuthContext } from '../../Context/AuthContext';

import './styles.css';

interface FuncDeliteTask {
  (value: number):void;
}

interface PropsModal {
  deliteTask:FuncDeliteTask;
}

const Modal:React.FC = () => {

  const { updateIsModalVisible , ModalconfirmationDelete } = useContext(AuthContext);

  return (
    <div className="modal">
      <div className="container-modal">
        <button className="close-modal" onClick={() => updateIsModalVisible(false)}>
          <MdClose  size="2.5rem" />
          </button>
        <div className="content-modal">
          <h3>Deseja exluir este lembrete?</h3>
        </div>
        <div id="footer-modal">
        <button onClick={() =>ModalconfirmationDelete()} id="delete-Task">Exlcuir</button>
        </div>
       
      </div>
    </div>
  )
}

export default Modal;