import React from 'react';

const ControlPanel = ({ onSave, onLoad, onExport, onReset }) => (
  <div className="flex gap-4 mt-4">
    <button onClick={onSave} className="btn">Save</button>
    <button onClick={onLoad} className="btn">Load</button>
    <button onClick={onExport} className="btn">Export JSON</button>
    <button onClick={onReset} className="btn">Reset</button>
  </div>
);

export default ControlPanel;