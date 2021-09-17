import { producto } from "./producto";

export class Monitor extends producto {
    public tamanio: string;
    public hertz: number;
    public tiempoRespuesta: string;
    public panel: string;
    public resolucion: string;
    public gsync: boolean;

    constructor(uid: string, nombre: string, modelo: string, foto:any, tamanio: string, hertz: number, tiempoRespuesta: string, panel: string, resolucion: string, gsync: boolean) {
        super(uid, nombre, modelo,foto);
        this.tamanio = tamanio;
        this.hertz = hertz;
        this.tiempoRespuesta = tiempoRespuesta;
        this.panel = panel;
        this.resolucion = resolucion;
        this.gsync = gsync;
    }
}