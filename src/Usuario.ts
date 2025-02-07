import { Habitacion } from "./Habitacion"; //necesitamos la importacion de la clase HAbitacion para acceder a su metodo reservar()

/**
 * En la clase usuario creamos los atributos pertinentes para cada tipo de usuario
 */
export class Usuario {
    nombreUsuario: string;
    fechaEntrada: Date;
    fechaSalida: Date;
  
    constructor(nombreUsuario: string, fechaEntrada: string, fechaSalida: string) {
      this.nombreUsuario = nombreUsuario;
      this.fechaEntrada = new Date(fechaEntrada); //transformamos las fechas de string a tipo Date para evitar errores
      this.fechaSalida = new Date(fechaSalida);
    }
  
    /**En el metodo hacerReserva tenemos que pasar el objeto habitacion como tipo Habitacion
      para poder acceder al metodo reservar() y comprobar la disponibilidad
    */
    hacerReserva(habitacion: Habitacion): string {
      if (habitacion.reservar()) {
        return `Reserva exitosa para ${this.nombreUsuario} en una habitación tipo ${habitacion.tipo} desde ${this.fechaEntrada.toDateString()} hasta ${this.fechaSalida.toDateString()}.`;
      } else {
        return `Lo sentimos ${this.nombreUsuario}, la habitación ${habitacion.tipo} ya está ocupada.`;
      }
    }
  }

  // Factory Method
export class UsuarioFactory { /*Esta fabrica de usuarios no esta implementada como tal en el codigo pero se 
  puede usar para escalar la aplicacion, agregando tipos de usuarios*/
  static crearUsuario(nombreUsuario: string, fechaEntrada: string, fechaSalida: string): Usuario {
    return new Usuario(nombreUsuario, fechaEntrada, fechaSalida);
  }
}