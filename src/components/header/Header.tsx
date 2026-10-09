import { useState } from "react";
import type { TabType } from "../../lib/types/tab";

import Tabs from "../tabs/Tabs";
import Archive from "./Archive";
import OverflowMenu from "./OverflowMenu";

export default function Header() {
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const [overflowTabs, setOverflowTabs] = useState<TabType[]>([]);

  function handleOverflowChange(nextTabs: TabType[]) {
    setOverflowTabs((prev) => {
      const same =
        prev.length === nextTabs.length &&
        prev.every((tab, index) => tab.id === nextTabs[index].id);

      return same ? prev : nextTabs;
    });
  }

  return (
    <div className="mx-10 px-2 bg-[#FEFEFE]">
      <div className="w-full h-[69px]" />

      <div className="flex items-center gap-0.5">
        <Archive />

        <Tabs onOverflowChange={handleOverflowChange} />

        <OverflowMenu
          tabs={overflowTabs}
          isOverflowOpen={isOverflowOpen}
          setIsOverflowOpen={setIsOverflowOpen}
        />
      </div>
    </div>
  );
}
