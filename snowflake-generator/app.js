import { Particle } from "./particle.js";

const app = (s) => {
  let currentParticle;
  let snowflake = [];
  const ITERATIONS = 6;
  const BACKGROUND_COLOR = 0;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.initParticle();
    s.background(BACKGROUND_COLOR);
  };

  s.draw = () => {
    s.translate(s.width * 0.5, s.height * 0.5);
    s.rotate(s.PI / 3);
    let count = 0;

    while (
      !currentParticle.finished() &&
      !currentParticle.intersects(s, snowflake)
    ) {
      currentParticle.update(s);
      count++;
      s.render(count);
    }

    if (count === 0) {
      console.log("snowflake completed!");
      snowflake = [];
      s.background(BACKGROUND_COLOR);
      // s.noLoop();
    } else {
      snowflake.push(currentParticle);
      s.initParticle();
    }
  };

  s.initParticle = () => {
    const movementScale = 1 + Math.floor(Math.random() * 4);
    const radius = 1 + Math.floor(Math.random() * 10);

    const particleConfig = {
      radius,
      size: s.height * 0.5,
      angle: 0,
      speed: Math.floor(1 + Math.random() * 4),
      density: radius * 0.5,
      movementScale,
    };

    console.log("radius", particleConfig.radius);
    console.log("size", particleConfig.size);
    console.log("speed", particleConfig.speed);
    console.log("density", particleConfig.density);
    console.log("movementScale", particleConfig.movementScale);

    currentParticle = new Particle(particleConfig);
  };

  s.render = (count) => {
    for (let i = 0; i < ITERATIONS; i++) {
      s.rotate(s.PI / 3);
      currentParticle.render(s, count);

      // render mirrored across the x axis
      s.push();
      s.scale(1, -1);
      currentParticle.render(s, count);
      s.pop();
    }
  };
};

new p5(app);
