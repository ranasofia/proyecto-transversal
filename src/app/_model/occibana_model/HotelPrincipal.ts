/**
 * Clase que representa los hoteles principales de la aplicación Occibana
 */
export class HotelPrincipal {
    /**
     * Constructor de la clase HotelPrincipal
     * @param idhotel 
     * @param nombre 
     * @param precionoche 
     * @param preciomax 
     * @param preciomin 
     * @param numpersonas 
     * @param calificacion 
     * @param municipio 
     * @param zona 
     * @param fecha_antesde 
     * @param fecha_despuesde 
     * @param tipo 
     * @param mensaje 
     */
    constructor(

        /**
         * Variable de tipo number que representa el id del hotel
         */
        public idhotel: number,

        /**
         * Variable de tipo number que representa el precio COP por cada noche 
         * de estadía en el hotel
         */
        public nombre: string,

        /**
         * Variable de tipo number que representa el id del hotel
         */
        public precionoche: number,

        /**
         * 
         */
        public preciomax: number,

        /**
         * 
         */
        public preciomin: number,

        /**
         * 
         */
        public numpersonas: number,

        /**
         * Variable de tipo string que representa la calificación que 
         * va a recibir el hotel por parte de los usuarios
         */
        public calificacion: string,

        /**
         * Variable de tipo number que representa el municipio donde se
         * encuentra ubicado el hotel
         */
        public municipio: string,

        /**
         * 
         */
        public zona: string,

        /**
         * 
         */
        public fecha_antesde: string,

        /**
         * 
         */
        public fecha_despuesde: string,

        /**
         * 
         */
        public tipo: string,

        /**
         * 
         */
        public mensaje: string
    ) {

    }
}