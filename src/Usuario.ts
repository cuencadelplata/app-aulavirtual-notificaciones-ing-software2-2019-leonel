import { Notificacion } from './Notificacion';
import moment = require('moment');
import { Canal } from './Canal';
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



    public filtrarFecha(arreglo: Array<Notificacion>,fecha?: String): Array<Notificacion>{

        var arregloFecha = arreglo;
        if (fecha)
            arregloFecha.forEach((numero, index) =>{
                if(numero.getFechaFormateada() != fecha ){
                        
                    arregloFecha.splice(index,1);;

                }
            });
         
        return arregloFecha;
    
    }
    
    public filtrarTexto(arreglo: Array<Notificacion>,texto?: String): Array<Notificacion>{
        
        var arregloTexto = arreglo;
        if(texto)
            arregloTexto.forEach((numero, index) =>{
                if(numero.getDescripcion() != texto || numero.getRemitente() != texto || numero.getTitulo() != texto){
                        
                    arregloTexto.splice(index,1);;

                }
            });
         
        
        
        return arregloTexto;

    }
    
    public filtrarVisto(arreglo: Array<Notificacion>,visto: boolean): Array<Notificacion>{


        
        var arregloVisto = arreglo;

        arregloVisto.forEach((numero, index) =>{
            if(numero.getVisto() != visto ){
                    
                arregloVisto.splice(index,1);;

            }
        });
               
        return arregloVisto;


    }

    public filtrar(fecha? : String , texto? : String , visto? : boolean ): Array<Notificacion>{

        var arregloFiltrado = this.getNotificaciones();


        arregloFiltrado = this.filtrarFecha(arregloFiltrado,fecha);
        arregloFiltrado = this.filtrarTexto(arregloFiltrado,texto);
        arregloFiltrado = this.filtrarVisto(arregloFiltrado,visto);

        return arregloFiltrado;

    }


    public mostrar(notificiones : Array<Notificacion>): string{
        let stringNotificaciones = "";
        
        
        if ( notificiones && notificiones.length > 0){    
            notificiones.forEach((item, index )=> {
                if (index > 0) stringNotificaciones+= '\n';
                stringNotificaciones = stringNotificaciones + (index+1) + ") " + item.getTitulo() + " por " + item.getRemitente();
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
