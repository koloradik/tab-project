import * as ContextMenu from "@radix-ui/react-context-menu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import type { TabType } from "../../lib/types/tab";

type Props = {
  tab: TabType;
  pinned: boolean;
  onTogglePin: (id: string) => void;
};

const contextMenuStyles =
  "z-50 min-w-[180px] rounded-md border border-gray-200 bg-white p-1 shadow-md";

const contextMenuItemStyles =
  "flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm outline-none hover:bg-gray-100";

export default function Tab({ tab, onTogglePin, pinned }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const Icon = tab.icon;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: String(tab.id) });

  const isActive = location.pathname === tab.url;

  const tabStyles = `
    flex min-h-[49px] shrink-0 cursor-pointer touch-none
    items-center justify-center gap-2 rounded-t-xs
    border-t-2 px-[16px] text-[14px] duration-300
    ${isActive ? "bg-[#f1f5f8]" : "bg-[#FEFEFE]"}
    ${
      pinned
        ? "border-[#7F858D]"
        : isActive
          ? "border-[#4690E2]"
          : "border-transparent"
    }
    hover:border-[#4690E2] hover:bg-[#f1f5f8]
  `;

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={{
            transform: CSS.Transform.toString(transform),
            transition,
            position: "relative",
            zIndex: transform ? 50 : "auto",
          }}
          onClick={() => navigate(tab.url)}
          className={tabStyles}
        >
          <Icon size={16} />
          <span>{tab.title}</span>
        </div>
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content className={contextMenuStyles}>
          <ContextMenu.Item
            onSelect={() => onTogglePin(String(tab.id))}
            className={contextMenuItemStyles}
          >
            <Pin size={14} />
            {pinned ? "Tab lösen" : "Tab anpinnen"}
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
