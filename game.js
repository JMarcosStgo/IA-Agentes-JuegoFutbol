//carga el canvas
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
pincel.fillRect(0, 0, 640, 427);
pincel.fill();
let alto = pantalla.height;
let ancho = pantalla.width;
console.log(ancho, alto);
let margenX = ancho - (ancho - 30);
let margenY = alto - (alto - 20);
let dataPlayers1 = [[30, 20], [40, 40], [120, 40], [140, 60], [180, 80], [320, 20], [340, 40], [360, 60], [380, 80], [,]]
let dataPlayers2 = [[600, 20], [580, 40], [420, 40], [440, 60], [380, 80], [280, 20], [240, 40], [200, 60], [180, 80], [,]]
var xPlayer = Math.round(Math.random() * 4) + margenX;
var yPlayer = Math.round(Math.random() * 4) + margenY;

function prueba() {
    dibujarPlayer(ancho - 30, 200, 1)
}

function dibujarBalon(x, y) {
    /***
     * validar area y saber la direccion de rebote del balon
     * ***/
    var image = new Image();
    image.src = "3.png";
    image.onload = function () {
        pincel.drawImage(image, x, y);
    };
}

function dibujarCampo() {
    var image = new Image();
    image.src = "campoF.jpg";
    image.onload = function () {
        pincel.drawImage(image, 0, 0);
    };
}
function dibujarPlayer(x, y, team) {
    var image = new Image();
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
    dibujarBalon(300, 200)
    for (let xcon = 0; xcon < dataTeam1.length; xcon++) {
        dibujarPlayer(dataTeam1[xcon][0], dataTeam1[xcon][1], team1);
    }
    for (let xcon = 0; xcon < dataTeam2.length; xcon++) {
        dibujarPlayer(dataTeam2[xcon][0], dataTeam2[xcon][1], team2);
    }
}
function dibujarJugadoresTeams(team) {
    //dibujarCampo()
    let def = evaluaDefensas(team)
    let med = evaluaMedios(team)
    let del = evaluaDelanteros(team)
    let dataPlayers11 = def.concat(med).concat(del)
    return dataPlayers11
}

function evaluaDefensas(team) {
    let p1 = dataPlayers1
    if (team == 2) {
        p1 = dataPlayers2
    }
    let dataDefensas = new Array()
    let con = 0
    while (true) {
        console.log("datadefensas", dataDefensas, p1)
        data = obtieneMovimientos(p1[con][0], p1[con][1])
        console.log("evalua defensas", data, data[0], data[1])
        if (dataDefensas.length == 2) {
            console.log("if break")
            break;
        }
        if (team == 1) {
            if (data[0] >= 30 && data[0] <= (ancho / 5.3) && data[1] >= 20 && data[1] <= (alto - (alto / 6.5))) {
                dataDefensas.push(data)
                dataPlayers1[con] = data
                console.log("if validacion", dataDefensas)
                con += 1

            }
        }
        else {
            if (data[0] >= (ancho - (ancho / 5)) && data[0] <= ancho - 30 && data[1] >= 20 && data[1] <= (alto - (alto / 6.5))) {
                dataDefensas.push(data)
                dataPlayers2[con] = data
                console.log("if validacion", dataDefensas)
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
    let con = 2
    while (true) {
        data = obtieneMovimientos(p1[con][0], p1[con][1])
        if (dataMedios.length == 3) {
            break;
        }
        if (team == 1) {
            if (data[0] >= (ancho / 5.3) && data[0] <= (ancho / 2) && data[1] >= 20 && data[1] <= (alto - (alto / 6.5))) {
                dataMedios.push(data)
                dataPlayers1[con] = data
                console.log("if validacion", dataMedios)
                con += 1
            }
        } else {
            if (data[0] >= (ancho / 2) && data[0] <= (ancho - (ancho / 5)) && data[1] >= 20 && data[1] <= (alto - (alto / 6.5))) {
                dataMedios.push(data)
                dataPlayers2[con] = data
                console.log("if validacion", dataMedios)
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
    let con = 5
    while (true) {
        data = obtieneMovimientos(p1[con][0], p1[con][1])
        if (dataDelanteros.length == 4) {
            break;
        }
        if (team == 1) {
            if (data[0] >= (ancho / 2) && data[0] <= (ancho - 30) && data[1] >= 20 && data[1] <= (alto - (alto / 6.5))) {
                dataDelanteros.push(data)
                dataPlayers1[con] = data
                console.log("if validacion", dataDelanteros)
                con += 1
            }
        } else {
            if (data[0] >= 30 && data[0] <= (ancho / 2) && data[1] >= 20 && data[1] <= (alto - (alto / 6.5))) {
                dataDelanteros.push(data)
                dataPlayers2[con] = data
                console.log("if validacion", dataDelanteros)
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
    console.log("obtieneMovimientos", ejeX, ejeY);
    return [ejeX, ejeY];
}


var y = 20;
var x = 30;
var controlY = 1;
var controlX = 1;
var velocidad = 1;
function balonRebote(xx, yy) {
    x = xx
    y = yy
    //Eje Y
    if (controlY == 1) {
        y += velocidad;
    } else {
        y -= velocidad;
    }
    if (y <= 0) {
        controlY = 1;
        y = 0;
    } else if (y >= margenY) {
        // Esto significa si y es mayor o igual a la altura que tiene el canvas menos el tamaño de la imagen
        controlY = 0;
        y = margenY;
    }
    //Eje X
    if (controlX == 1) {
        x += velocidad;
    } else {
        x -= velocidad;
    }
    if (x <= 0) {
        controlX = 1;
        x = 0;
    } else if (x >= margenX) {
        controlX = 0;
        x = margenX;
    }
    dibujarBalon(x, y);
}

function girar() {
    document.getElementById("imagen").className = "gira";
}

function escribirScore() {
    var score = "3 - 1";
    var objetivo = document.getElementById("texto_nav1");
    objetivo.innerHTML = score;
}
function escribirTiempo() {
    var time_game = "5:59";
    var objetivo = document.getElementById("texto_nav2");
    objetivo.innerHTML = time_game;
}

function main() {
    dibujarJugadoresEquipo(1, 2);
    escribirScore();
    escribirTiempo();

}
let idItervalo= 0;
function start(){
    idItervalo = setInterval(main, 100)
}
function stopGame(){
    clearInterval(idItervalo)
}

dibujarCampo();

//main();

//setInterval(dibujarBalon(300,200),100)
