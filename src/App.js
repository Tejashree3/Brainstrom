import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSections, resetSections } from './redux/homeSlice';
import FlowEditor from './component/FlowEditor';
import ControlPanel from './component/ControlPanel';
import { pageHierarchy } from './utils/data';


const App = () => {
  const sections = useSelector((state) => state.home.sections);
  const dispatch = useDispatch();

  const handleSave = () => {
    localStorage.setItem('homeSections', JSON.stringify(sections));
    alert('Saved to localStorage!');
  };

  const handleLoad = () => {
    const data = localStorage.getItem('homeSections');
    if (data) dispatch(setSections(JSON.parse(data)));
  };

  const handleExport = () => {
    const savedNodes = JSON.parse(localStorage.getItem("flow-nodes"));
    const savedEdges = JSON.parse(localStorage.getItem("flow-edges"));
    console.log("Saved", savedNodes, savedEdges);
    const nodeMap = {};
    const childrenMap = {};

    // Step 1: Build a map of node ID -> data
    savedNodes.forEach((node) => {
      nodeMap[node.id] = {
        id: node.id,
        label:
          typeof node.data.label === "string"
            ? node.data.label
            : node.id.charAt(0).toUpperCase() + node.id.slice(1), // fallback label
      };
    });

    // Step 2: Build parent -> children mapping from edges
    savedEdges.forEach((edge) => {
      if (!childrenMap[edge.source]) {
        childrenMap[edge.source] = [];
      }
      childrenMap[edge.source].push(edge.target);

      // Also record parent in child node
      if (nodeMap[edge.target]) {
        nodeMap[edge.target].parent = edge.source;
      }
    });

    // Step 3: Add children arrays
    for (const parentId in childrenMap) {
      if (nodeMap[parentId]) {
        nodeMap[parentId].children = childrenMap[parentId];
      }
    }

    // Step 4: Add sections to home
    if (nodeMap["home"]) {
      nodeMap["home"].sections = sections; // reference only
    }

    const pageHierarchyFormat = Object.values(nodeMap);

    // Export as JSON
    const blob = new Blob([JSON.stringify(pageHierarchyFormat, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pageHierarchy.json";
    a.click();
    URL.revokeObjectURL(url);
  };


  return (
    <div className="p-6">
      <ControlPanel onSave={handleSave} onLoad={handleLoad} onExport={handleExport} onReset={() => dispatch(resetSections())} />
      <h1 className="text-xl font-bold mb-4">Visual Page Hierarchy Editor</h1>
      <FlowEditor />
      {/* <h2 className="mt-8 font-semibold">Home Page Sections</h2> */}

    </div>
  );
};

export default App;