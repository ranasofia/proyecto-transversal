/**
 * 
 */
export class Comentario {

    /**
     * Constructor sobrecargado del comentario
     * @param id_coment 
     * @param comentario 
     * @param id_hotel 
     * @param id_usuario 
     * @param fecha_comentario 
     * @param nombre_usuario 
     * @param fecha_salida 
     */
    constructor(

        /**
         * Representa el id del comentario realizado
         */
        public id_coment: number,

        /**
         * Representa el comentario realizado
         */
        public comentario: string,

        /**
         * Representa el id del hotel que se le realiza el comentario
         */
        public id_hotel: number,

        /**
         * Representa el id de usuario que hizo el comentario
         */
        public id_usuario: number,

        /**
         * Representa la fecha en la cual se realizó el comentario
         */
        public fecha_comentario: string,

        /**
         * Representa el nombre del usuario que hizo el comentario
         */
        public nombre_usuario: string,

        /**
         * Representa la fecha de la salida de la reserva del usuario
         */
        public fecha_salida: string

    ) {
        
    }

}