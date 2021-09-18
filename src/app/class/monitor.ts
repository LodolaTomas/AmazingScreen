import { eTipo, producto } from "./producto";

export class Monitor extends producto {
    public tamanio: string;
    public hertz: number;
    public tiempoRespuesta: string;
    public panel: string;
    public resolucion: string;
    public gsync: boolean;
    public freeSync:boolean;

    constructor(uid: string, nombre: string, modelo: string, foto:any, tamanio: string, hertz: number, tiempoRespuesta: string, panel: string, resolucion: string, gsync: boolean,freesync:boolean,tipo:eTipo) {
        super(uid, nombre, modelo,foto,tipo);
        this.tamanio = tamanio;
        this.hertz = hertz;
        this.tiempoRespuesta = tiempoRespuesta;
        this.panel = panel;
        this.resolucion = resolucion;
        this.gsync = gsync;
        this.freeSync=freesync;
    }
}