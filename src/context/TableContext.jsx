"use client";

import { toast } from "@heroui/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

// ─── Context ───────────────────────────────────────────────────────────────────
const TableContext = createContext(null);

// ─── Provider ──────────────────────────────────────────────────────────────────
export function TableProvider({ children, fetchFn, bookmarkFn, deleteFn }) {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingId, setLoadingId] = useState(null);

    // ── Fetch rows ───────────────────────────────────────────────────
    const fetchRows = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetchFn({ page, limit });
            if (response?.success) {
                setRows(response.data);
                setTotal(response.total);
                setTotalPages(Math.ceil(response.total / limit));
            } else {
                throw new Error(response?.message || "Fetch failed");
            }
        } catch (error) {
            toast.error(error.message || "Failed to load data");
        } finally {
            setIsLoading(false);
        }
    }, [fetchFn, page, limit]);

    // ✅ re-fetch on page change
    useEffect(() => {
        fetchRows();
    }, [fetchRows]);

    // ── Bookmark toggle → then re-fetch for latest data ──────────────
    const handleBookmarkToggle = async (row) => {
        if (!bookmarkFn) return;
        setLoadingId(row._id);
        try {
            const response = await bookmarkFn(row._id, !row.isBookmarked);
            if (response?.success) {
                toast.success(row.isBookmarked ? "Bookmark removed" : "Bookmarked!");
                await fetchRows(); // ✅ re-fetch after bookmark
            } else {
                throw new Error(response?.message || "Bookmark failed");
            }
        } catch (error) {
            toast.error(error.message || "Bookmark failed");
        } finally {
            setLoadingId(null);
        }
    };

    // ── Delete → then re-fetch for latest data ───────────────────────
    const handleDelete = async (row) => {
        if (!deleteFn) return;
        setLoadingId(row._id);
        try {
            const response = await deleteFn(row._id);
            if (response?.success) {
                toast.success("Deleted successfully");
                await fetchRows(); // ✅ re-fetch after delete
            } else {
                throw new Error(response?.message || "Delete failed");
            }
        } catch (error) {
            toast.error(error.message || "Delete failed");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <TableContext.Provider value={{
            rows, page, limit, total, totalPages,
            isLoading, loadingId,
            setPage,
            handleBookmarkToggle,
            handleDelete,
            reload: fetchRows, // ✅ expose manual refresh
        }}>
            {children}
        </TableContext.Provider>
    );
}

// ─── Hook ──────────────────────────────────────────────────────────────────────
export function useTableContext() {
    const ctx = useContext(TableContext);
    if (!ctx) throw new Error("useTableContext must be used inside <TableProvider>");
    return ctx;
}