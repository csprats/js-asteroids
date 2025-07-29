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
let player = new Player(canvas.width / 2, canvas.height / 1.5)
let bullets = []
let lastShootTime = 0
const shootCooldown = 250 // milliseconds between shots

export let rocks = []
//Add rocks

//Up
rocks.push(new Rock(game.width - 25, game.height / 4, Math.random() * 100, 25))
rocks.push(new Rock(25, game.height / 4, Math.random() * 100, 25))
rocks.push(new Rock(game.width / 2 - 25, game.height / 4, Math.random() * 100, 25))
rocks.push(new Rock(game.width / 2 + 25, game.height / 4, Math.random() * 100, 25))
//Down
rocks.push(new Rock(game.width - 25, game.height, Math.random() * 100, 25))
rocks.push(new Rock(25, game.height, Math.random() * 100, 25))
rocks.push(new Rock(game.width / 2 - 25, game.height, Math.random() * 100, 25))
rocks.push(new Rock(game.width / 2 + 25, game.height, Math.random() * 100, 25))


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

	//Destroy rocks with bullets and player whit rocks
	const addedRocks = []
	
	rocks = rocks.filter((rock) => {
		let collide = true
		//Destroy player
		if (detectCollision(player, rock)) {
			game.lives--
			player = new Player(canvas.width / 2, canvas.height / 2)
		}
		bullets = bullets.filter((bullet) => {
			//If the bullet touch the rock, destroy it
			if (detectCollision(rock, bullet)) {
				collide = false
				if (rock.radius == 25) {
					addedRocks.push(new Rock(rock.x + 5, rock.y, rock.angle, 12.5))
					addedRocks.push(new Rock(rock.x - 5, rock.y, -rock.angle, 12.5))
				}
				else {
					addedRocks.push(new Rock(game.width, game.height, rock.angle, 25))
				}
				game.score += 10
				return false
			}
			else {
				return true
			}
		
		})
		return collide
	})
	addedRocks.filter((rock) => {
		rocks.push(rock)
	})
  
  //Update game UI
  game.updateUI()

  // Continue the game loop
  requestAnimationFrame(gameLoop)
}


function detectCollision(c1, c2) {
	const dx = c1.x - c2.x
	const dy = c1.y - c2.y
			
	const distance = (dx * dx) + (dy * dy)
			
	const sumRadius = c1.radius + c2.radius
			
	const sumRadiusSquared = sumRadius * sumRadius
	return distance <= sumRadiusSquared
}
// Start the game
gameLoop()
