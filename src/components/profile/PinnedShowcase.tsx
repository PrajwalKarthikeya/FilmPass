"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { mockShowcaseItems } from "@/lib/mock-profile";
import { Pin } from "lucide-react";

// Individual Sortable Item Component
function SortableShowcaseItem({ item }: { item: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="relative aspect-[3/4] md:aspect-square rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/10 group"
    >
      <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
      
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
        <Pin className="w-4 h-4 text-white" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
        <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono mb-1">{item.type}</p>
        <h4 className="font-display font-bold text-xl md:text-2xl leading-tight mb-1">{item.title}</h4>
        {item.detail && <p className="text-xs text-gray-400 font-mono">{item.detail}</p>}
      </div>
    </div>
  );
}

export function PinnedShowcase() {
  const [items, setItems] = useState(mockShowcaseItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="mb-16">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h3 className="font-display text-3xl font-bold">Pinned Showcase</h3>
          <p className="text-gray-400 text-sm mt-1">Drag and drop to rearrange your top cinema moments.</p>
        </div>
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={items.map(i => i.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map(item => (
              <SortableShowcaseItem key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
