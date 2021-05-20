/**
 * 
 */
export class Comentario {

    constructor(

        /**
         * 
         */
        public id_coment: number,

        /**
         * 
         */
        public comentario: string,

        /**
         * 
         */
        public id_hotel: number,

        /**
         * 
         */
        public id_usuario: number,

        /**
         * 
         */
        public fecha_comentario: string,

        /**
         * 
         */
        public nombre_usuario: string,

        /**
         * 
         */
        public fecha_salida: string

    ) {
        
    }

}