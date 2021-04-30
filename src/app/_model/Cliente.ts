export class Cliente {

    /**
     * Variable de tipo number que representa el id del cliente
     */
    idCliente: number;

    /**
     * Variable de tipo string que representa el nombre del cliente
     */
    nombrecl: string;

    /**
     * Variable de tipo string que representa el apellido del cliente
     */
    apellido: string;
    
    //fechaDeNacimiento:
    
    /**
     * Variable de tipo string que representa el correo
     * Correo que regristró el cliente
     */
    email: string;

    /**
     * Variable de tipo string que representa el nombre de usuario del cliente
     */
    usuario: string;

    /**
     * Variable de tipo string que representa la contreseña de la cuenta del cliente 
     */
    contrasena: string;

    /**
     * Variable de tipo string que representa quién realizó una modificación a ala base de datos 
     */
    modificado: string;

    /**
     * Variable de tipo string que representa el estado en el cual se encuentra el cliente
     */
    sesion: string;
    //fechaSancion:

    /**
     * Constructor que inicializa las variables @usuario y @constrasena
     * @param usuario variable de tipo string
     * @param contrasena variables de tipo string
     */
    constructor(usuario: string, contrasena: string) {
        this.usuario = usuario;
        this.contrasena = contrasena;
    }

}


