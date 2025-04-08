let totalBarcos=6;
const puntajeMaximo=19;
let tamañoTablero = 10;
let barcosDisponibles = [
    { tipo: 'portaaviones', tamaño: 5 },
    { tipo: 'destructor', tamaño: 4 },
    { tipo: 'acorazado', tamaño: 3 },
    { tipo: 'buque', tamaño: 3 },
    {tipo: 'submarino 1', tamaño:2},
    {tipo: 'submarino 2', tamaño:2}


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



function colocarBarco(jugadorNum, i, j) {
    // Solo permitir que el jugador 1 coloque manualmente
    if (jugadorNum !== 1) {
        alert("Solo el Jugador 1 puede colocar barcos manualmente.");
        return;
    }

    if (!barcoSeleccionado) {
        alert("Selecciona un barco primero");
        return;
    }

    let tamaño = barcoSeleccionado.tamaño;
    let tipoBarco = barcoSeleccionado.tipo;

    // Verificar si el barco ya fue colocado
    if (jugadores[`jugador${jugadorNum}`].barcosColocados >= barcosDisponibles.length) {
        alert("Ya colocaste todos tus barcos");
        return;
    }

    // Verificar si el barco ya ha sido colocado previamente
    if (jugadores[`jugador${jugadorNum}`].barcos.includes(tipoBarco)) {
        alert("Este barco ya ha sido colocado");
        return;
    }

    // Verificar si el barco cabe horizontalmente en el tablero
    if (j + tamaño > tamañoTablero) {
        alert("El barco no cabe aquí");
        return;
    }

    // Verificar que no haya superposición con otro barco
    for (let k = 0; k < tamaño; k++) {
        if (jugadores[`jugador${jugadorNum}`].tablero[i][j + k] === 1) {
            alert("No puedes colocar un barco encima de otro");
            return;
        }
    }

    // Colocar el barco
    for (let k = 0; k < tamaño; k++) {
        jugadores[`jugador${jugadorNum}`].tablero[i][j + k] = 1;
    }

    // Agregar el barco al array de barcos colocados
    jugadores[`jugador${jugadorNum}`].barcos.push(tipoBarco);
    jugadores[`jugador${jugadorNum}`].barcosColocados++;

    // Verificar si ya colocó todos los barcos
    if (jugadores[`jugador${jugadorNum}`].barcosColocados === barcosDisponibles.length) {
        alert("Jugador 1 ha terminado de colocar sus barcos. Ahora es el turno de Jugador 2");

        // Cambiar el turno
        jugadorTurno = 2;

        // Crear tablero y colocar barcos automáticamente para jugador 2
        crearTablero(jugadorTurno);
        mostrarClima();
        document.getElementById("barcos").classList.add("oculto");
        colocarBarcosAutomaticamente();

        alert("Jugador 2 ha colocado sus barcos automáticamente. ¡El juego empieza!");
        finalizarColocacion();
    }

    // Resetear la selección del barco
    barcoSeleccionado = null;
}

// Función para iniciar el juego
function iniciarJuego() {
   
    document.getElementById("barcos").classList.remove("oculto");
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
            tableroHtml += `<td id="jugador${jugadorNum}-${i},${j}" onclick="colocarBarco(${jugadorNum}, ${i}, ${j})"></td>`;
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

            // Verificar si el barco cabe y no se superpone
            let puedeColocar = true;
            for (let k = 0; k < barco.tamaño; k++) {
                if (jugador.tablero[i][j + k] === 1) {
                    puedeColocar = false;
                    break;
                }
            }

            if (puedeColocar) {
                // Colocar el barco
                for (let k = 0; k < barco.tamaño; k++) {
                    jugador.tablero[i][j + k] = 1;

                    // Agrega visualmente si el tablero del jugador 2 está visible
                    const celda = document.getElementById(`jugador2-${i},${j + k}`);
                    if (celda) {
                        celda.classList.add("barco");
                    }
                }

                barcosColocados++;
                jugador.barcosColocados++; // <-- esto es importante
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
        document.getElementById("miniTableros").style.display = "block";

        document.getElementById("cuadroClima").classList.remove("hidden");
        
    
    }
}

// Crear tablero para disparar
function crearTableroDisparo(jugadorNum) {
    let jugador = jugadores[`jugador${jugadorNum}`];
    let oponenteNum = jugadorNum === 1 ? 2 : 1;
    let oponente = jugadores[`jugador${oponenteNum}`];
    let tableroHtml = "<table>";

    for (let i = 0; i < tamañoTablero; i++) {
        tableroHtml += "<tr>";
        for (let j = 0; j < tamañoTablero; j++) {
            let clase = "";
            let contenido = "";

            // Mostrar disparos realizados
            if (jugador.disparosRealizados[i] && jugador.disparosRealizados[i][j] === 'acertado') {
                clase = "acertado";
                contenido = "🔥";
            } else if (jugador.disparosRealizados[i] && jugador.disparosRealizados[i][j] === 'fallado') {
                clase = "fallado";
                contenido = "💦";
            }

            // Mostrar barcos del oponente desde el inicio
          /* if (oponente.tablero[i][j] === 1) {
                clase += " barco";
                contenido = "🚢"; // opcional
            }*/

            tableroHtml += `<td class="${clase}" onclick="disparar(${i}, ${j})">${contenido}</td>`;
        }
        tableroHtml += "</tr>";
    }

    tableroHtml += "</table>";
    document.getElementById("tableroDisparoJugador").innerHTML = tableroHtml;
}


// Función para disparar
function disparar(i, j) {
    let jugadorAtacante = jugadores[`jugador${jugadorTurno}`];
    let jugadorDefensor = jugadores[`jugador${3 - jugadorTurno}`];

    if (!jugadorAtacante.disparosRealizados[i]) {
        jugadorAtacante.disparosRealizados[i] = [];
    }

    if (jugadorAtacante.disparosRealizados[i][j] !== undefined) {
        alert("Ya disparaste a esta celda. ¡Elige otra!");
        return;
    }

    let acertado = false;
    if (jugadorDefensor.tablero[i][j] === 1) {
        jugadorDefensor.tablero[i][j] = 2;  // Barco golpeado
        jugadorAtacante.disparosRealizados[i][j] = 'acertado';
        jugadorAtacante.puntuacion++;
        acertado = true;
        alert("¡Acertaste!");
    } else {
        jugadorAtacante.disparosRealizados[i][j] = 'fallado';
        alert("Fallaste");
    }
    
    actualizarPuntajes();

    // Verificar victoria
    if (verificarVictoria()) return;
    

    if (!acertado) {
        // Solo cambia el turno si falló
        jugadorTurno = 3 - jugadorTurno;
    }

    document.getElementById("jugadorTurnoNombre").innerText = jugadores[`jugador${jugadorTurno}`].nombre;

    // Actualizar el tablero solo si el turno cambió
    crearTableroDisparo(jugadorTurno);

    // Si ahora es el turno de la máquina, dispara (y sigue si acierta)
    if (jugadorTurno === 2) {
        setTimeout(dispararAutomaticamente, 1000);
    }
}

    
async function mostrarClima() {
    const apiKey = '2638cfe4bcdcc9cb54c7d498061330a9'; 
    let ciudad = document.getElementById('ciudad').value;
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`
        );

        if (!response.ok) {
            throw new Error("No se pudo obtener el clima");
        }

        const data = await response.json();

        const climaHtml = `
            <h3>🌤 Clima en ${data.name}</h3>
            <p><strong>Temp:</strong> ${data.main.temp} °C</p>
            <p><strong>Condición:</strong> ${data.weather[0].description}</p>
            <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
            <p><strong>Viento:</strong> ${data.wind.speed} m/s</p>
        `;

        const contenedor = document.getElementById("cuadroClima");
        contenedor.innerHTML = climaHtml;
        contenedor.style.display = "block";
    } catch (err) {
        console.error("Error al mostrar el clima:", err.message);
    }
}
function dispararAutomaticamente() {
    let i, j;
    do {
        i = Math.floor(Math.random() * tamañoTablero);
        j = Math.floor(Math.random() * tamañoTablero);
    } while (jugadores.jugador2.disparosRealizados[i] && jugadores.jugador2.disparosRealizados[i][j] !== undefined);

    let jugadorAtacante = jugadores.jugador2;
    let jugadorDefensor = jugadores.jugador1;

    if (!jugadorAtacante.disparosRealizados[i]) {
        jugadorAtacante.disparosRealizados[i] = [];
    }

    let acertado = false;
    if (jugadorDefensor.tablero[i][j] === 1) {
        jugadorDefensor.tablero[i][j] = 2; // Barco golpeado
        jugadorAtacante.disparosRealizados[i][j] = 'acertado';
        jugadorAtacante.puntuacion++;
        acertado = true;
        alert(`La PC acertó en (${i}, ${j})`);
    } else {
        jugadorAtacante.disparosRealizados[i][j] = 'fallado';
        alert(`La PC falló en (${i}, ${j})`);
    }

    actualizarPuntajes();
    crearTableroDisparo(1); // 👈 Mostrar al jugador su tablero con disparos actualizados

    // Verificar si alguien ganó
    if (verificarVictoria()) return;

    if (acertado) {
        // Si acierta, sigue disparando
        setTimeout(dispararAutomaticamente, 1000);
    } else {
        // Si falla, le pasa el turno al jugador
        jugadorTurno = 1;
        document.getElementById("jugadorTurnoNombre").innerText = jugadores.jugador1.nombre;
        crearTableroDisparo(1);
    }
}

function verificarVictoria() {
    if (jugadores.jugador1.puntuacion >= puntajeMaximo) {
        alert(`${jugadores.jugador1.nombre} ha ganado la partida!`);
        exportarMapasFinales();
        resetearJuego();
        return true;
    }
    if (jugadores.jugador2.puntuacion >= puntajeMaximo) {
        alert(`${jugadores.jugador2.nombre} ha ganado la partida!`);
        exportarMapasFinales();
        resetearJuego();
        return true;
    }
    return false;
}
function exportarMapasFinales() {
    const deseaDescargar = confirm("¿Deseas descargar los mapas finales de la partida?");
    if (!deseaDescargar) return;

    const tamaño = tamañoTablero; // asumimos que esta variable ya existe

    function generarMatriz(jugadorNum) {
        const jugador = jugadores[`jugador${jugadorNum}`];
        const enemigo = jugadores[`jugador${jugadorNum === 1 ? 2 : 1}`];
        const matriz = [];

        for (let i = 0; i < tamaño; i++) {
            matriz[i] = [];
            for (let j = 0; j < tamaño; j++) {
                let celda = 'a'; // Agua por defecto

                // Barcos golpeados
                if (jugador.tablero[i][j] === 2) {
                    celda = `p${jugadorNum}-h`;
                } else if (jugador.tablero[i][j] === 1) {
                    celda = `p${jugadorNum}`;
                }

                // Tiros fallidos del oponente
                if (enemigo.disparosRealizados[i] && enemigo.disparosRealizados[i][j] === 'fallado' && jugador.tablero[i][j] !== 1 && jugador.tablero[i][j] !== 2) {
                    celda = 'b';
                }

                matriz[i][j] = celda;
            }
        }

        return matriz;
    }

    function descargarMatriz(nombre, matriz) {
        const contenido = matriz.map(fila => fila.join('\t')).join('\n');
        const blob = new Blob([contenido], { type: 'text/plain' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = nombre;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
    }

    const matrizJ1 = generarMatriz(1);
    const matrizJ2 = generarMatriz(2);

    descargarMatriz("mapa_jugador1.txt", matrizJ1);
    descargarMatriz("mapa_jugador2.txt", matrizJ2);
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
    function ocultarClima() {
        document.getElementById("cuadroClima").classList.add("hidden");
      }
}

