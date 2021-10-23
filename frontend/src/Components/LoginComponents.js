import React,{useEffect} from 'react'
import "./css/Login.css"
import io from "socket.io-client";
import { useState } from "react";
import axios from 'axios';
import { Modal } from 'rsuite';
import swal from 'sweetalert';
import SalaComponents from "./SalaComponents";
const socket = io.connect("http://localhost:3000");

export default function LoginComponents() {
  const [CorreoLog, setUsername] = useState("");
  const [ContraseñaLog, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [Nombre, setNombre] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [Correo, setCorreo] = useState("");
  const [ConfiContraseña, setConfiContraseña] = useState("");
  
  const [Teléfono, setTeléfono] = useState("");
  
  const[InLogin,setLogin] = React.useState(true);
  const [InRegistro, setRegistro] = React.useState(false);

  const handleOpenRegistro = () => (setRegistro(true),setLogin(false))
  const handleCloseregistro = () => setRegistro(false);
 
  
  const handleOpenLogin = () => (setRegistro(false),setLogin(true))
  
    
  const handleCloselogin = () => setLogin(false);
  
  const joinRoom = () => {
    if (CorreoLog !== "" && ContraseñaLog !== "") {
      socket.emit("Clave", ContraseñaLog);
      
      setShowChat(true);
    }
  };

  const onSubmitLogin = async e => {
    await socket.emit('/api/Usuarios/Login',{Correo:CorreoLog,Contraseña:ContraseñaLog})
    setShowChat(true)
    
   }
  useEffect(() => {
    
    socket.on("mensaje", (data) => {
      localStorage.setItem('success',data);
      const tokenString = localStorage.getItem('success');
      if(data.success===true){
        localStorage.setItem('token',data.Token);
        const tokenString = localStorage.getItem('token');
        swal({icon: "success", closeOnClickOutside: false,text:'Tu token : ' + tokenString})
      }
      else{
        localStorage.setItem('message',data.message);
      const tokenString = localStorage.getItem('message');
        swal({timer: 3000, closeOnClickOutside: false,text:data.message,icon: "info" }).then(willDelete => {
          if (willDelete) {
            window.location.href="/";
          }
          else{window.location.href="/";}
        });;
        
       }
    })
}, [socket]);
 
 const onSubmit= async e => {
  const res = await socket.emit('/api/Usuarios', { Nombre: Nombre, Teléfono:Teléfono, Contraseña:Contraseña, Correo:Correo, ConfiContraseña:ConfiContraseña },{
    method:'POST', headers:{
      'Accept':'application/json',
      'Content-Type':'application/json',
    }})

  }

    return (
      <div>
          {!showChat ? (
            <div>
          <Modal  open={InLogin} onClose={handleCloselogin}>  
        <div class="box-form">
           
          <div className="modal-container">
     
    </div>
  <div class="left">
		<div class="overlay">

		</div>
	</div>
  
    
 <div class="right "  >
		<h5>Iniciar sesión</h5>
        <form  onSubmit={onSubmitLogin} >
                  <div className="group col-md-12" >
                    <label htmlFor="email" className="label ">Correo</label>
                    <input  onChange={(event) => {setUsername(event.target.value);}} required="required" placeholder="Email@gmail.com" id="Email" name="Email" type="email" className="input"/>
                  </div>
                
                <br/>
                  
                  <div className="group col-md-12">
                    <label htmlFor="password" className="label ">Contraseña</label>
                    <input  onChange={(event) => {
              setRoom(event.target.value);
            }} required="required" placeholder="Ingresa tu contraseña" id="password" name="password" type="password" className="input"/>
                  </div>
                  <br></br>
                
                  <br/>
			
		
			
			
                  <button type="submit" class="button2" >
				            Iniciar sesión
                </button>
                <button onClick={handleOpenRegistro} class="button2" >
				            Registro
                </button>
                </form>      
              
        </div>
        
        
      </div>
      
      </Modal> 


      <Modal  open={InRegistro} onClose={handleCloseregistro}>  
        <div class="box-form">     
          <div className="modal-container">
        </div>
        <div class="left">
		      <div class="overlay">
    		  </div>
	      </div>
    
        <div class="right "  >
          <h5>Registro</h5>
            <form  onSubmit={onSubmit} >
              <div className="group col-md-12" >
                <label htmlFor="Nombre" className="label ">Nombre</label>
                <input onChange={(event) => {setNombre(event.target.value);}} placeholder="Ingresa tu Nombre"  required="required" autofocus="autofocus" id="Nombre" name="Nombre" type="text" className="input"/>
              </div>
              <br/>
                  
              <div className="group col-md-12">
                <label htmlFor="password" className="label ">Correo</label>
                <input  onChange={(event) => {setCorreo(event.target.value);}} required="required" placeholder="Email@gmail.com" id="Email" name="Email" type="email" className="input"/>
              </div>
              <br/>
              <div className="group col-md-12" >
                <label htmlFor="Contraseña" className="label ">Contraseña</label>
                <input onChange={(event) => {setContraseña(event.target.value);}} placeholder="Ingresa tu Contraseña"  required="required"  id="Contraseña" name="Contraseña" type="password" className="input"/>
              </div>
              <br/>
              <div className="group col-md-12" >
                <label htmlFor="ConfiContraseña" className="label ">Confirmar contraseña</label>
                <input onChange={(event) => {setConfiContraseña(event.target.value);}} placeholder="Ingresa tu Contraseña"  required="required"  id="ConfiContraseña" name="ConfiContraseña" type="password" className="input"/>
              </div>
              <br/>
              <div className="group col-md-12" >
                <label htmlFor="Teléfono" className="label ">Teléfono</label>
                <input onChange={(event) => {setTeléfono(event.target.value);}} placeholder="Ingresa el numero del teléfono"  required="required"  id="Teléfono" name="Teléfono" type="number" className="input"/>
              </div>
                
                
                <br/>
                  
             <br></br>
                
                  <br/>
			
		
			
			
                  <button onClick={handleOpenLogin} class="button2" >
				            Iniciar sesión
                </button>
                <button type="submit"  class="button2" >
				            Enviar
                </button>
                </form>      
              
        </div>
        
        
      </div>
      
      </Modal> 
      </div>  
      ) : (
            <SalaComponents socket={socket} CorreoLog={CorreoLog} ContraseñaLog={ContraseñaLog} />
          )}
           

         
      </div>
    )
}
