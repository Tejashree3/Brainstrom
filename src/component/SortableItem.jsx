import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaGripVertical } from 'react-icons/fa';

const SortableItem = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[400px] p-4 mb-4 bg-gray-50 border border-gray-200 rounded-xl shadow-lg"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-3 bg-white rounded-full shadow-md px-4 py-2">
        <FaGripVertical className="text-gray-400" />
        <span className="text-gray-800 font-medium">{label}</span>
      </div>
    </div>
  );
};

export default SortableItem;