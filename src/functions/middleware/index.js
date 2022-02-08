
// Muestra en consola cada acción despachada, el cambio en el Store y cuanto tarda en ejecutase

export const logger = (store) => (next) => (action) => {
  // agrupamos lo que vamos a mostrar en
  // consola usando el tipo de la acción
  console.group(action.type);
  // mostramos el estado actual del store
  console.debug("current state", store.getState());

  // mostramos la acción despachada
  console.debug("action", action);

  // empezamos a contar cuanto se tarda en
  // aplicar la acción
  console.time("duration");

  // pasamos la acción al store
  next(action);

  // terminamos de contar
  console.timeEnd("duration");

  // mostramos el estado nuevo
  console.debug("new state", store.getState());
  // terminamos el grupo
  console.groupEnd();
};

// Permite capturar cualquier error que ocurra y registrarlo ya sea en consola o en algún servicio.

// export const catchError = (store) => (next) => (action) => {
//   try {
//     // aplicamos la acción
//     next(action);
//   } catch (error) {
//     // mandamos nuestro error a algún servicio
//     // como Sentry o Track:js donde luego
//     // podamos revisarlo con detalle
//     //  errorLogger.send(error);
//     console.error("Track error from catchError:", error);
//   }
// };


