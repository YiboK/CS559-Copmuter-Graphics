function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
	var tParam = 0;

    function draw() {
	canvas.width = canvas.width;
		function moveToTx(loc,Tx)
		{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

		function lineToTx(loc,Tx)
		{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
		function drawArrow(Tx) {
			context.beginPath();
			moveToTx([-.1,.05], Tx);
			lineToTx([-.1,-.05], Tx);
			lineToTx([0,-.05], Tx);
			lineToTx([0,-.1], Tx);
			lineToTx([0.1,0], Tx);
			lineToTx([0,.1], Tx);
			lineToTx([0,.05], Tx);
			context.fillStyle = 'lightgray';
			context.closePath();
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
			var result=vec2.create();
			vec2.scale(result,P[0],b[0]);
			vec2.scaleAndAdd(result,result,P[1],b[1]);
			vec2.scaleAndAdd(result,result,P[2],b[2]);
			vec2.scaleAndAdd(result,result,P[3],b[3]);
			return result;
		}
		
		var p1=[1,1/2];
		var d1=[1,1];
		var p2=[-0.3,2];
		var d2=[0,3];
		var p3=[2,3.5];
		var d3=[-2,-1];
		var p4=[3,3];
		var d4=[-1,-2];
		var p5=[2,1];
		var d5=[-3,0];
		var p6=[0,0];
		var d6=[1,0];


		var P1 = [p1,d1,p2,d2];
		var P2 = [p2,d2,p3,d3];
		var P3 = [p3,d3,p4,d4];
		var P4 = [p4,d4,p5,d5];
		var P5 = [p5,d5,p6,d6];

		var C0 = function(t_) {
			var y = 1/2 * t_ * t_;
			return [t_, y];
		};
		var C1 = function(t_) {return Cubic(Hermite,P1,t_);};
		var C2 = function(t_) {return Cubic(Hermite,P2,t_);};
		var C3 = function(t_) {return Cubic(Hermite,P3,t_);};
		var C4 = function(t_) {return Cubic(Hermite,P4,t_);};
		var C5 = function(t_) {return Cubic(Hermite,P5,t_);};

		var C0prime = function(t_) {return [1, t_];};
		var C1prime = function(t_) {return Cubic(HermiteDerivative,P1,t_);};
		var C2prime = function(t_) {return Cubic(HermiteDerivative,P2,t_);};
		var C3prime = function(t_) {return Cubic(HermiteDerivative,P3,t_);};
		var C4prime = function(t_) {return Cubic(HermiteDerivative,P4,t_);};
		var C5prime = function(t_) {return Cubic(HermiteDerivative,P5,t_);};

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
			} else if (t<4){
				var u = t-3.0
				return C3(u);
			} else if (t<5){
				var u = t-4.0
				return C4(u);
			}else if (t<6){
				var u = t-5.0
				return C5(u);
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
			} else if (t<5){
				var u = t-4.0;
				return C4prime(u);  
			} 
			else if (t<6){
				var u = t-5.0;
				return C5prime(u);  
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

		// make sure you understand these    

		var Tblue_to_canvas = mat3.create();
		mat3.fromTranslation(Tblue_to_canvas,[50,600]);
		mat3.scale(Tblue_to_canvas,Tblue_to_canvas,[150,-150]);

		drawTrajectory(0.0,1.0,100,C0,Tblue_to_canvas,"red");
		drawTrajectory(0.0,1.0,100,C1,Tblue_to_canvas,"cornflowerblue");
		drawTrajectory(0.0,1.0,100,C2,Tblue_to_canvas,"brown");
		drawTrajectory(0.0,1.0,100,C3,Tblue_to_canvas,"darkslategrey");
		drawTrajectory(0.0,1.0,100,C4,Tblue_to_canvas,"slateblue");
		drawTrajectory(0.0,1.0,100,C5,Tblue_to_canvas,"tan");

		var Tarrow_to_blue = mat3.create();
		mat3.fromTranslation(Tarrow_to_blue,Ccomp(tParam));
		var Tarrow_to_canvas = mat3.create();
		var tangent = Ccomp_tangent(tParam);
		var angle = Math.atan2(tangent[1],tangent[0]);
		mat3.rotate(Tarrow_to_blue,Tarrow_to_blue,angle);
		mat3.multiply(Tarrow_to_canvas, Tblue_to_canvas, Tarrow_to_blue);
		drawArrow(Tarrow_to_canvas);
		tParam += .01;
		if (tParam >= 6){tParam = 0};
		window.requestAnimationFrame(draw);
    }
	draw();
}
window.onload = setup;

