function setup () {
    var canvas1 = document.getElementById('canvas1');
    var x = 0;
    var y = Math.cos(x);

    function sun() {
        canvas1.width = canvas1.width;
        var ctx1 = canvas1.getContext('2d');
    
        ctx1.beginPath();
        ctx1.moveTo(100+x, 100+y);
        ctx1.lineTo(150+x,100+y);
        ctx1.lineTo(175+x,143.3+y);
        ctx1.lineTo(150+x,186.6+y);
        ctx1.lineTo(100+x,186.6+y);
        ctx1.lineTo(75+x,143.3+y);
        ctx1.closePath();
        ctx1.fillStyle = "yellow"
        ctx1.fill();
        ctx1.lineWidth = 4;
        ctx1.strokeStyle = "red";
        ctx1.stroke(); 

        
        ctx1.beginPath();
        ctx1.moveTo(125+x, 10+y);
        ctx1.lineTo(150+x, 90+y);
        ctx1.lineTo(100+x, 90+y);
        ctx1.closePath();
        ctx1.fillStyle = "orange"
        ctx1.fill();
        ctx1.strokeStyle = "pink";
        ctx1.lineWidth = 2;
        ctx1.stroke();

        ctx1.beginPath();
        ctx1.moveTo(159+x, 96+y);
        ctx1.lineTo(181+x,136.3+y);
        ctx1.lineTo(240+x,72+y);
        ctx1.closePath();
        ctx1.fill();
        ctx1.stroke();

        ctx1.beginPath();
        ctx1.moveTo(183+x, 147+y);
        ctx1.lineTo(159+x,190+y);
        ctx1.lineTo(247+x,205+y);
        ctx1.closePath();
        ctx1.fill();
        ctx1.stroke();

        ctx1.beginPath();
        ctx1.moveTo(125+x, 276+y);
        ctx1.lineTo(150+x, 196.6+y);
        ctx1.lineTo(100+x, 196.6+y);
        ctx1.closePath();
        ctx1.fill();
        ctx1.stroke();

        ctx1.beginPath();
        ctx1.moveTo(91+x, 96+y);
        ctx1.lineTo(69+x,136.3+y);
        ctx1.lineTo(10+x,72+y);
        ctx1.closePath();
        ctx1.fill();
        ctx1.stroke();

        ctx1.beginPath();
        ctx1.moveTo(67+x, 147+y);
        ctx1.lineTo(91+x,190+y);
        ctx1.lineTo(12+x,205+y);
        ctx1.closePath();
        ctx1.fill();
        ctx1.stroke();

        x = (x + 1) % 900;
        y = 30*Math.cos(x/150);
        window.requestAnimationFrame(sun);
    }
    
    window.requestAnimationFrame(sun);

    var canvas2 = document.getElementById('canvas2');
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 0;
    var slider4 = document.getElementById('slider4');
    slider4.value = 10;

    function draw() {
        var ctx2 = canvas2.getContext('2d');
        canvas2.width = canvas2.width;
        var dx = slider1.value;
        var dy = slider2.value;
        var scale = slider4.value/10;
        var phi = slider3.value * Math.PI / 180;
        var cx = 75;
        var cy = 93.3;

        ctx2.beginPath();
        ctx2.fillStyle = "#800";
        ctx2.rect(250,0,100,100);
        ctx2.rect(0,200,50,150);
        ctx2.rect(150,300,200,100);
        ctx2.rect(500,200,100,200);
        ctx2.rect(750,0,150,250);
        ctx2.rect(1050,250,150,150);
        ctx2.fill();

        ctx2.beginPath();
        ctx2.rect(1050,4,146,146);
        ctx2.strokeStyle = "blue";
        ctx2.lineWidth = 4;
        ctx2.stroke();

        function DrawShape() {
            ctx2.beginPath();
            ctx2.moveTo(50, 50);
            ctx2.lineTo(100,50);
            ctx2.lineTo(105,60);
            ctx2.lineTo(95,80);
            ctx2.lineTo(120, 85);
            ctx2.lineTo(125,93.3);
            ctx2.lineTo(100,136.6);
            ctx2.lineTo(50,136.6);
            ctx2.lineTo(25,93.3);
            ctx2.lineTo(50,50);
            ctx2.lineWidth = 4;
            ctx2.strokeStyle = "red";
            ctx2.stroke();

        }

        function linkage() {
            ctx2.beginPath();
            ctx2.moveTo(100,50);
            ctx2.lineTo(115,20);
            ctx2.lineTo(140,5);
            ctx2.lineTo(125,35);
            ctx2.closePath();
            ctx2.strokeStyle = "green";
            ctx2.stroke();
        }

        ctx2.save();
        ctx2.translate(dx,dy);
        ctx2.scale(scale,scale);
        DrawShape();
        ctx2.translate(100, 50);
        ctx2.rotate(phi);
        ctx2.translate(-100, -50);
        linkage();
        ctx2.restore();

    }
    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input",draw);
    slider4.addEventListener("input",draw);
    draw();
}

window.onload = setup;