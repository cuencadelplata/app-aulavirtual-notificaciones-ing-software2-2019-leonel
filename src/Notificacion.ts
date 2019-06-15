import moment = require("moment");
export class Notificacion{
    
    private titulo: String
    private descripcion: String;
    private id: number;
    private fecha: moment.Moment;
    private visto: boolean;
    private remitente: String;
    private importante: boolean;

    constructor(titulo: String, descripcion: String, id: number, fecha: moment.Moment, remitente: String){
       
        this.setTitulo(titulo);
        this.setDescripcion(descripcion);
        this.setId(id);
        this.setFecha(fecha);
        this.setVisto(false);
        this.setRemitente(remitente);
        this.setImportante(false);
        
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

    public cambiarVisto() {
        
        this.setVisto (!this.getVisto());
    
    }
    
    public getFechaFormateada() : String{
            
        return this.fecha.format('YYYY-MM-DD');
    
    }

    private setImportante(esImportante: boolean) {
        this.importante = esImportante;
    }

    public getImportante(): boolean {
        return this.importante;
    }
    
    public cambiarImportante(){
        this.setImportante(!this.getImportante());
    }






}