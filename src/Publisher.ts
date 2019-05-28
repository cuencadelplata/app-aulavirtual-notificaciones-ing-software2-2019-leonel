
export class Publisher
{
    private ultimoMensaje : number;

    constructor(){

      this.ultimoMensaje = 0

    }

    private setUltimoMensaje( ultimo : number)
    {
      this.ultimoMensaje = ultimo;
    }

    public getUltimoMensaje()
    {
      return this.ultimoMensaje;
    }

    
}
