let pantalla
let pincel
let alto
let ancho
let dataPlayers1 = [[30, 180], [220, 150], [220, 300], [450, 80], [450, 160], [,]] //[[30, 180], [310, 50], [220, 300], [450, 80], [450, 160], [450, 240], [,]]//[[30, 180], [310, 200 - 50], [220, 300], [450, 80], [450, 160], [450, 240], [,]]
let dataPlayers2 = [[600, 180], [420, 150], [420, 300], [200, 100], [200, 200], [,]]//[[600, 180], [420, 150], [420, 300], [200, 100], [200, 200], [200, 300], [,]]//[[600, 180], [420, 150], [420, 300], [200, 100], [200, 200], [200, 300], [,]]
let xBalon = 310
let yBalon = 200
let golesTeam1 = 0
let golesTeam2 = 0
let goles = "---"
let idItervalo = 0;
let idItervalo2 = 0;
let pausado = true
let y = 200;
let x = 310;
let controlY = 1;
let controlX = 1;
let velocidad = 10;
let seconds = 0;
let minutos = 4;
let tiempo = "00:00";

function dibujarCanvas() {
    pantalla = document.querySelector("canvas");
    alto = pantalla.height
    ancho = pantalla.width
    pincel = pantalla.getContext("2d");
    pincel.fillRect(0, 0, 640, 427);
    pincel.fill();
    dibujarCampo()
}
function dibujarBalon(x, y) {
    let image = new Image();
    image.src = "3.png";
    image.onload = function () {
        pincel.drawImage(image, x, y);
    };
}

function dibujarCampo() {
    let image = new Image();
    image.src = "campoF2.jpg";
    image.onload = function () {
        pincel.drawImage(image, 0, 0);
    };
}

function dibujarPlayer(x, y, team) {
    let image = new Image();
    if (team == 1) {
        image.src = "R.gif";
    } else {
        image.src = "RB.gif";
    }
    image.onload = function () {
        pincel.drawImage(image, x, y);
    };
}

function dibujarJugadoresEquipo(team1, team2) {
    let dataTeam1 = dibujarJugadoresTeams(team1)
    let dataTeam2 = dibujarJugadoresTeams(team2)
    dibujarCampo()
    for (let xcon = 0; xcon < dataTeam1.length; xcon++) {
        dibujarPlayer(dataTeam1[xcon][0], dataTeam1[xcon][1], team1);
        dibujarPlayer(dataTeam2[xcon][0], dataTeam2[xcon][1], team2);
    }
}
function dibujarJugadoresTeams(team) {
    let def = evaluaPorteros(team)
    let med = evaluaMedios(team)
    let del = evaluaDelanteros(team)
    let dataPlayers11 = def.concat(med).concat(del)
    return dataPlayers11
}

function evaluaPorteros(team) {
    let p1 = dataPlayers1
    if (team == 2) {
        p1 = dataPlayers2
    }
    let dataDefensas = new Array()
    let con = 0
    while (true) {
        data = obtieneMovimientos(p1[con][0], p1[con][1])
        if (dataDefensas.length == 1) {
            break;
        }
        if (team == 1) { //80 - 220 25 -50
            if (data[0] >= 25 && data[0] <= 50 && data[1] >= 130 && data[1] <= 220) {
                dataDefensas.push(data)
                dataPlayers1[con] = data
                con += 1

            }
        }
        else {
            if (data[0] >= 580 && data[0] <= 600 && data[1] >= 130 && data[1] <= 220) {
                dataDefensas.push(data)
                dataPlayers2[con] = data
                con += 1
            }
        }
    }
    return dataDefensas

}

function evaluaMedios(team) {
    let p1 = dataPlayers1
    if (team == 2) {
        p1 = dataPlayers2
    }
    let dataMedios = new Array()
    let con = 1
    while (true) {
        data = obtieneMovimientos(p1[con][0], p1[con][1])
        if (dataMedios.length == 3) {
            break;
        }
        if (team == 1) {
            if (data[0] >= (ancho / 5.3) && data[0] <= (ancho / 2) && data[1] >= 20 && data[1] <= (alto - (alto / 6.5))) {
                dataMedios.push(data)
                dataPlayers1[con] = data
                con += 1
            }
        } else {
            if (data[0] >= (ancho / 2) && data[0] <= (ancho - (ancho / 5)) && data[1] >= 20 && data[1] <= (alto - (alto / 6.5))) {
                dataMedios.push(data)
                dataPlayers2[con] = data
                con += 1
            }
        }
    }
    return dataMedios
}

