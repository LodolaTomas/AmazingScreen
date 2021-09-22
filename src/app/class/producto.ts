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
        this.tipo=tipo;
    }
}
export enum eTipo {
    Notebook,
    Monitor,
    PlacadeVideo,
    Processador,
    All,
    Periferico,
    MemoriaRAM,
    MotherBoard,
    Fuente,
    Almacenamiento
  }