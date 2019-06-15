import moment = require("moment");
export class Notificacion{
    
    private titulo: String
    private descripcion: String;
    private id: number;
    private fecha: moment.Moment;
    private visto: boolean;
    private remitente: String;
    private favorito: boolean;

    constructor(titulo: String, descripcion: String, id: number, fecha: moment.Moment, remitente: String){
       
        this.setTitulo(titulo);
        this.setDescripcion(descripcion);
        this.setId(id);
        this.setFecha(fecha);
        this.setVisto(false);
        this.setRemitente(remitente);
        this.setFavorito(false);
    }

    private setTitulo (titulo : String) {
        this.titulo = titulo;
    }
     
    public getTitulo() : String {
        return this.titulo;
    }

    private setDescripcion (descripcion : String) {
        this.descripcion = descripcion;
    }
     
    public getDescripcion() : String {
        return this.descripcion;
    }

    private setId (id : number) {
        this.id = id;
    }
    
    public getId() : number {
        return this.id;
    }

    private setFecha (fecha : moment.Moment) {
        this.fecha = fecha;
    }
     
    public getFecha() : moment.Moment {
        return this.fecha;
    }

    private setVisto(visto : boolean) {
        this.visto = visto;
    }
     
    public getVisto() : boolean {
        return this.visto;
    }

    private setRemitente (remitente : String) {
        this.remitente = remitente;
    }
     
    public getRemitente() : String {
        return this.remitente;
    }

    private setFavorito(favorito : boolean) {
        this.favorito = favorito;
    }
     
    public getFavorito() : boolean {
        return this.favorito;
    }

    public cambiarVisto() {
        
        this.setVisto (!this.getVisto());
    
    }
    
    public getFechaFormateada() : String{
            
        return this.fecha.format('YYYY-MM-DD');
    
    }

    public marcarFavorito(){
        
        this.setFavorito(!this.getFavorito());
    
    }
    






}