function evaluaDelanteros(team) {
    let p1 = dataPlayers1
    if (team == 2) {
        p1 = dataPlayers2
    }
    let dataDelanteros = new Array()
    let con = 4
    while (true) {
        data = obtieneMovimientos(p1[con][0], p1[con][1])
        if (dataDelanteros.length == 3) {
            break;
        }
        if (team == 1) {
            if (data[0] >= (ancho / 2) && data[0] <= (ancho - 30) && data[1] >= 20 && data[1] <= (alto - (alto / 6.5))) {
                dataDelanteros.push(data)
                dataPlayers1[con] = data
                con += 1
            }
        } else {
            if (data[0] >= 30 && data[0] <= (ancho / 2) && data[1] >= 20 && data[1] <= (alto - (alto / 6.5))) {
                dataDelanteros.push(data)
                dataPlayers2[con] = data
                con += 1
            }
        }
    }
    return dataDelanteros
}


function obtieneMovimientos(ejeXInput, ejeYInput) {
    let ejeX = ejeXInput
    let ejeY = ejeYInput
    let num = Math.round(Math.random() * 4);
    if (num == 1) {
        //arriba
        ejeY -= 20;
    }
    if (num == 2) {
        //der
        ejeX += 20;
    }
    if (num == 3) {
        //abajo
        ejeY += 20;
    }
    if (num == 4) {
        //izq
        ejeX -= 20;

    }
    return [ejeX, ejeY];
}


function balonRebote() {
    //eje Y
    if (controlY == 1) {
        y += velocidad;
    } else if (controlY == 2) {
        y = y
    } else if (controlY == 3) {
        y = y
    }
    else {
        y -= velocidad;
    }
    if (y <= 15) {
        controlY = 1;
        y = 15;//restaurar puntos
    } else if (y >= (alto - (alto / 6.5) + 20)) {
        // Esto significa si y es mayor o igual a la altura que tiene el canvas menos el tamaño de la imagen
        controlY = 0;
        y = (alto - (alto / 6.5) + 20);
    }
    //Eje X
    if (controlX == 1) {
        x += velocidad;
    } else if (controlX == 2) {
        x += velocidad
    } else if (controlX == 3) {
        x -= velocidad
    } else {
        x -= velocidad;
    }


    if (x <= 20) {
        controlX = 1;
        x = 20 //restaurar puntos
    } else if (x >= (ancho - 50)) {
        controlX = 0;
        x = (ancho - 50);
    }

    xBal = x
    yBal = y
    for (let index = 0; index < dataPlayers1.length; index++) {
        const element1 = dataPlayers1[index];
        const element2 = dataPlayers2[index];
        //equipo blue
        if (element1[0] >= xBal - 13 && element1[0] <= xBal + 13 && element1[1] >= yBal - 16 && element1[1] <= yBal + 16) {// element2[1] == xBal && element2[1] == yBal) {
            controlX = 2
            controlY = 2
            break
        }
        //equipo black
        if (element2[0] >= xBal - 13 && element2[0] <= xBal + 13 && element2[1] >= yBal - 16 && element2[1] <= yBal + 16) {
            controlY = 4
            controlX = 4

        }
    }
    dibujarBalon(x, y)
}

