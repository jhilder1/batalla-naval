let totalBarcos=4;

let tamañoTablero = 10;
let barcosDisponibles = [
    { tipo: 'portaaviones', tamaño: 4 },
    { tipo: 'submarino', tamaño: 3 },
    { tipo: 'destructor', tamaño: 2 },
    { tipo: 'lancha', tamaño: 1 }
];
let barcoSeleccionado = null;
let jugadores = {
    jugador1: { nombre: "", tablero: [], barcosColocados: 0, turno: true, puntuacion: 0, disparosRealizados: [], barcos: [] },
    jugador2: { nombre: "", tablero: [], barcosColocados: 0, turno: false, puntuacion: 0, disparosRealizados: [], barcos: [] }
};
let jugadorTurno = 1;  // Jugador 1 comienza

document.addEventListener("DOMContentLoaded", function() {
    crearTablero(jugadorTurno);
    mostrarBarcosDisponibles();
});

function mostrarBarcosDisponibles() {
    let contenedor = document.getElementById("barcos");
    contenedor.innerHTML = "";
    barcosDisponibles.forEach(barco => {
        let boton = document.createElement("button");
        boton.innerText = barco.tipo;
        boton.onclick = () => seleccionarBarco(barco);
        contenedor.appendChild(boton);
    });
}

function seleccionarBarco(barco) {
    barcoSeleccionado = barco;
    alert(`Has seleccionado el ${barco.tipo}`);
}

