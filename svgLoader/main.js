let svgLoader;

function preload(){
}

function setup(){
}

function draw(){
}

function keyPressed(){
    let array = svgLoader.getArray();
    let svgSize = svgLoader.getViewSize();
    let circlesLength = svgLoader.getLength();
    let circleElement = svgLoader.getCircleElement(1);//1つ目のcircleの情報だけとり出す
    console.log(array);
    console.log(svgSize);
    console.log(circlesLength);
    console.log(circleElement);
}


function readFile(Id){
    console.log("アップロード成功");
    const files = document.getElementById(Id);
    const file = files.files[0];
    svgLoader = new SvgLoader(file, CENTER);
}