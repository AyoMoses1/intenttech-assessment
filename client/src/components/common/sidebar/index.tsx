"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BoxIcon,
  HelpCircleIcon,
  Home,
  Settings2Icon,
  ShoppingBag,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const mainMenuItems = [{ url: "/users", title: "Users", icon: Home }];

function AppSidebar() {
  const isActive = (url: string): boolean => {
    const pathname = usePathname();
    return pathname === url;
  };

  return (
    <Sidebar className="pb-10 pt-0">
      <div className="border-greyScale-100 flex h-[72px] items-center border-b-[1px] pl-3">
        {/* <Image
          src={
            "https://images.pexels.com/photos/30632452/pexels-photo-30632452/free-photo-of-young-man-exploring-nature-by-a-serene-river.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          }
          alt="Settla Logo Light"
          width={100}
          height={24}
          className="object-contain"
        /> */}
      </div>

      <SidebarContent className="px-4">
        <SidebarGroup className="space-y-2.5 pt-4">
          <SidebarGroupLabel className="text-greyScale-300">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link href={item.url}>
                      {/* <item.icon className="size-5" /> */}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
