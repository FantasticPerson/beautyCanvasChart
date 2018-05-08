/*
 * @Author: dandan.wu 
 * @Date: 2018-05-07 10:22:35 
 * @Last Modified by: dandan.wu
 * @Last Modified time: 2018-05-08 17:52:47
 */

 /*
    计算点的坐标
    
    设长轴为a,短轴为b（题设缺少椭圆圆心就是原点的条件）
    则椭圆方程为：
    x^2/a^2+y^2/b^b=1
    设未知点与原点的连线与x轴正半轴的夹角为θ
    则该点与原点的连线 直线方程为：
    y=（tanθ） x 
    联立两个方程可解得两个坐标点,排除其中一个夹角为θ+180°的点

    x^2 / a^2 + (（tanθ） x)^2 /b ^2 = 1

    

    绘制椭圆 https://www.zybang.com/question/54757220677c3f49b6f7f28845a65a3c.html

    椭圆周长公式：L=2πb+4(a-b)   (a > b)

    弧长公式 │x1-x2│ √ (1+k²)
 */

function genenrateCanvas(id,dataSet,document){
    var canvas = document.getElementById(id);
    var context = canvas.getContext('2d');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var width = canvasWidth < canvasHeight ? canvasWidth : canvasHeight;
    // var scale = width / 180;
    // var r1 = 85*scale;
    // var r2 = 60 *scale;
    // var lineWidth = 10 * scale;

    var centerX = canvasWidth/2;
    var centerY = canvasWidth/2+100;

    console.log(centerY)

    // var centerX = 600
    // var centerY = 600

    var a = 480;
    var b = 210;

    var circleLength = 2*Math.PI*b+4*(a-b)

    console.log(circleLength)

    var gapLength = circleLength / 60

    var endPoint = [0,400]

    var gap = Math.PI*2 / 60;
    var startDegree = -Math.PI / 2


    function drawScaleCircle(){
        context.save()
        context.scale(1,0.5)
        context.moveTo(centerX,centerY)
        context.beginPath()
        context.arc(centerX,centerY,500,0,Math.PI*2);
        context.closePath()
        
        context.stroke()
        context.restore()

    }

    drawScaleCircle()

    function calcPoint(degree,index){
        var x = Math.sqrt( (Math.pow(b,2)*Math.pow(a,2)) / (Math.pow(Math.tan(degree),2) * Math.pow(a,2) + Math.pow(b,2)) )
        var y = x * Math.tan(degree)

        if( degree > -Math.PI / 2*3 && degree < -Math.PI / 2){
            x = -x
        }

        if((degree > -Math.PI && degree < -Math.PI/2) || (degree > -Math.PI/2*5 && degree < -Math.PI*2) || index == 0){
            y =  Math.abs(y)
        } else {
            y = -Math.abs(y)
        }
        // console.log(x,y)
        return [x,y]
    }

    function calcu(a,b){
        var gap = Math.PI/200
        var pointArr = []
        for(var i=0;i<400;i++){
            let point = calcPoint(startDegree-gap*i)
            // console.log(point)

            pointArr.push(point)
        }
        var length = 0
        for(var i=0;i<pointArr.length-1;i++){
            var x1 = pointArr[i][0]
            var x2 = pointArr[i+1][0]
            var y1 = pointArr[i][1]
            var y2 = pointArr[i+1][1]
            length += Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2))
        }
        console.log(length)
        // console.log(pointArr)
    }

    calcu()

    function drawPoint(x,y){
        context.save();
        context.lineWidth = 8
        context.beginPath()
        context.strokeStyle = 'rgb(100,100,100)'
        context.arc(centerX+x,centerY+y,4,0,Math.PI*2)
        context.stroke();
        context.restore();
    }

    function BezierEllipse2(ctx, x, y, a, b)
    {

        drawScaleCircle()

        return
        var k = .5522848,
        ox = a * k, // 水平控制点偏移量
        oy = b * k; // 垂直控制点偏移量

        ctx.beginPath();
        //从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
        ctx.moveTo(x - a, y);
        ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
        ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
        ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
        ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
        ctx.closePath();
        ctx.stroke();
    };

    BezierEllipse2(context,centerX,centerY,480,210)


    function drawLine(x,y){
        context.beginPath()
        context.moveTo(centerX+x,centerY+y)

        context.lineTo(endPoint[0]+centerX,endPoint[1]+centerY)
        context.closePath()
        context.stroke()
    }

    function drawText(x,y,degree){
        // console.log(x,y,degree)
    }

    function calculatePointe2(cL,index){
        
    }

    for(var i=0;i<60;i++){
        var degree = startDegree - gap * i
        var res = calcPoint(degree,i)
        drawLine(res[0],res[1])
    }

    for(var i=0;i<60;i++){
        var degree = startDegree - gap * i
        var res = calcPoint(degree,i)

        // var res = 
        drawPoint(res[0],res[1])
    }

    for(var i=0;i<60;i++){
        var degree = startDegree - gap * i
        var res = calcPoint(degree,i)
        drawText(res[0],res[1],degree)
    }
}


