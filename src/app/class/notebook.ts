import { Monitor } from "./monitor";
import { eTipo } from "./producto";

export class Notebook extends Monitor {
    
    public procesador:string;
    public placadeVideo:string;
    public RAM:string;
    public capacidad:string;

    constructor(uid: string, nombre: string, modelo: string,
         foto:any, tamanio: string, hertz: number, 
         tiempoRespuesta: string, panel: string, resolucion: string,
          gsync: boolean,freesync:boolean,tipo:eTipo, procesador:string,
          placadeVideo:string, RAM:string,capacidad:string) {
        super(uid, nombre, modelo,foto,tamanio,hertz,tiempoRespuesta,panel,resolucion,gsync,freesync,tipo);
        this.RAM=RAM;
        this.procesador=procesador;
        this.placadeVideo=placadeVideo;
        this.capacidad=capacidad;
    }
}