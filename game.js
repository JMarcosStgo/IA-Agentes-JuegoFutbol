//carga el canvas 
var pantalla = document.querySelector('canvas'); 
var pincel = pantalla.getContext("2d");
pincel.fillRect(0,0,640,427);   
pincel.fill()

function dibujarBalon(){
    var image = new Image();
    image.onload = function () {
        pincel.drawImage(image,55,55);
    };
    image.src = '3.png';
}

function dibujarCampo(){
    var image = new Image();
    image.onload = function () {
        pincel.drawImage(image,0,0);
    };
    image.src = 'campoF.jpg';
}

function escribirScore() {
    var score = "3 - 1";
    var objetivo = document.getElementById('texto_nav1');
    objetivo.innerHTML = score;
}
function escribirTiempo(){
    var time_game = "5:59";
    var objetivo = document.getElementById('texto_nav2');
    objetivo.innerHTML = time_game;

}

dibujarCampo()
dibujarBalon()
escribirScore()
escribirTiempo()
