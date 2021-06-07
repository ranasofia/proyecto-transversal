import { UsuarioOccibana } from '../occibana_model/UsuarioOccibana';

/**
 * Clase que representa la entidad de DatosUsuario de la aplicación Occibana
 */
export class DatosUsuario {
  /**
   * Constructor sobrecargado de la clase de los datos del usuario
   * @param estadoMembresia
   * @param urL1
   * @param mensaje
   * @param datos
   * @param b_ComprarMembresia1
   * @param b_ActualizarMembresia1
   * @param b_AgregarHotel1
   * @param b_mishoteles1
   * @param fotoperfil
   */
  constructor(
    /**
     * Representa el estadi de la mebrecía de la cuenta del usuario
     */
    public estadoMembresia: string,

    /**
     * Representa la url
     */
    public urL1: string,

    /**
     * Representa el mensaje del estado del usuario
     */
    public mensaje: string,

    /**
     * Representa los datos del usuario de Occibana
     */
    public datos: UsuarioOccibana,

    /**
     * Representa el estado de la membrecía de usuario
     */
    public b_ComprarMembresia1: boolean,

    /**
     * Representa el estado de actualización de la mebrecía del usuario
     */
    public b_ActualizarMembresia1: boolean,

    /**
     * Representa si el usuario puede agrgar hoteles a la página
     */
    public b_AgregarHotel1: boolean,

    /**
     * Representa si el usuario tiene hoteles subidos
     */
    public b_mishoteles1: boolean,

    /**
     * Representa la url de la foto del perfil de usuario
     */
    public fotoperfil: string
  ) {}
}
