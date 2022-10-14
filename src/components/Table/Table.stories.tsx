import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Table, { TableProps } from './Table';
import { useFlexLayout, Row } from 'react-table';
export default {
    title: 'Table',
    component: Table,
} as Meta;

import styles from './Table.stories.module.scss';

const Template: Story<TableProps> = (args) => <Table {...args} />;

export const Base = Template.bind({});
Base.args = {
    data: [
        {
            id: 1,
            fullName: 'Hatab Hatabich',
            positionName: 'Immortal Mage',
            onClick: () => {
                console.log('click Hatab Hatabich!');
            },
        },
        {
            id: 2,
            fullName: 'Alladin Petrovich',
            positionName: 'Treasure Hunter',
            onClick: () => {
                console.log('click Alladin Petrovich!');
            },
        },
        {
            id: 3,
            fullName: 'Hatab Hatabich',
            positionName: 'Immortal Mage',
            onClick: () => {
                console.log('click Hatab Hatabich!');
            },
        },
        {
            id: 4,
            fullName: 'Alladin Petrovich',
            positionName: 'Treasure Hunter',
            onClick: () => {
                console.log('click Alladin Petrovich!');
            },
        },
        {
            id: 5,
            fullName: 'Hatab Hatabich',
            positionName: 'Immortal Mage',
            onClick: () => {
                console.log('click Hatab Hatabich!');
            },
        },
        {
            id: 6,
            fullName: 'Alladin Petrovich',
            positionName: 'Treasure Hunter',
            onClick: () => {
                console.log('click Alladin Petrovich!');
            },
        },
    ],
    columns: [
        {
            Header: 'ФИО',
            accessor: 'fullName',
            onClick: () => {
                console.log('ФИО');
            },
        },
        {
            Header: 'Должноcть',
            accessor: 'positionName',
            onClick: () => {
                console.log('Должноcть');
            },
        },
        {
            accessor: 'id',
            Cell: ({ value }: any) => <div>delete</div>,
            onClick: () => {
                console.log('DELETE');
            },
        },
    ],
    getRowClass: (row: Row<Row<{}>>) => {
        const original = row.original as any;
        if (original.fullName === 'Hatab Hatabich') {
            return styles.red;
        }
        if (original.fullName === 'Alladin Petrovich') {
            return styles.blue;
        }
        return '';
    },
    rowClass: [styles.uppercase],
    tableHooks: [useFlexLayout],
};

export const Scrollable = Template.bind({});
Scrollable.args = {
    data: [
        {
            id: 1,
            fullName: 'Hatab Hatabich',
            positionName: 'Immortal Mage',
            onClick: () => {
                console.log('click Hatab Hatabich!');
            },
        },
        {
            id: 2,
            fullName: 'Alladin Petrovich',
            positionName: 'Treasure Hunter',
            onClick: () => {
                console.log('click Alladin Petrovich!');
            },
        },
        {
            id: 3,
            fullName: 'Hatab Hatabich',
            positionName: 'Immortal Mage',
            onClick: () => {
                console.log('click Hatab Hatabich!');
            },
        },
        {
            id: 4,
            fullName: 'Alladin Petrovich',
            positionName: 'Treasure Hunter',
            onClick: () => {
                console.log('click Alladin Petrovich!');
            },
        },
        {
            id: 5,
            fullName: 'Hatab Hatabich',
            positionName: 'Immortal Mage',
            onClick: () => {
                console.log('click Hatab Hatabich!');
            },
        },
        {
            id: 6,
            fullName: 'Alladin Petrovich',
            positionName: 'Treasure Hunter',
            onClick: () => {
                console.log('click Alladin Petrovich!');
            },
        },
    ],
    columns: [
        {
            Header: 'ФИО',
            accessor: 'fullName',
        },
        {
            Header: 'Должноcть',
            accessor: 'positionName',
        },
        {
            accessor: 'id',
            Cell: ({ value }: any) => <div>delete</div>,
        },
    ],
    scrollable: true,
    scrollHeight: '200px',
    tableHooks: [useFlexLayout],
};
