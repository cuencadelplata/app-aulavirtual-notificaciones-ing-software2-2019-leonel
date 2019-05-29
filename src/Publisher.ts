import { parsear } from "../src/Parser";
import { Canal } from  "../src/Canal";
import { Notificacion } from "../src/Notificacion";
import moment = require("moment");

export class Publisher
{
    private ultimoMensaje : number;

    constructor(){

      this.ultimoMensaje = 0;

    }

    private setUltimoMensaje( ultimo : number)
    {
      this.ultimoMensaje = ultimo;
    }

    public getUltimoMensaje()
    {
      return this.ultimoMensaje;
    }

    public async crearYenviarNotificacion( canal : Canal)
    {
        // Obtener mensajes del feed rss
        let datos = await parsear("http://virtualucp.edu.ar/cursos/rss/file.php?file=/154678/a1329bd266c85f1c5aa024a6ba396df5/mod_forum/11489/rss.xml");
        
        // crear notificaciones por cada mensaje
        datos.items.slice().reverse().forEach(mensaje => {

          //Logica para parsear contenidos de mensajes
          let contenido = mensaje.content.split(";");
          let nombre = contenido[0].slice(4, contenido[0].lastIndexOf("."));
          let aux1 = contenido[1].split(">");
          let aux2 = aux1[2].split("<");
          let descripcion = aux2[0];
        
          let id =  Number(mensaje.link.slice(mensaje.link.length - 5));
          let fecha = mensaje.pubDate.slice(5);

          // Comprobar que este mensaje no haya sido notificacio anteriormente
          if(this.getUltimoMensaje() < id)
          {
            var noti = new Notificacion(mensaje.title, descripcion, id, moment(fecha), nombre );
            canal.repartirNotificacion(noti);
            // Actualizar ultimo mensaje notificado
            this.setUltimoMensaje(id);
          }
        });
    }
}
