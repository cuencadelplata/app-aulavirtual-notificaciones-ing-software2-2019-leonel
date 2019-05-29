import { Notificacion } from "./Notificacion";

export class ContenedorNotif{
    notificaciones: Array<Notificacion>
    private static instance: ContenedorNotif;

    private constructor(){
        this.notificaciones = [];
    }

    static getInstance(): ContenedorNotif{
        if(!ContenedorNotif.instance){
            ContenedorNotif.instance = new ContenedorNotif();
        }
        return ContenedorNotif.instance;
    }

    private setNotificacion(notificacion: Notificacion){
        this.notificaciones.push(notificacion);
    }

    getNotificaciones(): Array<Notificacion>{
        return this.notificaciones;
    }

    agregarNotificacion(notificacion: Notificacion){
        this.setNotificacion(notificacion);
    }

    public reset()
    {
        this.notificaciones = [];
    }
}