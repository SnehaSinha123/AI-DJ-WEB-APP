 song1="";
 song2="";
 song1_status="";
 song2_status="";
 scorerightWrist=0;
 scoreleftWrist=0;
 rightWristx=0;
 rightWristy=0;
 leftWristx=0;
 leftWristy=0;

 function preload(){
     song1=loadSound("Harry Potter Theme.mp3");
     song2=loadSound("Peterpan.mp3");
 }


function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet= ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scorerightWrist=results[0].pose.keypoints[10].score;
        scoreleftWrist=results[0].pose.keypoints[9].score;
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;

        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
    }
}

function draw(){
    image(video, 0, 0, 600, 500 );
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("red");
    stroke("red");

    if(scorerightWrist > 0.2){
        circle(rightWristx,rightWristy,20);
        song2.stop();

        if(song1_status==false){
            song1.play();
            document.getElementById("Song").innerHTML="Playing Harry Potter Theme Song"
        }
    }

    if(scoreleftWrist > 0.2){
        circle(leftWristx,leftWristy,20);
        song1.stop();

        if(song2_status==false){
            song2.play();
            document.getElementById("Song").innerHTML="Playing Peter Pan Song Theme Song"
        }
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


