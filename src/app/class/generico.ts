import { eTipo } from "./producto";

export class Generico {

    public info: string;
    public uid: string;
    public foto: File;
    public tipo: eTipo;
    constructor(uid: string, foto: any, tipo: eTipo, info: string) {
        this.uid = uid;
        this.foto = foto;
        this.tipo = tipo;
        this.info = info;
    }
}