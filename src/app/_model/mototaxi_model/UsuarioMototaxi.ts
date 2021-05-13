/**
 * Clase que posee los atributos de un usuario de la aplicación de Mototaxi Deluxe
 */
export class UsuarioMototaxi {

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


    /**
     * Variable de tipo string que representa la fecha de nacimiento del cliente
     */
    fechaDeNacimiento: string;

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
     * Variable de tipo number que representa el rol del cliente
     */
    rol: number;

    /**
     * Constructor que inicializa las variables @usuario y @constrasena
     * @param usuario variable de tipo string
     * @param contrasena variables de tipo string
     */
    constructor(usuario?: string, contrasena?: string) {
        this.usuario = usuario;
        this.contrasena = contrasena;
    }




}


