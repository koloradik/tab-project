import { useLocation, Link } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import type { TabType } from "../../lib/types/tab";

type Props = {
  tabs: TabType[];
  isOverflowOpen: boolean;
  setIsOverflowOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const buttonStyles =
  "flex h-[49px] w-[36px] cursor-pointer items-center justify-center rounded-md";

const menuStyles =
  "absolute right-0 top-full z-50 mt-1 min-w-[200px] rounded-xs border bg-white p-1 shadow-lg outline-none";

const itemStyles =
  "flex items-center gap-2 rounded-lg border-2 px-3 py-2 hover:bg-gray-100";

export default function OverflowMenu({
  tabs,
  isOverflowOpen,
  setIsOverflowOpen,
}: Props) {
  const location = useLocation();

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOverflowOpen((prev) => !prev)}
        className={`${buttonStyles} ${
          isOverflowOpen ? "bg-[#4690E2] text-white" : ""
        }`}
        aria-label="Toggle hidden tabs"
        aria-expanded={isOverflowOpen}
      >
        {isOverflowOpen ? (
          <ChevronUpIcon size={16} />
        ) : (
          <ChevronDownIcon size={16} />
        )}
      </button>

      {isOverflowOpen && (
        <div className={menuStyles}>
          {tabs.length > 0 ? (
            tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.url;

              return (
                <Link
                  key={tab.id}
                  to={tab.url}
                  onClick={() => setIsOverflowOpen(false)}
                  className={`${itemStyles} ${
                    isActive
                      ? "border-[#4690E2] bg-sky-50"
                      : "border-transparent"
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.title}</span>
                </Link>
              );
            })
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">
              Keine versteckten Reiter
            </div>
          )}
        </div>
      )}
    </div>
  );
}
