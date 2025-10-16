import {
  CircleUserRound,
  Frame,
  GalleryVerticalEnd,
  Hospital,
  Map,
  PieChart,
  Settings2,
  SquareActivity,
} from "lucide-react";

export const navData = {
  teams: [
    {
      name: "Health Net",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export const hospitalNav = [
  {
    title: "Hospitals",
    url: "#",
    icon: Hospital,
    isActive: true,
    items: [
      {
        title: "My hospitals",
        url: "/dashboard/my-hospitals",
      },
      {
        title: "Add hospital",
        url: "/dashboard/add-hospital",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
  {
    title: "Appointments",
    url: "#",
    icon: SquareActivity,
    items: [
      {
        title: "Genesis",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Quantum",
        url: "#",
      },
    ],
  },
  {
    title: "Profile",
    url: "#",
    icon: CircleUserRound,
    items: [
      {
        title: "Info",
        url: "#",
      },
      {
        title: "Update",
        url: "#",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
];

export const managerNav = [
  {
    title: "Hospitals",
    url: "#",
    icon: Hospital,
    isActive: true,
    items: [
      {
        title: "My hospitals",
        url: "/dashboard/my-hospitals",
      },
      {
        title: "Add hospital",
        url: "/dashboard/add-hospital",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
  {
    title: "Appointments",
    url: "#",
    icon: SquareActivity,
    items: [
      {
        title: "Genesis",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Quantum",
        url: "#",
      },
    ],
  },
  {
    title: "Profile",
    url: "#",
    icon: CircleUserRound,
    items: [
      {
        title: "Info",
        url: "#",
      },
      {
        title: "Update",
        url: "#",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
];