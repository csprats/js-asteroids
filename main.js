import { Game } from './game.js'
import { InputManager } from './input.js'
import { Player } from './player.js'

// Game canvas setup
const canvas = document.getElementById('gameCanvas')
canvas.width = window.innerWidth * 0.9
canvas.height = window.innerHeight - 150
canvas.style.margin = 'auto'

// Initialize game components
const game = new Game(canvas)
const inputManager = new InputManager()
const player = new Player(canvas.width / 2, canvas.height / 2)

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

  // Continue the game loop
  requestAnimationFrame(gameLoop)
}

// Start the game
gameLoop()
