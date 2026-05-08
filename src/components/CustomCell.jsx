"use client";

import { Button, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
export function CustomCell({
    data,
    columnKey,
    onEdit,
    onDelete,
    onBookmarkToggle,
}) {
    const cellValue = data[columnKey];
    console.log(data,"data in cell");
    switch (columnKey) {
        case "isBookmarked":
            return (
                <Tooltip content={cellValue ? "Remove bookmark" : "Bookmark"}>
                    <Button
                        isIconOnly
                        size="sm"
                        variant={cellValue ? "solid" : "ghost"}
                        color={cellValue ? "warning" : "default"}
                        onPress={() => onBookmarkToggle?.(data)}
                    >
                        <Icon
                            icon={cellValue ? "gravity-ui:bookmark-fill" : "gravity-ui:bookmark"}
                            className="size-4"
                        />
                    </Button>
                </Tooltip>
            );
        case "actions":
            return (
                <div className="flex items-center justify-center gap-1">
                    <Tooltip content="Edit">
                        <Button
                            isIconOnly
                            size="sm"
                            variant="tertiary"
                            onPress={() => onEdit?.(data)}
                        >
                            <Icon icon="gravity-ui:pencil" className="size-4" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Delete">
                        <Button
                            isIconOnly
                            size="sm"
                            variant="danger-soft"
                            onPress={() => onDelete?.(data)}
                        >
                            <Icon icon="gravity-ui:trash-bin" className="size-4" />
                        </Button>
                    </Tooltip>
                </div>
            );
        case "expiryDate":
            return cellValue
                ? new Date(cellValue).toISOString().slice(0, 10)
                : "—";


        default:
            if (cellValue == null) return "—";
            const text = String(cellValue);
            return text.length > 200 ? `${text.slice(0, 200)}…` : text;
    }
}