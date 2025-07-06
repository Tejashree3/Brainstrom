import React, { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from "react-flow-renderer";
import { getLayoutedElements } from "../utils/dagreUtils";
import { pageHierarchy } from "../utils/data";
import HomeSections from "./HomeSections";

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Allow connecting nodes
  const onConnect = (params) =>
    setEdges((eds) => addEdge({ ...params, animated: true }, eds));

  // Load from localStorage or layouted structure
  useEffect(() => {
    const savedNodes = localStorage.getItem("flow-nodes");
    const savedEdges = localStorage.getItem("flow-edges");

    if (
      savedNodes &&
      savedEdges &&
      savedNodes.length > 2 &&
      savedEdges.length > 2
    ) {
      setNodes(JSON.parse(savedNodes));
      setEdges(JSON.parse(savedEdges));
    } else {
      const rawNodes = pageHierarchy.map((page) => ({
        id: page.id,
        data: {
          label:
            page.id === "home" ? (
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">Home</h2>
                <HomeSections />
              </div>
            ) : (
              <div className="text-center font-medium">{page.label}</div>
            ),
        },
        position: { x: 0, y: 0 },
        draggable: page.id !== "home",
        selectable: true,
        deletable: page.id !== "home", 
        style: {
          backgroundColor: getColor(page),
          borderRadius: 12,
          padding: 10,
          border: "1px solid #ccc",
          width: page.id === "home" ? 500 : 200,
          height: page.id === "home" ? 600 : "auto",
          overflow: "hidden",
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

      const layouted = getLayoutedElements(rawNodes, rawEdges, "TB");
      setNodes(layouted.nodes);
      setEdges(layouted.edges);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("flow-nodes", JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem("flow-edges", JSON.stringify(edges));
  }, [edges]);

  const handleExport = () => {
    const data = { nodes, edges };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flow-structure.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-[860px] relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        deleteKeyCode={46} // Enable Delete key for deleting nodes/edges
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      {/* <button
        onClick={handleExport}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Export JSON
      </button> */}
    </div>
  );
};

const getColor = (page) => {
  if (!page.parent) return "#fcd34d"; // Home - Yellow
  const grandparent = pageHierarchy.find((p) => p.id === page.parent)?.parent;
  return grandparent ? "#fca5a5" : "#a5f3fc"; // Nested - Red, Direct child - Cyan
};

export default FlowEditor;
