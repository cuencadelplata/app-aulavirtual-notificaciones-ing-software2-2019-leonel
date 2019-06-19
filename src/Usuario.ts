import { Notificacion } from "./Notificacion";
import moment = require("moment");
import { Canal } from "./Canal";
import { Grupo } from "./Grupo";
import { IUsuario } from "./IUsuario";

export class Usuario implements IUsuario {
  private nombre: String;
  private dni: number;
  private notificaciones: Array<Notificacion>;
  private grupos: Array<Grupo>;
  constructor(nombre: String, dni: number) {
    this.setNombre(nombre);
    this.setDni(dni);
    this.setNotificaciones(new Array<Notificacion>());
    this.setGrupos(new Array<Grupo>());
  }

  private setGrupos(grupos: Array<Grupo>) {
    this.grupos = grupos;
  }

  public getGrupos(): Array<Grupo> {
    return this.grupos;
  }

  private setNombre(nombre: String) {
    this.nombre = nombre;
  }

  public getNombre(): String {
    return this.nombre;
  }

  private setDni(dni: number) {
    this.dni = dni;
  }

  public getDni(): number {
    return this.dni;
  }

  private setNotificaciones(notificacion: Array<Notificacion>) {
    this.notificaciones = notificacion;
  }

  public getNotificaciones(): Array<Notificacion> {
    return this.notificaciones;
  }

  public agregarNotificacion(notificacion: Notificacion) {
    this.notificaciones.push(notificacion);
  }

  public subscribirse(canal: Canal) {
    canal.subscribirse(this);
  }

  public desubscribirse(canal: Canal) {
    canal.desuscribirse(this);
  }


    public filtrarRangoFecha(fecha1: moment.Moment, fecha2: moment.Moment):Array<Notificacion>{

        var arregloRangoFecha = [];

        this.getNotificaciones().forEach((notificacion) =>{
            
            if(notificacion.getFecha()>=fecha1 && notificacion.getFecha()<=fecha2){
                    
                arregloRangoFecha.push(notificacion);

            }
        });
        return arregloRangoFecha;
    }
    public filtrarFecha(arreglo: Array<Notificacion>,fecha: String): Array<Notificacion>{

        var arregloFecha = [];
        if (fecha != undefined)
        {
            arreglo.forEach((notificacion) =>{
                if(notificacion.getFechaFormateada() == fecha ){
                        
                    arregloFecha.push(notificacion);

                }
            });
        }
        return arregloFecha;
    
    }
    
    public filtrarTexto(arreglo: Array<Notificacion>,texto: String): Array<Notificacion>{
        
        var arregloTexto = [];
        arreglo.forEach((numero, index) =>{
            if(numero.getDescripcion() == texto || numero.getRemitente() == texto || numero.getTitulo() == texto){
                        
                arregloTexto.push(numero);

            }
        });
        
        return arregloTexto;

    }
    
    public filtrarVisto(arreglo: Array<Notificacion>,visto: boolean): Array<Notificacion>{
        
        var arregloVisto = [];
      
            arreglo.forEach((numero, index) =>{
                if(numero.getVisto() == visto ){
                        
                    arregloVisto.push(numero);;

                }
            });
        
        return arregloVisto;

    }

  public filtrar(
    fecha?: String,
    texto?: String,
    visto?: boolean
  ): Array<Notificacion> {
    var arregloFiltrado = this.getNotificaciones();

    if (fecha != undefined) {
      arregloFiltrado = this.filtrarFecha(arregloFiltrado, fecha);
    }
    if (texto != undefined) {
      arregloFiltrado = this.filtrarTexto(arregloFiltrado, texto);
    }
    if (visto != undefined) {
      arregloFiltrado = this.filtrarVisto(arregloFiltrado, visto);
    }


        return arregloFiltrado;

    }


    public mostrar(notificiones : Array<Notificacion>): string{
        let stringNotificaciones = "";
        
        
        if ( notificiones && notificiones.length > 0){    
            notificiones.forEach((item, index )=> {
                if (index > 0) stringNotificaciones+= '\n';
                stringNotificaciones = stringNotificaciones + (index+1) + ") " + item.getTitulo()  + " - por " + item.getRemitente() + ", el "+ item.getFechaFormateada()+ "\n      " + item.getDescripcion();
            });

        }
        else {
            stringNotificaciones = "Sin Datos";
        }
        
        return stringNotificaciones;
        
    }
    public imprimir(): void{
        let impresion = this.mostrar(this.getNotificaciones());
        console.log(impresion);

    }
    public eliminar(id: number) {
    var i;
    var bandera = 0;
    for (i = 0; i < this.notificaciones.length; i++) {
      if (this.notificaciones[i].getId() == id) {
        this.notificaciones.splice(i, 1);
        bandera = 1;
      }
    }
    if (bandera == 1) {
      console.log("No existe la ID. No se eliminó ninguna notificación");
    }
  }

  public marcarNoLeidas() {
    this.notificaciones.forEach((item, index) => {
      if (item.getVisto() == true) {
        item.cambiarVisto();
      }
    });
  }

  public compartirNotif(notif: Notificacion, usuarios: Array<Usuario>) {
    var usuariosGrupo = usuarios;
    usuariosGrupo.push(this);
    var grupo = new Grupo(notif, usuariosGrupo);
    this.asignarGrupo(grupo);
    usuarios.forEach((u, index) => {
      if(u != this){
        u.agregarNotificacion(notif);
      }
      u.asignarGrupo(grupo);
    });
  }

  
    public obtenerTopDiezNotificaciones(){
        var arregloFav = [];
        var i= 0;
        var j= 0;
        var aux = 0;
        var n = 0
        this.notificaciones.forEach((item, index)=>{

            if(item.getFechaFav()!= null){

                arregloFav.push(item);

            }
        }); 
        for (i=0;i<n;i++){ 
            for (j=0;j<n-i;j++){ 
                if (arregloFav[j].getFechaFav()>=arregloFav[j+1].getFechafav()){ 
                    aux=arregloFav[j]; 
                    arregloFav[j]=arregloFav[j+1]; 
                    arregloFav[j+1]=aux; 
                } 

            } 

        }
        var topDiez = arregloFav.slice(-10);
        return topDiez;

    }

    public xportToCsv(notificacionesFiltradas): String{
       
        let CSV = "";

        notificacionesFiltradas.forEach(n => {

            CSV += n.getTitulo() + '; ';
            CSV += n.getDescripcion() + '; ';
            CSV += n.getId() + '; ';
            CSV += n.getFechaFormateada() + '; ';
            CSV += n.getRemitente();
            CSV += '\n'
           
        });

        return CSV;
    }

  public asignarGrupo(grupo: Grupo): boolean {
    let existeNotif = false;
    this.getGrupos().forEach(g => {
      if (g.getNotificacion().getId() == grupo.getNotificacion().getId())
        existeNotif = true;
    });
    if (existeNotif) {
      return false;
    }
    this.getGrupos().push(grupo);
    return true;
  }

  public enviarMensaje(notificacionId: number, mensaje: String): boolean {
    let seEnvio = false;
    this.getGrupos().forEach(g => {
      if (g.getNotificacion().getId() == notificacionId) {
        g.enviarMensaje(mensaje);
      }
    });
    return seEnvio;
  }
  public setMensajeEnGrupo(grupo: Grupo, mensaje: String) {
    grupo.enviarMensaje(mensaje);
  }
}
