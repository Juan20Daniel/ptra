import React,{useState,useEffect} from 'react'
import "./css/Login.css"
import io from "socket.io-client";
import swal from 'sweetalert';
import SalaComponents from "./SalaComponents";
import ilustracion from '../assets/ilustracion.svg';
import ilistration_respon from '../assets/ilistration_respon.svg';
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
  const [ loginRegister, setLoginRegister ] = useState(true);
  const joinRoom = () => {
    if (CorreoLog !== "" && ContraseñaLog !== "") {
      socket.emit("Clave", ContraseñaLog);
      setShowChat(true);
    }
  };
  const camLoginRegister = () => {
    setLoginRegister(!loginRegister);
  }
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
        }else{window.location.href="/";}
        });
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
        {loginRegister && 
          <div>  
            <div className="container-login">   
              <div className="container__left">
                <picture>
                  <source media="(min-width:815px)" srcset={ilustracion}/>
                  <img  className="container__left--ilustracion" src={ilistration_respon} alt="Ilustración del login" />
                </picture>
              </div>
              <div class="container__right"  >
                <h5 className="container__right--title">Iniciar sesión</h5>
                <form className="container__right--form" onSubmit={onSubmitLogin} >
                  <div className="Input-group">
                    <label htmlFor="email" className="label">Correo</label>
                    <input  onChange={(event) => {setUsername(event.target.value);}} required="required" placeholder="Ingresa tu correo" id="Email" name="Email" type="email" className="input"/>
                  </div>       
                  <div className="Input-group">
                    <label htmlFor="password" className="label">Contraseña</label>
                    <input  onChange={(event) => {
                      setRoom(event.target.value);
                      }} required="required" placeholder="Ingresa tu contraseña" id="password" name="password" type="password" className="input"
                    />
                  </div>
                  <div className="group-btns">
                    <button type="submit" class="group-btns__btn btn-left">Iniciar sesión</button>
                    <button onClick={camLoginRegister} type="button" class="group-btns__btn">Registro</button>
                  </div>
                </form>              
              </div>    
            </div>  
          </div>
        }
        {!loginRegister &&
        <div>   
          <div className="container-login">   
            <div className="container__left">
              <picture>
                    <source media="(min-width:815px)" srcset={ilustracion}/>
                    <img  className="container__left--ilustracion" src={ilistration_respon} alt="Ilustración del login" />
                  </picture>
              </div>
            <div class="container__right">
              <h5 className="container__right--title register-title">Registro</h5>
              <form className="container__right--form register-form" onSubmit={onSubmit} >
                <div className="Input-group">
                  <label htmlFor="Nombre" className="label">Nombre</label>
                  <input onChange={(event) => {setNombre(event.target.value);}} placeholder="Ingresa tu Nombre"  required="required" autofocus="autofocus" id="Nombre" name="Nombre" type="text" className="input"/>
                </div>
                <div className="Input-group">
                  <label htmlFor="password" className="label">Correo</label>
                  <input  onChange={(event) => {setCorreo(event.target.value);}} required="required" placeholder="Email@gmail.com" id="Email" name="Email" type="email" className="input"/>
                </div>
                <div className="Input-group">
                  <label htmlFor="Contraseña" className="label">Contraseña</label>
                  <input onChange={(event) => {setContraseña(event.target.value);}} placeholder="Ingresa tu Contraseña"  required="required"  id="Contraseña" name="Contraseña" type="password" className="input"/>
                </div>
                <div className="Input-group">
                  <label htmlFor="ConfiContraseña" className="label">Confirmar contraseña</label>
                  <input onChange={(event) => {setConfiContraseña(event.target.value);}} placeholder="Ingresa tu Contraseña"  required="required"  id="ConfiContraseña" name="ConfiContraseña" type="password" className="input"/>
                </div>
                <div className="Input-group">
                  <label htmlFor="Teléfono" className="label">Teléfono</label>
                  <input onChange={(event) => {setTeléfono(event.target.value);}} placeholder="Ingresa el numero del teléfono"  required="required"  id="Teléfono" name="Teléfono" type="number" className="input"/>
                </div>
                <div className="group-btns">
                  <button onClick={camLoginRegister} type="button" class="group-btns__btn btn-left">Iniciar sesión</button>
                  <button type="submit"  class="group-btns__btn">Enviar</button>
                </div>
              </form>      
            </div>
          </div>
        </div> 
        }
      </div> 
      ) : (
        <SalaComponents socket={socket} CorreoLog={CorreoLog} ContraseñaLog={ContraseñaLog} />
      )}
    </div>
  )
}
