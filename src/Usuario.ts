import { Notificacion } from './Notificacion';
import moment = require('moment');
import { Canal } from './Canal';
import { userInfo } from 'os';
export class Usuario {
    private nombre: String;
    private dni: number;
    private notificaciones: Array<Notificacion>;
    constructor(nombre: String, dni: number) {
        
        this.setNombre(nombre);
        this.setDni(dni);
        this.setNotificaciones(new Array<Notificacion>());
    }

    private setNombre (nombre : String) {
        this.nombre = nombre;
    }
     
    public getNombre() : String {
        return this.nombre;
    }
    
    private setDni (dni : number) {
        this.dni = dni;
    }
     
    public getDni() : number {
        return this.dni;
    }

    private setNotificaciones(notificacion: Array<Notificacion>){

        this.notificaciones = notificacion;
   
    }
   
    public getNotificaciones(): Array<Notificacion>{
   
        return this.notificaciones;
   
    }
   
    public agregarNotificacion(notificacion : Notificacion){

        this.notificaciones.push(notificacion);

    }

    public subscribirse(canal : Canal)
    {
        canal.subscribirse(this);
    }

    public desubscribirse(canal : Canal)
    {
        canal.desuscribirse(this);    
    }

    public mostrar(notificiones : Array<Notificacion>): string{
        let stringNotificaciones = "";
        
        if (typeof notificiones !== 'undefined' && notificiones.length > 0){    
            notificiones.forEach((item, index )=> {
                stringNotificaciones = stringNotificaciones + index+1 + ") " + item.getTitulo() + " por " + item.getRemitente() + "\n";
            });
        }
        else {
            stringNotificaciones = "Sin Datos";
        }
        
        return stringNotificaciones;
        
    }

    public eliminar(id : number){

        var i;
        var bandera = 0;
        for (i = 0; i < this.notificaciones.length; i++){
            if (this.notificaciones[i].getId() == id ){
                this.notificaciones.splice(i,1);
                bandera = 1;
            }
        }
        if (bandera == 1){
            console.log("No existe la ID. No se eliminó ninguna notificación");
        }


    }


}
