export class Particle {
  constructor({ radius, size, angle, speed, density, movementScale }) {
    this.pos = p5.Vector.fromAngle(angle);
    this.pos.mult(size);
    this.radius = radius;
    this.speed = speed;
    this.density = density;
    this.movementScale = movementScale;
  }

  update = (s) => {
    this.pos.x -= this.speed;
    this.pos.y += s.random(-this.movementScale, this.movementScale);

    let angle = this.pos.heading();
    angle = s.constrain(angle, 0, s.PI / 6);
    let magnitude = this.pos.mag();
    this.pos = p5.Vector.fromAngle(angle);
    this.pos.setMag(magnitude);
  };

  render = (s, count) => {
    // this.rects(s, count);
    this.points(s, count);
  };

  points = (s, count) => {
    const scale = count * 0.1;
    const { red, green, blue, xMod } = this._getColors(s);
    s.strokeWeight(scale * 0.35);
    s.stroke(red + scale, green + scale, blue + xMod + scale, count * 0.25);
    s.point(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  };

  rects = (s, count) => {
    const scale = count * 0.1;
    const { red, green, blue, xMod } = this._getColors(s);
    s.stroke(0, scale);
    if (count % 2 === 0) {
      s.fill(red + scale, green + scale, blue + xMod + scale, count * 0.25);
      s.rect(this.pos.x, this.pos.y, this.radius, this.radius * scale);
    } else {
      s.fill(count, count, count, count * 0.25);
      s.rect(this.pos.x, this.pos.y, this.radius * scale, this.radius);
    }
  };

  finished = () => {
    return this.pos.x < 1;
  };

  intersects = (s, snowflake) => {
    const isIntersecting = snowflake.some((p) => {
      const dist = s.dist(p.pos.x, p.pos.y, this.pos.x, this.pos.y);
      if (dist < this.radius * this.density) return true;
    });

    return isIntersecting;
  };

  _getColors = (s) => {
    const red = s.map(this.pos.x, s.height * 0.5, 1, 0, 75);
    const green = s.map(this.pos.x, s.height * 0.5, 1, 0, 75);
    const blue = s.map(this.pos.x, s.height * 0.5, 1, 0, 100);
    const xMod = s.map(this.pos.x, 0, s.height * 0.5, 0, 100);

    return { red, green, blue, xMod };
  };
}
