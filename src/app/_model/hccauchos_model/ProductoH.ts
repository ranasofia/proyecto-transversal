/**
 * Clase que representa los productos de HC Cauchos
 */
export class ProductoH {
    /**
     * Valor numerico que permite diferenciar de un producto a otro
     */
    id: number;
    /**
     * Es la imagen del producto
     */
    imagen: string;
    /**
     * Nombre del producto
     */
    titulo: string;
    /**
     * Es la referencia del producto
     */
    referencia: number;
    /**
     * Precio del producto en pesos colombianos
     */
    precio: number;
    /**
     * Es la cantidad actual de producto que se encuentra en stock
     */
    ca_actual: number;
    /**
     * Es la cantidad minima de producto
     */
    ca_minimo: number;
    /**
     * Es el valor numerico que diferencia la marca del producto
     */
    id_marca: number;
    /**
     * Valor numerico que permite diferenciar la categoria del producto
     */
    id_categoria: number;
    /**
     * Valor numerico que permite conocer el estado del producto
     */
    id_estado: number;
    /**
     * Nombre de la marca del producto
     */
    nombre_marca: string;
    /**
     * Nombre de la categoria del producto
     */
    nombre_categoria: string;
    /**
     * Estado del producto
     */
    estado: string;
}