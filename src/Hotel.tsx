// Hotel.tsx
import React, { useState } from 'react';

import { Habitacion } from './Habitacion'; //Importacion de la logica para la habitacion
import { Usuario } from './Usuario'; //Importacion de la logica para el usuario
import { ReservaForm } from './ReservaForm'; //Importacion de el componente hijo donde se maneja el formulario para la reserva
import { HabitacionFactory } from './Habitacion';
//Creamos las importaciones para las rutas de las imagenes


type HotelProps = { //recibe los proptypes desde el componente padre 
  nombre: string;
  ubicacion: string;
};

export const Hotel = ({ nombre, ubicacion }: HotelProps) => {
  //Aqui se crean las instancias de la clase Habitacion
  const [habitaciones] = useState([
  /*Aqui simplemente se crean instancias pasando como argumento los nombres de las habitaciones registradas en nuestrod diccionario
    Lo que delega toda la responsabilidad a la logica de la aplicacion (Habitacion.ts), de este modo el agregar una nueva
    habitacion es mas simple, ordenado, y limpio ya que separa parte de la logica que antes se manejaba en el mismo componente
    Aqui solo mandamos llamar los tipos.
  */
    HabitacionFactory.crearHabitacion("Suite"),
    HabitacionFactory.crearHabitacion("Doble"),
    HabitacionFactory.crearHabitacion("Individual"),
    HabitacionFactory.crearHabitacion("VIP"), //habitacion nueva
  ].filter(h => h !== null) as Habitacion[]); // Filtra nulos por si seleccionan una opcion nula o que no se encuentre
//Se maneja el estado de la reserva por medio del Hook UseState
  const [reserva, setReserva] = useState<string>("");

//Funcion de flecha que comrpueba la existencia de habitaciones y la disponibilidad de esta asociada a un Usuario
//recibe como parametros los datos del usuario y de la habitacion
  const hacerReserva = (nombreUsuario: string, fechaEntrada: string, fechaSalida: string, tipoHabitacion: string) => {
    const habitacion = habitaciones.find(h => h.tipo === tipoHabitacion); //metodo find para buscar un tipo de habitacion que coincida
    if (habitacion) {
      const usuario = new Usuario(nombreUsuario, fechaEntrada, fechaSalida);
      const resultado = usuario.hacerReserva(habitacion);
      setReserva(resultado);
    } else {
      setReserva(`La habitación ${tipoHabitacion} no existe.`);
    }
  };

  /**Devuelve al componente padre (App.tsx) el nombre y la ubicacion obtenidos en el proptypes
  */
  return (
    <div>
      <h1>{nombre} - {ubicacion}</h1>
      <div>
        <h2 id='titulo'>Habitaciones Disponibles</h2>
        {/* hace el mapeado de las habitaciones para poder renderizarlas con los datos obtenidos desde Habitacion.ts */}
        {habitaciones.map(habitacion => (
  <div key={habitacion.tipo} className="habitacion-container">
    <div>
      <h3>{habitacion.tipo}</h3>
      <p>Precio: ${habitacion.precio}</p>
      <p className={habitacion.disponibilidad ? "disponible" : "ocupada"}>
        Disponibilidad: {habitacion.disponibilidad ? "Disponible" : "Ocupada"}
      </p>
          </div>
   {/*Datos de la imagen asi como su alt para mostrar en el renderizado*/}
    <img 
      src={habitacion.imagen} 
      alt={habitacion.tipo} 
      className="habitacion-imagen" 
    />
  </div>
))}

{/*Se renderiza el componente hijo ReservaForm.tsx, el cual contiene el formulario para la reserva de
la habitacion, ademas de que como props se le envian los datos de la reserva, es decir,
los mismos parametros de la funcion hacerReserva
Luego se muestra el status de la reserva que se haya realizado*/}
      </div>
      <ReservaForm hacerReserva={hacerReserva} />
      <p>{reserva}</p>
    </div>
  );
};