function crearTablero(jugadorNum) {
    let contenedor = document.getElementById("tablero");
    let tabla = document.createElement("table");
    for (let i = 0; i < tamañoTablero; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < tamañoTablero; j++) {
            let celda = document.createElement("td");
            celda.id = `${jugadorNum}-${i},${j}`; // ID único por jugador
            celda.onclick = () => colocarBarco(jugadorNum, i, j);
            if (jugadores[`jugador${jugadorNum}`].tablero[i][j] === 1) {
                celda.classList.add("barco");
            }
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    contenedor.innerHTML = "";
    contenedor.appendChild(tabla);
}

function colocarBarco(jugadorNum, i, j) {
    let jugador = jugadores.jugador2;
    let barcosColocados = 0;

    
  
   
   
    if (!barcoSeleccionado) {
        alert("Selecciona un barco primero");
        return;
    }

    let tamaño = barcoSeleccionado.tamaño;
    if (j + tamaño > tamañoTablero) {
        alert("El barco no cabe aquí");
        return;
    }

    for (let k = 0; k < tamaño; k++) {
        if (jugadores[`jugador${jugadorNum}`].tablero[i][j + k] === 1) {
            alert("No puedes colocar un barco encima de otro");
            return;
        }
    }

    for (let k = 0; k < tamaño; k++) {
        jugadores[`jugador${jugadorNum}`].tablero[i][j + k] = 1;
       
        barcosColocados++;
    }

    jugadores[`jugador${jugadorNum}`].barcosColocados++;  // Incrementar el contador de barcos colocados
    
    // Verificar si todos los barcos han sido colocados
    if (jugadores[`jugador${jugadorNum}`].barcosColocados === barcosDisponibles.length) {
        if (jugadorNum === 1) {
            // Si es el turno del jugador 1, pasa al jugador 2
            jugadorTurno === 2;
            
            
         alert("Jugador 1 ha terminado de colocar sus barcos. Ahora es el turno de Jugador 2");
            crearTablero(jugadorTurno);
            colocarBarcosAutomaticamente();
       
        
        } if (jugadores.jugador1.barcosColocados >= totalBarcos && jugadores.jugador2.barcosColocados < totalBarcos){
            // Si es el turno del jugador 2, iniciar el juego
            alert("Ambos jugadores han colocado sus barcos. ¡El juego empieza!");
            
        }
    }
    
    barcoSeleccionado = null;
}

// Función para iniciar el juego
function iniciarJuego() {
    document.getElementById("tableros").style.display = "none";
    document.getElementById("turnoJugador").style.display = "block";
    document.getElementById("jugadorTurnoNombre").innerText = jugadores[`jugador${jugadorTurno}`].nombre;

    
    
    const nombre1 = document.getElementById("nombreJugador1").value;
    const nombre2 = document.getElementById("nombreJugador2").value;
    tamañoTablero = parseInt(document.getElementById("tamanoTablero").value);

    if (!nombre1 || !nombre2 || tamañoTablero <= 0) {
        alert("Por favor, ingresa los nombres de ambos jugadores y selecciona un tamaño de tablero.");
        return;
    }

    jugadores.jugador1.nombre = nombre1;
    jugadores.jugador2.nombre = nombre2;
    confirmarSeleccionBarco();
    // Ocultar pantalla inicial y mostrar la pantalla de colocación de barcos
    document.getElementById("inicio").style.display = "none";
    document.getElementById("tableros").style.display = "block";

    // Mostrar nombre del jugador que está colocando los barcos
    document.getElementById("jugadorNombre").innerText = jugadores.jugador1.nombre;

    // Crear tableros vacíos para los jugadores
    crearTablero(1);  // Tablero para el Jugador 1
    crearTablero(2);  // Tablero para el Jugador 2 (invisible al principio)
    document.getElementById("tableroJugador2").style.display="none" ; // Esconde el tablero de jugador 2
}
function confirmarSeleccionBarco() {
    tipoBarcoSeleccionado = document.getElementById("tipoBarco").value;
    document.getElementById("seleccionBarcos").style.display = "none";
    document.getElementById("tableros").style.display = "block";
    document.getElementById("jugadorNombre").innerText = jugadores.jugador1.nombre;
    crearTablero(1);
    crearTablero(2);
    document.getElementById("tableroJugador2").style.display = "none";
}
// Función para crear tablero vacío
function crearTablero(jugadorNum) {
    let jugador = jugadores[`jugador${jugadorNum}`];
    jugador.tablero = [];

    for (let i = 0; i < tamañoTablero; i++) {
        jugador.tablero[i] = [];
        for (let j = 0; j < tamañoTablero; j++) {
            jugador.tablero[i][j] = 0;  // 0 = Agua, 1 = Barco
        }
    }

    // Crear tabla HTML para mostrar el tablero
    let tableroHtml = "<table>";
    for (let i = 0; i < tamañoTablero; i++) {
        tableroHtml += "<tr>";
        for (let j = 0; j < tamañoTablero; j++) {
            tableroHtml += `<td onclick="colocarBarco(${jugadorNum}, ${i}, ${j})"></td>`;
        }
        tableroHtml += "</tr>";
    }
    tableroHtml += "</table>";

    if (jugadorNum === 1) {
        document.getElementById("tableroJugador1").innerHTML = tableroHtml;
    } else {
        document.getElementById("tableroJugador2").innerHTML = tableroHtml;
    }
}


// Colocación automática de barcos para el jugador 2
function colocarBarcosAutomaticamente() {
    let jugador = jugadores.jugador2;
    let barcosColocados = 0;

    while (barcosColocados < barcosDisponibles.length) {
        let barco = barcosDisponibles[barcosColocados];
        let colocado = false;

        while (!colocado) {
            let i = Math.floor(Math.random() * tamañoTablero);
            let j = Math.floor(Math.random() * (tamañoTablero - barco.tamaño));

            // Verificar si el barco cabe en la posición y no se solapan con otros barcos
            let puedeColocar = true;
            for (let k = 0; k < barco.tamaño; k++) {
                if (jugador.tablero[i][j + k] === 1) {
                    puedeColocar = false;
                    break;
                }
            }

            if (puedeColocar) {
                // Colocar el barco en la posición seleccionada
                for (let k = 0; k < barco.tamaño; k++) {
                    jugador.tablero[i][j + k] = 1;
                    // Asegúrate de colocar la celda correspondiente en el tablero visual del jugador 2
                    document.getElementById(`2-${i},${j + k}`).classList.add("barco");
                }
                barcosColocados++;
                colocado = true;
            }
        }
    }
}


function esPosicionValida(jugador, i, j) {
    // Comprobar las celdas adyacentes: arriba, abajo, izquierda, derecha, y diagonales
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (i + x >= 0 && i + x < tamañoTablero && j + y >= 0 && j + y < tamañoTablero) {
                if (jugador.tablero[i + x][j + y] === 1) {
                    return false; // Si hay un barco en las celdas adyacentes, no es una posición válida
                }
            }
        }
    }
    return true; // La celda y sus adyacentes están libres
}

// Función para actualizar el tablero con los barcos colocados
function actualizarTablero(jugadorNum) {
    let jugador = jugadores[`jugador${jugadorNum}`];
    let tableroHtml = "<table>";

    for (let i = 0; i < tamañoTablero; i++) {
        tableroHtml += "<tr>";
        for (let j = 0; j < tamañoTablero; j++) {
            let clase = "";
            if (jugador.tablero[i][j] === 1) {
                clase = "barco";  // Si es un barco, añade la clase "barco"
            }
            tableroHtml += `<td class="${clase}" onclick="colocarBarco(${jugadorNum}, ${i}, ${j})"></td>`;
        }
        tableroHtml += "</tr>";
    }
    tableroHtml += "</table>";

    if (jugadorNum === 1) {
        document.getElementById("tableroJugador1").innerHTML = tableroHtml;
    } else {
        document.getElementById("tableroJugador2").innerHTML = tableroHtml;
    }
}

