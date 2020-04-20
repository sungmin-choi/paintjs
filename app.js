const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle ="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.lineWidth = 5;


let painting = false;

let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseDown(event){
    painting= true;
} 

function onMouseMove(event){
const x = event.offsetX;
const y = event.offsetY;
if(!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
}
else{
    ctx.lineTo(x,y);
    ctx.stroke();
}

}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth=size;

}


function changeColor(event){
   const color = event.target.style.backgroundColor;
   ctx.strokeStyle = color;
   ctx.fillStyle = color;
}
function handleModeClick(){
  if(filling === true){
      filling = false;
      mode.innerText = "Fill";
  }else{
      filling = true;
      mode.innerText="paint";
      
  }
}

function handleCanvasClick() {
    if(filling){ ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);}
   
}

function handleCM(event){
    event.pre

}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link =document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click",changeColor));


if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}
if(save){
    save.addEventListener("click", handleSaveClick);
}
