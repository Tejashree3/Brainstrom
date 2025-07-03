import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSections, resetSections } from './redux/homeSlice';
import FlowEditor from './component/FlowEditor';
import HomeSections from './component/HomeSections';
import ControlPanel from './component/ControlPanel';


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
    const exportData = { homeSections: sections };
    const json = JSON.stringify(exportData, null, 2);
    alert(json);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Visual Page Hierarchy Editor</h1>
      <FlowEditor />
      <h2 className="mt-8 font-semibold">Home Page Sections</h2>
      <HomeSections
        sections={sections}
        setSections={(newSections) => dispatch(setSections(newSections))}
      />
      <ControlPanel onSave={handleSave} onLoad={handleLoad} onExport={handleExport} onReset={() => dispatch(resetSections())} />
    </div>
  );
};

export default App;