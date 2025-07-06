import React from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useSelector, useDispatch } from "react-redux";
import { setSections } from "../redux/homeSlice"; // import your Redux action
import SortableItem from "./SortableItem";

const HomeSections = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.home.sections);
  console.log("Sections from Redux:", sections);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((i) => i.id === active.id);
      const newIndex = sections.findIndex((i) => i.id === over?.id);
      const newOrder = arrayMove(sections, oldIndex, newIndex);
      dispatch(setSections(newOrder)); // update redux store
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-[450px] h-[500px] ">
      {/* <h2 className="text-xl font-semibold mb-4">Home Sections</h2> */}
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
    </div>
  );
};

export default HomeSections;
