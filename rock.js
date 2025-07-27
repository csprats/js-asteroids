export class Rock {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.speed = 1
		this.velocity = {
			x: 0,
			y: 0
		}
		this.rotationSpeed = 2.5
		this.angle = 0
		this.radius = 25
	}
	update(deltaTime) {
		this.x += Math.cos(this.angle) * this.velocity.x * deltaTime
		this.y += Math.sin(this.angle) * this.velocity.y * deltaTime
		
		this.angle += -this.rotationSpeed * deltaTime
	}
	draw(ctx) {
		ctx.save()
		
		ctx.traslate(this.x, this.y)
		ctx.rotate(this.angle)
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
		
		ctx.restore()
	}
}
