import React, { useState } from 'react';

//PropTypes que espera recibir del componente padre (funcion en si, los atributos se enviaron desde la funcion)
type ReservaFormProps = {
  hacerReserva: (nombreUsuario: string, fechaEntrada: string, fechaSalida: string, tipoHabitacion: string) => void;
};

//envia las variables al padre Hotel.tsx para que pueda ser implementado por la funcion hacerReserva
export const ReservaForm = ({ hacerReserva }: ReservaFormProps) => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [tipoHabitacion, setTipoHabitacion] = useState(""); /*Aqui se usa la variable temporal setTipoHabitacion para mantener clariddad
  Pero en la funcion hacerReserva, se maneja con el atributo 'tipo', el cual esta definido en la clase habitacion
  */
  // Listado de tipos de habitación válidos
  const tiposHabitacion = ["Suite", "Doble", "Individual"];

  const handleSubmit = (e: React.FormEvent) => {//Manejador del envio del formulario
    e.preventDefault();//evita que la pagina se recargue al enviar el formulario
    if (tiposHabitacion.includes(tipoHabitacion)) { //comprueba si la lista de habitaciones y la habitacion elegida por el usuario coinciden
      hacerReserva(nombreUsuario, fechaEntrada, fechaSalida, tipoHabitacion); //llama a la funcion para que se procesen los datos
    } else {
      alert("Por favor, seleccione un tipo de habitación válido.");//envia una alerta si no coinciden
    }
  };
//Se crea el formulario para recibir la entrada de datos por parte del usuario y lo devuelve al componente padre
  return (
    <form className="p-4 border rounded shadow" onSubmit={handleSubmit}>
      <div id='nombre'>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
        />
      </div>
      <div className='fecha'>
        <label>Fecha de Entrada:</label>
        <input
          type="date"
          value={fechaEntrada}
          onChange={(e) => setFechaEntrada(e.target.value)}
        />
      </div>
      <div className='fecha'>
        <label>Fecha de Salida:</label>
        <input
          type="date"
          value={fechaSalida}
          onChange={(e) => setFechaSalida(e.target.value)}
        />
      </div>
      <div className='tipo'>
        <label>Tipo de Habitación:</label>
        <select
          value={tipoHabitacion}
          onChange={(e) => setTipoHabitacion(e.target.value)}
        >
          <option value="">Seleccionar</option>
          <option value="Suite">Suite</option>
          <option value="Doble">Doble</option>
          <option value="Individual">Individual</option>
        </select>
      </div>
      <button className='btn btn-success' type="submit">Reservar</button>
    </form>
  );
};
