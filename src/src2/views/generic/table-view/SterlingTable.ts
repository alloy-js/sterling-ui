import React from 'react';

export default class SterlingTable {

    private _title: string | React.ReactNode;
    private _headers: string[];
    private _data: string[][];
    private readonly _highlights: {
        [index: number]: {
            [index: string]: string | boolean
        }
    };

    constructor (headers: string[] | null, data?: string[][]) {

        this._headers = headers ? headers : [];
        this._data = data ? data : [];
        this._highlights = {};

    }

    data (data?: string[][]): string[][] | SterlingTable {

        if (!arguments.length) return this._data;
        this._data = data!;
        return this;

    }

    headers (headers?: string[]): string[] | SterlingTable {

        if (!arguments.length) return this._headers;
        this._headers = headers!;
        return this;

    }

    highlights (): {[index: number]: {[index: string]: string | boolean}} {

        return this._highlights;

    }

    highlightRow (row: number, color: string | null, label?: string): SterlingTable {

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

    title (title?: string | React.ReactNode): string | React.ReactNode | SterlingTable {

        if (!arguments.length) return this._title;
        this._title = title;
        return this;

    }

}
