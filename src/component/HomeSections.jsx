import React from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';

const HomeSections = ({ sections, setSections }) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((i) => i.id === active.id);
      const newIndex = sections.findIndex((i) => i.id === over?.id);
      setSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sections.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        {sections.map((item) => (
          <SortableItem key={item.id} id={item.id} label={item.label} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default HomeSections;