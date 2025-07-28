// Bullet class
export class Bullet {
  constructor(x, y, angle) {
    this.x = x
    this.y = y
    this.angle = angle
    this.speed = 500
    this.radius = 2.5
    this.velocity = {
      x: Math.cos(angle) * this.speed,
      y: Math.sin(angle) * this.speed,
    }
    this.active = true
  }

  update(deltaTime) {
    if (this.active) {
      this.x += this.velocity.x * deltaTime
      this.y += this.velocity.y * deltaTime
    }
  }

  draw(ctx) {
    if (this.active) {
      ctx.save()
      ctx.fillStyle = '#ff6b35'
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  isOffScreen(width, height) {
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height
  }
}
