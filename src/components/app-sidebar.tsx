"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Cctv,
  MonitorCog,
  SquareMenu,
  Users,
  UserRoundCog,
  HousePlus,
  FolderClosed,
  LayoutGrid,
  Settings,
  BookMarked
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "images/shadcn.jpg",
  },
  navMain: [
    {
      title: "Workspace",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: Bot,
        },
        {
          title: "Cameras",
          url: "#",
          icon: Cctv,
        },
      ],
    },
    {
      title: "System",
      url: "#",
      icon: MonitorCog,
      isActive: true,
      items: [
        {
          title: "Menus",
          url: "#",
          icon: SquareMenu,
        },
        {
          title: "Users",
          url: "#",
          icon: Users,
        },
        {
          title: "Roles",
          url: "#",
          icon: UserRoundCog,
        },
        {
          title: "Organizations",
          url: "#",
          icon: FolderClosed,
        },
        {
          title: "Tenants",
          url: "#",
          icon: HousePlus,
        },
        {
          title: "Applications",
          url: "#",
          icon: LayoutGrid,
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings,
        },
        {
          title: "Dicts",
          url: "#",
          icon: BookMarked,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Avatar>
                    <AvatarImage src="images/capybara.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-lg font-semibold">𝐂𝐚𝐩𝐲𝐛𝐚𝐫𝐚</span>
                  <span className="truncate text-sm font-semibold">Community 0.0.1</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
