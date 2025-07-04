import React from 'react';
import { FaSave, FaDownload, FaUpload, FaUndo } from 'react-icons/fa';

const ControlPanel = ({ onSave, onLoad, onExport, onReset }) => (
  <div className="flex flex-wrap gap-4 mt-6">
   <button onClick={onSave} className="btn-3 btn-blue">
  <span><FaSave /> Save</span>
</button>

<button onClick={onLoad} className="btn-3 btn-green">
  <span><FaUpload /> Load</span>
</button>

<button onClick={onExport} className="btn-3 btn-indigo">
  <span><FaDownload /> Export JSON</span>
</button>

<button onClick={onReset} className="btn-3 btn-red">
  <span><FaUndo /> Reset</span>
</button>

  </div>
);

export default ControlPanel;