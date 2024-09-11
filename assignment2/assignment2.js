var hdrone = {
    width: 110 / 2,
    height: 48 / 2,
};
var vdrone = {
    width: 48 / 2,
    height: 110 / 2,
};

var px;
var py;
var collsion;

var hweapon = {
    width: 4 / 2,
    height: 30 / 2,
};
var vweapon = {
    width: 30 / 2,
    height: 4 / 2,
};

var wx;
var wy;
var wcollsion;


var block1 ={
    x: 5,
    y: 5,
    width: 70,
    heigh: 100,
    color: "Aqua",
};
var block2 ={
    x: 230,
    y: 170,
    width: 150,
    heigh: 60,
    color: "Brown",
};
var block3 ={
    x: 800,
    y: 150,
    width: 150,
    heigh: 150,
    color: "DarkSalmon",
};
var block4 ={
    x: 350,
    y: 5,
    width: 350,
    heigh: 80,
    color: "DarkSlateGray",
};
var block5 ={
    x: 1070,
    y: 150,
    width: 130,
    heigh: 100,
    color: "LawnGreen"
};
var block6 ={
    x: 5,
    y: 400,
    width: 70,
    heigh: 150,
    color: "Pink",
};

var blocks;
var count;
var gameWon;


var angle;

var canvas1 = document.getElementById('canvas1');
var ctx1 = canvas1.getContext('2d');

var slider1 = document.getElementById('slider1');
var slider2 = document.getElementById('slider2');
var slider3 = document.getElementById('slider3');
var slider4 = document.getElementById('slider4');

var id;

slider1.addEventListener("input",function(){
    if (slider1.value != 0){
        update();
        slider2.disabled = false;
        slider3.disabled = false;
        slider4.disabled = false;
    } else{
        cancelAnimationFrame(id);
        slider2.disabled = true;
        slider3.disabled = true;
        slider4.disabled = true;
    }
});

window.onload = newGame;

function newGame() {
    cancelAnimationFrame(id);
    slider1.disabled = false;
    slider2.disabled = true;
    slider3.disabled = true;
    slider4.disabled = true;

    slider1.value = 0;
    slider2.value = 0;
    slider3.value = 700;
    slider4.value = 120;
    
    px = 700;
    py = 495;
    collsion = hdrone;
    angle = 0;

    wx = 698;
    wy = 430;
    wcollsion = hweapon;

    block1.x = 5 + Math.floor(Math.random() * 151);
    block1.y = 5 + Math.floor(Math.random() * 271);

    block2.x = 250 + Math.floor(Math.random() * 201);
    block2.y = 170 + Math.floor(Math.random() * 351);

    block3.x = 800 + Math.floor(Math.random() * 101);
    block3.y = 150 + Math.floor(Math.random() * 341);

    block4.x = 350 + Math.floor(Math.random() * 631);
    block4.y = 5 + Math.floor(Math.random() * 51);

    block5.x = 1070 + Math.floor(Math.random() * 81);
    block5.y = 150 + Math.floor(Math.random() * 341);

    block6.x = 5 + Math.floor(Math.random() * 161);
    block6.y = 370 + Math.floor(Math.random() * 130);
    
    blocks = [block1, block2, block3, block4, block5, block6];
    count = 6;
    gameWon = false;

    draw(angle);
}

