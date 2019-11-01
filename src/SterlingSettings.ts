import store from 'store';
import defaultsPlugin from 'store/plugins/defaults';
import eventsPlugin from 'store/plugins/events';

export enum ViewSide {Left = 'left', Right = 'right'}
export enum ViewType {Custom = 'custom', Graph = 'graph', Table = 'table', Tree = 'tree', Source = 'source'}

export interface ISterlingSettings {
    defaultView: ViewType,

    customViewSidebarSide: ViewSide,
    graphViewSidebarSide: ViewSide,
    sourceViewSidebarSide: ViewSide,
    tableViewSidebarSide: ViewSide,
    treeViewSidebarSide: ViewSide,
}

const DEFAULT_SETTINGS: ISterlingSettings = {
    defaultView: ViewType.Graph,

    customViewSidebarSide: ViewSide.Left,
    graphViewSidebarSide: ViewSide.Left,
    sourceViewSidebarSide: ViewSide.Left,
    tableViewSidebarSide: ViewSide.Left,
    treeViewSidebarSide: ViewSide.Left
};

store.addPlugin(defaultsPlugin);
store.addPlugin(eventsPlugin);
// @ts-ignore
store.defaults(DEFAULT_SETTINGS);

export default class SterlingSettings {

    static get = store.get.bind(store);
    static set = store.set.bind(store);
    // @ts-ignore
    static watch = store.watch.bind(store);
    // @ts-ignore
    static unwatch = store.unwatch.bind(store);

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
