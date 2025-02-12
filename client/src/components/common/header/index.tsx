"use client";
import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { BellIcon, ChevronDown, MenuIcon } from "lucide-react";

// Type definitions
type MenuItemType = {
  label: string;
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
};

// Constants
const ROUTES = {
  dashboard: "/dashboard",
  transactions: "/transactions",
  wallets: "/wallets",
  beneficiaries: "/beneficiaries",
  settings: "/settings",
  helpCenter: "/help-center",
  sendMoney: "/send-money",
} as const;

const ROUTE_TITLES: Record<string, string> = {
  [ROUTES.dashboard]: "Dashboard",
  [ROUTES.transactions]: "Transactions",
  [ROUTES.wallets]: "Wallets",
  [ROUTES.beneficiaries]: "Beneficiaries",
  [ROUTES.settings]: "Settings",
  [ROUTES.helpCenter]: "Help Center",
  [ROUTES.sendMoney]: "Send Money",
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setOpen } = useSidebar();

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.replace("/auth");
  };

  const menuItems: MenuItemType[] = [
    { label: "Profile" },
    { label: "Billing" },
    { label: "Team" },
    { label: "Subscription" },
    {
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const renderMenuItems = () =>
    menuItems.map(({ label, onClick, icon: Icon }) => (
      <DropdownMenuItem
        key={label}
        className="cursor-pointer"
        onClick={onClick}
      >
        <div className="flex w-full items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          {label}
        </div>
      </DropdownMenuItem>
    ));

  return (
    <header className="sticky top-0 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
          onClick={() => setOpen(true)}
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">
          {ROUTE_TITLES[pathname] || ROUTE_TITLES[ROUTES.dashboard]}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Button
          onClick={() => router.push(ROUTES.beneficiaries)}
          className="bg-primary-700 hover:bg-primary-800 hidden items-center gap-2 rounded-lg px-4 py-2.5 text-white md:flex"
        >
          <MenuIcon className="h-5 w-5" />
          <span>Send Money</span>
        </Button>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">
          <BellIcon className="h-5 w-5" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1.5 hover:bg-gray-50">
              {/* <Image
                src={assetLib.avatar}
                alt="Profile Picture"
                width={32}
                height={32}
                className="rounded-full"
              /> */}
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-gray-700">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {renderMenuItems()}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
