export class SterlingMetadata {

    private readonly _attributes: {[key: string]: any};

    constructor () {

        this._attributes = {};

    }

    attr (key: string, value?: any): SterlingMetadata | any {

        if (arguments.length === 1) return this._attributes[key];
        this._attributes[key] = value;
        return this;

    }

}
