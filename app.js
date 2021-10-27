const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d"); // 2d로 context 
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "#2c2c2c";//디폴트 색 선언
const CANVAS_SIZE = 700;//디폴트 캔버스 사이즈


canvas.width = CANVAS_SIZE; //canvas의 넓이 높이 지정
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"; //디폴트 배경색
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //캔버스에 기본 배경색 입히기
ctx.strokeStyle = INITIAL_COLOR; // 디폴트 선의 색깔
ctx.fillStyle = INITIAL_COLOR;// 디폴트 채우기의 색깔
ctx.lineWidth = 5; // 선의 굵기


let painting = false;
let filling = false;


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
    ctx.strokeStyle = color; //선 색을 선택한 색으로 변경
    ctx.fillStyle = color;// 채우기색을 선택한 색으로 변경
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){//만약 filling 상태라면
        filling = false;// fill상태를 해제하고 모드버튼에는 Fill를 출력
        mode.innerText = "Fill";
    }else{
        filling = true; // 상태를 filling으로 변경하고 모드버튼에는 Paint를 출력
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){ //현재 filling 상태이면 사각형 채우기
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){ //오른쪽 버튼 옵션창 안뜨게설정
    event.preventDefault();
}

function handleSaveClick(){ //save버튼 클릭시 동작
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🖌]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);

}


Array.from(colors).forEach(color =>
     color.addEventListener("click", handleColorClick)
     );


if(range){
    range.addEventListener("input", handleRangeChange);
}


if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}