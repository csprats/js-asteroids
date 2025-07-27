// Bullet class
export class Bullet {
    constructor(x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.radius = 2.5;
        this.angle = angle;
        this.speed = speed;
        this.velocity = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed
        };
        this.active = true;
    }

    update(deltaTime) {
		this.x += this.velocity.x * deltaTime;
		this.y += this.velocity.y * deltaTime;

    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = '#ff6b35';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
