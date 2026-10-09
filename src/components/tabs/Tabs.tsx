import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useMemo, useRef, useState } from "react";

import { TABS } from "../../lib/consts/tabs";
import type { TabType } from "../../lib/types/tab";
import Tab from "../tabs/Tab";

const GAP = 2;

type Props = {
  onOverflowChange: (tabs: TabType[]) => void;
};

export default function Tabs({ onOverflowChange }: Props) {
  const [activeTab, setActiveTab] = useState<TabType | null>(null);
  const [tabs, setTabs] = useState<TabType[]>(() => {
    try {
      const saved = localStorage.getItem("tabs-order");
      if (!saved) return TABS;

      const ids = JSON.parse(saved) as string[];

      return [
        ...ids
          .map((id) => TABS.find((tab) => String(tab.id) === id))
          .filter((tab): tab is TabType => tab !== undefined),
        ...TABS.filter((tab) => !ids.includes(String(tab.id))),
      ];
    } catch {
      return TABS;
    }
  });

  const [pinnedTabs, setPinnedTabs] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("pinned-tabs") || "[]");
    } catch {
      return [];
    }
  });

  const [containerWidth, setContainerWidth] = useState(0);
  const [tabWidths, setTabWidths] = useState<Record<string, number>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const sortedTabs = useMemo(
    () =>
      [...tabs].sort(
        (a, b) =>
          Number(pinnedTabs.includes(String(b.id))) -
          Number(pinnedTabs.includes(String(a.id))),
      ),
    [tabs, pinnedTabs],
  );

  useEffect(() => {
    localStorage.setItem(
      "tabs-order",
      JSON.stringify(tabs.map((tab) => String(tab.id))),
    );
  }, [tabs]);

  useEffect(() => {
    localStorage.setItem("pinned-tabs", JSON.stringify(pinnedTabs));
  }, [pinnedTabs]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      setContainerWidth(container.clientWidth);

      setTabWidths((prev) => {
        const next = { ...prev };
        let changed = false;

        Object.entries(tabRefs.current).forEach(([id, element]) => {
          if (!element) return;

          const width = element.getBoundingClientRect().width;

          if (width > 0 && next[id] !== width) {
            next[id] = width;
            changed = true;
          }
        });

        return changed ? next : prev;
      });
    });

    observer.observe(container);

    Object.values(tabRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tabs, pinnedTabs]);

  const allMeasured = sortedTabs.every(
    (tab) => tabWidths[String(tab.id)] !== undefined,
  );

  const visibleTabs: TabType[] = [];
  let usedWidth = 0;

  for (const tab of sortedTabs) {
    const width = tabWidths[String(tab.id)];

    if (!allMeasured) {
      visibleTabs.push(tab);
      continue;
    }

    const gap = visibleTabs.length > 0 ? GAP : 0;

    if (usedWidth + width! + gap > containerWidth) break;

    visibleTabs.push(tab);
    usedWidth += width! + gap;
  }

  const overflowTabs = useMemo(
    () => sortedTabs.slice(visibleTabs.length),
    [sortedTabs, visibleTabs.length],
  );

  useEffect(() => {
    onOverflowChange(overflowTabs);
  }, [overflowTabs, onOverflowChange]);

  function togglePin(id: string) {
    setPinnedTabs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  function handleDragStart({ active }: DragStartEvent) {
    const tab = sortedTabs.find(
      (item) => String(item.id) === String(active.id),
    );

    setActiveTab(tab ?? null);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveTab(null);

    if (!over || active.id === over.id) return;

    setTabs((prev) => {
      const oldIndex = prev.findIndex(
        (tab) => String(tab.id) === String(active.id),
      );
      const newIndex = prev.findIndex(
        (tab) => String(tab.id) === String(over.id),
      );

      if (oldIndex < 0 || newIndex < 0) return prev;

      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  function handleDragCancel() {
    setActiveTab(null);
  }

  return (
    <div ref={containerRef} className="min-w-0 flex-1 overflow-hidden">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={visibleTabs.map((tab) => String(tab.id))}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex items-center gap-0.5">
            {visibleTabs.map((tab) => (
              <div
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[String(tab.id)] = element;
                }}
                className="shrink-0"
              >
                <Tab
                  tab={tab}
                  pinned={pinnedTabs.includes(String(tab.id))}
                  onTogglePin={togglePin}
                />
              </div>
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeTab ? (
            <div className="flex min-h-[49px] items-center justify-center gap-2 rounded-t-xs border-t-2 border-[#4690E2] bg-[#f1f5f8] px-[16px] text-[14px] shadow-lg">
              {(() => {
                const Icon = activeTab.icon;

                return (
                  <>
                    <Icon size={16} />
                    <span>{activeTab.title}</span>
                  </>
                );
              })()}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
