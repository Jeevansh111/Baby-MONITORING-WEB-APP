song = "";
objects = [];
Status = "";
function preload(){
    song = loadSound("alert sound.wav");
}
function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: Detecting Objects";
}
function modelLoaded(){
    console.log("ModelLoaded");
    Status = true;
    
}
function gotResult(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}
function draw() {
    image(video,0,0,380, 380);
    if(Status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
    fill(r,g,b);
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent+ "%", objects[i].x +15, objects[i].y + 15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x, objects[i].y, objects[i].width. objects[i].height );
    if(objects[i].label=="person"){
        document.getElementById("number_of_objects").innerHTML="baby found";
        console.log("Stop");
        song.stop();

    }
    else{
        document.getElementById("number_of_objects").innerHTML = "baby not found";
        console.log("Play");
        song.play();
    }
    }
    if(objects.length ==0) {
        document.getElementById("number_of_objects").innerHTML = "baby not found";
        console.log("Play");
        song.play();
    }

}
   
}