function gol() {
    //console.log("puntos del balon " + x + " : " + y)
    let gol = false
    //goles team1
    if (x <= 30 && y >= 155 && y <= 250) {// x == 33 && y >= 185 && y <= 225) { //30,155-250
        //console.log("Gooooooooooooooooool 1")
        golesTeam1 += 1
        //cada gol se recolocan los jugadores
        //escribirScore()
        //stopGame()
        clearInterval(idItervalo)
        dibujarCanvas()
        mostrarGool("Gooooooooooool")
        setTimeout(function () {
            mostrarGool(" ")
            InitGame()
            idItervalo = setInterval(main, 350)
            gol = true
        }, 2000);
    }
    //goles team2 595 190 220
    if (x >= ancho - 50 && y >= 155 && y <= 250) {
        //console.log("Gooooooooooooooooool 2")
        golesTeam2 += 1
        clearInterval(idItervalo)
        dibujarCanvas()
        mostrarGool("Gooooooooooool")
        //escribirScore()
        //stopGame()
        setTimeout(function () {
            mostrarGool(" ")
            InitGame()
            idItervalo = setInterval(main, 350)
            gol = true
        }, 2000);
    }
}

function escribirScore() {
    goles = "Brown: " + golesTeam1 + " Blue :" + golesTeam2
    let score = goles;
    let objetivo = document.getElementById("texto_nav1");
    objetivo.innerHTML = score;
}


function mostrarGool(goolText) {
    let objetivo = document.getElementById("gool");
    objetivo.innerHTML = goolText;
}

function escribirTiempo() {
    let mm = (minutos < 10) ? ("0" + minutos) : minutos
    let ss = (seconds < 10) ? ("0" + seconds) : seconds
    let time_game = mm + ":" + ss;
    let objetivo = document.getElementById("texto_nav2");
    objetivo.innerHTML = time_game;
}

let ciclos = 0
function main() {
    dibujarJugadoresEquipo(1, 2);
    gol()
    balonRebote()
    if (ciclos == 3) {
        seconds += 1
        ciclos = 0
    }
    ciclos++
    if (seconds == 60) {
        minutos++;
        seconds = 0
    }
    escribirScore();
    escribirTiempo();
    //despues de 5 minutos de juego se debe terminar el juego
    if (minutos == 5 && seconds == 0) {
        stopGame()
    }

}

//funcion de inicio del juego
var conStart = 0
function start() {
    //console.log("idIntervalo ", idItervalo)
    stopGame()
    InitGame()
    if (idItervalo != 0)
        clearInterval(idItervalo)
    conStart++
    //    clearInterval(idItervalo) //limpiar constantemente la pila para que se ejecute correctament setInterval
    idItervalo = setInterval(main, 350)
   
}

//funcion para pausar el juego
function ResumeGame() {
    if (pausado && conStart > 0) { //si pausa el juego se detiene las animmaciones del canvas
        clearInterval(idItervalo)
        dibujarCanvas()
        for (let xcon = 0; xcon < dataPlayers1.length; xcon++) {
            dibujarPlayer(dataPlayers1[xcon][0], dataPlayers1[xcon][1], 1);
            dibujarPlayer(dataPlayers2[xcon][0], dataPlayers2[xcon][1], 2);
        }
        dibujarBalon(x, y)
        pausado = false
    } else if (conStart > 0) {//play
        dibujarCanvas()
        dibujarCampo()
        pausado = true
        idItervalo = setInterval(main, 350)
    }

}

//funcion para detener el juego
function stopGame() {
    if (idItervalo != 0)
        clearInterval(idItervalo)
    dibujarCanvas()
    InitGame()
    goles = "Brown: " + 0 + " Blue :" + 0
    minutos = 0
    seconds = 0
    escribirScore()
    escribirTiempo()
    conStart = 0
    pausado = true
    golesTeam1 = 0
    golesTeam2 = 0
}

//datos iniciales de la posición de los jugadores
function InitGame() {
    x = 310
    y = 200
    dataPlayers1 = [[30, 180], [220, 50], [220, 150], [220, 300], [450, 80], [450, 160], [450, 240], [,]]
    dataPlayers2 = [[600, 180], [420, 50], [420, 150], [420, 300], [200, 100], [200, 150], [200, 200], [,]]
    for (let xcon = 0; xcon < dataPlayers1.length; xcon++) {
        dibujarPlayer(dataPlayers1[xcon][0], dataPlayers1[xcon][1], 1);
        dibujarPlayer(dataPlayers2[xcon][0], dataPlayers2[xcon][1], 2);
    }
    dibujarBalon(310, 200)
}
//carga el canvas y los jugadores
dibujarCanvas()
InitGame()
dibujarBalon(310, 200)