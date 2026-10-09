import * as ContextMenu from "@radix-ui/react-context-menu";
import { ArchiveIcon } from "lucide-react";

const triggerStyles =
  "flex h-[49px] w-[49px] items-center justify-center rounded-t-xs border-t-2 border-[#FEFEFE] hover:border-[#7F858D] hover:bg-[#f1f5f8]";

const menuStyles =
  "z-50 min-w-[180px] rounded-md border border-gray-200 bg-white p-1 shadow-md";

const menuItemStyles =
  "flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm outline-none hover:bg-gray-100";

export default function Archive() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <div className={triggerStyles}>
          <ArchiveIcon size={16} />
        </div>
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content className={menuStyles}>
          <ContextMenu.Item className={menuItemStyles}>
            Lagerverwaltung
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
