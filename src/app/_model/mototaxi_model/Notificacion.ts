export class Notificacion {

  /**
   * Variable de tipo string que representa el apellido del conductor
   */
  apellidoCo: string;

  /**
   * Variable de tipo string que representa la cédula del cliente
   */
  cedula: string;

  /**
   * Variable de tipo string que representa cada comentario realizado por el cliente
   */
  comentarioDeCliente: string;

  /**
   * Variables de tipo string que representa cada comentario realizado por el conductor
   */
  comentarioDeConductor: string;

  /**
   * Variable de tipo string que representa el nombre del conductor
   */
  conductor: string;

  /**
   * Variable de tipo string que representa el nombre del conductor
   */
  conversacion: string;

  /**
   * Variable de tipo string que representa la descripción del servicio de transporte a prestar
   */
  descripcionServicio: string;

  /**
   * Variable de tipo string que representa el destino del viaje
   */
  destino: string;

  /**
   * Variable de tipo string que representa el estado del servicio
   */
  estado: string;

  /**
   * Variable de tipo string que representa la fecha de inicio de la carrera
   */
  fechaCarrera: string;

  /**
   * Variable de tipo string que representa la fecha de fin de la carrera
   */
  fechaFinCarrera?: string;

  /**
   * Variable de tipo number que representa el id de la carrera
   */
  id: number;

  /**
   * Variable de tipo number que representa el id del cliente
   */
  idCliente: number;

  /**
   * Variable de tipo number que representa el id del condcutor
   */
  idConductor: number;

  /**
   * Variable de tipo number que representa el id del destino del viaje
   */
  idDestino: number;

  /**
   * Variable de tipo number que representa el id de la ubicación del usuaro
   */
  idUbicacion: number;

  /**
   * Variable de tipo number que representa el id de los kilómetros
   */
  kilometro: number;

  /**
   * Variable de tipo array que representa la lista de conductores disponibles para realizar un servicio
   */
  listaConductores: any[];

  /**
   * Variable de tipo string que representa el método de pago del viaje
   */
  metodoPago: string;

  /**
   * Variable de tipo string que representa el nombre del cliente
   */
  nombreCl: string;

  /**
   * Variable de tipo string que representa el nombre del conductor
   */
  nombreCo: string;

  /**
   * Variable de tipo number que representa el valor pago en el viaje
   */
  pago: number;
  
  /**
   * Variable de tipo string que representa el numero de la placa de la moto del conductor
   */
  placa: string;
  
  /**
   * Variable de tipo string que representa el estado del viaje 
   */
  sesion: string;

  /**
   * Variable de tipo number que representa la tarifa a cobrar por el viaje
   */
  tarifa: number;

  /**
   * Variable de tipo string que representa la ubicación de viaje
   */
  ubicacion: string;

}
