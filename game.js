import { update as updateSnake, draw as drawSnake,  SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from '/grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')


function main(currentTime) {
if (gameOver) {
   if (confirm('You lost. Press ok to restart' )) {
       window.location ='/' // restarts the game also refreshes the page
   }
   return
}

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if  (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    
    
    console.log('render')
    lastRenderTime = currentTime

    update() // loop that updates the game if the snake ate the food or ran in to him self  
    draw() // takes the logic from update where to put the food
}

window.requestAnimationFrame(main)

function update() {
    updateSnake() // updates thesnake and food
    updateFood() // updates the snake and food
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = '' // this allows
    drawSnake(gameBoard) // draws the snake
    drawFood(gameBoard) // draws the food
     
} 


function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()  // if the snake intersects it self or goes in the wall
}