import { Bullet } from './bullet.js'
import { Game } from './game.js'
import { InputManager } from './input.js'
import { Player } from './player.js'
import { Rock } from './rock.js'

// Game canvas setup
const canvas = document.getElementById('gameCanvas')
canvas.width = window.innerWidth * 0.9
canvas.height = window.innerHeight - 150
canvas.style.margin = 'auto'

// Initialize game components
const game = new Game(canvas)
const inputManager = new InputManager()
const player = new Player(canvas.width / 2, canvas.height / 2)
let bullets = []
let lastShootTime = 0
const shootCooldown = 250 // milliseconds between shots

let rocks = []
//Add four rocks
for (let i = 0; i < 4; i++) {
	rocks.push(new Rock(canvas.width / 2, canvas.height / 2, Math.random() * 2))
}

// Main game loop
function gameLoop() {
  if (!game.running) return

  // Update delta time
  game.updateDeltaTime()

  // Clear canvas
  game.clearCanvas()

  // Update and draw player
  player.update(inputManager.getKeys(), game.getDeltaTime())
  player.wrapAround(game.width, game.height)
  player.draw(game.getContext())

  // Shooting
  const currentTime = performance.now()
  const canShoot = currentTime - lastShootTime > shootCooldown
  if (inputManager.isKeyPressed(' ') && canShoot) {
    bullets.push(new Bullet(player.x, player.y, player.angle))
    lastShootTime = currentTime
  }

  // Update and draw bullets
  bullets = bullets.filter((bullet) => {
    bullet.update(game.getDeltaTime())
    bullet.draw(game.getContext())

    // Remove bullets that are off screen
    return !bullet.isOffScreen(game.width, game.height)
  })
  
  //Move and draw all rocks
  rocks.filter((rock) => {
	  rock.update(game.getDeltaTime())
	  rock.draw(game.getContext())
	  rock.wrapAround(game.width, game.height)
  })

  game.updateUI()

  // Continue the game loop
  requestAnimationFrame(gameLoop)
}

// Start the game
gameLoop()
