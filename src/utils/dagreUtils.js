import dagre from 'dagre';

const nodeWidth = 200;
const nodeHeight = 100;

export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  // Set nodes with width and height
  nodes.forEach((node) => {
    const width = typeof node.style?.width === 'number' ? node.style.width : nodeWidth;
    const height = typeof node.style?.height === 'number' ? node.style.height : nodeHeight;
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';
    node.position = {
      x: nodeWithPosition.x,
      y: nodeWithPosition.y,
    };
    return node;
  });

  return { nodes: layoutedNodes, edges };
};
