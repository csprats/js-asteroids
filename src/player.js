// Player ship class
export class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.radius = 10
    this.angle = 0
    this.rotation = 0
    this.rotationSpeed = 5
    this.thrust = 0
    this.maxThrust = 200
    this.velocity = { x: 0, y: 0 }
    this.friction = 0.7
  }

  update(keys, deltaTime) {
    // Rotation
    if (keys['ArrowLeft'] || keys['a']) {
      this.rotation = -this.rotationSpeed
    } else if (keys['ArrowRight'] || keys['d']) {
      this.rotation = this.rotationSpeed
    } else {
      this.rotation = 0
    }

    this.angle += this.rotation * deltaTime

    // Thrust
    if (keys['ArrowUp'] || keys['w']) {
      this.thrust = this.maxThrust
    } else {
      this.thrust = 0
    }

    // Apply thrust to velocity
    if (this.thrust > 0) {
      this.velocity.x += Math.cos(this.angle) * this.thrust * deltaTime
      this.velocity.y += Math.sin(this.angle) * this.thrust * deltaTime
    }

    // Apply friction
    this.velocity.x *= Math.pow(this.friction, deltaTime)
    this.velocity.y *= Math.pow(this.friction, deltaTime)

    // Update position
    this.x += this.velocity.x * deltaTime
    this.y += this.velocity.y * deltaTime
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)

    // Draw ship triangle
    ctx.beginPath()
    ctx.moveTo(this.radius, 0)
    ctx.lineTo(-this.radius, -this.radius / 2)
    ctx.lineTo(-this.radius, this.radius / 2)
    ctx.closePath()

    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw thrust flame
    if (this.thrust > 0) {
      ctx.beginPath()
      ctx.moveTo(-this.radius, 0)
      ctx.lineTo(-this.radius - 10, -5)
      ctx.lineTo(-this.radius - 15, 0)
      ctx.lineTo(-this.radius - 10, 5)
      ctx.closePath()

      ctx.fillStyle = '#ff6b35'
      ctx.fill()
    }

    ctx.restore()
  }

  wrapAround(width, height) {
    if (this.x < 0) this.x = width
    if (this.x > width) this.x = 0
    if (this.y < 0) this.y = height
    if (this.y > height) this.y = 0
  }
}
