"use client";

import type React from "react";

import { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileText,
  Settings,
  PlusCircle,
  LogOut,
  UserCircle,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export default function DashboardLayout() {
  const [activeIcon, setActiveIcon] = useState("dashboard");

  const sidebarIcons = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "users", icon: Users, label: "Users" },
    { id: "documents", icon: FileText, label: "Documents" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <SidebarProvider>
      <div style={{ "--sidebar-width": "80px" } as React.CSSProperties}>
        <div className="flex h-screen flex-col">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Create
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <Sidebar variant="sidebar" collapsible="icon">
              <SidebarContent>
                <SidebarMenu>
                  {sidebarIcons.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={activeIcon === item.id}
                        onClick={() => setActiveIcon(item.id)}
                        tooltip={item.label}
                        className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-border p-0 mx-auto"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="sr-only">{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6"></main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
