export class Cliente {
    idCliente: number;
    nombrecl: string;
    apellido: string;
    //fechaDeNacimiento:
    email: string;
    usuario: string;
    contrasena: string;
    modificado: string;
    sesion: string;
    //fechaSancion:
    constructor(usuario: string, contrasena: string) {
        this.usuario = usuario;
        this.contrasena = contrasena;
    }
}


