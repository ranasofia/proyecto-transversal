/**
 * Clase que posee los atributos necesarios de un usuario teniendo en cuenta las 4 aplicaciones
 */
export class Usuario {

  /**
   * Id única que identifica a los usuarios de la aplicación
   */
  idUsuario: number;
  /**
   * Es el nombre o nombres del usuario
   */
  nombre: string;
  /**
   * Es el apellido o apellidos del usuario
   */
  apellido: string;
  /**
   * Es el teléfono celular del usuario
   */
  celular: string;
  /**
   * Es el correo electrónico del usuario
   */
  correo: string;
  /**
   * Es el nombre de usuario que identifica la cuenta del usuario
   */
  usuario: string;
  /**
   * Es la clave de acceso a la aplicación, del usuario
   */
  contrasena: string;
  /**
   * Es la fecha de nacimiento del usuario
   */
  fechaNacimiento: string;
  /**
   * Es la dirección de domicilio del usuario
   */
  direccion: string;
  /**
   * Es el número de documento de identidad del usuario
   */
  cedula: string;

}
