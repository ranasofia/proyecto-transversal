/**
 * Clase que representa las habitaciones disponibles de un hotel en la aplicación Occibana
 */
export class Habitacion {
  /**
   * Constructor de la clase Habitación
   */
  constructor(
    /**
     * Variable de tipo number que representa el id de la habitación
     */
    public id: number,

    /**
     * Variable de tipo number que representa la cantidad de personas por habitación
     */
    public numpersonas: number,

    /**
     * Variable de tipo number que representa la cantidad de baños por habitación
     */
    public numbanio: number,

    /**
     * Variable de tipo number que representa el id del hotel
     */
    public idHotel: number,

    /**
     * Variable de tipo string que representa el tipo habitación
     */
    public tipo: string,

    /**
     * Variable de tipo number que representa el número de camas por habitación
     */
    public numcamas: number,

    /**
     * Variable de tipo number que representa el precio por habitación
     */
    public precio: number,

    /**
     * Variable de tipo string que representa un mensaje
     */
    public mensaje: string,

    /**
     * Variable de tipo string que representa el 
     */
    public tb_NumPersonas: string,

    /**
     * Variable de tipo string que representa el
    public tb_NumBanio: string,

    /**
     * Variable de tipo string que representa el
     */
    public tb_NumeroDeCamas: string
  ) {}
}
