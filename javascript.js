document.addEventListener('DOMContentLoaded', () => {

// |||||||||||||||||||||||||||||||||||||||||||||||| -------- (GLOBAL) VARIABLES -------- ||||||||||||||||||||||||||||||||||||||||||||||||

// caching HTML references to shorten code
const grid = document.querySelector(".grid");
const player = document.querySelector('.player');
const menu = document.getElementById('menu');
const body = document.querySelector('body');
const heading = document.getElementById('heading');
const insts = document.getElementById("inst");
const gameOver = document.getElementById("gameOver");

// for background
const background1 = document.querySelector('.background1');
const background2 = document.querySelector('.background2');

// variables for background
let backgroundMoveSpeed = 0.08; // how fast the background scrolls --- milliseconds (ms)

// score system
const scoresHTML = document.querySelector('.scores');
const scoreHTML = document.getElementById('score');
const highScoreHTML = document.getElementById('highScore');

// score variables 
let highScore = localStorage.getItem('highScore');
let score = 0;
let scoreSpeed = 70; // how fast the score is added

// feeding background image to CSS via JS
player.style.backgroundImage = "url(player.png)";

// variables to help with game mechanic
let playerPosition = 21; //starting player's playerPosition 
let ground = playerPosition;
let isMenu = true; // Switch, starting off with true, to say menu is visible 
let isJumping = false; // Switch, starting off with false, to make jumping available only after player starts playing
let isGameOver = false; // Switch, starting off with false, for game over 
let mySound = new Audio("Jumping.mp3");
let gaovSound = new Audio("gameover.mp3");

// PLAYER MOVEMENT VARIABLES 
let frame = 1; // variable for frame counting
let jumpHeight = playerPosition;
let jumpTimeInterval = 20; // jump Speed (higher number means slower jump) --- milliseconds (ms)
let jumpSpeed = 2; // how much % per jumpTimeInterval --- pixels (px)
let downSpeed = 0.1;
let gravity = 2; // how geometric the jumps of the player will be
jumpHeight += 25; // how high the player can jump --- percentage (%)

let playerAnimationSpeed = 150; // how fast the player's running animation runs --- milliseconds (ms)

// variablkes for obstacle
let obstacleSpeed = 1.8; 



// |||||||||||||||||||||||||||||||||||||||||||||||| -------- INPUT CHECK -------- ||||||||||||||||||||||||||||||||||||||||||||||||

// Listening for Space Key
document.addEventListener('keydown', (e)=>{

    // if game is not over AND space is pressed ...
    if (!isGameOver && e.code === "Space"){  
        // ... call input function
        input();
        console.log("Touched");
    }
    // else is game is over AND space is pressed ...
    else if (isGameOver && e.code === "Space"){
        // ... then reload document
        location.reload();
    }
})

// Listening for tap on screen
document.addEventListener('touchstart', (e)=>{
    if(isGameOver) {
        location.reload();
    }
    else {
        input();
        console.log("Touched");
    }
})


// |||||||||||||||||||||||||||||||||||||||||||||||| -------- Menu Transitions -------- ||||||||||||||||||||||||||||||||||||||||||||||||

function menuTransitions(){

    console.log("Menu switched off.");

    // hide heading
    heading.style.visibility = "hidden";

    // hide instructions
    insts.style.visibility = "hidden";
}



// |||||||||||||||||||||||||||||||||||||||||||||||| -------- Main Game Logic -------- ||||||||||||||||||||||||||||||||||||||||||||||||

function input(e) {
    
    // At start isMenu is true. This is first time input is pressed
    if (isMenu)
    {
        isMenu = false; // isMenu boolean turned off
        menuTransitions(); // Hide Menu
        playerRun(); // start player's running loop
        console.log("Start");
        manageObstacles(); // call function to manage obstacles
        scrollBackground(); // call function to scroll background images
        addScore(); // calls score system function
    }

    // when menu is gone AND player is not already jumping (to prevent double-jumps)
    if (!isMenu && !isJumping && !isGameOver)
    {
            isJumping = true; // boolean tunred on
            jump(); // call jump function
            console.log("Jumping");
            
    }


}

// |||||||||||||||||||||||||||||||||||||||||||||||| -------- Player Animation -------- ||||||||||||||||||||||||||||||||||||||||||||||||


// Animating the player by inter-changing the background image on the div
function playerRun() {

    // possible approach to creating an animation loop via JS is using setInterval() to exchange background image at a set amount of time.
    // setInterval() takes two arguments: function and time in milliseconds to keep calling that that function at that rate (until  clearInterval() is called).
    // see also: https://www.w3schools.com/jsref/met_win_setinterval.asp

    setInterval(runningLoop, playerAnimationSpeed);

    function runningLoop()
    {
        console.log("Running");

        // if variable "frame" is 1 AND is not jumping AND is not game over ...
        if (frame === 1  && !isJumping && !isGameOver)
        {
            // ... use this background image ...
            player.style.backgroundImage = "url(player2.png)";
            // ... and change  variable "frame" to 2
            frame = 2;
        }

        // else if variable "frame" is 2 AND is not jumping AND is not game over ...
        else if (frame === 2  && !isJumping && !isGameOver)
        {
            // ... use this background image ...
            player.style.backgroundImage = "url(player1.png)";
            // ... and change  variable "frame" to 2
            frame = 1;
        }

        // else if game over
        else if (isGameOver)
        {
            player.style.backgroundImage = "url(player_dead.png)";
        }
    }

}


// |||||||||||||||||||||||||||||||||||||||||||||||| -------- Player Jump -------- ||||||||||||||||||||||||||||||||||||||||||||||||


function jump() 
{

  let timer = setInterval( function() // starting interval for jump
  {
    // if game over ...
    if (isGameOver) 
    {   // then stop jumping
        clearInterval(timer);
    }

    if(playerPosition > ground)
    {
        mySound.play();
    }

    console.log("UP");

    // ---- Player Going Up ---- //

    // 1. changing background image
    player.style.backgroundImage = "url(player-jump.png)"; 
    
    // 2. calculating jumping up       
    jumpSpeed = 1
    playerPosition += jumpSpeed;
    jumpSpeed = jumpSpeed * gravity;
    if (jumpSpeed <= 0.17 ) { jumpSpeed = 0.2;}

    // 3. feeding new position to CSS
    player.style.bottom = playerPosition + '%';

            // if jumping player reacher max height...
            if (playerPosition >=  jumpHeight) { 
                
                console.log("DOWN");

                clearInterval(timer); // stop jumping up interval
                
                let downTimer = setInterval ( function() { // start falling down interval
                    
                    // calculating falling motion
                    playerPosition -= downSpeed;
                    downSpeed = downSpeed + (downSpeed*0.08);

                    // feeding calculated result to CSS
                    player.style.bottom = playerPosition  + '%';

                    // changing background image
                    player.style.backgroundImage = "url(player-land.png)" // Replace the player going up sprite with player landing sprite

                    // if player reaches ground variable ...
                    if (playerPosition <= ground) 
                    {     
                        console.log("Ground");

                        clearInterval(downTimer); //stop falling down interval

                        // reset variables
                        jumpSpeed = 1;
                        downSpeed = 0.3;
                        isJumping = false;
                        playerPosition = ground;
                        player.style.bottom = playerPosition  + '%';
                    }
                }, jumpTimeInterval)
            }   
    }, jumpTimeInterval)
}


// |||||||||||||||||||||||||||||||||||||||||||||||| -------- OBSTACLES -------- ||||||||||||||||||||||||||||||||||||||||||||||||

// manage obstacles
function manageObstacles()
{ 
    // Obstacles should be called randomly
    randomCall();
}

//||| -------- RANDOM OBSTACLE CALL -------- |

// variable for random time
var randomTime; 

// function for generating randum number for random time
 function changeTime(){
    // assigning random number within certain minimum and maximum range
    randomTime = Math.floor(Math.random() * (3000 - 1000) + 1000); // generates number between and including 1000 and 5000
 }

// function for randomly calling
 function randomCall(){
    
    // print debug message
    console.log("RANDOM CALL at " + randomTime + " milliseconds"); 
    
    // call function to generate random number within range
    changeTime();

    // setTimeout calls a function once after a certain time (in milliseconds) passed 
    setTimeout(randomCall, randomTime); // call this very function after time passed = random number within certain range

    // call function to generate obstacle
    generateObstacle(); 
 }

//||| -------- GENERATE AND MOVE OBSTACLE -------- |

// generate obstacles
function generateObstacle() 
{
    console.log("OBSTACLE CREATION");

    // Initialize variable for X value of obstacle position 
    let obstacleXPosition = 1920;

    // Create Obstacle
    const obstacle = document.createElement('div'); // Create a div HTML element

    // only if game is not over add "obstacle" from CSS to created div 
    if (!isGameOver) {obstacle.classList.add('obstacle');}

    grid.appendChild(obstacle); // add obstacle div to "grid" HTML element
    obstacle.style.left = obstacleXPosition + "px"; // assign above position variable to CSS left property

    // Move Obstacle
   let moveObstacle = setInterval(() => // create interval ...
   {
       // ||| -------- MOVE -------- |||
       
       if(!isGameOver)// only if game is not over ...
       {
            // ... move obstacle 
            // take variable for obstacle position and add/substract value ... (which loops due to being inside an interval)  
            obstacleXPosition -= obstacleSpeed;
            // assign new position to CSS property 
            obstacle.style.left = obstacleXPosition + 'px';
       }

       // ||| -------- DELETE WHEN OFF SCREEN -------- |||
        // if obstacles leaves screen then delete it
        if (obstacleXPosition <= -50) // if the obstacle has moved off-screen (its posistion reaching a certain value)
        {   
            // then delete it by ...
            obstacle.classList.remove('obstacle'); // remove the class attribute from the div of the current obstacle
            try{grid.removeChild(obstacle)} // remove the child (div) of the obstacle.
            catch(error){} // handles the problem of the above trying to keep deleting because this is running inside interval
        }

        // ||| -------- DETECT COLLISION WITH PLAYER -------- |||
        // if obstacle position comes within a certain range ....
        if (obstacleXPosition > 5 && obstacleXPosition < 50 && playerPosition < 25) 
        {     
            // then ...
            gaovSound.play();
            console.log("Collision!"); // send message to console
            clearInterval(moveObstacle); // stop obstacle from moving
            GameOver();// call GameOver function
        }

   }, 1); // end of interval
       
}

// |||||||||||||||||||||||||||||||||||||||||||||||| -------- BACKGROUND -------- ||||||||||||||||||||||||||||||||||||||||||||||||

function scrollBackground(){
    // Two divs are used to create infinite scroll:
    // Both divs are 100% of the width of the screen. 
    // One of them is positioned 0% from the left, the other is positioned 100% from the left.
    // The latter is off screen. 
    // Both divs are then moved at the same speed
    // When one of them reaches -99% from left side of the screen,
    // that div is resetted to 100% from left. 
    // Giving each div's starting position, this creates a perfect infinite scrolling background.

    let background1Pos = 0; // variable for starting position of first background div
    let background2Pos = 100; // variable for starting position of first background div

    // create function that fires at a certain interval ...
    setInterval(() => {
        // if game is not over ...
        if (!isGameOver){

            //|| -------- MOVE BACKGROUND divs -------- |||

            // change variable for first background div position by substrating with a globale variable 
            background1Pos = background1Pos - backgroundMoveSpeed;
            // send result to CSS 
            background1.style.left = background1Pos + '%';

            // change variable for second background div position by substrating with a globale variable 
            background2Pos = background2Pos - backgroundMoveSpeed;
            // send result to CSS 
            background2.style.left = background2Pos + '%';
        }

        //|| -------- RESET BACKGROUND divs -------- |||

        // Reset background position if they go off screen

        // if first background moves beyond certain value ... 
        if (background1Pos <= -99) 
        {   // ... then reset it
            background1Pos = 100; 
        }

        // if second background moves beyond certain value ... 
        if (background2Pos <= -99) 
        {   // ... then reset it
            background2Pos = 100; 
        }

    }, 1); // end of interval

}

// |||||||||||||||||||||||||||||||||||||||||||||||| -------- SCORE SYSTEM-------- ||||||||||||||||||||||||||||||||||||||||||||||||

// Add score on a set interval
function addScore() {
   
   // do at certain interval ...
    setInterval( () => {

        // if game is not over ...
        if (!isGameOver) 
        {
            score += 1; // add value to score

            // if score is higher than highscore ...
            if (score > highScore) 
            {   // .. . then update highscore
                highScore = score; 
            }

            // write "score" to HTML element
            scoreHTML.innerHTML =  score;

            // write "High Score: " to HTML element and add highscore variable
            highScoreHTML.innerHTML = "High Score: " + highScore;
            
            // if score value can be divided by 1000 without leaving remainder = is a clean multiple of 1000 (using remainder operator %)
            if (score%1000 == 0) { // Increase difficulty and score rate at every 1000 score interval

                // make background moving speed faster
                backgroundMoveSpeed += 0.01;
                // make obstacle moving speed faster
                obstacleSpeed += 0.3;
            }
        }

        // if game is over ...
        if (isGameOver) {
            // ... then store high score in local storage
            localStorage.setItem("highScore", highScore);
        }
    }, scoreSpeed); // at rate of global variable
}

// |||||||||||||||||||||||||||||||||||||||||||||||| -------- GAME OVER -------- ||||||||||||||||||||||||||||||||||||||||||||||||

function GameOver() // function for stuff happing when game over
 {          

            gameOver.style.visibility = "visible"; // call HTML element to change CSS property "visibility" to visible
            body.style.backgroundColor = "rgb(50, 50, 50)"; // change background color 
            isGameOver = true; // change boolean variable
 }


// ---- END OF JAVASCRIPT ---- //
})