

var cart = document.getElementById("cart");
var start = document.getElementById("start");
var timer = document.getElementById("timer");
var gift = document.getElementById("gift");
var chimney =document.getElementById("chimney");

var scoreshow = document.getElementById("score");
var bgAudio = document.getElementById("bgAudio");
var threeSecAudio = document.getElementById("threeSecAudio");

var score = 1;
start.onclick = startgame;

var droping;
function drop() {
    let position = 30;
    let speed = 5;

    droping = setInterval(() => {
        position += speed;
        gift.style.top = position + "px";


        if (position==210 && (Math.abs(chimney.offsetLeft - gift.offsetLeft+30) <=15)) 
        {
             score+=10;
             updateScore();
           
            newlocation();
        }

        if (position >= 220) {
            gift.style.visibility = "hidden";
            clearInterval(droping);
        }

    }, 10);
}
function updateScore() {
    scoreshow.innerHTML = "Goals : " + score;
// Check if current score exceeds highest score
    if (score > highscore) {
        scoreshow.style.color = "green"; 
    } else {
        scoreshow.style.color = "crimson";
    }
}

var prev=0;
function newlocation()
{
    var x=Math.random()*1000;
    x=x+(x%15);
    if(Math.abs(x-prev)<=75 || x>870)
    {
        newlocation();
    }
    else
    {
        chimney.style.left=x+"px";
        prev=x;
    }

}


//-------------------------------------start-----------------------------
var first = true;
var timerstarted;

function startgame() {
    bgAudio.play();

    if (first) {
        first = false;
        cart.style.visibility = "visible";
        chimney.style.visibility= "visible";

        newlocation();


        start.innerHTML = "Restart";
        scoreshow.innerHTML = "Goals : 0";
       

        score = 0;
        setTimer();

    }
    else {
        start.innerHTML = "Restart";
        scoreshow.innerHTML = "Goals : 0";
        
        newlocation();


        score = 0;
        cart.src = "/game/images/santa_cart_right.png";
        cart.style.left = 0 + "px";
        clearInterval(timerstarted);
        timer.innerHTML = "02:00";
        setTimer();

    }


    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.Event;

        if (e.keyCode == 37 && timer.innerHTML != "Time Up!!") {
            moveLeft();
        }

        else if (e.keyCode == 39 && timer.innerHTML != "Time Up!!") {
            moveRight();
        }
        else if (e.keyCode == 40 && timer.innerHTML != "Time Up!!") {

            dropGift();
        }
    }


    function moveLeft() {
        var left = cart.offsetLeft;
        var new_left = left - 15;
        if (left >= 1) {
            cart.src = "/game/images/santa_cart_left.png";
            cart.style.left = new_left + "px";
        }
        else {

            cart.style.left = 880 + "px";
        }
    }

    function moveRight() {
        var left = cart.offsetLeft;
        var new_left = left + 15;
        if (left <= 890) {
            cart.src = "/game/images/santa_cart_right.png";
            cart.style.left = new_left + "px";
        }
        else {

            cart.style.left = 0 + "px";
        }
    }


    function dropGift() {
        clearInterval(droping);
        var left = cart.offsetLeft;
        gift.style.visibility = "visible";
        gift.style.left = left + 15 + "px";
        drop();

    }


}





// -----------------------------------------------------Timer----------------------------------------- 
function setTimer() {
    var minute = 1;
    var second = 60;

    timerstarted = setInterval(() => {
        if (minute == 0 && second == 4) {
            threeSecAudio.play(); // Play warning sound at 3 seconds left
        }

        if (minute == 0 && second == 1) {
            timer.innerHTML = "Time Up!!";
            scoreshow.style.color = "green";
            start.innerHTML = "Play Again";
            clearInterval(timerstarted);
            updateHighScore();
            bgAudio.pause();
        }
        else {
            second--;

            if (second == 0) {
                minute--;
                second = 60;
            }

            if (minute == 0) {
                minute = minute;
            }

            timer.innerHTML ="0"+minute + ':' + second;

        }

    }, 1000);
}
var highscore = localStorage.getItem("highscore") || 0;
document.getElementById("highscore").innerHTML = "Highest Score: " + highscore;

function updateHighScore() {
    if (score > highscore) {
        highscore = score;
        localStorage.setItem("highscore", highscore);
        document.getElementById("highscore").innerHTML = "Highest Score: " + highscore;
    }
}



