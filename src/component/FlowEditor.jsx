import React, { useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { getLayoutedElements } from '../utils/dagreUtils';
import { pageHierarchy } from '../utils/data';
import HomeSections from './HomeSections';

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const rawNodes = pageHierarchy.map((page) => ({
      id: page.id,
      data: {
        label:
          page.id === 'home' ? (
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Home</h2>
              <HomeSections />
            </div>
          ) : (
            <div className="text-center font-medium">{page.label}</div>
          ),
      },
      position: { x: 0, y: 0 }, 
      draggable: page.id !== 'home', 
      style: {
        backgroundColor: getColor(page),
        borderRadius: 12,
        padding: 10,
        width: page.id === 'home' ? 500 : 200,
        height: page.id === 'home' ? 600 : 'auto',
        overflow: 'hidden',
      },
    }));

    const rawEdges = pageHierarchy
      .filter((p) => p.parent)
      .map((p) => ({
        id: `${p.parent}-${p.id}`,
        source: p.parent,
        target: p.id,
        animated: true,
      }));

const layouted = getLayoutedElements(rawNodes, rawEdges, 'TB');
    setNodes(layouted.nodes);
    setEdges(layouted.edges);
  }, []);

  return (
    <div className="w-full h-[700px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

const getColor = (page) => {
  if (!page.parent) return '#fcd34d';
  const grandparent = pageHierarchy.find((p) => p.id === page.parent)?.parent;
  return grandparent ? '#fca5a5' : '#a5f3fc';
};

export default FlowEditor;