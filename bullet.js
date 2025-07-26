// Bullet class
export class Bullet {
    constructor(x, y, angle, speed) {
        this.x = x
        this.y = y
        this.radius = 2.5
        this.angle = angle
        this.speed = speed
        this.velocity = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed
        }
        this.active = false
    }

    update(deltaTime, x, y) {
		//Check if is active
		if (this.active)	
		{
			//Move
			this.x += this.velocity.x * deltaTime
			this.y += this.velocity.y * deltaTime
		}
    }

    draw(ctx) {
		//Check if is active
		if (this.active)	{
			ctx.save()
			
			//Draw the bullet
			ctx.beginPath()
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
			ctx.fillStyle = '#ff6b35'
			ctx.fill()
			
			ctx.restore()
		}
    }
    borderCollision(width, height) {
		//If is outside of the map, desactive the bullet
		if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
			this.active = false;
			return true
		}
	}
}
