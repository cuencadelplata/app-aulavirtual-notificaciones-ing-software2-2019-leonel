import { Notificacion } from "./Notificacion";

export class ContenedorNotif{
    notificaciones: Array<Notificacion>
    private static instance: ContenedorNotif;

    constructor(){
        this.notificaciones = [];
    }

    static getInstance(){
        if(!ContenedorNotif.instance){
            ContenedorNotif.instance = new ContenedorNotif();
        }
        return ContenedorNotif.instance;
    }

    setNotificacion(notificacion: Notificacion){
        this.notificaciones.push(notificacion);
    }

    getNotificacion(){
        return this.notificaciones;
    }

    agregarNotif(notificaion: Notificacion){
        this.setNotificacion(notificaion);
    }
}