function draw(angle){
    canvas1.width = canvas1.width;
    var dx = slider3.value - 700;
    var dy = -(slider4.value - 120);
    var phi = slider2.value * Math.PI / 2;

    px = 700 + dx;
    py = 495 + dy;

    switch (parseInt(slider2.value)) {
        case 0:
            wx = px;
            wy = py - 50;
            collsion = hdrone;
            wcollsion = hweapon;
            break;
        case 1:
            wx = px + 50;
            wy = py;
            collsion = vdrone;
            wcollsion = vweapon;
            break;
        case 2:
            wx = px;
            wy = py + 50;
            collsion = hdrone;
            wcollsion = hweapon;
            break;
        case 3:
            wx = px - 50;
            wy = py;
            collsion = vdrone;
            wcollsion = vweapon;
            break;
        default:
            wx = 700 + dx;
            wy = 445 + dy;
            collsion = hdrone;
            wcollsion = hweapon;
            break;
    }
    

    function drone(){
        ctx1.strokeStyle = "black";
        ctx1.beginPath();
        ctx1.rect(690, 470, 20, 50);
        ctx1.fillStyle = "gray";
        ctx1.fill();
        ctx1.stroke();

        ctx1.beginPath();
        ctx1.arc(700, 470, 10, Math.PI, 0);
        ctx1.rect(680, 480, 10, 30);
        ctx1.rect(710, 480, 10, 30);
        ctx1.rect(673, 490, 5, 2);
        ctx1.rect(720, 490, 5, 2);
        ctx1.fillStyle = "white";
        ctx1.fill();
        ctx1.stroke();

        ctx1.beginPath();
        ctx1.rect(699, 430, 2, 30);
        ctx1.fillStyle = "DimGray";
        ctx1.fill();
        ctx1.stroke();
        ctx1.closePath();
        
        ctx1.beginPath();
        ctx1.moveTo(690, 510);
        ctx1.lineTo(690, 520);
        ctx1.lineTo(670, 520);
        ctx1.closePath();
        ctx1.fillStyle = "DimGray";
        ctx1.fill();
        ctx1.stroke();

        ctx1.beginPath();
        ctx1.moveTo(710, 510);
        ctx1.lineTo(710, 520);
        ctx1.lineTo(730, 520);
        ctx1.closePath();
        ctx1.fill();
        ctx1.stroke();
    }

    function prop(){
        ctx1.strokeStyle = "black";
        ctx1.beginPath();
        ctx1.arc(655, 490, 20, 0, 2* Math.PI);
        ctx1.stroke();

        
    }
    function blade() {
        ctx1.fillStyle = "black";
        ctx1.beginPath();
        ctx1.moveTo(655, 470);
        ctx1.lineTo(650, 485);
        ctx1.lineTo(655,490);
        ctx1.closePath();
        ctx1.fill();
    } 

    function drawBlock() {
        blocks.forEach(b => {
            ctx1.fillStyle = b.color;
            ctx1.beginPath();
            ctx1.rect(b.x, b.y, b.width, b.heigh);
            ctx1.fill();
        });
    }

    drawBlock();

    ctx1.save();
    ctx1.translate(dx,dy);
    ctx1.translate(700, 495);
    ctx1.rotate(phi);
    ctx1.translate(-700, -495);
    drone();
    prop();
    
    ctx1.save();
    ctx1.translate(655, 490);
    ctx1.rotate(Math.PI/3*2 + angle);
    ctx1.translate(-655, -490);
    blade();
    ctx1.translate(655, 490);
    ctx1.rotate(Math.PI/3*2);
    ctx1.translate(-655, -490);
    blade();
    ctx1.translate(655, 490);
    ctx1.rotate(Math.PI/3*2);
    ctx1.translate(-655, -490);
    blade();
    ctx1.restore();

    ctx1.save();
    ctx1.translate(90,0);
    prop();

    ctx1.save();
    ctx1.translate(655, 490);
    ctx1.rotate(Math.PI/3*2 + angle);
    ctx1.translate(-655, -490);
    blade();
    ctx1.translate(655, 490);
    ctx1.rotate(Math.PI/3*2);
    ctx1.translate(-655, -490);
    blade();
    ctx1.translate(655, 490);
    ctx1.rotate(Math.PI/3*2);
    ctx1.translate(-655, -490);
    blade();
    ctx1.restore();
    ctx1.restore();
    ctx1.restore();
}

function update(){
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    angle = angle +  0.08;
    draw(angle);
    collisionDetect();
    if (gameWon) gameWin();
    id = window.requestAnimationFrame(update);
}

function collisionDetect() {
    var b;
    for (var i = 0; i < blocks.length; i++) {
        b = blocks[i];
        if (
            wx - wcollsion.width < b.x + b.width &&
            wx + wcollsion.width > b.x &&
            wy - wcollsion.height < b.y + b.heigh &&
            wy + wcollsion.height > b.y
        ){
            blocks.splice(i, 1);
            count--;
            if (count == 0) gameWon = true;
            return;
        }
        else if (
            px - collsion.width < b.x + b.width &&
            px + collsion.width > b.x &&
            py - collsion.height < b.y + b.heigh &&
            py + collsion.height > b.y
        ) {
            gameOver();
        }
    }
}

function gameOver() {
    endInfo();
    ctx1.fillText("Game over! Watch out for drone body collisions with obstacles!",360,300);
    ctx1.font = "30px Arial";
    ctx1.fillText("Click to try again!",610,400);
}

function gameWin() {
    endInfo();
    ctx1.fillText("You won! Congratulations!",570,300);
    ctx1.font = "30px Arial";
    ctx1.fillText("Click to try again!",610,400);
    
}

function endInfo() {
    ctx1.beginPath();
    ctx1.globalAlpha = 0.7;
    ctx1.fillStyle = 'white';
    ctx1.rect(0, 0, 1400, 650);
    ctx1.fill();

    
    ctx1.globalAlpha = 1;
    ctx1.beginPath();
    ctx1.rect(600, 354, 250, 70);
    ctx1.fillStyle = 'PapayaWhip';
    ctx1.fill();
    ctx1.strokeStyle = "black";
    ctx1.stroke();

    canvas1.addEventListener('click', clickHandler);
    
    ctx1.fillStyle = "black";
    ctx1.font = "25px Arial";

    slider1.disabled = true;
    slider2.disabled = true;
    slider3.disabled = true;
    slider4.disabled = true;
}


function clickHandler(event) {
    var mx = event.clientX - canvas1.getBoundingClientRect().left;
    var my = event.clientY - canvas1.getBoundingClientRect().top;
    
    if (mx >= 600 && mx <= 850 && my >= 354 && my <= 424) {
        newGame();
        canvas1.removeEventListener('click', clickHandler);
    }
}
