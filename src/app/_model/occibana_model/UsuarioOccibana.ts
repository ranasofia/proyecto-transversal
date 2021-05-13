/**
 * Clase que posee los atributos de un usuario de la aplicación de Occibana
 */
export class UsuarioOccibana{

  /**
   * Id única que identifica a los usuarios de la aplicación
   */
  id: number;
  /**
   * Es el nombre o nombres del usuario
   */
  nombre: string;
  /**
   * Es el apellido o apellidos del usuario
   */
  apellido: string;
  /**
   * Es el correo electrónico del usuario
   */
  correo: string;
   /**
   * Es el teléfono celular del usuario
   */
  telefono: string;
  /**
   * Es el nombre de usuario que identifica la cuenta del usuario
   */
  usuario: string;
  /**
   * Es la clave de acceso a la aplicación, del usuario
   */
  contrasena: string;
  /**
   * Es el número que indica si el usuario está activo, en recuperación de clave, etc
   */
  idestado: number;
  /**
   * Es la cadena en base64 de la foto de perfil del usuario
   */
  fotoperfil: string;
  /**
   *
   */
  fecha_vencimiento: string;
  /**
   * Es el mensaje de la cuenta del usuario
   */
  mensaje: string;
  /**
   *
   */
  url: string;

}
