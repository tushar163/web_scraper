"use client";

import { Avatar, Button, Popover } from "@heroui/react";
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function Header() {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove("token");           
        router.push("/login");             
    };

    return (
        <header className="fixed top-0 left-60 right-0 h-16 border-b border-divider bg-background z-30 flex items-center justify-between px-6">

            {/* ── Page title area (left) ──────────────────────────── */}
            <div className="flex items-center gap-2 text-muted text-sm">
                <Icon icon="gravity-ui:house" className="size-4" />
                <span>/</span>
                <span className="text-foreground font-medium capitalize">
                    Dashboard
                </span>
            </div>

            {/* ── User dropdown (right) ───────────────────────────── */}
            <Popover placement="bottom-end">
                <Popover.Trigger>
                    <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-default-100 transition-colors cursor-pointer">
                        <Avatar size="sm">
                            <Avatar.Fallback>U</Avatar.Fallback>
                        </Avatar>
                        <span className="text-sm font-medium">My Account</span>
                        <Icon icon="gravity-ui:chevron-down" className="size-3 text-muted" />
                    </button>
                </Popover.Trigger>

                <Popover.Content className="w-48 p-1">
                    {/* Profile info */}
                    <div className="px-3 py-2 border-b border-divider mb-1">
                        <p className="text-xs text-muted">Signed in as</p>
                        <p className="text-sm font-medium truncate">user@example.com</p>
                    </div>

                    {/* Menu items */}
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md hover:bg-default-100 transition-colors">
                        <Icon icon="gravity-ui:person" className="size-4 text-muted" />
                        Profile
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md hover:bg-default-100 transition-colors">
                        <Icon icon="gravity-ui:gear" className="size-4 text-muted" />
                        Settings
                    </button>

                    {/* Divider + Logout */}
                    <div className="border-t border-divider mt-1 pt-1">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md text-danger hover:bg-danger-50 transition-colors"
                        >
                            <Icon icon="gravity-ui:arrow-right-from-square" className="size-4" />
                            Logout
                        </button>
                    </div>
                </Popover.Content>
            </Popover>
        </header>
    );
}