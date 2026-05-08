"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    {
        label: "Stories",
        href: "/stories",
        icon: "gravity-ui:book-open",
        activeIcon: "gravity-ui:book-open",
    },
    {
        label: "Bookmarks",
        href: "/bookmark",
        icon: "gravity-ui:bookmark",
        activeIcon: "gravity-ui:bookmark-fill",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-60 border-r border-divider bg-background flex flex-col z-40">

            {/* ── Logo ───────────────────────────────────────────── */}
            <div className="flex items-center gap-2 px-5 py-5 border-b border-divider">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                    <Icon icon="gravity-ui:book" className="size-4 text-black" />
                </div>
                <span className="text-lg font-semibold">Web Scraper</span>
            </div>

            {/* ── Nav Links ──────────────────────────────────────── */}
            <nav className="flex flex-col gap-1 p-3 flex-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                                ${isActive
                                    ? "bg-primary text-foreground"
                                    : "text-muted hover:bg-default-100 hover:text-foreground"
                                }`}
                        >
                            <Icon
                                icon={isActive ? item.activeIcon : item.icon}
                                className="size-4 shrink-0"
                            />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* ── Footer ─────────────────────────────────────────── */}
            <div className="px-3 py-4 border-t border-divider">
                <p className="text-xs text-muted text-center">© 2025 Web Scraper</p>
            </div>
        </aside>
    );
}