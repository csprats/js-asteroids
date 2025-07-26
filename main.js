// Game canvas and context
const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

// Game state
const game = {
  width: canvas.width,
  height: canvas.height,
  score: 0,
  lives: 3,
  running: true,
  deltaTime: 0,
}

// Player ship
const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10, // Width of the ship
  angle: 0,
  rotation: 0,
  thrust: 0,
  maxThrust: 0.5,
  rotationSpeed: 0.5,
  friction: 0.98,
  velocity: { x: 0, y: 0 },
}

// Input handling
const keys = {}

document.addEventListener('keydown', (e) => {
  keys[e.key] = true
})

document.addEventListener('keyup', (e) => {
  keys[e.key] = false
})

// Update player based on input
function updatePlayer() {
  // Rotation
  if (keys['ArrowLeft'] || keys['a']) {
    player.rotation = -player.rotationSpeed * game.deltaTime
  } else if (keys['ArrowRight'] || keys['d']) {
    player.rotation = player.rotationSpeed * game.deltaTime
  } else {
    player.rotation = 0
  }

  player.angle += player.rotation * game.deltaTime

  // Thrust
  if (keys['ArrowUp'] || keys['w']) {
    player.thrust = Math.min(
      player.thrust + 0.1 * game.deltaTime,
      player.maxThrust
    )
  } else {
    player.thrust = 0
  }

  // Apply thrust to velocity
  if (player.thrust > 0) {
    player.velocity.x += Math.cos(player.angle) * player.thrust * game.deltaTime
    player.velocity.y += Math.sin(player.angle) * player.thrust * game.deltaTime
  }

  // Apply friction
  // player.velocity.x *= Math.pow(player.friction, game.deltaTime);
  // player.velocity.y *= Math.pow(player.friction, game.deltaTime);

  // Update position
  player.x += player.velocity.x * game.deltaTime
  player.y += player.velocity.y * game.deltaTime

  // Wrap around screen
  if (player.x < 0) player.x = game.width
  if (player.x > game.width) player.x = 0
  if (player.y < 0) player.y = game.height
  if (player.y > game.height) player.y = 0
}

// Draw player ship
function drawPlayer() {
  ctx.save()
  ctx.translate(player.x, player.y)
  ctx.rotate(player.angle)

  // Draw ship triangle
  ctx.beginPath()
  ctx.moveTo(player.radius, 0)
  ctx.lineTo(-player.radius, -player.radius / 2)
  ctx.lineTo(-player.radius, player.radius / 2)
  ctx.closePath()

  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2
  ctx.stroke()

  // Draw thrust flame
  if (player.thrust > 0) {
    ctx.beginPath()
    ctx.moveTo(-player.radius, 0)
    ctx.lineTo(-player.radius - 10, -5)
    ctx.lineTo(-player.radius - 15, 0)
    ctx.lineTo(-player.radius - 10, 5)
    ctx.closePath()

    ctx.fillStyle = '#ff6b35'
    ctx.fill()
  }

  ctx.restore()
}

// Clear canvas
function clearCanvas() {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, game.width, game.height)
}

// Update UI
function updateUI() {
  document.getElementById('score').textContent = game.score
  document.getElementById('lives').textContent = game.lives
}

// Main game loop
function gameLoop() {
  if (!game.running) return

  const loopStartTime = performance.now()

  clearCanvas()
  updatePlayer()
  drawPlayer()
  updateUI()

  // Calculate and log execution time
  const loopEndTime = performance.now()
  const executionTime = loopEndTime - loopStartTime
  game.deltaTime = executionTime

  // This function calls gameLoop again, creating a loop that runs as fast as the browser can handle it.
  requestAnimationFrame(gameLoop)
}

// Start the game
gameLoop()
