"use client";

import { Pagination, Spinner, Table } from "@heroui/react";
import { useTableContext } from "@/context/TableContext";
import { CustomCell } from "./CustomCell";

function CustomTable({ columns = [], onEdit, onDelete }) {
    // ✅ Everything comes from context — no local state needed
    const {
        rows,
        page,
        totalPages,
        total,
        limit,
        isLoading,
        loadingId,
        setPage,
        handleBookmarkToggle,
    } = useTableContext();

    const rangeStart = (page - 1) * limit + 1;
    const rangeEnd = Math.min(page * limit, total);

    return (console.log(rows,"rows in table"),
        <Table>
            <Table.ScrollContainer>
                <Table.Content
                    aria-label="Stories table"
                    className="min-w-[600px]"
                >
                    {/* ── Header ─────────────────────────────────── */}
                    <Table.Header>
                        {columns.map((col) => (
                            <Table.Column key={col.id} isRowHeader={col.id === "title"}>
                                {col.label}
                            </Table.Column>
                        ))}
                    </Table.Header>

                    {/* ── Body ───────────────────────────────────── */}
                    <Table.Body>
                        {isLoading ? (
                            <Table.LoadMore isLoading={isLoading} scrollOffset={0} >
                                <Table.LoadMoreContent>
                                    <Spinner size="md" />
                                </Table.LoadMoreContent>
                            </Table.LoadMore>
                        ) : rows.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={columns.length} className="text-center py-10 text-muted">
                                    No records found.
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            rows.map((row) => (
                                <Table.Row key={row.id} id={row.id}>
                                    {columns.map((col) => (
                                        <Table.Cell key={col.id}>
                                            <CustomCell
                                                data={row}
                                                columnKey={col.id}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                                onBookmarkToggle={handleBookmarkToggle} // ✅ from context
                                                loadingId={loadingId}
                                            />
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>

            {/* ── Pagination — driven by API total ───────────────── */}
            <Table.Footer>
                <Pagination size="sm">
                    <Pagination.Summary>
                        {total === 0 ? "No results" : `${rangeStart}–${rangeEnd} of ${total} results`}
                    </Pagination.Summary>
                    <Pagination.Content>
                        <Pagination.Item>
                            <Pagination.Previous
                                isDisabled={page === 1 || isLoading}
                                onPress={() => setPage((p) => Math.max(1, p - 1))}
                            >
                                <Pagination.PreviousIcon />
                                Prev
                            </Pagination.Previous>
                        </Pagination.Item>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Pagination.Item key={p}>
                                <Pagination.Link
                                    isActive={p === page}
                                    onPress={() => setPage(p)}
                                >
                                    {p}
                                </Pagination.Link>
                            </Pagination.Item>
                        ))}

                        <Pagination.Item>
                            <Pagination.Next
                                isDisabled={page === totalPages || isLoading}
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