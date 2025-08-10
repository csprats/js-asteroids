export class Rock {
	constructor(x, y, angle, radius) {
		this.x = x
		this.y = y
		this.speed = 30
		this.angle = angle
		this.velocity = {
			x: 0,
			y: 0
		}
		this.rotationSpeed = 0.5
		this.radius = radius
	}
	
	update(deltaTime) {
		//Add the movement
		this.velocity.x += Math.cos(this.angle) * deltaTime * this.speed
		this.velocity.y += Math.sin(this.angle) * deltaTime * this.speed
		this.x += this.velocity.x * deltaTime
		this.y += this.velocity.y * deltaTime
		
		//Rotate
		this.angle += this.rotationSpeed * deltaTime
	}
	draw(ctx) {
		//Draw rocks
		ctx.save()
		
		ctx.beginPath()
		ctx.fillStyle = '#5A4D41'
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
		ctx.fill()
		ctx.closePath()
		
		ctx.restore()
	}
	wrapAround(width, height) {
		if (this.x < 0) this.x = width
		if (this.x > width) this.x = 0
		if (this.y < 0) this.y = height
		if (this.y > height) this.y = 0
  }
}
