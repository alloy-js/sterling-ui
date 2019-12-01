class Source {

    private _filename: string;
    private _filepath: string;
    private _language: string;
    private _source: string;
    private _tooltip: string;

    constructor () {

        this._filename = '';
        this._filepath = '';
        this._language = '';
        this._source = '';
        this._tooltip = '';

    }

    filename (): string;
    filename (filename: string): Source;
    filename (filename?: string): string | Source {

        if (!arguments.length) return this._filename;
        this._filename = filename!;
        return this;

    }

    filepath (): string;
    filepath (filepath: string): Source;
    filepath (filepath?: string): string | Source {

        if (!arguments.length) return this._filepath;
        this._filepath = filepath!;
        return this;

    }

    language (): string;
    language (language: string): Source;
    language (language?: string): string | Source {

        if (!arguments.length) return this._language;
        this._language = language!;
        return this;

    }

    source (): string;
    source (source: string): Source;
    source (source?: string): string | Source {

        if (!arguments.length) return this._source;
        this._source = source!;
        return this;

    }

    tooltip (): string;
    tooltip (tooltip: string): Source;
    tooltip (tooltip?: string): string | Source {

        if (!arguments.length) return this._tooltip;
        this._tooltip = tooltip!;
        return this;

    }

}

export default Source;
