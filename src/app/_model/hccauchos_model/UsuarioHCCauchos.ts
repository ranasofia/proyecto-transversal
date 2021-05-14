/**
 * Clase que posee los atributos de un usuario de la aplicación de HCCauchos
 */
export class UsuarioHCCauchos {

  /**
   * Id única que identifica a los usuarios de la aplicación
   */
  user_id: number;
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
   * El el número que indica cuál es el rol del usuario
   */
  rol_id: number;
  /**
   * Es la clave de acceso a la aplicación, del usuario
   */
  clave: string;
  /**
   * Es la fecha de nacimiento del usuario
   */
  fecha_nacimiento: string;
  /**
   * Es el número de documento de identidad del usuario
   */
  identificacion: string;
  /**
   * Es el token de acceso para autentificar al usuario
   */
  token: string;
  /**
   * Es el número que indica si el usuario está activo, en recuperación de clave, etc
   */
  estado_id: number;
  /**
   * Es la fecha con hora en la que vence el token
   */
  tiempo_token: string;
  /**
   * Indica si el usuario tiene actualmente una sesión activa
   */
  sesion: string;
  /**
   * Es la fecha con hora en la que se ejerció la última modificación en el usuario
   */
  last_modify: string;
  /**
   * Es el rol que tiene el usuario
   */
  rolNombre: string;
  /**
   * Es el estado del usuario
   */
  estadoNombre: string;
  /**
   * Es la dirección IP del usuario
   */
  ip_: string;
  /**
   * Es la dirección MAC del usuario
   */
  mac_: string;
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
  aplicacionId: number = 1;

  email:string;

  password: string;

}
