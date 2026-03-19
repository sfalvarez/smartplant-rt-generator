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
import rtExpertLogo from "@/assets/logos/RT-Expert-logo.svg"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

const RTExpertLogo = ({ className }) => (
  <img src={rtExpertLogo} alt="RT Expert" className={className} />
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
      name: "RT Expert",
      logo: RTExpertLogo,
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
  ]
}

export function AppSidebar({
  ...props
}) {
  const { toggleSidebar } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader onClick={toggleSidebar}>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className="flex h-12 w-full items-center gap-2 overflow-hidden rounded-md p-1 text-left transition-[width,height,padding,gap] duration-200 ease-linear group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:p-0!">
              <div
                className="flex aspect-square size-10 items-center justify-center rounded-lg bg-transparent text-sidebar-primary-foreground">
                <RTExpertLogo className="size-10" />
              </div>
              <div className="grid flex-1 text-left leading-tight overflow-hidden transition-[max-width,opacity] duration-200 ease-linear group-data-[collapsible=icon]:max-w-0 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:[transition-delay:200ms] group-data-[state=expanded]:[transition-delay:0ms]">
                <span className="truncate font-medium text-xl">{"RT Expert"}</span>
                <span className="truncate text-s">{"Ecopetrol SA"}</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
