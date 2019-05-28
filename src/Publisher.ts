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
        let datos = await parsear("http://virtualucp.edu.ar/cursos/rss/file.php?file=/154678/a1329bd266c85f1c5aa024a6ba396df5/mod_forum/11489/rss.xml");
        
        datos.items.slice().reverse().forEach(mensaje => {

          var nombre = mensaje.content.slice(4, mensaje.content.indexOf("."));
          var descripcion = mensaje.content.slice(mensaje.content.indexOf("<p><p>")+6, mensaje.content.indexOf("</p></p>"));
          var id =  Number(mensaje.link.slice(mensaje.link.length - 5));
          var fecha = mensaje.pubDate.slice(5);

          if(this.getUltimoMensaje() < id)
          {
            var noti = new Notificacion(mensaje.title, descripcion, id, moment(fecha), nombre );
            canal.repartirNotificacion(noti);
            this.setUltimoMensaje(id);
          }
        });
    }
}
