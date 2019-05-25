export class Notificacion {
    
    private titulo: String
    private descripcion: String;
    private id: number;
    private fecha: String;
    private visto: boolean;
    private remitente: String;

    constructor(titulo: String, descripcion: String, id: number, fecha: String, visto: boolean, remitente: String ) {
       
        this.setTitulo(titulo);
        this.setDescripcion(descripcion);
        this.setId(id);
        this.setFecha(fecha);
        this.setVisto(visto);
        this.setRemitente(remitente);
        
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

    private setFecha (fecha : String) {
        this.fecha = fecha;
    }
     
    public getFecha() : String {
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

    public cambiarVisto(){

        this.setVisto (true);
    }

    
    






}