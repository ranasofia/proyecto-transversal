/**
 * Clase que posee los atributos de un usuario de la aplicación de SuperFast
 */
export class UsuarioSuperfast{

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
   * Es la clave de acceso a la aplicación, del usuario
   */
  contrasenia: string;
  /**
   * Es la dirección de domicilio del usuario
   */
  direccion: string;
  /**
   * Es el teléfono celular del usuario
   */
  telefono: string;
  /**
   * Es el número de documento de identidad del usuario
   */
  documento: string;
  /**
   * Es el número del Registro Único Tributario
   */
  rut: string;
  /**
   * Es la actividad económica del usuario
   */
  actividadcomercial: string;
  /**
   * Es la cadena en base64 de la imagen de perfil del usuario
   */
  imagenperfil: string;
  /**
   * Es la información de la hoja de vida del usuario
   */
  hojavida: string;
  /**
   * Es el tipo de vehículo que posee el usuario
   */
  tipovehiculo: string;
  /**
   * El el número que indica cuál es el rol del usuario
   */
  id_rol: number;
  aprobacion: number;
  /**
   * Número que indica si se aprobó como aliado al usuario
   */
  auditoria: string;
  /**
   * Indica el tiempo en minutos en que el token tarda en vencerse
   */
  expiracion: number;
  /**
   * Es la clave para codificar el token
   */
  key: string;
  /**
   * Es el número que indica a qué aplicación pertenece el usuario
   */
  aplicacionId: number;

}
