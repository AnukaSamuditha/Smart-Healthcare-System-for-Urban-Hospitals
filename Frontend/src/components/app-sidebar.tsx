import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import axiosInstance from "@/providers/axios";
import { useQuery } from "@tanstack/react-query";
import { navData, hospitalNav, managerNav } from "@/providers/navData";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isFetched } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      console.log("fetched");
      const res = await axiosInstance.get("/users/self");

      return res.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data?.user?.role === "doctor" ? hospitalNav : managerNav}
        />
        <NavProjects projects={navData?.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            email: data?.user?.email || "",
            avatar: data?.user?.profilePicture || "",
            name: data?.user?.username || "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
