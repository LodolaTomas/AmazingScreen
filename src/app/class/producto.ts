export class producto{
    public uid:string;
    public nombre:string;
    public modelo:string;
    public foto:File;
    constructor(uid:string,nombre:string,modelo:string,foto:File){
        this.uid=uid;
        this.nombre=nombre;
        this.modelo=modelo;
        this.foto=foto;
    }
}