import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
//import swal from 'sweetalert';
import "./css/sala.css"
import ViewUser from './ViewUser';
import user from '../assets/user.png';
import contact from '../assets/contact.png';
import send from '../assets/send.svg';
import down_menu from '../assets/down-menu.svg'
import message from '../assets/message.svg';
import DataContact from './DataContact';

function SalaComponents({ socket, CorreoLog, ContraseñaLog }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [ showData, setShowData ] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const lookDataMenu = () => {
      setShowData(!showData);
    }
    const sendMessage = async () => {
      if (currentMessage !== "") {
        const messageData = {
          ContraseñaLog: ContraseñaLog,
          author: CorreoLog,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    };
    useEffect(() => { 
      socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
      });
    }, [socket]);

  return (
    <main className="main-container">
      <div className="main-container__user">
        <ViewUser imgPerfil={user} name="Alejandro García" phone="55 2026 0240">
          <div className="text-chat">
            <img src={message} alt="Icono de mensage"/> 
            <p>Chat</p>
          </div>
        </ViewUser>
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <img className="chat-header__img-contact" src={contact} alt="Imagen del contacto"/>
          <p>Lucía González</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            <div className="message-you">
              <div className="message__img-user-you">
                <img src={contact} alt="Imagen de la persona que lo envío" />
              </div>
              <div className="message__text-you">
                <p className="message__text--send-you">
                texto de mensajetexto de mensaje
                </p>
              </div>
            </div>
            <div className="message-you">
              <div className="message__img-user-you">
                <img src={contact} alt="Imagen de la persona que lo envío" />
              </div>
              <div className="message__text-you">
                <p className="message__text--send-you">
                texto de mensajetexto de mensaje
                texto de mensajetexto de mensaje
                texto de mensajetexto de mensaje
                eeeeeeeeeeeeeeeeeee
                texto de mensajetexto de mensaje
                texto de mensajetexto de mensaje
                texto de mensajetexto de mensaje
                eeeeeeeeeeeeeeeeeee
                </p>
              </div>
            </div>
            <div className="message-another">
              <div className="message__text-another">
                <p className="message__text--send-another">
                  texto de mensajetexto de mensaje
                </p>
                <p className="message__text--send-another">
                  texto de mensajetexto de mensaje
                </p>
              </div>
              <div className="message__img-user-another">
                <img src={user} alt="Imagen de la persona que lo envío" />
              </div>
            </div>
            <div className="message-another">
              <div className="message__text-another">
                <p className="message__text--send-another">
                  texto de mensajetexto de mensaje
                </p>
                <p className="message__text--send-another">
                  texto de mensajetexto de mensaje
                </p>
              </div>
              <div className="message__img-user-another">
                <img src={user} alt="Imagen de la persona que lo envío" />
              </div>
            </div>
            <div className="message-another">
              <div className="message__text-another">
                <p className="message__text--send-another">
                  texto de mensajetexto de mensaje
                </p>
                <p className="message__text--send-another">
                  texto de mensajetexto de mensaje
                </p>
              </div>
              <div className="message__img-user-another">
                <img src={user} alt="Imagen de la persona que lo envío" />
              </div>
            </div>
            <div className="message-another">
              <div className="message__text-another">
                <p className="message__text--send-another">
                  texto de mensajetexto de mensaje
                </p>
                <p className="message__text--send-another">
                  texto de mensajetexto de mensaje
                </p>
              </div>
              <div className="message__img-user-another">
                <img src={user} alt="Imagen de la persona que lo envío" />
              </div>
            </div>
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <div className="chat-footer-input">
            <input
              type="text"
              value={currentMessage}
              placeholder="Escribe un mensaje…"
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
          </div>
          <div className="btn-send">
            <button className="btn-send-message" onClick={sendMessage}><img className="icon-btn-send" src={send} alt="Icono de envíar" /></button>
          </div>
        </div>
      </div>
      <div className="main-container__user">
        <ViewUser imgPerfil={contact} name="Lucía González" phone="55271273617">
          <div className="container__user-btn-edit">
            <button className="btn-edit-data">Editar datos</button>
          </div>
          <div className="contact-data">
            <div className="contact_data__btn" onClick={lookDataMenu}>
              <p>Datos del contacto</p>
              <img src={down_menu} className={`${showData && "rotate_img"}`} alt="Icono de menú abajo o arriba" />
            </div>
            <div className={`contact-data_data ${showData && "open-menu"}`}>
              <DataContact title="Notas" text="Buen prospecto"/>
              <DataContact title="Edad" text="38"/>
              <DataContact title="Correo" text="lucia-test@gmail.com"/>
              <DataContact title="Prioridad" text="Alta"/>
              <DataContact title="Problema" text="Informes"/>
              <DataContact title="Promoción" text="Cerrar ventana de llamada"/>
              <DataContact title="Curp" text="HGCT2783HGHJ567FGHJ"/>
            </div>
          </div>
        </ViewUser>
      </div>
    </main>
  )
}

export default SalaComponents;
