import { Game } from './game.js'
import { InputManager } from './input.js'
import { Player } from './player.js'
import {Bullet} from './bullet.js'

// Game canvas setup
const canvas = document.getElementById('gameCanvas')
canvas.width = window.innerWidth * 0.9
canvas.height = window.innerHeight - 150
canvas.style.margin = 'auto'

// Initialize game components
const game = new Game(canvas)
const inputManager = new InputManager()
const player = new Player(canvas.width / 2, canvas.height / 2)
let bullet = new Bullet(player.x, player.y, player.angle, 500)
let shoot = false
// Main game loop
function gameLoop() {
  if (!game.running) return

  // Update delta time
  game.updateDeltaTime()

  // Clear canvas
  game.clearCanvas()

  // Update game objects
  player.update(inputManager.getKeys(), game.getDeltaTime())
  player.wrapAround(game.width, game.height)

  // Draw game objects
  player.draw(game.getContext())
  game.updateUI()
  
  //Bullet
  if (inputManager.isKeyPressed(' ') || bullet.active) {
	//If is not active, create a new one
	if (!bullet.active) {
		bullet = new Bullet(player.x, player.y, player.angle, 500)
	}
	//Active it
	bullet.active = true
	//Move and draw
	bullet.update(game.getDeltaTime(), player.x, player.y)
	bullet.draw(game.getContext())
	
	//Check for border collision and if it returns true, disable it
	if (bullet.borderCollision(game.width, game.height)) {
		bullet.active = false
	}
  }
  
  // Continue the game loop
  requestAnimationFrame(gameLoop)
}

// Start the game
gameLoop()
