"use client";

import { Checkbox, Pagination, Table } from "@heroui/react";
import { useMemo, useState } from "react";
import { CustomCell } from "./CustomCell"; 

const ROWS_PER_PAGE = 10;

function CustomTable({
    rows = [],
    columns = [],
    onEdit,
    onDelete,
    onStatusChange,
    onBookmarkToggle,
    loadingId,
}) {
    const [page, setPage] = useState(1);
    const [selectedKeys, setSelectedKeys] = useState(new Set());

    const totalPages = Math.max(1, Math.ceil(rows.length / ROWS_PER_PAGE));

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * ROWS_PER_PAGE;
        return rows.slice(start, start + ROWS_PER_PAGE);
    }, [page, rows]);

    const rangeStart = (page - 1) * ROWS_PER_PAGE + 1;
    const rangeEnd = Math.min(page * ROWS_PER_PAGE, rows.length);

    return (
        <Table>
            <Table.ScrollContainer>
                <Table.Content
                    aria-label="Custom table"
                    className="min-w-[600px]"
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    onSelectionChange={setSelectedKeys}
                >
                    <Table.Header>

                        {columns.map((col) => (
                            <Table.Column key={col.id} isRowHeader={col.id === "name"}>
                                {col.name}
                            </Table.Column>
                        ))}
                    </Table.Header>

                    <Table.Body>
                        {paginatedItems.map((row) => (
                            <Table.Row key={row.id} id={row.id}>
                                
                                {columns.map((col) => (
                                    <Table.Cell key={col.id}>
                                        <CustomCell
                                            data={row}
                                            columnKey={col.id}
                                            onEdit={onEdit}
                                            onDelete={onDelete}
                                            onStatusChange={onStatusChange}
                                            onBookmarkToggle={onBookmarkToggle}
                                            loadingId={loadingId}
                                        />
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>

            <Table.Footer>
                <Pagination size="sm">
                    <Pagination.Summary>
                        {rangeStart}–{rangeEnd} of {rows.length} results
                    </Pagination.Summary>
                    <Pagination.Content>
                        <Pagination.Item>
                            <Pagination.Previous
                                isDisabled={page === 1}
                                onPress={() => setPage((p) => Math.max(1, p - 1))}
                            >
                                <Pagination.PreviousIcon />
                                Prev
                            </Pagination.Previous>
                        </Pagination.Item>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Pagination.Item key={p}>
                                <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                    {p}
                                </Pagination.Link>
                            </Pagination.Item>
                        ))}

                        <Pagination.Item>
                            <Pagination.Next
                                isDisabled={page === totalPages}
                                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                            >
                                Next
                                <Pagination.NextIcon />
                            </Pagination.Next>
                        </Pagination.Item>
                    </Pagination.Content>
                </Pagination>
            </Table.Footer>
        </Table>
    );
}

export default CustomTable;