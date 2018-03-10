// UI Variables
var canvas;
var gameScreen;
var scoreDisplay;

// Game Variables
var gameRunning;
var shipShooting;
var alienShooting;
var score;

// Ship Variables
var shipDiameter;
var shipX;
var shipY;
var shipSpeed;
var shipColor;

// Bullet Variables
var bulletDiameter;
var bulletX;
var bulletY;
var bulletSpeed;

// Alien Variables
var alienDiameter;
var alienX;
var alienY;
var alienVelocity;

// Alien Bullet Variables
var alienBulletDiameter;
var alienBulletX;
var alienBulletY;



function setup(){
	 canvas= createCanvas(500,400);
	 gameScreen= select("#GameScreen");
	canvas.parent(gameScreen);
	shipColor= fill(255,0,0);
	shipDiameter=30;
	shipSpeed=10;
	shipX= 250;
	shipY=385;
	bulletDiameter=5;
	shipShooting=false;
	alienDiameter=45;
	alienVelocity=10;
	alienX=45/2;
	alienY=45/2;
	alienBulletDiameter=15;
	alienShooting=false;
}
  


function gameOver(){
	alert("Game Over");
}
 /* This function stops the game from running and shows an alert telling the
 * player what their final score is. Finally it resets the game by calling
 * resetGame()
 */


/*
 * resetGame()
 * This function "resets the game" by initializing ship, alien, and game
 * variables. */

function draw(){
	background(0);
	drawShip();
drawBullet();
drawAlien();
if(alienShooting==true){
	drawAlienBullet();
}
}

 /* This function animates the ship, alien, and both kinds of bullets, but only
 * if the game is running.
 */


 function drawShip(){

 	 fill(255,0,0);
 	ellipse(shipX,shipY,shipDiameter,shipDiameter);
 	if(keyIsDown(LEFT_ARROW)){
 		shipX=shipX-shipSpeed;
 	}
 	else if(keyIsDown(RIGHT_ARROW)){
shipX=shipX+shipSpeed;
 	}
 	if(shipX<=15){
 		shipX=15;
 	}
 	else if(shipX>=485){
 		shipX=485;
 	}
}
 /* This function draws the player's ship. It also controls the ship's
 *x value by checking if the player is holding down the left or right keys.
*/

 function keyPressed(){
 	if(keyCode===32 && shipShooting==false){
 		bulletX=shipX;
 		bulletY=shipY;
 		shipShooting=true;
 	}
 }
 
 /* This function runs automatically when the player presses the spacebar
 * (keyCode === 32). If they do, and a bullet is not currently being fired
 * ("shipShooting" variable is false), it positions the bullet relative to the
 * ship. Then it sets the "shipShooting" variable to "true", indicating a ship
 * bullet is currently being fired.
 */


function drawBullet(){
	fill(255);
	ellipse(bulletX,bulletY,bulletDiameter,bulletDiameter);
	bulletY-=20;
	if(bulletY<=0){
		shipShooting=false;
	}
	var hitAlien=checkCollision(alienX,alienY,alienDiameter,bulletX,bulletY,bulletDiameter);
	if(bulletY>0 && !hitAlien){
	}
	else if(hitAlien){
resetAlien();
alienVelocity++;
shipShooting=false;
	}
	else{
		shipShooting=false;
	}
}
 /* This function draws a bullet. It also checks to see if the bullet has hit
 * the alien. If it has, the alien is reset to the top-left of the screen
 * and the player earns a point. The alien aslo becomes faster (i.e., harder
 * to hit) each time it is hit by a bullet.
 */



 function drawAlien(){
 	fill(0,255,0);
 	ellipse(alienX,alienY,alienDiameter,alienDiameter);
 	alienX=alienX+alienVelocity;
 	if(alienX>=500){
 	alienVelocity=-10;
 	}
 	if(alienX<=0){
 		alienVelocity=10;
 	}
 	if(random(4)<1&& !alienShooting){
alienBulletX=alienX;
alienBulletY=alienY;
alienShooting=true;
 	}

 }
 /* This function draws an alien. It also checks to see if the alien has touched
 * the player's ship. If it has, the function calls gameOver().
 */



 function drawAlienBullet(){
 	var hitShip=checkCollision(shipX,shipY,shipDiameter,alienBulletX,alienBulletY,alienBulletDiameter);
	fill(255);
	if(alienBulletY<=400 && hitShip== false){
		ellipse(alienBulletX,alienBulletY,alienBulletDiameter,alienBulletDiameter);
		alienBulletY=alienBulletY+10;
	}
	else{
		alienShooting=false;
	}
	if(hitShip==true){
		gameOver();
	}
}
 
 /* This function behaves much like drawBullet(), only it fires from the alien
 * and not the player's ship. If the bullet hits the player, it's game over.
 */



 function resetAlien(){
 	alienX=45/2;
	alienY=45/2;
	alienVelocity=abs(alienVelocity);
 }
 /* This function sets the alien to its original position at the top-left of
 * the screen. It also sets its velocity to its absolute value (so, if the
 * velocity was negative when it died, it becomes positive upon reset, making
 * it always start by moving to the right).
 */



 function checkCollision(aX, aY, aD, bX, bY, bD){
 	var distance = dist(aX,aY,bX,bY)

 	if( distance <= aD/2+bD/2){
return true
 	}
 	else{
 		return false
 	}
 }
 /* This function first calculates the distance between two circles based on
 * their X and Y values. Based on the distance value, the function returns
 * "true" if the circles are touching, and false otherwise.
 * Circles are considered touching if
 * (distance <= (circle1Diameter + circle2Diameter) / 2)
 */
