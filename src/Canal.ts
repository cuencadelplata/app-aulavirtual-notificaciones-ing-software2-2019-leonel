import {Notificacion} from './Notificacion';

export class Canal {

    private usuarios: Array<string>;
    private contenedorNotif: string;

    constructor(){

    }

    /**
     * repartirNotificacion
     */
    public repartirNotificacion(notif:Notificacion) {
        /* Logica para repartir notificacion a usuarios, si el usuario.nombre != remitente 
            Ademas se envia a contenedor de notificaciones*/
        
    }
    /**
     * actualizar
     */
    public actualizar() {
        /* Cuando ingresa un usuario nuevo, este metodo le pasa todos las notificaciones */
        
    }

    /**
     * subscribirse
     */
    public subscribirse(usuario: string) {
        /* Un usuario que se subscribe a un canal para recibir notificaciones*/
    
    }

    /**
     * desuscribirse
     */
    public desuscribirse() {
        /* Usuario que se desuscribe del canal para dejar de recibir notificaciones */
    
    }

}
