import { Usuario } from "./Usuario";
import { UsuarioHCCauchos } from "./hccauchos_model/UsuarioHCCauchos";
import { UsuarioMototaxi } from "./mototaxi_model/UsuarioMototaxi";
import { UsuarioOccibana } from "./occibana_model/UsuarioOccibana";
import { UsuarioSuperfast } from "./superfast_model/UsuarioSuperfast";

/**
 * Clase que convierte a un usuario general en un usuario en específico de acuerdo a la aplicación
 */
export class Conversion {

  /**
   * Convierte el usuario general en un usuario para Mototaxi Deluxe
   * @param usuario variable que tiene a usuario general con todos los datos
   * @returns usuarioConvertido
   */
  static convertirAMototaxi(usuario: Usuario){

    var usuarioConvertido = new UsuarioMototaxi();

    usuarioConvertido.idCliente = usuario.idUsuario;
    usuarioConvertido.nombrecl = usuario.nombre;
    usuarioConvertido.apellido = usuario.apellido;
    usuarioConvertido.email = usuario.correo;
    usuarioConvertido.usuario = usuario.usuario;
    usuarioConvertido.contrasena = usuario.contrasena;
    usuarioConvertido.fechaDeNacimiento = usuario.fechaNacimiento;

    return usuarioConvertido;

  }

  /**
   * Convierte el usuario general en un usuario para HCCauchos
   * @param usuario variable que tiene a usuario general con todos los datos
   * @returns usuarioConvertido
   */
  static convertirAHCCauchos(usuario: Usuario){

    var usuarioConvertido = new UsuarioHCCauchos();

    usuarioConvertido.user_id = usuario.idUsuario;
    usuarioConvertido.nombre = usuario.nombre;
    usuarioConvertido.apellido = usuario.apellido;
    usuarioConvertido.correo = usuario.correo;
    usuarioConvertido.clave = usuario.contrasena;
    usuarioConvertido.fecha_nacimiento = usuario.fechaNacimiento;
    usuarioConvertido.identificacion = usuario.cedula;

    return usuarioConvertido;

  }

  /**
   * Convierte el usuario general en un usuario para Occibana
   * @param usuario variable que tiene a usuario general con todos los datos
   * @returns usuarioConvertido
   */
  static convertirAOccibana(usuario: Usuario){

    var usuarioConvertido = new UsuarioOccibana();

    usuarioConvertido.id = usuario.idUsuario;
    usuarioConvertido.nombre = usuario.nombre;
    usuarioConvertido.apellido = usuario.apellido;
    usuarioConvertido.telefono = usuario.celular;
    usuarioConvertido.correo = usuario.correo;
    usuarioConvertido.usuario = usuario.usuario;
    usuarioConvertido.contrasena = usuario.contrasena;

    return usuarioConvertido;

  }

  /**
   * Convierte el usuario general en un usuario para SuperFast
   * @param usuario variable que tiene a usuario general con todos los datos
   * @returns usuarioConvertido
   */
  static convertirASuperFast(usuario: Usuario){

    var usuarioConvertido = new UsuarioSuperfast();

    usuarioConvertido.nombre = usuario.nombre;
    usuarioConvertido.apellido = usuario.apellido;
    usuarioConvertido.correo = usuario.correo;
    usuarioConvertido.contrasenia = usuario.contrasena;
    usuarioConvertido.telefono = usuario.celular;
    usuarioConvertido.direccion = usuario.direccion;
    usuarioConvertido.imagenperfil = "prueba";
    usuarioConvertido.auditoria = "sistema";
    usuarioConvertido.id_rol = "1";
    usuarioConvertido.aprobacion = "1";
    usuarioConvertido.aplicacionID = "1";

    return usuarioConvertido;

  }

}
