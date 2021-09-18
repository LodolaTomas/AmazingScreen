export class producto{
    public uid:string;
    public nombre:string;
    public modelo:string;
    public foto:File;
    public tipo:eTipo
    constructor(uid:string,nombre:string,modelo:string,foto:File,tipo:eTipo){
        this.uid=uid;
        this.nombre=nombre;
        this.modelo=modelo;
        this.foto=foto;
    }
}
export enum eTipo {
    Notebook,
    Monitor,
    placadeVideo,
    Processador,
  }