export class SterlingData {

    private readonly _data: any;
    private readonly _attributes: {[key: string]: any};

    constructor (data: any) {

        this._data = data;
        this._attributes = {};

    }

    attr (key: string, value?: any): SterlingData | any {

        if (arguments.length === 1) return this._attributes[key];
        this._attributes[key] = value;
        return this;

    }

    data (): any {

        return this._data;

    }

}
