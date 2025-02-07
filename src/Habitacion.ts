/**  Esta clase contiene los atributos que debe de tener cada habitacion
 * despues se crea el constructor para cada atributo para pasarle los valores
 * por defecto y se pueda instanciar 
 * 
 * 
*/
export class Habitacion {
    tipo: string;
    precio: number;
    disponibilidad: boolean;
    imagen: string;
    constructor(tipo: string, precio: number, disponibilidad: boolean, imagen: string) {
      this.tipo = tipo;
      this.precio = precio;
      this.disponibilidad = disponibilidad;
      this.imagen = imagen;
    }
    /**
     * El metodo reservar perteneciente a la clase Habitacion es de tipo boolean
     * y nos sirve para comprobar la disponibilidad de la habitacion
     * este tendra relacion con el metodo hacerReserva() del usuario
     * ya que convergen al momento de realizar una reserva
     */
    reservar(): boolean {
      if (this.disponibilidad) {
        this.disponibilidad = false;
        return true;
      }
      return false;
    }
  }
  
  