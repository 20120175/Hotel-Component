
/*ahora las importaciones a las direcciones de las imagenes se manejan de este lado 
para mantener el componente mas limpio y ordenado, tambien permite la escalabilidad 
para agregar mas tipos de habitaciones*/
import suiteImage from './assets/suite.jpg';
import dobleImage from './assets/doble.jpg';
import individualImage from './assets/individual.jpg';
import vipImage from './assets/vip.jpg'; //habitacion nueva
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

  interface FabricaHabitacion { //Esta interfaz no es necesarioa pero se define para poder escalar el codigo en un futuro y que sea mas sencillo de implementar
    crearHabitacion(tipo: string): Habitacion | null;
  }

  // Factory Method
export class HabitacionFactory { //exportamos la fabrica para que pueda ser usada por el componente
  static crearHabitacion(tipo: string): Habitacion | null { /*se crea el metodo estatico para asegurar que se pueda invocar sin usar la instancia de la clase, toma el parametro tipo de habitacion que es de tipo string y regresa un tipo de habitacion*/
    const habitacionesDisponibles: { [key: string]: { precio: number; imagen: string } } = {/*Declaramos el objeto habitaciones disponibles
    key: string : se usa para decir que las clave string seran precio e imagen, despues declaramos los valores a las claves del objeto  */
      Suite: { precio: 2000, imagen: suiteImage },
      Doble: { precio: 1500, imagen: dobleImage },
      Individual: { precio: 1000, imagen: individualImage },
      VIP: {precio: 3000, imagen: vipImage}/*Se crean los objetos correspondientes a cada tipo de habitacion con los valores
   asociado al objeto por medio de un diccionario (objeto dentro de otro objeto) el cual es el nombre de la estructura */
    };

    const habitacionDatos = habitacionesDisponibles[tipo];/*se crea una constante y se iguala al objeto utilizando el parametro [tipo] del metodo para acceder a dicho objeto*/
    return habitacionDatos ? new Habitacion(tipo, habitacionDatos.precio, true, habitacionDatos.imagen) : null;
    //evalua si hay un objeto con un tipo de dato que se encuentre en el diccionario, sino lo hay retorna null
  }
}
  