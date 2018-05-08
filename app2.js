/*
 * @Author: dandan.wu 
 * @Date: 2018-05-07 10:22:35 
 * @Last Modified by: dandan.wu
 * @Last Modified time: 2018-05-08 17:57:10
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
    var playTime = 0
    var canvas = document.getElementById(id);
    var context = canvas.getContext('2d');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var width = canvasWidth < canvasHeight ? canvasWidth : canvasHeight;

    var centerX = canvasWidth/2;
    var centerY = canvasWidth/2+150;

    var a = 480;
    var b = 210;

    var circleLength = 2*Math.PI*b+4*(a-b)

    var gapLength = circleLength / 60

    var endPoint = [0,50]

    var gap = Math.PI*2 / 60;
    var startDegree = Math.PI / 2 * 3

    var smalGap = gap /20;
    
    window.requestAnimationFrame(drawAnimation);

    function drawAnimation(){
        playTime++;
        startDegree += smalGap
        startDegree = getDegree(startDegree)
        context.clearRect(0,0,canvas.width,canvas.height);
        drawScaleCircle()

        for(var i=0;i<60;i++){
            var degree = startDegree - gap * i
            var res = calcPoint(degree,i)
            drawLine(res[0],res[1])
        }
    
        for(var i=0;i<60;i++){
            var degree = startDegree - gap * i
            var res = calcPoint(degree,i)
            drawPoint(res[0],res[1])
        }
    
        for(var i=0;i<60;i++){
            var degree = startDegree - gap * i
            var res = calcPoint(degree,i)
            drawText(res[0],res[1],degree,i)
        }

        window.requestAnimationFrame(drawAnimation);
    }

    function drawScaleCircle(){
        context.save()
        context.scale(1,0.4)
        context.beginPath()
        context.arc(centerX,centerY,500,0,Math.PI*2);
        context.closePath()
        
        context.stroke()
        context.restore()
    }

    function getDegree(deg){
        while(deg < 0){
            deg += Math.PI * 2
        }
        while(deg > Math.PI * 2){
            deg -= Math.PI * 2
        }
        return deg
    }

    function calcPoint(degree,index){
        var deg = getDegree(degree)
        
        x = Math.abs(500 * Math.cos(deg))
        y = Math.abs(500 * Math.sin(deg) * 0.4)

        if( deg < Math.PI / 2*3 && deg > Math.PI / 2){
            x = -Math.abs(x)
        } else {
            x = Math.abs(x)
        }
        if(deg < Math.PI && deg > 0){
            y =  Math.abs(y)
        } else {
            y =  -Math.abs(y)
        }
        return [x,y]
    }

    function drawPoint(x,y){
        context.save();
        context.lineWidth = 8
        context.beginPath()
        context.strokeStyle = '#008AF8'
        context.arc(centerX+x,centerY*0.4+y,4,0,Math.PI*2)
        context.stroke();
        context.restore();
    }

    function drawLine(x,y){
        context.save()
        
        context.beginPath()
        context.strokeStyle = '#008AF8'
        context.moveTo(centerX+x,centerY*0.4+y)
        context.lineTo(endPoint[0]+centerX,endPoint[1]+centerY)
        context.closePath()
        context.stroke()
        context.restore()
    }

    function drawText(x,y,degree,i){
        var deg = getDegree(degree)


        if(deg >= Math.PI/2-gap/2 && deg <= Math.PI/2+gap/2){
            context.save();
            context.fillStyle = "#123";
            context.font = 20+"px serif";
            context.textBaseline = "middle";
            context.textAlign = 'center';
            context.fillText('666'+i, centerX, centerY-200);
            context.restore()
        }

        else {
            context.save();
            context.translate(centerX+x,y+centerY*0.4)

            if(deg>Math.PI/2 && deg < Math.PI/2*3){
                context.rotate(-Math.PI+degree)
                context.fillStyle = "#51B49D";
                context.font = 20+"px serif";
                context.textBaseline = "middle";
                context.textAlign = 'right';
                context.fillText('测试数据'+i, -20, 0);
            } else {
                context.rotate(degree)
                context.fillStyle = "#51B49D";
                context.font = 20+"px serif";
                context.textBaseline = "middle";
                context.textAlign = 'left';
                context.fillText('测试数据'+i, 20, 0);
            }
            context.restore();
        }
    }

    
}


