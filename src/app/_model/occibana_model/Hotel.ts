/**
 * Clase que representa los hoteles de la aplicación Occibana
 */
export class Hotel {
    
    /**
     * Constructor de la clase Hotel
     * @param idhotel 
     * @param idmunicipio 
     * @param numhabitacion 
     * @param precionoche 
     * @param precioNocheDoble 
     * @param precioNochePremium 
     * @param descripcion 
     * @param condicion 
     * @param checkin 
     * @param checkout 
     * @param imagen 
     * @param nombre 
     * @param idzona 
     * @param usuarioencargado 
     * @param idusuario 
     * @param imagen_secundaria 
     * @param imagen_secundaria2 
     * @param condicionesbioseguridad 
     * @param promediocalificacion 
     * @param direccion 
     * @param mensaje 
     * @param municipio 
     * @param zona 
     * @param numMaxPersonas 
     * @param tipo 
     * @param fecha_despuesde 
     * @param fecha_antesde 
     * @param numHabitDisponibles 
     * @param url 
     * @param mensaje2 
     * @param mensaje3 
     * @param boton 
     */
    constructor(

        /**
         * Variable de tipo number que representa el id del hotel
         */
        public idhotel: number,

        /**
         * Variable de tipo number que representa el id del municipio
         */
        public idmunicipio: number,

        /**
         * Variable de tipo number que representa el número de habitaciones
         * con las que cuenta una reserva
         */
        public numhabitacion: number,
        
        /**
         * Variable de tipo number que representa el precio COP por noche de
         * estadía en el hotel
         */
        public precionoche: number,
        
        /**
         * Variable de tipo number que representa el precio COP por dos noches
         * de estadía en el hotel
         */
        public precioNocheDoble: number,
        
        /**
         * Variable de tipo number que representa el precio COP de la estadía en
         * el hotel con plan premium
         */
        public precioNochePremium: number,
        
        /**
         * Variable de tipo string que representa la descripción de la plan del
         * hotel
         */
        public descripcion: string,
        
        /**
         * Variable de tipo string que representa 
         */
        public condicion: string,

        /**
         * Variable de tipo string que representa el 
         */
        public checkin: string,

        /**
         * Variable de tipo string que representa el 
         */
        public checkout: string,

        /** 
         * Variable de tipo string que representa la imagen principal del hotel
         */
        public imagen: string,

        /**
         * Variable de tipo string que representa el 
         */
        public nombre: string,

        /**
         * Variable de tipo number que representa el
         */
        public idzona: number,

        /**
         * Variable de tipo string que representa el 
         */
        public usuarioencargado: string,

        /**
         * Variable de tipo number que representa el
         */
        public idusuario: number,

        /**
         * Variable de tipo string que representa el 
         */
        public imagen_secundaria: string,

        /**
         * Variable de tipo string que representa el 
         */
        public imagen_secundaria2: string,

        /**
         * Variable de tipo string que representa el 
         */
        public condicionesbioseguridad: string,

        /**
         * Variable de tipo number que representa el
         */
        public promediocalificacion: number,

        /**
         * Variable de tipo string que representa el 
         */
        public direccion: string,

        /**
         * Variable de tipo string que representa el 
         */
        public mensaje: string,

        /**
         * Variable de tipo string que representa el 
         */
        public municipio: string,

        /**
         * Variable de tipo string que representa el 
         */
        public zona: string,

        /**
         * Variable de tipo number que representa el
         */
        public numMaxPersonas: number,

        /**
         * Variable de tipo string que representa el 
         */
        public tipo: string,

        /**
         * 
         */
        public fecha_despuesde: Date,

        /**
         * 
         */
        public fecha_antesde: Date,

        /**
         * Variable de tipo number que representa el
         */
        public numHabitDisponibles: number,

        /**
         * Variable de tipo string que representa el 
         */
        public url: string,

        /**
         * Variable de tipo string que representa el 
         */
        public mensaje2: string,
        
        /**
         * Variable de tipo string que representa el 
         */
        public mensaje3: string,

        /**
         * 
         */
        public boton: boolean

        ) {

    }

}