song="";
scoreRightWrist=0;
scoreLeftWrist=0;

rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length>0)
    {
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
    }

}

function draw(){
image(video,0,0,600,500);

fill();
stroke();
if(scoreRightWrist>0.2)
{
    circle(rightWristX,rightWristY,20);

    if(rightWristY>0 && rightWristX<=100)
    {
        document.getElementById("speed").innerHTML="Spped=0.5x"
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristX<=200)
    {
        document.getElementById("speed").innerHTML="Spped=1x"
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristX<=300)
    {
        document.getElementById("speed").innerHTML="Spped=1.5x"
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristX<=400)
    {
        document.getElementById("speed").innerHTML="Spped=2x"
        song.rate(2);
    }
    else if(rightWristY>400)
    {
        document.getElementById("speed").innerHTML="Speed=2.5x";
        song.rate(2.5);
    }
}

if(scoreLeftWrist>0.2)
{
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume="+volume;
    song.setVolume(volume);
}
}

function preload()
{
    song=loadSound("song.mp3");
}

function play()
    {
        song.play(1)
        song.setVolume(1);
        song.rate(1);
    }
