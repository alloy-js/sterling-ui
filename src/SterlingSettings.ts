import store from 'store';
import defaultsPlugin from 'store/plugins/defaults';

export type ViewSide = 'left' | 'right';
export type ViewType = 'graph' | 'table' | 'tree' | 'source';

export interface ISterlingSettings {
    defaultView: ViewType,
    graphViewSidebarSide: ViewSide
}

const DEFAULT_SETTINGS: ISterlingSettings = {
    defaultView: 'graph',
    graphViewSidebarSide: 'left'
};

store.addPlugin(defaultsPlugin);
// @ts-ignore
store.defaults(DEFAULT_SETTINGS);

export default class SterlingSettings implements ISterlingSettings {

    defaultView: ViewType;
    graphViewSidebarSide: ViewSide;

    constructor () {
        this.defaultView = store.get('defaultView');
        this.graphViewSidebarSide = store.get('graphViewSidebarSide');
    }

    public set = store.set.bind(store);

    static supportsPersistentStorage(): boolean {
        return storageAvailable('localStorage')
            || storageAvailable('sessionStorage');
    }

}

function storageAvailable (type: 'localStorage' | 'sessionStorage'): boolean {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return (e instanceof DOMException)  && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (!!storage && storage.length !== 0);
    }
}
