import { Notificacion } from "./Notificacion";
import moment = require("moment");
import { Usuario } from "./Usuario";

export class Grupo {
  private notificacion: Notificacion;
  private usuarios: Array<Usuario>;
  private mensajes: Array<String>;
  constructor(notificacion: Notificacion, usuarios: Array<Usuario>) {
    this.setNotificacion(notificacion);
    this.setUsuarios(usuarios);
    this.setMensajes(new Array<String>());
    // usuarios.forEach(usuario => {
    //   usuario.asignarGrupo(this);
    // });
  }

  private setUsuarios(usuarios: Array<Usuario>) {
    this.usuarios = usuarios;
  }

  public getUsuarios(): Array<Usuario> {
    return this.usuarios;
  }

  private setNotificacion(notificacion: Notificacion) {
    this.notificacion = notificacion;
  }
  public getNotificacion(): Notificacion {
    return this.notificacion;
  }

  private setMensajes(mensajes: Array<String>) {
    this.mensajes = mensajes;
  }

  public getMensajes(): Array<String> {
    return this.mensajes;
  }

  public enviarMensaje(mensaje: String) {
    this.getMensajes().push(mensaje);
  }
}
