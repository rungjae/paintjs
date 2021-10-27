const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d"); // 2d로 context 
const colors = document.querySelector(".jsColor");


canvas.width = 700; //canvas의 넓이 높이 지정
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; // 선의 색깔
ctx.lineWidth = 2.5; // 선의 굵기


let painting = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
    }

function onMouseMove(event){ // 마우스를 움직이는 내내 발생
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();// 클릭하지않고 마우스를 움직였을때 path(선)를 시작
        ctx.moveTo(x, y);//(x,y)좌표로 path(선)을 이동. 마우스가 움직이는 모든순간에 path생성
    } else{
        ctx.lineTo(x, y);//path의 이전위치에서 현재위치까지
        ctx.stroke();//  선을 만들어줌
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    console.log(color);
   // ctx.strokeStyle = color;

}



if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    
}


Array.from(colors).forEach(color =>
     color.addEventListener("click", handleColorClick)
     );