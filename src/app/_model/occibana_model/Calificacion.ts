
export class Calificacion {

    /**
     * Constructor sobrecargado de la clase de Calificación
     * @param mensaje 
     * @param comentarioTb 
     * @param calificacion 
     */
    constructor(
        
        /**
         * Representa los datos de la calificación
         */
        public mensaje: string,

        /**
         * Representa el cometario de esa calificación
         */
        public comentarioTb: string,

        /**
         * Representa el número de la calificación
         */
        public calificacion: string
    ){

    }
}
