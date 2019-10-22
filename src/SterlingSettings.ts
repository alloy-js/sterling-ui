import store from 'store';
import defaultsPlugin from 'store/plugins/defaults';

store.addPlugin(defaultsPlugin);

export interface ISterlingSettings {
    defaultView: 'graph' | 'table' | 'tree' | 'source'
}

const DEFAULT_SETTINGS: ISterlingSettings = {
    defaultView: 'graph'
};

export default class SterlingSettings {

    static readonly defaults = DEFAULT_SETTINGS;

    constructor () {

        // @ts-ignore
        store.defaults(DEFAULT_SETTINGS);

    }

    static supportsStorage (): boolean {
        return true
    }

}
