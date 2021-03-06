import React from 'react';
import PopoverRow from './PopoverRow';
import Table from '../Table';
import { Card, HTMLTable } from '@blueprintjs/core';

interface ITableProps {
    table: Table
}

export default function TableCard (props: ITableProps) {

    const table = props.table;
    const title = table.title() || <div>{table.id()}</div>;
    const hdrs = table.headers();
    const data = table.data();
    const highlight = table.highlights();

    return (
        <Card elevation={2}>
            { title }
            <HTMLTable
                bordered={true}
                condensed={true}
                striped={true}>
                {
                    hdrs.length > 0 &&
                    (
                        <thead>
                        <tr>
                            {
                                hdrs.map((header: string, i: number) => (
                                    <th key={header + i}>
                                        {header}
                                    </th>
                                ))
                            }
                        </tr>
                        </thead>
                    )
                }
                {
                    <tbody>
                    {
                        data.map((row: string[], i: number) => (
                            highlight.hasOwnProperty(i)
                                ? popoverRow(row, i, highlight[i])
                                : normalRow(row, i)
                        ))
                    }
                    </tbody>
                }
            </HTMLTable>
        </Card>
    );

}

function popoverRow (row: string[], key: number, highlight: {[index: string]: string | boolean}): React.ReactNode {
    return (
        <PopoverRow
            key={key}
            content={popovers(highlight)}
            colors={Object.getOwnPropertyNames(highlight)}>
            {
                rowData(row)
            }
        </PopoverRow>
    );
}

function normalRow (row: string[], key: number): React.ReactNode {
    return (
        <tr key={key}>
            {
                rowData(row)
            }
        </tr>
    );
}

function rowData (row: string[]): React.ReactNode {
    return row.map((item: string, i: number) => (
        <td key={i}>
            {item}
        </td>
    ));
}

function popovers (items: {[index: string]: string | boolean}): React.ReactNode {
    return (
        <>
            {
                Object.entries(items)
                    .filter(item => typeof item[1] === 'string')
                    .map(item => {
                        const color: string = item[0];
                        const label: string = item[1] as string;
                        return (
                            <div key={label}
                                 style={{backgroundColor: color}}>
                                {label}
                            </div>
                        )
                    })
            }
        </>
    )
}
