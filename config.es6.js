export let boundsNodes = [[-2, 0], [2, 0], [2, 4], [-2, 4]];

export let floaters = [
  {
    nodes: [[-0.1, -0.2], [0.1, -0.2], [0.1, 0.2], [-0.1, 0.2]],
    pos: [0.5, 2]
  },
  {
    nodes: [[0, 0.2], [0.1732, -0.0866], [-0.1732, -0.0866]],
    pos: [-1.5, 3]
  },
];

export let pgDefs = [
  {nodes: [[0.5, 0.1], [1.9, 0.1], [1.9, 2.5], [0.5, 1.0]]},
  {nodes: [[-0.5, 0.1], [-1.9, 0.1], [-1.9, 2.5], [-0.5, 1.0]]},
];

export let config = {
  timeStep: 1.0/60.0,
  velocityIterations: 8,
  positionIterations: 3,
};
