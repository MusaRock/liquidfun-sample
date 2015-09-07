import {boundsNodes, floaters, pgDefs, config} from './config';

export default class LiquidFunWorld {
  constructor() {
    this.timeStep = config.timeStep;
    this.velocityIterations = config.velocityIterations;
    this.positionIterations = config.positionIterations;


    this.gravity = new b2Vec2(0, -10);
    // world is global scope
    let world = new b2World(this.gravity);
    window.world = world;

    this.boundsBody = world.CreateBody(new b2BodyDef());
    this.boxShape = new b2ChainShape();
    this.boxShape.vertices = boundsNodes.map((node) => {
      return new b2Vec2(node[0], node[1]);
    });
    this.boxShape.CreateLoop();
    this.boundsBody.CreateFixtureFromShape(this.boxShape, 0);

    floaters.forEach((floaterDef) => {
      let dynamicBodyDef = new b2BodyDef();
      dynamicBodyDef.type = b2_dynamicBody;
      let body = world.CreateBody(dynamicBodyDef);
      let shape = new b2ChainShape();
      shape.vertices = floaterDef.nodes.map((node) => {
        return new b2Vec2(node[0], node[1]);
      });
      shape.CreateLoop();
      body.CreateFixtureFromShape(shape, 1);
      body.SetTransform(new b2Vec2(floaterDef.pos[0], floaterDef.pos[1]), 0);
      body.SetMassData(new b2MassData(0.1, new b2Vec2(0, 0), 0.03));
    });

    let psd = new b2ParticleSystemDef();
    psd.radius = 0.05;
    psd.dampingStrength = 0.1;
    this.particleSystem = world.CreateParticleSystem(psd);

    pgDefs.forEach((def) => {
      let shape = new b2PolygonShape();
      let pd = new b2ParticleGroupDef();
      shape.vertices = def.nodes.map((node) => new b2Vec2(node[0], node[1]));
      pd.shape = shape;
      this.particleSystem.CreateParticleGroup(pd);
    });
  }

  update(world) {
    world.Step(this.timeStep, this.velocityIterations, this.positionIterations);
  }
}
