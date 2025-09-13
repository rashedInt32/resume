"use client";
import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";

type LayoutRegion = "header" | "sidebar" | "body";

type Block = {
  id: string;
  type: "Header" | "Skills" | "Experience";
  label: string;
};

// Palette blocks (no IDs because they are templates)
const paletteBlocks = [
  { type: "Header", label: "Header" },
  { type: "Skills", label: "Skills" },
  { type: "Experience", label: "Experience" },
] as const;

// Restrictions
const regionRules: Record<LayoutRegion, Block["type"][]> = {
  header: ["Header"],
  sidebar: ["Skills"],
  body: ["Experience", "Skills"],
};

export default function ResumeBuilder() {
  const [regions, setRegions] = useState<Record<LayoutRegion, Block[]>>({
    header: [],
    sidebar: [],
    body: [],
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const region = over.id as LayoutRegion;
    const data = active.data.current as { type: Block["type"]; label: string };

    if (!data) return;

    if (!regionRules[region].includes(data.type)) {
      console.warn(`❌ Block type ${data.type} not allowed in ${region}`);
      return;
    }

    // Add a new block with a unique ID
    const newBlock: Block = {
      id: `${data.type}-${Date.now()}`,
      type: data.type,
      label: data.label,
    };

    setRegions((prev) => ({
      ...prev,
      [region]: [...prev[region], newBlock],
    }));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 p-6">
        {/* Palette */}
        <div className="w-1/4 p-4 border rounded">
          <h2 className="font-bold mb-2">Blocks</h2>
          {paletteBlocks.map((block, idx) => (
            <DraggableBlock
              key={idx}
              id={`palette-${idx}`}
              type={block.type}
              label={block.label}
            />
          ))}
        </div>

        {/* Resume */}
        <div className="flex-1 p-6 border rounded bg-white shadow">
          {/* Header full width */}
          <DroppableRegion region="header" blocks={regions.header} />

          {/* Sidebar + Body */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <DroppableRegion region="sidebar" blocks={regions.sidebar} />
            <div className="col-span-2">
              <DroppableRegion region="body" blocks={regions.body} />
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}

// ✅ Draggable block
function DraggableBlock({
  id,
  type,
  label,
}: {
  id: string;
  type: Block["type"];
  label: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { type, label }, // send data
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-2 mb-2 bg-gray-200 rounded cursor-grab"
    >
      {label}
    </div>
  );
}

// ✅ Droppable region
function DroppableRegion({
  region,
  blocks,
}: {
  region: LayoutRegion;
  blocks: Block[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: region });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 min-h-[100px] border rounded transition-colors ${
        isOver ? "bg-blue-100" : "bg-gray-50"
      }`}
    >
      <h3 className="font-semibold capitalize mb-2">{region}</h3>
      {blocks.length === 0 && (
        <p className="text-sm text-gray-400 italic">
          Drop {region} blocks here
        </p>
      )}
      {blocks.map((block) => (
        <div
          key={block.id}
          className="p-2 mb-2 bg-white border rounded shadow-sm"
        >
          {block.label}
        </div>
      ))}
    </div>
  );
}
