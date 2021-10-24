import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import swal from 'sweetalert';
import "./css/sala.css"
import ViewUser from './ViewUser';
import user from '../assets/user.png';
import contact from '../assets/contact.png';

function SalaComponents({ socket, CorreoLog, ContraseñaLog }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
  
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
        <ViewUser 
          imgPerfil={user} 
          name="Alejandro García"
          phone="55 2026 0240"
        />
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <img className="chat-header__img-contact" src={contact} alt="Imagen del contacto"/>
          <p>Lucía González</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={CorreoLog === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
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
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
      <div className="main-container__user">
        <ViewUser imgPerfil={contact} name="Lucía González" phone="55271273617">
          <div className="container__user-btn-edit">
            <button className="btn-edit-data">Editar datos</button>
          </div>
        </ViewUser>
      </div>
    </main>
  )
}

export default SalaComponents;
