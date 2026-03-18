"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Tags,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import rtSmartLogo from "@/assets/logos/RTSmart-logo.svg"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const RTSmartLogo = ({ className }) => (
  <img src={rtSmartLogo} alt="RT Smart" className={className} />
)

// This is sample data.
const data = {
  user: {
    name: "Sergio Fabián Álvarez Gómez",
    email: "sergiofa.alvarez@ecopetrol.com.co",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "RT Smart",
      logo: RTSmartLogo,
      plan: "Ecopetrol SA",
    },
  ],
  navMain: [
    {
      title: "Crear RT nueva",
      url: "#",
      icon: SquareTerminal
    },
    {
      title: "Recomendaciones técnicas",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Todas",
          url: "#",
        },
        {
          title: "Publicadas",
          url: "#",
        },
        {
          title: "En proceso",
          url: "#",
        },
      ],
    },
    {
      title: "Tags",
      url: "#",
      icon: Tags,
      items: [
        {
          title: "Todos",
          url: "#",
        },
        {
          title: "Equipo Estático",
          url: "#",
        },
        {
          title: "Tubería",
          url: "#",
        },
        {
          title: "Infraestructura Civil",
          url: "#",
        },
        {
          title: "Equipo Eléctrico",
          url: "#",
        },
        {
          title: "Instrumentos y Control",
          url: "#",
        },
        {
          title: "Equipo Rotativo",
          url: "#",
        }
      ],
    },
    {
      title: "Configuración",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Permisos",
          url: "#",
        }
      ],
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

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className="flex h-12 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-[width,height,padding,gap] duration-200 ease-linear group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:p-0!">
              <div
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent text-sidebar-primary-foreground">
                <RTSmartLogo className="size-8" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight overflow-hidden transition-[max-width,opacity] duration-200 ease-linear group-data-[collapsible=icon]:max-w-0 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:[transition-delay:200ms] group-data-[state=expanded]:[transition-delay:0ms]">
                <span className="truncate font-medium">{"RT Smart"}</span>
                <span className="truncate text-xs">{"Ecopetrol SA"}</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
