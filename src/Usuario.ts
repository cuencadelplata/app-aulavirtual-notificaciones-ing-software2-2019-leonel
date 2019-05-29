import { Notificacion } from './Notificacion';
import moment = require('moment');
<<<<<<< HEAD
export class Usuario{
=======
import { Canal } from './Canal';
export class Usuario {
>>>>>>> 202a8bdb18c642d5b83eff0e854977ffb09f5af5
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

    public mostrar(fecha? : String, remitente? : String): number{
        var i = 0;
        console.log("\nUsuario: " + this.getNombre());
        if(fecha != undefined && remitente == undefined){
            console.log("\t\t\t\tFiltro: " + fecha);
            for (let numero of this.getNotificaciones()){

                if(numero.getFechaFormateada() == fecha /*&& numero.getVisto() != true*/){
                    i += 1;
                    console.log("\t\t* Notificacion n° " + i + " *");
                    console.log( "Fecha: " + numero.getFechaFormateada() + " | Descripción: " + numero.getDescripcion() +" | ID: "+ numero.getId() + " | Remitente: "+numero.getRemitente() +" | Titulo: "+ numero.getTitulo() +" | Visto(estado)" + numero.getVisto());
                }
                
            }
            return 1;
        }
        if(remitente != undefined && fecha == undefined){
            console.log("\t\t\t\tFiltro: "+ remitente);
            for (let numero of this.getNotificaciones()){

                if(numero.getRemitente() == remitente /*&& numero.getVisto() != true*/){
                    i += 1;
                    console.log("\t\t* Notificacion n° " + i + " *");
                    console.log( "Fecha: " + numero.getFechaFormateada() + " | Descripción: " + numero.getDescripcion() +" | ID: "+ numero.getId() + " | Remitente: "+numero.getRemitente() +" | Titulo: "+ numero.getTitulo() +" | Visto(estado)" + numero.getVisto());
                }
                
            }   
            return 2;
        }
        if (remitente == undefined && fecha == undefined){
            console.log("\t\t\t\tFiltro: Sin remitente y sin fecha");
            for (let numero of this.getNotificaciones()){
                //if(numero.getVisto() != true){
                
                i += 1;
                console.log("\t\t* Notificacion n° " + i + " *");
                console.log( "Fecha: " + numero.getFechaFormateada() + " | Descripción: " + numero.getDescripcion() +" | ID: "+ numero.getId() + " | Remitente: "+numero.getRemitente() +" | Titulo: "+ numero.getTitulo() +" | Visto(estado)" + numero.getVisto());
                
                //}
            }

            return 3;
        }
        
        if (remitente != undefined && fecha != undefined){
            console.log("\t\t\t\tFiltro: "+ remitente + " - " + fecha);
            for (let numero of this.getNotificaciones()){
                if(numero.getRemitente() == remitente && numero.getFechaFormateada() == fecha /*&& numero.getVisto() != true*/){
                    i += 1;
                    console.log("\t\t* Notificacion n° " + i + " *");
                    console.log( "Fecha: " + numero.getFechaFormateada() + " | Descripción: " + numero.getDescripcion() +" | ID: "+ numero.getId() + " | Remitente: "+numero.getRemitente() +" | Titulo: "+ numero.getTitulo() +" | Visto(estado)" + numero.getVisto());
                }
            }

            return 4;
        }


    }

    public eliminar(id : number){

        var i;
        for (i = 0; i < this.notificaciones.length; i++){
            if (this.notificaciones[i].getId() == id ){
                this.notificaciones.splice(i,1);
            }
        }


    }

}