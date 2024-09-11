function setup() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d')

    var phi1 = 0;
    var phi2 = 0;
    var phi3 = 0;

    function draw() {
        canvas.width = canvas.width;
        var stack = [ mat3.create() ]; 

        function cirleToTx(x,y,r,sa,ea)
        {var res=vec2.create(); vec2.transformMat3(res,[x,y],stack[0]); ctx.arc(res[0],res[1],r,sa,ea);}


        function drawSun() {
            ctx.beginPath();
            cirleToTx(0,0,50,0,2*Math.PI);
            ctx.fillStyle = 'orange';
            ctx.fill();

            ctx.beginPath();
            cirleToTx(-25,0,15,0,2*Math.PI);
            ctx.fillStyle = 'yellow';
            ctx.fill();

            ctx.beginPath();
            cirleToTx(25,-20,10,0,2*Math.PI);
            ctx.fill();

            ctx.beginPath();
            cirleToTx(20,25,13,0,2*Math.PI);
            ctx.fill();
        }

        function drawEarth() {
            ctx.beginPath();
            cirleToTx(0,0,20,0,2*Math.PI);
            ctx.fillStyle = '#0080ff';
            ctx.fill();

            ctx.beginPath();
            cirleToTx(-10,0,7,0,2*Math.PI);
            ctx.fillStyle = '#40ff00';
            ctx.fill();

            ctx.beginPath();
            cirleToTx(8,-10,3,0,2*Math.PI);
            ctx.fill();

            ctx.beginPath();
            cirleToTx(5,10,4,0,2*Math.PI);
            ctx.fill();
        }

        function drawMoon() {
            ctx.beginPath();
            cirleToTx(0,0,10,0,2*Math.PI);
            ctx.fillStyle = 'dimgray';
            ctx.fill();
        }

        var sun_to_canvas = mat3.create();
        mat3.fromTranslation(sun_to_canvas,[350,350]);
        mat3.rotate(sun_to_canvas,sun_to_canvas,phi1 * Math.PI / 180);
        mat3.multiply(stack[0],stack[0],sun_to_canvas);
        drawSun();

        var earth_orbit = mat3.create();
        mat3.rotate(earth_orbit, earth_orbit, phi2 * Math.PI / 180);
        mat3.translate(earth_orbit, earth_orbit, [250, 0]);
        mat3.multiply(stack[0], stack[0], earth_orbit);

        var earth_rotation = mat3.create();
        mat3.rotate(earth_rotation, earth_rotation, phi3 * Math.PI / 180);
        mat3.multiply(stack[0], stack[0], earth_rotation);
        drawEarth();

        var moon = mat3.create();
        mat3.translate(moon, moon, [50, 0]);
        mat3.multiply(stack[0], stack[0], moon);
        drawMoon();

        phi1 += 0.08;
        phi2 += 0.5;
        phi3 += 0.8;
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
}

window.onload = setup;