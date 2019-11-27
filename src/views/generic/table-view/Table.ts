import React from 'react';

export default class Table {

    private _title: string | React.ReactNode;
    private _headers: string[];
    private _data: string[][];
    private readonly _highlights: {
        [index: number]: {
            [index: string]: string | boolean
        }
    };

    constructor (headers?: string[], data?: string[][]) {

        this._title = '';
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

    title (): string | React.ReactNode;
    title (title: string | React.ReactNode): Table;
    title (title?: string | React.ReactNode): string | React.ReactNode | Table {

        if (!arguments.length) return this._title;
        this._title = title;
        return this;

    }

}
