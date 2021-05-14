/**
 * Clase que posee los atributos de un usuario de la aplicación de SuperFast
 */
export class UsuarioSuperfast {

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
   * Es la clave de acceso a la aplicación, del usuario
   */
  contrasenia: string;
  /**
   * Es el teléfono celular del usuario
   */
  telefono: string;
  /**
   * Es la dirección de domicilio del usuario
   */
  direccion: string;
  /**
   * Es la cadena en base64 de la imagen de perfil del usuario
   */
  imagenperfil: string;
  /**
   * Indica quién posee la auditoría sobre los datos
   */
  auditoria: string;
  /**
   * El el número que indica cuál es el rol del usuario
   */
  id_rol: string;
  /**
   * Número que indica si se aprobó como aliado al usuario
   */
  aprobacion: string;
  /**
   * Número que indica a qué aplicación le pertenece el usuario
   */
  aplicacionid: string;


}
