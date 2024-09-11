function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
	var tParam = 0;

    function draw() {
		canvas.width = canvas.width;

		// use the sliders to get the angles
		var angleV = -slider1.value*0.02*Math.PI;
		var angleH = slider2.value*0.02*Math.PI;

		function moveToTx(loc,Tx)
		{context.globalAlpha = 1; var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}

		function lineToTx(loc,Tx)
		{context.globalAlpha = 1; var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}
		
		function drawArrow(Tx) {
			context.beginPath();
			moveToTx([-1,.5,0], Tx);
			lineToTx([-1,-.5,0], Tx);
			lineToTx([0,-.5,0], Tx);
			lineToTx([0,-1,0], Tx);
			lineToTx([1,0,0], Tx);
			lineToTx([0,1,0], Tx);
			lineToTx([0,.5,0], Tx);
			context.fillStyle = 'black';
			context.closePath();
			context.fill();
		}

		function drawPlatform(Tx) {
			context.beginPath();
			moveToTx([-10,15,-25], Tx);
			lineToTx([30,15,-25], Tx);
			lineToTx([30,16,25], Tx);
			lineToTx([-10,16,25], Tx);
			context.closePath();
			context.globalAlpha = 0.2;
			context.fillStyle = 'black';
			context.fill();
		}
		
		var Hermite = function(t) {
			return [
			2*t*t*t-3*t*t+1,
			t*t*t-2*t*t+t,
			-2*t*t*t+3*t*t,
			t*t*t-t*t
			];
		}

		var HermiteDerivative = function(t) {
				return [
			6*t*t-6*t,
			3*t*t-4*t+1,
			-6*t*t+6*t,
			3*t*t-2*t
				];
		}

		function Cubic(basis,P,t){
			var b = basis(t);
			var result=vec3.create();
			vec3.scale(result,P[0],b[0]);
			vec3.scaleAndAdd(result,result,P[1],b[1]);
			vec3.scaleAndAdd(result,result,P[2],b[2]);
			vec3.scaleAndAdd(result,result,P[3],b[3]);
			return result;
		}
		
		var p1 = [10, 45, 5];
		var d1 = [10, 30, 10];
		var p2 = [20, 55, -15];
		var d2 = [-20, 0, 0];
		var p3 = [20, 30, 10];
		var d3 = [-30, 20, 20];
		var p4 = [0, 20, -20];
		var d4 = [10, 20, 0];
		
		var P0 = [p4,d4,p1,d1];
		var P1 = [p1,d1,p2,d2];
		var P2 = [p2,d2,p3,d3];
		var P3 = [p3,d3,p4,d4];

		var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
		var C1 = function(t_) {return Cubic(Hermite,P1,t_);};
		var C2 = function(t_) {return Cubic(Hermite,P2,t_);};
		var C3 = function(t_) {return Cubic(Hermite,P3,t_);};

		var C0prime = function(t_) {return Cubic(HermiteDerivative,P0,t_);};
		var C1prime = function(t_) {return Cubic(HermiteDerivative,P1,t_);};
		var C2prime = function(t_) {return Cubic(HermiteDerivative,P2,t_);};
		var C3prime = function(t_) {return Cubic(HermiteDerivative,P3,t_);};

		var Ccomp = function(t) {
			if (t<1){
				var u = t;
				return C0(u);
			} else if (t < 2){
				var u = t-1.0;
				return C1(u);
			} else if (t < 3){
				var u = t-2.0;
				return C2(u);
			} else if (t < 4){
				var u = t-3.0
				return C3(u);
			}
		}

		var Ccomp_tangent = function(t) {
			if (t<1){
				var u = t;
				return C0prime(u);
			} else if (t<2){
				var u = t-1.0;
				return C1prime(u);
			} else if (t<3){
				var u = t-2.0;
				return C2prime(u);  
			} else if (t<4){
				var u = t-3.0;
				return C3prime(u);  
			}
		}

		function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
			context.strokeStyle=color;
			context.beginPath();
			moveToTx(C(t_begin),Tx);
			for(var i=1;i<=intervals;i++){
				var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
				lineToTx(C(t),Tx);
			}
			context.stroke();
		}


		var Tviewport = mat4.create();
		mat4.fromTranslation(Tviewport,[200,600,0]);
		mat4.scale(Tviewport,Tviewport,[100,-100,1]);

		var Tprojection = mat4.create();
		mat4.ortho(Tprojection,-20,0,-10,10,-1,1);

		var tVP_PROJ = mat4.create();
		mat4.multiply(tVP_PROJ,Tviewport,Tprojection);

		var locCamera = vec3.create();
		var distCamera = 100.0;
		locCamera[0] = distCamera*Math.sin(angleH);
		locCamera[1] = distCamera*Math.tan(angleV);
		locCamera[2] = distCamera*Math.cos(angleH);
		console.log(locCamera);
		var locTarget = vec3.fromValues(1,0,0);
		var vecUp = vec3.fromValues(0,1,0);
		var TlookAt = mat4.create();
		mat4.lookAt(TlookAt, locCamera, locTarget, vecUp);
		
		var tVP_PROJ_CAM = mat4.create();
		mat4.multiply(tVP_PROJ_CAM,tVP_PROJ,TlookAt);
		drawPlatform(tVP_PROJ_CAM);
		drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_CAM,"tan");
		drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_CAM,"cornflowerblue");
		drawTrajectory(0.0,1.0,100,C2,tVP_PROJ_CAM,"brown");
		drawTrajectory(0.0,1.0,100,C3,tVP_PROJ_CAM,"darkslategrey");
		

		var Tmodel = mat4.create();
		mat4.fromTranslation(Tmodel,Ccomp(tParam));
		var tangent = Ccomp_tangent(tParam);
		var angle = Math.atan2(tangent[1],tangent[0]);
		mat4.rotateZ(Tmodel,Tmodel,angle);

		var tVP_PROJ_CAM_MOD = mat4.create();
		mat4.multiply(tVP_PROJ_CAM_MOD, tVP_PROJ_CAM, Tmodel);
		drawArrow(tVP_PROJ_CAM_MOD);
    }
	function update(){
		tParam = tParam + .01;
		if (tParam >= 4){tParam = 0};
		draw();
		window.requestAnimationFrame(update);
	}
    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
	update();
    
}
window.onload = setup;