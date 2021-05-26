import { UsuarioOccibana } from '../occibana_model/UsuarioOccibana';
export class DatosUsuario {
    constructor(
        
        /**
         * 
         */
        public estadoMembresia: string,
        
        /**
         * 
         */
        public urL1: string,
        
        /**
         * 
         */
        public mensaje: string,
        
        /**
         * 
         */
        public datos: UsuarioOccibana,
        
        /**
         * 
         */
        public b_ComprarMembresia1: boolean,
        
        /**
         * 
         */
        public b_ActualizarMembresia1: boolean,
        
        /**
         * 
         */
        public b_AgregarHotel1: boolean,
        
        /**
         * 
         */
        public b_mishoteles1: boolean,
        
        /**
         * 
         */
        public fotoperfil: string
    ) {
        
    }
}