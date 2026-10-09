import type { TabType } from "../types/tab";
import {
  LayoutDashboardIcon,
  LandmarkIcon,
  PhoneIcon,
  CalculatorIcon,
  TrendingUpIcon,
  BarChart3Icon,
  MailIcon,
  SettingsIcon,
  HelpCircleIcon,
  BoxesIcon,
  ListTodoIcon,
  ShoppingCartIcon,
  FileTextIcon,
} from "lucide-react";

export const TABS: TabType[] = [
  {
    id: 1,
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    id: 2,
    title: "Banking",
    url: "/banking",
    icon: LandmarkIcon,
  },
  {
    id: 3,
    title: "Telefonie",
    url: "/telefonie",
    icon: PhoneIcon,
  },
  {
    id: 4,
    title: "Accounting",
    url: "/accounting",
    icon: CalculatorIcon,
  },
  {
    id: 5,
    title: "Verkauf",
    url: "/verkauf",
    icon: TrendingUpIcon,
  },
  {
    id: 6,
    title: "Statistik",
    url: "/statistik",
    icon: BarChart3Icon,
  },
  {
    id: 7,
    title: "Post Office",
    url: "/post-office",
    icon: MailIcon,
  },
  {
    id: 8,
    title: "Administration",
    url: "/administration",
    icon: SettingsIcon,
  },
  {
    id: 9,
    title: "Help",
    url: "/help",
    icon: HelpCircleIcon,
  },
  {
    id: 10,
    title: "Warenbestand",
    url: "/warenbestand",
    icon: BoxesIcon,
  },
  {
    id: 11,
    title: "Auswahllisten",
    url: "/auswahllisten",
    icon: ListTodoIcon,
  },
  {
    id: 12,
    title: "Einkauf",
    url: "/einkauf",
    icon: ShoppingCartIcon,
  },
  {
    id: 13,
    title: "Rechn",
    url: "/rechnungen",
    icon: FileTextIcon,
  },
];
