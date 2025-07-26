// Bullet class
export class Bullet {
    constructor() {
		this.speed = 500
        this.radius = 2.5
        this.bullets = []
    }
	
	add(x, y, angle) {
		const newBullet = {
            x: x,
            y: y,
            angle: angle,
            velocity: {
                x: Math.cos(angle) * this.speed,
                y: Math.sin(angle) * this.speed
            },
            active: true
        }
        
        this.bullets.push(newBullet);
	}
	
    update(deltaTime) {
		for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];
            if (bullet.active) {
                bullet.x += bullet.velocity.x * deltaTime;
                bullet.y += bullet.velocity.y * deltaTime;
            }
        }
        
        this.bullets = this.bullets.filter(bullet => bullet.active)
    }
    

    draw(ctx) {
		//Check if is active
		ctx.save()
		ctx.fillStyle = '#ff6b35'
			
		for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];
            if (bullet.active) {
                ctx.beginPath();
                ctx.arc(bullet.x, bullet.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
			
		ctx.restore()
    }
    borderCollision(width, height) {
		for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];

            if (bullet.active && (bullet.x < 0 || bullet.x > width || bullet.y < 0 || bullet.y > height)) {
                bullet.active = false;
            }
        }
	}
}
