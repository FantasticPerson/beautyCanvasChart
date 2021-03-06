/*
 * @Author: dandan.wu 
 * @Date: 2018-05-07 10:22:35 
 * @Last Modified by: dandan.wu
 * @Last Modified time: 2018-05-09 18:02:11
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

    var scale = width / 1300

    var centerX = canvasWidth/2;
    var centerY = canvasWidth/2+150 * scale;

    var a = 480*scale;
    var b = 210*scale;

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
            drawPoint(res[0],res[1],degree)
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
        context.strokeStyle = '#1a336a'
        context.scale(1,0.4)
        context.beginPath()
        context.arc(centerX,centerY,500*scale,0,Math.PI*2);
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
        
        x = Math.abs(500 * Math.cos(deg)*scale)
        y = Math.abs(500 * Math.sin(deg) * 0.4*scale)

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

    function drawPoint(x,y,degree){
        var deg = getDegree(degree)
        context.save();
        context.beginPath()
        if(deg >= Math.PI/2-gap/2 && deg <= Math.PI/2+gap/2){
            var gradient = context.createLinearGradient(centerX+x-20*scale,centerY*0.4+y-20*scale,centerX+x+20*scale,centerY*0.4+y+20*scale);
            gradient.addColorStop(0,"#f1c43c");
            gradient.addColorStop(1,"#e1a024");
            context.lineWidth=20*scale;
            context.strokeStyle = gradient;
            // context.strokeStyle = '#008AF8'
            context.arc(centerX+x,centerY*0.4+y,10*scale,0,Math.PI*2)
        } else {
            
            var gradient = context.createLinearGradient(centerX+x-14*scale,centerY*0.4+y-14*scale,centerX+x+14*scale,centerY*0.4+y+14*scale);
            gradient.addColorStop(0,"#009CFF");
            gradient.addColorStop(1,"#6DCA34");
            context.lineWidth=14*scale;
            context.strokeStyle = gradient;
            // context.strokeStyle = '#008AF8'
            context.arc(centerX+x,centerY*0.4+y,7*scale,0,Math.PI*2)
        }
        context.stroke();
        context.restore();
    }

    function drawLine(x,y){
        context.save()
        
        context.beginPath()
        var gradient = context.createLinearGradient(centerX+x,centerY*0.4+y,endPoint[0]+centerX,endPoint[1]+centerY);
        gradient.addColorStop(0,"#009CFF");
        gradient.addColorStop(1,"#6DCA34");
        // context.lineWidth=24;
        context.strokeStyle = gradient;
        // context.strokeStyle = '#008AF8'
        context.moveTo(centerX+x,centerY*0.4+y)
        context.lineTo(endPoint[0]+centerX,endPoint[1]+centerY)
        context.closePath()
        context.stroke()
        context.restore()
    }

    function drawText(x,y,degree,i){
        var deg = getDegree(degree)


        if(deg >= Math.PI/2-gap/2 && deg <= Math.PI/2+gap/2){
            drawTitle(i)
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

    function drawTitle(i){
        // console.log('stroke')

        context.save();
        context.fillStyle = "#ECBA1C";
        context.font = 40*scale+"px serif";
        context.textBaseline = "middle";
        context.textAlign = 'center';
        context.fillText('公安局'+i, centerX, centerY-460*scale);
        context.restore()



        context.save()
        context.fillStyle = 'rgba(236, 186, 28,0.3)'
        context.moveTo(centerX-100*scale,centerY-430*scale)
        context.rect(centerX-100*scale,centerY-430*scale,200*scale,80*scale)
        context.fill()
        context.restore()

        context.save()
        context.lineWidth = 2
        context.beginPath()
        context.strokeStyle = '#ECBA1C'
        context.moveTo(centerX-100*scale,centerY-430*scale)
        context.lineTo(centerX+100*scale,centerY-430*scale)
        context.closePath()
        context.stroke()

        context.beginPath()
        context.strokeStyle = '#ECBA1C'
        context.moveTo(centerX-100*scale,centerY-350*scale)
        context.lineTo(centerX+100*scale,centerY-350*scale)
        context.closePath()
        context.stroke()
        context.restore()

        context.save();
        context.fillStyle = "#FFF";
        context.font = 23*scale+"px serif";
        context.textBaseline = "middle";
        context.textAlign = 'center';
        context.fillText('共享目录', centerX-50*scale, centerY-405*scale);
        context.restore()

        context.save();
        context.fillStyle = "#ECBA1C";
        context.font = 20*scale+"px serif";
        context.textBaseline = "middle";
        context.textAlign = 'center';
        context.fillText('32', centerX-50*scale, centerY-375*scale);
        context.restore()

        context.save();
        context.fillStyle = "#FFF";
        context.font = 23*scale+"px serif";
        context.textBaseline = "middle";
        context.textAlign = 'center';
        context.fillText('共享数据', centerX+50*scale, centerY-405*scale);
        context.restore()

        context.save();
        context.fillStyle = "#ECBA1C";
        context.font = 20*scale+"px serif";
        context.textBaseline = "middle";
        context.textAlign = 'center';
        context.fillText('1243', centerX+50*scale, centerY-375*scale);
        context.restore()
    }
}


