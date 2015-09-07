import LiquidFunWorld from './LiquidFunWorld';
import D3Renderer from './D3Renderer';

class Main {
  constructor() {
    this.liquidFunWorld = new LiquidFunWorld();
    this.d3Renderer = new D3Renderer();
    window.onresize = this.d3Renderer.resize;
    this.render(this.liquidFunWorld, this.d3Renderer);
  }

  render() {
    this.liquidFunWorld.update(world);
    this.d3Renderer.render(world);
    window.requestAnimationFrame(() => { this.render() });
  }
}

window.addEventListener('load', () => {
  let main = new Main();
});
