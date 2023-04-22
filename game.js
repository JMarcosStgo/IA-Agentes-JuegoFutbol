//carga el canvas
let pantalla = document.querySelector("canvas");
let pincel = pantalla.getContext("2d");
pincel.fillRect(0, 0, 640, 427);
pincel.fill();
let alto = pantalla.height;
let ancho = pantalla.width;
let margenX = ancho;
let margenY = alto;
console.log("margens", margenX, margenY)
let dataPlayers1 = [[30, 180], [310, 200 - 50], [220, 300], [450, 80], [450, 160], [450, 240], [,]]
let dataPlayers2 = [[600, 180], [420, 150], [420, 300], [200, 100], [200, 200], [200, 300], [,]]
let xBalon = 300
let yBalon = 200
let golesTeam1 = 0
let golesTeam2 = 0
let goles = "---"

function prueba() {
    dibujarBalon(ancho - 50, alto / 2 - 22, 1)//ancho - (ancho/10), alto/2, 1 --20, alto/2 -20
}

function dibujarBalon(x, y) {
    /***
     * validar area y saber la direccion de rebote del balon
     * ***/
    let image = new Image();
    image.src = "3.png";
    image.onload = function () {
        pincel.drawImage(image, x, y);
    };
}

function dibujarCampo() {
    let image = new Image();
    image.src = "campoF.jpg";
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
    }
    for (let xcon = 0; xcon < dataTeam2.length; xcon++) {
        dibujarPlayer(dataTeam2[xcon][0], dataTeam2[xcon][1], team2);
    }
}
function dibujarJugadoresTeams(team) {
    //dibujarCampo()
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
        if (team == 1) {
            if (data[0] >= 25 && data[0] <= ancho / 12 && data[1] >= ((alto / 3.8)) && data[1] <= (alto / 2)) {
                dataDefensas.push(data)
                dataPlayers1[con] = data
                con += 1

            }
        }
        else {
            if (data[0] >= (ancho - (ancho / 10)) && data[0] <= (ancho - 35) && data[1] >= ((alto / 3.8)) && data[1] <= (alto / 2)) {
                dataDefensas.push(data)
                dataPlayers2[con] = data
                con += 1
            }
        }
        //console.log(dataDefensas, "poteros")
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
        if (dataMedios.length == 2) {
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
        //    console.log(dataMedios, "medios")
    }
    return dataMedios

}

function evaluaDelanteros(team) {
    let p1 = dataPlayers1
    if (team == 2) {
        p1 = dataPlayers2
    }
    let dataDelanteros = new Array()
    let con = 3 
    while (true) {
        data = obtieneMovimientos(p1[con][0], p1[con][1])
        if (dataDelanteros.length == 2) {
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
        //console.log(dataDelanteros, "delanteros")
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

function colisionBalon(xBal, yBal) {
    let colision = false
    for (let index = 0; index < dataPlayers1.length; index++) {
        const element1 = dataPlayers1[index];
        const element2 = dataPlayers2[index];
        //caso en que rebota en un jugador
        //if    x >= xbal-32 and x<=xball que esde dentro un rango mono = 17x64 balon 32x32 
        if (element1[0] >= xBal - 20 && element1[0] <= xBal + 20 && element1[1] >= yBal - 32 && element1[1] <= yBal + 32 || element2[0] >= xBal - 20 && element2[0] <= xBal + 20 && element2[1] >= yBal - 32 && element2[1] <= yBal + 32) {// element2[1] == xBal && element2[1] == yBal) {
            colision = true
            console.log("colision entra if")
            break
        }
    }
    return colision
}

function movimientoBalon() {
    let posBalon = [300, 200]

    /*let connn = 0
    while (true) {
        //encontrar obstaculo
        if (colisionBalon(xBalon, yBalon) == true) {
            //rebotar infinitamente el un angulo
            balonRebote(posBalon[0],posBalon[1])
        }
    }
    */
    balonRebote()


}

let y = 15;
let x = 20;
let controlY = 1;
let controlX = 1;
let velocidad = 20;
function balonRebote() {
    //x = xx
    //y = yy
    //Eje Y
    if (controlY == 1) {
        y += velocidad;
    } else {
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
    if (colisionBalon(x, y) == true) {
        //el balon debe rebotar 
        console.log("colisiono", x, y)
        console.log(dataPlayers1, dataPlayers2)
        //ResumeGame()
        controlX = 1 //1-0 0-1 0-0 1-1
        controlY = 0
    }
    dibujarBalon(x, y)
    console.log("-----------", x, y, dataPlayers1, dataPlayers2)
}

function gol() {
    //goles team1
    if (x == 30 && y >= alto / 2 - 22 && y <= alto / 2 - 6) {
        golesTeam1 += 1
        //cada gol se recolocan los jugadores
        escribirScore()
        console.log("goooooooooool 1")
        stopGame()
    }
    //goles team2
    if (x == ancho - 50 && y >= alto / 2 - 22 && y <= alto / 2 - 6) {
        golesTeam2 += 1
        escribirScore()
        console.log("goooooooooool 2")
        stopGame()
    }
}

function girar() {
    document.getElementById("imagen").className = "gira";
}

function escribirScore() {
    goles = "Equipo 1: " + golesTeam1 + " Equipo 2 :" + golesTeam2
    let score = goles;
    let objetivo = document.getElementById("texto_nav1");
    objetivo.innerHTML = score;
}
function escribirTiempo() {
    let time_game = "5:59";
    let objetivo = document.getElementById("texto_nav2");
    objetivo.innerHTML = time_game;
}

function main() {
    dibujarJugadoresEquipo(1, 2);
    balonRebote()
    escribirScore();
    escribirTiempo();
    gol()
}
let idItervalo = 0;
//funcion de inicio del juego
function start() {
    //main()
    //prueba()
    console.log("start")
    dibujarBalon(300,200)
    idItervalo = setInterval(main, 100)

}
//funcion para pausar el juego
function ResumeGame() {
    clearInterval(idItervalo)
}
//funcion para detener el juego
function stopGame() {
    clearInterval(idItervalo)
    pantalla = document.querySelector("canvas");
    pincel = pantalla.getContext("2d");
    pincel.fillRect(0, 0, 640, 427);
    pincel.fill();
    dibujarCampo()
    InitGame()

}
//datos iniciales de la posición de los jugadores
function InitGame() {
    dataPlayers1 = [[30, 180], [220, 150], [220, 300], [450, 80], [450, 160], [,]]
    dataPlayers2 = [[600, 180], [420, 150], [420, 300], [200, 100], [200, 200], [,]]
    for (let xcon = 0; xcon < dataPlayers1.length; xcon++) {
        dibujarPlayer(dataPlayers1[xcon][0], dataPlayers1[xcon][1], 1);
    }
    for (let xcon = 0; xcon < dataPlayers2.length; xcon++) {
        dibujarPlayer(dataPlayers2[xcon][0], dataPlayers2[xcon][1], 2);
    }
    dibujarBalon(300, 200)
}

dibujarCampo();
dibujarBalon(300, 200)
//prueba()
InitGame()
//dibujarBalon(300,200)
//dibujarPlayer(290,200-40,1) //considerar el radio del balon para rebotar
//main();
//setInterval(movimientoBalon, 300)
