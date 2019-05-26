import { ContenedorNotif } from './contenedorNotificacion';
import { Usuario } from './Usuario';
import { Notificacion } from './Notificacion';

export class Canal {

    private usuarios: Array<Usuario>;
    private contenedorNotificacion: ContenedorNotif;

    constructor(){
        this.usuarios = [];
        this.contenedorNotificacion = ContenedorNotif.getInstance();
    }

    private setUsuarios(usuarios:Array<Usuario>) {
        this.usuarios = usuarios;
    }

    /**
     * getUsuarios
     */
    public getUsuarios():Array<Usuario> {
        return this.usuarios;
    }

    private setContenedorNotificacion(notificacion: ContenedorNotif) {
        this.contenedorNotificacion = notificacion;
    }
    /**
     * getContenedorNotificacion
     */
    public getContenedorNotificacion():ContenedorNotif {
        return this.contenedorNotificacion;
    }

    /**
     * repartirNotificacion
     */
    public repartirNotificacion(notif: Notificacion) {
        this.usuarios.forEach((key, index) => {
            if(key.getNombre() !=  notif.getRemitente()){
                key.agregarNotificacion(notif);
            }          
        });

        this.contenedorNotificacion.agregarNotificacion(notif);
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
    public subscribirse(newUser:Usuario):boolean {
        /* Un usuario que se subscribe a un canal para recibir notificaciones*/
        let usuarios = this.getUsuarios();
        let existe = false;
        usuarios.forEach(element => {
            if (element.getDni() == newUser.getDni()){
                existe = true;
            }
        }); 
        if(existe){
            return false;
        }
        this.getUsuarios().push(newUser);
        return true;
    }

    /**
     * desuscribirse
     */
    public desuscribirse(usuario: Usuario):boolean {
        /* Usuario que se desuscribe del canal para dejar de recibir notificaciones */
        let exito = false;
        // let index = null;
        this.getUsuarios().forEach((item, index) => {
            if (item.getDni() === usuario.getDni()) {
                this.getUsuarios().splice(index,1);
                exito = true;
            }
        });;
        return exito;
    }

}