// Finalizar la colocación de barcos
function finalizarColocacion() {
    if (jugadores.jugador1.barcosColocados >= totalBarcos && jugadores.jugador2.barcosColocados < totalBarcos) {
        
        jugadores.jugador2.barcosColocados = totalBarcos;
    }
    // Iniciar fase de disparos si ambos jugadores han colocado barcos
    if (jugadores.jugador1.barcosColocados >= totalBarcos && jugadores.jugador2.barcosColocados >= totalBarcos) {
       document.getElementById("tableros").style.display ="none";
        document.getElementById("turnoJugador").style.display = "block";
        document.getElementById("jugadorTurnoNombre").innerText = jugadores.jugador1.nombre;
        actualizarPuntajes();  
        crearTableroDisparo(1);  
    }
}

// Crear tablero para disparar
function crearTableroDisparo(jugadorNum) {
    let jugador = jugadores[`jugador${jugadorNum}`];
    let tableroHtml = "<table>";
    
    for (let i = 0; i < tamañoTablero; i++) {
        tableroHtml += "<tr>";
        for (let j = 0; j < tamañoTablero; j++) {
            let clase = "";
            if (jugador.disparosRealizados[i] && jugador.disparosRealizados[i][j] === 'acertado') {
                clase = "acertado";
            } else if (jugador.disparosRealizados[i] && jugador.disparosRealizados[i][j] === 'fallado') {
                clase = "fallado";
            }
            tableroHtml += `<td class="${clase}" onclick="disparar(${i}, ${j})"></td>`;
        }
        tableroHtml += "</tr>";
    }
    tableroHtml += "</table>";

    if (jugadorNum === 1) {
        document.getElementById("tableroDisparoJugador").innerHTML = tableroHtml;
    } else {
        document.getElementById("tableroDisparoJugador").innerHTML = tableroHtml;
    }
}

// Función para disparar
function disparar(i, j) {
    let jugadorAtacante = jugadores[`jugador${jugadorTurno}`];
    let jugadorDefensor = jugadores[`jugador${3 - jugadorTurno}`];

    if (!jugadorAtacante.disparosRealizados[i]) {
        jugadorAtacante.disparosRealizados[i] = [];
    }

    // Verificar si el jugador ya disparó a esa celda
    if (jugadorAtacante.disparosRealizados[i][j] !== undefined) {
        alert("Ya disparaste a esta celda. ¡Elige otra!");
        return;
    }

    // Registrar disparo
    let acertado = false;
    for (let barco of jugadorDefensor.barcos) {
        if (barco.i === i && barco.j === j) {
            jugadorDefensor.tablero[i][j] = 2;  // Barco hundido
            jugadorAtacante.disparosRealizados[i][j] = 'acertado';
            jugadorAtacante.puntuacion += barco.puntaje;
            acertado = true;
            break;
        }
    }

    if (!acertado) {
        jugadorAtacante.disparosRealizados[i][j] = 'fallado';
        alert("Fallaste");
    } else {
        alert("¡Acertaste!");
    }

    // Actualizar puntajes en tiempo real
    actualizarPuntajes();

    // Verificar si hay un ganador
    if (jugadores.jugador1.puntuacion === totalBarcos *3) {
        alert(`${jugadores.jugador1.nombre} ha ganado!`);
        resetearJuego();
    } else if (jugadores.jugador2.puntuacion === totalBarcos *3) {
        alert(`${jugadores.jugador2.nombre} ha ganado!`);
        resetearJuego();
    } else {
        // Cambiar turno
        jugadorTurno = 3 - jugadorTurno;  // Cambiar entre 1 y 2
        document.getElementById("jugadorTurnoNombre").innerText = jugadores[`jugador${jugadorTurno}`].nombre;
        crearTableroDisparo(jugadorTurno); // Actualizar tablero de disparos
    }
    if (jugadorTurno === 2) {
        setTimeout(dispararAutomaticamente, 1000); // Retraso de 1 segundo para simular el turno del bot
    }
}
function dispararAutomaticamente() {
    let i, j;
    do {
        i = Math.floor(Math.random() * tamañoTablero);
        j = Math.floor(Math.random() * tamañoTablero);
    } while (jugadores.jugador2.disparosRealizados[i] && jugadores.jugador2.disparosRealizados[i][j] !== undefined);

    disparar(i, j);
}
// Función para actualizar los puntajes en la pantalla
function actualizarPuntajes() {
    document.getElementById("puntajeJugador1").innerText = `${jugadores.jugador1.nombre}: ${jugadores.jugador1.puntuacion}`;
    document.getElementById("puntajeJugador2").innerText = `${jugadores.jugador2.nombre}: ${jugadores.jugador2.puntuacion}`;
}

// Función para resetear el juego
function resetearJuego() {
    alert("El juego ha terminado.");
    document.location.reload();
}
