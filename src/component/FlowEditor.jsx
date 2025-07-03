import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';
import { getLayoutedElements } from '../utils/dagreUtils';
import { pageHierarchy } from '../utils/data';

const FlowEditor = () => {
  const [elements, setElements] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    const nodes = pageHierarchy.map((page) => ({
      id: page.id,
      data: { label: page.label },
      position: { x: 0, y: 0 },
      style: { backgroundColor: getColor(page) },
    }));

    const edges = pageHierarchy
      .filter((p) => p.parent)
      .map((p) => ({
        id: `${p.parent}-${p.id}`,
        source: p.parent,
        target: p.id,
        animated: true,
      }));

    const layouted = getLayoutedElements(nodes, edges);
    setElements(layouted);
  }, []);

  return (
    <div style={{ height: 500 }}>
      <ReactFlow nodes={elements.nodes} edges={elements.edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

const getColor = (page) => {
  if (!page.parent) return '#fcd34d'; // Level 1
  const grandparent = pageHierarchy.find((p) => p.id === page.parent)?.parent;
  return grandparent ? '#fca5a5' : '#a5f3fc';
};

export default FlowEditor;