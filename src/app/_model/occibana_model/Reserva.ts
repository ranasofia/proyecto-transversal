export class Reserva {

    /**
     * Representa el id del usuario que hace la reserva
     */
     public idusuario: number
    
     /**
      * Representa el numero de personas que tiene disponible la habitación 
      */
     public numpersona: string
     
     /**
      * Representa el id de la reserva realizada
      */
     public id: number
     
     /**
      * Representa la fecha de salida de la reserva
      */
     public fecha_llegada: string
     
     /**
      * Representa la fecha de llegada de la reserva
      */
     public fecha_salida: string
     
     /**
      * Representa el nombre del usuario que hizo la reserva
      */
     public nombre: string
     
     /**
      * Representa el apellido del usuario que hizo la reserva
      */
     public apellido: string
     
     /**
      * Representa el correo del usuario que hizo la reserva
      */
     public correo: string
     
     /**
      * Representa el id del hotel en el cual se hizo la reserva
      */
     public idhotel: number
     
     /**
      * Representa el medio de pago que indicó el usuario para la hacer la reserva
      */
     public mediopago: string
     
     /**
      * Representa la calificación que otorga el usuario del hotel
      */
     public calificación: number
     
     /**
      * Representa la fecha límite para que el usaurio pueda hacer su reserva
      */
     public limite_comentario: Date
     
     /**
      * Representa el id de la habitación de la reserva del usuario
      */
     public id_habitacion: number
     
     /**
      * Representa el precio de la noche que cuesta la reserva realizada
      */
     public precioNoche: number
            
}