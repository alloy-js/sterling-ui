import React from 'react';

export type TableSortFn = (a: Table, b: Table) => number;

export default class Table {

    private _id: string;
    private _title: React.ReactNode;
    private _headers: string[];
    private _data: string[][];
    private readonly _highlights: {
        [index: number]: {
            [index: string]: string | boolean
        }
    };

    static alphabeticalSort = alphabeticalSort;
    static sizeSort = sizeSort;

    constructor (headers?: string[], data?: string[][]) {

        this._id = '';
        this._title = null;
        this._headers = headers ? headers : [];
        this._data = data ? data : [];
        this._highlights = {};

    }

    data (): string[][];
    data (data: string[][]): Table;
    data (data?: string[][]): string[][] | Table {

        if (!arguments.length) return this._data;
        this._data = data!;
        return this;

    }

    headers (): string[];
    headers (headers: string[]): Table;
    headers (headers?: string[]): string[] | Table {

        if (!arguments.length) return this._headers;
        this._headers = headers!;
        return this;

    }

    id (): string;
    id (id: string): Table;
    id (id?: string): string | Table {

        if (!arguments.length) return this._id;
        this._id = id!;
        return this;

    }

    highlights (): {[index: number]: {[index: string]: string | boolean}} {

        return this._highlights;

    }

    highlightRow (row: number, color: string | null, label?: string): Table {

        if (!this._highlights.hasOwnProperty(row))
            this._highlights[row] = {};

        if (color === null) {
            delete this._highlights[row];
        } else {
            this._highlights[row][color] = label || true;
            return this;
        }

        return this;

    }

    title (): React.ReactNode;
    title (title: React.ReactNode): Table;
    title (title?: React.ReactNode): React.ReactNode | Table {

        if (!arguments.length) return this._title;
        this._title = title;
        return this;

    }

}

function alphabeticalSort (ascending: boolean = true): TableSortFn {

    const one = ascending ? 1 : -1;
    return (a: Table, b: Table): number => {
        const aname = a.id();
        const bname = b.id();
        if (aname < bname) return -one;
        if (bname < aname) return one;
        return 0;
    };

}

function sizeSort (ascending: boolean = true): TableSortFn {

    const one = ascending ? 1 : -1;
    return (a: Table, b: Table): number => {
        const asize = a.data().length;
        const bsize = b.data().length;
        return (asize - bsize) * one;
    };

}
