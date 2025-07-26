export class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
    this.score = 0
    this.lives = 3
    this.running = true
    this.lastTime = 0
    this.deltaTime = 0
    // Game Loop
    this.now = 0
    this.dt = 0
    this.last = performance.now()
  }

  updateDeltaTime() {
    this.now = performance.now()
    this.dt = (this.now - this.last) / 1000
    this.last = this.now
    this.deltaTime = this.dt
  }

  clearCanvas() {
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  updateUI() {
    document.getElementById('score').textContent = this.score
    document.getElementById('lives').textContent = this.lives
  }

  getDeltaTime() {
    return this.deltaTime
  }

  getContext() {
    return this.ctx
  }
}
