//Button-Init
for (let i=0; i< $("button").length; i++){
    var btnColor = $("button")[i].className;
    $("button")[i].style.backgroundColor = btnColor;  
    $("button")[i].addEventListener("click", 
        function (){
            var btnColor = $("button")[i].className;
            var btnAudio = new Audio("sounds/"+btnColor+".mp3");
            btnAudio.play();
            $("button")[i].setAttribute("id", "pressed");
            setTimeout(function (){$("button")[i].setAttribute("id", "")}, 100);
        }
    );
};

document.addEventListener("keydown", start);


function startGame(){
    var colorSequ = [];
    var userClicks = 0;
    var onPlay= 0;

    onPlay= 1;
    $("h2").text("Game has started");

    sequence_mod();
    playSequence();

    
    $("button").on("click", 
        function(event){
            pressedBtn = event.currentTarget.className;
            console.log(pressedBtn+" has been pressed.");
            console.log("User clicks:"+userClicks)
            
            if (pressedBtn!=colorSequ[userClicks]){
                $("h2").text("You loose");
                colorSequ = [];
                userClicks = 0;
                onPlay=0;
            } else if (userClicks+1===colorSequ.length){
                userClicks = 0;
                setTimeout(function (){
                    sequence_mod();
                    playSequence();
                },1000)

            } else{userClicks++;}
        }
    );
}

function sequence_mod(){
    rndNum = Math.floor(Math.random()*4); //Random integer between 0 and 3
    colorName = $("button")[rndNum].className;
    colorSequ.push(colorName);
}

function playSequence(){
    var seqLen = colorSequ.length;
    var btnAudio = new Audio();
    var index = 0;

    playNext();
    btnAudio.addEventListener("ended",playNext);

    function playNext(){
        if (index<seqLen){
            color = colorSequ[index];
            btnAudio.src = "sounds/"+color+".mp3"; 
            btnAudio.play();
            index++;
            console.log(color+" should be pressed.");
            $("."+color).attr("id", "pressed");
            setTimeout(function (){$("."+color).attr("id", "")}, 100);
        }
    }
}
function start(){
    if (!onPlay){startGame()}
}