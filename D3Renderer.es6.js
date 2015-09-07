export default class D3Renderer {
  constructor() {
    let viz = d3.select('body').append('svg').attr('id', 'viz').append('g').classed('world', true);
    this.resize();
  }

  render(world) {
    let viz = d3.select('svg#viz g.world');
    this.drawBodies(viz, world.bodies);
    this.drawParticles(viz, world.particleSystems[0]);
  }

  drawBodies(selection, bodies) {
    let bounds = d3.svg.line().x(vec => vec.x).y(vec => vec.y);
    let bodyGroups = selection.selectAll('g.body').data(bodies, b => b.ptr);
    bodyGroups.enter().append('g').classed('body', true).attr('fill', 'none').attr('stroke', 'black').attr('stroke-width', 0.01);
    bodyGroups.each(function(b) {
      d3.select(this).selectAll('path').data(b.fixtures).enter().append('path').attr('d', fixture => bounds(fixture.shape.vertices));
    });
    bodyGroups.attr('transform', b => {
      let pos = b.GetPosition();
      let angle = b.GetAngle() * 180 / Math.PI;
      return `translate(${pos.x}, ${pos.y}), rotate(${angle})`;
    });
    bodyGroups.exit().remove();
  }

  drawParticles(selection, system) {
    let particleGroup = selection.selectAll('g.particle').data(system.particleGroups);
    let positionBuf = system.GetPositionBuffer();
    particleGroup.enter().append('g').classed('particle', true).attr('fill', (d, i) => d3.hsl((i * 77 + 200) % 360, 0.8, 0.8));
    particleGroup.each(function(pg) {
      let dataSet = d3.select(this).selectAll('circle').data(new Array(pg.GetParticleCount()));
      let offset = pg.GetBufferIndex();
      dataSet.enter().append('circle').attr('r', system.radius * 0.75);
      dataSet.attr('cx', (d, i) => positionBuf[(i + offset) * 2]).attr('cy', (d, i) => positionBuf[(i + offset) * 2 + 1]);
      dataSet.exit().remove();
    });
    particleGroup.exit().remove();
  }

  resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let scale = (w < h ? w : h) * 0.23;
    let viz = d3.select('svg#viz');
    viz.style('width', '100%').style('height', h + 'px');
    let translate = `translate(${w/2}, ${h / 2 + scale * 2})`;
    scale = `scale(${scale}, ${-scale})`;
    viz.select('g').attr('transform', [translate, scale].join());
  }
}
