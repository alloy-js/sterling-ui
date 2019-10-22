import * as React from 'react';
import { Callout, Classes, Dialog, Intent, Tab, Tabs } from '@blueprintjs/core';
import GeneralSettings from './GeneralSettings';

const STORAGE_API_LINK = 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API';

export interface ISterlingSettingsProps {
    onClose: () => void,
    isOpen: boolean
}

class SterlingSettingsDialog extends React.Component<ISterlingSettingsProps> {

    render (): React.ReactNode {

        return (
            <Dialog
                icon='cog'
                isOpen={this.props.isOpen}
                onClose={this.props.onClose}
                title='Sterling Settings'>
                <div className={Classes.DIALOG_BODY}>
                    {
                        !storageAvailable('localStorage') &&
                        <Callout intent={Intent.WARNING}>
                            Your browser does not support the {
                                <a target='_blank' href={STORAGE_API_LINK}>Web Storage API</a>
                            }, so settings will not persist after this window is closed.
                            To save settings across sessions, please upgrade your browser.
                        </Callout>
                    }
                    <Tabs
                        animate={true}
                        renderActiveTabPanelOnly={true}
                        vertical={true}>
                        <Tab id='views' title='General' panel={<GeneralSettings initialView='graph'/>}/>
                        <Tab id='graph' title='Graph View' panel={<div/>}/>
                        <Tab id='table' title='Table View' panel={<div/>}/>
                        <Tab id='tree' title='Tree View' panel={<div/>}/>
                        <Tab id='source' title='Source View' panel={<div/>}/>
                    </Tabs>
                </div>
            </Dialog>
        );

    }

}

function storageAvailable (type: 'localStorage' | 'sessionStorage') {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
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
            (storage && storage.length !== 0);
    }
}

export default SterlingSettingsDialog;
