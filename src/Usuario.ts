import { Notificacion } from './Notificacion';
export class Usuario {
    private nombre: String;
    private dni: number;
    private notificaciones: Array<Notificacion>;
    constructor(nombre: String, dni: number) {
        
        this.setNombre(nombre);
        this.setDni(dni);
        
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
   
    public getNotifiaciones(): Array<Notificacion>{
   
        return this.notificaciones;
   
    }
   
    public agregarNotificacion(notificacion : Notificacion){

        this.notificaciones.push(notificacion);

    }
   
}