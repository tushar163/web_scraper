"use client";

import CustomTable from "@/components/CustomTable";
import { TableProvider } from "@/context/TableContext";
import { toggleBookmark, deleteStory, getBookmarks } from "@/services/apiService";
import { Icon } from "@iconify/react";

// ─── Column Definition ─────────────────────────────────────────────────────────
const BOOKMARK_COLUMNS = [
    { id: "title", label: "Title" },
    { id: "author", label: "Author" },
    { id: "rank", label: "Rank" },
    { id: "points", label: "Points" },
    { id: "createdAt", label: "Created At" },
    { id: "isBookmarked", label: "Bookmark" },
    { id: "actions", label: "Actions" },
];

export default function BookmarksPage() {
    return (
        <TableProvider
            fetchFn={getBookmarks}       // ✅ fetches only bookmarked stories
            bookmarkFn={toggleBookmark}    // ✅ removes bookmark → re-fetches list

        >
            <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-warning/10">
                        <Icon icon="gravity-ui:bookmark-fill" className="size-5 text-warning" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold">Bookmarks</h1>
                        <p className="text-sm text-muted">All your saved stories in one place</p>
                    </div>
                </div>

                <CustomTable columns={BOOKMARK_COLUMNS} />
            </div>
        </TableProvider>
    );
}