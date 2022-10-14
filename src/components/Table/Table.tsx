// Core
import * as React from 'react';
import { Row, useTable } from 'react-table';

//Components
import { TableHeading } from './TableHeading';
import { TableBody } from './TableBody';
import { TableWrapper } from './TableWrapper';

export interface TableProps {
    className?: string;
    data: any[any];
    columns: any[any];
    tableHooks?: any[];
    getSubRows?: (p: any) => Row[];
    getRowClass?: (row: Row<Row<{}>>) => string;
    cellClass?: string[];
    renderRowSubComponent?: (p: any) => Row<any>[];
    scrollable?: boolean;
    scrollHeight?: string;
    // @deprecated
    rowClass?: string[];
    onScrollFn?: ()=>void
}

function Table({
    className,
    data,
    columns,
    tableHooks = [],
    getSubRows,
    getRowClass,
    cellClass = [],
    renderRowSubComponent,
    scrollable = false,
    scrollHeight = '150px',
    rowClass,
}: TableProps) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
    } = useTable({ columns, data, getSubRows }, ...tableHooks);
    return (
        <TableWrapper
            className={className}
            scrollable={scrollable}
            getTableProps={getTableProps}
        >
            <TableHeading headerGroups={headerGroups} />
            <TableBody
                scrollHeight={scrollHeight}
                scrollable={scrollable}
                rows={rows}
                getRowClass={getRowClass}
                cellClass={cellClass}
                getTableBodyProps={getTableBodyProps}
                prepareRow={prepareRow}
                renderRowSubComponent={renderRowSubComponent}
                visibleColumns={visibleColumns}
                rowClass={rowClass}
            />
        </TableWrapper>
    );
}

export default Table;
