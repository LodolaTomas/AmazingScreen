import { eTipo, producto } from "./producto";

export class PlacaVideo extends producto {
    
    public RAM:string;

    constructor(uid: string, nombre: string, modelo: string,
         foto:any,tipo:eTipo, RAM:string) {
        super(uid, nombre, modelo,foto,tipo);
        this.RAM=RAM;
    }
}