import { Notificacion } from './Notificacion';
import moment = require('moment');
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

    public mostrar(fecha? : String, remitente? : String): number{
        var i = 0;
        if(fecha != undefined ){
            console.log("\t\tSin remitente y Con fecha");
            for (let numero of this.getNotificaciones()){

                if(numero.getFechaFormateada() == fecha){
                    i += 1;
                    console.log("\t\t* Notificacion n° " + i + " *");
                    console.log( "Fecha: " + numero.getFechaFormateada() + " | Descripción: " + numero.getDescripcion() +" | ID: "+ numero.getId() + " | Remitente: "+numero.getRemitente() +" | Titulo: "+ numero.getTitulo() +" | Visto(estado)" + numero.getVisto());
                }
                
            }
            return 1;
        }
        if(remitente != undefined ){
            console.log("\t\tCon remitente y sin fecha");
            for (let numero of this.getNotificaciones()){

                if(numero.getRemitente() == remitente){
                    i += 1;
                    console.log("\t\t* Notificacion n° " + i + " *");
                    console.log( "Fecha: " + numero.getFechaFormateada() + " | Descripción: " + numero.getDescripcion() +" | ID: "+ numero.getId() + " | Remitente: "+numero.getRemitente() +" | Titulo: "+ numero.getTitulo() +" | Visto(estado)" + numero.getVisto());
                }
                
            }   
            return 2;
        }
        if (remitente == undefined && fecha == undefined){
            console.log("\t\tSin remitente y sin fecha");
            for (let numero of this.getNotificaciones()){
            i += 1;
            console.log("\t\t* Notificacion n° " + i + " *");
            console.log( "Fecha: " + numero.getFechaFormateada() + " | Descripción: " + numero.getDescripcion() +" | ID: "+ numero.getId() + " | Remitente: "+numero.getRemitente() +" | Titulo: "+ numero.getTitulo() +" | Visto(estado)" + numero.getVisto());
            }

            return 3;
        }
        


    }

}